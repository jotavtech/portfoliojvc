"use client";

import Link from "next/link";
import { site } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-hairline bg-ink-900/40">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:px-8 md:py-20">
        <div>
          <p className="font-mono text-eyebrow uppercase tracking-[0.32em] text-chrome-500">
            END OF TRANSMISSION
          </p>
          <p className="mt-6 font-display text-3xl text-chrome-100 md:text-4xl">
            Built in João Pessoa.
            <br />
            <span className="text-chrome-500">Shipped to the world.</span>
          </p>
        </div>

        <div className="space-y-3 font-mono text-[11px] uppercase tracking-[0.24em] text-chrome-400">
          <p className="text-chrome-600">Direct</p>
          <a className="block hover:text-chrome-100" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <a
            className="block hover:text-chrome-100"
            href={site.social.whatsapp}
            target="_blank"
            rel="noreferrer"
          >
            {site.phone}
          </a>
        </div>

        <div className="space-y-3 font-mono text-[11px] uppercase tracking-[0.24em] text-chrome-400">
          <p className="text-chrome-600">Network</p>
          <a
            className="block hover:text-chrome-100"
            href={site.social.github}
            target="_blank"
            rel="noreferrer"
          >
            github / jotavtech
          </a>
          <a
            className="block hover:text-chrome-100"
            href={site.social.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            linkedin / joaovitorchaves27
          </a>
          <Link className="block hover:text-chrome-100" href="/lab">
            /lab · experimental
          </Link>
        </div>
      </div>

      <div className="border-t border-hairline">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-2 px-4 py-5 font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-600 md:flex-row md:items-center md:px-8">
          <span>© {year} · joão vitor chaves félix · all signals reserved</span>
          <span className="hidden md:inline text-chrome-700">
            keyboard · [W] work · [E] experience · [S] stack · [A] about · [C] contact · [L] lab
          </span>
          <span>build · 3.0.0 · industrial release</span>
        </div>
      </div>
    </footer>
  );
}
