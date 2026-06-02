"use client";

import { cn } from "@/lib/utils";

export function Scanlines({ className, opacity = 0.05 }: { className?: string; opacity?: number }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0 z-[55] mix-blend-overlay",
        "animate-scan-drift",
        className,
      )}
      style={{
        opacity,
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(255,255,255,0.4) 2px, rgba(255,255,255,0.4) 3px)",
      }}
    />
  );
}
