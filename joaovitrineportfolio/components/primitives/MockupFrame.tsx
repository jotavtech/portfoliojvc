import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  label?: string;
  status?: string;
  accent?: "rust" | "chrome";
  className?: string;
};

/**
 * Unified mockup chrome wrapper.
 * Consistent header bar, dot cluster, and border across all project frames.
 */
export function MockupFrame({ children, label, status, accent = "chrome", className }: Props) {
  return (
    <div
      className={cn(
        "overflow-hidden border bg-[var(--mockup-bg)]",
        accent === "rust" ? "border-rust-500/40" : "border-[var(--mockup-border)]",
        "[box-shadow:var(--mockup-shadow)]",
        className,
      )}
    >
      {/* chrome header */}
      <div
        className="flex h-[28px] shrink-0 items-center justify-between border-b border-[var(--mockup-border)] bg-[var(--mockup-header-bg)] px-3"
      >
        <div className="flex items-center gap-[6px]">
          <span className="h-[6px] w-[6px] rounded-full bg-[#2A2A2A]" />
          <span className="h-[6px] w-[6px] rounded-full bg-[#2A2A2A]" />
          <span
            className={cn(
              "h-[6px] w-[6px] rounded-full",
              accent === "rust" ? "bg-rust-500/70" : "bg-[#2A2A2A]",
            )}
          />
        </div>
        <div className="flex items-center gap-4 font-mono text-[9px] uppercase tracking-[0.28em] text-chrome-600">
          {label && <span>{label}</span>}
          {status && (
            <span className={accent === "rust" ? "text-rust-400" : "text-chrome-500"}>
              · {status}
            </span>
          )}
        </div>
      </div>

      {/* content */}
      <div className="relative">{children}</div>
    </div>
  );
}
