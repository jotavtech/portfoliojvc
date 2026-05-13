import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react";
import { projects } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Projects() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);
  const project = projects[active];
  const touchStart = useRef(0);

  const go = useCallback(
    (idx: number) => {
      setDirection(idx > active ? 1 : -1);
      setActive(idx);
    },
    [active],
  );

  const next = useCallback(
    () => go((active + 1) % projects.length),
    [active, go],
  );
  const prev = useCallback(
    () => go((active - 1 + projects.length) % projects.length),
    [active, go],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const slideVariants = {
    enter: (d: number) => ({
      x: d > 0 ? 600 : -600,
      opacity: 0,
      scale: 0.92,
    }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({
      x: d > 0 ? -600 : 600,
      opacity: 0,
      scale: 0.92,
    }),
  };

  return (
    <section
      className="rock-section relative z-10 min-h-screen overflow-hidden py-20 md:py-28"
      onTouchStart={(e) => (touchStart.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        const diff = touchStart.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 60) diff > 0 ? next() : prev();
      }}
    >
      <div className="rock-section__glow pointer-events-none absolute inset-0" aria-hidden />
      <div className="rock-noise pointer-events-none absolute inset-0 opacity-[0.3]" aria-hidden />

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          className="relative mb-12 overflow-hidden rounded-sm border border-white/10 bg-[#111] md:mb-16"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <div className="relative aspect-[20/11] max-h-[400px] w-full md:aspect-[2.5/1]">
            <img
              src="/images/playoff-projects-hero-ref.png"
              alt="PlayOff — referência visual / capa editorial"
              className="h-full w-full object-cover object-center opacity-[0.92] contrast-[1.06]"
              loading="lazy"
              decoding="async"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-black/65 to-black/25" />
            <div className="absolute bottom-6 left-6 max-w-xl md:bottom-10 md:left-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.5em] text-primary">
                JOTA CHAVES · PROJETOS
              </p>
              <h2 className="font-rock-display mt-3 text-4xl uppercase leading-[0.92] tracking-wide text-[#e8dcc4] sm:text-5xl md:text-7xl lg:text-8xl">
                TRABALHOS{" "}
                <span className="text-primary">SELECIONADOS</span>
              </h2>
              <p className="mt-3 max-w-md font-rock-body text-xs uppercase tracking-[0.35em] text-[#BDBDBD]/80">
                Side A — Setlist · capa de álbum · deploy-ready builds
              </p>
            </div>
          </div>
        </motion.div>

        {/* Main carousel area */}
        <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:gap-12 items-start">
          {/* Active project display */}
          <div className="relative min-h-[480px] md:min-h-[520px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={project.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                className="relative w-full overflow-hidden torn-paper border-2 border-wild/25 bg-black/50 shadow-collage backdrop-blur-sm"
              >
                {/* Image */}
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.imageAlt}
                    className="h-full w-full object-cover object-top"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  {/* Track number badge */}
                  <span className="absolute left-5 top-5 font-rock-display text-6xl leading-none text-white/10 md:text-8xl">
                    {String(active + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Info overlay */}
                <div className="relative z-10 -mt-24 p-6 md:p-8">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.45em] text-primary">
                    {project.label ?? project.category}
                  </p>
                  <h3 className="font-rock-display mt-1 text-4xl tracking-wide text-white md:text-5xl lg:text-6xl">
                    {project.title}
                  </h3>
                  <p className="mt-3 max-w-xl font-rock-body text-sm leading-relaxed text-stone-400 md:text-base">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-stone-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="mt-6">
                    {project.url ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground transition-transform hover:scale-[1.03]"
                      >
                        Abrir projeto
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      <a
                        href="#contact"
                        className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground transition-transform hover:scale-[1.03]"
                      >
                        Falar sobre o projeto
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={prev}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 backdrop-blur-sm transition-all hover:border-primary hover:bg-primary/10 hover:text-primary"
                  aria-label="Projeto anterior"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={next}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 backdrop-blur-sm transition-all hover:border-primary hover:bg-primary/10 hover:text-primary"
                  aria-label="Próximo projeto"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {projects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => go(i)}
                    className={cn(
                      "h-2 rounded-full transition-all",
                      i === active
                        ? "w-8 bg-primary"
                        : "w-2 bg-white/20 hover:bg-white/40",
                    )}
                    aria-label={`Projeto ${i + 1}`}
                  />
                ))}
              </div>

              <span className="font-rock-mono text-xs text-stone-500">
                {String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Track list sidebar */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <p className="mb-4 font-rock-mono text-[10px] uppercase tracking-[0.4em] text-stone-500">
              Tracklist completa
            </p>
            <ul className="space-y-1 border-l border-white/10 pl-0">
              {projects.map((p, i) => (
                <li key={p.id}>
                  <button
                    onClick={() => go(i)}
                    className={cn(
                      "group flex w-full items-center gap-3 border-l-2 py-3 pl-4 text-left transition-all",
                      i === active
                        ? "border-primary bg-white/5 text-white"
                        : "border-transparent text-stone-500 hover:border-white/20 hover:text-stone-300",
                    )}
                  >
                    <span
                      className={cn(
                        "font-rock-mono text-xs",
                        i === active ? "text-primary" : "text-stone-600",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <span className="block truncate font-rock-body text-sm font-medium">
                        {p.title}
                      </span>
                      <span className="block truncate text-[10px] uppercase tracking-wider text-stone-600">
                        {p.label}
                      </span>
                    </div>
                    {i === active && (
                      <motion.span
                        className="h-1.5 w-1.5 rounded-full bg-primary"
                        layoutId="track-dot"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Mobile track selector (horizontal scroll) */}
        <div className="mt-8 lg:hidden">
          <div className="scrollbar-hide flex gap-3 overflow-x-auto pb-2">
            {projects.map((p, i) => (
              <button
                key={p.id}
                onClick={() => go(i)}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-all",
                  i === active
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-white/10 bg-white/5 text-stone-400 hover:text-white",
                )}
              >
                <span className="font-rock-mono text-[10px]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {p.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
