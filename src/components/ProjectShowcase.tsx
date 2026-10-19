import React, { useState } from 'react';
import { FerrisWheelGallery, FerrisWheelItem } from './ui/ferris-wheel-gallery';
import { Layers, ArrowUpRight } from 'lucide-react';

interface VerifiedPortfolioProject extends FerrisWheelItem {
  id: string;
  link: string;
  external: boolean;
  description: string;
  tags: string[];
}

const VERIFIED_PROJECT_ITEMS: VerifiedPortfolioProject[] = [
  {
    id: 'toolkb',
    title: 'ToolKB.in',
    discipline: 'Browser Utility Platform',
    year: '2026',
    src: './assets/toolkb.webp',
    alt: 'ToolKB.in developer utilities and client-side web tools',
    link: 'https://toolkb.in/',
    external: true,
    description: 'Fast, client-side developer and productivity utilities with zero tracking and instant local processing.',
    tags: ['Next.js', 'TypeScript', 'Web Workers', 'Tailwind'],
  },
  {
    id: 'arogya-relief',
    title: 'Arogya Relief',
    discipline: 'Healthcare Platform',
    year: '2025',
    src: './assets/arogyarelief.webp',
    alt: 'Arogya Relief medical emergency coordination portal',
    link: 'https://www.arogyarelief.in/',
    external: true,
    description: 'Healthcare relief platform engineered for emergency response, hospital bed inventory, and medical access in Assam.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Mapbox'],
  },
  {
    id: 'motion-subtitles',
    title: 'Motion Subtitle Studio',
    discipline: 'Creator Tool',
    year: '2025',
    src: './assets/motionsubtitles.webp',
    alt: 'Motion Subtitle Studio automated captioning interface',
    link: 'https://github.com/abhigyansaikiaa/Motion-Subtitle-Studio',
    external: true,
    description: 'Automated video captioning and dynamic motion typography studio for content creators.',
    tags: ['Python', 'Whisper AI', 'FFmpeg', 'React'],
  },
  {
    id: 'brandcey',
    title: 'Brandcey',
    discipline: 'Services Marketplace',
    year: '2026',
    src: './assets/brandcey.webp',
    alt: 'Brandcey freelance services marketplace platform',
    link: 'https://www.brandcey.in/',
    external: true,
    description: 'Modern freelance marketplace connecting creators, brands, and digital builders with verified milestones.',
    tags: ['Next.js', 'Tailwind', 'Stripe', 'Node.js'],
  },
  {
    id: 'qrivna',
    title: 'Qrivna',
    discipline: 'Interactive Web Experience',
    year: '2025',
    src: './qrivna_demo_pro.webp',
    alt: 'Qrivna interactive web experience demo',
    link: 'https://github.com/abhigyansaikiaa',
    external: true,
    description: 'Modern web experience built with high-performance CSS 3D physics and intuitive micro-interactions.',
    tags: ['WebGL', 'CSS 3D', 'TypeScript'],
  },
  {
    id: 'brollwriter',
    title: 'BrollWriter',
    discipline: 'Production Scripting SaaS',
    year: '2025',
    src: './brollwriter_demo_pro.webp',
    alt: 'BrollWriter video sequencing and script interface',
    link: 'https://github.com/abhigyansaikiaa',
    external: true,
    description: 'AI-assisted video b-roll sequencing and YouTube scripting workflow tool for digital storytellers.',
    tags: ['React', 'FastAPI', 'Python'],
  },
  {
    id: 'dhankathaa',
    title: 'Dhankathaa',
    discipline: 'Wealth & Asset Analytics',
    year: '2025',
    src: './dhankathaa_demo_pro.webp',
    alt: 'Dhankathaa personal finance and portfolio dashboard',
    link: 'https://github.com/abhigyansaikiaa',
    external: true,
    description: 'Personal financial dashboard, investment intelligence, and expense telemetry for disciplined tracking.',
    tags: ['Next.js', 'Chart.js', 'PostgreSQL'],
  },
  {
    id: 'resumeiq',
    title: 'ResumeIQ',
    discipline: 'Career Tech',
    year: '2025',
    src: './resumeiq-hero.png',
    alt: 'ResumeIQ ATS benchmark and resume analysis tool',
    link: 'https://github.com/abhigyansaikiaa',
    external: true,
    description: 'Deep resume parser, ATS benchmark analyzer, and structured career feedback engine.',
    tags: ['React', 'Python', 'NLP'],
  },
];

export const ProjectShowcase: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const currentProject = VERIFIED_PROJECT_ITEMS[activeIdx] || VERIFIED_PROJECT_ITEMS[0];

  return (
    <section className="project-showcase-section" id="works" aria-label="Featured Projects Showcase">
      <div className="section-container">
        {/* Editorial Section Header */}
        <div className="showcase-header">
          <div className="showcase-badge">
            <Layers size={14} />
            <span>SELECTED WORK • 2025–2026</span>
          </div>
          <h2 className="showcase-title">Engineered Products & Applications</h2>
          <p className="showcase-subtitle">
            A curated collection of web platforms, developer utilities, and medical technology systems built for production.
          </p>

          {/* Rebalanced Verified Applications Button / Pill */}
          <div className="mt-6 flex items-center justify-center">
            <button
              type="button"
              onClick={() => setActiveIdx(0)}
              className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-mono rounded-full border border-primary/40 bg-primary/10 text-primary hover:bg-primary/20 hover:border-primary transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40"
              aria-label={`View Verified Applications (${VERIFIED_PROJECT_ITEMS.length})`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span>Verified Applications ({VERIFIED_PROJECT_ITEMS.length})</span>
            </button>
          </div>
        </div>

        {/* Ferris Wheel Interactive Gallery Component (Module B) */}
        <div className="showcase-gallery-wrap">
          <FerrisWheelGallery
            items={VERIFIED_PROJECT_ITEMS}
            active={activeIdx}
            onActiveChange={setActiveIdx}
            autoplay={false}
          />
        </div>

        {/* Active Project Live Link Handoff */}
        <div className="showcase-active-bar">
          <div className="active-project-meta">
            <span className="active-tag">{currentProject.discipline}</span>
            <h3 className="active-name">{currentProject.title}</h3>
            <p className="active-desc">{currentProject.description}</p>
            <div className="active-tags-row">
              {currentProject.tags.map((t) => (
                <span key={t} className="active-tech-pill">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="active-project-action">
            <a
              href={currentProject.link}
              target="_blank"
              rel="noopener noreferrer"
              className="active-cta-button"
              aria-label={`Open ${currentProject.title} in new tab`}
            >
              <span>Visit Live Project</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
