import React, { useEffect, useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";

const slideUp: Variants = {
  initial: { y: 0 },
  exit: {
    y: "-100vh",
    transition: {
      duration: 1.1,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.15,
    },
  },
};

interface LoadingScreenProps {
  onComplete?: () => void;
  words?: string[];
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onComplete,
  words = [
    "DEVELOPER",
    "DESIGNER",
    "CREATOR",
    "MEDICAL LAB SCIENCES",
    "ABHIGYAN",
  ],
  backgroundColor = "#121212",
  textColor = "#ffffff",
  accentColor = "#06b6d4", // cyan-400 equivalent approx for the portfolio
}) => {
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mock progress loading from 0 to 100 over ~2 seconds
  useEffect(() => {
    const duration = 2000;
    const interval = 20; // 50fps roughly
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setIsComplete(true);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isComplete) {
      // Add a slight delay before triggering onComplete to let the user see 100%
      const timeout = setTimeout(() => {
        onComplete?.();
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [isComplete, onComplete]);

  const clamped = Math.min(100, Math.max(0, progress));
  const index = Math.min(
    words.length - 1,
    Math.floor((clamped / 100) * words.length)
  );

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height + 300} 0 ${
    dimension.height
  } L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`;

  const curve: Variants = {
    initial: {
      d: initialPath,
      transition: { duration: 1.7, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: targetPath,
      transition: { duration: 1.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
    },
  };

  const lineInitial = `M0 ${dimension.height} Q${dimension.width / 2} ${
    dimension.height + 300
  } ${dimension.width} ${dimension.height}`;
  const lineTarget = `M0 ${dimension.height} Q${dimension.width / 2} ${
    dimension.height
  } ${dimension.width} ${dimension.height}`;

  const lineCurve: Variants = {
    initial: {
      d: lineInitial,
      transition: { duration: 1.7, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: lineTarget,
      transition: { duration: 1.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
    },
  };

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      exit="exit"
      className="h-[100svh] w-full fixed left-0 top-0 z-[100]"
      style={{ backgroundColor, willChange: "transform" }}
    >
      {dimension.width > 0 && (
        <>
          {!isMobile && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 z-[1] h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
              style={{ backgroundColor: accentColor, willChange: "transform, opacity" }}
              animate={{ scale: [1, 1.35, 1], opacity: [0.08, 0.2, 0.08] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          )}

          <div className="absolute inset-0 z-[2] flex items-center justify-center">
            <div className="flex items-center overflow-hidden">
              <span
                className="mr-3 block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: accentColor }}
              />
              <div className="relative overflow-hidden">
                <span className="invisible block font-clash text-2xl md:text-5xl font-bold tracking-tight uppercase leading-[1.6]">
                  MEDICAL LAB SCIENCES
                </span>
                <motion.span
                  key={index}
                  initial={{ y: "35%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                  className="absolute inset-0 flex items-center justify-center whitespace-nowrap font-clash text-2xl md:text-5xl font-bold tracking-tight uppercase leading-[1.6]"
                  style={{ color: textColor }}
                >
                  {words[index]}
                </motion.span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-6 md:left-12 z-[2] flex items-center gap-3">
            <motion.span
              className="block h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: accentColor }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            />
            <span
              className="font-satoshi text-[11px] font-bold uppercase tracking-[0.35em] opacity-60"
              style={{ color: textColor }}
            >
              Loading experience
            </span>
          </div>

          <div className="absolute bottom-4 right-6 md:right-12 z-[2] flex items-end tabular-nums">
            <span
              className="font-clash font-bold text-[18vw] leading-none tracking-tighter md:text-[12vw]"
              style={{ color: textColor }}
            >
              {String(Math.round(clamped)).padStart(2, "0")}
            </span>
            <span
              className="mb-[2vw] ml-1 font-satoshi font-bold text-[4vw] md:mb-[1.5vw] md:text-[2.5vw]"
              style={{ color: accentColor }}
            >
              %
            </span>
          </div>

          {isMobile ? (
            <div className="absolute bottom-0 left-0 z-[3] h-[3px] w-full">
              <div
                className="absolute inset-0"
                style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
              />
              <motion.div
                className="absolute inset-0 origin-left"
                style={{ backgroundColor: accentColor }}
                animate={{ scaleX: clamped / 100 }}
                transition={{ ease: "easeOut", duration: 0.3 }}
              />
            </div>
          ) : (
            <>
              <svg
                className="absolute top-0 left-0 z-[3] w-full"
                style={{ height: "calc(100% + 300px)" }}
              >
                <motion.path
                  variants={lineCurve}
                  initial="initial"
                  exit="exit"
                  fill="none"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth={4}
                  vectorEffect="non-scaling-stroke"
                />
                <motion.path
                  variants={lineCurve}
                  initial="initial"
                  exit="exit"
                  fill="none"
                  stroke={accentColor}
                  strokeWidth={4}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  pathLength={1}
                  strokeDasharray="1 1"
                  animate={{ strokeDashoffset: 1 - clamped / 100 }}
                  transition={{ ease: "easeOut", duration: 0.4 }}
                />
              </svg>

              <svg
                className="absolute top-0 left-0 z-[0] w-full"
                style={{ height: "calc(100% + 300px)" }}
              >
                <motion.path
                  variants={curve}
                  initial="initial"
                  exit="exit"
                  style={{ fill: backgroundColor }}
                />
              </svg>
            </>
          )}
        </>
      )}
    </motion.div>
  );
};

export default LoadingScreen;
