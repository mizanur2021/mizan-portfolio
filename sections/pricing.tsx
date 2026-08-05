"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import {
  FaFacebookF,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa6";
import {
  SiShopify,
  SiGoogleads,
} from "react-icons/si";
import { Users, Globe } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

type Plan = {
  id: string;
  icon: React.ReactNode;
  name: string;
  price: string;
  period: string;
  popular?: boolean;
  features: string[];
  color: string;
};

const plans: Plan[] = [
  {
    id: "social-media",
    icon: <Users size={22} />,
    name: "Complete Social Media Growth Manager",
    price: "৳20,000",
    period: "per month",
    popular: true,
    color: "from-violet-500/20 via-primary/10 to-transparent",
    features: [
      "Management of 3–4 platforms",
      "Daily content creation & posting",
      "20+ custom graphics/month",
      "Audience growth strategy",
      "Community management & engagement",
      "Competitor analysis",
      "Monthly analytics report",
    ],
  },
  {
    id: "youtube",
    icon: <FaYoutube size={22} />,
    name: "YouTube Channel SEO & Growth Manager",
    price: "৳15,000",
    period: "per month",
    color: "from-red-500/20 via-transparent to-transparent",
    features: [
      "Full channel audit & optimization",
      "Video SEO — titles, tags, descriptions",
      "Thumbnail design & A/B testing",
      "Content strategy & calendar",
      "In-depth keyword research",
      "Subscriber growth strategy",
      "Monthly performance report",
    ],
  },
  {
    id: "facebook-ads",
    icon: <FaFacebookF size={22} />,
    name: "Facebook Ads Management",
    price: "৳8,000",
    period: "per month",
    color: "from-blue-500/20 via-transparent to-transparent",
    features: [
      "Full campaign setup & management",
      "Audience targeting & retargeting",
      "Ad creative design",
      "A/B split testing",
      "Budget optimization",
      "Weekly performance report",
    ],
  },
  {
    id: "google-ads",
    icon: <SiGoogleads size={22} />,
    name: "Google Ads Management",
    price: "৳8,000",
    period: "per month",
    color: "from-yellow-500/20 via-transparent to-transparent",
    features: [
      "Search & Display campaign setup",
      "Keyword research & smart bidding",
      "Landing page recommendations",
      "Conversion tracking setup",
      "Budget & bid optimization",
      "Monthly ranking report",
    ],
  },
  {
    id: "website",
    icon: <Globe size={22} />,
    name: "Custom Website Development with AI",
    price: "৳30,000",
    period: "one-time",
    popular: true,
    color: "from-emerald-500/20 via-primary/10 to-transparent",
    features: [
      "Modern responsive design",
      "AI-powered content integration",
      "SEO-optimized structure",
      "Contact form & WhatsApp integration",
      "Fast loading & mobile-first",
      "Google Analytics & Search Console setup",
      "1 month free support",
    ],
  },
  {
    id: "shopify",
    icon: <SiShopify size={22} />,
    name: "Shopify Store Setup & Design",
    price: "৳25,000",
    period: "one-time",
    color: "from-green-500/20 via-transparent to-transparent",
    features: [
      "Professional theme customization",
      "Product catalogue setup",
      "Payment gateway integration",
      "Mobile-optimized storefront",
      "SEO-friendly product pages",
      "Social media & WhatsApp integration",
      "Training & full handover",
    ],
  },
];

export function Pricing() {
  const waUrl = `https://wa.me/${site.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
    "Hi Mizan! I'm interested in your services. Can you share pricing details?"
  )}`;

  return (
    <section id="pricing" className="relative py-16 sm:py-24 lg:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Service Pricing"
          title={
            <>
              Transparent pricing,{" "}
              <span className="text-gradient">real results</span>
            </>
          }
          subtitle="Pick the service that fits your goal. All plans include direct communication and clear monthly reporting. Contact me for custom packages."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-2xl border bg-card/80 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5",
                plan.popular
                  ? "border-primary/50 shadow-2xl shadow-primary/25 hover:shadow-primary/40"
                  : "border-line hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
              )}
            >
              {/* popular badge */}
              {plan.popular && (
                <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                  <Sparkles size={9} />
                  Most Popular
                </div>
              )}

              {/* colour glow top */}
              <div
                className={cn(
                  "pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b opacity-60",
                  plan.color
                )}
              />

              <div className="relative flex flex-1 flex-col p-6 sm:p-7">
                {/* icon */}
                <div
                  className={cn(
                    "grid h-12 w-12 place-items-center rounded-xl border text-primary transition-transform duration-300 group-hover:scale-110",
                    plan.popular
                      ? "border-primary/40 bg-primary/10"
                      : "border-line bg-white/[0.03] group-hover:border-primary/40"
                  )}
                >
                  {plan.icon}
                </div>

                {/* name */}
                <h3 className="mt-4 font-display text-lg font-bold leading-snug">
                  {plan.name}
                </h3>

                {/* price */}
                <div className="mt-4 rounded-xl bg-white/[0.04] px-4 py-3">
                  <p
                    className={cn(
                      "font-display text-3xl font-bold",
                      plan.popular ? "text-primary" : "text-white"
                    )}
                  >
                    {plan.price}
                  </p>
                  <p className="mt-0.5 text-xs text-muted">{plan.period}</p>
                </div>

                {/* divider */}
                <div className="my-5 h-px bg-line" />

                {/* features */}
                <ul className="flex flex-1 flex-col gap-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                        <Check size={10} strokeWidth={3} />
                      </span>
                      <span className="text-muted">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "mt-7 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition-all duration-200",
                    plan.popular
                      ? "bg-primary text-primary-foreground shadow-glow hover:opacity-90 active:scale-95"
                      : "border border-line text-muted hover:border-primary/50 hover:text-primary"
                  )}
                >
                  <FaWhatsapp size={15} />
                  Get Started
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-muted">
          Need a custom package?{" "}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary hover:underline"
          >
            Chat on WhatsApp
          </a>{" "}
          and I&apos;ll build one around your goals.
        </p>
      </div>
    </section>
  );
}
