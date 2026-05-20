"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type TerminalLabelProps = {
  children: ReactNode;
  dot?: boolean;
  variant?: "default" | "rust";
  className?: string;
};

export function TerminalLabel({
  children,
  dot = true,
  variant = "default",
  className,
}: TerminalLabelProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-eyebrow uppercase",
        variant === "default" && "text-chrome-300",
        variant === "rust" && "text-rust-400",
        className,
      )}
    >
      {dot && (
        <span
          aria-hidden
          className={cn(
            "block h-1.5 w-1.5 rounded-full",
            variant === "default" ? "bg-chrome-300" : "bg-rust-500",
            variant === "rust" && "animate-pulse",
          )}
        />
      )}
      {children}
    </span>
  );
}
