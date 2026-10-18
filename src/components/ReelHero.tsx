import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PROJECTS } from '../data/projects';
import { preloadImages } from '../lib/asset-loader';
import { AnimationState, ProjectItem } from '../types/reel';
import { ReelScene } from './ReelScene';
import { RollingCounter } from './RollingCounter';
import { SkipControls } from './SkipControls';
import { ArrowDown, Github, Linkedin, Mail, Menu, X } from 'lucide-react';

export const ReelHero: React.FC = () => {
  const [animState, setAnimState] = useState<AnimationState>('initializing');
  const [loadPercent, setLoadPercent] = useState<number>(0);
  const [formation, setFormation] = useState<number>(0);
  const [expansion, setExpansion] = useState<number>(0);
  const [assetsReady, setAssetsReady] = useState<boolean>(false);
  const [formationDone, setFormationDone] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // References to keep animation loops clean and cancelable
  const formationRafRef = useRef<number | null>(null);
  const expansionRafRef = useRef<number | null>(null);
  const formedRef = useRef<boolean>(false);
  const assetsReadyRef = useRef<boolean>(false);
  const isSkippedRef = useRef<boolean>(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches) {
        // Reduced motion: skip directly to completed interactive state
        setFormation(1);
        setExpansion(1);
        setLoadPercent(100);
        setAnimState('interactive');
        formedRef.current = true;
        assetsReadyRef.current = true;
        isSkippedRef.current = true;
        return;
      }
    }
  }, []);

  // Skip entrance handler (Escape / Tab / Skip Button)
  const handleSkip = useCallback(() => {
    if (isSkippedRef.current) return;
    isSkippedRef.current = true;

    if (formationRafRef.current) cancelAnimationFrame(formationRafRef.current);
    if (expansionRafRef.current) cancelAnimationFrame(expansionRafRef.current);

    setFormation(1);
    setExpansion(1);
    setLoadPercent(100);
    setAnimState('interactive');
  }, []);

  // Trigger expansion when BOTH formation has finished AND assets are ready
  const tryTriggerExpansion = useCallback(() => {
    if (!formedRef.current || !assetsReadyRef.current || isSkippedRef.current) return;

    setAnimState('expanding-ring');

    const durationMs = 1900;
    const startTime = performance.now();

    // Standard cubic-bezier(0.5, 0, 0.15, 1) ease approximation
    const easeOutCubicBezier = (t: number): number => {
      // Strong cubic curve that accelerates quickly then decelerates smoothly
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const stepExpansion = (now: number) => {
      if (isSkippedRef.current) return;

      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / durationMs);
      const eased = easeOutCubicBezier(progress);

      setExpansion(eased);

      if (progress < 1) {
        expansionRafRef.current = requestAnimationFrame(stepExpansion);
      } else {
        setExpansion(1);
        setAnimState('interactive');
      }
    };

    expansionRafRef.current = requestAnimationFrame(stepExpansion);
  }, []);

  // Stage 1: Load Assets & Preload Hero Project Images
  useEffect(() => {
    if (isSkippedRef.current) return;

    setAnimState('loading-assets');

    // Preload all 16 hero project images and thumbnails
    const projectUrls = PROJECTS.map((p) => p.coverImage);

    preloadImages(
      projectUrls,
      (progress) => {
        setLoadPercent(progress.percent);
      },
      3500 // 3.5s per image fail-safe timeout
    ).then(() => {
      setLoadPercent(100);
      assetsReadyRef.current = true;
      setAssetsReady(true);
      tryTriggerExpansion();
    });
  }, [tryTriggerExpansion]);

  // Stage 2: Formation Animation (2.6 seconds linear card dealing)
  useEffect(() => {
    if (isSkippedRef.current) return;

    const durationMs = 2600;
    const startTime = performance.now();

    const stepFormation = (now: number) => {
      if (isSkippedRef.current) return;

      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / durationMs);

      setFormation(progress);

      if (progress < 1) {
        formationRafRef.current = requestAnimationFrame(stepFormation);
      } else {
        setFormation(1);
        formedRef.current = true;
        setFormationDone(true);
        tryTriggerExpansion();
      }
    };

    formationRafRef.current = requestAnimationFrame(stepFormation);

    return () => {
      if (formationRafRef.current) cancelAnimationFrame(formationRafRef.current);
      if (expansionRafRef.current) cancelAnimationFrame(expansionRafRef.current);
    };
  }, [tryTriggerExpansion]);

  const isInteractive = animState === 'interactive';
  const showLoaderBackdrop = expansion < 0.99;
  const loaderBackdropOpacity = Math.max(0, 1 - expansion * 1.25);

  // Brand wordmark interpolation values
  const wordmarkColor =
    expansion < 0.5
      ? `rgb(${Math.round(20 + expansion * 2 * 235)}, ${Math.round(
          20 + expansion * 2 * 235
        )}, ${Math.round(20 + expansion * 2 * 235)})`
      : '#ffffff';

  const chromeOpacity = Math.max(0, (expansion - 0.45) / 0.55);

  return (
    <div id="reel-hero-root" className={`reel-master-container state-${animState}`}>
      {/* Skip Controls (Visible during entrance) */}
      <SkipControls isVisible={!isInteractive} onSkip={handleSkip} />

      {/* =========================================================================
          SHARED HEADER & BRAND WORDMARK HANDOFF
          ========================================================================= */}
      <header className="reel-site-header">
        <div className="reel-header-container">
          {/* Brand Wordmark (travels seamlessly from loader to header) */}
          <a
            href="#"
            className="reel-brand-mark"
            style={{
              color: wordmarkColor,
            }}
            aria-label="Abhigyan Saikia Portfolio Home"
          >
            <span className="brand-dot-accent" />
            <span className="brand-text">ABHIGYAN</span>
          </a>

          {/* Header Navigation Links (Fades in during expansion) */}
          <nav
            className="reel-header-nav"
            style={{
              opacity: isInteractive ? 1 : chromeOpacity,
              pointerEvents: isInteractive ? 'auto' : 'none',
              transform: `translateY(${((1 - chromeOpacity) * -12).toFixed(1)}px)`,
            }}
            aria-label="Main Navigation"
          >
            <ul className="reel-nav-list">
              <li>
                <a href="#works" className="reel-nav-link">
                  Projects
                </a>
              </li>
              <li>
                <a href="#about" className="reel-nav-link">
                  About
                </a>
              </li>
              <li>
                <a href="#services" className="reel-nav-link">
                  Services
                </a>
              </li>
              <li>
                <a href="#contact" className="reel-nav-link">
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          {/* Header Right Action & Socials */}
          <div
            className="reel-header-actions"
            style={{
              opacity: isInteractive ? 1 : chromeOpacity,
              pointerEvents: isInteractive ? 'auto' : 'none',
              transform: `translateY(${((1 - chromeOpacity) * -12).toFixed(1)}px)`,
            }}
          >
            <div className="reel-social-links">
              <a
                href="https://github.com/abhigyansaikiaa"
                target="_blank"
                rel="noopener noreferrer"
                className="reel-social-icon"
                aria-label="GitHub Profile"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/abhigyan-saikia-26641227b"
                target="_blank"
                rel="noopener noreferrer"
                className="reel-social-icon"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={18} />
              </a>
            </div>

            <a
              href="mailto:work.abhigyansaikia@gmail.com"
              className="reel-contact-cta"
            >
              <span>Let's Talk</span>
              <span className="cta-dot" />
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="reel-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="reel-mobile-menu">
            <ul className="reel-mobile-menu-links">
              <li>
                <a href="#works" onClick={() => setMobileMenuOpen(false)}>
                  Projects
                </a>
              </li>
              <li>
                <a href="#about" onClick={() => setMobileMenuOpen(false)}>
                  About
                </a>
              </li>
              <li>
                <a href="#services" onClick={() => setMobileMenuOpen(false)}>
                  Services
                </a>
              </li>
              <li>
                <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="mailto:work.abhigyansaikia@gmail.com"
                  className="mobile-talk-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Let's Talk
                </a>
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* =========================================================================
          HERO BACKGROUND TYPOGRAPHY & CHROME
          ========================================================================= */}
      <div
        className="reel-hero-typography"
        style={{
          opacity: isInteractive ? 1 : chromeOpacity,
          transform: `translateY(${((1 - chromeOpacity) * 35).toFixed(1)}px)`,
        }}
      >
        <div className="hero-eyebrow">
          <span className="hero-badge">FULL STACK DEVELOPER</span>
          <span className="hero-status-pill">
            <span className="status-dot-pulse" /> Available for Work
          </span>
        </div>

        <h1 className="hero-giant-title">
          <span className="title-row">CRAFTING</span>
          <span className="title-row title-accent">DIGITAL PRODUCTS</span>
        </h1>

        <p className="hero-subtitle">
          Building fast, scalable web tools and full-stack platforms from concept to launch.
        </p>

        {/* Interaction hint for carousel */}
        <div className="hero-interaction-hint">
          <span className="hint-arrow">←</span>
          <span className="hint-text">Drag or Swipe 3D Carousel</span>
          <span className="hint-arrow">→</span>
        </div>
      </div>

      {/* =========================================================================
          THE CENTRAL 3D RING SCENE (Continuous across Loader & Hero)
          ========================================================================= */}
      <ReelScene
        projects={PROJECTS}
        formation={formation}
        expansion={expansion}
        isInteractive={isInteractive}
        onProjectSelect={(project) => setSelectedProject(project)}
      />

      {/* =========================================================================
          MINIMAL LOADER BACKDROP (Overlaid during initial deal, fades on expansion)
          ========================================================================= */}
      {showLoaderBackdrop && (
        <div
          className="reel-loader-backdrop"
          style={{
            opacity: loaderBackdropOpacity,
            pointerEvents: loaderBackdropOpacity <= 0.05 ? 'none' : 'auto',
          }}
        >
          {/* Bottom Left Loader Caption */}
          <div className="loader-caption-wrap">
            <span className="loader-dot-pulse" />
            <span className="loader-caption-text">LOADING PROJECTS</span>
          </div>

          {/* Bottom Right Rolling Counter */}
          <div className="loader-counter-wrap">
            <RollingCounter value={loadPercent} />
          </div>
        </div>
      )}

      {/* =========================================================================
          EXPLORE SCROLL INDICATOR
          ========================================================================= */}
      <div
        className="reel-scroll-indicator"
        style={{
          opacity: isInteractive ? 1 : 0,
          pointerEvents: isInteractive ? 'auto' : 'none',
        }}
      >
        <a href="#about" className="scroll-pill" aria-label="Scroll down to About section">
          <span>Explore Profile</span>
          <ArrowDown size={14} className="scroll-arrow" />
        </a>
      </div>
    </div>
  );
};
