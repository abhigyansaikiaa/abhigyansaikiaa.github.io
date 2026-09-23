"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoverState, setHoverState] = useState<
    "default" | "link" | "button" | "text"
  >("default");
  const [hoverText, setHoverText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if it's a touch device
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible((prev) => {
        if (!prev) return true;
        return prev;
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target || !target.tagName) return;

      // Find the closest clickable element
      const clickable = target.closest(
        "a, button, input, textarea, select, [role='button'], .cursor-pointer",
      );

      if (clickable) {
        const text = clickable.getAttribute("data-cursor-text");
        if (text) {
          setHoverState("text");
          setHoverText(text);
        } else if (clickable.tagName.toLowerCase() === "a") {
          setHoverState("link");
        } else {
          setHoverState("button");
        }
      } else {
        setHoverState("default");
        setHoverText("");
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Add global style to hide cursor on all elements
    const style = document.createElement("style");
    style.innerHTML = `
      * {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  if (isTouchDevice || !isVisible) return null;

  const isHovering = hoverState !== "default";
  const showIcon = hoverState === "link";
  const showText = hoverState === "text";

  return (
    <>
      {/* Main dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 1000,
          damping: 40,
          mass: 0.1,
        }}
      />

      {/* Trailing circle / Hover state */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] mix-blend-difference flex items-center justify-center overflow-hidden"
        animate={{
          x: isHovering ? mousePosition.x - 40 : mousePosition.x - 16,
          y: isHovering ? mousePosition.y - 40 : mousePosition.y - 16,
          width: isHovering ? 80 : 32,
          height: isHovering ? 80 : 32,
          backgroundColor: isHovering
            ? "rgba(255, 255, 255, 1)"
            : "transparent",
          border: isHovering
            ? "0px solid rgba(255, 255, 255, 0)"
            : "1px solid rgba(255, 255, 255, 1)",
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 28,
          mass: 0.5,
        }}
      >
        <AnimatePresence mode="wait">
          {showIcon && (
            <motion.div
              key="icon"
              initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
              transition={{ duration: 0.2 }}
              className="text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </motion.div>
          )}
          {showText && (
            <motion.div
              key="text"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className="text-black text-sm font-bold uppercase tracking-widest"
            >
              {hoverText}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
