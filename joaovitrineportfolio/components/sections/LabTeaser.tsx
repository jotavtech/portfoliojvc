"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { TerminalLabel } from "@/components/primitives/TerminalLabel";
import { ChromeText } from "@/components/primitives/ChromeText";
import { ease } from "@/lib/motion";

const EXPERIMENTS = [
  { id: "001", name: "chrome_field", note: "magnetic cursor lattice" },
  { id: "002", name: "watch_node", note: "shader pupil tracker" },
  { id: "003", name: "audio_bus", note: "fft reactive surface" },
  { id: "004", name: "noise_loom", note: "fractal gradient mill" },
];

const RADIAL_LINES = [
  { x2: "90", y2: "50" },
  { x2: "84.641", y2: "70" },
  { x2: "70", y2: "84.641" },
  { x2: "50", y2: "90" },
  { x2: "30", y2: "84.641" },
  { x2: "15.359", y2: "70" },
  { x2: "10", y2: "50" },
  { x2: "15.359", y2: "30" },
  { x2: "30", y2: "15.359" },
  { x2: "50", y2: "10" },
  { x2: "70", y2: "15.359" },
  { x2: "84.641", y2: "30" },
];

const LOOM_LINES = ["10", "20", "30", "40", "50", "60", "70", "80"];

export function LabTeaser() {
  return (
    <section
      id="lab"
      className="relative overflow-hidden border-t border-hairline bg-ink-900 py-24 md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-[1440px] gap-12 px-4 md:grid-cols-[1.1fr_1fr] md:gap-20 md:px-8">
        <div>
          <TerminalLabel variant="rust">· SECTION 07 / EXPERIMENTAL</TerminalLabel>
          <h2 className="mt-4 font-display text-display-md font-semibold leading-[0.94] tracking-tightest">
            <ChromeText>The lab</ChromeText>
          </h2>
          <p className="mt-6 max-w-lg font-display text-base leading-relaxed text-chrome-300 md:text-lg">
            Open space for experiments in <span className="text-chrome-100">WebGL</span>,
            motion <span className="text-chrome-100">physics</span>, reactive audio and shaders.
            No brief, no client — just the machine and the code.
          </p>

          <Link
            href="/lab"
            className="mt-10 inline-flex items-center gap-3 border border-chrome-300/40 px-5 py-3 font-mono text-eyebrow uppercase tracking-[0.32em] text-chrome-100 transition-colors hover:border-rust-500 hover:bg-rust-500 hover:text-ink"
          >
            <span>Enter the lab</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <ul className="grid grid-cols-2 gap-px overflow-hidden border border-hairline bg-hairline">
          {EXPERIMENTS.map((e, i) => (
            <motion.li
              key={e.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: ease.outExpo, delay: i * 0.06 }}
              className="group relative aspect-square bg-ink p-4"
            >
              <Link href="/lab" className="flex h-full flex-col justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-chrome-600">
                  exp · {e.id}
                </span>

                <div
                  aria-hidden
                  className="absolute inset-6 -z-0 opacity-30 transition-opacity group-hover:opacity-80"
                >
                  <ExpGlyph index={i} />
                </div>

                <div>
                  <p className="font-display text-lg font-medium text-chrome-200 transition-colors group-hover:text-chrome-100">
                    {e.name}
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-chrome-500">
                    {e.note}
                  </p>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ExpGlyph({ index }: { index: number }) {
  const variants = [
    <svg key="0" viewBox="0 0 100 100" className="h-full w-full stroke-chrome-400" fill="none">
      <circle cx="50" cy="50" r="38" strokeWidth="0.5" />
      <circle cx="50" cy="50" r="28" strokeWidth="0.5" />
      <circle cx="50" cy="50" r="18" strokeWidth="0.5" />
      <line x1="50" y1="0" x2="50" y2="100" strokeWidth="0.3" />
      <line x1="0" y1="50" x2="100" y2="50" strokeWidth="0.3" />
    </svg>,
    <svg key="1" viewBox="0 0 100 100" className="h-full w-full stroke-chrome-400" fill="none">
      <rect x="20" y="20" width="60" height="60" strokeWidth="0.5" />
      <rect x="32" y="32" width="36" height="36" strokeWidth="0.5" />
      <circle cx="50" cy="50" r="10" strokeWidth="0.5" />
      <circle cx="50" cy="50" r="3" fill="currentColor" strokeWidth="0" />
    </svg>,
    <svg key="2" viewBox="0 0 100 100" className="h-full w-full stroke-chrome-400" fill="none">
      {RADIAL_LINES.map((line, i) => (
        <line key={i} x1="50" y1="50" x2={line.x2} y2={line.y2} strokeWidth="0.5" />
      ))}
      <circle cx="50" cy="50" r="40" strokeWidth="0.3" />
    </svg>,
    <svg key="3" viewBox="0 0 100 100" className="h-full w-full stroke-chrome-400" fill="none">
      {LOOM_LINES.map((y) => (
        <line key={y} x1="0" y1={y} x2="100" y2={y} strokeWidth="0.5" />
      ))}
    </svg>,
  ];
  return variants[index % variants.length];
}
