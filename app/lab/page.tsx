import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TerminalLabel } from "@/components/primitives/TerminalLabel";
import { ChromeText } from "@/components/primitives/ChromeText";

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
  description: "Experimental playground — WebGL, canvas, motion physics, audio reactive.",
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
              Playground sem briefing. Mini-experiências em canvas, css e motion physics. Toque,
              passe o mouse, ouça.
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
      </div>
    </div>
  );
}
