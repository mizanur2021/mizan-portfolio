import {
  type IconType,
} from "react-icons";
import {
  SiYoutube,
  SiMeta,
  SiGoogleads,
  SiShopify,
  SiCanva,
  SiOpenai,
  SiGoogle,
} from "react-icons/si";
import { Search, BarChart3, Megaphone, Sparkles, Award, GraduationCap, BookOpen } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */
export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "testimonials", label: "Clients" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
] as const;

export const roles = [
  "YouTube SEO Specialist",
  "Facebook Ads Specialist",
  "Shopify Store Manager",
  "Social Media Marketer",
  "Google Ads Specialist",
  "Content Strategist",
] as const;

/* ------------------------------------------------------------------ */
/* Stats                                                               */
/* ------------------------------------------------------------------ */
export const stats = [
  { value: 5, suffix: "+", label: "Years of experience" },
  { value: 1000, suffix: "+", label: "Videos ranked #1" },
  { value: 200, suffix: "+", label: "Creators helped" },
  { value: 50, suffix: "+", label: "5-star reviews" },
] as const;

/* ------------------------------------------------------------------ */
/* Skills (with proficiency)                                           */
/* ------------------------------------------------------------------ */
export const skills = [
  { name: "YouTube SEO", level: 96, blurb: "Titles, tags, thumbnails & retention." },
  { name: "Meta Ads", level: 92, blurb: "Full-funnel ROAS campaigns." },
  { name: "Google Ads", level: 90, blurb: "Search, PMax & YouTube ads." },
  { name: "Shopify Design", level: 88, blurb: "High-converting storefronts." },
  { name: "Video Optimization", level: 94, blurb: "CTR & watch-time engineering." },
  { name: "Keyword Research", level: 95, blurb: "Intent-mapped opportunity finding." },
  { name: "Social Media Marketing", level: 91, blurb: "Organic growth systems." },
  { name: "Canva Design", level: 89, blurb: "Scroll-stopping creative." },
] as const;

/* ------------------------------------------------------------------ */
/* Tool stack — brand icons via react-icons where available            */
/* ------------------------------------------------------------------ */
export type Tool = { name: string; icon?: IconType; mark?: string; color: string };

export const tools: Tool[] = [
  { name: "VidIQ", mark: "vidIQ", color: "#F5476A" },
  { name: "TubeBuddy", mark: "TB", color: "#5DA5E8" },
  { name: "ChatGPT", icon: SiOpenai, color: "#10A37F" },
  { name: "Canva", icon: SiCanva, color: "#00C4CC" },
  { name: "Shopify", icon: SiShopify, color: "#95BF47" },
  { name: "Google Ads", icon: SiGoogleads, color: "#4285F4" },
  { name: "KeywordTool.io", mark: "KW", color: "#00FF88" },
  { name: "YouTube", icon: SiYoutube, color: "#FF0000" },
];

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */
export type Service = {
  title: string;
  icon: IconType;
  desc: string;
};

export const services: Service[] = [
  {
    title: "YouTube SEO Optimization",
    icon: SiYoutube,
    desc: "Rank videos higher with keyword-mapped titles, descriptions, tags, and retention-first structure.",
  },
  {
    title: "YouTube Monetization",
    icon: SiYoutube,
    desc: "Hit eligibility faster and grow RPM with a content + watch-time strategy built to last.",
  },
  {
    title: "Shopify Store Design",
    icon: SiShopify,
    desc: "Conversion-focused storefronts — fast, clean, and built to turn browsers into buyers.",
  },
  {
    title: "Facebook Ads Management",
    icon: SiMeta,
    desc: "Full-funnel Meta campaigns engineered for predictable, profitable ROAS.",
  },
  {
    title: "Google Ads Campaign Setup",
    icon: SiGoogle,
    desc: "Search, Performance Max & YouTube ads structured around buyer intent.",
  },
  {
    title: "Social Media Marketing",
    icon: Megaphone,
    desc: "Organic growth systems that compound followers, reach, and brand authority.",
  },
  {
    title: "Video SEO Audit",
    icon: Search,
    desc: "A deep teardown of your channel with a prioritized roadmap to more views.",
  },
];

/* ------------------------------------------------------------------ */
/* Portfolio projects                                                  */
/* ------------------------------------------------------------------ */
export type Project = {
  id: string;
  title: string;
  category: "YouTube SEO" | "Meta Ads" | "Google Ads" | "Shopify";
  cover: string;
  description: string;
  result: string;
  tags: string[];
  metrics: { label: string; before: string; after: string }[];
};

export const categories = ["All", "YouTube SEO", "Meta Ads", "Google Ads", "Shopify"] as const;

export const projects: Project[] = [
  {
    id: "tech-channel",
    title: "Tech Review Channel Scale-Up",
    category: "YouTube SEO",
    cover:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80",
    description:
      "Rebuilt the channel's metadata system and packaging to break a long views plateau.",
    result: "4.2x channel views in 90 days",
    tags: ["YouTube SEO", "Thumbnails", "Retention"],
    metrics: [
      { label: "Monthly views", before: "120K", after: "510K" },
      { label: "Avg. CTR", before: "3.1%", after: "8.4%" },
      { label: "Subscribers", before: "18K", after: "61K" },
    ],
  },
  {
    id: "dtc-skincare",
    title: "DTC Skincare — Meta Scaling",
    category: "Meta Ads",
    cover:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80",
    description:
      "Restructured the ad account into a clean full-funnel and scaled spend profitably.",
    result: "3.8x ROAS at 5x spend",
    tags: ["Meta Ads", "Creative Testing", "Funnel"],
    metrics: [
      { label: "ROAS", before: "1.6x", after: "3.8x" },
      { label: "CPA", before: "$41", after: "$17" },
      { label: "Monthly revenue", before: "$22K", after: "$96K" },
    ],
  },
  {
    id: "saas-search",
    title: "B2B SaaS — Google Search",
    category: "Google Ads",
    cover:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    description:
      "Intent-mapped search campaigns with tightened match types and landing alignment.",
    result: "-58% cost per lead",
    tags: ["Google Ads", "Search", "Conversion"],
    metrics: [
      { label: "Cost / lead", before: "$88", after: "$37" },
      { label: "Conv. rate", before: "2.4%", after: "6.1%" },
      { label: "Qualified leads", before: "31/mo", after: "112/mo" },
    ],
  },
  {
    id: "fashion-shopify",
    title: "Fashion Brand Storefront",
    category: "Shopify",
    cover:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
    description:
      "Redesigned the store with a faster theme, sharper PDP, and a streamlined checkout.",
    result: "+71% conversion rate",
    tags: ["Shopify", "CRO", "UX"],
    metrics: [
      { label: "Conversion rate", before: "1.3%", after: "2.2%" },
      { label: "Page load", before: "4.1s", after: "1.4s" },
      { label: "AOV", before: "$54", after: "$73" },
    ],
  },
  {
    id: "gaming-channel",
    title: "Gaming Channel Revival",
    category: "YouTube SEO",
    cover:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
    description:
      "Reverse-engineered top competitors and rebuilt the upload + packaging cadence.",
    result: "0 → 100K subs in 7 months",
    tags: ["YouTube SEO", "Packaging", "Strategy"],
    metrics: [
      { label: "Subscribers", before: "2.1K", after: "104K" },
      { label: "Watch time", before: "1.2K hrs", after: "39K hrs" },
      { label: "Avg. views", before: "800", after: "47K" },
    ],
  },
  {
    id: "home-decor",
    title: "Home Decor — Meta + Shopify",
    category: "Meta Ads",
    cover:
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80",
    description:
      "Paired creative-led Meta acquisition with a CRO'd Shopify funnel for compounding returns.",
    result: "$0 → $140K in 6 months",
    tags: ["Meta Ads", "Shopify", "Scaling"],
    metrics: [
      { label: "Monthly revenue", before: "$0", after: "$140K" },
      { label: "ROAS", before: "—", after: "4.1x" },
      { label: "Repeat rate", before: "—", after: "28%" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/* ------------------------------------------------------------------ */
export type Testimonial = {
  name: string;
  title: string;
  avatar: string;
  rating: number;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Sarah Mitchell",
    title: "Founder, GlowLab",
    avatar: "https://i.pravatar.cc/120?img=47",
    rating: 5,
    quote:
      "Our Meta ROAS more than doubled in six weeks. Mizan treats your budget like his own.",
  },
  {
    name: "David Chen",
    title: "Creator, TechByte",
    avatar: "https://i.pravatar.cc/120?img=12",
    rating: 5,
    quote:
      "He broke a views plateau I'd been stuck on for a year. The SEO work is on another level.",
  },
  {
    name: "Aisha Rahman",
    title: "CMO, Northpeak",
    avatar: "https://i.pravatar.cc/120?img=32",
    rating: 5,
    quote:
      "Cost per lead dropped by more than half while volume tripled. Genuinely rare execution.",
  },
  {
    name: "Marco Rossi",
    title: "Owner, Casa Decor",
    avatar: "https://i.pravatar.cc/120?img=15",
    rating: 5,
    quote:
      "From zero to a six-figure store. Clear communication and results that speak for themselves.",
  },
  {
    name: "Emily Carter",
    title: "Director, BrightPath",
    avatar: "https://i.pravatar.cc/120?img=45",
    rating: 5,
    quote:
      "The most strategic marketer we've worked with. Every decision is backed by data.",
  },
];

/* ------------------------------------------------------------------ */
/* Resume / timeline                                                   */
/* ------------------------------------------------------------------ */
export const timeline = [
  {
    year: "09/2025 — Present",
    role: "Social Media Marketer",
    org: "Bear My Brand LLC · Remote",
    desc: "Developing campaign strategies and managing community engagement for a leading US graphic design & branding agency. Handling content calendars, target audience planning, and brand reputation.",
  },
  {
    year: "2025 — Present",
    role: "Shopify Store Manager",
    org: "Philly Fresh Tea Inc · Remote",
    desc: "Managing product catalogues, inventory tracking, and Shopify theme customisation for a US e-commerce business. Running integrated Email, Facebook, and Google Ads campaigns.",
  },
  {
    year: "2024 — Present",
    role: "Social Media Manager",
    org: "Kinion Auto Sales & Service · Remote",
    desc: "Grew Facebook engagement by 35% through targeted content and branded thumbnails. Maintained consistent brand visuals and community management for a US auto sales brand.",
  },
  {
    year: "03/2021 — Present",
    role: "Freelance Digital Marketing Specialist",
    org: "Self-employed · Remote",
    desc: "Ranked 1000+ videos on YouTube's first page and delivered thumbnail design for 200+ creators. Built WordPress sites for small business clients and leveraged ChatGPT for scripting and automation.",
  },
  {
    year: "01/2025 — 04/2025",
    role: "YouTube SEO Specialist",
    org: "The Chi Chat Show · Denmark (Remote)",
    desc: "Boosted channel watch time by 70% through keyword optimisation. Improved branding with custom logo, banner, and playlist setup for an online talk show.",
  },
  {
    year: "06/2024 — 03/2025",
    role: "Digital Marketing Executive",
    org: "ZaFa Premium Food · Bangladesh",
    desc: "Increased engagement by 40% through Facebook Ads and organic campaigns. Handled daily visual content design, captions, and audience response management.",
  },
  {
    year: "06/2024 — 02/2025",
    role: "Digital Marketer",
    org: "Nubira Collections · Bangladesh",
    desc: "Managed $5K+ monthly ad spend for international clients. Executed ad campaigns and content planning, achieving 30% follower growth for a Bangladesh retail brand.",
  },
] as const;

export const certifications = [
  { title: "Foundations of Digital Marketing & E-Commerce — Google", icon: Award },
  { title: "SEO Specialization — University of California, Davis (Coursera)", icon: GraduationCap },
  { title: "Social Media Marketing — Northwestern University (Coursera)", icon: GraduationCap },
  { title: "Advanced Social Media Marketing — Udemy", icon: BookOpen },
] as const;

export const achievements = [
  { icon: BarChart3, text: "Ranked 1000+ videos on YouTube's first page — 5K+ organic subscribers gained" },
  { icon: Sparkles, text: "Level 1 Fiverr Seller with 50+ five-star reviews and 80% repeat client rate" },
  { icon: Megaphone, text: "Remote clients served across the USA, Denmark, UAE, and Bangladesh" },
] as const;
