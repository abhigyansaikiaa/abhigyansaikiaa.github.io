import type { Variants } from "framer-motion";

export const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

export const CARD_VARIANTS: Variants = {
  enter: (dir: number) => ({
    opacity: 0,
    scale: dir > 0 ? 1.07 : 0.93,
    filter: "blur(10px)",
  }),
  active: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 180,
      damping: 26,
      mass: 0.8,
    },
  },
  exit: (dir: number) => ({
    opacity: 0,
    scale: dir > 0 ? 0.93 : 1.07,
    filter: "blur(10px)",
    transition: {
      duration: 0.36,
      ease: [0.32, 0, 0.67, 0],
    },
  }),
};
