"use client";


import React, { useRef, useState, useEffect } from "react";
import { ThemeToggleButton } from "./theme-switcher";

import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, useAnimate, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Projects", href: "#projects", label: "Our Work" },
  // { name: "Services", href: "#services", label: "What We Do" },
  { name: "Contact", href: "#contact", label: "Get In Touch" },
  { name: "About", href: "#about", label: "Who We Are" },
];

const socialLinks = [
  { name: "YouTube", href: "https://www.youtube.com/@yourusername" },
  { name: "Behance", href: "https://www.behance.net/yourusername" },
  { name: "Instagram", href: "https://www.instagram.com/yourusername" },
  { name: "Discord", href: "https://discord.gg/yourinvite" },
];

const EASE_OPEN: [number, number, number, number] = [0.76, 0, 0.24, 1];
const EASE_CLOSE: [number, number, number, number] = [0.76, 0, 0.24, 1];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [scope, animate] = useAnimate();
  const closedWidthRef = useRef<number>(0);

  // Close navbar when clicking outside
  useEffect(() => {
    const handleClickOutside = async (event: MouseEvent) => {
      if (
        isOpen &&
        scope.current &&
        !scope.current.contains(event.target as Node)
      ) {
        if (isAnimating) return;
        setIsAnimating(true);
        setShowContent(false);
        setHoveredIndex(null);

        await animate(
          scope.current,
          { height: "4rem", borderRadius: "10px" },
          { duration: 0.6, ease: EASE_CLOSE },
        );

        await animate(
          scope.current,
          { width: `${closedWidthRef.current}px`, borderRadius: "10px" },
          { duration: 0.65, ease: EASE_CLOSE },
        );

        scope.current.style.width = "";
        scope.current.style.height = "";
        scope.current.style.borderRadius = "";
        setIsOpen(false);
        setIsAnimating(false);
      }
    };

    if (isOpen) {
      // Add a small delay to prevent immediate closing when opening
      const timer = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 100);

      return () => {
        clearTimeout(timer);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, isAnimating]);

  const handleToggle = async () => {
    if (isAnimating) return;
    setIsAnimating(true);

    if (!isOpen) {
      closedWidthRef.current = scope.current.offsetWidth;
      scope.current.style.width = `${closedWidthRef.current}px`;
      setIsOpen(true);

      await animate(
        scope.current,
        { width: "95vw", borderRadius: "10px" },
        { duration: 0.85, ease: EASE_OPEN },
      );

      setShowContent(true);

      await animate(
        scope.current,
        { height: "80vh", borderRadius: "10px" },
        { duration: 0.9, ease: EASE_OPEN },
      );
    } else {
      setShowContent(false);
      setHoveredIndex(null);

      await animate(
        scope.current,
        { height: "4rem", borderRadius: "10px" },
        { duration: 0.6, ease: EASE_CLOSE },
      );

      await animate(
        scope.current,
        { width: `${closedWidthRef.current}px`, borderRadius: "10px" },
        { duration: 0.65, ease: EASE_CLOSE },
      );

      scope.current.style.width = "";
      scope.current.style.height = "";
      scope.current.style.borderRadius = "";
      setIsOpen(false);
    }

    setIsAnimating(false);
  };

  return (
    <nav className="fixed top-5 left-0 right-0 z-50 flex justify-center items-center">
      <div
        ref={scope}
        className="w-4/5 md:w-xl border h-16 rounded bg-background/80 dark:bg-background/60 backdrop-blur-md flex flex-col overflow-hidden"
      >
        {/* ── Top bar ──────────────────────────────── */}
        <div className="flex justify-between items-center min-h-16 shrink-0 px-6">
          <motion.button
            onClick={handleToggle}
            className="cursor-pointer relative h-6 w-6"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            whileTap={{ scale: 0.85 }}
            whileHover={{ scale: 1.1 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          <a
            href={"/"}
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              if (isOpen) handleToggle();
            }}
          >
            <img
              src="/md-red-logo.svg"
              alt="Md Logo"
              className="h-12 w-12 cursor-pointer"
              width={12}
              height={12}
            />
          </a>

          <ThemeToggleButton
            start="left-right"
            variant="rectangle"
            className="bg-background-foreground border"
          />
        </div>

        {/* ── Awwwards-style Expandable content ────── */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex flex-col flex-1 px-6 md:px-10 pt-4 pb-6 overflow-hidden"
            >
              {/* ── Main content: split layout ─────── */}
              <div className="flex flex-col md:flex-row flex-1 gap-8 md:gap-0">
                {/* ── Left: Navigation links ───────── */}
                <div className="flex-1 flex flex-col justify-center">
                  {/* Section label */}
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 md:mb-8"
                  >
                    Navigation
                  </motion.span>

                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{
                        opacity: 0,
                        y: -15,
                        filter: "blur(4px)",
                        transition: {
                          duration: 0.16,
                          delay: (navLinks.length - 1 - i) * 0.04,
                        },
                      }}
                      transition={{
                        duration: 0.6,
                        delay: i * 0.08,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      onMouseEnter={() => setHoveredIndex(i)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <a
                        href={link.href}
                        onClick={handleToggle}
                        className="group relative pr-6 flex items-center gap-4 md:gap-6 py-3 md:py-4 border-b border-border/20 last:border-b-0"
                      >
                        {/* Number */}
                        <motion.span
                          className="text-xs md:text-sm font-mono text-muted-foreground/60 w-8 shrink-0"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{
                            duration: 0.3,
                            delay: i * 0.08 + 0.2,
                          }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </motion.span>

                        {/* Link text container */}
                        <div className="flex-1 overflow-hidden ">
                          <motion.div
                            className="flex items-baseline gap-3"
                            animate={{
                              x: hoveredIndex === i ? 12 : 0,
                            }}
                            transition={{
                              duration: 0.4,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                          >
                            <span className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-none">
                              {link.name}
                            </span>

                            {/* Sublabel - shows on hover */}
                            <motion.span
                              className="text-xs md:text-sm text-muted-foreground hidden md:inline-block"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{
                                opacity: hoveredIndex === i ? 1 : 0,
                                x: hoveredIndex === i ? 0 : -10,
                              }}
                              transition={{
                                duration: 0.3,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                            >
                              — {link.label}
                            </motion.span>
                          </motion.div>
                        </div>

                        {/* Arrow */}
                        <motion.div
                          className="shrink-0"
                          animate={{
                            opacity: hoveredIndex === i ? 1 : 0.3,
                            rotate: hoveredIndex === i ? 0 : -45,
                            scale: hoveredIndex === i ? 1 : 0.7,
                          }}
                          transition={{
                            duration: 0.3,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          <ArrowUpRight className="h-5 w-5 md:h-6 md:w-6" />
                        </motion.div>

                        {/* Hover highlight bar */}
                        <motion.div
                          className="absolute -left-4 top-0 bottom-0 w-[3px] bg-primary rounded-full origin-top"
                          initial={{ scaleY: 0 }}
                          animate={{
                            scaleY: hoveredIndex === i ? 1 : 0,
                          }}
                          transition={{
                            duration: 0.3,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        />
                      </a>
                    </motion.div>
                  ))}
                </div>

                {/* ── Right: Info panel (desktop) ──── */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="hidden md:flex flex-col justify-between w-64 lg:w-96 pl-8 lg:pl-12 border-l border-border/20 mb-2"
                >
                  {/* CTA section */}
                  <div className="flex flex-col gap-4">
                    <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                      Let&apos;s Talk
                    </span>
                    <motion.a
                      href="mailto:you@example.com"
                      className="text-sm hover:text-primary transition-colors"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      you@example.com
                    </motion.a>
                  </div>

                  {/* Social links */}
                  <div className="flex flex-col gap-3">
                    <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">
                      Socials
                    </span>
                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                      {socialLinks.map((social, i) => (
                        <motion.a
                          key={social.name}
                          href={social.href}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: 0.3 + i * 0.05,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="group/social relative text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {social.name}
                          <motion.span
                            className="absolute bottom-0 left-0 h-[1px] bg-current origin-left"
                            initial={{ scaleX: 0 }}
                            whileHover={{ scaleX: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                        </motion.a>
                      ))}
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex flex-col gap-1">
                    <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                      Based In
                    </span>
                    <span className="text-sm">India</span>
                    <span className="text-xs text-muted-foreground">
                      Available Worldwide
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* ── Bottom bar ─────────────────────── */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.4,
                  delay: navLinks.length * 0.08 + 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex flex-col justify-between items-start gap-2 pt-4 mt-auto border-t border-border/20"
              >
                <div className="flex items-center gap-2">
                  <motion.div
                    className="h-2 w-2 rounded-full bg-green-500"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <span className="text-xs text-muted-foreground">
                    Available for projects
                  </span>
                </div>

                {/* Mobile social links */}
                <div className="flex gap-3 md:hidden">
                  {socialLinks.slice(0, 3).map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {social.name}
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
