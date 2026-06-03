import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useState, useRef, MouseEvent } from 'react';

interface LiveProjectButtonProps {
  label?: string;
  href?: string;
  className?: string;
}

const LiveProjectButton = ({
  label = 'View Live Product',
  href = '#',
  className = '',
}: LiveProjectButtonProps) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: MouseEvent<HTMLAnchorElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    // Magnetic pull effect
    setPosition({ x: middleX * 0.15, y: middleY * 0.15 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={`group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-white/5 border border-white/10 px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base font-medium uppercase tracking-widest text-white whitespace-nowrap transition-all duration-300 hover:bg-white/10 hover:shadow-[0_0_25px_-5px_rgba(138,43,226,0.6)] ${className}`}
    >
      {/* Animated gradient border glow */}
      <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0A0A0F_0%,#8A2BE2_50%,#0A0A0F_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <span className="absolute inset-[1px] rounded-full bg-[#05050A] transition-colors duration-300 group-hover:bg-[#0A0A0F]" />
      
      <span className="relative z-10">{label}</span>
      
      <motion.div
        className="relative z-10 flex items-center justify-center rounded-full bg-white text-black p-1.5"
        initial={{ x: 0, opacity: 0.8 }}
        whileHover={{ x: 3, opacity: 1, rotate: 45 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        <ArrowUpRight size={16} strokeWidth={2.5} />
      </motion.div>
    </motion.a>
  );
};

export default LiveProjectButton;
