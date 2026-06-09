"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { site } from "@/lib/site";

export function WhatsAppPopup() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  /* delay showing the button so it doesn't pop up instantly on load */
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2500);
    return () => clearTimeout(t);
  }, []);

  const waNumber = site.whatsapp.replace(/\D/g, "");
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    "Hi Mizan! I visited your portfolio and I'm interested in your services."
  )}`;

  return (
    <div className="fixed bottom-6 right-4 z-[500] flex flex-col items-end gap-3 sm:right-6">

      {/* ── popup card ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="w-[272px] overflow-hidden rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.45)]"
          >
            {/* WhatsApp-style header */}
            <div className="flex items-center gap-3 bg-[#075E54] px-4 py-3.5">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/15">
                <FaWhatsapp size={20} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-semibold text-white">{site.name}</p>
                <p className="flex items-center gap-1.5 text-[11px] text-white/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#25D366]" />
                  Typically replies in minutes
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="grid h-7 w-7 place-items-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X size={14} />
              </button>
            </div>

            {/* Chat bubble */}
            <div className="bg-[#ECE5DD] px-4 pt-4 pb-3">
              <div className="relative ml-1 max-w-[232px]">
                {/* tail */}
                <div className="absolute -left-[7px] top-0 h-0 w-0 border-r-[8px] border-t-[8px] border-r-white border-t-transparent" />
                <div className="rounded-xl rounded-tl-none bg-white px-3.5 py-3 shadow-sm">
                  <p className="text-[13px] leading-relaxed text-[#303030]">
                    👋 Hi! Looking to grow your YouTube channel, run ads, or manage social media? I can help!
                  </p>
                  <p className="mt-1 text-right text-[10px] text-[#8696a0]">now</p>
                </div>
              </div>
            </div>

            {/* CTA button */}
            <div className="bg-[#ECE5DD] px-4 pb-4">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-2.5 text-sm font-semibold text-white shadow-md transition-opacity hover:opacity-90 active:scale-95"
              >
                <FaWhatsapp size={17} />
                Start Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── floating button ── */}
      <AnimatePresence>
        {visible && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.93 }}
            onClick={() => setOpen((o) => !o)}
            aria-label="Chat on WhatsApp"
            className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_4px_22px_rgba(37,211,102,0.55)]"
          >
            {/* pulse ring — only when closed */}
            {!open && (
              <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/50" />
            )}

            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={22} />
                </motion.span>
              ) : (
                <motion.span
                  key="wa"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <FaWhatsapp size={26} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
