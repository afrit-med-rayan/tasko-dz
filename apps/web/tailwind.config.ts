import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: "#1D9E75",
          dark: "#0F6E56",
          light: "#9FE1CB",
          wash: "#E1F5EE",
        },
        amber: {
          DEFAULT: "#EF9F27",
          light: "#FAC775",
          dark: "#BA7517",
        },
        charcoal: "#111210",
        "dark-gray": "#444441",
        "mid-gray": "#888780",
        "light-border": "#D3D1C7",
        "off-white": "#F1EFE8",
        danger: "#E24B4A",
        success: { DEFAULT: "#EAF3DE", dark: "#3B6D11" },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        arabic: ["var(--font-noto-arabic)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        btn: "10px",
        card: "14px",
        modal: "20px",
      },
      boxShadow: {
        card: "0 4px 24px rgba(17, 18, 16, 0.06)",
        elevated: "0 8px 32px rgba(17, 18, 16, 0.08)",
        nav: "0 1px 0 rgba(17, 18, 16, 0.04)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
