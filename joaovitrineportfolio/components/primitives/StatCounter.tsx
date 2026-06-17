"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * Animated count-up for KPI values. Parses a value like "5,000+", "<120ms",
 * "5K users" or "30+" into [prefix][number][suffix] and animates the numeric
 * part from 0 → target once the element scrolls into view.
 *
 * Falls back to the static value instantly when prefers-reduced-motion is set
 * or when the value has no parseable number.
 */
export function StatCounter({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  // Split "5,000+" → prefix "", digits "5,000", suffix "+"
  const match = value.match(/^([^\d]*)([\d.,]+)(.*)$/);
  const prefix = match?.[1] ?? "";
  const rawNumber = match?.[2] ?? "";
  const suffix = match?.[3] ?? "";
  const hasGrouping = rawNumber.includes(",");
  const target = rawNumber ? parseFloat(rawNumber.replace(/,/g, "")) : NaN;
  const decimals = rawNumber.includes(".") ? rawNumber.split(".")[1].length : 0;

  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || Number.isNaN(target)) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(target);
      return;
    }

    const duration = 1100;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // easeOutExpo to match the site's primary curve
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setDisplay(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  // Non-numeric values (e.g. "Physical-digital", "Public") render as-is.
  if (Number.isNaN(target)) {
    return <span className={className}>{value}</span>;
  }

  let formatted: string;
  if (decimals > 0) {
    formatted = display.toFixed(decimals);
  } else {
    const rounded = Math.round(display);
    // Only group with commas if the source value used them (preserve fidelity).
    formatted = hasGrouping ? rounded.toLocaleString("en-US") : String(rounded);
  }

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
