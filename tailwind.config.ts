import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "15px",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "960px",
      xl: "1200px",
    },
    fontFamily: {
      // body / UI text
      primary: "var(--font-jetbrainsMono)",
      // angular display face for headings, numbers, HUD labels
      display: "var(--font-display)",
    },
    extend: {
      colors: {
        // "Night City" palette — deep blue-black base, neon accents
        primary: "#07070d",
        surface: {
          DEFAULT: "#0f0f1a",
          raised: "#151524",
        },
        accent: {
          default: "#f3e600", // neon yellow — main accent
          hover: "#fff35c",
        },
        neon: {
          yellow: "#f3e600",
          cyan: "#00f0ff",
          magenta: "#ff2a6d",
          violet: "#7a00ff",
        },
      },
      boxShadow: {
        "neon-yellow": "0 0 12px rgba(243,230,0,.55), 0 0 32px rgba(243,230,0,.25)",
        "neon-cyan": "0 0 12px rgba(0,240,255,.55), 0 0 32px rgba(0,240,255,.25)",
        "neon-magenta": "0 0 12px rgba(255,42,109,.55), 0 0 32px rgba(255,42,109,.25)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        flicker: {
          "0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%": { opacity: "1" },
          "20%, 24%, 55%": { opacity: "0.35" },
        },
        "scan-sweep": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        flicker: "flicker 4s linear infinite",
        "scan-sweep": "scan-sweep 7s linear infinite",
        blink: "blink 1s steps(1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
