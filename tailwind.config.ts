import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./sections/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        bg: "#050505",
        card: "#0A0A0A",
        primary: {
          DEFAULT: "#00FF88",
          foreground: "#03110A",
        },
        secondary: {
          DEFAULT: "#00D977",
          foreground: "#03110A",
        },
        muted: "#A3A3A3",
        line: "rgba(255,255,255,0.08)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
        "radial-glow":
          "radial-gradient(600px circle at var(--mx,50%) var(--my,50%), rgba(0,255,136,0.10), transparent 40%)",
      },
      backgroundSize: {
        grid: "56px 56px",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(0,255,136,0.18), 0 18px 60px -18px rgba(0,255,136,0.32)",
        cinematic: "0 40px 120px -40px rgba(0,0,0,0.9)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        "spin-slow": "spin-slow 14s linear infinite",
        shimmer: "shimmer 2.4s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
