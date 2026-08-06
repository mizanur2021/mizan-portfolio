import { site } from "./site";

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: site.name,
    alternateName: [
      "Freelancer Mizan",
      "Freelancer Mizan Digital Marketing",
      "Freelancer Mizan Social Media Manager",
      "dmmizan",
      "Mizan Digital Marketer",
      "Best Digital Marketer Sherpur",
      "Digital Marketer Sherpur",
    ],
    url: site.url,
    email: `mailto:${site.email}`,
    telephone: site.whatsapp,
    image: `${site.url}/profile-image.jpg`,
    jobTitle: [
      "Social Media Manager",
      "Digital Marketer",
      "Digital Marketing Consultant",
      "Social Media Marketing Expert",
      "YouTube SEO Expert",
      "Freelance Digital Marketer",
    ],
    description: site.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sherpur",
      addressRegion: "Mymensingh",
      addressCountry: "BD",
    },
    sameAs: [
      ...site.legacyUrls,
      site.socials.youtube,
      site.socials.linkedin,
      site.socials.facebook,
      site.socials.instagram,
      site.socials.x,
      site.googleMaps,
    ],
    knowsAbout: [
      "Social Media Management",
      "Social Media Marketing",
      "YouTube SEO",
      "YouTube Video Optimization",
      "Meta Ads",
      "Facebook Ads Management",
      "Google Ads",
      "Shopify Store Design",
      "Content Strategy",
      "Keyword Research",
      "Video SEO Audit",
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "Social Media Manager & Digital Marketer",
      occupationLocation: { "@type": "Country", name: "Bangladesh" },
      description:
        "Social media management, YouTube SEO, Meta & Google Ads management, and Shopify store design.",
      skills: "Social Media Management, YouTube SEO, Meta Ads, Google Ads, Shopify",
    },
    alumniOf: {
      "@type": "Organization",
      name: "Technical Training Institute",
    },
    award: [
      "Fiverr Level 1 Seller — 50+ five-star reviews",
      "1000+ YouTube videos ranked on page 1",
    ],
  };
}

export function serviceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#service`,
    name: `${site.name} — Social Media Management & Digital Marketing Services`,
    url: site.url,
    logo: `${site.url}/logo.png`,
    image: `${site.url}/profile-image.jpg`,
    description: site.description,
    telephone: site.whatsapp,
    email: site.email,
    areaServed: [
      { "@type": "Country", name: "Bangladesh" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "Denmark" },
      { "@type": "Country", name: "United Arab Emirates" },
      "Worldwide",
    ],
    priceRange: "$$",
    currenciesAccepted: "USD, BDT",
    paymentAccepted: "PayPal, Bank Transfer, Bkash",
    openingHours: "Mo-Fr 09:00-18:00",
    provider: {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Social Media Management & Digital Marketing Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Social Media Management",
            description:
              "Full-service social media management — organic growth systems that compound followers, reach, and brand authority.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "YouTube SEO Optimization",
            description:
              "Rank videos higher with keyword-mapped titles, descriptions, tags, and retention-first structure.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Facebook Ads Management",
            description:
              "Full-funnel Meta campaigns engineered for predictable, profitable ROAS.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Google Ads Campaign Setup",
            description:
              "Search, Performance Max & YouTube ads structured around buyer intent.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Shopify Store Design",
            description:
              "Conversion-focused storefronts — fast, clean, and built to turn browsers into buyers.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Video SEO Audit",
            description:
              "A deep teardown of your channel with a prioritized roadmap to more views.",
          },
        },
      ],
    },
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does Md Mizanur Rahman (Freelancer Mizan) specialize in?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Md Mizanur Rahman is a Social Media Manager and Digital Marketer specializing in social media management, YouTube SEO, Meta (Facebook) Ads, Google Ads, and Shopify store design. He has 5+ years of experience and has ranked 1000+ videos on YouTube's first page.",
        },
      },
      {
        "@type": "Question",
        name: "How do I hire a Social Media Manager or Digital Marketer through Freelancer Mizan?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `You can hire Freelancer Mizan as your Social Media Manager or Digital Marketer directly via the contact form at ${site.url}, by emailing ${site.email}, or through WhatsApp at ${site.whatsapp}.`,
        },
      },
      {
        "@type": "Question",
        name: "How can I hire Mizan for YouTube SEO?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `You can hire Mizan directly via the contact form at ${site.url}, by emailing ${site.email}, or through WhatsApp at ${site.whatsapp}.`,
        },
      },
      {
        "@type": "Question",
        name: "Does Mizan work with international clients?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Mizan works remotely with clients across the USA, UK, Denmark, UAE, and Bangladesh. He is available for freelance digital marketing projects worldwide.",
        },
      },
      {
        "@type": "Question",
        name: "What results can I expect from YouTube SEO with Mizan?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Past results include 4.2x channel views in 90 days, CTR improvements from 3.1% to 8.4%, and subscriber growth from 18K to 61K. Results vary by niche and existing channel authority.",
        },
      },
      {
        "@type": "Question",
        name: "Can Mizan manage my Facebook page?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Mizan provides full Facebook page management including content creation, post scheduling, community engagement, and audience growth strategy. He has managed pages for healthcare professionals and brands with proven results.",
        },
      },
    ],
  };
}

/** Declares the canonical site entity to search engines & AI crawlers (GEO). */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    alternateName: ["Freelancer Mizan", "dmmizan"],
    description: site.description,
    inLanguage: "en",
    publisher: { "@id": `${site.url}/#person` },
  };
}

/**
 * Organization/brand entity. `sameAs` ties the legacy domain + socials to
 * this one entity so Google's Knowledge Graph and AI answer engines
 * (ChatGPT, Perplexity, Gemini, Copilot) consolidate "dmmizan" and
 * "Freelancer Mizan" mentions onto the new canonical domain.
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: "Freelancer Mizan",
    alternateName: [
      "Freelancer Mizan Digital Marketing",
      "Freelancer Mizan Social Media Manager",
      "dmmizan",
      site.name,
    ],
    url: site.url,
    logo: `${site.url}/logo.png`,
    image: `${site.url}/logo.png`,
    founder: { "@id": `${site.url}/#person` },
    foundingLocation: "Sherpur, Mymensingh, Bangladesh",
    sameAs: [
      ...site.legacyUrls,
      site.socials.youtube,
      site.socials.linkedin,
      site.socials.facebook,
      site.socials.instagram,
      site.socials.x,
      site.googleMaps,
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: site.email,
      telephone: site.whatsapp,
      contactType: "customer service",
      areaServed: "Worldwide",
      availableLanguage: ["English", "Bengali"],
    },
  };
}

/** Mirrors the real in-page anchor sections (see app/page.tsx) — structured navigation for crawlers. */
export function breadcrumbJsonLd() {
  const crumbs = [
    { name: "Home", url: site.url },
    { name: "About", url: `${site.url}/#about` },
    { name: "Skills", url: `${site.url}/#skills` },
    { name: "Services", url: `${site.url}/#services` },
    { name: "Pricing", url: `${site.url}/#pricing` },
    { name: "Work", url: `${site.url}/#work` },
    { name: "Testimonials", url: `${site.url}/#testimonials` },
    { name: "Resume", url: `${site.url}/#resume` },
    { name: "Certificates", url: `${site.url}/#certificates` },
    { name: "Contact", url: `${site.url}/#contact` },
  ];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#local`,
    name: "Freelancer Mizan — Social Media Manager & Digital Marketer",
    alternateName: [
      "Freelancer Mizan Social Media Manager",
      "Freelancer Mizan Digital Marketing",
      "Best Digital Marketer Sherpur",
      "Digital Marketer Sherpur Bangladesh",
      "Social Media Marketer Sherpur",
    ],
    url: site.url,
    image: `${site.url}/profile-image.jpg`,
    logo: `${site.url}/logo.png`,
    telephone: site.whatsapp,
    email: site.email,
    description: site.description,
    hasMap: site.googleMaps,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Sherpur",
      addressLocality: "Sherpur",
      addressRegion: "Mymensingh",
      addressCountry: "BD",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "25.0208",
      longitude: "90.0168",
    },
    areaServed: "Worldwide",
    priceRange: "$$",
    openingHours: "Mo-Fr 09:00-18:00",
    sameAs: [
      ...site.legacyUrls,
      site.socials.youtube,
      site.socials.linkedin,
      site.socials.facebook,
      site.socials.instagram,
      site.socials.x,
      site.googleMaps,
    ],
  };
}

/** Per-project structured data for /work/[slug] — ties each case study back to the verified Person entity, plus its own breadcrumb trail. */
export function caseStudyJsonLd(project: {
  id: string;
  title: string;
  description: string;
  result: string;
  cover: string;
  category: string;
}) {
  const url = `${site.url}/work/${project.id}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#work`,
        name: project.title,
        description: `${project.description} ${project.result}.`,
        url,
        image: project.cover,
        about: project.category,
        author: { "@id": `${site.url}/#person` },
        creator: { "@id": `${site.url}/#person` },
        publisher: { "@id": `${site.url}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Work", item: `${site.url}/#work` },
          { "@type": "ListItem", position: 3, name: project.title, item: url },
        ],
      },
    ],
  };
}
