import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import Script from "next/script";
import { site } from "@/lib/site";
import { personJsonLd, serviceJsonLd } from "@/lib/jsonld";
import { Providers } from "@/components/providers";
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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — YouTube SEO & Digital Marketing Specialist`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "YouTube SEO Expert",
    "Digital Marketing Specialist",
    "Meta Ads Expert",
    "Google Ads Specialist",
    "Shopify Designer",
    "Md Mizanur Rahman",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: site.url },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Digital Marketing Specialist`,
    description: site.description,
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Digital Marketing Specialist`,
    description: site.description,
    images: [site.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable}`}>
      <body className="noise">
        <Script
          id="ld-person"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
        <Script
          id="ld-service"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd()) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
