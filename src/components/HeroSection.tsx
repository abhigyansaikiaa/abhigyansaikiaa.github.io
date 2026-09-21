import { useState, useEffect, useRef } from 'react';
import FadeIn from './FadeIn';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

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
  };

  return (
    <section className="relative min-h-[100dvh] w-full bg-[#05050A] flex flex-col justify-between overflow-hidden">
      
      {/* Top Navigation */}
      <FadeIn delay={0} y={-20} className="relative z-20 w-full">
        <div className="flex items-center justify-between px-6 md:px-12 pt-8 md:pt-12 mx-auto max-w-screen-2xl">
          <ul className="flex items-center gap-6 sm:gap-10 md:gap-16">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-[#D7E2EA]/70 transition-all duration-300 ease-cinematic hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="group relative inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-black transition-all duration-500 ease-cinematic hover:scale-[0.98] active:scale-95"
          >
            Email me
          </a>
        </div>
      </FadeIn>

      {/* Main Editorial Split Area */}
      <div className="relative z-10 flex-1 flex flex-col md:flex-row w-full max-w-screen-2xl mx-auto px-6 md:px-12 py-12 md:py-0 items-center justify-center gap-12 md:gap-8">
        
        {/* Left: Typography */}
        <div className="flex-1 w-full flex flex-col justify-center">
          <FadeIn delay={0.2} y={30}>
            <p className="mb-6 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.4em] text-primary">
              Portfolio · 2026
            </p>
          </FadeIn>

          <FadeIn delay={0.4} y={40}>
            <h1 className="font-clash font-semibold leading-[0.9] tracking-tight text-white mb-6 uppercase" style={{ fontSize: 'clamp(3rem, 9vw, 9rem)' }}>
              Abhigyan<br />Saikia.
            </h1>
          </FadeIn>

          <FadeIn delay={0.6} y={30}>
            <h2 className="text-sm sm:text-base md:text-lg font-medium tracking-[0.3em] text-[#D7E2EA]/80 uppercase max-w-xl leading-relaxed">
              Full Stack Developer · Product Builder
            </h2>
          </FadeIn>
        </div>

        {/* Right: Framed Video */}
        <div className="w-full md:w-5/12 lg:w-1/3 flex justify-center md:justify-end">
          <FadeIn delay={0.8} y={40} className="w-full max-w-sm relative group">
            {/* Doppelrand outer shell */}
            <div className="relative aspect-[3/4] w-full rounded-[2.5rem] bg-white/[0.02] border border-white/10 p-2 shadow-2xl transition-transform duration-700 ease-cinematic hover:-translate-y-2">
              {/* Inner core */}
              <div className="relative w-full h-full rounded-[calc(2.5rem-0.5rem)] overflow-hidden bg-black shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
                
                {/* Glowing orb behind video for subtle depth */}
                <div className="absolute inset-0 bg-primary/20 blur-[80px] mix-blend-screen opacity-50 pointer-events-none" />

                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover mix-blend-screen opacity-80 group-hover:opacity-100 transition-opacity duration-700 ease-cinematic scale-105"
                >
                  <source src="/me.mp4" type="video/mp4" />
                </video>
                
                {/* Overlay Grain */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
                
                {/* Mute Button nested inside */}
                <button
                  onClick={toggleMute}
                  aria-label={muted ? 'Unmute video' : 'Mute video'}
                  className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white transition-all hover:bg-black/60 hover:scale-105"
                >
                  {muted ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <line x1="23" y1="9" x2="17" y2="15" />
                      <line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="relative z-20 w-full flex justify-center pb-8">
        <FadeIn delay={1.0} y={20}>
          <a href="#about" aria-label="Scroll to next section" className="flex flex-col items-center gap-3 transition-opacity hover:opacity-80">
            <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#D7E2EA]/40">Scroll</span>
            <div className="h-12 w-px bg-white/10 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-white/80 animate-[scrollLine_2s_cubic-bezier(0.32,0.72,0,1)_infinite]" />
            </div>
          </a>
        </FadeIn>
      </div>
      
      <style>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
