import React, { useEffect, useRef, memo } from 'react';

export interface PaintedSkyProps {
  opacity?: number;
  className?: string;
}

export const PaintedSky: React.FC<PaintedSkyProps> = memo(({ opacity = 1, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY || window.pageYOffset;
        if (containerRef.current) {
          // Subtle restrained parallax speeds
          containerRef.current.style.setProperty('--scroll-distant', `${(scrollY * 0.08).toFixed(1)}px`);
          containerRef.current.style.setProperty('--scroll-mid', `${(scrollY * 0.18).toFixed(1)}px`);
          containerRef.current.style.setProperty('--scroll-fore', `${(scrollY * 0.32).toFixed(1)}px`);
        }
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`painted-sky-container ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Layer 1: Base Painted Sky (Original Fine-Art Oil Painting) */}
      <div className="sky-layer sky-base" />

      {/* Layer 2: Distant Atmospheric Haze & Cloud Strata */}
      <div className="sky-layer sky-distant" />

      {/* Layer 3: Middle Painterly Cloud Band */}
      <svg
        className="sky-layer sky-clouds-mid"
        viewBox="0 0 1920 1080"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M-100,550 Q280,420 650,490 T1350,440 T2100,530 L2100,1100 L-100,1100 Z"
          fill="url(#cloudGradMid)"
          opacity="0.32"
        />
        <defs>
          <linearGradient id="cloudGradMid" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#d97706" stopOpacity="0.4" />
            <stop offset="45%" stopColor="#4338ca" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#08080a" stopOpacity="0.85" />
          </linearGradient>
        </defs>
      </svg>

      {/* Layer 4: Foreground Atmospheric Silhouette */}
      <svg
        className="sky-layer sky-clouds-fore"
        viewBox="0 0 1920 1080"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M-50,720 Q320,620 780,680 T1520,640 T2050,730 L2050,1100 L-50,1100 Z"
          fill="url(#cloudGradFore)"
          opacity="0.65"
        />
        <defs>
          <linearGradient id="cloudGradFore" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e1b4b" stopOpacity="0.5" />
            <stop offset="60%" stopColor="#0f172a" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#08080a" stopOpacity="0.98" />
          </linearGradient>
        </defs>
      </svg>

      {/* Layer 5: Dark Vignette & Readability Gradient Overlay */}
      <div className="sky-overlay-vignette" />
    </div>
  );
});

PaintedSky.displayName = 'PaintedSky';
