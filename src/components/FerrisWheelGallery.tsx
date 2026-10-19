import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ExternalLink, Github, ChevronLeft, ChevronRight, Layers, ArrowUpRight } from 'lucide-react';

export interface GalleryProject {
  id: string;
  title: string;
  tag: string;
  subtitle: string;
  description: string;
  screenshot: string;
  fallbackScreenshot: string;
  liveUrl: string;
  githubUrl?: string;
  tech: string[];
}

export const SHOWCASE_PROJECTS: GalleryProject[] = [
  {
    id: 'toolkb',
    title: 'ToolKB',
    tag: 'Browser Utility Platform',
    subtitle: 'High-performance client-side developer utility & productivity suite',
    description:
      'A comprehensive suite of client-side developer utilities providing zero-latency code converters, formatters, cryptography hashing, and payload parsers directly in the browser with no server roundtrips.',
    screenshot: './assets/toolkb.webp',
    fallbackScreenshot: './assets/toolkb.png',
    liveUrl: 'https://toolkb.in/',
    githubUrl: 'https://github.com/abhigyansaikiaa/toolkb',
    tech: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Web Crypto API'],
  },
  {
    id: 'arogya-relief',
    title: 'Arogya Relief',
    tag: 'Healthcare & Crisis Triage',
    subtitle: 'Emergency medical supply coordination and crisis triage platform',
    description:
      'Engineered to track critical medical inventory and coordinate frontline clinic triage during disaster scenarios. Features offline-first local persistence, emergency routing, and triage severity ranking.',
    screenshot: './assets/arogyarelief.webp',
    fallbackScreenshot: './assets/arogyarelief.png',
    liveUrl: 'https://arogyarelief.vercel.app/',
    githubUrl: 'https://github.com/abhigyansaikiaa/arogyarelief',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Leaflet', 'Node.js'],
  },
  {
    id: 'motion-subtitles',
    title: 'Motion Subtitle Studio',
    tag: 'Video & Motion Typography',
    subtitle: 'Automated video transcription and kinetic typography animation suite',
    description:
      'A creative studio tool combining the Web Audio API and HTML5 Canvas to deliver real-time audio-waveform transcription, customizable kinetic text motion, and exportable animated subtitle tracks.',
    screenshot: './assets/motionsubtitles.webp',
    fallbackScreenshot: './assets/motionsubtitles.png',
    liveUrl: 'https://motionsubtitles.vercel.app/',
    githubUrl: 'https://github.com/abhigyansaikiaa/motionsubtitles',
    tech: ['Web Audio API', 'HTML5 Canvas', 'TypeScript', 'Tailwind CSS'],
  },
  {
    id: 'brandcey',
    title: 'Brandcey',
    tag: 'Creative Marketplace',
    subtitle: 'B2B creative services platform and design asset exchange',
    description:
      'A multi-vendor digital marketplace connecting agencies with specialized creative directors. Includes milestone escrow tracking, interactive design asset previews, and real-time project messaging.',
    screenshot: './assets/brandcey.webp',
    fallbackScreenshot: './assets/brandcey.png',
    liveUrl: 'https://brandcey.vercel.app/',
    githubUrl: 'https://github.com/abhigyansaikiaa/brandcey',
    tech: ['React 19', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Framer Motion'],
  },
];

export const FerrisWheelGallery: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const total = SHOWCASE_PROJECTS.length;

  const nextProject = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevProject = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle if gallery or its children have focus or when hovering
      if (!containerRef.current?.contains(document.activeElement) && !containerRef.current?.matches(':hover')) {
        return;
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextProject();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevProject();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextProject, prevProject]);

  // Drag / Touch gestures
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setDragOffset(0);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - startX;
    setDragOffset(delta);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset < -60) {
      nextProject();
    } else if (dragOffset > 60) {
      prevProject();
    }
    setDragOffset(0);
  };

  const activeProject = SHOWCASE_PROJECTS[activeIndex];

  return (
    <section
      id="works"
      className="ferris-gallery-section"
      ref={containerRef}
      aria-label="Interactive Projects Showcase (Prompt 1)"
      tabIndex={0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <div className="gallery-header-strip">
        <div className="gallery-header-left">
          <span className="gallery-kicker">FEATURED WORK</span>
          <h2 className="gallery-headline">Engineered Products</h2>
          <p className="gallery-subhead">
            Focused web platforms, client-side developer utilities, and high-impact digital systems.
          </p>
        </div>

        {/* Counter and Carousel Controls */}
        <div className="gallery-controls-box">
          <div className="gallery-counter">
            <span className="current-num">{String(activeIndex + 1).padStart(2, '0')}</span>
            <span className="counter-sep">/</span>
            <span className="total-num">{String(total).padStart(2, '0')}</span>
          </div>

          <div className="gallery-arrows">
            <button
              onClick={prevProject}
              className="gallery-nav-btn"
              aria-label="Previous Project"
              type="button"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextProject}
              className="gallery-nav-btn"
              aria-label="Next Project"
              type="button"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Wheel & Project Presentation View */}
      <div className="ferris-viewport">
        {/* 3D Circular Orbit Ring */}
        <div className="ferris-stage">
          {SHOWCASE_PROJECTS.map((project, idx) => {
            // Compute relative offset in circular ring
            let offset = idx - activeIndex;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const isActive = idx === activeIndex;
            const distance = Math.abs(offset);

            // Compute 3D transformation properties
            const rotateY = offset * 32;
            const translateZ = -distance * 140;
            const translateX = offset * 260 + (isDragging ? dragOffset * 0.4 : 0);
            const scale = 1 - distance * 0.15;
            const opacity = 1 - distance * 0.45;

            return (
              <div
                key={project.id}
                className={`ferris-card-slot ${isActive ? 'is-active' : ''}`}
                style={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity: Math.max(0.15, opacity),
                  zIndex: 20 - distance * 5,
                }}
                onClick={() => setActiveIndex(idx)}
              >
                <div className="ferris-card-inner">
                  <div className="ferris-image-container">
                    <img
                      src={project.screenshot}
                      alt={project.title}
                      loading="lazy"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (target.src !== project.fallbackScreenshot) {
                          target.src = project.fallbackScreenshot;
                        }
                      }}
                    />
                    <div className="ferris-image-overlay" />
                    <span className="ferris-card-tag">{project.tag}</span>
                  </div>

                  <div className="ferris-card-meta">
                    <h3 className="ferris-card-title">{project.title}</h3>
                    <p className="ferris-card-subtitle">{project.subtitle}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Project Dossier Strip */}
      <div className="active-project-dossier">
        <div className="dossier-left">
          <div className="dossier-badge-row">
            <span className="dossier-pill-active">ACTIVE SELECTION</span>
            <span className="dossier-pill-tag">{activeProject.tag}</span>
          </div>
          <h3 className="dossier-title">{activeProject.title}</h3>
          <p className="dossier-desc">{activeProject.description}</p>

          <div className="dossier-tech-row">
            {activeProject.tech.map((t) => (
              <span key={t} className="tech-chip">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="dossier-actions">
          <a
            href={activeProject.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="dossier-action-btn primary"
          >
            <span>Visit Live Platform</span>
            <ArrowUpRight size={16} />
          </a>

          {activeProject.githubUrl && (
            <a
              href={activeProject.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="dossier-action-btn secondary"
            >
              <Github size={16} />
              <span>Source Repository</span>
            </a>
          )}
        </div>
      </div>

      {/* Quick Select Thumbnail Strip */}
      <div className="gallery-thumbnail-strip">
        {SHOWCASE_PROJECTS.map((p, idx) => (
          <button
            key={p.id}
            type="button"
            className={`thumb-pill ${idx === activeIndex ? 'is-selected' : ''}`}
            onClick={() => setActiveIndex(idx)}
          >
            <span className="thumb-idx">{String(idx + 1).padStart(2, '0')}</span>
            <span className="thumb-name">{p.title}</span>
          </button>
        ))}
      </div>
    </section>
  );
};
