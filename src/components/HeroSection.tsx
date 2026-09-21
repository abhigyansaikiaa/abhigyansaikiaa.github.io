import { useState, useEffect, useRef } from 'react';
import FadeIn from './FadeIn';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [showSoundHint, setShowSoundHint] = useState(true);

  // Auto-hide "Tap for sound" hint after 5 seconds
  useEffect(() => {
    const t = setTimeout(() => setShowSoundHint(false), 5000);
    return () => clearTimeout(t);
  }, []);

  // Auto-mute video when scrolling past hero
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          const v = videoRef.current;
          if (v && !v.muted) {
            v.muted = true;
            setMuted(true);
          }
        }
      },
      { threshold: 0, rootMargin: '-50% 0px 0px 0px' }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Snap-scroll: one wheel tick / keypress while at top → jump to About
  useEffect(() => {
    let fired = false;

      const goToAbout = () => {
        if (fired) return;
        fired = true;
        const about = document.getElementById('about');
        if (about) about.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };

    const onWheel = (e: WheelEvent) => {
      if (fired) return;
      if (e.deltaY <= 0) return;
      if (window.scrollY > 50) return;
      e.preventDefault();
      goToAbout();
    };

    const onKey = (e: KeyboardEvent) => {
      if (fired) return;
      if (window.scrollY > 50) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        goToAbout();
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    setShowSoundHint(false);
  };

  return (
    <section ref={sectionRef} className="relative h-[100dvh] w-full overflow-hidden bg-deep-space">
      {/* Video background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover mix-blend-screen opacity-60"
      >
        <source src="/me.mp4" type="video/mp4" />
      </video>

      {/* Cinematic gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-tr from-deep-space via-primary/10 to-secondary/10 mix-blend-overlay" />
      <div className="absolute inset-0 bg-gradient-to-b from-deep-space/60 via-deep-space/20 to-deep-space/95" />

      {/* Content layer */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Top bar */}
        <FadeIn delay={0} y={-20} className="relative z-20">
          <div className="flex items-center justify-between px-6 md:px-12 pt-8 md:pt-12">
            <ul className="flex items-center gap-6 sm:gap-10 md:gap-16">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-white/70 transition-all duration-300 ease-cinematic hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-2.5 sm:px-6 sm:py-3 text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-white backdrop-blur-xl transition-all duration-300 ease-cinematic hover:bg-white/10 hover:border-white/20 active:scale-[0.98]"
            >
              Email me
            </a>
          </div>
        </FadeIn>

        {/* Middle-left: PORTFOLIO + Name + Subtitle */}
        <div className="flex flex-1 items-center">
          <div className="w-full max-w-7xl px-6 md:px-12">
            <FadeIn delay={0.3} y={20}>
              <p className="mb-4 text-[11px] sm:text-xs font-medium uppercase tracking-[0.4em] text-white/50">
                Portfolio · 2026
              </p>
            </FadeIn>

            <FadeIn delay={0.5} y={40}>
              <h1
                className="font-black uppercase leading-[0.85] tracking-tighter text-white drop-shadow-2xl"
                style={{ fontSize: 'clamp(3.5rem, 12vw, 11rem)' }}
              >
                Abhigyan<br />Saikia
              </h1>
            </FadeIn>

            <FadeIn delay={0.85} y={20}>
              <p className="mt-6 md:mt-8 text-[11px] sm:text-xs md:text-sm font-medium uppercase tracking-[0.35em] text-secondary/90 animate-glow-pulse drop-shadow-lg">
                Full Stack Developer · Product Builder
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-end justify-between px-6 md:px-12 pb-10 sm:pb-12 md:pb-16 z-20">
          {/* Scroll indicator */}
          <FadeIn delay={1.1} y={20}>
            <a href="#about" aria-label="Scroll to next section" className="group flex flex-col items-center gap-4 transition-transform duration-300 ease-cinematic hover:scale-105">
              <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.4em] text-white/60 transition-colors group-hover:text-white">
                Scroll
              </span>
              <div className="relative h-14 w-px overflow-hidden bg-white/10">
                <span
                  className="absolute inset-x-0 top-0 h-1/2 w-full bg-white/80"
                  style={{ animation: 'scrollLine 2s cubic-bezier(0.32, 0.72, 0, 1) infinite' }}
                />
              </div>
            </a>
          </FadeIn>

          {/* Mute toggle + Sound hint */}
          <FadeIn delay={1.1} y={20}>
            <div className="flex items-center gap-4">
              {showSoundHint && (
                <span
                  className="hidden sm:inline text-[10px] font-medium uppercase tracking-[0.3em] text-white/60"
                  style={{ animation: 'pulseFade 2.5s ease-in-out infinite' }}
                >
                  Tap for sound
                </span>
              )}
              <button
                onClick={toggleMute}
                aria-label={muted ? 'Unmute video' : 'Mute video'}
                className="group flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-primary/30 bg-primary/5 text-primary backdrop-blur-xl transition-all duration-300 ease-cinematic hover:bg-primary/20 hover:border-primary/50 active:scale-[0.95]"
              >
                {muted ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 transition-opacity group-hover:opacity-100">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 transition-opacity group-hover:opacity-100">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </svg>
                )}
              </button>
            </div>
          </FadeIn>
        </div>
      </div>

      <style>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        @keyframes pulseFade {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.9; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
