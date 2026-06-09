/** Single source of truth for brand + contact details used across SEO + UI. */
export const site = {
  name: "Md Mizanur Rahman",
  role: "Digital Marketing Specialist",
  url: "https://mizanurrahman.com", // replace with your live domain
  email: "freeelancermizan@gmail.com",
  whatsapp: "+8801891892324",
  location: "Sherpur, Mymensingh, Bangladesh",
  description:
    "YouTube Video SEO, Meta & Google Ads, and Shopify store design that turns attention into measurable growth. 5+ years, 300+ projects, 100+ clients.",
  ogImage: "/og.png",
  socials: {
    youtube: "https://www.youtube.com/@mizansherpur",
    linkedin: "https://www.linkedin.com/in/dmmizanur05",
    facebook: "https://www.facebook.com/dmmizanur05",
    instagram: "https://www.instagram.com/dmmizanur05",
    x: "https://www.x.com/dmmizanur05",
  },
} as const;

export type Site = typeof site;
