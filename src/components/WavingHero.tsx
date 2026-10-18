import React, { useState, useEffect } from 'react';
import { WavingPortfolioLanding } from './ui/waving-portfolio-landing';
import { AgentModeView } from './AgentModeView';
import { initSmoothScroll } from '../lib/lenis-scroll';
import { Github, Linkedin } from 'lucide-react';

export const WavingHero: React.FC = () => {
  const [mode, setMode] = useState<'human' | 'agent'>('human');

  // Initialize Lenis smooth scroll without duplicating
  useEffect(() => {
    initSmoothScroll();
  }, []);

  // Agent Mode View preserved
  if (mode === 'agent') {
    return <AgentModeView onSwitchToHuman={() => setMode('human')} />;
  }

  return (
    <section className="relative w-full overflow-hidden" id="hero" aria-label="Portfolio Hero">
      {/* =========================================================================
          PRESERVED SITE NAVIGATION BAR
          Positioned elegantly above the hero with clear spacing for corner dice
          ========================================================================= */}
      <header className="browser-site-header wpl-site-header" role="banner">
        <div className="header-inner">
          {/* Brand Wordmark */}
          <div className="header-brand-wrap">
            <a
              href="#"
              className="header-brand-wordmark"
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
            aria-label="Portfolio Navigation"
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
                className={`mode-btn ${mode === 'human' ? 'is-active' : ''}`}
                onClick={() => setMode('human')}
                aria-pressed={mode === 'human'}
              >
                Human
              </button>
              <span className="mode-slash">/</span>
              <button
                type="button"
                className={`mode-btn ${mode === 'agent' ? 'is-active' : ''}`}
                onClick={() => setMode('agent')}
                aria-pressed={mode === 'agent'}
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
          SUPPLIED PERSONALIZED WAVING PORTFOLIO LANDING COMPONENT
          ========================================================================= */}
      <WavingPortfolioLanding
        name="Abhigyan Saikia"
        year="2026"
        roles={["Full Stack Developer", "Web Developer"]}
        lettersLeft={["P", "F"]}
        giantLetter="O"
        lettersRight={["RT", "LIO"]}
        title="Portfolio"
        signature="ABHI/GYAN"
        greeting="Hi there!"
        accent="#e5262c"
        paper="#f6f4f0"
        ink="#141414"
        intro={true}
        height="var(--wpl-hero-h, 100svh)"
      />
    </section>
  );
};

export default WavingHero;
