"use client";

import { useRef, useState } from "react";
import { Maximize2, ArrowUpRight, Play } from "lucide-react";

const PROTOTYPE_SRC = "/atlas/Atlas-Core-Standalone.html";

export function AtlasEmbed() {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);

  function enterFullscreen() {
    frameRef.current?.requestFullscreen?.();
  }

  return (
    <div className="relative w-full">
      <div className="relative w-full overflow-hidden rounded-2xl border border-hairline bg-black">
        {/* technical corner marker */}
        <div className="pointer-events-none absolute right-3 top-3 z-20 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.32em] text-chrome-400">
          <span className="block h-1.5 w-1.5 rounded-full bg-rust-500" />
          ATL-01 / LIVE MODEL
        </div>

        {!loaded ? (
          <button
            type="button"
            onClick={() => setLoaded(true)}
            className="group flex aspect-[16/10] w-full flex-col items-center justify-center gap-5 bg-ink-900 transition-colors hover:bg-ink-800"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-chrome-300/40 text-chrome-200 transition-all group-hover:border-rust-500 group-hover:text-rust-400">
              <Play className="h-5 w-5 translate-x-0.5" />
            </span>
            <span className="font-mono text-eyebrow uppercase tracking-[0.32em] text-chrome-300">
              Load interactive prototype
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-chrome-600">
              Three.js · ~live render · click to inspect
            </span>
          </button>
        ) : failed ? (
          <Fallback />
        ) : (
          <iframe
            ref={frameRef}
            src={PROTOTYPE_SRC}
            title="Atlas Command Core Interactive 3D Prototype"
            className="h-[70vh] w-full border-0 bg-black md:h-[80vh] lg:h-[90vh]"
            allow="fullscreen"
            loading="lazy"
            onError={() => setFailed(true)}
          />
        )}
      </div>

      {/* controls */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        {loaded && !failed && (
          <button
            type="button"
            onClick={enterFullscreen}
            className="inline-flex items-center gap-2.5 border border-chrome-300/40 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.32em] text-chrome-100 transition-colors hover:border-rust-500 hover:bg-rust-500 hover:text-ink"
          >
            <Maximize2 className="h-3.5 w-3.5" />
            Fullscreen
          </button>
        )}
        <a
          href={PROTOTYPE_SRC}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2.5 border border-hairline-strong px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.32em] text-chrome-300 transition-colors hover:text-chrome-100"
        >
          Open in new tab
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>

      {/* mobile hint */}
      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-chrome-600 md:hidden">
        For the best experience, inspect this prototype on desktop.
      </p>
    </div>
  );
}

function Fallback() {
  return (
    <div className="flex aspect-[16/10] w-full flex-col items-center justify-center gap-4 bg-ink-900 px-6 text-center">
      <p className="max-w-sm font-display text-base text-chrome-300">
        The interactive prototype could not be loaded.
      </p>
      <a
        href={PROTOTYPE_SRC}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2.5 border border-chrome-300/40 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.32em] text-chrome-100 transition-colors hover:border-rust-500 hover:bg-rust-500 hover:text-ink"
      >
        Open prototype
        <ArrowUpRight className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}
