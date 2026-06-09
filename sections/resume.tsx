"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { timeline, certifications, achievements } from "@/data/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";

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
              <motion.div
                key={t.role}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1 }}
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
              </motion.div>
            ))}
          </div>

          {/* Side: certs + achievements */}
          <div className="space-y-8">
            <div>
              <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-[0.15em] text-muted">
                Certifications
              </h4>
              <div className="space-y-3">
                {certifications.map((c) => (
                  <div
                    key={c.title}
                    className="glass flex items-center gap-3 rounded-xl p-3.5"
                  >
                    <c.icon size={20} className="shrink-0 text-primary" />
                    <span className="text-sm">{c.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-[0.15em] text-muted">
                Highlights
              </h4>
              <div className="space-y-3">
                {achievements.map((a) => (
                  <div
                    key={a.text}
                    className="flex items-start gap-3 text-sm text-muted"
                  >
                    <a.icon size={18} className="mt-0.5 shrink-0 text-primary" />
                    <span>{a.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
