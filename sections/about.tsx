"use client";

import { motion } from "framer-motion";
import { stats } from "@/data/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { Counter } from "@/components/shared/counter";
import { Reveal } from "@/components/ui/reveal";

export function About() {
  return (
    <section id="about" className="relative py-16 sm:py-24 lg:py-32">
      <div className="container">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeading
            align="left"
            eyebrow="About me"
            title={
              <>
                I turn attention into{" "}
                <span className="text-gradient">measurable growth</span>
              </>
            }
            subtitle="I'm Md Mizanur Rahman — a result-oriented Digital Marketing Specialist with 5+ years of proven experience in YouTube SEO, Facebook Ads, Shopify, and content strategy. Ranked 1000+ videos to YouTube's first page, helped 200+ creators grow, and achieved 4x–5x ROAS for e-commerce clients."
          />

          <div className="space-y-5">
            <Reveal>
              <p className="leading-relaxed text-muted">
                I started in YouTube SEO — reverse-engineering what makes videos
                rank and retain, ranking 1000+ videos to the first page and
                delivering channel strategy for 200+ creators worldwide. That
                obsession with measurable outcomes grew into a full
                performance-marketing practice spanning Facebook Ads, Google
                Ads, and conversion-focused Shopify storefronts.
              </p>
            </Reveal>
            <Reveal index={1}>
              <p className="leading-relaxed text-muted">
                Today I work remotely with clients in the USA, Denmark, UAE, and
                Bangladesh — executing strategy, managing ad spend, and
                delivering clear reporting across every channel I touch. Every
                decision is backed by data and built to move the numbers that
                matter.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="glass group relative overflow-hidden rounded-2xl p-6"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <p className="font-display text-4xl font-bold tracking-tightest text-white sm:text-5xl">
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm text-muted">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
