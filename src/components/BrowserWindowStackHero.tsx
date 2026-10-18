import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { HERO_BROWSER_WINDOWS } from '../data/browser-windows';
import { BrowserWindowItem, PortfolioMode } from '../types/browser-window';
import { windowPose, sceneCamera } from '../lib/browser-scene';
import { preloadImages } from '../lib/asset-loader';
import { BrowserWindow } from './BrowserWindow';
import { RollingCounter } from './RollingCounter';
import { SkipControls } from './SkipControls';
import { PaintedSky } from './PaintedSky';
import { AgentModeView } from './AgentModeView';
import { ArrowDown, Github, Linkedin, ExternalLink, X, Code, Terminal, Eye, Layers } from 'lucide-react';

export const BrowserWindowStackHero: React.FC = () => {
  // Global Mode: Human vs Agent
  const [mode, setMode] = useState<PortfolioMode>('human');

  // Animation values (0 to 1)
  const [formation, setFormation] = useState<number>(0);
  const [expansion, setExpansion] = useState<number>(0);
  const [loadPercent, setLoadPercent] = useState<number>(0);
  const [animState, setAnimState] = useState<'loading' | 'unfolding' | 'expanding' | 'interactive'>('loading');

  // Interactive state
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<BrowserWindowItem | null>(null);

  // Viewport tracking
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1440
  );

  // Interactive mouse parallax offset
  const [mouseParallax, setMouseParallax] = useState({ rotX: 0, rotY: 0 });

  // Refs for animation coordination
  const formedRef = useRef(false);
  const assetsReadyRef = useRef(false);
  const isSkippedRef = useRef(false);
  const formationRafRef = useRef<number | null>(null);
  const expansionRafRef = useRef<number | null>(null);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches) {
        setFormation(1);
        setExpansion(1);
        setLoadPercent(100);
        setAnimState('interactive');
        formedRef.current = true;
        assetsReadyRef.current = true;
        isSkippedRef.current = true;
      }

      const handleResize = () => setViewportWidth(window.innerWidth);
      window.addEventListener('resize', handleResize, { passive: true });
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Skip entrance handler
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

  // Keyboard shortcut listener (Escape or Tab)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (animState !== 'interactive' && (e.key === 'Escape' || e.key === 'Tab')) {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [animState, handleSkip]);

  // Expansion trigger when BOTH assets and formation finish
  const tryTriggerExpansion = useCallback(() => {
    if (!formedRef.current || !assetsReadyRef.current || isSkippedRef.current) return;

    setAnimState('expanding');

    const durationMs = 1900;
    const startTime = performance.now();

    // cubic-bezier(0.5, 0, 0.15, 1)
    const easeBezier = (t: number) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const step = (now: number) => {
      if (isSkippedRef.current) return;

      const elapsed = now - startTime;
      const p = Math.min(1, elapsed / durationMs);
      const eased = easeBezier(p);

      setExpansion(eased);

      if (p < 1) {
        expansionRafRef.current = requestAnimationFrame(step);
      } else {
        setExpansion(1);
        setAnimState('interactive');
      }
    };

    expansionRafRef.current = requestAnimationFrame(step);
  }, []);

  // Preload hero window screenshots and decode them
  useEffect(() => {
    if (isSkippedRef.current) return;

    const urls = HERO_BROWSER_WINDOWS.map((w) => w.screenshot);
    urls.push('/assets/painted-sky.jpg');

    preloadImages(
      urls,
      (prog) => setLoadPercent(prog.percent),
      3500
    ).then(() => {
      setLoadPercent(100);
      assetsReadyRef.current = true;
      tryTriggerExpansion();
    });
  }, [tryTriggerExpansion]);

  // Stage B: Formation animation (2.6s staggered unfolding)
  useEffect(() => {
    if (isSkippedRef.current) return;

    const durationMs = 2600;
    const startTime = performance.now();

    const step = (now: number) => {
      if (isSkippedRef.current) return;

      const elapsed = now - startTime;
      const p = Math.min(1, elapsed / durationMs);
      setFormation(p);

      if (p < 1) {
        formationRafRef.current = requestAnimationFrame(step);
      } else {
        setFormation(1);
        formedRef.current = true;
        setAnimState('unfolding');
        tryTriggerExpansion();
      }
    };

    formationRafRef.current = requestAnimationFrame(step);

    return () => {
      if (formationRafRef.current) cancelAnimationFrame(formationRafRef.current);
      if (expansionRafRef.current) cancelAnimationFrame(expansionRafRef.current);
    };
  }, [tryTriggerExpansion]);

  // Subtle interactive mouse parallax during interactive state
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (animState !== 'interactive') return;
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX / innerWidth - 0.5) * 2;
      const normY = (e.clientY / innerHeight - 0.5) * 2;
      setMouseParallax({
        rotX: -normY * 3.5, // subtle pitch
        rotY: normX * 4.5,  // subtle yaw
      });
    },
    [animState]
  );

  // Camera parameters
  const camera = useMemo(() => {
    return sceneCamera(expansion, viewportWidth);
  }, [expansion, viewportWidth]);

  // Window click action
  const handleWindowClick = useCallback((item: BrowserWindowItem) => {
    if (item.external && item.link.startsWith('http')) {
      window.open(item.link, '_blank', 'noopener,noreferrer');
    } else {
      setSelectedProject(item);
    }
  }, []);

  const isInteractive = animState === 'interactive' || animState === 'skipped' || expansion > 0.75;
  const showLoaderBackdrop = expansion < 0.99;
  const loaderOpacity = Math.max(0, 1 - expansion * 1.3);
  const chromeOpacity = Math.max(0, (expansion - 0.4) / 0.6);

  // If visitor toggles Agent Mode, render the semantic machine-readable representation
  if (mode === 'agent') {
    return <AgentModeView onSwitchToHuman={() => setMode('human')} />;
  }

  return (
    <div
      className={`browser-hero-master state-${animState}`}
      onMouseMove={handleMouseMove}
      role="region"
      aria-label="3D Browser Window Showcase Hero"
    >
      {/* Skip Intro Button */}
      <SkipControls isVisible={!isInteractive} onSkip={handleSkip} />

      {/* Atmospheric Painted Sky Artwork (Original Fine-Art Landscape) */}
      <PaintedSky opacity={expansion} />

      {/* =========================================================================
          EDITORIAL HEADER WITH WORDMARK HANDOFF & HUMAN/AGENT TOGGLE
          ========================================================================= */}
      <header className="browser-site-header">
        <div className="header-inner">
          {/* Brand Wordmark (travels from loader to header) */}
          <div className="header-brand-wrap">
            <a
              href="#"
              className="header-brand-wordmark"
              style={{
                color:
                  expansion < 0.5
                    ? `rgb(${Math.round(20 + expansion * 2 * 235)}, ${Math.round(
                        20 + expansion * 2 * 235
                      )}, ${Math.round(20 + expansion * 2 * 235)})`
                    : '#ffffff',
              }}
              aria-label="Abhigyan Saikia — Portfolio Home"
            >
              <span className="brand-dot" />
              <span>ABHIGYAN</span>
            </a>
          </div>

          {/* Editorial Navigation: Build / About / Learn / Contact */}
          <nav
            className="header-nav"
            style={{
              opacity: isInteractive ? 1 : chromeOpacity,
              pointerEvents: isInteractive ? 'auto' : 'none',
              transform: `translateY(${((1 - chromeOpacity) * -10).toFixed(1)}px)`,
            }}
            aria-label="Portfolio Worlds"
          >
            <ul className="header-nav-list">
              <li>
                <span className="nav-slash">/</span>
                <a href="#works" className="nav-link nav-build">
                  Build
                </a>
              </li>
              <li>
                <span className="nav-slash">/</span>
                <a href="#about" className="nav-link nav-about">
                  About
                </a>
              </li>
              <li>
                <span className="nav-slash">/</span>
                <a href="#learn" className="nav-link nav-learn">
                  Learn
                </a>
              </li>
              <li>
                <span className="nav-slash">/</span>
                <a href="#contact" className="nav-link nav-contact">
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          {/* Right Header: Human / Agent Toggle & Socials */}
          <div
            className="header-controls"
            style={{
              opacity: isInteractive ? 1 : chromeOpacity,
              pointerEvents: isInteractive ? 'auto' : 'none',
              transform: `translateY(${((1 - chromeOpacity) * -10).toFixed(1)}px)`,
            }}
          >
            {/* Functional Human / Agent Mode Toggle */}
            <div className="mode-toggle-group" role="group" aria-label="View Portfolio As">
              <button
                type="button"
                className="mode-btn is-active"
                onClick={() => setMode('human')}
                aria-pressed={true}
              >
                Human
              </button>
              <span className="mode-slash">/</span>
              <button
                type="button"
                className="mode-btn"
                onClick={() => setMode('agent')}
                aria-pressed={false}
              >
                Agent
              </button>
            </div>

            <div className="header-social-group">
              <a
                href="https://github.com/abhigyansaikiaa"
                target="_blank"
                rel="noopener noreferrer"
                className="header-icon-link"
                aria-label="GitHub Profile"
              >
                <Github size={16} />
              </a>
              <a
                href="https://www.linkedin.com/in/abhigyan-saikia-26641227b"
                target="_blank"
                rel="noopener noreferrer"
                className="header-icon-link"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* =========================================================================
          HERO HEADLINE & INTRODUCTORY TYPOGRAPHY
          ========================================================================= */}
      <div
        className="browser-hero-intro"
        style={{
          opacity: isInteractive ? 1 : chromeOpacity,
          transform: `translateY(${((1 - chromeOpacity) * 30).toFixed(1)}px)`,
        }}
      >
        <div className="hero-eyebrow">
          <span className="hero-badge">FULL-STACK WEB DEVELOPER</span>
          <span className="hero-status">
            <span className="status-dot" /> Concept &bull; Code &bull; Production
          </span>
        </div>

        <h1 className="hero-headline">
          <span>WEBSITES ASSEMBLED.</span>
          <span className="headline-accent">PRODUCTS BROUGHT TO LIFE.</span>
        </h1>

        <p className="hero-lead">
          Crafting high-speed web utilities, healthcare relief portals, and creative platforms with practical engineering and clean architecture.
        </p>

        {/* Explore CTA and Stack Hint */}
        <div className="hero-cta-row">
          <a href="#works" className="hero-cta-btn">
            <span>Explore Works</span>
            <Layers size={14} />
          </a>
          <span className="hero-hint">Hover or click browser windows to inspect</span>
        </div>
      </div>

      {/* =========================================================================
          THE 3D BROWSER WINDOW STACK (Continuous between Loader & Hero)
          ========================================================================= */}
      <div
        className="browser-3d-stage"
        style={{
          perspective: `${camera.perspective}px`,
        }}
      >
        <div
          className="browser-camera-rig"
          style={{
            transform: `rotateX(${(camera.pitch + mouseParallax.rotX).toFixed(
              2
            )}deg) rotateY(${mouseParallax.rotY.toFixed(2)}deg) scale(${camera.scale.toFixed(3)})`,
          }}
        >
          {HERO_BROWSER_WINDOWS.map((item, idx) => {
            const pose = windowPose(idx, formation, expansion, viewportWidth);
            const isHovered = hoveredId === item.id;

            return (
              <BrowserWindow
                key={item.id}
                item={item}
                pose={pose}
                isInteractive={isInteractive}
                isHovered={isHovered}
                onHover={setHoveredId}
                onClick={handleWindowClick}
              />
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          MINIMAL OFF-WHITE LOADER BACKDROP (Overlaid during initial deal, fades out)
          ========================================================================= */}
      {showLoaderBackdrop && (
        <div
          className="browser-loader-backdrop"
          style={{
            opacity: loaderOpacity,
            pointerEvents: loaderOpacity <= 0.05 ? 'none' : 'auto',
          }}
        >
          <div className="loader-caption-box">
            <span className="loader-dot-pulse" />
            <span className="loader-caption-text">PREPARING PROJECTS</span>
          </div>

          <div className="loader-counter-box">
            <RollingCounter value={loadPercent} />
          </div>
        </div>
      )}

      {/* =========================================================================
          BOTTOM SCROLL INDICATOR
          ========================================================================= */}
      <div
        className="hero-scroll-prompt"
        style={{
          opacity: isInteractive ? 1 : 0,
          pointerEvents: isInteractive ? 'auto' : 'none',
        }}
      >
        <a href="#about" className="scroll-prompt-btn" aria-label="Scroll down to About and Works">
          <span>Scroll to explore</span>
          <ArrowDown size={14} className="prompt-arrow" />
        </a>
      </div>

      {/* =========================================================================
          PROJECT DETAIL MODAL (when clicked)
          ========================================================================= */}
      {selectedProject && (
        <div className="project-modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="project-modal-box" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setSelectedProject(null)}
              aria-label="Close Project Details"
            >
              <X size={20} />
            </button>
            <div className="modal-header">
              <span className="modal-category">{selectedProject.category}</span>
              <h2 className="modal-title">{selectedProject.title}</h2>
              <p className="modal-url"><code>{selectedProject.urlLabel}</code></p>
            </div>
            <div className="modal-preview">
              <img src={selectedProject.screenshot} alt={selectedProject.title} />
            </div>
            <p className="modal-desc">{selectedProject.description}</p>
            <div className="modal-actions">
              {selectedProject.external ? (
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-action-btn"
                >
                  <span>Visit Live Project</span>
                  <ExternalLink size={14} />
                </a>
              ) : (
                <a href={selectedProject.link} className="modal-action-btn" onClick={() => setSelectedProject(null)}>
                  <span>View in Showcase</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
