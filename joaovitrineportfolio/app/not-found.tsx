import Link from "next/link";
import { TerminalLabel } from "@/components/primitives/TerminalLabel";
import { ChromeText } from "@/components/primitives/ChromeText";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[100svh] items-center justify-center bg-ink px-4">
      <div className="text-center">
        <TerminalLabel variant="rust">· 404 / SIGNAL LOST</TerminalLabel>
        <h1 className="mt-6 font-display font-semibold leading-[0.86] tracking-tightest">
          <ChromeText className="block text-display-lg">404</ChromeText>
          <ChromeText variant="muted" className="block text-display-md">
            no carrier
          </ChromeText>
        </h1>
        <p className="mx-auto mt-6 max-w-md font-mono text-[11px] uppercase tracking-[0.22em] text-chrome-400">
          The requested route does not exist on this machine.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-3 border border-chrome-300/40 px-5 py-3 font-mono text-eyebrow uppercase tracking-[0.32em] text-chrome-100 hover:border-rust-500 hover:bg-rust-500 hover:text-ink"
        >
          back to home
        </Link>
      </div>
    </div>
  );
}
