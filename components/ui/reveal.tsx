"use client";

import { motion, type Variants } from "framer-motion";

type Direction = "up" | "left" | "right";

function offsetFor(direction: Direction, distance: number) {
  if (direction === "left") return { x: -distance };
  if (direction === "right") return { x: distance };
  return { y: distance };
}

/** Scroll-triggered reveal wrapper — the site's default entrance animation. */
export function Reveal({
  children,
  index = 0,
  className,
  direction = "up",
  distance = 28,
  duration = 0.6,
  staggerStep = 0.08,
  margin = "-60px",
  once = true,
}: {
  children: React.ReactNode;
  index?: number;
  className?: string;
  /** Which side the content slides in from. Default "up" (slides up into place). */
  direction?: Direction;
  /** Offset in px before settling. */
  distance?: number;
  duration?: number;
  /** Delay per `index`, in seconds. */
  staggerStep?: number;
  margin?: string;
  once?: boolean;
}) {
  const variants: Variants = {
    hidden: { opacity: 0, ...offsetFor(direction, distance) },
    show: (i: number) => ({
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration, delay: i * staggerStep, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <motion.div
      custom={index}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
