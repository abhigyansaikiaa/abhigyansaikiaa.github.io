"use client";

import React, { useRef } from "react";

import { motion, useScroll, useTransform } from "framer-motion";


const AboutMe = () => {
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
      className="relative h-dvh md:h-screen w-full overflow-hidden flex flex-col items-center justify-end"
    >
      {/* Background Noise Texture for Awwwards feel */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      {/* <img
        src="/bg-hero.png"
        fill
        priority
        quality={85}
        className="absolute inset-0 object-cover"
        alt="Hero background"
        sizes="100vw"
      /> */}

      <motion.div
        style={{
          y: yImage,
        }}
        className="relative z-20 flex items-end group"
      >
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full group-hover:bg-primary/30 transition-all duration-500" />

        {/* <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-neutral-900/50 backdrop-blur-sm"> */}
        {/* Swap for your own hero video/photo — see README for the full asset list */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/ichigo.png"
          alt="Profile photo"
          className="relative w-[125vw] md:w-[60vw] lg:w-[40vw] h-[75vh] md:h-[75dvh] object-contain object-bottom rounded-3xl"
        />
      </motion.div>

      {/* Mobile: Vertical Side Label (editorial, clears navbar + video) */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="md:hidden absolute left-3 top-1/2 -translate-y-1/2 z-30 text-foreground"
      >
        <div className="flex items-center gap-4 [writing-mode:vertical-rl] rotate-180">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400">
            Featured Work
          </span>
          <span className="w-1 h-1 bg-foreground rounded-full" />
          <span className="text-sm font-bold">2D Animator</span>
          <span className="w-1 h-1 bg-foreground rounded-full" />
          <span className="text-sm font-bold">Creative Director</span>
          <span className="w-1 h-1 bg-foreground rounded-full" />
          <span className="text-sm font-bold">Video Editor</span>
        </div>
      </motion.div>

      {/* Bottom Info Strip (desktop) */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="hidden md:flex absolute bottom-10 z-30 w-full px-10 flex-row justify-between items-center text-foreground"
      >
        <div className="flex flex-col gap-2">
          <p className="text-xs font-mono uppercase text-gray-500 dark:text-gray-400">
            Featured Work
          </p>
          <div className="flex items-center gap-4 text-sm font-bold">
            <span className="hover:text-primary transition-colors cursor-pointer">
              2D Animator
            </span>
            <span className="w-1 h-1 bg-foreground rounded-full" />
            <span className="hover:text-primary transition-colors cursor-pointer">
              Creative Director
            </span>
            <span className="w-1 h-1 bg-foreground rounded-full" />
            <span className="hover:text-primary transition-colors cursor-pointer">
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
            >
              <span className="hover:text-primary transition-colors cursor-pointer">
                Instagram
              </span>
            </a>
            <span className="w-1 h-1 bg-foreground rounded-full" />
            <a
              href={"https://www.youtube.com/@yourusername"}
              target="_blank"
            >
              <span className="hover:text-primary transition-colors cursor-pointer">
                Youtube
              </span>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

// Helper Component for Stats
const StatCard = ({
  position,
  label,
  value,
  delay,
}: {
  position: string;
  label: string;
  value: string;
  delay: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.5, type: "spring" }}
      className={`absolute ${position} z-30`}
    >
      <div className="backdrop-blur-md bg-white/5 border border-white/10 p-4 rounded-xl shadow-2xl hover:bg-white/10 transition-colors duration-300 w-32 md:w-40">
        <h3 className="text-3xl font-bold  mb-1">{value}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-300 uppercase tracking-wider font-mono">
          {label}
        </p>
      </div>
    </motion.div>
  );
};

export default AboutMe;
