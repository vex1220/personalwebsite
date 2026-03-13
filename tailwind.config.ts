import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-fragment-mono)", "Menlo", "monospace"],
      },
      colors: {
        accent: "#09f",
        muted: "#666",
        faint: "#999",
        surface: "#fafafa",
        border: "#e5e5e5",
        "border-dark": "#d4d4d4",
      },
      maxWidth: {
        container: "1000px",
      },
      letterSpacing: {
        tight: "-0.03em",
      },
    },
  },
  plugins: [],
};

export default config;
