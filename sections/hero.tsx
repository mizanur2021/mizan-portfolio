"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { roles } from "@/data/content";
import { Button } from "@/components/ui/button";
import { Particles } from "@/components/shared/particles";
import { GridBackground } from "@/components/shared/grid-bg";
import { useTyping } from "@/hooks/use-typing";

export function Hero() {
  const typed = useTyping(roles);

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-24 sm:pt-28"
    >
      <GridBackground />
      <Particles count={70} />

      <div className="container relative z-10 grid items-center gap-8 py-10 sm:gap-12 sm:py-16 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item} className="eyebrow mb-6">
            <Sparkles size={13} className="text-primary" />
            Available for new projects
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display text-3xl font-bold leading-[1.08] tracking-tightest sm:text-5xl lg:text-[4.25rem]"
          >
            Helping brands & creators grow through{" "}
            <span className="text-gradient glow-text">data-driven</span> digital
            marketing
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 flex h-7 items-center text-lg font-medium text-muted"
          >
            <span className="mr-2 text-primary">{"//"}</span>
            <span className="text-white">{typed}</span>
            <span className="ml-0.5 inline-block h-5 w-0.5 animate-pulse bg-primary" />
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-4">
            <Button size="lg" magnetic onClick={() => go("contact")}>
              Hire Me
            </Button>
            <Button size="lg" variant="outline" magnetic onClick={() => go("work")}>
              View Portfolio
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[260px] sm:max-w-sm"
        >
          <div className="absolute inset-0 -z-10 animate-spin-slow rounded-[2.5rem] bg-gradient-to-tr from-primary/40 via-transparent to-secondary/40 blur-2xl" />
          <div className="glass overflow-hidden rounded-[2rem] p-2 shadow-cinematic">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
              <Image
                src="/profile%20image.jpg"
                alt="Md Mizanur Rahman"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 380px"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
            </div>
          </div>
          <div className="glass absolute -bottom-5 -left-5 rounded-2xl px-4 py-3 shadow-glow">
            <p className="font-display text-2xl font-bold text-primary">1000+</p>
            <p className="text-xs text-muted">Videos ranked #1</p>
          </div>
        </motion.div>
      </div>

      <motion.button
        onClick={() => go("about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted"
      >
        Scroll
        <ArrowDown size={16} className="animate-bounce text-primary" />
      </motion.button>
    </section>
  );
}
