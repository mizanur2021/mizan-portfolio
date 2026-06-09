"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { X, ArrowRight, TrendingUp } from "lucide-react";
import { projects, categories, type Project } from "@/data/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function Portfolio() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const [active, setActive] = useState<Project | null>(null);

  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

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

        {/* Filter tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
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

        {/* Masonry-style grid */}
        <LayoutGroup>
          <motion.div
            layout
            className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((p) => (
                <motion.button
                  layout
                  key={p.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setActive(p)}
                  className="group relative block w-full break-inside-avoid overflow-hidden rounded-2xl border border-line text-left"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={p.cover}
                      alt={p.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />
                    {/* hover reveal */}
                    <div className="absolute inset-0 flex translate-y-4 flex-col justify-end p-5 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                      <span className="inline-flex w-fit items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                        <TrendingUp size={12} /> {p.result}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <Badge>{p.category}</Badge>
                    <h3 className="mt-3 font-display text-lg font-semibold">
                      {p.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-muted">
                      {p.description}
                    </p>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>

      {/* Case study modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[200] grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="glass relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-3xl shadow-cinematic"
            >
              <button
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-black/40 text-white backdrop-blur hover:bg-black/60"
              >
                <X size={18} />
              </button>

              <div className="relative aspect-[16/9] overflow-hidden rounded-t-3xl">
                <Image
                  src={active.cover}
                  alt={active.title}
                  fill
                  sizes="640px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              </div>

              <div className="p-7">
                <Badge>{active.category}</Badge>
                <h3 className="mt-3 font-display text-2xl font-bold tracking-tight">
                  {active.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">
                  {active.description}
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {active.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-xl border border-line bg-white/[0.02] p-4"
                    >
                      <p className="text-xs text-muted">{m.label}</p>
                      <p className="mt-2 flex items-center gap-2 font-display font-bold">
                        <span className="text-muted line-through decoration-white/20">
                          {m.before}
                        </span>
                        <ArrowRight size={14} className="text-primary" />
                        <span className="text-primary">{m.after}</span>
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {active.tags.map((t) => (
                    <Badge key={t}>#{t}</Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
