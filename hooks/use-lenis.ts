"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Boots Lenis smooth scroll. Automatically disabled when the user prefers
 * reduced motion, and on coarse-pointer (touch) devices — native touch
 * scrolling is already smooth, and Lenis's RAF loop otherwise runs for the
 * page's whole lifetime competing with the main thread during initial load.
 */
export function useLenis() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let raf: number;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
}
