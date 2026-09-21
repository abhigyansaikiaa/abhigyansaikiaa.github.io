import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from './FadeIn';

const DISCIPLINES = [
  {
    title: 'Developer',
    description: 'Architecting scalable, full-stack digital products with React, Next.js, and modern cloud infrastructure.',
    tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
  },
  {
    title: 'Video Editor',
    description: 'Crafting cinematic, high-retention content with precise pacing and motion graphics.',
    tags: ['Premiere Pro', 'After Effects', 'DaVinci Resolve'],
  },
  {
    title: 'Brand Designer',
    description: 'Building cohesive, impossible-to-ignore identities and interface designs.',
    tags: ['Figma', 'UI/UX', 'Identity', 'Typography'],
  },
  {
    title: 'Product Builder',
    description: 'Taking ideas from zero to a live, polished launch, managing the entire lifecycle.',
    tags: ['Strategy', 'Deployment', 'Analytics'],
  },
];

const ExpertiseCards = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="w-full flex flex-col border-t border-white/5">
      {DISCIPLINES.map((item, index) => (
        <FadeIn key={item.title} delay={index * 0.1} y={20}>
          <div
            className="group relative flex flex-col md:flex-row md:items-center justify-between py-8 md:py-12 border-b border-white/5 cursor-default transition-colors hover:bg-white/[0.02]"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Left: Huge Title */}
            <div className="flex items-center gap-6 md:gap-12 md:w-1/2">
              <span className="text-xs md:text-sm font-bold text-primary/50 group-hover:text-primary transition-colors uppercase tracking-[0.2em]">
                0{index + 1}
              </span>
              <h4 className="font-clash text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white/80 group-hover:text-white transition-colors tracking-tight uppercase">
                {item.title}
              </h4>
            </div>

            {/* Right: Description & Tags (Visible on Mobile, Enhanced on Desktop Hover) */}
            <div className="mt-6 md:mt-0 md:w-1/2 flex flex-col gap-4">
              <p className="text-sm md:text-base text-[#D7E2EA]/60 leading-relaxed transition-opacity duration-300 md:opacity-50 group-hover:opacity-100">
                {item.description}
              </p>
              
              {/* Tags accordion-like reveal on desktop, static on mobile */}
              <div className="flex flex-wrap gap-2 md:h-0 md:opacity-0 md:overflow-hidden group-hover:h-auto group-hover:opacity-100 group-hover:mt-4 transition-all duration-500 ease-cinematic h-auto opacity-100 mt-4">
                {item.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-white/70 border border-white/10 rounded-full bg-white/[0.02]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      ))}
    </div>
  );
};

export default ExpertiseCards;
