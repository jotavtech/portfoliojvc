import type { Transition, Variants } from "framer-motion";

export const spring = {
  soft: { type: "spring", stiffness: 180, damping: 28, mass: 0.9 } satisfies Transition,
  precise: { type: "spring", stiffness: 240, damping: 30 } satisfies Transition,
  snap: { type: "spring", stiffness: 360, damping: 32 } satisfies Transition,
} as const;

export const ease = {
  /** Primary: cinematic out-expo for all section entrances and major transitions */
  outExpo: [0.16, 1, 0.3, 1] as const,
  /** Micro: tighter for hover states and small interactions */
  micro: [0.65, 0, 0.35, 1] as const,
  inOutExpo: [0.87, 0, 0.13, 1] as const,
  outQuart: [0.25, 1, 0.5, 1] as const,
} as const;

/** Duration tokens in seconds — use these instead of ad-hoc values */
export const dur = {
  micro: 0.15,      // hover, focus, small state changes
  standard: 0.4,    // component transitions, reveals
  cinematic: 0.85,  // section entrances, hero sequences
} as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: ease.outExpo, delay: custom * 0.06 },
  }),
};

export const clipReveal: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.9, ease: ease.outExpo },
  },
};

export const stagger = (delay = 0.05): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: delay } },
});
