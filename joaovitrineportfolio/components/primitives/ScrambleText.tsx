"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+=/<>?";

type ScrambleTextProps = {
  text: string;
  className?: string;
  trigger?: "mount" | "hover";
  duration?: number;
};

export function ScrambleText({
  text,
  className,
  trigger = "mount",
  duration = 700,
}: ScrambleTextProps) {
  const [display, setDisplay] = useState(trigger === "mount" ? "" : text);
  const rafRef = useRef<number | null>(null);

  const scramble = () => {
    const start = performance.now();
    const len = text.length;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const reveal = Math.floor(t * len);
      let next = "";
      for (let i = 0; i < len; i++) {
        if (i < reveal || text[i] === " ") next += text[i];
        else next += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setDisplay(next);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
      else setDisplay(text);
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (trigger === "mount") scramble();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  if (trigger === "hover") {
    return (
      <span className={cn(className)} onMouseEnter={scramble}>
        {display}
      </span>
    );
  }

  return <span className={cn(className)}>{display || "\u00A0"}</span>;
}
