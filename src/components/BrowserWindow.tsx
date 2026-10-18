import React, { memo } from 'react';
import { BrowserWindowItem, Window3DPose } from '../types/browser-window';
import { ExternalLink, Lock } from 'lucide-react';

export interface BrowserWindowProps {
  item: BrowserWindowItem;
  pose: Window3DPose;
  isInteractive: boolean;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  onClick: (item: BrowserWindowItem) => void;
}

export const BrowserWindow: React.FC<BrowserWindowProps> = memo(
  ({ item, pose, isInteractive, isHovered, onHover, onClick }) => {
    // Elevate on hover in 3D space
    const hoverZ = isHovered && isInteractive ? 35 : 0;
    const hoverScale = isHovered && isInteractive ? 1.03 : 1;
    const totalZ = pose.z + hoverZ;
    const totalScale = pose.scale * hoverScale;

    const transform = `translate3d(${pose.x.toFixed(1)}px, ${pose.y.toFixed(
      1
    )}px, ${totalZ.toFixed(1)}px) rotateX(${pose.rotX.toFixed(
      2
    )}deg) rotateY(${pose.rotY.toFixed(2)}deg) rotateZ(${pose.rotZ.toFixed(
      2
    )}deg) scale(${totalScale.toFixed(3)})`;

    return (
      <div
        className={`browser-window-slot ${item.featured ? 'is-featured' : ''} ${
          isHovered ? 'is-hovered' : ''
        }`}
        data-index={item.index}
        data-id={item.id}
        style={{
          width: `${item.width}px`,
          height: `${item.height}px`,
          marginLeft: `-${item.width / 2}px`,
          marginTop: `-${item.height / 2}px`,
          transform,
          opacity: pose.opacity,
          zIndex: isHovered ? 99 : pose.zIndex,
          pointerEvents: isInteractive ? 'auto' : 'none',
        }}
        onMouseEnter={() => isInteractive && onHover(item.id)}
        onMouseLeave={() => isInteractive && onHover(null)}
        onClick={() => isInteractive && onClick(item)}
        role="button"
        tabIndex={isInteractive ? 0 : -1}
        aria-label={`${item.title} — ${item.category}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick(item);
          }
        }}
      >
        <div className="browser-window-chassis">
          {/* Subtle Top Browser Chrome Bar */}
          <div className="browser-chrome-bar">
            {/* 3 Window Control Dots */}
            <div className="browser-dots" aria-hidden="true">
              <span className="dot dot-close" />
              <span className="dot dot-min" />
              <span className="dot dot-max" />
            </div>

            {/* Address Pill */}
            <div className="browser-address-pill">
              <Lock size={10} className="address-lock-icon" />
              <span className="address-text">{item.urlLabel}</span>
            </div>

            {/* Right Action Hint */}
            <div className="browser-bar-actions" aria-hidden="true">
              <ExternalLink size={12} className="browser-external-icon" />
            </div>
          </div>

          {/* Screenshot Media Preview */}
          <div className="browser-viewport-media">
            <img
              src={item.screenshot}
              alt={item.title}
              className="browser-screenshot"
              loading="eager"
              decoding="async"
            />
            {/* Subtle gloss reflection overlay */}
            <div className="browser-gloss-overlay" />
          </div>

          {/* Bottom Floating Pill Tag */}
          <div className="browser-bottom-tag">
            <span className="window-project-title">{item.title}</span>
            <span className="window-category-dot">•</span>
            <span className="window-category-text">{item.category}</span>
          </div>
        </div>
      </div>
    );
  }
);

BrowserWindow.displayName = 'BrowserWindow';
