/** Single source of truth for brand + contact details used across SEO + UI. */
export const site = {
  name: "Md Mizanur Rahman",
  role: "Social Media Manager & Digital Marketer",
  /** Primary canonical domain — all metadata, schema, sitemap & OG tags derive from this. */
  url: "https://www.freelancermizan.com",
  /**
   * Legacy domain(s) being migrated away from. Kept only for 301 redirects
   * (see next.config.ts) and `sameAs` entity-consolidation in JSON-LD.
   * Do NOT remove until GSC "Change of Address" migration is fully settled
   * (Search Console confirms the move, ~weeks to months).
   */
  legacyUrls: ["https://dmmizan.vercel.app"],
  email: "freeelancermizan@gmail.com",
  whatsapp: "+8801891892324",
  location: "Sherpur, Mymensingh, Bangladesh",
  googleMaps: "https://maps.app.goo.gl/81JEoxdAdr31sms87",
  description:
    "Social Media Manager & Digital Marketer specializing in Social Media Marketing, YouTube SEO, Shopify store design, and Meta & Google Ads — turning attention into measurable growth. 5+ years, 300+ projects, 100+ clients.",
  ogImage: "/og.png",
  /** Google Analytics 4 (gtag.js) measurement ID. */
  googleAnalyticsId: "G-36W496FF17",
  socials: {
    youtube: "https://www.youtube.com/@mizansherpur",
    linkedin: "https://www.linkedin.com/in/dmmizanur05",
    facebook: "https://www.facebook.com/dmmizanur05",
    instagram: "https://www.instagram.com/dmmizanur05",
    x: "https://www.x.com/dmmizanur05",
  },
} as const;

export type Site = typeof site;
