"use client";

import { useEffect, useRef, useState } from "react";

/** A two-part custom cursor (dot + trailing ring) that grows over links. */
export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);

    let rx = 0, ry = 0, mx = 0, my = 0;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot.current)
        dot.current.style.transform = `translate(${mx}px, ${my}px)`;
    };

    let raf = 0;
    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ring.current)
        ring.current.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const grow = () => ring.current?.classList.add("cursor-grow");
    const shrink = () => ring.current?.classList.remove("cursor-grow");
    const targets = "a, button, [data-cursor]";
    document.querySelectorAll(targets).forEach((el) => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });

    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-1 -mt-1 h-2 w-2 rounded-full bg-primary mix-blend-difference"
      />
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[9998] -ml-4 -mt-4 h-8 w-8 rounded-full border border-primary/60 transition-[width,height,margin] duration-200 [&.cursor-grow]:-ml-7 [&.cursor-grow]:-mt-7 [&.cursor-grow]:h-14 [&.cursor-grow]:w-14 [&.cursor-grow]:bg-primary/10"
      />
    </>
  );
}
