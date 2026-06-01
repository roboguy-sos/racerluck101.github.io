import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#050505",
        surface: "#0a0a0b",
        elevated: "#101013",
        accent: {
          DEFAULT: "#00e676",
          soft: "#52ffa8",
          dim: "#059669",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        content: "1200px",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(0,230,118,0.18), 0 12px 40px -12px rgba(0,230,118,0.35)",
        card: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 24px 60px -30px rgba(0,0,0,0.9)",
      },
      backgroundImage: {
        grid: "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
      keyframes: {
        "blink-caret": {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        "scan": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.8)", opacity: "0.6" },
          "100%": { transform: "scale(2.4)", opacity: "0" },
        },
        "aurora-1": {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(40px,-30px) scale(1.15)" },
        },
        "aurora-2": {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(-50px,34px) scale(1.1)" },
        },
        "grid-pan": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "46px 46px" },
        },
      },
      animation: {
        caret: "blink-caret 1.1s steps(1) infinite",
        scan: "scan 6s linear infinite",
        "scan-slow": "scan 14s linear infinite",
        "pulse-ring": "pulse-ring 3s ease-out infinite",
        "aurora-1": "aurora-1 18s ease-in-out infinite",
        "aurora-2": "aurora-2 22s ease-in-out infinite",
        "grid-pan": "grid-pan 8s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
