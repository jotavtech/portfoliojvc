import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { TerminalLabel } from "@/components/primitives/TerminalLabel";
import { ChromeText } from "@/components/primitives/ChromeText";
import { teardowns } from "@/content/teardowns";

const ChromeField = dynamic(() => import("@/components/lab/ChromeField").then((m) => m.ChromeField));
const NoiseLoom = dynamic(() => import("@/components/lab/NoiseLoom").then((m) => m.NoiseLoom));
const WatchNode = dynamic(() => import("@/components/lab/WatchNode").then((m) => m.WatchNode));
const AudioBus = dynamic(() => import("@/components/lab/AudioBus").then((m) => m.AudioBus));

const EXPERIMENTS = [
  {
    id: "001",
    name: "CHROME_FIELD",
    note: "Magnetic cursor lattice — 1024 nodes following an inverse-square field.",
    Component: ChromeField,
  },
  {
    id: "002",
    name: "WATCH_NODE",
    note: "CSS pupil tracker. Looks back. Loaded reinterpretation of the old EvilEye shader.",
    Component: WatchNode,
  },
  {
    id: "003",
    name: "AUDIO_BUS",
    note: "Canvas-driven FFT bars. Tap to enable mic; otherwise auto-cycle.",
    Component: AudioBus,
  },
  {
    id: "004",
    name: "NOISE_LOOM",
    note: "Fractal gradient mill. Pure CSS conic + SVG turbulence.",
    Component: NoiseLoom,
  },
];

export const metadata = {
  title: "Lab",
  description:
    "Experimental playground and engineering teardowns — WebGL, canvas, motion physics, plus the how behind the flagship systems.",
};

export default function LabPage() {
  return (
    <div className="relative min-h-screen bg-ink pb-24 pt-32 md:pb-32">
      <div className="mx-auto w-full max-w-[1440px] px-4 md:px-8">
        <div className="mb-14 flex flex-col items-start gap-4 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <TerminalLabel variant="rust">· /lab</TerminalLabel>
            <h1 className="mt-4 font-display text-display-lg font-semibold leading-[0.94] tracking-tightest">
              <ChromeText>Experimental</ChromeText>{" "}
              <ChromeText variant="muted">area</ChromeText>
            </h1>
            <p className="mt-6 max-w-xl font-display text-base leading-relaxed text-chrome-300 md:text-lg">
              No brief, no client. Mini-experiments in canvas, CSS, and motion physics. Touch,
              hover, listen.
            </p>
          </div>
          <Link
            href="/"
            className="relative z-20 inline-flex items-center gap-2 font-mono text-eyebrow uppercase tracking-[0.32em] text-chrome-400 hover:text-chrome-100"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            back to home
          </Link>
        </div>

        <div className="grid gap-px overflow-hidden border border-hairline bg-hairline md:grid-cols-2">
          {EXPERIMENTS.map((e) => {
            const C = e.Component;
            return (
              <article key={e.id} className="relative bg-ink-900 p-5 md:p-8">
                <header className="mb-5 flex items-baseline justify-between border-b border-hairline pb-3 font-mono text-eyebrow uppercase tracking-[0.32em]">
                  <span className="text-chrome-500">EXP · {e.id}</span>
                  <span className="text-chrome-200">{e.name}</span>
                </header>
                <div className="relative aspect-[16/10] w-full overflow-hidden border border-hairline bg-ink">
                  <C />
                </div>
                <p className="mt-4 font-mono text-[11px] leading-relaxed text-chrome-400">
                  · {e.note}
                </p>
              </article>
            );
          })}
        </div>

        {/* ── Lab Artifact: Pumprithm ─────────────────────────────────── */}
        <div className="mt-px border border-hairline bg-ink-900">
          <div className="border-b border-hairline px-5 py-3 font-mono text-[10px] uppercase tracking-[0.32em]">
            <span className="text-chrome-600">LAB ARTIFACT · 005</span>
            <span className="ml-4 text-rust-500">AI ORCHESTRATION</span>
          </div>
          <div className="grid gap-12 p-5 md:grid-cols-[1fr_auto] md:items-start md:p-8">
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-chrome-100 md:text-3xl">
                Pumprithm
              </h2>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-chrome-500">
                Rhythm generator · AI-orchestrated · zero-dependency sandbox
              </p>
              <p className="mt-6 max-w-lg font-display text-base leading-relaxed text-chrome-300 md:text-lg">
                Rhythm and beat generation tool built entirely through AI orchestration. The
                interesting part isn't the output — it's the{" "}
                <span className="text-chrome-100">architecture it forced</span>: Web Worker audio
                pipeline, CSP{" "}
                <code className="font-mono text-[13px] text-chrome-400">connect-src 'none'</code>{" "}
                enforcement, and zero runtime dependencies. Clean sandbox, auditable output.
              </p>
              <ul className="mt-8 grid gap-3 border-l border-hairline-strong pl-5 md:grid-cols-3">
                {[
                  { k: "Architecture", v: "Web Worker + CSP sandbox" },
                  { k: "Dependencies", v: "Zero runtime" },
                  { k: "Method", v: "AI orchestrated" },
                ].map((d) => (
                  <li key={d.k}>
                    <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-chrome-600">
                      {d.k}
                    </p>
                    <p className="mt-1 font-display text-sm text-chrome-200">{d.v}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="shrink-0 space-y-2 font-mono text-[10px] uppercase tracking-[0.24em]">
              <p className="text-chrome-600">Key decisions</p>
              {[
                "Web Worker isolates audio from main thread",
                "CSP blocks all outbound — no side channels",
                "Comparator chain for rhythm coherence",
                "Claude Code orchestration → clean architecture",
              ].map((d) => (
                <p key={d} className="text-chrome-400">
                  <span className="text-rust-500">—</span> {d}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* ── Engineering teardowns ───────────────────────────────────── */}
        <div className="mt-24">
          <TerminalLabel variant="rust">· ENGINEERING TEARDOWNS</TerminalLabel>
          <h2 className="mt-4 font-display text-display-md font-semibold leading-[0.96] tracking-tightest">
            <ChromeText>The how</ChromeText>{" "}
            <ChromeText variant="muted">behind the flagships</ChromeText>
          </h2>
          <p className="mt-5 max-w-2xl font-display text-base leading-relaxed text-chrome-400 md:text-lg">
            Short reads on the engineering decisions — the constraints, the trade-offs, and why each
            system is built the way it is.
          </p>

          <div className="mt-12 space-y-px">
            {teardowns.map((t) => (
              <section
                key={t.id}
                id={t.id}
                className="scroll-mt-28 border border-hairline bg-ink-900"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline px-5 py-3 font-mono text-[10px] uppercase tracking-[0.32em] md:px-8">
                  <span className="text-rust-500">{t.project}</span>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-chrome-600">
                    {t.metrics.map((m) => (
                      <span key={m.label}>
                        {m.label}: <span className="text-chrome-300">{m.value}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-5 md:p-8">
                  <h3 className="max-w-3xl font-display text-2xl font-semibold leading-tight tracking-tight text-chrome-100 md:text-3xl">
                    {t.title}
                  </h3>
                  <p className="mt-4 max-w-2xl font-display text-base leading-relaxed text-chrome-300 md:text-lg">
                    {t.intro}
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-1.5">
                    {t.stack.map((s) => (
                      <li
                        key={s}
                        className="border border-hairline px-2 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-chrome-400"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 divide-y divide-hairline border-y border-hairline">
                    {t.sections.map((s) => (
                      <div
                        key={s.label}
                        className="grid gap-3 py-7 md:grid-cols-[200px_1fr] md:gap-10"
                      >
                        <div className="font-mono text-eyebrow uppercase tracking-[0.32em] text-rust-400">
                          {s.label}
                        </div>
                        <p className="max-w-2xl font-display text-base leading-relaxed text-chrome-300 md:text-lg">
                          {s.body}
                        </p>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={t.projectHref}
                    className="group mt-8 inline-flex items-center gap-3 border border-chrome-300/40 px-5 py-3 font-mono text-eyebrow uppercase tracking-[0.32em] text-chrome-100 transition-colors hover:border-rust-500 hover:bg-rust-500 hover:text-ink"
                  >
                    <span>View the project</span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
