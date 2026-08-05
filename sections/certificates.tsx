"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";
import { ZoomIn } from "lucide-react";
import { certificates, type Certificate } from "@/data/content";
import { SectionHeading } from "@/components/ui/section-heading";

const CertificateLightbox = dynamic(
  () => import("@/components/shared/certificate-lightbox").then(m => m.CertificateLightbox),
  { ssr: false }
);

export function Certificates() {
  const [active, setActive] = useState<Certificate | null>(null);
  const [lightboxLoaded, setLightboxLoaded] = useState(false);

  const openCert = (cert: Certificate) => {
    setLightboxLoaded(true);
    setActive(cert);
  };

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

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:gap-6">
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
                  <button
                    type="button"
                    onClick={() => openCert(cert)}
                    aria-label={`View ${cert.name} certificate full size`}
                    className="group/img relative aspect-[4/3] w-full cursor-zoom-in overflow-hidden bg-white"
                  >
                    <Image
                      src={cert.image}
                      alt={cert.name}
                      fill
                      sizes="(max-width:640px) 50vw, 33vw"
                      className="object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    {/* shimmer overlay on hover */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    {/* zoom affordance */}
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover/img:bg-black/20 group-hover/img:opacity-100">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-white/90 text-black shadow-lg">
                        <ZoomIn size={16} />
                      </span>
                    </div>
                  </button>

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

      {lightboxLoaded && (
        <CertificateLightbox active={active} onClose={() => setActive(null)} />
      )}
    </section>
  );
}
