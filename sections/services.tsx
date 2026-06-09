"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/content";
import { SectionHeading } from "@/components/ui/section-heading";

export function Services() {
  const go = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="services" className="relative py-28 sm:py-36">
      <div className="container">
        <SectionHeading
          eyebrow="Services"
          title={
            <>
              Done-for-you <span className="text-gradient">marketing</span> that
              pays for itself
            </>
          }
          subtitle="Pick a single service or a full growth engine. Either way, you get senior-level execution and reporting you can actually read."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.button
              key={s.title}
              onClick={go}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="group relative overflow-hidden rounded-2xl border border-line bg-card/80 p-6 text-left backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1.5"
            >
              {/* glow border on hover */}
              <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-primary/40 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative flex items-start justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-xl border border-line bg-white/[0.03] text-primary transition-colors group-hover:border-primary/40">
                  <s.icon size={22} />
                </span>
                <ArrowUpRight
                  size={20}
                  className="text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                />
              </div>

              <h3 className="relative mt-5 font-display text-lg font-semibold">
                {s.title}
              </h3>
              <p className="relative mt-2 text-sm leading-relaxed text-muted">
                {s.desc}
              </p>
              <span className="relative mt-4 inline-flex text-sm font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Start a project →
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
