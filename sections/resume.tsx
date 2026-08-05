"use client";

import { Download } from "lucide-react";
import { timeline, certifications, achievements } from "@/data/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export function Resume() {
  return (
    <section id="resume" className="relative py-16 sm:py-24 lg:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Experience"
          title={
            <>
              A track record of <span className="text-gradient">shipping</span>
            </>
          }
          subtitle="Five years of focused work across SEO, paid media, and ecommerce."
        />

        <div className="mt-8 flex justify-center">
          <a href="/cv.pdf" download>
            <Button magnetic>
              <Download size={16} /> Download CV
            </Button>
          </a>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.3fr_0.7fr]">
          {/* Timeline */}
          <div className="relative pl-8">
            <span className="absolute left-[7px] top-2 h-full w-px bg-gradient-to-b from-primary/60 via-line to-transparent" />
            {timeline.map((t, i) => (
              <Reveal
                key={t.role}
                index={i}
                direction="left"
                distance={16}
                staggerStep={0.1}
                className="relative pb-10 last:pb-0"
              >
                <span className="absolute -left-[29px] top-1.5 grid h-4 w-4 place-items-center rounded-full bg-bg">
                  <span className="h-2 w-2 rounded-full bg-primary shadow-glow" />
                </span>
                <p className="text-xs uppercase tracking-[0.15em] text-primary">
                  {t.year}
                </p>
                <h3 className="mt-1 font-display text-lg font-semibold">
                  {t.role}
                </h3>
                <p className="text-sm text-muted">{t.org}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{t.desc}</p>
              </Reveal>
            ))}
          </div>

          {/* Side: certs + achievements */}
          <div className="space-y-8">
            <div>
              <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-[0.15em] text-muted">
                Certifications
              </h4>
              <div className="space-y-3">
                {certifications.map((c, i) => (
                  <Reveal key={c.title} index={i} direction="right" distance={16} staggerStep={0.08}>
                    <div className="glass flex items-center gap-3 rounded-xl p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:ring-1 hover:ring-primary/30">
                      <c.icon size={20} className="shrink-0 text-primary" />
                      <span className="text-sm">{c.title}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-[0.15em] text-muted">
                Highlights
              </h4>
              <div className="space-y-3">
                {achievements.map((a, i) => (
                  <Reveal key={a.text} index={i} direction="right" distance={16} staggerStep={0.08}>
                    <div className="group flex items-start gap-3 text-sm text-muted transition-colors duration-200 hover:text-white">
                      <a.icon size={18} className="mt-0.5 shrink-0 text-primary transition-transform duration-200 group-hover:scale-110" />
                      <span>{a.text}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
