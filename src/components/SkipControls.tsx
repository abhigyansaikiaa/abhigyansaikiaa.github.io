import React, { useEffect } from 'react';
import { FastForward } from 'lucide-react';

export interface SkipControlsProps {
  onSkip: () => void;
  isVisible: boolean;
}

export const SkipControls: React.FC<SkipControlsProps> = ({ onSkip, isVisible }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape or Tab during entrance skips to interactive
      if (isVisible && (e.key === 'Escape' || e.key === 'Tab')) {
        onSkip();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, onSkip]);

  if (!isVisible) return null;

  return (
    <div className="skip-controls-wrap">
      <button
        type="button"
        onClick={onSkip}
        className="skip-intro-btn"
        aria-label="Skip 3D entrance animation and go directly to portfolio"
      >
        <span>Skip intro</span>
        <FastForward size={14} className="skip-btn-icon" />
      </button>
    </div>
  );
};
