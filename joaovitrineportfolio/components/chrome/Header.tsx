"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState("");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  useEffect(() => {
    const update = () => {
      const d = new Date();
      const p = (n: number) => String(n).padStart(2, "0");
      setTime(`${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors",
        scrolled
          ? "border-hairline bg-ink/85 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-4 md:h-16 md:px-8">
        <Link
          href="/"
          className="group inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] text-chrome-200"
        >
          <span aria-hidden className="h-1.5 w-1.5 bg-rust-500" />
          <span className="hidden sm:inline">jotavtech</span>
          <span className="sm:hidden">jvc</span>
          <span className="hidden font-mono text-chrome-500 md:inline">/ NODE_27.12</span>
        </Link>

        <nav className="hidden items-center gap-7 font-mono text-[11px] uppercase tracking-[0.28em] text-chrome-300 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="relative transition-colors hover:text-chrome-100"
            >
              <span className="text-chrome-600">[{item.id.slice(0, 1).toUpperCase()}] </span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-500">
          <span className="hidden md:inline">BRT</span>
          <span suppressHydrationWarning>{time}</span>
        </div>
      </div>
    </motion.header>
  );
}
