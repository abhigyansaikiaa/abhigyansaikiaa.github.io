import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { BrowserWindow } from './BrowserWindow';
import { PaintedSky } from './PaintedSky';
import { AgentModeView } from './AgentModeView';
import { HERO_BROWSER_WINDOWS } from '../data/browser-windows';
import { windowPose, sceneCamera } from '../lib/browser-scene';
import { preloadImages } from '../lib/asset-loader';
import { initSmoothScroll } from '../lib/lenis-scroll';
import { BrowserWindowItem } from '../types/browser-window';
import { Github, Linkedin, ExternalLink, X, ArrowUpRight } from 'lucide-react';

export const TerminalToRealityHero: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<BrowserWindowItem | null>(null);
  const [mode, setMode] = useState<'human' | 'agent'>('human');
  const [mouseParallax, setMouseParallax] = useState<{ rotX: number; rotY: number }>({
    rotX: 0,
    rotY: 0,
  });

  const [viewportWidth, setViewportWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1440
  );

  // Update viewport width on resize
  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    initSmoothScroll();
  }, []);

  // Preload critical assets in the background
  useEffect(() => {
    const urls = HERO_BROWSER_WINDOWS.map((w) => w.screenshot);
    urls.push('/assets/painted-sky.jpg');
    preloadImages(urls, undefined, 3200);
  }, []);

  // Subtle pointer parallax during interactive state
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX / innerWidth - 0.5) * 2;
      const normY = (e.clientY / innerHeight - 0.5) * 2;
      setMouseParallax({
        rotX: -normY * 3.5,
        rotY: normX * 4.5,
      });
    },
    []
  );

  // Click handler for browser windows
  const handleWindowClick = useCallback((item: BrowserWindowItem) => {
    if (item.external && item.link.startsWith('http')) {
      window.open(item.link, '_blank', 'noopener,noreferrer');
    } else {
      setSelectedProject(item);
    }
  }, []);

  // Camera parameters calculated from pure geometry engine (expansion=1)
  const camera = useMemo(() => {
    return sceneCamera(1, viewportWidth);
  }, [viewportWidth]);

  // Agent Mode View
  if (mode === 'agent') {
    return <AgentModeView onSwitchToHuman={() => setMode('human')} />;
  }

  return (
    <div
      className="browser-hero-master story-phase-interactive"
      onMouseMove={handleMouseMove}
      role="region"
      aria-label="Portfolio Hero Showcase"
    >
      {/* Atmospheric Painted Sky Artwork */}
      <PaintedSky opacity={1} />

      {/* =========================================================================
          SITE HEADER WITH WORDMARK & HUMAN/AGENT TOGGLE
          ========================================================================= */}
      <header className="browser-site-header">
        <div className="header-inner">
          {/* Brand Wordmark */}
          <div className="header-brand-wrap">
            <a
              href="#"
              className="header-brand-wordmark"
              style={{ color: '#ffffff' }}
              aria-label="Abhigyan Saikia — Portfolio Home"
            >
              <span className="brand-dot" />
              <span>ABHIGYAN</span>
            </a>
          </div>

          {/* Editorial Navigation */}
          <nav
            className="header-nav"
            style={{
              opacity: 1,
              pointerEvents: 'auto',
              transform: 'none',
            }}
            aria-label="Portfolio Worlds"
          >
            <ul className="header-nav-list">
              <li>
                <span className="nav-slash">/</span>
                <a href="#works" className="nav-link nav-build">
                  Work
                </a>
              </li>
              <li>
                <span className="nav-slash">/</span>
                <a href="#skills" className="nav-link nav-skills">
                  Skills
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
                <a href="#contact" className="nav-link nav-contact">
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          {/* Header Controls: Human / Agent Mode & Socials */}
          <div
            className="header-controls"
            style={{
              opacity: 1,
              pointerEvents: 'auto',
              transform: 'none',
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
          HERO HEADLINE & EDITORIAL INTRO
          ========================================================================= */}
      <div
        className="browser-hero-intro"
        style={{
          opacity: 1,
          transform: 'none',
        }}
      >
        <div className="hero-eyebrow">
          <span className="eyebrow-badge">FULL-STACK WEB DEVELOPER</span>
          <span className="eyebrow-sep">•</span>
          <span className="eyebrow-tag">Concept • Code • Production</span>
        </div>

        <h1 className="hero-headline">
          Websites. Digital Products.
          <br />
          <span className="headline-accent">Engineered for Production.</span>
        </h1>

        <p className="hero-description">
          Full-stack web applications and digital interfaces built with verified code,
          restrained typography, and production-grade architectures.
        </p>

        <div className="hero-action-row">
          <a href="#works" className="hero-cta-btn">
            <span>Explore Projects</span>
            <ArrowUpRight size={15} />
          </a>
          <span className="hero-hint">Hover or click browser windows to inspect</span>
        </div>
      </div>

      {/* =========================================================================
          3D BROWSER WINDOW STACK
          ========================================================================= */}
      <div
        className="browser-3d-stage"
        style={{
          perspective: `${camera.perspective}px`,
          opacity: 1,
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
            const pose = windowPose(idx, 1, 1, viewportWidth);
            const isHovered = hoveredId === item.id;

            return (
              <BrowserWindow
                key={item.id}
                item={item}
                pose={pose}
                isInteractive={true}
                isHovered={isHovered}
                onHover={setHoveredId}
                onClick={handleWindowClick}
              />
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          INTERACTIVE PROJECT DETAIL MODAL
          ========================================================================= */}
      {selectedProject && (
        <div
          className="browser-modal-overlay"
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Project Overview: ${selectedProject.title}`}
        >
          <div
            className="browser-modal-chassis"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '780px' }}
          >
            <div className="modal-chrome-bar">
              <div className="browser-dots">
                <span className="dot dot-close" onClick={() => setSelectedProject(null)} />
                <span className="dot dot-min" />
                <span className="dot dot-max" />
              </div>
              <div className="modal-domain-pill">
                <span>{selectedProject.urlLabel}</span>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project view"
              >
                <X size={16} />
              </button>
            </div>

            <div className="modal-content-body">
              <div className="modal-screenshot-wrap">
                <img
                  src={selectedProject.screenshot}
                  alt={selectedProject.title}
                  className="modal-screenshot-img"
                />
              </div>

              <div className="modal-info-pane">
                <div className="modal-meta-row">
                  <span className="modal-category">{selectedProject.category}</span>
                  {selectedProject.featured && (
                    <span className="modal-featured-badge">Featured Case Study</span>
                  )}
                </div>

                <h2 className="modal-project-title">{selectedProject.title}</h2>
                <p className="modal-project-desc">{selectedProject.description}</p>

                <div className="modal-actions-row">
                  {selectedProject.link && selectedProject.link.startsWith('http') && (
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="modal-action-btn primary"
                    >
                      <span>Visit Live Application</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                  <button
                    type="button"
                    className="modal-action-btn secondary"
                    onClick={() => setSelectedProject(null)}
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scroll to Explore Cue */}
      <a href="#works" className="hero-scroll-prompt" aria-label="Scroll down to explore portfolio">
        <div className="scroll-pill">
          <span>SCROLL TO EXPLORE</span>
          <span className="scroll-arrow">↓</span>
        </div>
      </a>
    </div>
  );
};
