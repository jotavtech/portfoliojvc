"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const LINES = [
  "[OK] CORE LINK ESTABLISHED",
  "[OK] CHROME LAYER INITIALIZED",
  "[OK] AUDIO BUS · 48kHz",
  "[OK] NODE 27.12.05 · BRT",
  "[RUN] PORTFOLIO 3.0",
];

type BootSequenceProps = {
  onComplete?: () => void;
  durationPerLine?: number;
};

export function BootSequence({ onComplete, durationPerLine = 240 }: BootSequenceProps) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (step < LINES.length) {
      const id = setTimeout(() => setStep((s) => s + 1), durationPerLine);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => {
      setDone(true);
      onComplete?.();
    }, 380);
    return () => clearTimeout(id);
  }, [step, durationPerLine, onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-start bg-ink"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.87, 0, 0.13, 1] } }}
          aria-hidden
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(255,255,255,0.6) 2px, rgba(255,255,255,0.6) 3px)",
            }}
          />
          <div className="relative w-full px-6 pb-14 md:px-12 md:pb-20">
            <p className="mb-6 font-mono text-eyebrow uppercase tracking-[0.4em] text-chrome-600">
              · BOOT SEQUENCE
            </p>
            <ul className="space-y-1 font-mono text-[12px] uppercase tracking-[0.22em] text-chrome-300 md:text-[13px]">
              {LINES.slice(0, step).map((line, i) => (
                <motion.li
                  key={line}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className={i === LINES.length - 1 ? "text-rust-500" : ""}
                >
                  {line}
                </motion.li>
              ))}
              {step < LINES.length && (
                <li className="font-mono text-chrome-600">
                  <span className="animate-caret">_</span>
                </li>
              )}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
