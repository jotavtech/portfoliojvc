import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { projects } from "@/content/projects";
import { TerminalLabel } from "@/components/primitives/TerminalLabel";
import { ChromeText } from "@/components/primitives/ChromeText";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  // Featured projects (e.g. atlas-command-center) ship their own dedicated route.
  return projects.filter((p) => !p.featured).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.tagline,
  };
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <article className="relative min-h-screen bg-ink pb-24 pt-32 md:pb-32">
      <div className="mx-auto w-full max-w-[1100px] px-4 md:px-8">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 font-mono text-eyebrow uppercase tracking-[0.32em] text-chrome-400 hover:text-chrome-100"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          all artifacts
        </Link>

        <header className="mt-10 border-b border-hairline pb-10">
          <div className="flex flex-wrap items-center gap-4 font-mono text-eyebrow uppercase tracking-[0.32em] text-chrome-500">
            <TerminalLabel>· artifact / {project.index}</TerminalLabel>
            <span>{project.year}</span>
            <span className={project.status === "live" ? "text-rust-400" : "text-chrome-400"}>
              · {project.status.toUpperCase()}
            </span>
          </div>
          <h1 className="mt-6 font-display text-display-lg font-semibold leading-[0.92] tracking-tightest">
            <ChromeText>{project.title}</ChromeText>
          </h1>
          <p className="mt-4 max-w-2xl font-display text-xl text-chrome-300 md:text-2xl">
            {project.tagline}
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-y-4 border-y border-hairline py-6 font-mono text-[11px] uppercase tracking-[0.22em] text-chrome-400 md:grid-cols-4">
            <Meta label="role" value={project.role} />
            <Meta label="year" value={project.year} />
            <Meta label="status" value={project.status} />
            <Meta label="stack" value={project.stack.join(" · ")} />
          </dl>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 border border-chrome-300/40 px-5 py-3 font-mono text-eyebrow uppercase tracking-[0.32em] text-chrome-100 transition-colors hover:border-rust-500 hover:bg-rust-500 hover:text-ink"
              >
                <span>Open live</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 border border-hairline-strong px-5 py-3 font-mono text-eyebrow uppercase tracking-[0.32em] text-chrome-300 transition-colors hover:text-chrome-100"
              >
                <Github className="h-3.5 w-3.5" />
                <span>Repository</span>
              </a>
            )}
          </div>
        </header>

        <section className="mt-12 grid gap-12 md:grid-cols-[1fr_280px]">
          <div className="space-y-8 font-display text-base leading-relaxed text-chrome-300 md:text-lg">
            <Block label="01 · Challenge">
              <p>{project.summary}</p>
            </Block>
            {project.approach && (
              <Block label="02 · Approach">
                <p>{project.approach}</p>
              </Block>
            )}
            {project.outcome && (
              <Block label="03 · Outcome">
                <p>{project.outcome}</p>
              </Block>
            )}
          </div>

          <aside className="space-y-6">
            {project.kpis && (
              <div className="border border-hairline bg-ink-900/70 p-5">
                <p className="mb-4 font-mono text-eyebrow uppercase tracking-[0.32em] text-chrome-500">
                  · key signals
                </p>
                <ul className="space-y-3">
                  {project.kpis.map((k) => (
                    <li key={k.label} className="flex items-baseline justify-between gap-3">
                      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-chrome-500">
                        {k.label}
                      </span>
                      <span className="font-display text-xl text-chrome-100">{k.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="border border-hairline bg-ink-900/70 p-5">
              <p className="mb-4 font-mono text-eyebrow uppercase tracking-[0.32em] text-chrome-500">
                · stack
              </p>
              <ul className="flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <li
                    key={s}
                    className="border border-hairline px-2 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-chrome-300"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </section>

        {project.cover && (
          <figure className="mt-16 border border-hairline">
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-ink-900">
              <Image
                src={project.cover}
                alt={project.title}
                fill
                sizes="(min-width: 1100px) 1100px, 100vw"
                className="object-cover"
                unoptimized
              />
            </div>
          </figure>
        )}
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

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-3 font-mono text-eyebrow uppercase tracking-[0.32em] text-rust-400">
        {label}
      </p>
      {children}
    </div>
  );
}
