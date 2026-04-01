import { motion } from "framer-motion";
import { useTheme, themes, themeOrder } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

export default function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-full bg-white/5 p-1 backdrop-blur-md border border-white/10",
        className,
      )}
    >
      {themeOrder.map((id) => {
        const t = themes[id];
        const active = theme === id;
        return (
          <button
            key={id}
            onClick={() => setTheme(id)}
            className={cn(
              "relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] transition-colors",
              active ? "text-white" : "text-white/40 hover:text-white/70",
            )}
            aria-label={`Tema ${t.band}`}
            title={t.band}
          >
            {active && (
              <motion.span
                layoutId="theme-pill"
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: t.hex }}
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            <span
              className={cn(
                "relative z-10 h-2 w-2 rounded-full border border-white/20",
                !active && "opacity-60",
              )}
              style={{ backgroundColor: t.hex }}
            />
            <span className="relative z-10">{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}
