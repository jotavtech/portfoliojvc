"use client";

import { useEffect, useRef, useState } from "react";

export function WatchNode() {
  const wrap = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const r = wrap.current?.getBoundingClientRect();
      if (!r) return;
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / r.width;
      const dy = (e.clientY - cy) / r.height;
      const mag = Math.min(0.35, Math.hypot(dx, dy));
      const ang = Math.atan2(dy, dx);
      setPos({ x: Math.cos(ang) * mag * 28, y: Math.sin(ang) * mag * 28 });
    };
    window.addEventListener("pointermove", onMove);
    const blinkId = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 140);
    }, 4200);
    return () => {
      window.removeEventListener("pointermove", onMove);
      clearInterval(blinkId);
    };
  }, []);

  return (
    <div
      ref={wrap}
      className="relative flex h-full w-full items-center justify-center bg-ink"
    >
      {/* ambient grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(255,59,31,0.12), transparent 60%)",
        }}
      />
      <div className="relative h-[62%] w-[62%] max-h-[260px] max-w-[260px]">
        {/* outer ring */}
        <div className="absolute inset-0 rounded-full border border-chrome-300/40" />
        <div className="absolute inset-2 rounded-full border border-chrome-300/20" />
        {/* iris */}
        <div className="absolute inset-[14%] rounded-full bg-[radial-gradient(circle_at_30%_30%,#7a0a0a_0%,#1f0303_70%)]" />
        {/* pupil */}
        <div
          className="absolute left-1/2 top-1/2 h-[26%] w-[26%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink transition-transform duration-150 ease-out"
          style={{
            transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px)) scaleY(${
              blink ? 0.1 : 1
            })`,
          }}
        >
          <div className="absolute left-[18%] top-[18%] h-[22%] w-[22%] rounded-full bg-chrome-100/70" />
        </div>
        {/* tick marks */}
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            className="absolute left-1/2 top-1/2 h-[2px] w-[5px] -translate-x-1/2 bg-chrome-500/40"
            style={{
              transform: `rotate(${(i / 24) * 360}deg) translateY(-86px)`,
            }}
          />
        ))}
      </div>
      <span className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.32em] text-chrome-500">
        · WATCH_NODE_02
      </span>
      <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.32em] text-rust-400">
        <span className="h-1.5 w-1.5 animate-pulse bg-rust-500" /> LIVE
      </span>
    </div>
  );
}
