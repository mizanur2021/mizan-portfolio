"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { certificates } from "@/data/content";
import { SectionHeading } from "@/components/ui/section-heading";

export function Certificates() {
  return (
    <section id="certificates" className="relative py-16 sm:py-24 lg:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Credentials"
          title={
            <>
              Verified <span className="text-gradient">Certifications</span>
            </>
          }
          subtitle="Professionally trained and certified across digital marketing disciplines."
        />

        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.09 }}
            >
              {/* gradient-border card */}
              <div className="group relative rounded-2xl p-[1.5px] transition-all duration-500 bg-gradient-to-br from-primary/50 via-secondary/30 to-primary/20 shadow-md hover:shadow-xl hover:shadow-primary/20 hover:from-primary/90 hover:via-secondary/60 hover:to-primary/60">
                <div className="overflow-hidden rounded-[14px] bg-card">
                  {/* image — object-contain so the full certificate is visible */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-white">
                    <Image
                      src={cert.image}
                      alt={cert.name}
                      fill
                      sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
                      className="object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    {/* shimmer overlay on hover */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>

                  {/* label */}
                  <div className="border-t border-line px-3 py-3 text-center">
                    <p className="line-clamp-2 text-xs font-semibold leading-snug sm:text-sm">
                      {cert.name}
                    </p>
                    <p className="mt-1 text-[10px] text-muted sm:text-xs">{cert.issuer}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
