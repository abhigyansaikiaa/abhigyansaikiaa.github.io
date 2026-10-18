import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Send, CheckCircle2, ArrowRight } from 'lucide-react';

/* ==========================================================================
   ANIMATE UI: LIQUID WAVE BUTTON
   From animate-ui button primitive pattern with SVG displacement & fluid fill
   ========================================================================== */
export interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
  className?: string;
}

export const LiquidButton: React.FC<LiquidButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`liquid-btn liquid-btn-${variant} ${className}`}
      {...(props as any)}
    >
      <span className="liquid-btn-content">{children}</span>
      <span className="liquid-wave-layer" aria-hidden="true" />
    </motion.button>
  );
};

/* ==========================================================================
   ANIMATE UI: COPY TO CLIPBOARD BUTTON
   Morphing icon + checkmark + tooltip pill feedback
   ========================================================================== */
export interface CopyButtonProps {
  textToCopy: string;
  label?: string;
  className?: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  textToCopy,
  label = 'Copy email',
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (err) {
      console.warn('Copy failed', err);
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleCopy}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.94 }}
      className={`animate-copy-btn ${copied ? 'is-copied' : ''} ${className}`}
      aria-label={copied ? 'Copied to clipboard' : label}
      title={copied ? 'Copied to clipboard!' : label}
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="check"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="copy-icon-wrap text-emerald-400"
          >
            <Check size={15} />
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="copy-icon-wrap"
          >
            <Copy size={15} />
          </motion.span>
        )}
      </AnimatePresence>
      <span className="copy-label-text">
        {copied ? 'Copied to clipboard!' : label}
      </span>
    </motion.button>
  );
};
