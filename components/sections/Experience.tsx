"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { experiences } from "@/content/experience";
import { TerminalLabel } from "@/components/primitives/TerminalLabel";
import { ChromeText } from "@/components/primitives/ChromeText";
import { ease } from "@/lib/motion";

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Compute scroll length: number of cards * vh
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const xRange = useTransform(scrollYProgress, [0, 1], ["0%", `-${(experiences.length - 1) * 100}%`]);

  // Disable horizontal scroll on reduced motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches && trackRef.current) {
      trackRef.current.style.transform = "translateX(0)";
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative border-t border-hairline bg-ink-900/30"
      style={{ height: `${experiences.length * 100}vh` }}
    >
      <div className="sticky top-0 flex h-[100svh] w-full flex-col overflow-hidden">
        <div className="mx-auto w-full max-w-[1440px] px-4 pt-24 md:px-8 md:pt-32">
          <div className="flex items-end justify-between gap-6">
            <div>
              <TerminalLabel>· SECTION 03 / TRAJECTORY</TerminalLabel>
              <h2 className="mt-4 font-display text-display-md font-semibold leading-[0.94] tracking-tightest">
                <ChromeText>Operating</ChromeText>{" "}
                <ChromeText variant="muted">log</ChromeText>
              </h2>
            </div>
            <p className="hidden max-w-xs font-mono text-[11px] uppercase tracking-[0.22em] text-chrome-400 md:block">
              Scroll para avançar nos blocos. Cada cargo é uma faixa do mixing board.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-[1fr_auto] items-center gap-4 border-y border-hairline py-3 font-mono text-[10px] uppercase tracking-[0.32em] text-chrome-600">
            <span>· lane / role / dossier</span>
            <span>{experiences.length} entries</span>
          </div>
        </div>

        <div className="relative flex-1 overflow-hidden">
          <motion.div
            ref={trackRef}
            style={{ x: xRange }}
            className="flex h-full will-change-transform"
          >
            {experiences.map((exp, i) => (
              <ExperienceCard key={exp.id} exp={exp} index={i} total={experiences.length} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({
  exp,
  index,
  total,
}: {
  exp: (typeof experiences)[number];
  index: number;
  total: number;
}) {
  return (
    <article className="flex h-full w-screen shrink-0 items-center justify-center px-6 md:px-20">
      <div className="mx-auto w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.6, ease: ease.outExpo }}
        >
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.32em] text-chrome-500">
            <span>
              lane {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <span className="text-rust-400">{exp.range}</span>
          </div>

          <h3 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tightest text-chrome-100 md:text-5xl">
            {exp.role}
          </h3>
          <p className="mt-2 font-mono text-[12px] uppercase tracking-[0.22em] text-chrome-400">
            {exp.company} · {exp.location}
          </p>

          <p className="mt-6 font-display text-base leading-relaxed text-chrome-300 md:text-lg">
            {exp.dossier}
          </p>

          <ul className="mt-6 space-y-1.5 border-l border-hairline-strong pl-4">
            {exp.highlights.map((h) => (
              <li
                key={h}
                className="font-mono text-[11px] leading-relaxed text-chrome-400 md:text-[12px]"
              >
                <span className="text-rust-500">— </span>
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-1.5">
            {exp.stack.map((s) => (
              <span
                key={s}
                className="border border-hairline px-2 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-chrome-400"
              >
                {s}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </article>
  );
}
