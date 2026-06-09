"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";

/** Returns ref + handlers for a magnetic (cursor-attracted) element. */
export function useMagnetic(strength = 0.4) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const reduce = useReducedMotion();

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };

  return { ref, onMove, onLeave };
}
