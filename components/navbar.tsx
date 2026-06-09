"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/data/content";
import { useActiveSection } from "@/hooks/use-active-section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const active = useActiveSection(navLinks.map((l) => l.id));
  const [open, setOpen] = useState(false);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav className="glass mx-auto flex max-w-5xl items-center justify-between rounded-full px-3 py-2.5 shadow-cinematic">
        <button
          onClick={() => go("home")}
          className="flex items-center gap-2 pl-2 font-display text-sm font-bold tracking-tight"
        >
          <span className="grid h-7 w-7 place-items-center overflow-hidden rounded-full bg-primary">
            <Image src="/logo.png" alt="Mizanur Logo" width={28} height={28} className="object-cover" />
          </span>
          <span className="hidden sm:block">Mizanur</span>
        </button>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => go(l.id)}
                className={cn(
                  "relative rounded-full px-3.5 py-1.5 text-sm transition-colors",
                  active === l.id ? "text-white" : "text-muted hover:text-white"
                )}
              >
                {active === l.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-white/[0.06] ring-1 ring-primary/30"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Button size="sm" magnetic onClick={() => go("contact")} className="hidden sm:inline-flex">
            Hire Me
          </Button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="grid h-10 w-10 place-items-center rounded-full text-white md:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass mx-auto mt-2 max-w-5xl space-y-1 rounded-2xl p-3 md:hidden"
          >
            {navLinks.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => go(l.id)}
                  className="w-full rounded-xl px-4 py-3 text-left text-sm text-muted hover:bg-white/5 hover:text-white"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
