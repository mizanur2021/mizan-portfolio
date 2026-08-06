"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { categories, type Project } from "@/data/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const ProjectModal = dynamic(
  () => import("@/components/shared/project-modal").then(m => m.ProjectModal),
  { ssr: false }
);

const MotionLink = motion.create(Link);

/* ── Portfolio ───────────────────────────────────────────────────────────── */
export function Portfolio({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const [active, setActive] = useState<Project | null>(null);
  const [modalLoaded, setModalLoaded] = useState(false);
  const savedScrollY = useRef(0);

  const filtered = filter === "All" ? projects : projects.filter(p => p.category === filter);

  /* iOS-safe body scroll lock: fixes position:fixed so background doesn't jump to top */
  useEffect(() => {
    if (!active) return;
    savedScrollY.current = window.scrollY;
    document.body.style.cssText =
      `position:fixed;top:-${savedScrollY.current}px;width:100%;overflow-y:scroll`;
    return () => {
      document.body.style.cssText = "";
      window.scrollTo(0, savedScrollY.current);
    };
  }, [active?.id]);

  /* browser back button closes modal instead of leaving the site */
  useEffect(() => {
    if (!active) return;
    history.pushState({ portfolioModal: active.id }, "");
    const onPop = () => setActive(null);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [active?.id]);

  const openProject = (p: Project, e: React.MouseEvent) => {
    // let modified/middle clicks behave normally (open the real /work/[id]
    // page in a new tab) instead of hijacking them into the modal
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    setModalLoaded(true);
    setActive(p);
  };

  const closeProject = useCallback(() => {
    /* if we pushed a history entry, go back so the browser history stays clean */
    if (history.state?.portfolioModal) history.back();
    else setActive(null);
  }, []);

  return (
    <section id="work" className="relative py-16 sm:py-24 lg:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Selected work"
          title={
            <>
              Real clients. <span className="text-gradient">Real numbers.</span>
            </>
          }
          subtitle="A sample of recent projects — tap any card for the full case study and before/after metrics."
        />

        {/* filter tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm transition-colors",
                filter === c ? "text-primary-foreground" : "text-muted hover:text-white"
              )}
            >
              {filter === c && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 360, damping: 30 }}
                />
              )}
              {c}
            </button>
          ))}
        </div>

        {/* masonry grid */}
        <LayoutGroup>
          <motion.div
            layout
            className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-4 [&>*]:mb-4"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map(p => (
                <MotionLink
                  href={`/work/${p.id}`}
                  layout
                  key={p.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4 }}
                  onClick={(e: React.MouseEvent) => openProject(p, e)}
                  className="group relative block w-full break-inside-avoid overflow-hidden rounded-2xl border border-line text-left"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={p.cover}
                      alt={p.title}
                      fill
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />
                    <div className="absolute inset-0 flex translate-y-4 flex-col justify-end p-5 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                      <span className="inline-flex w-fit items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                        <TrendingUp size={12} /> {p.result}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <Badge>{p.category}</Badge>
                    <h3 className="mt-3 font-display text-lg font-semibold">{p.title}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-muted">{p.description}</p>
                  </div>
                </MotionLink>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>

      {modalLoaded && <ProjectModal project={active} onClose={closeProject} />}
    </section>
  );
}
