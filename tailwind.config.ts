import type { Config } from "tailwindcss";

/**
 * Tailwind config consumes the same design tokens defined in
 * `src/styles/tokens.css`. Replacing the design system means editing
 * one CSS file (tokens.css) — these mappings stay the same.
 */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/templates/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:           "var(--color-bg)",
        surface:      "var(--color-surface)",
        "surface-alt":"var(--color-surface-alt)",
        border:       "var(--color-border)",
        text:         "var(--color-text)",
        "text-muted": "var(--color-text-muted)",
        "text-subtle":"var(--color-text-subtle)",
        accent:       "var(--color-accent)",
        "accent-fg":  "var(--color-accent-fg)",
      },
      fontFamily: {
        sans:    ["var(--font-sans)"],
        display: ["var(--font-display)"],
        mono:    ["var(--font-mono)"],
      },
      spacing: {
        section: "var(--section-pad-block)",
      },
      maxWidth: {
        container: "var(--container-max)",
      },
      borderRadius: {
        xs:   "var(--radius-xs)",
        sm:   "var(--radius-sm)",
        md:   "var(--radius-md)",
        lg:   "var(--radius-lg)",
        xl:   "var(--radius-xl)",
        full: "var(--radius-full)",
      },
      boxShadow: {
        xs: "var(--shadow-xs)",
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
      },
      transitionTimingFunction: {
        smooth: "var(--ease-smooth)",
      },
      transitionDuration: {
        fast: "160ms",
        base: "240ms",
        slow: "420ms",
      },
      screens: {
        sm:  "640px",
        md:  "768px",
        lg:  "1024px",
        xl:  "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};

export default config;
