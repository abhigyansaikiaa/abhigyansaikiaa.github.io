import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, User, RefreshCw, Sparkles, Terminal, Copy, Check, RotateCcw } from 'lucide-react';
import { sendChatMessage, ChatMessage } from '../lib/chatbot-client';

const SUGGESTED_CHIPS = [
  'Tell me about ToolKB',
  'What technologies do you use?',
  'How can I contact Abhigyan?',
  'What is your background at RIPANS?',
];

export const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputVal, setInputVal] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLiveServer, setIsLiveServer] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [lastFailedQuery, setLastFailedQuery] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: "Hello! I am Abhigyan's portfolio assistant powered by the AskiDesk engine. Ask me about ToolKB, my verified tech stack, or freelance collaborations.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Escape key closes modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
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
          // Clipboard permission denied in restricted or headless context
        });
    }
  };

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text || isLoading) return;

    // Security guard: limit input length
    const sanitizedText = text.slice(0, 500);

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: sanitizedText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsLoading(true);
    setLastFailedQuery(null);

    try {
      const response = await sendChatMessage(sanitizedText);
      setIsLiveServer(response.isLiveServer);

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: response.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        intent: response.intent,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (_err) {
      setLastFailedQuery(sanitizedText);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'system',
        text: 'Unable to reach the response engine. Please check your connection or email work.abhigyansaikia@gmail.com directly.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="askidesk-chatbot-root">
      {/* Discreet Floating Launcher */}
      {!isOpen && (
        <button
          className="chatbot-launcher-btn"
          onClick={() => setIsOpen(true)}
          aria-label="Open AskiDesk AI Assistant"
          type="button"
        >
          <div className="launcher-pulse-dot" />
          <Bot size={22} className="launcher-icon" />
          <span className="launcher-label">Ask AI</span>
        </button>
      )}

      {/* Expandable Conversation Drawer */}
      {isOpen && (
        <div
          className="chatbot-dialog-panel"
          role="dialog"
          aria-modal="true"
          aria-label="AskiDesk Assistant Conversation"
        >
          {/* Header */}
          <div className="chatbot-header">
            <div className="header-identity">
              <div className="header-avatar">
                <Bot size={18} />
              </div>
              <div className="header-meta">
                <div className="header-title-row">
                  <span className="header-name">AskiDesk</span>
                  <span className={`engine-badge ${isLiveServer ? 'live' : 'local'}`}>
                    {isLiveServer ? 'Live Server' : 'Portfolio Mode'}
                  </span>
                </div>
                <span className="header-status">Grounded Portfolio Assistant</span>
              </div>
            </div>

            <button
              className="chatbot-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close Assistant Panel"
              type="button"
            >
              <X size={18} />
            </button>
          </div>

          {/* Quick Suggestions Strip */}
          <div className="chatbot-chips-strip">
            {SUGGESTED_CHIPS.map((chip) => (
              <button
                key={chip}
                type="button"
                className="chip-btn"
                onClick={() => handleSend(chip)}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Scrollable Message List with Lenis isolation */}
          <div
            className="chatbot-messages-scroll"
            data-lenis-prevent="true"
            tabIndex={0}
            role="region"
            aria-label="Chat messages history"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`chat-bubble-row ${msg.sender === 'user' ? 'is-user' : msg.sender === 'system' ? 'is-system' : 'is-assistant'}`}
              >
                <div className="bubble-content">
                  <p className="bubble-text">{msg.text}</p>
                  <div className="bubble-footer-row">
                    <span className="bubble-timestamp">{msg.timestamp}</span>
                    {msg.sender === 'assistant' && (
                      <button
                        type="button"
                        className="bubble-copy-btn"
                        onClick={() => copyToClipboard(msg.id, msg.text)}
                        aria-label="Copy message text"
                        title="Copy text"
                      >
                        {copiedId === msg.id ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                      </button>
                    )}
                    {msg.sender === 'system' && lastFailedQuery && (
                      <button
                        type="button"
                        className="bubble-retry-btn"
                        onClick={() => handleSend(lastFailedQuery)}
                        aria-label="Retry message"
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

            {isLoading && (
              <div className="chat-bubble-row is-assistant">
                <div className="bubble-content typing-indicator">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="chatbot-input-bar">
            <input
              ref={inputRef}
              type="text"
              maxLength={500}
              className="chatbot-input"
              placeholder="Ask anything about projects or background..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              aria-label="Your message to portfolio assistant"
            />
            <button
              className="chatbot-send-btn"
              onClick={() => handleSend()}
              disabled={!inputVal.trim() || isLoading}
              aria-label="Send message"
              type="button"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
