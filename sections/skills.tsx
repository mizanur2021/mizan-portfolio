"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { skills, tools } from "@/data/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { Marquee } from "@/components/shared/marquee";

function SkillCard({
  name,
  level,
  blurb,
  index,
}: {
  name: string;
  level: number;
  blurb: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // 3D tilt on hover (pointer-fine only; cheap transform).
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -8;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 8;
    el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };
  const onLeave = () => {
    if (ref.current)
      ref.current.style.transform = "perspective(800px) rotateX(0) rotateY(0)";
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.05 }}
      className="glass group rounded-2xl p-5 transition-[transform,box-shadow] duration-200 will-change-transform hover:shadow-glow"
    >
      <div className="mb-3 flex items-baseline justify-between">
        <h3 className="font-display text-lg font-semibold">{name}</h3>
        <span className="font-display text-sm font-bold text-primary">{level}%</span>
      </div>
      <p className="mb-4 text-sm text-muted">{blurb}</p>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-primary to-secondary shadow-glow"
        />
      </div>
    </motion.div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative py-28 sm:py-36">
      <div className="container">
        <SectionHeading
          eyebrow="What I do best"
          title={
            <>
              A toolkit built for <span className="text-gradient">growth</span>
            </>
          }
          subtitle="Specialized skills, each backed by years of hands-on client work."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((s, i) => (
            <SkillCard key={s.name} {...s} index={i} />
          ))}
        </div>
      </div>

      {/* Tool Stack */}
      <div className="mt-20">
        <p className="container mb-8 text-center text-xs uppercase tracking-[0.25em] text-muted">
          Tools I work with daily
        </p>
        <Marquee>
          {tools.map((t) => (
            <div
              key={t.name}
              className="glass flex shrink-0 items-center gap-3 rounded-full px-6 py-3"
            >
              {t.icon ? (
                <t.icon size={22} style={{ color: t.color }} />
              ) : (
                <span
                  className="grid h-6 min-w-6 place-items-center rounded-md px-1.5 text-[11px] font-bold"
                  style={{ background: `${t.color}22`, color: t.color }}
                >
                  {t.mark}
                </span>
              )}
              <span className="whitespace-nowrap text-sm font-medium text-white">
                {t.name}
              </span>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
