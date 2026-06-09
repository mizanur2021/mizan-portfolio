import { site } from "./site";

/** Person + ProfessionalService structured data for rich results. */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    email: `mailto:${site.email}`,
    jobTitle: "Digital Marketing Specialist",
    address: { "@type": "PostalAddress", addressLocality: site.location },
    sameAs: Object.values(site.socials),
    knowsAbout: [
      "YouTube SEO",
      "Meta Ads",
      "Google Ads",
      "Shopify",
      "Social Media Marketing",
      "Video Optimization",
    ],
    description: site.description,
  };
}

export function serviceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${site.name} — ${site.role}`,
    url: site.url,
    description: site.description,
    areaServed: "Worldwide",
    priceRange: "$$",
    provider: { "@type": "Person", name: site.name },
  };
}
