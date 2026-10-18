import React, { memo } from 'react';
import { ProjectItem } from '../types/reel';
import { ArrowUpRight } from 'lucide-react';

export interface ReelCardProps {
  project: ProjectItem;
  x: number;
  y: number;
  z: number;
  yaw: number;
  scale: number;
  appear: number;
  isInteractive: boolean;
  isFrontFacing: boolean;
  onCardClick?: (project: ProjectItem) => void;
}

export const ReelCard: React.FC<ReelCardProps> = memo(
  ({
    project,
    x,
    y,
    z,
    yaw,
    scale,
    appear,
    isInteractive,
    isFrontFacing,
    onCardClick,
  }) => {
    // If card has not appeared at all during formation, hide completely to avoid visual clutter
    const isHidden = appear <= 0.01;

    // Transform string for 3D positioning
    const transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, ${z.toFixed(2)}px) rotateY(${yaw.toFixed(2)}deg) scale(${scale.toFixed(3)})`;

    const handleClick = (e: React.MouseEvent) => {
      if (!isInteractive) {
        e.preventDefault();
        return;
      }
      if (onCardClick) {
        onCardClick(project);
      }
    };

    return (
      <div
        className={`reel-card-slot ${isFrontFacing ? 'is-front' : 'is-side-or-back'} ${
          isInteractive ? 'is-interactive' : ''
        }`}
        style={{
          transform,
          opacity: Math.max(0, Math.min(1, appear)),
          visibility: isHidden ? 'hidden' : 'visible',
          pointerEvents: isInteractive && isFrontFacing ? 'auto' : 'none',
        }}
        data-slot={project.slot}
        data-id={project.id}
      >
        <a
          href={project.link}
          target={project.external ? '_blank' : undefined}
          rel={project.external ? 'noopener noreferrer' : undefined}
          className="reel-card-inner group"
          onClick={handleClick}
          aria-label={`${project.title} - ${project.category}`}
          tabIndex={isInteractive && isFrontFacing ? 0 : -1}
        >
          {/* Card Media Preview */}
          <div className="reel-card-media-wrap">
            <img
              src={project.coverImage}
              alt={project.title}
              className="reel-card-image"
              loading="eager"
              decoding="async"
            />
            {/* Dark glass gradient overlay for readability */}
            <div className="reel-card-gradient" />
          </div>

          {/* Top Slot & Tag info */}
          <div className="reel-card-header">
            <span className="reel-slot-number">
              {String(project.slot + 1).padStart(2, '0')}
            </span>
            <span className="reel-category-pill">{project.tag}</span>
          </div>

          {/* Bottom Project Metadata */}
          <div className="reel-card-footer">
            <div className="reel-card-copy">
              <h3 className="reel-card-title">{project.title}</h3>
              <p className="reel-card-desc">{project.category}</p>
            </div>
            <div className="reel-card-action" aria-hidden="true">
              <ArrowUpRight className="reel-action-icon" size={18} />
            </div>
          </div>
        </a>
      </div>
    );
  }
);

ReelCard.displayName = 'ReelCard';
