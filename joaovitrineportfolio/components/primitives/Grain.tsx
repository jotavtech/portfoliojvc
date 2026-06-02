"use client";

import { cn } from "@/lib/utils";

type GrainProps = {
  className?: string;
  opacity?: number;
  blend?: "overlay" | "soft-light" | "screen";
};

export function Grain({ className, opacity = 0.08, blend = "overlay" }: GrainProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0 z-[60] select-none",
        blend === "overlay" && "mix-blend-overlay",
        blend === "soft-light" && "mix-blend-soft-light",
        blend === "screen" && "mix-blend-screen",
        className,
      )}
      style={{
        opacity,
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.92' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        backgroundSize: "180px 180px",
      }}
    />
  );
}
