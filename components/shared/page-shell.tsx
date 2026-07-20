"use client";

import { useState, useCallback } from "react";
import { Loader } from "@/components/shared/loader";

export function PageShell({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);

  const handleDone = useCallback(() => setLoaded(true), []);

  return (
    <>
      {!loaded && <Loader onDone={handleDone} />}
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.6s ease",
          pointerEvents: loaded ? "auto" : "none",
        }}
      >
        {children}
      </div>
    </>
  );
}
