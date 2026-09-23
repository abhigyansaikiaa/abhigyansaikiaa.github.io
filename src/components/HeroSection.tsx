import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TITLES = [
  "DEVELOPER",
  "DESIGNER",
  "CREATOR",
  "MEDICAL LAB SCIENCES"
];

const HeroSection = () => {
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % TITLES.length);
    }, 3000); // cycle every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      className="relative min-h-[100svh] w-full flex flex-col justify-end items-center overflow-hidden bg-[var(--bg-light)] pt-32 pb-0"
    >
      {/* Background Noise Texture for Awwwards feel */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* Background Giant Typography (z-10) */}
      <div className="absolute inset-0 flex flex-col justify-center items-center z-10 pointer-events-none mt-12 md:mt-0">
        <div className="relative overflow-hidden w-full flex justify-center items-center h-[50vh] md:h-[60vh]">
          {/* Invisible placeholder to maintain layout width/height */}
          <h1 className="invisible absolute text-center font-clash font-bold text-[clamp(2.5rem,12vw,14rem)] leading-[0.9] tracking-tighter text-[var(--text-dark)] uppercase m-0 px-4 whitespace-normal max-w-full">
            MEDICAL LAB SCIENCES
          </h1>
          <motion.h1
            key={titleIndex}
            initial={{ y: "35%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
            className="absolute text-center font-clash font-bold text-[clamp(2.5rem,12vw,14rem)] leading-[0.9] tracking-tighter text-[var(--text-dark)] uppercase m-0 px-4 whitespace-normal max-w-full"
          >
            {TITLES[titleIndex]}
          </motion.h1>
        </div>
      </div>

      {/* Centerpiece Cutout Image (z-20) */}
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1], delay: 0.4 }}
        className="relative z-20 w-full max-w-[800px] mt-8 md:mt-24 pointer-events-none flex justify-center items-end group"
      >
        {/* Glow Effect from reference */}
        <div className="absolute inset-0 bg-[#06b6d4]/20 blur-[100px] rounded-full group-hover:bg-[#06b6d4]/30 transition-all duration-500" />
        
        <img
          src="/abhigyan-cutout.png"
          alt="Abhigyan Saikia"
          className="relative w-[125vw] md:w-[60vw] lg:w-[45vw] h-[65vh] md:h-[75dvh] object-contain object-bottom drop-shadow-2xl"
        />
      </motion.div>

      {/* Floating Info Boxes (z-30) */}
      <div className="absolute bottom-12 md:bottom-24 z-30 w-full max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-end gap-6 pointer-events-none">
        
        {/* Bio Box */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-white/80 backdrop-blur-md rounded-[24px] p-6 md:p-8 max-w-sm shadow-xl pointer-events-auto border border-black/5"
        >
          <p className="font-satoshi text-sm md:text-base text-[#666] leading-relaxed">
            I am currently pursuing a Bachelor of Medical Laboratory Science at RIPANS. I focus on <strong className="text-black">full-stack development</strong> and building real products from concept to working software.
          </p>
        </motion.div>

        {/* Stat/Feature Box */}
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="bg-[#121212]/90 backdrop-blur-md text-white rounded-[24px] p-6 md:p-8 flex items-center gap-6 shadow-xl pointer-events-auto w-full md:w-auto"
        >
          <div className="font-clash font-bold text-5xl md:text-6xl tracking-tighter text-cyan-400">
            03+
          </div>
          <div className="font-satoshi text-xs font-bold tracking-[0.2em] uppercase leading-relaxed text-white/70">
            YEARS OF<br/>
            <span className="text-white">DEVELOPMENT</span><br/>
            EXPERIENCE
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;
