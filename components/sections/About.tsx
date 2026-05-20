"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { TerminalLabel } from "@/components/primitives/TerminalLabel";
import { ChromeText } from "@/components/primitives/ChromeText";
import { ease } from "@/lib/motion";
import { site } from "@/content/site";

const PRINCIPLES = [
  "Pixel é arquitetura, não decoração.",
  "Performance > efeito.",
  "Densidade > esvaziamento.",
  "Personalidade > template.",
];

export function About() {
  const age = new Date().getFullYear() - site.birthYear;

  return (
    <section id="about" className="relative border-t border-hairline bg-ink py-24 md:py-32">
      <div className="mx-auto grid w-full max-w-[1440px] gap-12 px-4 md:grid-cols-[minmax(0,440px)_minmax(0,1fr)] md:gap-20 md:px-8">
        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: ease.outExpo }}
          className="relative"
        >
          <div className="relative aspect-[3/4] w-full overflow-hidden border border-hairline-strong bg-ink-900">
            <Image
              src="/assets/portrait.png"
              alt={site.name}
              fill
              sizes="(min-width: 768px) 440px, 100vw"
              className="object-cover grayscale contrast-[1.05]"
              priority={false}
              unoptimized
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-ink/40 via-transparent to-rust-500/10 mix-blend-multiply" />
            <div className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-30"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(255,255,255,0.6) 2px, rgba(255,255,255,0.6) 3px)",
              }}
            />
            <div className="absolute left-3 top-3 font-mono text-[10px] uppercase tracking-[0.32em] text-chrome-300">
              · subject_27_12_05
            </div>
            <div className="absolute bottom-3 right-3 font-mono text-[10px] uppercase tracking-[0.32em] text-chrome-300">
              · still_alive
            </div>
          </div>

          {/* Data block */}
          <div className="mt-4 grid grid-cols-3 gap-px overflow-hidden border border-hairline bg-hairline">
            <DataCell label="age" value={`${age}Y`} />
            <DataCell label="loc" value="JP·BR" />
            <DataCell label="lang" value="PT·EN" />
          </div>
        </motion.div>

        {/* Copy */}
        <div className="flex flex-col justify-center">
          <TerminalLabel>· SECTION 05 / SUBJECT</TerminalLabel>
          <h2 className="mt-4 font-display text-display-md font-semibold leading-[0.94] tracking-tightest">
            <ChromeText>About</ChromeText>{" "}
            <ChromeText variant="muted">the engineer</ChromeText>
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: ease.outExpo, delay: 0.1 }}
            className="mt-10 space-y-5 font-display text-base leading-relaxed text-chrome-300 md:text-lg"
          >
            <p>
              Sou{" "}
              <span className="text-chrome-100">fullstack engineer brasileiro</span>, baseado em João
              Pessoa. Construo produtos digitais que funcionam como instrumentos — densos, sólidos,
              com personalidade.
            </p>
            <p>
              Minha prática combina <span className="text-chrome-100">React/TypeScript no front</span>{" "}
              e <span className="text-chrome-100">PHP/Laravel/Yii2 no backend</span>, mas o que me
              move é o que fica nas bordas: motion design, design system, audio, fricção e ritmo.
            </p>
            <p>
              Não acredito em portfólio que parece template. Cada interface que assino tem
              <span className="text-chrome-100"> arquitetura</span>,
              <span className="text-chrome-100"> opinião</span> e
              <span className="text-chrome-100"> mão</span>.
            </p>
          </motion.div>

          <ul className="mt-10 grid gap-3 border-l border-hairline-strong pl-6 md:grid-cols-2 md:gap-x-10">
            {PRINCIPLES.map((p, i) => (
              <motion.li
                key={p}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: ease.outExpo, delay: 0.15 + i * 0.05 }}
                className="font-mono text-[11px] uppercase tracking-[0.22em] text-chrome-400"
              >
                <span className="text-rust-500">{String(i + 1).padStart(2, "0")}.</span> {p}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function DataCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-ink-900/80 px-3 py-2">
      <p className="font-mono text-[9px] uppercase tracking-[0.32em] text-chrome-600">{label}</p>
      <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.22em] text-chrome-200">
        {value}
      </p>
    </div>
  );
}
