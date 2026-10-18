import React, { useState } from 'react';
import { ToolDock, ToolDockTile, ToolDockItem } from './ui/techstack';
import { Cpu, Code2, Server, Database, Sparkles, CheckCircle2 } from 'lucide-react';

interface VerifiedSkillMetadata {
  label: string;
  category: 'Frontend' | 'Backend' | 'Language' | 'DevOps & Testing';
  role: string;
  verifiedIn: string;
  bg: string;
  svgPath: string;
}

const VERIFIED_SKILLS_DATA: VerifiedSkillMetadata[] = [
  {
    label: 'React 19',
    category: 'Frontend',
    role: 'Component state modeling, concurrent hooks, SPA architectures',
    verifiedIn: 'ToolKB.in, Arogya Relief, Motion Subtitles',
    bg: 'bg-[#0f172a]',
    svgPath: 'https://cdn.simpleicons.org/react/61DAFB',
  },
  {
    label: 'Next.js',
    category: 'Frontend',
    role: 'App Router, Server Components, API routes, edge deployments',
    verifiedIn: 'ToolKB.in, Brandcey',
    bg: 'bg-[#000000]',
    svgPath: 'https://svgl.app/library/nextjs_icon_dark.svg',
  },
  {
    label: 'TypeScript',
    category: 'Language',
    role: 'Strict typing, domain schemas, refactoring safety',
    verifiedIn: 'All production repositories',
    bg: 'bg-[#1e293b]',
    svgPath: 'https://svgl.app/library/typescript.svg',
  },
  {
    label: 'Tailwind CSS',
    category: 'Frontend',
    role: 'Design tokens, spatial math, responsive grid ergonomics',
    verifiedIn: 'ToolKB.in, Brandcey, Portfolio',
    bg: 'bg-[#082f49]',
    svgPath: 'https://svgl.app/library/tailwindcss.svg',
  },
  {
    label: 'Node.js',
    category: 'Backend',
    role: 'RESTful endpoints, automated processing pipelines, microservices',
    verifiedIn: 'Arogya Relief backend, build tooling',
    bg: 'bg-[#064e3b]',
    svgPath: 'https://svgl.app/library/nodejs.svg',
  },
  {
    label: 'Python',
    category: 'Language',
    role: 'Media automation, Whisper transcription, data transformations',
    verifiedIn: 'Motion Subtitle Studio, ESR Analyzer',
    bg: 'bg-[#1e1e24]',
    svgPath: 'https://svgl.app/library/python.svg',
  },
  {
    label: 'PostgreSQL',
    category: 'Backend',
    role: 'Relational data modeling, ACID transactions, migrations',
    verifiedIn: 'Arogya Relief, Dhankathaa',
    bg: 'bg-[#1e293b]',
    svgPath: 'https://svgl.app/library/postgresql.svg',
  },
  {
    label: 'GitHub',
    category: 'DevOps & Testing',
    role: 'Version control, open-source releases, automated CI/CD',
    verifiedIn: 'github.com/abhigyansaikiaa',
    bg: 'bg-[#0d1117]',
    svgPath: 'https://cdn.simpleicons.org/github/white',
  },
  {
    label: 'Vite',
    category: 'DevOps & Testing',
    role: 'Fast HMR, module bundling, modern build toolchains',
    verifiedIn: 'Portfolio runtime, ToolKB.in',
    bg: 'bg-[#312e81]',
    svgPath: 'https://cdn.simpleicons.org/vite/646CFF',
  },
  {
    label: 'Vitest',
    category: 'DevOps & Testing',
    role: 'Unit testing, math verification, test-driven reliability',
    verifiedIn: 'Portfolio test suites (26 unit tests)',
    bg: 'bg-[#14532d]',
    svgPath: 'https://svgl.app/library/vitest.svg',
  },
  {
    label: 'Vercel',
    category: 'DevOps & Testing',
    role: 'Production edge deployments, analytics, serverless functions',
    verifiedIn: 'abhigyan-portfolio-eta.vercel.app',
    bg: 'bg-[#000000]',
    svgPath: 'https://svgl.app/library/vercel_dark.svg',
  },
];

function createDockItem(skill: VerifiedSkillMetadata): ToolDockItem {
  return {
    label: skill.label,
    icon: (
      <ToolDockTile className={skill.bg}>
        <img
          src={skill.svgPath}
          alt=""
          draggable={false}
          style={{
            width: '58%',
            height: '58%',
            maxWidth: '28px',
            maxHeight: '28px',
            objectFit: 'contain',
            display: 'block',
          }}
          onError={(e) => {
            // Safe fallback if external SVG network fails
            const target = e.currentTarget;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent && !parent.querySelector('.skill-fallback-abbr')) {
              const span = document.createElement('span');
              span.className = 'skill-fallback-abbr';
              span.style.cssText =
                'font-weight: 800; font-size: 11px; color: #ffffff; letter-spacing: -0.02em; font-family: monospace;';
              span.textContent = skill.label.replace(/[^a-zA-Z]/g, '').slice(0, 3).toUpperCase();
              parent.appendChild(span);
            }
          }}
        />
      </ToolDockTile>
    ),
  };
}

export const SkillsSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const categories = ['All', 'Frontend', 'Backend', 'Language', 'DevOps & Testing'];

  const filteredSkills = selectedFilter === 'All'
    ? VERIFIED_SKILLS_DATA
    : VERIFIED_SKILLS_DATA.filter((s) => s.category === selectedFilter);

  const dockItems: ToolDockItem[] = filteredSkills.map(createDockItem);

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
                onClick={() => setSelectedFilter(cat)}
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
          />
        </div>

        {/* Accessible Discoverability Grid (Mobile & Touch Accessible) */}
        <div className="skills-accessible-grid">
          {filteredSkills.map((skill) => (
            <div key={skill.label} className="skill-spec-card">
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
