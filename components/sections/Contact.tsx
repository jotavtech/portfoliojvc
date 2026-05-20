"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Send } from "lucide-react";
import { TerminalLabel } from "@/components/primitives/TerminalLabel";
import { ChromeText } from "@/components/primitives/ChromeText";
import { Magnetic } from "@/components/primitives/Magnetic";
import { site } from "@/content/site";
import { ease } from "@/lib/motion";

const CHANNELS = [
  { label: "EMAIL", value: site.email, href: `mailto:${site.email}` },
  { label: "WHATSAPP", value: site.phone, href: site.social.whatsapp },
  { label: "LINKEDIN", value: "/joaovitorchaves27", href: site.social.linkedin },
  { label: "GITHUB", value: "/jotavtech", href: site.social.github },
] as const;

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setStatus("sending");
    const subject = encodeURIComponent(`[NODE_27] ${name} via portfolio`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setTimeout(() => setStatus("sent"), 600);
  };

  return (
    <section id="contact" className="relative border-t border-hairline bg-ink py-24 md:py-32">
      <div className="mx-auto grid w-full max-w-[1440px] gap-12 px-4 md:grid-cols-[1.1fr_1fr] md:gap-20 md:px-8">
        <div>
          <TerminalLabel>· SECTION 06 / OPEN CHANNEL</TerminalLabel>
          <h2 className="mt-4 font-display text-display-md font-semibold leading-[0.94] tracking-tightest">
            <ChromeText>Open</ChromeText>{" "}
            <ChromeText variant="muted">channel</ChromeText>
          </h2>
          <p className="mt-6 max-w-md font-display text-base leading-relaxed text-chrome-300 md:text-lg">
            Para projetos, contratos ou conversa sobre engenharia, design e música.
            Resposta em até 24h em dias úteis.
          </p>

          <ul className="mt-10 divide-y divide-hairline border-y border-hairline">
            {CHANNELS.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                  className="group flex items-center justify-between gap-4 py-4 transition-colors hover:text-chrome-100"
                >
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-chrome-600">
                      {c.label}
                    </p>
                    <p className="mt-1 truncate font-display text-base text-chrome-200 md:text-lg">
                      {c.value}
                    </p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-chrome-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-rust-500" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: ease.outExpo }}
          className="flex flex-col gap-6"
        >
          <div className="flex items-center justify-between border-b border-hairline pb-3 font-mono text-[10px] uppercase tracking-[0.32em] text-chrome-500">
            <span>· terminal_compose</span>
            <span className="text-rust-400">{status === "sending" ? "TX…" : status === "sent" ? "SENT" : "READY"}</span>
          </div>

          <Field label="NAME" value={name} onChange={setName} placeholder="your name" />
          <Field
            label="REPLY-TO"
            value={email}
            onChange={setEmail}
            type="email"
            placeholder="you@domain.com"
          />
          <Field
            label="PAYLOAD"
            value={message}
            onChange={setMessage}
            placeholder="what's the signal?"
            textarea
          />

          <Magnetic strength={0.18}>
            <button
              type="submit"
              disabled={status === "sending"}
              className="group inline-flex w-full items-center justify-between gap-3 border border-chrome-300/40 px-5 py-4 font-mono text-eyebrow uppercase tracking-[0.32em] text-chrome-100 transition-colors hover:border-rust-500 hover:bg-rust-500 hover:text-ink disabled:opacity-60"
            >
              <span>{status === "sent" ? "transmission complete" : "transmit message"}</span>
              <Send className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </Magnetic>
        </motion.form>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  textarea?: boolean;
}) {
  const base =
    "w-full border-b border-hairline-strong bg-transparent py-2 font-display text-lg text-chrome-100 placeholder:text-chrome-600 outline-none transition-colors focus:border-rust-500";
  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-chrome-500">
        {label}
      </span>
      {textarea ? (
        <textarea
          rows={4}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={base}
        />
      ) : (
        <input
          required
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={base}
        />
      )}
    </label>
  );
}
