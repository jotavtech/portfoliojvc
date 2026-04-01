import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type ThemeId = "qotsa" | "aic" | "rhcp";

export interface ThemeInfo {
  id: ThemeId;
  label: string;
  band: string;
  hex: string;
}

export const themes: Record<ThemeId, ThemeInfo> = {
  qotsa: {
    id: "qotsa",
    label: "QOTSA",
    band: "Queens of the Stone Age",
    hex: "#c41e3a",
  },
  aic: {
    id: "aic",
    label: "AIC",
    band: "Alice in Chains",
    hex: "#3d8b37",
  },
  rhcp: {
    id: "rhcp",
    label: "RHCP",
    band: "Red Hot Chili Peppers",
    hex: "#e65100",
  },
};

export const themeOrder: ThemeId[] = ["qotsa", "aic", "rhcp"];

interface ThemeContextType {
  theme: ThemeId;
  setTheme: (t: ThemeId) => void;
  themeInfo: ThemeInfo;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeId>(() => {
    try {
      const stored = localStorage.getItem("rock-theme") as ThemeId | null;
      return stored && themes[stored] ? stored : "qotsa";
    } catch {
      return "qotsa";
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("rock-theme", theme);
    } catch {
      // no-op
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeInfo: themes[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be inside ThemeProvider");
  return ctx;
}
