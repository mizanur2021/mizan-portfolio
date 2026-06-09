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
      className="relative flex min-h-screen flex-col overflow-hidden pt-20 sm:pt-24 lg:flex-row lg:items-center lg:pt-28"
    >
      <GridBackground />
      <Particles count={70} />

      <div className="container relative z-10 flex flex-col gap-6 py-6 sm:gap-8 sm:py-8 lg:grid lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-12 lg:py-16">

        {/* Profile photo — top on mobile, right on desktop */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[180px] sm:max-w-[240px] lg:order-2 lg:max-w-sm"
        >
          <div className="absolute inset-0 -z-10 animate-spin-slow rounded-[2.5rem] bg-gradient-to-tr from-primary/40 via-transparent to-secondary/40 blur-2xl" />
          <div className="glass overflow-hidden rounded-[1.5rem] p-1.5 shadow-cinematic sm:rounded-[2rem] sm:p-2">
            <div className="relative aspect-square overflow-hidden rounded-[1rem] sm:aspect-[4/5] sm:rounded-[1.5rem]">
              <Image
                src="/profile-image.jpg"
                alt="Md Mizanur Rahman"
                fill
                priority
                sizes="(max-width: 640px) 180px, (max-width: 1024px) 240px, 380px"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
            </div>
          </div>
          <div className="glass absolute -bottom-3 -left-3 rounded-xl px-3 py-2 shadow-glow sm:-bottom-5 sm:-left-5 sm:rounded-2xl sm:px-4 sm:py-3">
            <p className="font-display text-base font-bold text-primary sm:text-2xl">1000+</p>
            <p className="text-[10px] text-muted sm:text-xs">Videos ranked #1</p>
          </div>
        </motion.div>

        {/* Text content — below photo on mobile, left on desktop */}
        <motion.div variants={container} initial="hidden" animate="show" className="lg:order-1">
          <motion.div variants={item} className="eyebrow mb-4 sm:mb-6">
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
            className="mt-4 flex h-7 items-center text-base font-medium text-muted sm:mt-6 sm:text-lg"
          >
            <span className="mr-2 text-primary">{"//"}</span>
            <span className="text-white">{typed}</span>
            <span className="ml-0.5 inline-block h-5 w-0.5 animate-pulse bg-primary" />
          </motion.p>

          <motion.div variants={item} className="mt-6 flex flex-wrap gap-3 sm:mt-9 sm:gap-4">
            <Button size="lg" magnetic onClick={() => go("contact")}>
              Hire Me
            </Button>
            <Button size="lg" variant="outline" magnetic onClick={() => go("work")}>
              View Portfolio
            </Button>
          </motion.div>
        </motion.div>

      </div>

      <motion.button
        onClick={() => go("about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted sm:bottom-8"
      >
        Scroll
        <ArrowDown size={16} className="animate-bounce text-primary" />
      </motion.button>
    </section>
  );
}
