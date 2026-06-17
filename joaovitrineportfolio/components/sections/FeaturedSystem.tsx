"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { TerminalLabel } from "@/components/primitives/TerminalLabel";
import { ChromeText } from "@/components/primitives/ChromeText";
import { MockupFrame } from "@/components/primitives/MockupFrame";
import { ease } from "@/lib/motion";

const AtlasCore = dynamic(
  () => import("@/components/sections/AtlasCore").then((m) => m.AtlasCore),
  { ssr: false },
);

const HREF = "/projects/atlas-command-center";

const SPECS = [
  { k: "system", v: "ATL-01" },
  { k: "type", v: "Physical-digital" },
  { k: "domains", v: "AI · Home · Env" },
  { k: "status", v: "Flagship concept" },
];

export function FeaturedSystem() {
  return (
    <section
      id="featured"
      className="relative overflow-hidden border-t border-hairline bg-ink py-24 md:py-32"
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

      <div className="relative mx-auto grid w-full max-w-[1440px] gap-12 px-4 md:grid-cols-[1fr_1.05fr] md:items-center md:gap-16 md:px-8">
        {/* copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: ease.outExpo }}
        >
          <TerminalLabel variant="rust">· FLAGSHIP SYSTEM</TerminalLabel>
          <h2 className="mt-4 font-display text-display-md font-semibold leading-[0.94] tracking-tightest">
            <ChromeText>Atlas Command</ChromeText>{" "}
            <ChromeText variant="muted">Center</ChromeText>
          </h2>
          <p className="mt-6 max-w-lg font-display text-base leading-relaxed text-chrome-300 md:text-lg">
            A personal command system designed to connect{" "}
            <span className="text-chrome-100">AI</span>, automation, productivity, smart home
            control and environmental intelligence through a physical-digital interface. Built as an
            interactive 3D product experience.
          </p>

          <dl className="mt-8 grid max-w-md grid-cols-2 gap-y-4 border-y border-hairline py-5 font-mono text-[11px] uppercase tracking-[0.22em] text-chrome-400">
            {SPECS.map((s) => (
              <div key={s.k}>
                <dt className="text-chrome-600">{s.k}</dt>
                <dd className="mt-1 text-chrome-200">{s.v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href={`${HREF}#prototype`}
              className="inline-flex items-center gap-3 border border-chrome-300/40 px-5 py-3 font-mono text-eyebrow uppercase tracking-[0.32em] text-chrome-100 transition-colors hover:border-rust-500 hover:bg-rust-500 hover:text-ink"
            >
              <span>Inspect prototype</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href={`${HREF}#case`}
              className="inline-flex items-center gap-3 border border-hairline-strong px-5 py-3 font-mono text-eyebrow uppercase tracking-[0.32em] text-chrome-300 transition-colors hover:text-chrome-100"
            >
              <span>View case study</span>
            </Link>
          </div>
        </motion.div>

        {/* Atlas Command Core — WebGL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: ease.outExpo }}
          className="relative"
        >
          <MockupFrame label="ATL-01" status="live" accent="rust">
            {/* live canvas */}
            <AtlasCore className="aspect-[16/10] w-full" />

            {/* scanline overlay */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)",
              }}
            />

            {/* nodes indicator */}
            <div className="pointer-events-none absolute right-3 bottom-3 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.32em]">
              <span className="h-1.5 w-1.5 animate-pulse bg-rust-500" />
              <span className="text-rust-400">8 nodes · click to navigate</span>
            </div>
          </MockupFrame>

          <div className="flex items-center justify-between border-x border-b border-[var(--mockup-border)] bg-ink-900/50 px-5 py-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-chrome-600">
              Atlas Command Core · interactive · GLSL
            </span>
            <Link
              href={HREF}
              className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.32em] text-chrome-300 transition-colors hover:text-rust-500"
            >
              Case study
              <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
