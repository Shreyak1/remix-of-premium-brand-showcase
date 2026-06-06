import type { Variants, Transition } from "framer-motion";

// Long, confident cubic-bezier — used for entrances and slow settles.
export const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const easeOutSoft: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const springSoft: Transition = {
  type: "spring",
  stiffness: 180,
  damping: 24,
  mass: 1,
};

export const springGentle: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 20,
  mass: 1.1,
};

// A piece floats up and rotates into place — "settles" rather than fades.
export const floatIn: Variants = {
  hidden: { opacity: 0, y: 40, rotate: -2 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 1.2, ease: easeOutExpo },
  },
};

// Container that staggers children diagonally (used with diagonalChild).
export const diagonalContainer = (cols: number = 4): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
});

export const diagonalChild: Variants = {
  hidden: { opacity: 0, y: 50, x: -20 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { duration: 1.1, ease: easeOutExpo },
  },
};

// Per-word reveal (mask-style).
export const wordContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const wordChild: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.9, ease: easeOutExpo },
  },
};

// Continuous floating loop (use as animate prop on image).
export const floatLoop = {
  y: [0, -8, 0],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};