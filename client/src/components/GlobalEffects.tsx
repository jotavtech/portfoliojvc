import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const grainSvg =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\")";

/** Debounced motion-blur fake durante scroll/wheel */
export function useJotaScrollPulse() {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    let idleTimer = 0;

    const pulse = () => {
      document.documentElement.setAttribute("data-jota-scroll-motion", "active");
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        document.documentElement.removeAttribute("data-jota-scroll-motion");
      }, 130);
    };

    window.addEventListener("scroll", pulse, { passive: true });
    window.addEventListener("wheel", pulse, { passive: true });
    window.addEventListener("touchmove", pulse, { passive: true });

    return () => {
      window.clearTimeout(idleTimer);
      window.removeEventListener("scroll", pulse);
      window.removeEventListener("wheel", pulse);
      window.removeEventListener("touchmove", pulse);
      document.documentElement.removeAttribute("data-jota-scroll-motion");
    };
  }, []);
}

export function JotaMotionShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  useJotaScrollPulse();
  return <div className={cn("jota-motion-shell", className)}>{children}</div>;
}

/**
 * Grain, scanlines, aberração leve, vignette, VHS flicker.
 */
export default function GlobalEffects() {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const handler = () => setReduce(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div className="global-effects-stack pointer-events-none fixed inset-0 z-[35]" aria-hidden>
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_85%_75%_at_50%_45%,transparent_35%,rgba(0,0,0,0.52)_78%,rgba(0,0,0,0.85)_100%)] opacity-[0.52]"
        style={{ mixBlendMode: "multiply" }}
      />

      <div className="absolute inset-0 opacity-[0.055] mix-blend-screen">
        <div className="absolute inset-y-0 left-0 w-[22%] bg-gradient-to-r from-[#ff1844]/70 via-transparent to-transparent blur-[0.5px]" />
        <div className="absolute inset-y-0 right-0 w-[22%] bg-gradient-to-l from-[#14ffd9]/65 via-transparent to-transparent blur-[0.5px]" />
      </div>

      <div
        className={cn(
          "absolute inset-0 mix-blend-overlay opacity-[0.065] md:opacity-[0.082]",
          !reduce && "animate-grain",
        )}
        style={{
          backgroundImage: grainSvg,
          backgroundRepeat: "repeat",
          backgroundSize: reduce ? "96px 96px" : "128px 128px",
          transform: "translateZ(0)",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-soft-light"
        style={{
          backgroundImage: grainSvg,
          backgroundRepeat: "repeat",
          backgroundSize: "64px 64px",
          transform: "translateZ(0)",
        }}
      />

      <div className="absolute inset-0 overflow-hidden opacity-[0.042] mix-blend-overlay">
        <div
          className={cn(
            "global-scanlines-layer absolute -top-[8%] left-0 h-[116%] w-full",
            !reduce && "scanlines-drift",
          )}
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(255,255,255,0.045) 2px,
              rgba(255,255,255,0.045) 4px
            )`,
            transform: "translateZ(0)",
          }}
        />
      </div>

      {!reduce && (
        <div className="global-vhs-flicker pointer-events-none absolute inset-0 bg-white mix-blend-overlay" />
      )}
    </div>
  );
}
