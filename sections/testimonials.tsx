"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { testimonials } from "@/data/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { Marquee } from "@/components/shared/marquee";

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < n ? "fill-primary text-primary" : "text-white/15"}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="relative overflow-hidden py-28 sm:py-36">
      <div className="container">
        <SectionHeading
          eyebrow="Client words"
          title={
            <>
              Trusted by <span className="text-gradient">creators & brands</span>
            </>
          }
          subtitle="A few words from the people I've helped grow."
        />
      </div>

      <div className="relative mt-14">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent" />

        <Marquee>
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="glass flex w-[340px] shrink-0 flex-col gap-4 rounded-2xl p-6"
            >
              <Stars n={t.rating} />
              <blockquote className="text-sm leading-relaxed text-white/90">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={42}
                  height={42}
                  className="rounded-full ring-1 ring-primary/30"
                />
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted">{t.title}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
