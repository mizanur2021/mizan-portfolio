"use client";

import { useEffect, useState } from "react";

/** Typewriter effect cycling through a list of phrases. */
export function useTyping(
  phrases: readonly string[],
  { typeMs = 70, deleteMs = 35, holdMs = 1400 } = {}
) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setText(phrases[0]);
      return;
    }

    const current = phrases[i % phrases.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), holdMs);
    } else if (deleting && text === "") {
      setDeleting(false);
      setI((p) => p + 1);
    } else {
      timeout = setTimeout(
        () =>
          setText((prev) =>
            deleting
              ? current.slice(0, prev.length - 1)
              : current.slice(0, prev.length + 1)
          ),
        deleting ? deleteMs : typeMs
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, i, phrases, typeMs, deleteMs, holdMs]);

  return text;
}
