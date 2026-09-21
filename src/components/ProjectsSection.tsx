import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from './FadeIn';
import LiveProjectButton from './LiveProjectButton';

interface ProjectData {
  number: string;
  category: string;
  name: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  image: string;
  year: string;
  status?: string;
}

const FEATURED_PROJECTS: ProjectData[] = [
  {
    number: '01',
    category: 'Web Tool / Image Processing',
    name: 'ToolKB',
    description: 'A client-side web utility for compressing, resizing, cropping, and converting images. Processes files entirely within the browser for privacy and speed, allowing users to hit exact KB size targets.',
    techStack: ['Frontend', 'Canvas API', 'Web APIs'],
    liveUrl: 'https://toolkb.in/',
    image: 'none',
    year: '2026',
    status: 'LIVE',
  },
  {
    number: '02',
    category: 'Healthcare / Disaster Relief',
    name: 'Arogya Relief',
    description: 'A disaster healthcare and relief coordination platform focused on helping people find emergency healthcare resources, disaster-readiness information, government schemes and relief resources.',
    techStack: ['Next.js', 'TypeScript', 'TailwindCSS', 'Supabase', 'Leaflet', 'OpenStreetMap'],
    liveUrl: 'https://www.arogyarelief.in/',
    image: '/arogya_demo.png',
    year: '2025',
    status: 'LIVE / IN DEVELOPMENT',
  },
  {
    number: '03',
    category: 'Creator Tool / Video Processing',
    name: 'Motion Subtitle Studio',
    description: 'A browser-based caption generation tool designed for short-form video creators. Features automatic transcription, styling, and ASS subtitle rendering.',
    techStack: ['React', 'Whisper', 'FFmpeg', 'TailwindCSS'],
    liveUrl: '#',
    image: 'none',
    year: '2025',
    status: 'PROTOTYPE',
  },
  {
    number: '04',
    category: 'Freelance Marketplace',
    name: 'Brandcey',
    description: 'A freelancer-client marketplace designed to make hiring, project management and freelancer discovery easier with verified profiles and project workflows.',
    techStack: ['Next.js', 'TypeScript', 'TailwindCSS', 'Clerk'],
    liveUrl: 'https://www.brandcey.in/',
    image: '/brandcey_demo.png',
    year: '2025',
    status: 'PROTOTYPE',
  },
];

const SECONDARY_PROJECTS: ProjectData[] = [
  {
    number: '05',
    category: 'Full Stack Web Application',
    name: 'Qrivna',
    description: 'Built for creators and businesses who needed QR tools that felt modern instead of outdated. A fast and minimal QR platform focused on customization, analytics, and clean user experience.',
    techStack: ['React', 'Supabase', 'TailwindCSS'],
    liveUrl: '#',
    image: '/qrivna_demo_pro.png',
    year: '2025',
    status: 'LIVE',
  },
  {
    number: '06',
    category: 'AI SaaS Dashboard',
    name: 'BrollWriter',
    description: 'An AI-powered SaaS dashboard built to automate video script writing. Designed with an elegant, cinematic UI to help creators focus on storytelling rather than formatting.',
    techStack: ['Next.js', 'TypeScript', 'OpenAI API'],
    liveUrl: '#',
    image: '/brollwriter_demo_pro.png',
    year: '2025',
    status: 'LIVE',
  },
  {
    number: '07',
    category: 'Analytics & Strategy Platform',
    name: 'Dhankathaa',
    description: 'A YouTube strategy and analytics platform. Designed to provide high-retention insights through a clean, data-rich interface that feels like a premium financial tool.',
    techStack: ['React', 'TailwindCSS', 'Chart.js'],
    liveUrl: '#',
    image: '/dhankathaa_demo_pro.png',
    year: '2024',
    status: 'LIVE',
  },
  {
    number: '08',
    category: 'Professional / Freelance Platform',
    name: 'GCMR.IN',
    description: 'A platform concept focused on connecting clients and freelancers with structured onboarding, verification, communication and project workflows.',
    techStack: ['Next.js', 'TypeScript', 'TailwindCSS'],
    liveUrl: '#',
    image: 'none',
    year: '2025',
    status: 'IN DEVELOPMENT',
  },
  {
    number: '09',
    category: 'Computer Vision / Hardware',
    name: 'ESR Analyzer',
    description: 'An experimental ESR measurement system using an ESP32-CAM to capture ESR tube images and assist with automated ESR measurement estimations.',
    techStack: ['Python', 'ESP32-CAM'],
    liveUrl: '#',
    image: 'none',
    year: '2024',
    status: 'EXPERIMENTAL',
  },
  {
    number: '10',
    category: 'Automation / Business Operations',
    name: 'Revenue Command Center',
    description: 'A prospecting and verification workflow designed to find businesses that may need website improvements, SEO work or digital services through browser automation.',
    techStack: ['Playwright', 'Node.js'],
    liveUrl: '#',
    image: 'none',
    year: '2024',
    status: 'EXPERIMENTAL',
  },
  {
    number: '11',
    category: 'Developer Tool',
    name: 'Vibe-Code Bug Tester',
    description: 'An experimental developer tool for automatically inspecting websites and detecting common frontend, layout, responsiveness and basic runtime issues.',
    techStack: ['Playwright', 'Node.js'],
    liveUrl: '#',
    image: 'none',
    year: '2024',
    status: 'EXPERIMENTAL',
  },
  {
    number: '12',
    category: 'Web Application',
    name: 'Orchids',
    description: 'A modern web application built with a focus on seamless user experience and performant frontend architecture.',
    techStack: ['React', 'TailwindCSS'],
    liveUrl: '#',
    image: 'none',
    year: '2024',
    status: 'LIVE',
  },
  {
    number: '13',
    category: 'Web Development',
    name: 'TheTapeChart',
    description: 'A web development project exploring advanced frontend patterns, responsive layouts, and data visualization integrations.',
    techStack: ['React', 'JavaScript', 'CSS'],
    liveUrl: '#',
    image: 'none',
    year: '2024',
    status: 'LIVE',
  },
];

const AbstractProjectVisual = ({ project }: { project: ProjectData }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-black overflow-hidden relative border border-white/5">
      {/* Cinematic animated mesh background */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-primary/20 rounded-full blur-[80px] mix-blend-screen animate-[glow-pulse_6s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-secondary/10 rounded-full blur-[80px] mix-blend-screen animate-[glow-pulse_8s_ease-in-out_infinite_1s]" />
      </div>
      
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Kinetic Typography */}
      <div className="relative z-10 flex flex-col items-center justify-center mix-blend-plus-lighter text-center px-4">
        <div className="font-clash text-4xl sm:text-5xl lg:text-7xl font-semibold tracking-tight text-white/90 uppercase leading-none drop-shadow-2xl">
          {project.name}
        </div>
        <div className="text-[10px] sm:text-xs font-semibold tracking-[0.4em] text-secondary/60 uppercase mt-4 sm:mt-6">
          {project.category}
        </div>
      </div>
    </div>
  );
};

const ToolKBPresentation = ({ project }: { project: ProjectData }) => {
  return (
    <div className="relative w-full mb-32 md:mb-48 group">
      <FadeIn y={40}>
        <div className="flex flex-col gap-8">
          {/* Top Info Bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <span className="font-clash font-bold text-primary text-xl sm:text-2xl">{project.number}</span>
                <span className="text-[10px] sm:text-xs font-bold tracking-[0.3em] text-[#D7E2EA]/50 uppercase">
                  {project.year} • {project.status}
                </span>
              </div>
              <h3 className="font-clash text-5xl sm:text-6xl md:text-8xl font-semibold text-white tracking-tight uppercase leading-[0.9]">
                {project.name}
              </h3>
            </div>
            <div className="md:text-right max-w-sm">
              <p className="text-sm sm:text-base text-[#D7E2EA]/70 leading-relaxed mb-4">
                {project.description}
              </p>
              {project.liveUrl !== '#' && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs font-bold uppercase tracking-[0.2em] text-white hover:text-primary transition-colors">
                  View Live <span className="ml-2">↗</span>
                </a>
              )}
            </div>
          </div>
          
          {/* Massive Cinematic Visual */}
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl md:rounded-[2rem] overflow-hidden bg-black border border-white/10 shadow-2xl">
            {/* Ambient Background Engine */}
            <div className="absolute inset-0 bg-[#05050A]">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/30 via-[#05050A] to-[#05050A] animate-[glow-pulse_8s_ease-in-out_infinite]" />
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-secondary/40 via-transparent to-transparent animate-[glow-pulse_12s_ease-in-out_infinite_2s]" />
              <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <span className="font-clash text-5xl sm:text-7xl md:text-9xl lg:text-[11rem] font-bold tracking-tight text-white drop-shadow-2xl opacity-90 transition-transform duration-1000 ease-cinematic group-hover:scale-105">
                TOOLKB
              </span>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {project.techStack.map(tech => (
                  <span key={tech} className="px-4 py-2 rounded-full border border-white/20 bg-black/50 backdrop-blur-md text-xs font-medium text-white/80 uppercase tracking-widest">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};

const StickyFeaturedProject = ({ project, index }: { project: ProjectData, index: number }) => {
  return (
    <div className="relative flex flex-col lg:flex-row w-full mb-32 md:mb-48 gap-12 lg:gap-24">
      {/* Sticky Left: Information */}
      <div className="w-full lg:w-5/12 lg:sticky lg:top-32 lg:h-[max-content] z-10 flex flex-col gap-6 sm:gap-8">
        <FadeIn y={20}>
          <div className="flex items-center gap-4">
            <span className="font-clash font-bold text-primary text-xl sm:text-2xl">{project.number}</span>
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.3em] text-[#D7E2EA]/50 uppercase">
              {project.year} • {project.status}
            </span>
          </div>
          
          <div className="flex flex-col gap-3 mt-4">
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-secondary uppercase">
              {project.category}
            </span>
            <h3 className="font-clash text-4xl sm:text-5xl lg:text-7xl font-semibold text-white tracking-tight leading-[0.9]">
              {project.name}
            </h3>
          </div>

          <p className="text-base sm:text-lg text-[#D7E2EA]/70 leading-relaxed mt-4 max-w-md">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-6">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-medium border border-white/10 text-white/70 tracking-wider uppercase"
              >
                {tech}
              </span>
            ))}
          </div>

          {project.liveUrl !== '#' && (
            <div className="mt-8">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs font-bold uppercase tracking-[0.2em] text-white hover:text-primary transition-colors">
                View Live <span className="ml-2">↗</span>
              </a>
            </div>
          )}
        </FadeIn>
      </div>

      {/* Scrolling Right: Visuals */}
      <div className="w-full lg:w-7/12 flex flex-col gap-8">
        <FadeIn y={40} delay={0.2}>
          <div className="relative w-full aspect-[4/3] rounded-2xl md:rounded-[2rem] bg-white/[0.02] border border-white/10 p-2 shadow-2xl group overflow-hidden">
            <div className="relative w-full h-full rounded-[calc(2rem-0.5rem)] overflow-hidden bg-[#0A0A0F]">
              {project.image === 'none' ? (
                <AbstractProjectVisual project={project} />
              ) : (
                <img
                  src={project.image}
                  alt={`${project.name} Application Preview`}
                  className="w-full h-full object-cover transition-transform duration-700 ease-cinematic group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />
              )}
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

const BentoSecondaryProject = ({ project, index }: { project: ProjectData, index: number }) => {
  // Creating an asymmetric grid logic
  const isLarge = index === 0 || index === 4 || index === 7;
  const colSpan = isLarge ? 'md:col-span-2' : 'md:col-span-1';

  return (
    <FadeIn y={30} delay={(index % 3) * 0.1} className={`relative flex flex-col w-full h-full ${colSpan}`}>
      <div className="group relative flex flex-col h-full min-h-[360px] p-8 sm:p-10 rounded-2xl md:rounded-[2rem] border border-white/10 bg-[#08080C] hover:bg-[#0A0A0F] hover:border-white/20 transition-colors duration-500 overflow-hidden">
        
        {/* Subtle hover gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-start justify-between mb-8 gap-4">
            <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] text-secondary/80 uppercase">
              {project.category}
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] text-[#D7E2EA]/40 uppercase whitespace-nowrap text-right">
              {project.year}
            </span>
          </div>

          <h3 className="font-clash text-2xl sm:text-3xl font-semibold text-white tracking-tight leading-tight mb-4">
            {project.name}
          </h3>
          
          <p className="text-sm sm:text-base text-[#D7E2EA]/60 leading-relaxed flex-grow">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-8 mb-6">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded border border-white/10 text-[9px] sm:text-[10px] font-semibold text-white/50 tracking-wider uppercase"
              >
                {tech}
              </span>
            ))}
          </div>

          {project.liveUrl !== '#' && (
            <div className="mt-auto flex">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.2em] text-white hover:text-primary transition-colors">
                Visit <span className="ml-1">↗</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </FadeIn>
  );
};

const ProjectsSection = () => {
  return (
    <section
      id="projects"
      className="relative z-10 w-full bg-[#05050A] px-6 md:px-12 pt-32 pb-40 overflow-hidden"
    >
      <div className="relative z-10 mx-auto max-w-screen-2xl">
        <FadeIn y={30} className="mb-24 md:mb-40 flex flex-col md:flex-row md:items-end justify-between gap-8 border-t border-white/10 pt-16">
          <h2 className="font-clash text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-semibold text-white tracking-tight leading-[0.8] uppercase">
            Selected<br />Work.
          </h2>
          <p className="text-sm md:text-base text-[#D7E2EA]/60 max-w-sm leading-relaxed uppercase tracking-widest font-semibold">
            Architecting and building production-ready products, systems, and utilities.
          </p>
        </FadeIn>

        <div className="flex flex-col w-full">
          {FEATURED_PROJECTS.map((project, i) => {
            if (i === 0) {
              return <ToolKBPresentation key={project.number} project={project} />;
            }
            return (
              <StickyFeaturedProject
                key={project.number}
                project={project}
                index={i}
              />
            );
          })}
        </div>

        <FadeIn y={40} className="mt-32 md:mt-48 mb-16 md:mb-24 border-t border-white/10 pt-16">
          <h3 className="font-clash text-4xl sm:text-5xl md:text-7xl font-semibold text-white tracking-tight leading-tight uppercase mb-6">
            More Work &<br />Experiments.
          </h3>
          <p className="text-sm md:text-base text-[#D7E2EA]/50 max-w-xl leading-relaxed uppercase tracking-widest font-semibold">
            Additional products, prototypes, and tools.
          </p>
        </FadeIn>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SECONDARY_PROJECTS.map((project, i) => (
            <BentoSecondaryProject
              key={project.number}
              project={project}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
