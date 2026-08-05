"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaYoutube, FaFacebookF, FaInstagram } from "react-icons/fa6";
import { SiGoogleads } from "react-icons/si";
import { TrendingUp } from "lucide-react";

const TOTAL_MS = 1600;
const EXIT_MS = 400;
const SEEN_KEY = "mizan-intro-seen";

const stats = [
  { Icon: FaYoutube,    color: "#FF0000", label: "YouTube Views",     end: 28400000, suffix: "" },
  { Icon: FaFacebookF,  color: "#1877F2", label: "Facebook Reach",    end: 6800000,  suffix: "" },
  { Icon: FaInstagram,  color: "#E1306C", label: "Instagram Reaches", end: 4200000,  suffix: "" },
  { Icon: SiGoogleads,  color: "#4285F4", label: "Google Impressions", end: 9100000, suffix: "" },
];

function useFastCount(end: number, startDelay: number, duration: number) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf: number;
    const t = setTimeout(() => {
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 2);
        setVal(Math.round(eased * end));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, startDelay);
    return () => { clearTimeout(t); cancelAnimationFrame(raf); };
  }, [end, startDelay, duration]);
  return val;
}

function fmt(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000)     return (n / 1_000).toFixed(0) + "K";
  return n.toString();
}

function StatCard({
  Icon, color, label, end, delay,
}: { Icon: React.ComponentType<{ size?: number; color?: string }>; color: string; label: string; end: number; delay: number }) {
  const val = useFastCount(end, delay, TOTAL_MS - delay - 250);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: delay / 1000, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="glass flex flex-col items-center gap-2 rounded-2xl px-5 py-4"
    >
      <Icon size={20} color={color} />
      <span
        className="font-display text-2xl font-bold tabular-nums sm:text-3xl"
        style={{ color }}
      >
        {fmt(val)}
      </span>
      <span className="text-center text-[10px] uppercase tracking-widest text-muted sm:text-xs">
        {label}
      </span>
      <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400">
        <TrendingUp size={10} /> Growing
      </span>
    </motion.div>
  );
}

export function Loader({ onDone }: { onDone: () => void }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const alreadySeen = sessionStorage.getItem(SEEN_KEY) === "1";
    sessionStorage.setItem(SEEN_KEY, "1");

    const t = setTimeout(() => {
      setExiting(true);
      setTimeout(onDone, EXIT_MS);
    }, alreadySeen ? 0 : TOTAL_MS);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: EXIT_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-bg"
        >
          {/* background radial glow */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
          </div>

          {/* Logo + name */}
          <motion.div
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mb-2 grid h-16 w-16 place-items-center overflow-hidden rounded-2xl bg-primary shadow-glow"
          >
            <Image src="/logo.png" alt="Mizan" width={64} height={64} className="object-cover" priority />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.35 }}
            className="font-display text-xl font-bold sm:text-2xl"
          >
            Freelancer Mizan
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.28 }}
            className="mt-1 text-sm text-muted"
          >
            Best Digital Marketer · Sherpur, Bangladesh
          </motion.p>

          {/* Social growth stats */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {stats.map((s, i) => (
              <StatCard key={s.label} {...s} delay={300 + i * 90} />
            ))}
          </div>

          {/* "Results generated" label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85 }}
            className="mt-6 text-xs text-muted"
          >
            Total reach generated for clients — and counting ↑
          </motion.p>

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-primary via-secondary to-primary"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: TOTAL_MS / 1000, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
