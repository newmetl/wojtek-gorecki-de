import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "#faf9f6",
          dim: "#dbdad7",
          bright: "#faf9f6",
          container: {
            DEFAULT: "#efeeeb",
            low: "#f4f3f1",
            high: "#e9e8e5",
            highest: "#e3e2e0",
            lowest: "#ffffff",
          },
          variant: "#e3e2e0",
          tint: "#7c5639",
        },
        primary: {
          DEFAULT: "#9B4410",
          container: "#B85A1C",
          fixed: {
            DEFAULT: "#ffd8b4",
            dim: "#f0b882",
          },
        },
        "on-primary": {
          DEFAULT: "#ffffff",
          container: "#fffbff",
        },
        "on-surface": {
          DEFAULT: "#1a1c1a",
          variant: "#50443d",
        },
        "on-background": "#1a1c1a",
        secondary: {
          DEFAULT: "#5f5e5e",
          container: "#e4e2e1",
        },
        "on-secondary": "#ffffff",
        tertiary: {
          DEFAULT: "#7A4820",
          container: "#96612E",
        },
        outline: {
          DEFAULT: "#82746c",
          variant: "#d4c3b9",
        },
        error: {
          DEFAULT: "#ba1a1a",
          container: "#ffdad6",
        },
        "inverse-surface": "#2f312f",
        "inverse-on-surface": "#f2f1ee",
        "inverse-primary": "#efbc98",
      },
      fontFamily: {
        headline: ["var(--font-eb-garamond)", "EB Garamond", "serif"],
        body: ["var(--font-quicksand)", "Quicksand", "sans-serif"],
        label: ["var(--font-quicksand)", "Quicksand", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
