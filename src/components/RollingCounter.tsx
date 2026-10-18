import React from 'react';

interface RollingDigitProps {
  digit: number;
}

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const RollingDigit: React.FC<RollingDigitProps> = ({ digit }) => {
  return (
    <div className="digit-column" aria-hidden="true">
      <div
        className="digit-strip"
        style={{
          transform: `translate3d(0, -${digit * 10}%, 0)`,
        }}
      >
        {DIGITS.map((d) => (
          <span key={d} className="digit-cell">
            {d}
          </span>
        ))}
      </div>
    </div>
  );
};

export interface RollingCounterProps {
  value: number;
}

export const RollingCounter: React.FC<RollingCounterProps> = ({ value }) => {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));
  const hundreds = Math.floor(clamped / 100);
  const tens = Math.floor((clamped % 100) / 10);
  const ones = clamped % 10;

  return (
    <div className="rolling-counter-container" role="status" aria-live="polite">
      <span className="sr-only">Loading progress: {clamped}%</span>

      <div className="rolling-counter-digits" aria-hidden="true">
        {hundreds > 0 && <RollingDigit digit={hundreds} />}
        <RollingDigit digit={tens} />
        <RollingDigit digit={ones} />
        <span className="counter-percent">%</span>
      </div>
    </div>
  );
};
