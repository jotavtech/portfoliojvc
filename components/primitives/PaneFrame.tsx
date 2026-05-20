"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type PaneFrameProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  label?: string;
  index?: string;
  meta?: string;
};

export function PaneFrame({
  children,
  className,
  innerClassName,
  label,
  index,
  meta,
}: PaneFrameProps) {
  return (
    <div className={cn("relative", className)}>
      {/* bracket corners */}
      <Corner className="left-0 top-0" />
      <Corner className="right-0 top-0 rotate-90" />
      <Corner className="bottom-0 left-0 -rotate-90" />
      <Corner className="bottom-0 right-0 rotate-180" />

      {(label || index || meta) && (
        <div className="absolute -top-3 left-3 right-3 z-10 flex items-center justify-between px-2">
          {(label || index) && (
            <span className="bg-ink px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.32em] text-chrome-300">
              {index && <span className="text-chrome-500">{index} · </span>}
              {label}
            </span>
          )}
          {meta && (
            <span className="bg-ink px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.32em] text-chrome-500">
              {meta}
            </span>
          )}
        </div>
      )}

      <div
        className={cn(
          "border border-hairline bg-ink-900/60 backdrop-blur-[2px]",
          innerClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}

function Corner({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("absolute z-20 h-3 w-3", className)}>
      <span className="absolute left-0 top-0 h-px w-3 bg-chrome-400" />
      <span className="absolute left-0 top-0 h-3 w-px bg-chrome-400" />
    </span>
  );
}
