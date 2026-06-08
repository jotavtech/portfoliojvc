import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { TerminalLabel } from "@/components/primitives/TerminalLabel";
import { ChromeText } from "@/components/primitives/ChromeText";
import { AtlasEmbed } from "@/components/projects/AtlasEmbed";

export const metadata: Metadata = {
  title: "Atlas Command Center",
  description:
    "A physical-digital command interface for AI, automation, productivity and environmental control — presented as an interactive 3D product experience.",
};

const CONTROLS = [
  { id: "01", name: "AI Assistant", note: "intent → action routing" },
  { id: "02", name: "Smart Home", note: "device orchestration" },
  { id: "03", name: "Lighting", note: "scene & ambient control" },
  { id: "04", name: "Productivity", note: "routines & focus flows" },
  { id: "05", name: "Media Control", note: "audio · playback layer" },
  { id: "06", name: "Environment", note: "climate & sensors" },
  { id: "07", name: "Automation", note: "trigger / rule engine" },
  { id: "08", name: "System Monitoring", note: "status telemetry" },
];

const CASE = [
  {
    id: "01",
    label: "Vision",
    body: "To create a personal command system that feels less like a dashboard and more like a physical extension of the user's digital environment.",
  },
  {
    id: "02",
    label: "Problem",
    body: "Modern users depend on fragmented tools: calendars, AI chats, smart home apps, task managers, music controls, lighting systems and automation platforms. Atlas proposes a single physical-digital layer to reduce friction and centralize control.",
  },
  {
    id: "03",
    label: "Product Concept",
    body: "Atlas works as a command core: a compact physical device with an interactive interface designed to control routines, environments, productivity flows and AI-powered actions.",
  },
  {
    id: "04",
    label: "Interface Logic",
    body: "Instead of switching between apps and dashboards, Atlas exposes one focused command layer. Every domain — AI, home, environment, media — is reachable through the same consistent, low-friction interaction model.",
  },
  {
    id: "05",
    label: "Physical Prototype",
    body: "The form factor was explored as a navigable 3D model: a monochrome command core users can inspect, rotate and interact with to understand the physical direction of the ecosystem.",
  },
  {
    id: "06",
    label: "Ecosystem Integration",
    body: "Atlas is designed as a hub, not a silo — connecting AI assistants, automation routines, smart home protocols and productivity tooling into a single coordinated system.",
  },
];

const TECH = [
  "React",
  "Vite",
  "Three.js",
  "GSAP",
  "HTML Standalone Prototype",
  "Product Design",
  "Interface Design",
  "3D Interaction",
  "Creative Direction",
];

export default function AtlasCommandPage() {
  return (
    <article className="relative min-h-screen bg-ink pb-24 pt-32 md:pb-32">
      {/* technical grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1100px] px-4 md:px-8">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 font-mono text-eyebrow uppercase tracking-[0.32em] text-chrome-400 transition-colors hover:text-chrome-100"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          back to portfolio
        </Link>

        {/* ── Hero ─────────────────────────────────────────── */}
        <header className="mt-10 border-b border-hairline pb-12">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-eyebrow uppercase tracking-[0.32em] text-chrome-500">
            <TerminalLabel>· ATLAS SYSTEM</TerminalLabel>
            <span>ATL-01</span>
            <span>NO. 27122005</span>
            <span className="text-rust-400">· FLAGSHIP CONCEPT</span>
          </div>

          <h1 className="mt-7 font-display text-display-lg font-semibold leading-[0.9] tracking-tightest">
            <ChromeText>Atlas Command</ChromeText>{" "}
            <ChromeText variant="muted">Center</ChromeText>
          </h1>
          <p className="mt-5 max-w-2xl font-display text-xl text-chrome-300 md:text-2xl">
            A physical-digital command interface for AI, automation, productivity and
            environmental control.
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-y-4 border-y border-hairline py-6 font-mono text-[11px] uppercase tracking-[0.22em] text-chrome-400 md:grid-cols-4">
            <Meta label="role" value="Product · Creative Direction · 3D" />
            <Meta label="year" value="2025" />
            <Meta label="status" value="Flagship Concept" />
            <Meta label="format" value="Physical-digital" />
          </dl>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#prototype"
              className="inline-flex items-center gap-3 border border-chrome-300/40 px-5 py-3 font-mono text-eyebrow uppercase tracking-[0.32em] text-chrome-100 transition-colors hover:border-rust-500 hover:bg-rust-500 hover:text-ink"
            >
              Inspect prototype
            </a>
            <a
              href="#case"
              className="inline-flex items-center gap-3 border border-hairline-strong px-5 py-3 font-mono text-eyebrow uppercase tracking-[0.32em] text-chrome-300 transition-colors hover:text-chrome-100"
            >
              View case study
            </a>
          </div>
        </header>

        {/* ── Concept ──────────────────────────────────────── */}
        <section className="mt-16">
          <TerminalLabel variant="rust">· CONCEPT</TerminalLabel>
          <p className="mt-5 max-w-3xl font-display text-lg leading-relaxed text-chrome-300 md:text-2xl md:leading-relaxed">
            Atlas Command Center is a personal operating interface designed to centralize the
            digital and physical environment around the user. Instead of switching between multiple
            apps, dashboards and devices, Atlas proposes a unified command layer where AI, smart
            home controls, automation routines, productivity tools and environmental data live in
            one focused interface.
          </p>
        </section>

        {/* ── What it controls ─────────────────────────────── */}
        <section className="mt-20">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-display-md font-semibold leading-[0.96] tracking-tightest">
              <ChromeText>What it controls</ChromeText>
            </h2>
          </div>
          <ul className="mt-10 grid grid-cols-1 gap-px overflow-hidden border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
            {CONTROLS.map((c) => (
              <li
                key={c.id}
                className="group relative flex aspect-[4/3] flex-col justify-between bg-ink p-5 transition-colors hover:bg-ink-900"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-chrome-600">
                  sys · {c.id}
                </span>
                <div className="absolute right-4 top-4 h-1.5 w-1.5 rounded-full bg-chrome-700 transition-colors group-hover:bg-rust-500" />
                <div>
                  <p className="font-display text-lg font-medium text-chrome-200 transition-colors group-hover:text-chrome-100">
                    {c.name}
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-chrome-500">
                    {c.note}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Interactive prototype ────────────────────────── */}
        <section id="prototype" className="mt-24 scroll-mt-28">
          <TerminalLabel variant="rust">· INTERACTIVE 3D PROTOTYPE</TerminalLabel>
          <h2 className="mt-4 font-display text-display-md font-semibold leading-[0.96] tracking-tightest">
            <ChromeText>Inspect the core</ChromeText>
          </h2>
          <p className="mb-8 mt-5 max-w-2xl font-display text-base leading-relaxed text-chrome-400 md:text-lg">
            The model below is a live interactive render of the Atlas Command Core. Inspect the
            object, rotate it and interact with the experience to understand the physical direction
            of the ecosystem.
          </p>
          <AtlasEmbed />
        </section>

        {/* ── Case study ───────────────────────────────────── */}
        <section id="case" className="mt-24 scroll-mt-28">
          <TerminalLabel>· CASE STUDY</TerminalLabel>
          <h2 className="mt-4 font-display text-display-md font-semibold leading-[0.96] tracking-tightest">
            <ChromeText>Product</ChromeText> <ChromeText variant="muted">study</ChromeText>
          </h2>

          <div className="mt-12 divide-y divide-hairline border-y border-hairline">
            {CASE.map((c) => (
              <div key={c.id} className="grid gap-3 py-8 md:grid-cols-[180px_1fr] md:gap-10">
                <div className="font-mono text-eyebrow uppercase tracking-[0.32em] text-rust-400">
                  {c.id} · {c.label}
                </div>
                <p className="max-w-2xl font-display text-base leading-relaxed text-chrome-300 md:text-lg">
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Technologies ─────────────────────────────────── */}
        <section className="mt-20">
          <TerminalLabel>· 07 · TECHNOLOGIES</TerminalLabel>
          <ul className="mt-6 flex flex-wrap gap-2">
            {TECH.map((t) => (
              <li
                key={t}
                className="border border-hairline px-3 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-chrome-300"
              >
                {t}
              </li>
            ))}
          </ul>
        </section>

        {/* ── Final result + CTA ───────────────────────────── */}
        <section className="mt-20 border-t border-hairline pt-12">
          <TerminalLabel variant="rust">· 08 · FINAL RESULT</TerminalLabel>
          <p className="mt-5 max-w-3xl font-display text-lg leading-relaxed text-chrome-300 md:text-2xl md:leading-relaxed">
            A flagship product concept that merges software, hardware and interface design into a
            single personal operating system — communicated through an interactive 3D experience
            and a premium, technical visual direction.
          </p>
          <Link
            href="/#work"
            className="mt-10 inline-flex items-center gap-2 font-mono text-eyebrow uppercase tracking-[0.32em] text-chrome-400 transition-colors hover:text-chrome-100"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            back to portfolio
          </Link>
        </section>
      </div>
    </article>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-chrome-600">{label}</dt>
      <dd className="mt-1 text-chrome-200">{value}</dd>
    </div>
  );
}
