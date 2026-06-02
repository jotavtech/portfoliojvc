"use client";

import { useEffect, useRef } from "react";

export function ChromeField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    const pointer = { x: -9999, y: -9999, on: false };

    const COLS = 36;
    const ROWS = 20;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.on = true;
    };
    const onLeave = () => (pointer.on = false);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    let raf = 0;
    let auto = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      auto += 0.008;

      const px = pointer.on ? pointer.x : width / 2 + Math.cos(auto) * (width / 3);
      const py = pointer.on ? pointer.y : height / 2 + Math.sin(auto * 1.3) * (height / 3);

      const cellW = width / COLS;
      const cellH = height / ROWS;

      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          const cx = x * cellW + cellW / 2;
          const cy = y * cellH + cellH / 2;
          const dx = cx - px;
          const dy = cy - py;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const force = Math.min(40, 2200 / (dist + 60));
          const angle = Math.atan2(dy, dx);
          const len = 3 + force * 0.45;
          const ax = cx + Math.cos(angle) * len;
          const ay = cy + Math.sin(angle) * len;

          ctx.strokeStyle = `rgba(232,232,232,${Math.min(0.85, 0.18 + force / 60)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(ax, ay);
          ctx.stroke();
        }
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className="block h-full w-full cursor-crosshair" />;
}
