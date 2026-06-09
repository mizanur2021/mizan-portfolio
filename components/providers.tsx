"use client";

import { useEffect } from "react";
import { useLenis } from "@/hooks/use-lenis";
import { CustomCursor } from "@/components/shared/custom-cursor";
import { ScrollProgress } from "@/components/shared/scroll-progress";
import { MouseGradient } from "@/components/shared/mouse-gradient";

export function Providers({ children }: { children: React.ReactNode }) {
  useLenis();

  useEffect(() => {
    // Only hide the native cursor on fine-pointer devices.
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (fine) document.documentElement.classList.add("has-custom-cursor");
    return () => document.documentElement.classList.remove("has-custom-cursor");
  }, []);

  return (
    <>
      <MouseGradient />
      <ScrollProgress />
      <CustomCursor />
      {children}
    </>
  );
}
