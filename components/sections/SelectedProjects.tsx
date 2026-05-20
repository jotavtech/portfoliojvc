"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/content/projects";
import { TerminalLabel } from "@/components/primitives/TerminalLabel";
import { ChromeText } from "@/components/primitives/ChromeText";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function SelectedProjects() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="work" className="relative border-t border-hairline bg-ink py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1440px] px-4 md:px-8">
        <header className="mb-14 flex flex-col items-start gap-4 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <TerminalLabel>· SECTION 02 / WORK</TerminalLabel>
            <h2 className="mt-4 font-display text-display-md font-semibold leading-[0.94] tracking-tightest">
              <ChromeText>Selected</ChromeText>{" "}
              <ChromeText variant="muted">artifacts</ChromeText>
            </h2>
          </div>
          <p className="max-w-md font-mono text-[11px] uppercase leading-relaxed tracking-[0.22em] text-chrome-400">
            Quatro projetos representativos da prática atual — produção, escala e
            <span className="text-chrome-100"> intenção</span>.
          </p>
        </header>

        <ul className="divide-y divide-hairline border-y border-hairline">
          {projects.map((p, i) => (
            <li
              key={p.slug}
              onMouseEnter={() => setActive(p.slug)}
              onMouseLeave={() => setActive(null)}
            >
              <ProjectRow project={p} index={i} active={active === p.slug} />
            </li>
          ))}
        </ul>

        {/* Floating preview */}
        <AnimatePresence>
          {active && (
            <FloatingPreview
              key={active}
              cover={projects.find((p) => p.slug === active)?.cover}
              accent={projects.find((p) => p.slug === active)?.accent}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function ProjectRow({
  project,
  index,
  active,
}: {
  project: (typeof projects)[number];
  index: number;
  active: boolean;
}) {
  const href = project.href ?? `#work`;
  return (
    <motion.a
      href={href}
      target={project.href ? "_blank" : undefined}
      rel={project.href ? "noreferrer" : undefined}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: ease.outExpo, delay: index * 0.05 }}
      className={cn(
        "group grid grid-cols-[auto_1fr_auto] items-center gap-4 py-6 transition-colors md:grid-cols-[auto_minmax(0,1fr)_minmax(0,260px)_auto] md:gap-8 md:py-8",
        active && "bg-ink-900/40",
      )}
    >
      <span className="font-mono text-eyebrow uppercase tracking-[0.32em] text-chrome-600">
        {project.index}
      </span>

      <div className="min-w-0">
        <h3
          className={cn(
            "font-display text-2xl font-semibold tracking-tight transition-colors md:text-4xl",
            active ? "text-chrome-100" : "text-chrome-300",
          )}
        >
          {project.title}
        </h3>
        <p className="mt-1 max-w-xl truncate font-mono text-[11px] uppercase tracking-[0.22em] text-chrome-500 md:text-[12px]">
          {project.tagline}
        </p>
      </div>

      <div className="hidden flex-wrap items-center gap-1.5 md:flex">
        {project.stack.slice(0, 4).map((s) => (
          <span
            key={s}
            className="border border-hairline px-2 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-chrome-400"
          >
            {s}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-3 text-chrome-400">
        <span className="hidden font-mono text-[10px] uppercase tracking-[0.32em] md:inline">
          {project.year}
        </span>
        <ArrowUpRight
          className={cn(
            "h-5 w-5 transition-all",
            active ? "translate-x-0.5 -translate-y-0.5 text-rust-500" : "text-chrome-500",
          )}
        />
      </div>
    </motion.a>
  );
}

function FloatingPreview({
  cover,
  accent,
}: {
  cover?: string;
  accent?: "rust" | "chrome";
}) {
  if (!cover) return null;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: ease.outExpo }}
      className="pointer-events-none fixed bottom-10 right-10 z-[40] hidden md:block"
    >
      <div
        className={cn(
          "relative h-[220px] w-[340px] overflow-hidden border bg-ink-900",
          accent === "rust" ? "border-rust-500/60 shadow-glow" : "border-chrome-300/30",
        )}
      >
        <Image
          src={cover}
          alt=""
          fill
          sizes="340px"
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
        <div className="absolute left-3 top-3 font-mono text-[9px] uppercase tracking-[0.32em] text-chrome-300">
          PREVIEW · LIVE
        </div>
      </div>
    </motion.div>
  );
}

