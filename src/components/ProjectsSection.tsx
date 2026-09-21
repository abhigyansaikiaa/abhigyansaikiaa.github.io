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

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  total: number;
  containerRef: React.RefObject<HTMLDivElement>;
}

const ProjectCard = ({ project, index, total, containerRef }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Scroll progress for the whole section to drive parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Unique parallax offset for the image to give it depth
  const yParallax = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col lg:flex-row gap-12 lg:gap-20 w-full min-h-[60vh] items-center py-16 lg:py-24 border-b border-white/5 last:border-b-0"
    >
      {/* Left Content Area (Storytelling) */}
      <div className="flex-1 flex flex-col gap-6 sm:gap-8 z-10 w-full">
        <div className="flex items-center gap-4">
          <span className="font-bold text-primary opacity-80" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
            {project.number}
          </span>
          <span className="h-px w-12 bg-white/20" />
          <span className="text-xs sm:text-sm font-medium tracking-[0.2em] text-[#D7E2EA]/50 uppercase">
            {project.year} • {project.status || 'LIVE'}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium tracking-wider text-secondary uppercase">
            {project.category}
          </span>
          <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-none">
            {project.name}
          </h3>
        </div>

        <p className="text-base sm:text-lg text-[#D7E2EA]/70 font-light leading-relaxed max-w-xl">
          {project.description}
        </p>

        {/* Floating Tech Stack Chips */}
        <div className="flex flex-wrap gap-3 mt-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-4 py-1.5 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:border-primary/50 hover:text-white transition-colors duration-300 cursor-default shadow-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        {project.liveUrl !== '#' && (
          <div className="mt-6 flex">
            <LiveProjectButton href={project.liveUrl} />
          </div>
        )}

      </div>

      {/* Right Presentation Area (Visual Mockup) */}
      <div className="flex-1 w-full relative group perspective-1000">
        {/* Ambient Glow behind image */}
        <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* The Device / Glass Panel */}
        <motion.div 
          className="relative w-full aspect-[4/3] rounded-2xl sm:rounded-[32px] overflow-hidden border border-white/10 bg-[#0A0A0F] shadow-2xl transition-transform duration-700 ease-out group-hover:rotate-x-2 group-hover:rotate-y-[-2deg] group-hover:scale-[1.02]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Inner glass reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />
          
          {project.image === 'none' ? (
            <motion.div
              style={{ y: yParallax, scale: 1.1 }}
              className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-700 flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10"
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-widest text-white/60 uppercase text-center px-6 leading-tight">{project.name}</div>
              <div className="text-xs sm:text-sm font-medium tracking-[0.3em] text-white/30 uppercase mt-4 text-center px-6">{project.category}</div>
            </motion.div>
          ) : (
            <motion.img
              ref={imageRef}
              src={project.image}
              alt={`${project.name} Application Preview`}
              style={{ y: yParallax, scale: 1.1 }}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
            />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

const SecondaryProjectCard = ({ project, index }: { project: ProjectData, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (index % 3) * 0.1 }}
      className="group relative flex flex-col p-6 sm:p-8 rounded-2xl sm:rounded-[32px] border border-white/5 bg-[#0A0A0F] hover:bg-[#0f0f15] transition-colors duration-500 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between mb-6 gap-2">
          <span className="text-xs sm:text-sm font-medium tracking-wider text-secondary uppercase">
            {project.category}
          </span>
          <span className="text-[10px] sm:text-xs font-medium tracking-[0.1em] text-[#D7E2EA]/40 uppercase text-right whitespace-nowrap">
            {project.year} • {project.status || 'LIVE'}
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
          {project.name}
        </h3>
        
        <p className="text-sm sm:text-base text-[#D7E2EA]/60 font-light leading-relaxed flex-grow">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-8 mb-6">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-full text-[10px] font-medium bg-white/5 border border-white/10 text-white/70 shadow-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        {project.liveUrl !== '#' && (
          <div className="mt-auto flex">
            <LiveProjectButton href={project.liveUrl} />
          </div>
        )}
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="projects"
      className="relative z-10 w-full bg-[#05050A] px-4 sm:px-6 md:px-10 pt-32 pb-32 overflow-hidden"
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-[#0A0A0F] to-transparent" />
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl" ref={containerRef}>
        <FadeIn y={40} className="mb-24 sm:mb-32">
          <h2 className="text-5xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6">
            Selected Work.
          </h2>
          <p className="text-lg sm:text-xl text-[#D7E2EA]/50 font-light max-w-2xl">
            Things I've built, tested, and taken from idea to working product.
          </p>
        </FadeIn>

        <div className="flex flex-col">
          {FEATURED_PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.number}
              project={project}
              index={i}
              total={FEATURED_PROJECTS.length}
              containerRef={containerRef}
            />
          ))}
        </div>

        <FadeIn y={40} className="mt-32 mb-16">
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            More Work & Experiments
          </h3>
          <p className="text-base sm:text-lg text-[#D7E2EA]/50 font-light max-w-2xl">
            Additional products, prototypes, and developer tools exploring different technologies.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SECONDARY_PROJECTS.map((project, i) => (
            <SecondaryProjectCard
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
