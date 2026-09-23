"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import CollabModal from "./collab-modal";
import { useIsMobile } from "@/hooks/use-mobile";

const CollabSec: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<null | "left" | "right">(null);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const leftY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const rightY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const titleY = useTransform(scrollYProgress, [0, 0.5], ["40px", "0px"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  const leftMagX = useMotionValue(0);
  const leftMagY = useMotionValue(0);
  const rightMagX = useMotionValue(0);
  const rightMagY = useMotionValue(0);

  const leftSpringX = useSpring(leftMagX, { stiffness: 120, damping: 18 });
  const leftSpringY = useSpring(leftMagY, { stiffness: 120, damping: 18 });
  const rightSpringX = useSpring(rightMagX, { stiffness: 120, damping: 18 });
  const rightSpringY = useSpring(rightMagY, { stiffness: 120, damping: 18 });

  const handleMagMove = (
    e: React.MouseEvent<HTMLDivElement>,
    setX: (v: number) => void,
    setY: (v: number) => void,
    ref: React.RefObject<HTMLDivElement>,
  ) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 22;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 22;
    setX(x);
    setY(y);
  };

  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  // oklch(59.71% 0.23 23.86) ≈ #c93a2a in hex, ≈ rgb(201, 58, 42) for rgba usage
  const redColor = "oklch(59.71% 0.23 23.86)";

  return (
    <>
      <section
        ref={containerRef}
        className="relative flex flex-col items-center justify-center overflow-hidden h-auto md:min-h-screen"
      >
        {/* Noise grain overlay — a full-viewport `fixed` layer that repaints on
            every scroll frame. Skipped on phones where it costs more than it adds. */}
        {!isMobile && (
          <div
            className="pointer-events-none fixed inset-0 z-50 opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundSize: "200px",
            }}
          />
        )}

        {/* ── TITLE ── */}
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="relative z-20 flex flex-col items-center mb-10 md:mb-0 pt-16 md:pt-0 md:absolute md:top-16 px-4"
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="text-[10px] md:text-xs tracking-[0.3em] uppercase mb-4"
            style={{
              fontFamily: "'DM Mono', monospace",
              color: redColor,
            }}
          >
            ✦ Together We Build ✦
          </motion.p>
        </motion.div>

        {/* ── SPLIT IMAGES ── */}
        <div className="relative flex flex-row w-full h-auto  md:h-screen items-stretch">
          {/* LEFT */}
          <motion.div
            ref={leftRef}
            className="relative w-full md:w-1/2 h-64 md:h-full overflow-hidden cursor-none group"
            onMouseMove={(e) => {
              handleMagMove(
                e,
                leftMagX.set,
                leftMagY.set,
                leftRef as React.RefObject<HTMLDivElement>,
              );
              setHovered("left");
            }}
            onMouseLeave={() => {
              leftMagX.set(0);
              leftMagY.set(0);
              setHovered(null);
            }}
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
            viewport={{ once: true }}
            onAnimationComplete={() => {
              setAnimationComplete(true);
            }}
          >
            <motion.div
              style={{ x: leftSpringX, y: leftSpringY }}
              className="w-full h-full"
            >
              <motion.img
                src="/bg/1.png"
                alt="Collaboration image 1"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
                style={{ y: leftY, scale: 1.12 }}
                transition={{ type: "spring", stiffness: 60 }}
              />
            </motion.div>

            {/* Dark overlay on hover */}
            <motion.div
              className="absolute inset-0 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: hovered === "left" ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            />

            {/* Center text - brand name */}
            {/* <AnimatePresence>
            {animationComplete && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.2,
                }}
              >
                <div className="relative">
                  <motion.h2
                    className="text-white text-3xl md:text-5xl mr-5 lg:text-6xl font-semibold tracking-wider"
                    style={{
                      textShadow: "0 4px 30px rgba(0,0,0,0.5)",
                    }}
                    initial={{ opacity: 0, letterSpacing: "0.3em" }}
                    animate={{ opacity: 1, letterSpacing: "0.08em" }}
                    transition={{
                      duration: 1.2,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.3,
                    }}
                  >
                    <motion.img src="/md-red-logo.svg" alt="Logo" />
                  </motion.h2>
                  <motion.div
                    className="h-px mt-3"
                    style={{
                      backgroundImage: `linear-gradient(to right, transparent, ${redColor}, transparent)`,
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      duration: 1,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.6,
                    }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence> */}

            {/* Hover cursor */}
            <AnimatePresence>
              {hovered === "left" && (
                <motion.div
                  key="cursor-left"
                  className="absolute pointer-events-none z-20 flex items-center justify-center"
                  style={{
                    left: "50%",
                    top: "50%",
                    translateX: "-50%",
                    translateY: "-50%",
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="w-20 h-20 rounded-full border border-white/60 flex items-center justify-center">
                    <span
                      className="text-white text-[10px] tracking-widest uppercase"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      View
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Top-left corner */}
            <motion.div
              className="absolute top-6 left-6 w-8 h-8 border-t border-l"
              style={{ borderColor: `oklch(59.71% 0.23 23.86 / 0.6)` }}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            />

            {/* Bottom-left corner */}
            <motion.div
              className="absolute bottom-6 left-6 w-8 h-8 border-b border-l"
              style={{ borderColor: `oklch(59.71% 0.23 23.86 / 0.6)` }}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              viewport={{ once: true }}
            />
          </motion.div>

          {/* RIGHT */}
          <motion.div
            ref={rightRef}
            className="relative w-full md:w-1/2 h-64 md:h-full overflow-hidden cursor-none group"
            onMouseMove={(e) => {
              handleMagMove(
                e,
                rightMagX.set,
                rightMagY.set,
                rightRef as React.RefObject<HTMLDivElement>,
              );
              setHovered("right");
            }}
            onMouseLeave={() => {
              rightMagX.set(0);
              rightMagY.set(0);
              setHovered(null);
            }}
            initial={{ clipPath: "inset(0 0 0 100%)" }}
            whileInView={{ clipPath: "inset(0 0 0 0%)" }}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
            viewport={{ once: true }}
          >
            <motion.div
              style={{ x: rightSpringX, y: rightSpringY }}
              className="w-full h-full"
            >
              <motion.img
                src="/bg/2.png"
                alt="Collaboration image 2"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
                style={{ y: rightY, scale: 1.12 }}
                transition={{ type: "spring", stiffness: 60 }}
              />
            </motion.div>

            <motion.div
              className="absolute inset-0 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: hovered === "right" ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            />

            {/* Center text - "you." */}
            {/* <AnimatePresence>
            {animationComplete && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.4,
                }}
              >
                <div className="relative">
                  <motion.h2
                    className="text-white text-3xl md:text-5xl lg:text-6xl font-semibold tracking-wider"
                    style={{
                      textShadow: "0 4px 30px rgba(0,0,0,0.5)",
                    }}
                    initial={{ opacity: 0, letterSpacing: "0.3em" }}
                    animate={{ opacity: 1, letterSpacing: "0.08em" }}
                    transition={{
                      duration: 1.2,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.5,
                    }}
                  >
                    you.
                  </motion.h2>
                  <motion.div
                    className="h-px mt-3"
                    style={{
                      backgroundImage: `linear-gradient(to right, transparent, ${redColor}, transparent)`,
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      duration: 1,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.8,
                    }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence> */}

            <AnimatePresence>
              {hovered === "right" && (
                <motion.div
                  key="cursor-right"
                  className="absolute pointer-events-none z-20 flex items-center justify-center"
                  style={{
                    left: "50%",
                    top: "50%",
                    translateX: "-50%",
                    translateY: "-50%",
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="w-20 h-20 rounded-full border border-white/60 flex items-center justify-center">
                    <span
                      className="text-white text-[10px] tracking-widest uppercase"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      View
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Top-right corner */}
            <motion.div
              className="absolute top-6 right-6 w-8 h-8 border-t border-r"
              style={{ borderColor: `oklch(59.71% 0.23 23.86 / 0.6)` }}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              viewport={{ once: true }}
            />

            {/* Bottom-right corner */}
            <motion.div
              className="absolute bottom-6 right-6 w-8 h-8 border-b border-r"
              style={{ borderColor: `oklch(59.71% 0.23 23.86 / 0.6)` }}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              viewport={{ once: true }}
            />
          </motion.div>

          {/* ── CENTER X CONNECTOR — Absolutely positioned, no layout impact ── */}
          {/* Desktop */}
          <AnimatePresence>
            {animationComplete && (
              <>
                {/* Vertical divider line - absolute */}
                <motion.div
                  className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 z-30 -translate-x-1/2"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: "top" }}
                >
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: redColor }}
                    animate={{ top: ["10%", "90%", "10%"] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>

                {/* X symbol - desktop */}
                <motion.div
                  className="group/x hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 items-center justify-center cursor-pointer"
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.5,
                  }}
                  onClick={() => setModalOpen(true)}
                  whileHover={{ scale: 1.08 }}
                  role="button"
                  aria-label="Open collaboration form"
                  title="Open collab form"
                >
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    {/* Orbiting CTA text — spells out the action around the mark */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none transition-opacity duration-500 group-hover/x:opacity-100 opacity-80"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 16,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <defs>
                          <path
                            id="collabRingDesktop"
                            d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
                          />
                        </defs>
                        <text
                          fill={redColor}
                          style={{
                            fontFamily: "'DM Mono', monospace",
                            fontSize: "7px",
                            letterSpacing: "2.5px",
                            textTransform: "uppercase",
                          }}
                        >
                          <textPath href="#collabRingDesktop" startOffset="0%">
                            Let&apos;s collaborate ✦ Click to start ✦
                          </textPath>
                        </text>
                      </svg>
                    </motion.div>

                    {/* Expanding pulse ring — signals the mark is interactive */}
                    <motion.div
                      className="absolute w-16 h-16 rounded-full pointer-events-none"
                      style={{
                        borderWidth: 1,
                        borderStyle: "solid",
                        borderColor: redColor,
                      }}
                      animate={{ scale: [1, 1.7], opacity: [0.6, 0] }}
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />

                    {/* Center puck */}
                    <div className="relative w-16 h-16 flex items-center justify-center">
                      <motion.div
                        className="absolute inset-0 rounded-full bg-black/80 backdrop-blur-sm"
                        style={{
                          borderWidth: 1,
                          borderStyle: "solid",
                          borderColor: `oklch(59.71% 0.23 23.86 / 0.4)`,
                        }}
                        animate={{
                          boxShadow: [
                            "0 0 20px rgba(201,58,42,0.2)",
                            "0 0 40px rgba(201,58,42,0.4)",
                            "0 0 20px rgba(201,58,42,0.2)",
                          ],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      {/* ✕ rotates 45° into a "+" on hover — a join/add metaphor */}
                      <motion.span
                        className="relative text-2xl font-bold z-10 transition-transform duration-500 ease-out group-hover/x:rotate-45"
                        style={{
                          fontFamily: "'DM Serif Display', Georgia, serif",
                          color: redColor,
                        }}
                        animate={{
                          textShadow: [
                            "0 0 10px rgba(201,58,42,0.3)",
                            "0 0 20px rgba(201,58,42,0.6)",
                            "0 0 10px rgba(201,58,42,0.3)",
                          ],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        ✕
                      </motion.span>
                    </div>
                  </div>
                </motion.div>

                {/* X symbol - mobile (between stacked images) */}
                <motion.div
                  className="md:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 flex items-center justify-center cursor-pointer"
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.5,
                  }}
                  onClick={() => setModalOpen(true)}
                  whileTap={{ scale: 0.94 }}
                  role="button"
                  aria-label="Open collaboration form"
                  title="Open collab form"
                >
                  <div className="relative w-28 h-28 flex items-center justify-center">
                    {/* Orbiting CTA text — spells out the action around the mark */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none opacity-90"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 16,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <defs>
                          <path
                            id="collabRingMobile"
                            d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
                          />
                        </defs>
                        <text
                          fill={redColor}
                          style={{
                            fontFamily: "'DM Mono', monospace",
                            fontSize: "7px",
                            letterSpacing: "2.5px",
                            textTransform: "uppercase",
                          }}
                        >
                          <textPath href="#collabRingMobile" startOffset="0%">
                            Tap to collaborate ✦ Start here ✦
                          </textPath>
                        </text>
                      </svg>
                    </motion.div>

                    {/* Expanding pulse ring — signals the mark is tappable */}
                    <motion.div
                      className="absolute w-12 h-12 rounded-full pointer-events-none"
                      style={{
                        borderWidth: 1,
                        borderStyle: "solid",
                        borderColor: redColor,
                      }}
                      animate={{ scale: [1, 1.7], opacity: [0.6, 0] }}
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />

                    {/* Center puck */}
                    <div className="relative w-12 h-12 flex items-center justify-center">
                      <motion.div
                        className="absolute inset-0 rounded-full bg-black/80 backdrop-blur-sm"
                        style={{
                          borderWidth: 1,
                          borderStyle: "solid",
                          borderColor: `oklch(59.71% 0.23 23.86 / 0.4)`,
                        }}
                        animate={{
                          boxShadow: [
                            "0 0 20px rgba(201,58,42,0.2)",
                            "0 0 40px rgba(201,58,42,0.4)",
                            "0 0 20px rgba(201,58,42,0.2)",
                          ],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      <motion.span
                        className="relative text-xl font-bold z-10"
                        style={{
                          fontFamily: "'DM Serif Display', Georgia, serif",
                          color: redColor,
                        }}
                      >
                        ✕
                      </motion.span>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </section>
      <CollabModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default CollabSec;
