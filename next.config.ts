import type { NextConfig } from "next";

/**
 * Canonical domain: www.freelancermizan.com
 * All legacy hosts 301 here so link equity, rankings, and bookmarked/shared
 * URLs from the old domain carry over intact. Keep entries even after
 * traffic drops to ~0 — removing a redirect after Google has cached it
 * reintroduces 404s for stragglers and backlinks.
 */
const LEGACY_HOSTS = ["dmmizan.vercel.app"];
const CANONICAL_HOST = "www.freelancermizan.com";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  async redirects() {
    return [
      // Legacy domain(s) -> canonical domain, path + query preserved, 301.
      ...LEGACY_HOSTS.map((host) => ({
        source: "/:path*",
        has: [{ type: "host" as const, value: host }],
        destination: `https://${CANONICAL_HOST}/:path*`,
        permanent: true,
      })),
      // Bare apex -> www (WWW canonicalization). Vercel serves both hosts
      // once attached to the project; this makes www the single indexable URL.
      {
        source: "/:path*",
        has: [{ type: "host" as const, value: "freelancermizan.com" }],
        destination: `https://${CANONICAL_HOST}/:path*`,
        permanent: true,
      },
    ];
  },

  /* ── Image optimisation ── */
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000, // 1 year browser cache for optimised images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },

  /* ── Production JS stripping ── */
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  /* ── Tree-shake heavy packages ── */
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "lucide-react",
      "react-icons",
    ],
    // default 1mb is too small for admin project-image uploads via Server Actions
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },

  /* ── Aggressive static-asset caching + security headers ── */
  async headers() {
    // 'unsafe-inline' on script/style is a deliberate tradeoff: the inline GA
    // init snippet and several React inline `style={{}}` usages need it, and
    // per-request nonces would force this otherwise-static site into
    // per-request dynamic rendering. Host allow-listing below still blocks
    // arbitrary third-party script/resource injection.
    //
    // Dev-only additions: Next's dev server uses eval()-based bundling for
    // fast refresh (needs 'unsafe-eval') and a WebSocket for live reload
    // (needs ws:/wss: in connect-src). Neither applies to production builds.
    const isDev = process.env.NODE_ENV !== "production";
    const csp = [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://images.unsplash.com https://i.pravatar.cc https://*.public.blob.vercel-storage.com",
      "font-src 'self' data:",
      `connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://formsubmit.co${isDev ? " ws: wss:" : ""}`,
      "frame-ancestors 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join("; ");

    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        // immutable cache for hashed Next.js chunks
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // long-lived cache for images, fonts, PDFs
        source:
          "/(.*)\\.(jpg|jpeg|png|gif|svg|ico|webp|avif|woff|woff2|ttf|pdf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
