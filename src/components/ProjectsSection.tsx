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
}

const PROJECTS: ProjectData[] = [
  {
    number: '01',
    category: 'Full Stack Web Application',
    name: 'Qrivna',
    description: 'Built for creators and businesses who needed QR tools that felt modern instead of outdated. A fast and minimal QR platform focused on customization, analytics, and clean user experience.',
    techStack: ['React', 'Supabase', 'TailwindCSS'],
    liveUrl: '#',
    image: '/qrivna_demo_pro.png',
    year: '2025',
  },
  {
    number: '02',
    category: 'AI SaaS Dashboard',
    name: 'BrollWriter',
    description: 'An AI-powered SaaS dashboard built to automate video script writing. Designed with an elegant, cinematic UI to help creators focus on storytelling rather than formatting.',
    techStack: ['Next.js', 'TypeScript', 'OpenAI API'],
    liveUrl: '#',
    image: '/brollwriter_demo_pro.png',
    year: '2025',
  },
  {
    number: '03',
    category: 'Analytics & Strategy Platform',
    name: 'Dhankathaa',
    description: 'A YouTube strategy and analytics platform. Designed to provide high-retention insights through a clean, data-rich interface that feels like a premium financial tool.',
    techStack: ['React', 'TailwindCSS', 'Chart.js'],
    liveUrl: '#',
    image: '/dhankathaa_demo_pro.png',
    year: '2024',
  },
  {
    number: '04',
    category: 'Digital Showroom',
    name: 'Freelance Portfolio',
    description: 'A sophisticated digital portfolio showcase crafted to highlight high-end video editing and brand design. Built with smooth motion and minimal clutter.',
    techStack: ['Next.js', 'Framer Motion'],
    liveUrl: '#',
    image: '/freelance_demo_pro.png',
    year: '2024',
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
            {project.year} • LIVE
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

        <div className="mt-4">
          <LiveProjectButton href={project.liveUrl} />
        </div>
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
          
          <motion.img
            ref={imageRef}
            src={project.image}
            alt={`${project.name} Application Preview`}
            style={{ y: yParallax, scale: 1.1 }}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
          />
        </motion.div>
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
            A curated showcase of digital products, interfaces, and tools built with precision, performance, and purpose.
          </p>
        </FadeIn>

        <div className="flex flex-col">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.number}
              project={project}
              index={i}
              total={PROJECTS.length}
              containerRef={containerRef}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
