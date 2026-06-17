"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ease } from "@/lib/motion";

const KEY_MAP: Record<string, { href: string; label: string; section?: string }> = {
  w: { href: "/#work",       label: "Work",       section: "work" },
  e: { href: "/#experience", label: "Experience", section: "experience" },
  s: { href: "/#stack",      label: "Stack",      section: "stack" },
  a: { href: "/#about",      label: "About",      section: "about" },
  c: { href: "/#contact",    label: "Contact",    section: "contact" },
  l: { href: "/lab",         label: "Lab" },
};

export function KeyboardNav() {
  const router = useRouter();
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable ||
        e.metaKey ||
        e.ctrlKey ||
        e.altKey
      )
        return;

      const key = e.key.toLowerCase();
      const dest = KEY_MAP[key];
      if (!dest) return;

      e.preventDefault();
      setActive(key);
      setTimeout(() => setActive(null), 900);

      if (dest.section) {
        const el = document.getElementById(dest.section);
        if (el) {
          el.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" });
          return;
        }
      }
      router.push(dest.href);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: ease.outExpo }}
          aria-live="polite"
          aria-label={`Navigating to ${KEY_MAP[active]?.label}`}
          className="pointer-events-none fixed bottom-8 left-1/2 z-[200] -translate-x-1/2"
        >
          <div className="flex items-center gap-3 border border-rust-500/50 bg-ink/92 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.32em] backdrop-blur-sm">
            <span className="text-rust-500">[{active.toUpperCase()}]</span>
            <span className="text-chrome-400">→</span>
            <span className="text-chrome-200">{KEY_MAP[active]?.label}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
