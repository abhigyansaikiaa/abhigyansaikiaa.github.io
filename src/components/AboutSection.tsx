import React from 'react';
import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <section id="about" className="relative w-full bg-[var(--bg-light)] pt-32 pb-16 overflow-hidden">
      
      {/* Marquee Ticker */}
      <div className="relative w-full flex overflow-hidden border-y border-black/10 py-6 md:py-8 bg-white rotate-[-2deg] scale-105">
        <motion.div 
          className="flex whitespace-nowrap"
          animate={{ x: [0, -1035] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          {/* We repeat the text to ensure a seamless infinite scroll */}
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center">
              <span className="font-clash font-bold text-4xl md:text-6xl uppercase tracking-tighter text-[#121212]">
                BUILDING REAL PRODUCTS
              </span>
              <span className="mx-8 text-cyan-400 text-4xl md:text-6xl">✦</span>
              <span className="font-clash font-bold text-4xl md:text-6xl uppercase tracking-tighter text-transparent" style={{ WebkitTextStroke: '1px #121212' }}>
                FULL STACK DEVELOPMENT
              </span>
              <span className="mx-8 text-cyan-400 text-4xl md:text-6xl">✦</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Floating Circular Badge */}
      <div className="absolute right-[10%] top-[10%] md:top-[20%] pointer-events-none z-10 hidden md:block">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="w-32 h-32 md:w-40 md:h-40 bg-cyan-400 rounded-full flex items-center justify-center p-2 text-white shadow-2xl"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path id="badge-circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
            <text>
              <textPath href="#badge-circle" startOffset="0%" className="fill-current font-bold text-[11px] tracking-[0.2em] uppercase">
                • CREATIVE DEVELOPER • CONCEPT TO SOFTWARE 
              </textPath>
            </text>
          </svg>
        </motion.div>
      </div>

    </section>
  );
};

export default AboutSection;
