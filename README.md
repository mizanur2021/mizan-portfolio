# Md Mizanur Rahman — Portfolio

A world-class, dark-futuristic portfolio for a digital marketing specialist (YouTube SEO · Meta Ads · Google Ads · Shopify). Built to generate trust instantly and convert visitors into inquiries.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS · Framer Motion · GSAP · Lenis · Lucide · React Icons · Vercel.

---

## 1. The build team (how this was approached)

This was scoped as if delivered by a small studio, each role owning one slice:

| Agent | Owns |
| --- | --- |
| **Creative Director** | The single visual thesis: neon-on-near-black with one signature (animated profile halo + magnetic CTAs). Cuts anything that doesn't serve it. |
| **UX Designer** | Section order, scan-ability, the conversion path (Hero → proof → services → work → contact). |
| **Principal Engineer** | Component architecture, data-driven sections, type safety, client/server boundaries. |
| **Motion Designer** | The animation system: entrance choreography, scroll reveals, 60fps budget, reduced-motion fallbacks. |
| **SEO Architect** | Metadata API, OG/Twitter, JSON-LD, sitemap/robots/manifest, semantic headings. |
| **Conversion Optimizer** | CTA placement, before/after metrics, testimonials, WhatsApp + email shortcuts. |

### Workflow
Brief → design tokens → folder architecture → reusable primitives (`Button`, `Card`, `SectionHeading`, `Reveal`) → data layer (`data/content.ts`) → sections compose primitives + data → global effects layer (cursor, particles, scroll progress) → SEO → performance pass → deploy.

The guiding rule: **spend boldness in one place.** The palette and signature halo carry the personality; everything else stays quiet and disciplined so the work and the numbers are the loudest things on the page.

---

## 2. System architecture

- **Single-page App Router site.** One route (`/`) composed of self-contained section modules.
- **Data-driven.** All copy, projects, skills, tools, testimonials, and timeline live in `data/content.ts`. Edit content without touching components.
- **Server by default, client where needed.** Layout and page are server components; only interactive pieces use `"use client"`.
- **Single source of truth for brand/contact** in `lib/site.ts` — feeds SEO, schema, and every CTA.

---

## 3. Design system

| Token | Value |
| --- | --- |
| Background | `#050505` |
| Card | `#0A0A0A` |
| Primary accent | `#00FF88` |
| Secondary accent | `#00D977` |
| Text | `#FFFFFF` |
| Muted text | `#A3A3A3` |
| Borders | `rgba(255,255,255,0.08)` |

Defined once in `tailwind.config.ts` (`bg`, `card`, `primary`, `secondary`, `muted`, `line`) and `app/globals.css`. Effects: glassmorphism (`.glass`), neon glow (`shadow-glow`), cinematic shadows, grain texture (`.noise`), gradient hairlines.

**Type:** Inter Tight (display) + Inter (body) via `next/font` — self-hosted at build, zero layout shift.

---

## 4. Animation architecture

- **Lenis** smooth scroll, synced to **GSAP ScrollTrigger** (`hooks/use-lenis.ts`).
- **Framer Motion** for entrance choreography, scroll reveals (`Reveal`), layout animations (filter/nav pills), and the case-study modal.
- **Canvas particles** capped at ~70 dots, DPR-aware, `requestAnimationFrame`.
- **Custom cursor**, **mouse-follow gradient**, **scroll progress bar**, **magnetic buttons**, **3D tilt skill cards**, **infinite marquees**, **count-up stats**.
- **Reduced motion respected everywhere** — every effect checks `prefers-reduced-motion` and degrades to static.

---

## 5. Folder structure

```
mizan-portfolio/
├─ app/                 # App Router: routes + SEO route handlers
│  ├─ layout.tsx        #   fonts, Metadata API, JSON-LD, Providers
│  ├─ page.tsx          #   composes all sections
│  ├─ globals.css       #   tokens, base styles, noise, reduced-motion
│  ├─ sitemap.ts        #   /sitemap.xml
│  ├─ robots.ts         #   /robots.txt
│  ├─ manifest.ts       #   PWA manifest
│  └─ icon.svg          #   favicon
├─ sections/            # Page sections (hero, about, skills, services, …)
├─ components/
│  ├─ ui/               #   primitives: button, card, badge, section-heading, reveal
│  ├─ shared/           #   global effects: cursor, particles, marquee, counter, …
│  ├─ navbar.tsx        #   sticky glass nav + active-section detection
│  └─ providers.tsx     #   boots Lenis + mounts global overlays
├─ hooks/               # use-lenis, use-typing, use-magnetic, use-active-section
├─ lib/                 # utils (cn), site config, json-ld schema
├─ data/                # content.ts — single content source for every section
├─ public/              # og.png, icon.png, cv.pdf, profile image
├─ styles/              # (reserved for additional global styles)
└─ tailwind.config.ts   # design tokens + keyframes
```

**Why these folders:** `sections` vs `components/ui` separates page-specific composition from reusable primitives; `data` decouples content from markup; `hooks` and `lib` isolate logic so components stay declarative; `app` is reserved for routing + SEO only.

---

## 6. Installation

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the build
npm run type-check # tsc --noEmit
```

Requires Node 18.18+.

---

## 7. Customizing your content

1. **Brand + contact** → edit `lib/site.ts` (name, domain, email, WhatsApp number, socials).
2. **All section content** → edit `data/content.ts` (projects, skills, tools, services, testimonials, timeline, stats).
3. **Assets** → replace `public/og.png`, `public/icon.png`, `public/cv.pdf`, and the hero/testimonial/project images (see `public/README-assets.md`). Add new remote image hosts to `next.config.ts` → `images.remotePatterns`.
4. **Contact form** → it validates client-side and simulates submission. Wire `submit()` in `sections/contact.tsx` to a Next.js Route Handler, Formspree, or Resend.

---

## 8. SEO configuration

- **Metadata API** in `app/layout.tsx` — title template, description, keywords, canonical, robots directives.
- **Open Graph + Twitter cards** with `og.png`.
- **JSON-LD** (`lib/jsonld.ts`) — `Person` + `ProfessionalService` schema injected via `next/script`.
- **`sitemap.xml`, `robots.txt`, manifest** as App Router route handlers.
- Semantic single `<h1>`, sectioned `<h2>`s, descriptive `alt` text, real anchor IDs.

Targets the queries: *YouTube SEO Expert · Digital Marketing Specialist · Meta Ads Expert · Shopify Designer.*

---

## 9. Performance strategy

- Server components by default; client JS only where interactivity is required.
- `next/font` self-hosting (no render-blocking font requests, no CLS).
- `next/image` with AVIF/WebP, responsive `sizes`, lazy by default (hero is `priority`).
- `optimizePackageImports` for framer-motion / lucide / react-icons → smaller bundles.
- Particle field capped and DPR-clamped; all rAF loops cleaned up on unmount.
- Reduced-motion short-circuits expensive effects.
- Result: lean first-load JS, static prerender of the whole page.

---

## 10. Deploy to Vercel

1. Push to GitHub.
2. Import the repo at [vercel.com/new](https://vercel.com/new) — framework auto-detected as Next.js.
3. Set your production domain, then update `site.url` in `lib/site.ts`.
4. Deploy. Subsequent pushes to `main` ship automatically.

CLI alternative:
```bash
npm i -g vercel
vercel        # preview
vercel --prod # production
```

---

## Notes on brand logos

Brand marks use **`react-icons`** (Simple Icons set) for YouTube, Meta, Google Ads, Shopify, Canva, and OpenAI — crisp, retina-ready SVGs. Tools without an official icon set (VidIQ, TubeBuddy, KeywordTool.io) render as styled wordmark badges. Logos are used nominatively to indicate the tools and platforms worked with; swap or remove any you don't want to display.
