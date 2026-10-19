import React, { useState } from 'react';
import { ToolDock, ToolDockTile, ToolDockItem } from './ui/techstack';
import { Cpu, CheckCircle2 } from 'lucide-react';

interface VerifiedSkillMetadata {
  id: string;
  label: string;
  category: 'Frontend' | 'Backend' | 'Language' | 'DevOps & Testing';
  role: string;
  verifiedIn: string;
  svgPath: string;
}

const VERIFIED_SKILLS_DATA: VerifiedSkillMetadata[] = [
  {
    id: 'react',
    label: 'React 19',
    category: 'Frontend',
    role: 'Component state modeling, concurrent hooks, SPA architectures',
    verifiedIn: 'ToolKB.in, Arogya Relief, Motion Subtitles',
    svgPath: './assets/tech-logos/react.svg',
  },
  {
    id: 'nextjs',
    label: 'Next.js',
    category: 'Frontend',
    role: 'App Router, Server Components, API routes, edge deployments',
    verifiedIn: 'ToolKB.in, Brandcey',
    svgPath: './assets/tech-logos/nextjs.svg',
  },
  {
    id: 'typescript',
    label: 'TypeScript',
    category: 'Language',
    role: 'Strict typing, domain schemas, refactoring safety',
    verifiedIn: 'All production repositories',
    svgPath: './assets/tech-logos/typescript.svg',
  },
  {
    id: 'tailwind',
    label: 'Tailwind CSS',
    category: 'Frontend',
    role: 'Design tokens, spatial math, responsive grid ergonomics',
    verifiedIn: 'ToolKB.in, Brandcey, Portfolio',
    svgPath: './assets/tech-logos/tailwindcss.svg',
  },
  {
    id: 'nodejs',
    label: 'Node.js',
    category: 'Backend',
    role: 'RESTful endpoints, automated processing pipelines, microservices',
    verifiedIn: 'Arogya Relief backend, build tooling',
    svgPath: './assets/tech-logos/nodejs.svg',
  },
  {
    id: 'python',
    label: 'Python',
    category: 'Language',
    role: 'Media automation, Whisper transcription, data transformations',
    verifiedIn: 'Motion Subtitle Studio, ESR Analyzer',
    svgPath: './assets/tech-logos/python.svg',
  },
  {
    id: 'postgresql',
    label: 'PostgreSQL',
    category: 'Backend',
    role: 'Relational data modeling, ACID transactions, migrations',
    verifiedIn: 'Arogya Relief, Dhankathaa',
    svgPath: './assets/tech-logos/postgresql.svg',
  },
  {
    id: 'github',
    label: 'GitHub',
    category: 'DevOps & Testing',
    role: 'Version control, open-source releases, automated CI/CD',
    verifiedIn: 'github.com/abhigyansaikiaa',
    svgPath: './assets/tech-logos/github.svg',
  },
  {
    id: 'vite',
    label: 'Vite',
    category: 'DevOps & Testing',
    role: 'Fast HMR, module bundling, modern build toolchains',
    verifiedIn: 'Portfolio runtime, ToolKB.in',
    svgPath: './assets/tech-logos/vite.svg',
  },
  {
    id: 'vitest',
    label: 'Vitest',
    category: 'DevOps & Testing',
    role: 'Unit testing, math verification, test-driven reliability',
    verifiedIn: 'Portfolio test suites (26 unit tests)',
    svgPath: './assets/tech-logos/vitest.svg',
  },
  {
    id: 'vercel',
    label: 'Vercel',
    category: 'DevOps & Testing',
    role: 'Production edge deployments, analytics, serverless functions',
    verifiedIn: 'abhigyan-portfolio-eta.vercel.app',
    svgPath: './assets/tech-logos/vercel.svg',
  },
];

/**
 * High-fidelity vector fallbacks rendered if an image fails to load.
 */
const VECTOR_FALLBACKS: Record<string, React.ReactNode> = {
  react: (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-[58%] h-[58%] max-w-[28px] max-h-[28px]">
      <circle cx="0" cy="0" r="2.05" fill="#087ea4" />
      <g stroke="#087ea4" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  ),
  nextjs: (
    <svg viewBox="0 0 180 180" className="w-[58%] h-[58%] max-w-[28px] max-h-[28px]">
      <circle cx="90" cy="90" r="90" fill="#000000" />
      <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="#ffffff" />
      <rect x="115" y="54" width="12" height="72" fill="#ffffff" />
    </svg>
  ),
  typescript: (
    <svg viewBox="0 0 256 256" className="w-[58%] h-[58%] max-w-[28px] max-h-[28px]">
      <rect width="256" height="256" rx="40" fill="#3178C6" />
      <text x="50%" y="65%" textAnchor="middle" fill="#ffffff" fontSize="130" fontWeight="bold" fontFamily="sans-serif">TS</text>
    </svg>
  ),
  tailwind: (
    <svg viewBox="0 0 54 33" className="w-[58%] h-[58%] max-w-[28px] max-h-[28px]">
      <path fill="#38BDF8" fillRule="evenodd" d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C33.256 3.11 30.192 0 23.5 0 23.5 0 27 0 27 0zM13.5 16.2c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z" />
    </svg>
  ),
  nodejs: (
    <svg viewBox="0 0 256 292" className="w-[58%] h-[58%] max-w-[28px] max-h-[28px]">
      <path fill="#41873F" d="M127.994 0L10.375 67.925v135.84l117.619 67.925 117.62-67.925V67.925L127.994 0z" />
      <text x="50%" y="60%" textAnchor="middle" fill="#ffffff" fontSize="100" fontWeight="bold" fontFamily="sans-serif">JS</text>
    </svg>
  ),
  python: (
    <svg viewBox="0 0 110 110" className="w-[58%] h-[58%] max-w-[28px] max-h-[28px]">
      <path fill="#387EB8" d="M54.4 2C27.5 2 29.2 13.7 29.2 13.7l.03 12.1h25.7v3.6H18.9S2 27.5 2 54.6c0 27.2 15 26.2 15 26.2h8.9v-12.6s-.5-15 14.8-15h25.5s14.3.2 14.3-13.8V15.7S82.5 2 54.4 2zm-14.2 8.1a4.6 4.6 0 1 1 0 9.2 4.6 4.6 0 0 1 0-9.2z" />
      <path fill="#FFE052" d="M55.2 107.5c26.9 0 25.2-11.7 25.2-11.7l-.03-12.1H54.7v-3.6h36s16.9 1.9 16.9-25.2c0-27.2-15-26.2-15-26.2h-9v12.6s.5 15-14.8 15H43.3s-14.3-.2-14.3 13.8v23.7s-2 13.7 26.2 13.7zm14.1-8.1a4.6 4.6 0 1 1 0-9.2 4.6 4.6 0 0 1 0 9.2z" />
    </svg>
  ),
  postgresql: (
    <svg viewBox="0 0 432 445" className="w-[58%] h-[58%] max-w-[28px] max-h-[28px]">
      <path d="M402.395 271.23c-50.302 10.376-53.76-6.655-53.76-6.655 53.111-78.808 75.313-178.843 56.153-203.326-52.27-66.785-142.752-35.2-144.262-34.38l-.486.087c-9.938-2.063-21.06-3.292-33.56-3.496-22.761-.373-40.026 5.967-53.127 15.902 0 0-161.411-66.495-153.904 83.63 1.597 31.938 45.776 241.657 98.471 178.312 19.26-23.163 37.869-42.748 37.869-42.748 9.243 6.14 20.308 9.272 31.908 8.147l.901-.765c-.28 2.876-.152 5.689.361 9.019-13.575 15.167-9.586 17.83-36.723 23.416-27.459 5.659-11.328 15.734-.796 18.367 12.768 3.193 42.307 7.716 62.266-20.224l-.796 3.188c5.319 4.26 9.054 27.711 8.428 48.969-.626 21.259-1.044 35.854 3.147 47.254 4.191 11.4 8.368 37.05 44.042 29.406 29.809-6.388 45.256-22.942 47.405-50.555 1.525-19.631 4.976-16.729 5.194-34.28l2.768-8.309c3.192-26.611.507-35.196 18.872-31.203l4.463.392c13.517.615 31.208-2.174 41.591-7 22.358-10.376 35.618-27.7 13.573-23.148z" fill="#336791" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" className="w-[58%] h-[58%] max-w-[28px] max-h-[28px]">
      <path fill="#181717" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  ),
  vite: (
    <svg viewBox="0 0 32 32" className="w-[58%] h-[58%] max-w-[28px] max-h-[28px]">
      <path fill="#BD34FE" d="M29.5 5.8L16.7 28.5c-.3.5-1 .5-1.3 0L2.5 5.8c-.4-.6.1-1.3.8-1.2l12.4 2.3c.2 0 .4 0 .6-.1L28.7 4.6c.7-.1 1.2.6.8 1.2z" />
      <path fill="#FFD800" d="M21.2 1.3l-9.8 1.8c-.3.1-.5.3-.6.6L7.3 11.2c-.3.7.3 1.4 1 1.2l3.4-.8-3.7 8.2c-.4.8.5 1.6 1.2 1.1l11.4-8.8c.6-.5.3-1.6-.5-1.6l-3.9-.1 5.3-8.8c.4-.7-.2-1.6-.9-1.3l-.5.2z" />
    </svg>
  ),
  vitest: (
    <svg viewBox="0 0 256 256" className="w-[58%] h-[58%] max-w-[28px] max-h-[28px]">
      <path fill="#729B1B" d="M128 251.6a6.7 6.7 0 0 1-9.9 2.2L3 170.8A6.7 6.7 0 0 1 0 165.3V65.2a6.7 6.7 0 0 1 10.7-5.4l69.8 50.8a13.5 13.5 0 0 0 19.7-4.3L158 4.7a6.7 6.7 0 0 1 5.9-3.4h92.8c5.2 0 8.4 5.6 5.9 10.1L128 251.6z" />
      <circle cx="198" cy="58" r="32" fill="#FCC72B" />
    </svg>
  ),
  vercel: (
    <svg viewBox="0 0 24 24" className="w-[58%] h-[58%] max-w-[28px] max-h-[28px]">
      <polygon points="12,3 22,20 2,20" fill="#000000" />
    </svg>
  ),
};

const SkillLogo: React.FC<{ skill: VerifiedSkillMetadata }> = ({ skill }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    if (VECTOR_FALLBACKS[skill.id]) {
      return <>{VECTOR_FALLBACKS[skill.id]}</>;
    }
    const abbr = skill.label.replace(/[^a-zA-Z]/g, '').slice(0, 3).toUpperCase();
    return (
      <span
        className="skill-fallback-abbr"
        style={{
          fontWeight: 800,
          fontSize: '11px',
          color: '#0f172a',
          letterSpacing: '-0.02em',
          fontFamily: 'monospace',
          userSelect: 'none',
        }}
        aria-label={skill.label}
      >
        {abbr}
      </span>
    );
  }

  return (
    <img
      src={skill.svgPath}
      alt={skill.label}
      draggable={false}
      style={{
        width: '58%',
        height: '58%',
        maxWidth: '28px',
        maxHeight: '28px',
        objectFit: 'contain',
        display: 'block',
        margin: 'auto',
      }}
      onError={() => setHasError(true)}
    />
  );
};

export const SkillsSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [activeSkillIdx, setActiveSkillIdx] = useState<number | null>(null);

  const categories = ['All', 'Frontend', 'Backend', 'Language', 'DevOps & Testing'];

  const filteredSkills = selectedFilter === 'All'
    ? VERIFIED_SKILLS_DATA
    : VERIFIED_SKILLS_DATA.filter((s) => s.category === selectedFilter);

  const dockItems: ToolDockItem[] = filteredSkills.map((skill) => ({
    label: skill.label,
    icon: (
      <ToolDockTile>
        <SkillLogo skill={skill} />
      </ToolDockTile>
    ),
  }));

  const activeSkill = activeSkillIdx !== null && filteredSkills[activeSkillIdx]
    ? filteredSkills[activeSkillIdx]
    : null;

  return (
    <section className="skills-dock-section" id="skills" aria-label="Verified Technical Skills Dock">
      <div className="section-container">
        {/* Section Header */}
        <div className="skills-header">
          <div className="skills-badge">
            <Cpu size={14} />
            <span>CORE STACK • TESTED IN PRODUCTION</span>
          </div>
          <h2 className="skills-title">Interactive Technology Dock</h2>
          <p className="skills-subtitle">
            Hover or drag across the magnification dock to inspect core languages, frameworks, and developer toolchains.
          </p>

          {/* Category Filter Pills */}
          <div className="skills-filter-row" role="tablist" aria-label="Filter skills by discipline">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={selectedFilter === cat}
                className={`skills-filter-btn ${selectedFilter === cat ? 'is-active' : ''}`}
                onClick={() => {
                  setSelectedFilter(cat);
                  setActiveSkillIdx(null);
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Module C: ToolDock Magnification Component */}
        <div className="skills-dock-container">
          <ToolDock
            items={dockItems}
            label="Verified Technical Stack"
            size={50}
            overlap={0.1}
            magnification={0.24}
            tilt={true}
            onActiveChange={setActiveSkillIdx}
          />
        </div>

        {/* Accessible Discoverability Grid (Mobile & Touch Accessible) */}
        <div className="skills-accessible-grid">
          {filteredSkills.map((skill, index) => {
            const isHighlighted = activeSkill?.label === skill.label;
            return (
              <div
                key={skill.label}
                className={`skill-spec-card ${isHighlighted ? 'is-highlighted' : ''}`}
                onMouseEnter={() => setActiveSkillIdx(index)}
                onMouseLeave={() => setActiveSkillIdx(null)}
                tabIndex={0}
                role="region"
                aria-label={`${skill.label} details`}
              >
                <div className="skill-card-top">
                  <span className="skill-name">{skill.label}</span>
                  <span className="skill-cat-pill">{skill.category}</span>
                </div>
                <p className="skill-role">{skill.role}</p>
                <div className="skill-proof">
                  <CheckCircle2 size={12} className="proof-icon" />
                  <span>Verified in: {skill.verifiedIn}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
