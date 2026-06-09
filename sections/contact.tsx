"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Mail, Send, Loader2 } from "lucide-react";
import { FaWhatsapp, FaYoutube, FaLinkedinIn, FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { site } from "@/lib/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Field = "name" | "email" | "message";

function FloatingInput({
  id,
  label,
  type = "text",
  textarea,
  value,
  onChange,
  error,
}: {
  id: Field;
  label: string;
  type?: string;
  textarea?: boolean;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  const shared =
    "peer w-full rounded-xl border border-line bg-white/[0.02] px-4 pb-2.5 pt-6 text-sm text-white outline-none transition-colors focus:border-primary/60";
  return (
    <div className="relative">
      {textarea ? (
        <textarea
          id={id}
          rows={4}
          placeholder=" "
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(shared, "resize-none")}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder=" "
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={shared}
        />
      )}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-4 text-sm text-muted transition-all peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs"
      >
        {label}
      </label>
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const set = (k: Field) => (v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = () => {
    const e: Partial<Record<Field, string>> = {};
    if (form.name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address.";
    if (form.message.trim().length < 10)
      e.message = "Tell me a little more (10+ characters).";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    try {
      const res = await fetch("https://formsubmit.co/ajax/mm.mizanur2020@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `Portfolio inquiry from ${form.name}`,
          _captcha: "false",
        }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("done");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3500);
    } catch {
      setStatus("idle");
    }
  };

  const socials = [
    { Icon: FaYoutube, href:"https://www.youtube.com/@mizansherpur", label: "YouTube" },
    { Icon: FaLinkedinIn, href: "https://www.linkedin.com/in/dmmizanur05", label: "LinkedIn" },
    { Icon: FaFacebookF, href:"https://www.facebook.com/dmmizanur05", label: "Facebook" },
    { Icon: FaInstagram, href: "https://www.instagram.com/dmmizanur05", label: "Instagram" },
    { Icon: FaXTwitter, href: "https://www.x.com/dmmizanur05", label: "X" },
  ];

  return (
    <section id="contact" className="relative py-16 sm:py-24 lg:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Let's talk"
          title={
            <>
              Ready to <span className="text-gradient">grow</span>?
            </>
          }
          subtitle="Tell me about your project and I'll get back to you within 24 hours."
        />

        <div className="mx-auto mt-14 grid max-w-4xl gap-6 lg:grid-cols-[1fr_0.8fr]">
          {/* Form */}
          <form onSubmit={submit} className="glass space-y-4 rounded-2xl p-6 sm:p-8">
            <FloatingInput id="name" label="Your name" value={form.name} onChange={set("name")} error={errors.name} />
            <FloatingInput id="email" label="Email address" type="email" value={form.email} onChange={set("email")} error={errors.email} />
            <FloatingInput id="message" label="Project details" textarea value={form.message} onChange={set("message")} error={errors.message} />

            <Button type="submit" className="w-full" disabled={status !== "idle"}>
              <AnimatePresence mode="wait" initial={false}>
                {status === "idle" && (
                  <motion.span key="i" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                    Send message <Send size={16} />
                  </motion.span>
                )}
                {status === "sending" && (
                  <motion.span key="s" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                    Sending <Loader2 size={16} className="animate-spin" />
                  </motion.span>
                )}
                {status === "done" && (
                  <motion.span key="d" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                    Message sent <Check size={16} />
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </form>

          {/* Direct CTAs */}
          <div className="flex flex-col gap-4">
            <a
              href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="glass group flex items-center gap-4 rounded-2xl p-5 transition-colors hover:border-primary/40"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#25D366]/15 text-[#25D366]">
                <FaWhatsapp size={22} />
              </span>
              <div>
                <p className="font-display font-semibold">WhatsApp</p>
                <p className="text-sm text-muted">Fastest reply — chat now</p>
              </div>
            </a>

            <a
              href={`mailto:${site.email}`}
              className="glass group flex items-center gap-4 rounded-2xl p-5 transition-colors hover:border-primary/40"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/15 text-primary">
                <Mail size={22} />
              </span>
              <div>
                <p className="font-display font-semibold">Email</p>
                <p className="text-sm text-muted">{site.email}</p>
              </div>
            </a>

            <div className="glass flex items-center gap-3 rounded-2xl p-5">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
