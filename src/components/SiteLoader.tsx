import React, { useState, useEffect, useRef } from 'react';
import WeightSweepPreloader from './ui/weight-sweep-preloader';
import { getSmoothScroll } from '../lib/lenis-scroll';

const VERIFIED_CAPTIONS = [
  'Preparing ToolKB.in',
  'Loading Arogya Relief',
  'Setting up Motion Subtitles',
  'Configuring Brandcey',
  'Finalizing production build',
];

export interface SiteLoaderProps {
  children: React.ReactNode;
}

export const SiteLoader: React.FC<SiteLoaderProps> = ({ children }) => {
  // Session storage guard: only show full loader on first visit per session
  const [shouldSkip, setShouldSkip] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      // Direct deep link or hash navigation bypasses preloader
      if (window.location.hash) return true;
      return window.sessionStorage.getItem('abhigyan_portfolio_loaded') === 'true';
    } catch {
      return false; // Fail open
    }
  });

  const [captionIndex, setCaptionIndex] = useState(0);
  const [progress, setProgress] = useState<number | undefined>(undefined);
  const [isGateOpen, setIsGateOpen] = useState<boolean>(shouldSkip);

  // Cycle caption through verified projects only
  useEffect(() => {
    if (shouldSkip || isGateOpen) return;
    const interval = window.setInterval(() => {
      setCaptionIndex((prev) => (prev + 1) % VERIFIED_CAPTIONS.length);
    }, 700);
    return () => window.clearInterval(interval);
  }, [shouldSkip, isGateOpen]);

  // Pause Lenis behind loader, then resume on complete
  useEffect(() => {
    const lenis = getSmoothScroll();
    if (!shouldSkip && !isGateOpen) {
      lenis?.stop();
    }
  }, [shouldSkip, isGateOpen]);

  // Critical asset readiness check with bounded fallback timeout (max 2200ms)
  useEffect(() => {
    if (shouldSkip) return;

    let isSubscribed = true;

    // Reduced motion: complete immediately
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsGateOpen(true);
      return;
    }

    const readyPromises: Promise<any>[] = [];

    // 1. Font readiness
    if (typeof document !== 'undefined' && 'fonts' in document) {
      readyPromises.push(document.fonts.ready);
    }

    // 2. Critical hero background asset
    if (typeof Image !== 'undefined') {
      const imgPromise = new Promise((resolve) => {
        const img = new Image();
        img.src = '/assets/painted-sky.jpg';
        img.onload = img.onerror = resolve;
      });
      readyPromises.push(imgPromise);
    }

    // Bounded fallback: trigger 100% after 2200ms
    const timeoutPromise = new Promise((resolve) => window.setTimeout(resolve, 2200));

    Promise.race([Promise.all(readyPromises), timeoutPromise]).then(() => {
      if (isSubscribed) {
        setProgress(100);
      }
    });

    // Hard fail-open guard: under all circumstances, dismiss the gate after 3500ms
    const hardFallback = window.setTimeout(() => {
      if (isSubscribed) {
        setIsGateOpen(true);
        const lenis = getSmoothScroll();
        lenis?.start();
      }
    }, 3500);

    return () => {
      isSubscribed = false;
      window.clearTimeout(hardFallback);
    };
  }, [shouldSkip]);

  const handleComplete = () => {
    try {
      window.sessionStorage.setItem('abhigyan_portfolio_loaded', 'true');
    } catch {
      // Ignore storage errors in restricted private contexts
    }

    setIsGateOpen(true);
    // Unpause Lenis smooth scrolling once gate has lifted
    const lenis = getSmoothScroll();
    lenis?.start();
  };

  return (
    <>
      {/* Homepage rendered directly in normal document flow */}
      {children}

      {/* Weight Sweep Preloader: Single viewport-sized overlay, active only during first-visit load */}
      {!shouldSkip && !isGateOpen && (
        <div
          className="wsp-viewport-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            width: '100vw',
            height: '100svh',
            zIndex: 99999,
            overflow: 'hidden',
            pointerEvents: 'auto',
            backgroundColor: '#08080a',
          }}
          aria-label="Site Loading Gate"
        >
          <WeightSweepPreloader
            preset="ink"
            palette={{
              paper: '#08080a',
              ink: '#f1eee8',
            }}
            label="ABHIGYAN SAIKIA / PORTFOLIO"
            caption={VERIFIED_CAPTIONS[captionIndex]}
            message="Practical digital products, made real."
            progress={progress}
            durationMs={1800}
            height="100svh"
            onComplete={handleComplete}
          />
        </div>
      )}
    </>
  );
};
