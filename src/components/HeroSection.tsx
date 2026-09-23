import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll Parallax Logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yImage = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section
      ref={containerRef}
      className="relative h-[100dvh] md:h-screen w-full overflow-hidden flex flex-col items-center justify-end"
    >
      {/* Background Noise Texture for Awwwards feel */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <motion.div
        style={{
          y: yImage,
        }}
        className="relative z-20 flex items-end group"
      >
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-[#e11d2a]/20 blur-[100px] rounded-full group-hover:bg-[#e11d2a]/30 transition-all duration-500" />

        <img
          src="/abhigyan-cutout.png"
          alt="Profile photo"
          className="relative w-[125vw] md:w-[60vw] lg:w-[40vw] h-[75vh] md:h-[75dvh] object-contain object-bottom rounded-3xl"
        />
      </motion.div>

      {/* Mobile: Vertical Side Label (editorial, clears navbar + video) */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="md:hidden absolute left-3 top-1/2 -translate-y-1/2 z-30 text-black dark:text-white"
      >
        <div className="flex items-center gap-4 [writing-mode:vertical-rl] rotate-180">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400">
            Featured Work
          </span>
          <span className="w-1 h-1 bg-black dark:bg-white rounded-full" />
          <span className="text-sm font-bold">2D Animator</span>
          <span className="w-1 h-1 bg-black dark:bg-white rounded-full" />
          <span className="text-sm font-bold">Creative Director</span>
          <span className="w-1 h-1 bg-black dark:bg-white rounded-full" />
          <span className="text-sm font-bold">Video Editor</span>
        </div>
      </motion.div>

      {/* Bottom Info Strip (desktop) */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="hidden md:flex absolute bottom-10 z-30 w-full px-10 flex-row justify-between items-center text-black dark:text-white"
      >
        <div className="flex flex-col gap-2">
          <p className="text-xs font-mono uppercase text-gray-500 dark:text-gray-400">
            Featured Work
          </p>
          <div className="flex items-center gap-4 text-sm font-bold">
            <span className="hover:text-[#e11d2a] transition-colors cursor-pointer">
              2D Animator
            </span>
            <span className="w-1 h-1 bg-black dark:bg-white rounded-full" />
            <span className="hover:text-[#e11d2a] transition-colors cursor-pointer">
              Creative Director
            </span>
            <span className="w-1 h-1 bg-black dark:bg-white rounded-full" />
            <span className="hover:text-[#e11d2a] transition-colors cursor-pointer">
              Video Editor
            </span>
          </div>
        </div>

        <div className="hidden md:block">
          <p className="text-xs font-mono text-right text-gray-500 dark:text-gray-400">
            Social
          </p>
          <div className="flex items-center gap-4 text-sm font-bold">
            <a
              href={"https://www.instagram.com/yourusername"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="hover:text-[#e11d2a] transition-colors cursor-pointer">
                Instagram
              </span>
            </a>
            <span className="w-1 h-1 bg-black dark:bg-white rounded-full" />
            <a
              href={"https://www.youtube.com/@yourusername"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="hover:text-[#e11d2a] transition-colors cursor-pointer">
                Youtube
              </span>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
