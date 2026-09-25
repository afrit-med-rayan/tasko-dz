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
        card: "16px",
        modal: "20px",
      },
      boxShadow: {
        card: "0 4px 24px rgba(17, 18, 16, 0.06)",
        elevated: "0 12px 40px rgba(17, 18, 16, 0.1)",
        nav: "0 1px 0 rgba(17, 18, 16, 0.04)",
        teal: "0 4px 20px rgba(29, 158, 117, 0.25)",
        amber: "0 4px 20px rgba(239, 159, 39, 0.30)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.4s ease-out forwards",
        "scale-in": "scaleIn 0.3s ease-out forwards",
        "pulse-dot": "pulseDot 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(1.4)" },
        },
      },
      backgroundImage: {
        "gradient-teal": "linear-gradient(135deg, #1D9E75 0%, #0F6E56 100%)",
        "gradient-amber": "linear-gradient(135deg, #EF9F27 0%, #BA7517 100%)",
        "gradient-hero": "linear-gradient(160deg, #f8fffe 0%, #e1f5ee 40%, #fdfcf8 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
