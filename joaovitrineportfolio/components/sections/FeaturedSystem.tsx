"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { TerminalLabel } from "@/components/primitives/TerminalLabel";
import { ChromeText } from "@/components/primitives/ChromeText";
import { ease } from "@/lib/motion";

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

        {/* visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: ease.outExpo }}
        >
          <Link
            href={HREF}
            className="group relative block overflow-hidden border border-hairline-strong bg-ink-900"
          >
            <div className="relative aspect-[16/10] w-full">
              <Image
                src="/assets/projects/atlas-command-center.svg"
                alt="Atlas Command Center"
                fill
                sizes="(min-width: 768px) 720px, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            </div>
            <div className="flex items-center justify-between border-t border-hairline px-5 py-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-chrome-400">
                ATL-01 · interactive 3D prototype
              </span>
              <ArrowUpRight className="h-4 w-4 text-chrome-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-rust-500" />
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
