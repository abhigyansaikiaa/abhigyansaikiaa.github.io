import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Bot, X, Send, Copy, Check, RotateCcw, Sparkles, GripVertical } from 'lucide-react';
import { sendChatMessage, ChatMessage } from '../lib/chatbot-client';

const INITIAL_SUGGESTED_CHIPS = [
  'Tell me about Abhigyan',
  'Show me some projects',
  'What technologies does he work with?',
  'Can we work together?',
];

/**
 * Safe in-browser markdown formatter for assistant messages.
 * Parses bold, inline code, links, bullet lists, and numbered lists without dangerous HTML injection.
 */
const renderFormattedSpan = (text: string, keyPrefix: string): React.ReactNode[] => {
  const tokenRegex = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, index) => {
    const key = `${keyPrefix}-${index}`;
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      return (
        <strong key={key} className="chat-strong">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      return (
        <code key={key} className="chat-inline-code">
          {part.slice(1, -1)}
        </code>
      );
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, url] = linkMatch;
      const isAnchor = url.startsWith('#');
      return (
        <a
          key={key}
          href={url}
          target={isAnchor ? undefined : '_blank'}
          rel={isAnchor ? undefined : 'noopener noreferrer'}
          className="chat-link"
          onClick={(e) => {
            if (isAnchor) {
              e.preventDefault();
              const target = document.querySelector(url);
              if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
              }
            }
          }}
        >
          {label}
        </a>
      );
    }
    return <React.Fragment key={key}>{part}</React.Fragment>;
  });
};

const SafeMarkdown: React.FC<{ content: string }> = ({ content }) => {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let currentListItems: React.ReactNode[] = [];
  let listType: 'ul' | 'ol' | null = null;

  const flushList = () => {
    if (currentListItems.length > 0 && listType) {
      if (listType === 'ul') {
        elements.push(
          <ul key={`list-${elements.length}`} className="chat-bullet-list">
            {currentListItems}
          </ul>
        );
      } else {
        elements.push(
          <ol key={`list-${elements.length}`} className="chat-numbered-list">
            {currentListItems}
          </ol>
        );
      }
      currentListItems = [];
      listType = null;
    }
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      return;
    }

    // Unordered bullet item: "- " or "* "
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      if (listType === 'ol') flushList();
      listType = 'ul';
      currentListItems.push(
        <li key={`li-${idx}`}>
          {renderFormattedSpan(trimmed.slice(2), `li-span-${idx}`)}
        </li>
      );
      return;
    }

    // Numbered item: "1. ", "2. ", etc.
    const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (numMatch) {
      if (listType === 'ul') flushList();
      listType = 'ol';
      currentListItems.push(
        <li key={`li-${idx}`} value={parseInt(numMatch[1], 10)}>
          {renderFormattedSpan(numMatch[2], `li-span-${idx}`)}
        </li>
      );
      return;
    }

    // Regular line / paragraph
    flushList();
    elements.push(
      <p key={`p-${idx}`} className="chat-paragraph">
        {renderFormattedSpan(trimmed, `p-span-${idx}`)}
      </p>
    );
  });

  flushList();

  return <div className="chat-markdown-body">{elements}</div>;
};

export const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputVal, setInputVal] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLiveServer, setIsLiveServer] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [lastFailedQuery, setLastFailedQuery] = useState<string | null>(null);
  const [currentChips, setCurrentChips] = useState<string[]>(INITIAL_SUGGESTED_CHIPS);

  // Floating draggable positioning state
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const widgetRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{
    startX: number;
    startY: number;
    origX: number;
    origY: number;
    moved: boolean;
  }>({
    startX: 0,
    startY: 0,
    origX: 0,
    origY: 0,
    moved: false,
  });

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: "Hi, I am AskiDesk, Abhigyan's portfolio assistant. You can ask me about his software projects (ToolKB, Arogya Relief, Motion Subtitles, Brandcey), technical skills, development philosophy, or how to work together.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  // Helper keeping element safely clamped inside viewport padding
  const clampToViewport = useCallback((x: number, y: number, isPanelOpen: boolean) => {
    if (typeof window === 'undefined') return { x, y };
    const width = isPanelOpen ? Math.min(410, window.innerWidth - 32) : 190;
    const height = isPanelOpen ? Math.min(580, window.innerHeight - 32) : 56;
    const pad = 16;
    const maxX = Math.max(pad, window.innerWidth - width - pad);
    const maxY = Math.max(pad, window.innerHeight - height - pad);
    return {
      x: Math.max(pad, Math.min(maxX, x)),
      y: Math.max(pad, Math.min(maxY, y)),
    };
  }, []);

  // Window resize re-clamping
  useEffect(() => {
    const handleResize = () => {
      setPosition((prev) => {
        if (!prev) return null;
        return clampToViewport(prev.x, prev.y, isOpen);
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, clampToViewport]);

  // Adjust coordinates when dialog opens or closes so it stays fully visible
  const handleToggleOpen = (open: boolean) => {
    if (open) {
      setPosition((prev) => {
        if (!prev) {
          const initialX = Math.max(16, window.innerWidth - 410 - 24);
          const initialY = Math.max(16, window.innerHeight - 590 - 24);
          return { x: initialX, y: initialY };
        }
        return clampToViewport(prev.x, prev.y, true);
      });
    } else {
      setPosition((prev) => {
        if (!prev) return null;
        return clampToViewport(prev.x, prev.y, false);
      });
    }
    setIsOpen(open);
  };

  // Pointer drag handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return; // Only primary mouse button or touch
    const el = widgetRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: rect.left,
      origY: rect.top,
      moved: false,
    };

    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {}
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.startX;
    const dy = e.clientY - dragStartRef.current.startY;

    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
      dragStartRef.current.moved = true;
    }

    const nextX = dragStartRef.current.origX + dx;
    const nextY = dragStartRef.current.origY + dy;
    const clamped = clampToViewport(nextX, nextY, isOpen);
    setPosition(clamped);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
    setIsDragging(false);
  };

  // Auto-resize textarea to fit multiline input up to 120px
  const autoResizeTextarea = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, []);

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // Focus textarea when opened, return focus to launcher button when closed
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        textareaRef.current?.focus();
        autoResizeTextarea();
      }, 120);
    } else {
      launcherRef.current?.focus();
    }
  }, [isOpen, autoResizeTextarea]);

  // Escape key closes modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleToggleOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const copyToClipboard = (id: string, text: string) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setCopiedId(id);
          setTimeout(() => setCopiedId(null), 1800);
        })
        .catch(() => {
          // Clipboard fallback silently handled
        });
    }
  };

  const handleResetConversation = () => {
    setMessages([
      {
        id: `init-${Date.now()}`,
        sender: 'assistant',
        text: "Hi, I am AskiDesk, Abhigyan's portfolio assistant. You can ask me about his software projects (ToolKB, Arogya Relief, Motion Subtitles, Brandcey), technical skills, development philosophy, or how to work together.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setCurrentChips(INITIAL_SUGGESTED_CHIPS);
    setLastFailedQuery(null);
    setInputVal('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleSend = async (textToSend?: string) => {
    const rawText = textToSend !== undefined ? textToSend : inputVal;
    const text = rawText.trim();
    if (!text || isLoading) return;

    // Security guard: cap input length
    const sanitizedText = text.slice(0, 500);

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: sanitizedText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    setIsLoading(true);
    setLastFailedQuery(null);

    try {
      // Pass active message history for multi-turn context awareness
      const response = await sendChatMessage(sanitizedText, [...messages, userMsg]);
      setIsLiveServer(response.isLiveServer);

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: response.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        intent: response.intent,
      };

      setMessages((prev) => [...prev, botMsg]);
      if (response.suggestedFollowUps && response.suggestedFollowUps.length > 0) {
        setCurrentChips(response.suggestedFollowUps);
      }
    } catch (_err) {
      setLastFailedQuery(sanitizedText);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'system',
        text: 'Unable to process your question right now. Please check your network connection or reach out directly at hello@abhigyansaikia.in.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
      setTimeout(() => textareaRef.current?.focus(), 50);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputVal(e.target.value);
    autoResizeTextarea();
  };

  return (
    <div
      ref={widgetRef}
      className={`askidesk-chatbot-root ${isDragging ? 'is-dragging' : ''} ${isOpen ? 'is-open' : 'is-closed'}`}
      style={
        position
          ? {
              left: `${position.x}px`,
              top: `${position.y}px`,
              right: 'auto',
              bottom: 'auto',
            }
          : undefined
      }
    >
      {/* Floating Draggable Launcher Button */}
      {!isOpen && (
        <button
          ref={launcherRef}
          className={`chatbot-launcher-btn ${isDragging ? 'is-dragging' : ''}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onClick={(e) => {
            if (dragStartRef.current.moved) {
              e.preventDefault();
              return;
            }
            handleToggleOpen(true);
          }}
          aria-label="Open AskiDesk portfolio assistant (drag to reposition)"
          aria-expanded={false}
          aria-controls="chatbot-dialog-panel"
          type="button"
          title="AskiDesk — Floating Portfolio Concierge (Drag to move)"
        >
          <div className="launcher-drag-grip" aria-hidden="true" title="Drag to float anywhere">
            <GripVertical size={13} className="drag-grip-icon" />
          </div>
          <div className="launcher-pulse-dot" aria-hidden="true" />
          <Bot size={18} className="launcher-icon" aria-hidden="true" />
          <span className="launcher-label">AskiDesk</span>
          <span className="launcher-badge" aria-hidden="true">AI</span>
        </button>
      )}

      {/* Expandable Conversation Modal */}
      {isOpen && (
        <div
          id="chatbot-dialog-panel"
          className="chatbot-dialog-panel"
          role="dialog"
          aria-modal="true"
          aria-label="AskiDesk Portfolio Assistant"
        >
          {/* Header with Draggable Gripper */}
          <div
            className="chatbot-header"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            title="Click and drag to reposition AskiDesk"
          >
            <div className="header-identity">
              <div className="header-avatar" aria-hidden="true">
                <Bot size={18} />
              </div>
              <div className="header-meta">
                <div className="header-title-row">
                  <span className="header-name">AskiDesk</span>
                  <span
                    className={`engine-badge ${isLiveServer ? 'live' : 'local'}`}
                    title={isLiveServer ? 'Connected to live AskiDesk endpoint' : 'Running on grounded local portfolio intelligence'}
                  >
                    {isLiveServer ? 'Live Server' : 'Portfolio AI'}
                  </span>
                </div>
                <span className="header-status">
                  <GripVertical size={11} className="header-grip-inline" aria-hidden="true" />
                  Floating Concierge · Drag to move
                </span>
              </div>
            </div>

            <div className="header-actions" onPointerDown={(e) => e.stopPropagation()}>
              <button
                className="chatbot-header-btn"
                onClick={handleResetConversation}
                aria-label="Reset conversation"
                title="Reset conversation"
                type="button"
              >
                <RotateCcw size={15} />
              </button>
              <button
                className="chatbot-header-btn chatbot-close-btn"
                onClick={() => handleToggleOpen(false)}
                aria-label="Close AskiDesk panel"
                title="Close (Esc)"
                type="button"
              >
                <X size={17} />
              </button>
            </div>
          </div>

          {/* Contextual Suggested Questions Strip */}
          <div className="chatbot-chips-strip" role="group" aria-label="Suggested follow-up questions">
            <div className="chips-icon-label" aria-hidden="true">
              <Sparkles size={12} />
              <span>Suggested:</span>
            </div>
            {currentChips.map((chip) => (
              <button
                key={chip}
                type="button"
                className="chip-btn"
                onClick={() => handleSend(chip)}
                disabled={isLoading}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Scrollable Message History */}
          <div
            className="chatbot-messages-scroll"
            data-lenis-prevent="true"
            tabIndex={0}
            role="log"
            aria-live="polite"
            aria-atomic="false"
            aria-label="Chat conversation history"
            onWheel={(e) => e.stopPropagation()}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`chat-bubble-row ${
                  msg.sender === 'user'
                    ? 'is-user'
                    : msg.sender === 'system'
                    ? 'is-system'
                    : 'is-assistant'
                }`}
              >
                <div className="bubble-content">
                  {msg.sender === 'assistant' ? (
                    <SafeMarkdown content={msg.text} />
                  ) : (
                    <p className="bubble-text">{msg.text}</p>
                  )}

                  <div className="bubble-footer-row">
                    <span className="bubble-timestamp">{msg.timestamp}</span>

                    {msg.sender === 'assistant' && (
                      <button
                        type="button"
                        className="bubble-action-btn"
                        onClick={() => copyToClipboard(msg.id, msg.text)}
                        aria-label="Copy response text"
                        title="Copy response"
                      >
                        {copiedId === msg.id ? (
                          <Check size={12} className="text-emerald-400" />
                        ) : (
                          <Copy size={12} />
                        )}
                        <span className="sr-only">Copy</span>
                      </button>
                    )}

                    {msg.sender === 'system' && lastFailedQuery && (
                      <button
                        type="button"
                        className="bubble-retry-btn"
                        onClick={() => handleSend(lastFailedQuery)}
                        aria-label="Retry sending previous question"
                        title="Retry sending"
                      >
                        <RotateCcw size={12} />
                        <span>Retry</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Feedback */}
            {isLoading && (
              <div className="chat-bubble-row is-assistant" aria-live="assertive">
                <div className="bubble-content typing-indicator" aria-label="Assistant is generating response">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="chatbot-input-bar">
            <div className="input-field-wrapper">
              <textarea
                ref={textareaRef}
                rows={1}
                maxLength={500}
                className="chatbot-textarea"
                placeholder="Ask AskiDesk about projects, skills, background..."
                value={inputVal}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                aria-label="Your question to AskiDesk"
              />
              {inputVal.length > 350 && (
                <span className="input-char-counter" aria-live="polite">
                  {inputVal.length}/500
                </span>
              )}
            </div>

            <button
              className="chatbot-send-btn"
              onClick={() => handleSend()}
              disabled={!inputVal.trim() || isLoading}
              aria-label="Send question"
              title="Send (Enter)"
              type="button"
            >
              <Send size={15} />
            </button>
          </div>

          {/* Minimal Keycap Helper */}
          <div className="chatbot-subfooter" aria-hidden="true">
            <span>AskiDesk Concierge · Enter to send · Shift+Enter for newline · Esc to close</span>
          </div>
        </div>
      )}
    </div>
  );
};
