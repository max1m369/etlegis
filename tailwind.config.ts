import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./tests/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": "var(--bg-primary, #F8F9FA)",
        "bg-stone": "#F5F5F3",
        "bg-surface": "var(--bg-surface, #FFFFFF)",
        "bg-subtle": "var(--bg-subtle, #ECECE8)",
        "border-subtle": "var(--border-subtle, #E2E2DC)",
        "text-main": "var(--text-main, #141517)",
        "text-muted": "var(--text-muted, #5E6267)",
        "accent": "var(--accent, #1E293B)",
        "accent-bronze": "var(--accent-bronze, #9B815C)",
        "accent-bronze-light": "#BCA685",
        // Short aliases from prompt specification
        "et-dark": "#141517",
        "et-muted": "#5E6267",
        "et-border": "#E2E2DC",
        "et-accent": "#9B815C",
        "et-bg": "#F8F9FA",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Cormorant Garamond", "serif"],
        serif: ["var(--font-heading)", "Cormorant Garamond", "serif"],
        body: ["var(--font-body)", "Jost", "sans-serif"],
      },
      borderRadius: {
        legal: "2px",
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(20, 21, 23, 0.04), 0 1px 2px -1px rgba(20, 21, 23, 0.04)",
        card: "0 4px 20px -2px rgba(20, 21, 23, 0.06)",
        modal: "0 20px 50px -10px rgba(20, 21, 23, 0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
