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
      "Construção de produtos digitais ponta-a-ponta para clientes brasileiros e internacionais. Foco em React/Next, PHP (Laravel, Yii2) e arquitetura escalável.",
    highlights: [
      "Lançamento de 4 produtos em produção (SaaS e plataformas internas).",
      "Refatorações que reduziram tempo de build em 60% e bundle em 40%.",
      "Design systems próprios para 2 clientes (Tailwind + Radix).",
    ],
    stack: ["React", "Next.js", "TypeScript", "Laravel", "Yii2", "PostgreSQL"],
  },
  {
    id: "agency-2023",
    range: "2023 — 2024",
    company: "Agência (NDA)",
    role: "Frontend Engineer",
    location: "Remote · BR",
    dossier:
      "Engenharia de interface para campanhas e produtos editoriais. Trabalho com motion design integrado e performance crítica para mobile-first.",
    highlights: [
      "Implementação de scroll-driven storytelling em 3 projetos editoriais.",
      "Migração de codebase legada CRA → Vite com tipagem completa.",
      "Mentoria de devs juniores no time de frontend.",
    ],
    stack: ["React", "TypeScript", "Framer Motion", "GSAP", "Three.js"],
  },
  {
    id: "studies-2022",
    range: "2022 — 2023",
    company: "Estudos & projetos pessoais",
    role: "Self-taught Engineer",
    location: "João Pessoa, BR",
    dossier:
      "Aprofundamento em fundamentos: estruturas de dados, padrões de design, sistemas distribuídos, audio engineering e visual programming.",
    highlights: [
      "20+ projetos open-source experimentando com WebGL, audio, motion.",
      "Estudo aplicado de Clean Architecture e DDD em PHP/Laravel.",
      "Contribuições em projetos comunitários de música independente.",
    ],
    stack: ["JavaScript", "PHP", "Python", "WebGL", "GLSL"],
  },
];
