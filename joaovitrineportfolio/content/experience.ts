export type Experience = {
  id: string;
  range: string;
  company: string;
  role: string;
  location: string;
  dossier: string;
  highlights: string[];
  stack: string[];
};

export const experiences: Experience[] = [
  {
    id: "freelance-2024",
    range: "2024 — present",
    company: "Independent · jotavtech",
    role: "Fullstack Engineer",
    location: "João Pessoa, BR · remote",
    dossier:
      "End-to-end product development for Brazilian and international clients. React/Next.js, PHP (Laravel, Yii2), and scalable architecture — all delivered solo.",
    highlights: [
      "Shipped 4 products to production (SaaS and internal platforms), solo.",
      "Refactors that cut build time 60% and bundle size 40%.",
      "Custom design systems for 2 clients (Tailwind + Radix).",
    ],
    stack: ["React", "Next.js", "TypeScript", "Laravel", "Yii2", "PostgreSQL"],
  },
  {
    id: "agency-2023",
    range: "2023 — 2024",
    company: "Agency (NDA)",
    role: "Frontend Engineer",
    location: "Remote · BR",
    dossier:
      "Interface engineering for campaigns and editorial products. Motion design integrated with critical performance for mobile-first delivery.",
    highlights: [
      "Scroll-driven storytelling implemented across 3 editorial projects.",
      "Legacy codebase migration CRA → Vite with full TypeScript coverage.",
      "Junior dev mentorship on the frontend team.",
    ],
    stack: ["React", "TypeScript", "Framer Motion", "GSAP", "Three.js"],
  },
  {
    id: "studies-2022",
    range: "2022 — 2023",
    company: "Personal studies & projects",
    role: "Self-taught Engineer",
    location: "João Pessoa, BR",
    dossier:
      "Deep dive into fundamentals: data structures, design patterns, distributed systems, audio engineering, and visual programming. Limited hardware, no shortcuts — performance became default.",
    highlights: [
      "20+ open-source experiments with WebGL, audio, and motion.",
      "Applied study of Clean Architecture and DDD in PHP/Laravel.",
      "Contributions to independent music community projects.",
    ],
    stack: ["JavaScript", "PHP", "Python", "WebGL", "GLSL"],
  },
];
