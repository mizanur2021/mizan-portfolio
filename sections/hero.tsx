"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { roles, tools } from "@/data/content";
import { Button } from "@/components/ui/button";
import { Particles } from "@/components/shared/particles";
import { GridBackground } from "@/components/shared/grid-bg";
import { useTyping } from "@/hooks/use-typing";

/** Mobile-only: tool icons orbiting the circular profile photo. */
const ORBIT_RADIUS = 92;
const ORBIT_DURATION = 26;

function OrbitingTools({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.div
      className="absolute inset-0"
      animate={reduceMotion ? undefined : { rotate: 360 }}
      transition={{ duration: ORBIT_DURATION, repeat: Infinity, ease: "linear" }}
    >
      {tools.map((tool, i) => {
        const angle = (i / tools.length) * 360;
        return (
          <div
            key={tool.name}
            className="absolute left-1/2 top-1/2 h-0 w-0"
            style={{ transform: `rotate(${angle}deg) translate(${ORBIT_RADIUS}px)` }}
          >
            {/* static centering offset — kept on a plain div so it can't be
                clobbered by framer-motion's own transform management below */}
            <div className="-translate-x-1/2 -translate-y-1/2">
              <motion.div
                initial={{ rotate: -angle }}
                animate={reduceMotion ? undefined : { rotate: -angle - 360 }}
                transition={{ duration: ORBIT_DURATION, repeat: Infinity, ease: "linear" }}
                className="glass grid h-9 w-9 place-items-center rounded-full shadow-glow"
              >
                {tool.icon ? (
                  <tool.icon size={15} style={{ color: tool.color }} />
                ) : (
                  <span
                    className="grid h-4 w-4 place-items-center rounded text-[8px] font-bold"
                    style={{ background: `${tool.color}22`, color: tool.color }}
                  >
                    {tool.mark?.[0]}
                  </span>
                )}
              </motion.div>
            </div>
          </div>
        );
      })}
    </motion.div>
  );
}

export function Hero() {
  const typed = useTyping(roles);
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 70]);

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const item = {
    // No opacity:0 in the hidden state — the H1 here is the LCP element,
    // and Lighthouse/CrUX can't count transparent text as "painted", which
    // was inflating LCP by ~2s (measured via lcp-breakdown-insight). The
    // slide-up alone still reads as a clean entrance.
    hidden: { y: 24 },
    show: { y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-screen flex-col overflow-hidden pt-20 sm:pt-24 lg:flex-row lg:items-center lg:pt-28"
    >
      <GridBackground />
      <Particles count={70} />

      <div className="container relative z-10 flex flex-col gap-6 py-6 sm:gap-8 sm:py-8 lg:grid lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-12 lg:py-16">

        {/* Profile photo — circular with orbiting tool icons on mobile, unchanged rounded-square on tablet/desktop */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ y: photoY }}
          className="relative mx-auto hidden w-full sm:block sm:max-w-[240px] lg:order-2 lg:max-w-sm"
        >
          <div className="absolute inset-0 -z-10 animate-spin-slow rounded-[2.5rem] bg-gradient-to-tr from-primary/40 via-transparent to-secondary/40 blur-2xl" />
          <div className="glass overflow-hidden rounded-[2rem] p-2 shadow-cinematic">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
              <Image
                src="/profile-image.jpg"
                alt="Md Mizanur Rahman"
                fill
                priority
                sizes="(max-width: 1024px) 240px, 380px"
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

        {/* Mobile-only: circular photo with tool icons orbiting around it */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ y: photoY }}
          className="mx-auto flex flex-col items-center sm:hidden"
        >
          <div className="relative h-[236px] w-[236px]">
            <OrbitingTools reduceMotion={Boolean(reduceMotion)} />

            <div className="absolute left-1/2 top-1/2 h-[134px] w-[134px] -translate-x-1/2 -translate-y-1/2">
              <div className="absolute inset-0 -z-10 animate-spin-slow rounded-full bg-gradient-to-tr from-primary/40 via-transparent to-secondary/40 blur-2xl" />
              <div className="glass h-full w-full overflow-hidden rounded-full p-1 shadow-cinematic">
                <div className="relative h-full w-full overflow-hidden rounded-full">
                  <Image
                    src="/profile-image.jpg"
                    alt="Md Mizanur Rahman"
                    fill
                    priority
                    sizes="134px"
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/40 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </div>

          {/* caption sits below the orbit — kept out of it entirely so a
              rotating icon can never pass behind/through it. The orbit's
              own sweep reaches to within ~8px of the container's bottom
              edge, so this needs real positive clearance, not just the
              natural flex gap. */}
          <div className="glass mt-5 whitespace-nowrap rounded-full px-3.5 py-1.5 shadow-glow">
            <p className="flex items-baseline gap-1.5">
              <span className="font-display text-sm font-bold text-primary">1000+</span>
              <span className="text-[10px] text-muted">videos ranked #1</span>
            </p>
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
            <span className="text-gradient glow-text">
              Social Media Manager & Digital Marketer
            </span>{" "}
            helping brands & creators grow
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
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted transition-colors duration-200 hover:text-primary sm:bottom-8"
      >
        Scroll
        <ArrowDown size={16} className="animate-bounce text-primary" />
      </motion.button>
    </section>
  );
}
