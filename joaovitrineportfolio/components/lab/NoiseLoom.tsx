"use client";

import { useEffect, useState } from "react";

export function NoiseLoom() {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    let raf = 0;
    let t = 0;
    const tick = () => {
      t += 0.4;
      setAngle(t % 360);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden bg-ink">
      <div
        className="absolute inset-0"
        style={{
          background: `conic-gradient(from ${angle}deg at 50% 50%,
            #070707 0deg,
            #1F1F1F 60deg,
            #8A8A8A 90deg,
            #1F1F1F 120deg,
            #070707 180deg,
            #FF3B1F 200deg,
            #1F1F1F 240deg,
            #C8C8C8 270deg,
            #070707 320deg,
            #070707 360deg)`,
          filter: "blur(40px) contrast(1.1)",
          opacity: 0.95,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 mix-blend-overlay"
        style={{
          opacity: 0.5,
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          backgroundSize: "240px 240px",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 mix-blend-overlay"
        style={{
          opacity: 0.18,
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(255,255,255,0.6) 2px, rgba(255,255,255,0.6) 3px)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-ink/60" />
      <span className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.32em] text-chrome-300">
        · conic_mill · turbulence
      </span>
    </div>
  );
}
