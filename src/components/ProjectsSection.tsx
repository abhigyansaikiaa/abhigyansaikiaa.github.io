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

const AbstractProjectVisual = ({ project, yParallax }: { project: ProjectData, yParallax: any }) => {
  return (
    <motion.div
      style={{ y: yParallax, scale: 1.05 }}
      className="w-full h-full opacity-90 group-hover:opacity-100 transition-all duration-700 ease-cinematic flex flex-col items-center justify-center bg-[#07070B] overflow-hidden relative"
    >
      {/* Cinematic animated mesh background */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-primary/20 rounded-full blur-[80px] mix-blend-screen animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-secondary/10 rounded-full blur-[80px] mix-blend-screen animate-pulse" style={{ animationDuration: '8s', animationDelay: '1s' }} />
      </div>
      
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Kinetic Typography */}
      <div className="relative z-10 flex flex-col items-center justify-center mix-blend-plus-lighter">
        <motion.div 
          className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/20 uppercase text-center px-6 leading-none"
          whileHover={{ scale: 1.02, letterSpacing: '0.02em' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {project.name}
        </motion.div>
        <div className="text-[10px] sm:text-xs font-medium tracking-[0.4em] text-secondary/60 uppercase mt-6 text-center px-6">
          {project.category}
        </div>
      </div>
    </motion.div>
  );
};

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  total: number;
  containerRef: React.RefObject<HTMLDivElement>;
}

const ProjectCard = ({ project, index, containerRef }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Scroll progress for the whole section to drive parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Unique parallax offset for the image to give it depth
  const yParallax = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
      className="relative flex flex-col lg:flex-row gap-12 lg:gap-24 w-full min-h-[60vh] items-center py-20 lg:py-32 border-b border-white/5 last:border-b-0"
    >
      {/* Left Content Area (Storytelling) */}
      <div className="flex-1 flex flex-col gap-8 sm:gap-10 z-10 w-full">
        <div className="flex items-center gap-5">
          <span className="font-bold text-primary opacity-90" style={{ fontSize: 'clamp(1.2rem, 3vw, 2rem)' }}>
            {project.number}
          </span>
          <span className="h-px w-12 bg-white/20" />
          <span className="text-[10px] sm:text-xs font-medium tracking-[0.3em] text-[#D7E2EA]/50 uppercase">
            {project.year} • {project.status || 'LIVE'}
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-[11px] sm:text-xs font-medium tracking-[0.25em] text-secondary uppercase">
            {project.category}
          </span>
          <h3 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white tracking-tighter leading-[0.9]">
            {project.name}
          </h3>
        </div>

        <p className="text-base sm:text-lg lg:text-xl text-[#D7E2EA]/70 font-light leading-relaxed max-w-xl">
          {project.description}
        </p>

        {/* Floating Tech Stack Chips */}
        <div className="flex flex-wrap gap-3 mt-4">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 rounded-full text-[10px] sm:text-xs font-medium bg-white/5 border border-white/10 text-white/80 transition-colors duration-300 ease-cinematic cursor-default shadow-sm hover:bg-white/10 hover:border-primary/40 hover:text-white"
            >
              {tech}
            </span>
          ))}
        </div>

        {project.liveUrl !== '#' && (
          <div className="mt-8 flex">
            <LiveProjectButton href={project.liveUrl} />
          </div>
        )}

      </div>

      {/* Right Presentation Area (Visual Mockup) */}
      <div className="flex-1 w-full relative group perspective-1000">
        {/* Ambient Glow behind image */}
        <div className="absolute inset-0 bg-primary/10 blur-[120px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-cinematic pointer-events-none" />
        
        {/* The Device / Glass Panel (Doppelrand outer shell) */}
        <div className="relative w-full aspect-[4/3] rounded-2xl sm:rounded-[2rem] p-1.5 sm:p-2 bg-white/[0.02] border border-white/5 shadow-2xl transition-transform duration-700 ease-cinematic group-hover:scale-[1.01]">
          <motion.div 
            className="relative w-full h-full rounded-[calc(2rem-0.5rem)] sm:rounded-[calc(2rem-0.5rem)] overflow-hidden bg-[#0A0A0F] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
          >
            {/* Inner glass reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-cinematic z-10 pointer-events-none" />
            
            {project.image === 'none' ? (
              <AbstractProjectVisual project={project} yParallax={yParallax} />
            ) : (
              <motion.img
                ref={imageRef}
                src={project.image}
                alt={`${project.name} Application Preview`}
                style={{ y: yParallax, scale: 1.05 }}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 ease-cinematic"
              />
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const SecondaryProjectCard = ({ project, index }: { project: ProjectData, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1], delay: (index % 3) * 0.1 }}
      className="group relative flex flex-col p-8 sm:p-10 rounded-2xl sm:rounded-[2rem] border border-white/5 bg-[#08080C] transition-all duration-500 ease-cinematic overflow-hidden hover:bg-[#0A0A0F] hover:border-white/10 hover:-translate-y-1"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-cinematic pointer-events-none" />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between mb-8 gap-3">
          <span className="text-[10px] sm:text-xs font-medium tracking-[0.2em] text-secondary/80 uppercase">
            {project.category}
          </span>
          <span className="text-[9px] sm:text-[10px] font-medium tracking-[0.2em] text-[#D7E2EA]/40 uppercase text-right whitespace-nowrap">
            {project.year} • {project.status || 'LIVE'}
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tighter leading-tight mb-5">
          {project.name}
        </h3>
        
        <p className="text-sm sm:text-base text-[#D7E2EA]/60 font-light leading-relaxed flex-grow">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-10 mb-8">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 rounded-full text-[9px] sm:text-[10px] font-medium tracking-wide bg-white/[0.03] border border-white/5 text-white/60 shadow-sm"
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
      className="relative z-10 w-full bg-[#05050A] px-6 md:px-12 pt-40 pb-40 overflow-hidden"
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-deep-space to-transparent" />
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)', backgroundSize: '80px 80px' }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl" ref={containerRef}>
        <FadeIn y={40} className="mb-32 sm:mb-40">
          <h2 className="text-6xl sm:text-7xl md:text-9xl font-black text-white tracking-tighter leading-none mb-8">
            Selected Work.
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-[#D7E2EA]/60 font-light max-w-3xl leading-relaxed">
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

        <FadeIn y={40} className="mt-48 mb-20">
          <h3 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter leading-tight mb-6">
            More Work & Experiments
          </h3>
          <p className="text-base sm:text-lg md:text-xl text-[#D7E2EA]/50 font-light max-w-3xl leading-relaxed">
            Additional products, prototypes, and developer tools exploring different technologies.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
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
