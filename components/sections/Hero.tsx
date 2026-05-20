"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { ChromeText } from "@/components/primitives/ChromeText";
import { TerminalLabel } from "@/components/primitives/TerminalLabel";
import { ScrambleText } from "@/components/primitives/ScrambleText";
import { Magnetic } from "@/components/primitives/Magnetic";
import { site } from "@/content/site";
import { ease } from "@/lib/motion";

const ROLES = [
  "FULLSTACK ENGINEER",
  "REACT · TYPESCRIPT",
  "PHP · LARAVEL · YII2",
  "DESIGN ENGINEER",
  "PRODUCT THINKING",
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  const [roleIdx, setRoleIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setRoleIdx((i) => (i + 1) % ROLES.length), 2800);
    return () => clearInterval(id);
  }, []);

  const age = new Date().getFullYear() - site.birthYear;

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-[100svh] w-full items-end overflow-hidden bg-ink pb-20 pt-28 md:pb-28 md:pt-32"
    >
      {/* corner labels */}
      <div className="pointer-events-none absolute inset-x-0 top-20 z-20 flex items-start justify-between px-4 font-mono text-eyebrow uppercase tracking-[0.32em] text-chrome-600 md:top-24 md:px-8">
        <TerminalLabel>SYS · ONLINE</TerminalLabel>
        <span className="hidden md:inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse bg-rust-500" /> REC · NODE_02
        </span>
      </div>

      {/* engraved grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 80% 60% at 30% 60%, black, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 30% 60%, black, transparent 80%)",
        }}
      />

      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 mx-auto w-full max-w-[1440px] px-4 md:px-8"
      >
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          {/* left column — name */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: ease.outExpo, delay: 0.1 }}
              className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-3"
            >
              <TerminalLabel>[ NODE_27.12.05 ]</TerminalLabel>
              <TerminalLabel variant="rust">FULLSTACK · JP-BR · {age}Y</TerminalLabel>
            </motion.div>

            <h1 className="font-display font-semibold leading-[0.86] tracking-tightest">
              <motion.span
                className="block overflow-hidden"
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{ duration: 1.05, ease: ease.outExpo, delay: 0.2 }}
              >
                <ChromeText className="block text-display-xl">JOÃO</ChromeText>
              </motion.span>
              <motion.span
                className="block overflow-hidden"
                initial={{ clipPath: "inset(0 0 0 100%)" }}
                animate={{ clipPath: "inset(0 0 0 0%)" }}
                transition={{ duration: 1.05, ease: ease.outExpo, delay: 0.4 }}
              >
                <ChromeText className="block text-display-xl">VITOR</ChromeText>
              </motion.span>
              <motion.span
                className="block overflow-hidden"
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{ duration: 1.05, ease: ease.outExpo, delay: 0.6 }}
              >
                <ChromeText variant="muted" className="block text-display-xl">
                  CHAVES
                </ChromeText>
              </motion.span>
            </h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.95 }}
              className="mt-8 flex flex-wrap items-baseline gap-x-6 gap-y-3"
            >
              <span className="font-mono text-eyebrow uppercase tracking-[0.32em] text-chrome-500">
                ROLE
              </span>
              <span
                key={roleIdx}
                className="font-display text-lg font-medium text-chrome-100 md:text-xl"
              >
                <ScrambleText text={ROLES[roleIdx]} duration={500} />
              </span>
            </motion.div>
          </div>

          {/* right column — data block */}
          <motion.aside
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: ease.outExpo, delay: 0.7 }}
            className="hidden w-[280px] shrink-0 border border-hairline bg-ink-900/70 p-5 font-mono text-[11px] uppercase tracking-[0.22em] text-chrome-400 md:block"
          >
            <p className="mb-4 text-chrome-600">{"// dossier_v3"}</p>
            <ul className="space-y-2">
              <li className="flex justify-between gap-4">
                <span className="text-chrome-600">node</span>
                <span className="text-chrome-200">27_12_05</span>
              </li>
              <li className="flex justify-between gap-4">
                <span className="text-chrome-600">origin</span>
                <span className="text-chrome-200">JP · BR</span>
              </li>
              <li className="flex justify-between gap-4">
                <span className="text-chrome-600">stack</span>
                <span className="text-chrome-200">REACT / PHP</span>
              </li>
              <li className="flex justify-between gap-4">
                <span className="text-chrome-600">mode</span>
                <span className="text-rust-400">AVAILABLE</span>
              </li>
            </ul>
          </motion.aside>
        </div>

        {/* bottom strip — CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: ease.outExpo, delay: 1.1 }}
          className="mt-14 flex flex-col items-start gap-6 border-t border-hairline pt-6 md:mt-20 md:flex-row md:items-center md:justify-between md:gap-10"
        >
          <p className="max-w-md font-display text-base leading-relaxed text-chrome-300 md:text-lg">
            Engenheiro de produto especializado em construir interfaces que parecem
            <span className="text-chrome-100"> máquinas</span> — densas, precisas e com personalidade.
          </p>

          <div className="flex items-center gap-3">
            <Magnetic>
              <a
                href="#work"
                className="group inline-flex items-center gap-3 border border-chrome-300/40 px-5 py-3 font-mono text-eyebrow uppercase tracking-[0.32em] text-chrome-100 transition-colors hover:border-rust-500 hover:bg-rust-500 hover:text-ink"
              >
                <span>Selected work</span>
                <ArrowDownRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="inline-flex items-center gap-3 px-5 py-3 font-mono text-eyebrow uppercase tracking-[0.32em] text-chrome-400 transition-colors hover:text-chrome-100"
              >
                <span className="h-1.5 w-1.5 bg-rust-500" /> Open channel
              </a>
            </Magnetic>
          </div>
        </motion.div>
      </motion.div>

      {/* bottom ambient fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[1] h-40 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
    </section>
  );
}
