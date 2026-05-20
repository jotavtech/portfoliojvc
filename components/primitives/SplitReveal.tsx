"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { clipReveal } from "@/lib/motion";
import { cn } from "@/lib/utils";

type SplitRevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
};

export function SplitReveal({ children, delay = 0, className, once = true }: SplitRevealProps) {
  return (
    <motion.div
      className={cn("inline-block overflow-hidden", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.5 }}
      variants={clipReveal}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
