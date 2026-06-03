import { motion } from 'framer-motion';

const TECH_STACK = [
  'React',
  'Next.js',
  'TypeScript',
  'TailwindCSS',
  'Supabase',
  'Premiere Pro',
  'After Effects',
  'Photoshop',
  'Figma',
];

const TechMarquee = () => {
  // Duplicate array to create seamless loop
  const duplicatedStack = [...TECH_STACK, ...TECH_STACK, ...TECH_STACK];

  return (
    <div className="relative w-full overflow-hidden py-10 flex border-y border-primary/10 bg-[#05050A]/50">
      {/* Left/Right fading gradients */}
      <div className="absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[#05050A] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[#05050A] to-transparent pointer-events-none" />

      <motion.div
        className="flex whitespace-nowrap items-center gap-8 px-4"
        animate={{ x: ['0%', '-33.33%'] }}
        transition={{
          ease: 'linear',
          duration: 20,
          repeat: Infinity,
        }}
      >
        {duplicatedStack.map((tech, index) => (
          <span
            key={index}
            className="text-lg md:text-xl font-medium tracking-wide text-[#D7E2EA]/60 hover:text-white transition-colors duration-300 cursor-default hover:drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]"
          >
            {tech}
            <span className="ml-8 text-primary/30">•</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default TechMarquee;
