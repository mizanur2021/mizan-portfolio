"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { type Certificate } from "@/data/content";

function CertificateLightboxInner({
  cert,
  onClose,
}: {
  cert: Certificate;
  onClose: () => void;
}) {
  const [side, setSide] = useState<"front" | "back">("front");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    setSide("front");
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [cert, onClose]);

  const shownImage = side === "back" && cert.backImage ? cert.backImage : cert.image;

  if (!mounted) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-[600] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-8"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="fixed right-4 top-4 z-[610] grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6 sm:top-6"
      >
        <X size={20} />
      </button>

      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="flex h-full w-full max-w-6xl flex-col items-center"
      >
        <div className="relative min-h-0 w-full flex-1">
          <Image
            key={shownImage}
            src={shownImage}
            alt={`${cert.name}${side === "back" ? " — back" : ""}`}
            fill
            sizes="95vw"
            className="object-contain"
          />
        </div>

        {/* front / back toggle — only for two-sided documents */}
        {cert.backImage && (
          <div className="mt-4 flex gap-2 rounded-full bg-white/10 p-1">
            {(["front", "back"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSide(s)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold capitalize transition-colors ${
                  side === s ? "bg-primary text-black" : "text-white/70 hover:text-white"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <div className="mt-4 text-center">
          <p className="text-sm font-semibold text-white sm:text-base">{cert.name}</p>
          <p className="mt-1 text-xs text-white/60 sm:text-sm">{cert.issuer}</p>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

/** Handles mount/unmount + exit animation so the parent only needs to pass `active`. */
export function CertificateLightbox({
  active,
  onClose,
}: {
  active: Certificate | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {active && <CertificateLightboxInner cert={active} onClose={onClose} />}
    </AnimatePresence>
  );
}
