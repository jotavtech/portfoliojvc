"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type ChromeTextProps = {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "span" | "div";
  className?: string;
  variant?: "bright" | "muted";
};

export function ChromeText({
  children,
  as: Tag = "span",
  className,
  variant = "bright",
}: ChromeTextProps) {
  return (
    <Tag
      className={cn(
        "bg-clip-text text-transparent",
        variant === "bright" && "bg-chrome-text",
        variant === "muted" && "bg-chrome-thin",
        className,
      )}
      style={{
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        textShadow: "0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      {children}
    </Tag>
  );
}
