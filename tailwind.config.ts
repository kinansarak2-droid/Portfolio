import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ─── Colors ──────────────────────────────────────────────
      // Replace these with your brand colors
      colors: {
        brand: {
          primary: "#000000",   // TODO: set your primary color
          secondary: "#ffffff", // TODO: set your secondary color
          accent: "#ff0000",    // TODO: set your accent color
        },
      },
      // ─── Typography ──────────────────────────────────────────
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      // ─── Spacing ─────────────────────────────────────────────
      spacing: {
        "section": "120px", // standard section vertical padding
      },
      // ─── Animation ───────────────────────────────────────────
      transitionTimingFunction: {
        "smooth": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
