import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx,mdx}", "./components/**/*.{ts,tsx}", "./content/**/*.{md,mdx}"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        md: "2rem",
        lg: "3rem",
      },
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        ink: {
          DEFAULT: "#070707",
          900: "#0B0B0B",
          800: "#111111",
          700: "#171717",
          600: "#1F1F1F",
          500: "#2A2A2A",
        },
        chrome: {
          DEFAULT: "#E8E8E8",
          50: "#F5F5F5",
          100: "#E8E8E8",
          200: "#C8C8C8",
          300: "#A8A8A8",
          400: "#8A8A8A",
          500: "#6E6E6E",
          600: "#525252",
          700: "#3A3A3A",
        },
        rust: {
          DEFAULT: "#FF3B1F",
          50: "#FFE8E2",
          100: "#FFCBBE",
          200: "#FFA28A",
          300: "#FF7A5C",
          400: "#FF512E",
          500: "#FF3B1F",
          600: "#D72A11",
          700: "#A21F0C",
        },
        hairline: "rgba(255, 255, 255, 0.08)",
        "hairline-strong": "rgba(255, 255, 255, 0.16)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(4rem, 14vw, 14rem)", { lineHeight: "0.88", letterSpacing: "-0.04em" }],
        "display-lg": ["clamp(3rem, 9vw, 8rem)", { lineHeight: "0.92", letterSpacing: "-0.035em" }],
        "display-md": ["clamp(2.25rem, 6vw, 5rem)", { lineHeight: "0.96", letterSpacing: "-0.025em" }],
        eyebrow: ["0.6875rem", { lineHeight: "1", letterSpacing: "0.32em" }],
      },
      letterSpacing: {
        tightest: "-0.045em",
        widest2: "0.4em",
      },
      boxShadow: {
        pane: "inset 0 0 0 1px rgba(255,255,255,0.08), 0 30px 80px -40px rgba(0,0,0,0.9)",
        glow: "0 0 0 1px rgba(255, 59, 31, 0.4), 0 0 40px -10px rgba(255, 59, 31, 0.45)",
      },
      backgroundImage: {
        "chrome-text":
          "linear-gradient(180deg, #FFFFFF 0%, #C8C8C8 38%, #6E6E6E 62%, #FFFFFF 100%)",
        "chrome-thin": "linear-gradient(180deg, #F5F5F5 0%, #8A8A8A 100%)",
        "ink-fade":
          "linear-gradient(180deg, rgba(7,7,7,0) 0%, rgba(7,7,7,0.55) 50%, #070707 100%)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-expo": "cubic-bezier(0.87, 0, 0.13, 1)",
      },
      animation: {
        "scan-drift": "scanDrift 14s linear infinite",
        "flicker": "flicker 5.2s steps(1, end) infinite",
        "caret": "caret 1s steps(1) infinite",
      },
      keyframes: {
        scanDrift: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(4px)" },
        },
        flicker: {
          "0%, 91%, 100%": { opacity: "0.008" },
          "93%": { opacity: "0.052" },
          "94%": { opacity: "0.015" },
          "96%": { opacity: "0.041" },
        },
        caret: {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
