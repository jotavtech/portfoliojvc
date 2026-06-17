import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, FileText, Clock } from "lucide-react";
import { TerminalLabel } from "@/components/primitives/TerminalLabel";
import { ChromeText } from "@/components/primitives/ChromeText";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Resume Hub",
  description:
    "Six targeted versions of João Vitor Chaves's résumé — ATS, Fullstack, Frontend, Backend, Designer, and AI Engineer.",
};

const VERSIONS = [
  {
    id: "ats",
    label: "ATS / General",
    note: "Keyword-optimized for applicant tracking systems. Maximum compatibility.",
    accent: false,
    href: null,
  },
  {
    id: "fullstack",
    label: "Fullstack Engineer",
    note: "Balanced React + PHP stack depth. Best for product companies.",
    accent: false,
    href: null,
  },
  {
    id: "frontend",
    label: "Frontend Engineer",
    note: "Interface, motion, and design system emphasis. Best for UI-heavy roles.",
    accent: false,
    href: null,
  },
  {
    id: "backend",
    label: "Backend Engineer",
    note: "Architecture, API design, and infrastructure depth.",
    accent: false,
    href: null,
  },
  {
    id: "designer",
    label: "Design Engineer",
    note: "Interface craft, design systems, and motion design. Bridges code and design.",
    accent: true,
    href: null,
  },
  {
    id: "ai",
    label: "AI Engineer",
    note: "AI orchestration, Claude Code workflow, and sandboxed architecture.",
    accent: true,
    href: null,
  },
];

export default function ResumePage() {
  return (
    <div className="relative min-h-screen bg-ink pb-24 pt-32 md:pb-32">
      <div className="mx-auto w-full max-w-[1100px] px-4 md:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-eyebrow uppercase tracking-[0.32em] text-chrome-400 hover:text-chrome-100"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          back to home
        </Link>

        <header className="mt-10">
          <TerminalLabel>· RESUME HUB / SIX VERSIONS</TerminalLabel>
          <h1 className="mt-4 font-display text-display-lg font-semibold leading-[0.92] tracking-tightest">
            <ChromeText>Resume</ChromeText>{" "}
            <ChromeText variant="muted">Hub</ChromeText>
          </h1>
          <p className="mt-6 max-w-xl font-display text-base leading-relaxed text-chrome-300 md:text-lg">
            Six versions targeting different roles and audiences. Each PDF is tailored — not the
            same document with a different title.
          </p>
        </header>

        <ul className="mt-14 divide-y divide-hairline border-y border-hairline">
          {VERSIONS.map((v, i) => {
            const inner = (
              <>
                <div className="flex items-start gap-6">
                  <span className="mt-1 font-mono text-eyebrow uppercase tracking-[0.32em] text-chrome-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className={`font-display text-2xl font-semibold tracking-tight md:text-3xl ${v.href ? "transition-colors group-hover:text-chrome-100 text-chrome-200" : "text-chrome-300"}`}>
                        {v.label}
                      </h2>
                      {v.accent && (
                        <span className="border border-rust-500/50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.32em] text-rust-400">
                          NEW
                        </span>
                      )}
                    </div>
                    <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-chrome-500">
                      {v.note}
                    </p>
                  </div>
                </div>
                <div className={`flex shrink-0 items-center gap-2 ${v.href ? "text-chrome-500 transition-colors group-hover:text-rust-500" : "text-chrome-700"}`}>
                  {v.href ? (
                    <>
                      <FileText className="h-4 w-4" />
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </>
                  ) : (
                    <>
                      <Clock className="h-3.5 w-3.5" />
                      <span className="font-mono text-[9px] uppercase tracking-[0.32em]">Uploading soon</span>
                    </>
                  )}
                </div>
              </>
            );

            return (
              <li key={v.id}>
                {v.href ? (
                  <a
                    href={v.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between gap-6 py-6 transition-colors hover:bg-ink-900/40 md:py-8 md:px-4"
                  >
                    {inner}
                  </a>
                ) : (
                  <div
                    aria-disabled="true"
                    className="flex cursor-default items-center justify-between gap-6 py-6 opacity-60 md:py-8 md:px-4"
                  >
                    {inner}
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <div className="mt-12 border border-hairline bg-ink-900/40 p-6 font-mono text-[11px] uppercase tracking-[0.22em] text-chrome-400">
          <p className="text-chrome-600">· Direct contact</p>
          <p className="mt-3">
            Prefer email?{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-chrome-200 hover:text-rust-400 transition-colors link-underline"
            >
              {site.email}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
