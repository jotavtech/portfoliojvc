/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        "rock-display": ['"Bebas Neue"', "sans-serif"],
        "rock-body": ['"DM Sans"', "system-ui", "sans-serif"],
        "rock-mono": [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
        "punk-display": ['"Metal Mania"', "cursive"],
        "jota-display": ['Anton', '"Bebas Neue"', "sans-serif"],
        /** Grossa / quadrada — menus punks (tipo concert poster) */
        "menu-punk": ['"Archivo Black"', "Anton", "sans-serif"],
        marker: ['"Permanent Marker"', "cursive"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        wild: "hsl(var(--wild))",
      },
      boxShadow: {
        collage:
          "6px 8px 0 rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.05)",
        "collage-wild":
          "4px 6px 0 hsl(var(--wild) / 0.35), 6px 10px 0 rgba(0,0,0,0.45)",
      },
      keyframes: {
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(-1.5%, 1%)" },
          "50%": { transform: "translate(1%, -1%)" },
          "75%": { transform: "translate(-0.5%, -0.5%)" },
        },
      },
      animation: {
        grain: "grain 7s steps(6) infinite",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
}