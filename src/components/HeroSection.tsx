import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // We no longer attempt to force autoplay on mount, because we want the user 
  // to explicitly click "Play" so the browser allows audio to play.
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  return (
    <section 
      className="relative min-h-[100svh] w-full flex flex-col justify-center items-center overflow-hidden bg-[var(--bg-light)] pt-32 pb-16"
    >
      {/* Background Giant Typography */}
      <div className="absolute inset-0 flex flex-col justify-center items-center z-0 pointer-events-none mt-12">
        <motion.h1 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="font-clash font-bold text-[clamp(4rem,20vw,24rem)] leading-[0.8] tracking-tighter text-[var(--text-dark)] uppercase m-0"
        >
          SOFTWARE
        </motion.h1>
        <motion.h1 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="font-clash font-bold text-[clamp(4rem,20vw,24rem)] leading-[0.8] tracking-tighter text-transparent uppercase m-0"
          style={{ WebkitTextStroke: '2px var(--text-dark)' }}
        >
          ENGINEER
        </motion.h1>
      </div>

      {/* Centerpiece Video (Cutout Effect) */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1], delay: 0.4 }}
        className="relative z-10 w-[80vw] max-w-[600px] aspect-[3/4] md:aspect-square lg:aspect-video rounded-[40px] overflow-hidden shadow-2xl mt-8 md:mt-24 cursor-pointer group"
        onClick={() => {
          if (videoRef.current) {
            if (isPlaying) {
              videoRef.current.pause();
            } else {
              videoRef.current.play().catch(console.error);
            }
            setIsPlaying(!isPlaying);
          }
        }}
      >
        <video
          ref={videoRef}
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/me.mp4" type="video/mp4" />
        </video>
        {/* Play/Pause icon overlay */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
          <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white shadow-lg">
            {!isPlaying ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
              </svg>
            )}
          </div>
        </div>
      </motion.div>

      {/* Floating Info Boxes */}
      <div className="relative z-20 w-full max-w-[1600px] mx-auto px-6 md:px-12 mt-16 md:mt-[-80px] flex flex-col md:flex-row justify-between items-end gap-6 pointer-events-none">
        
        {/* Bio Box */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-white rounded-[24px] p-6 md:p-8 max-w-sm shadow-xl pointer-events-auto border border-black/5"
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
          className="bg-[#121212] text-white rounded-[24px] p-6 md:p-8 flex items-center gap-6 shadow-xl pointer-events-auto w-full md:w-auto"
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
