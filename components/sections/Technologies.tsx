"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { stack } from "@/content/stack";
import { TerminalLabel } from "@/components/primitives/TerminalLabel";
import { ChromeText } from "@/components/primitives/ChromeText";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Technologies() {
  return (
    <section id="stack" className="relative border-t border-hairline bg-ink py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1440px] px-4 md:px-8">
        <header className="mb-12 flex flex-col items-start gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <TerminalLabel>· SECTION 04 / SIGNAL CHAIN</TerminalLabel>
            <h2 className="mt-4 font-display text-display-md font-semibold leading-[0.94] tracking-tightest">
              <ChromeText>Stack</ChromeText>{" "}
              <ChromeText variant="muted">architecture</ChromeText>
            </h2>
          </div>
          <p className="max-w-md font-mono text-[11px] uppercase leading-relaxed tracking-[0.22em] text-chrome-400">
            Mixing board pessoal. Cada lane representa anos em produção — não meses de tutorial.
          </p>
        </header>

        <div className="grid gap-px overflow-hidden border border-hairline bg-hairline md:grid-cols-5">
          {stack.map((lane, i) => (
            <Lane key={lane.id} lane={lane} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Lane({ lane, index }: { lane: (typeof stack)[number]; index: number }) {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: ease.outExpo, delay: index * 0.05 }}
      className="flex flex-col bg-ink-900/80 p-5 md:p-6"
    >
      <header className="mb-5 flex items-baseline justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-chrome-600">
          {lane.ordinal}
        </span>
        <span className="font-display text-sm font-medium uppercase tracking-[0.18em] text-chrome-200">
          {lane.label}
        </span>
      </header>

      <ul className="flex-1 space-y-2">
        {lane.entries.map((e) => (
          <li
            key={e.name}
            onMouseEnter={() => setHover(e.name)}
            onMouseLeave={() => setHover(null)}
            className="group"
          >
            <div className="flex items-baseline justify-between gap-3 border-t border-hairline pt-2 first:border-t-0 first:pt-0">
              <span
                className={cn(
                  "font-mono text-[12px] uppercase tracking-[0.18em] transition-colors",
                  hover === e.name ? "text-chrome-100" : "text-chrome-300",
                )}
              >
                {e.name}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-500">
                {e.years}
              </span>
            </div>
            <div className="mt-1.5 flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((n) => (
                <span
                  key={n}
                  className={cn(
                    "h-[3px] w-full transition-colors",
                    n <= e.level
                      ? hover === e.name
                        ? "bg-rust-500"
                        : "bg-chrome-200"
                      : "bg-hairline",
                  )}
                />
              ))}
            </div>
            {e.note && hover === e.name && (
              <motion.p
                initial={{ opacity: 0, y: -3 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1.5 font-mono text-[10px] leading-relaxed text-chrome-500"
              >
                · {e.note}
              </motion.p>
            )}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
