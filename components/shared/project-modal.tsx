"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ArrowRight, TrendingUp, ZoomIn, ZoomOut } from "lucide-react";
import { type Project } from "@/data/content";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

function touchDist(touches: TouchList) {
  return Math.hypot(
    touches[0].clientX - touches[1].clientX,
    touches[0].clientY - touches[1].clientY
  );
}

function ProjectModalInner({ project, onClose }: { project: Project; onClose: () => void }) {
  const images = project.images;
  const [imgIdx, setImgIdx] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const dragOrigin = useRef({ x: 0, y: 0 });
  const panAtDrag = useRef({ x: 0, y: 0 });
  const imgContainerRef = useRef<HTMLDivElement>(null);

  /* reset zoom when switching images */
  const goTo = useCallback((i: number) => {
    setImgIdx(i);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const prev = () => goTo((imgIdx - 1 + images.length) % images.length);
  const next = () => goTo((imgIdx + 1) % images.length);

  /* wheel zoom — must be non-passive to preventDefault */
  useEffect(() => {
    const el = imgContainerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const step = e.deltaY < 0 ? 0.3 : -0.3;
      setZoom(z => Math.max(1, Math.min(4, z + step)));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  /* pinch-to-zoom — must be non-passive to preventDefault */
  useEffect(() => {
    const el = imgContainerRef.current;
    if (!el) return;
    let startDist: number | null = null;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) startDist = touchDist(e.touches);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 2 || startDist === null) return;
      e.preventDefault();
      const d = touchDist(e.touches);
      setZoom(z => Math.max(1, Math.min(4, z * (d / startDist!))));
      startDist = d;
    };
    const onTouchEnd = () => { startDist = null; };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  /* mouse drag to pan when zoomed */
  const onMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    setHasDragged(false);
    dragOrigin.current = { x: e.clientX, y: e.clientY };
    panAtDrag.current = pan;
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragOrigin.current.x;
    const dy = e.clientY - dragOrigin.current.y;
    if (Math.abs(dx) > 2 || Math.abs(dy) > 2) setHasDragged(true);
    setPan({ x: panAtDrag.current.x + dx, y: panAtDrag.current.y + dy });
  };
  const onMouseUp = () => setIsDragging(false);

  /* click: zoom in/out (suppressed if user just dragged) */
  const onContainerClick = () => {
    if (hasDragged) { setHasDragged(false); return; }
    if (zoom > 1) { setZoom(1); setPan({ x: 0, y: 0 }); }
    else setZoom(2);
  };

  const stepZoomIn = () => setZoom(z => Math.min(4, +(z + 0.5).toFixed(1)));
  const stepZoomOut = () => {
    setZoom(z => {
      const n = Math.max(1, +(z - 0.5).toFixed(1));
      if (n === 1) setPan({ x: 0, y: 0 });
      return n;
    });
  };

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] flex items-end justify-center bg-black/80 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 56 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 56 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={e => e.stopPropagation()}
        className="relative flex w-full flex-col overflow-hidden bg-card sm:max-w-2xl sm:rounded-3xl"
        style={{ maxHeight: "92dvh" }}
      >
        {/* ── sticky header ── */}
        <div className="flex shrink-0 items-center justify-between border-b border-line bg-card px-4 py-3">
          <p className="text-sm text-muted">
            {images.length > 1 ? `${imgIdx + 1} / ${images.length}` : project.category}
          </p>
          <div className="flex items-center gap-0.5">
            <button
              onClick={stepZoomOut}
              aria-label="Zoom out"
              className="grid h-8 w-8 place-items-center rounded-full text-muted transition-colors hover:bg-white/5 hover:text-white"
            >
              <ZoomOut size={15} />
            </button>
            <span className="w-10 text-center text-xs tabular-nums text-muted">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={stepZoomIn}
              aria-label="Zoom in"
              className="grid h-8 w-8 place-items-center rounded-full text-muted transition-colors hover:bg-white/5 hover:text-white"
            >
              <ZoomIn size={15} />
            </button>
            <button
              onClick={onClose}
              aria-label="Close"
              className="ml-1.5 grid h-8 w-8 place-items-center rounded-full bg-white/8 text-white transition-colors hover:bg-white/15"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* ── scrollable body ── */}
        <div className="flex-1 overflow-y-auto overscroll-contain">

          {/* image viewer */}
          <div className="relative select-none bg-black/90">
            <div
              ref={imgContainerRef}
              className="relative aspect-video overflow-hidden"
              style={{ cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in" }}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
              onClick={onContainerClick}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                  transformOrigin: "center",
                  transition: isDragging ? "none" : "transform 0.15s ease",
                }}
              >
                <Image
                  src={images[imgIdx]}
                  alt={`${project.title} — image ${imgIdx + 1}`}
                  fill
                  sizes="(max-width:640px) 100vw, 672px"
                  className="object-cover"
                  draggable={false}
                  priority
                />
              </div>
            </div>

            {/* prev / next arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={e => { e.stopPropagation(); prev(); }}
                  aria-label="Previous image"
                  className="absolute left-2 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={e => { e.stopPropagation(); next(); }}
                  aria-label="Next image"
                  className="absolute right-2 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>

          {/* thumbnail strip */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto bg-black/60 px-3 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={cn(
                    "relative h-14 w-[4.5rem] shrink-0 overflow-hidden rounded-lg transition-all",
                    i === imgIdx
                      ? "ring-2 ring-primary ring-offset-1 ring-offset-black"
                      : "opacity-50 hover:opacity-80"
                  )}
                >
                  <Image src={src} alt="" fill sizes="72px" className="object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* project details */}
          <div className="p-5 sm:p-7">
            <div className="flex flex-wrap items-center gap-2">
              <Badge>{project.category}</Badge>
              <span className="flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
                <TrendingUp size={11} />
                {project.result}
              </span>
            </div>

            <h3 className="mt-3 font-display text-xl font-bold tracking-tight sm:text-2xl">
              {project.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
              {project.description}
            </p>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {project.metrics.map(m => (
                <div key={m.label} className="rounded-xl border border-line bg-white/[0.02] p-4">
                  <p className="text-xs text-muted">{m.label}</p>
                  <p className="mt-2 flex flex-wrap items-center gap-2 font-display font-bold">
                    <span className="text-muted line-through decoration-white/20">{m.before}</span>
                    <ArrowRight size={12} className="shrink-0 text-primary" />
                    <span className="text-primary">{m.after}</span>
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-2 pb-2">
              {project.tags.map(t => <Badge key={t}>#{t}</Badge>)}
            </div>

            <Link
              href={`/work/${project.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              Open as a shareable page <ArrowRight size={13} />
            </Link>
          </div>

        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

/** Handles mount/unmount + exit animation so the parent only needs to pass `project`. */
export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {project && <ProjectModalInner project={project} onClose={onClose} />}
    </AnimatePresence>
  );
}
