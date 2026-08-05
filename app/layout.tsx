import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import Script from "next/script";
import { site } from "@/lib/site";
import {
  personJsonLd,
  serviceJsonLd,
  faqJsonLd,
  localBusinessJsonLd,
  websiteJsonLd,
  organizationJsonLd,
  breadcrumbJsonLd,
} from "@/lib/jsonld";
import { Providers } from "@/components/providers";
import type { ReactNode } from "react";
// @ts-ignore: CSS imports are handled by Next.js
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

const title = `Freelancer Mizan | Social Media Manager & Digital Marketer`;
const description =
  "Freelancer Mizan — Social Media Manager & Digital Marketer based in Sherpur, Bangladesh. Social Media Marketing Expert, YouTube SEO Expert, Shopify Store Designer, and Digital Marketing Consultant. 5+ years experience, 1000+ videos ranked #1, 200+ clients worldwide. Hire Md Mizanur Rahman today.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s | Freelancer Mizan — Social Media Manager & Digital Marketer`,
  },
  description,
  keywords: [
    // Primary focus keywords
    "Social Media Manager",
    "Digital Marketer",
    // Primary supporting keywords
    "Social Media Marketing Expert",
    "Digital Marketing Expert",
    "Social Media Marketing Services",
    "Digital Marketing Consultant",
    "Social Media Marketing Specialist",
    "Freelance Digital Marketer",
    // Service keywords — YouTube / Video
    "YouTube SEO Expert",
    "YouTube SEO Services",
    "YouTube Channel Optimization",
    "Video SEO Expert",
    // Service keywords — Shopify
    "Shopify Store Designer",
    "Shopify Store Development",
    "Shopify SEO Expert",
    // Service keywords — WordPress / Website
    "WordPress Website Designer",
    "WordPress SEO",
    "Website SEO",
    // Buyer intent keywords
    "Hire Social Media Manager",
    "Hire Digital Marketer",
    "Hire Social Media Marketing Expert",
    "Social Media Management Services",
    "Digital Marketing Services",
    "Hire Digital Marketing Consultant",
    // Brand keywords
    "Freelancer Mizan",
    "Freelancer Mizan Digital Marketing",
    "Freelancer Mizan Social Media Manager",
    "Md Mizanur Rahman",
    "dmmizan",
    // Local
    "best digital marketer Sherpur",
    "digital marketer Sherpur Bangladesh",
    "social media manager Bangladesh",
    "social media marketer Sherpur",
    // Retained service coverage (not primary, still offered)
    "Facebook Ads specialist",
    "Meta Ads expert",
    "Google Ads specialist",
    "eCommerce store setup",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "Digital Marketing",
  alternates: {
    canonical: site.url,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title,
    description,
    images: [
      {
        url: `${site.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: `${site.name} — YouTube SEO & Digital Marketing Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@dmmizanur05",
    creator: "@dmmizanur05",
    title,
    description,
    images: [`${site.url}/opengraph-image`],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Existing token verifies the LEGACY dmmizan.vercel.app GSC property —
    // keep it (needed for the Change of Address tool). Add the NEW
    // www.freelancermizan.com property in Search Console and append its
    // token here as a second array entry, e.g. google: [old, "new-token"].
    google: "1aUAX0Jd9OD4AM2EuQX1F0AwLdNIMPCRDLU_lOSz44s",
    // Bing Webmaster Tools: after adding www.freelancermizan.com there,
    // paste its verification code here.
    // other: { "msvalidate.01": "BING-VERIFICATION-CODE" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable}`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://i.pravatar.cc" />
        {/* JSON-LD is server-rendered as plain <script> tags (not next/script)
            so it's present in the raw HTML for crawlers and AI agents that
            don't execute client JS — next/script's afterInteractive strategy
            would strip it from the initial response entirely. */}
        {[
          websiteJsonLd(),
          organizationJsonLd(),
          personJsonLd(),
          serviceJsonLd(),
          faqJsonLd(),
          localBusinessJsonLd(),
          breadcrumbJsonLd(),
        ].map((data, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
          />
        ))}
      </head>
      <body className="noise">
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${site.googleAnalyticsId}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${site.googleAnalyticsId}');`}
        </Script>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
