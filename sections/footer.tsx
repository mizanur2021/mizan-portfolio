"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, Map } from "lucide-react";
import { FaYoutube, FaLinkedinIn, FaFacebookF, FaInstagram, FaXTwitter, FaWhatsapp } from "react-icons/fa6";
import { site } from "@/lib/site";
import { navLinks } from "@/data/content";

export function Footer() {
  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const socials = [
    { Icon: FaYoutube, href: site.socials.youtube, label: "YouTube", color: "hover:text-red-500 hover:border-red-500/40" },
    { Icon: FaLinkedinIn, href: site.socials.linkedin, label: "LinkedIn", color: "hover:text-blue-400 hover:border-blue-400/40" },
    { Icon: FaFacebookF, href: site.socials.facebook, label: "Facebook", color: "hover:text-blue-500 hover:border-blue-500/40" },
    { Icon: FaInstagram, href: site.socials.instagram, label: "Instagram", color: "hover:text-pink-500 hover:border-pink-500/40" },
    { Icon: FaXTwitter, href: site.socials.x, label: "X", color: "hover:text-white hover:border-white/40" },
  ];

  const contactItems = [
    { Icon: Mail, text: site.email, href: `mailto:${site.email}` },
    { Icon: Phone, text: site.whatsapp, href: `https://wa.me/${site.whatsapp.replace(/\D/g, "")}` },
    { Icon: MapPin, text: site.location, href: null },
    { Icon: Map, text: "Find me on Google Maps", href: site.googleMaps },
  ];

  return (
    <footer className="relative border-t border-line">
      <div className="hairline absolute inset-x-0 top-0" />

      {/* ── main footer body ── */}
      <div className="container py-12 sm:py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr]">

          {/* ── Brand column ── */}
          <div className="flex flex-col items-center text-center sm:col-span-2 sm:items-start sm:text-left lg:col-span-1">
            <button
              onClick={() => go("home")}
              className="flex items-center gap-2.5 font-display text-lg font-bold transition-opacity hover:opacity-80"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full bg-primary shadow-glow">
                <Image src="/logo.png" alt="Mizan logo" width={40} height={40} className="object-cover" />
              </span>
              {site.name}
            </button>
            <p className="mt-3 max-w-[22rem] text-sm leading-relaxed text-muted sm:max-w-xs">
              {site.description}
            </p>

            {/* Social icons */}
            <div className="mt-6 flex gap-2.5">
              {socials.map(({ Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-all duration-200 ${color}`}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted">
              Quick Links
            </h3>
            <div className="grid grid-cols-3 gap-x-5 gap-y-3 sm:gap-x-8 sm:gap-y-3.5">
              {navLinks.map((l) => (
                <button
                  key={l.id}
                  onClick={() => go(l.id)}
                  className="text-left text-sm text-muted transition-colors hover:text-primary active:text-primary"
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── Contact Info ── */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted">
              Get In Touch
            </h3>
            <ul className="flex flex-col gap-4">
              {contactItems.map(({ Icon, text, href }) => (
                <li key={text} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Icon size={14} />
                  </span>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="break-all text-sm text-muted transition-colors hover:text-primary"
                    >
                      {text}
                    </a>
                  ) : (
                    <span className="text-sm text-muted">{text}</span>
                  )}
                </li>
              ))}
            </ul>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Hi Mizan! I visited your portfolio and I'm interested in your services.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center gap-2 rounded-full bg-[#25D366]/10 px-4 py-2 text-sm font-medium text-[#25D366] ring-1 ring-[#25D366]/30 transition-all hover:bg-[#25D366]/20"
            >
              <FaWhatsapp size={15} />
              Fastest reply — chat now
            </a>
          </div>

        </div>
      </div>

      {/* ── bottom bar ── */}
      <div className="border-t border-line/60">
        <div className="container flex flex-col items-center justify-between gap-3 py-5 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="transition-colors hover:text-primary">Privacy Policy</Link>
            <Link href="/terms" className="transition-colors hover:text-primary">Terms of Use</Link>
            <span className="text-muted/60">Designed &amp; built with ❤️ in Bangladesh</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
