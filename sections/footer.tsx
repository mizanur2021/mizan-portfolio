"use client";

import Image from "next/image";
import { FaYoutube, FaLinkedinIn, FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { site } from "@/lib/site";
import { navLinks } from "@/data/content";

export function Footer() {
  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const socials = [
    { Icon: FaYoutube, href:"https://www.youtube.com/@mizansherpur", label: "YouTube" },
    { Icon: FaLinkedinIn, href: "https://www.linkedin.com/in/dmmizanur05", label: "LinkedIn" },
    { Icon: FaFacebookF, href:"https://www.facebook.com/dmmizanur05", label: "Facebook" },
    { Icon: FaInstagram, href: "https://www.instagram.com/dmmizanur05", label: "Instagram" },
    { Icon: FaXTwitter, href: "https://www.x.com/dmmizanur05", label: "X" },
  ];

  return (
    <footer className="relative border-t border-line py-14">
      <div className="hairline absolute inset-x-0 top-0" />
      <div className="container flex flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <button
            onClick={() => go("home")}
            className="flex items-center gap-2 font-display text-lg font-bold"
          >
            <span className="grid h-8 w-8 place-items-center overflow-hidden rounded-full bg-primary">
              <Image src="/logo.png" alt="Mizanur Logo" width={32} height={32} className="object-cover" />
            </span>
            {site.name}
          </button>
          <p className="mt-2 max-w-xs text-sm text-muted">
            Data-driven digital marketing for creators and brands.
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          {navLinks.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="text-sm text-muted transition-colors hover:text-primary"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex gap-3">
          {socials.map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-primary/40 hover:text-primary"
            >
              <Icon size={15} />
            </a>
          ))}
        </div>
      </div>

      <p className="container mt-10 text-center text-xs text-muted">
        © {new Date().getFullYear()} {site.name}. All rights reserved. 
      </p>
    </footer>
  );
}
