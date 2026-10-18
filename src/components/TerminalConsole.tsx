import React from 'react';
import { TerminalStoryPhase } from '../types/terminal';

interface TerminalConsoleProps {
  phase: TerminalStoryPhase;
  lines: Array<{ id: string; type: 'cmd' | 'output' | 'success' | 'meta'; text: string }>;
  currentCmdText: string;
  isCompleted: boolean;
  onSkip: () => void;
}

export const TerminalConsole: React.FC<TerminalConsoleProps> = ({
  phase,
  lines,
  currentCmdText,
  isCompleted,
}) => {
  // Calculate terminal scale and position based on story phase
  const isCodeShaping = phase === 'code-shaping';
  const isEmerging = phase === 'interfaces-emerging';
  const isOpenedOrBeyond = phase === 'portfolio-opened' || phase === 'interactive';

  return (
    <div
      className={`terminal-scene-wrapper phase-${phase}`}
      style={{
        opacity: isOpenedOrBeyond ? 0 : 1,
        pointerEvents: isOpenedOrBeyond ? 'none' : 'auto',
        transition: 'opacity 0.6s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      aria-label="Terminal to Reality Entrance Console"
    >
      {/* Blueprint Layout Lines & SVG Grid Bounds (Scene 03: Code Takes Shape) */}
      <div
        className={`blueprint-wireframe-grid ${isCodeShaping || isEmerging ? 'is-active' : ''}`}
        aria-hidden="true"
      >
        <svg className="blueprint-svg-canvas" width="100%" height="100%">
          <defs>
            <pattern id="blueprint-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path
                d="M 48 0 L 0 0 0 48"
                fill="none"
                stroke="rgba(56, 189, 248, 0.08)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#blueprint-grid)" />

          {/* Radiating Wireframe Vectors to Browser Window Coordinates */}
          {(isCodeShaping || isEmerging) && (
            <g className="wireframe-vectors">
              {/* Center line */}
              <line
                x1="50%"
                y1="50%"
                x2="50%"
                y2="20%"
                stroke="rgba(56, 189, 248, 0.25)"
                strokeDasharray="4 4"
                className="vector-pulse"
              />
              {/* Left Flank */}
              <line
                x1="50%"
                y1="50%"
                x2="22%"
                y2="45%"
                stroke="rgba(56, 189, 248, 0.25)"
                strokeDasharray="4 4"
                className="vector-pulse"
              />
              {/* Right Flank */}
              <line
                x1="50%"
                y1="50%"
                x2="78%"
                y2="45%"
                stroke="rgba(56, 189, 248, 0.25)"
                strokeDasharray="4 4"
                className="vector-pulse"
              />
              {/* Center Focal Box Wireframe */}
              <rect
                x="calc(50% - 240px)"
                y="calc(50% - 150px)"
                width="480"
                height="300"
                fill="none"
                stroke="rgba(225, 29, 42, 0.45)"
                strokeWidth="1.5"
                strokeDasharray="6 6"
                rx="8"
                className="wireframe-focal-box"
              />
            </g>
          )}
        </svg>

        {/* Blueprint Metadata Labels */}
        {(isCodeShaping || isEmerging) && (
          <div className="blueprint-tags">
            <span className="blueprint-tag tag-focal">FOCAL://TOOLKB.IN [TARGET_POS: 0, 0, +120Z]</span>
            <span className="blueprint-tag tag-left">FLANK://AROGYA_RELIEF [TARGET_POS: -340, +60, +20Z]</span>
            <span className="blueprint-tag tag-right">FLANK://BRANDCEY [TARGET_POS: +360, +40, +40Z]</span>
          </div>
        )}
      </div>

      {/* The Central Terminal Console Chassis */}
      <div
        className={`terminal-chassis ${isCodeShaping ? 'receding' : ''} ${isEmerging ? 'dimmed' : ''}`}
      >
        {/* Terminal Header */}
        <div className="terminal-header-bar">
          <div className="terminal-dot-group">
            <span className="t-dot dot-red" />
            <span className="t-dot dot-amber" />
            <span className="t-dot dot-green" />
          </div>
          <div className="terminal-session-title">
            <span className="t-session-tag">ENV: PRODUCTION</span>
            <span className="t-slash">/</span>
            <span className="t-session-name">workstation@abhigyan</span>
          </div>
          <div className="terminal-arch-tag">NODE v20.18.0</div>
        </div>

        {/* Terminal Output Body */}
        <div className="terminal-body" role="log" aria-live="polite">
          {lines.map((line) => {
            if (line.type === 'meta') {
              return (
                <div key={line.id} className="terminal-line line-meta">
                  <span className="meta-text">{line.text}</span>
                </div>
              );
            }
            if (line.type === 'cmd') {
              return (
                <div key={line.id} className="terminal-line line-cmd">
                  <span className="prompt-symbol">abhigyan@workstation:~$</span>
                  <span className="cmd-text">{line.text}</span>
                </div>
              );
            }
            if (line.type === 'success') {
              return (
                <div key={line.id} className="terminal-line line-success">
                  <span className="success-icon">✓</span>
                  <span className="success-text">{line.text}</span>
                </div>
              );
            }
            return (
              <div key={line.id} className="terminal-line line-output">
                <span className="output-text">{line.text}</span>
              </div>
            );
          })}

          {/* Current typing line or blinking cursor */}
          {!isCompleted && (
            <div className="terminal-line line-active-cmd">
              <span className="prompt-symbol">abhigyan@workstation:~$</span>
              <span className="typing-text">{currentCmdText}</span>
              <span className="blinking-cursor" aria-hidden="true">
                ▋
              </span>
            </div>
          )}
        </div>

        {/* Terminal Status Footer */}
        <div className="terminal-footer-bar">
          <div className="t-status-left">
            <span className="status-indicator-dot" />
            <span className="status-label">
              {phase === 'empty-workspace' && 'SYSTEM INITIALIZING'}
              {phase === 'system-startup' && 'EXECUTING BUILD SEQUENCE'}
              {phase === 'code-shaping' && 'COMPILING BLUEPRINTS INTO INTERFACES'}
              {phase === 'interfaces-emerging' && 'ASSEMBLING 3D VIEWPORTS'}
              {isOpenedOrBeyond && 'READY'}
            </span>
          </div>
          <div className="t-status-right">
            <span className="t-hint">PRESS ESC OR SKIP INTRO TO BYPASS</span>
          </div>
        </div>
      </div>
    </div>
  );
};
