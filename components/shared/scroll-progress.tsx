"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Top-of-page neon progress bar bound to scroll position. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.2,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[100] h-0.5 w-full origin-left bg-gradient-to-r from-primary to-secondary shadow-glow"
    />
  );
}
