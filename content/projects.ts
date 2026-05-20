export type Project = {
  slug: string;
  index: string;
  title: string;
  tagline: string;
  summary: string;
  year: string;
  role: string;
  stack: string[];
  status: "live" | "in-development" | "archived";
  href?: string;
  repo?: string;
  cover: string;
  accent?: "rust" | "chrome";
  kpis?: { label: string; value: string }[];
};

export const projects: Project[] = [
  {
    slug: "playoff",
    index: "01",
    title: "PlayOff",
    tagline: "Real-time music battles, ranked & voted.",
    summary:
      "Plataforma de batalhas musicais em tempo real com sistema de votação, ranking dinâmico e interface inspirada em rádio pirata. Foco em latência baixa e UX competitiva.",
    year: "2024",
    role: "Fullstack · Product",
    stack: ["Vue 3", "Node.js", "Socket.IO", "PostgreSQL", "Tailwind"],
    status: "live",
    href: "https://playoff.live",
    repo: "https://github.com/jotavtech/playoff",
    cover: "/assets/projects/playoff.png",
    accent: "rust",
    kpis: [
      { label: "Latency", value: "<120ms" },
      { label: "Concurrent", value: "5k users" },
    ],
  },
  {
    slug: "dashmeboard",
    index: "02",
    title: "DashMEBoard",
    tagline: "Operational dashboard for distributed teams.",
    summary:
      "Painel de gestão de dados com visualizações avançadas e fluxos editoriais. Construído em Laravel com Blade templates, otimizado para times pequenos em alta rotação.",
    year: "2024",
    role: "Fullstack",
    stack: ["Laravel", "Blade", "MariaDB", "Alpine.js", "Tailwind"],
    status: "live",
    cover: "/assets/projects/dashmeboard.svg",
    accent: "chrome",
    kpis: [
      { label: "Modules", value: "12" },
      { label: "Active orgs", value: "30+" },
    ],
  },
  {
    slug: "yii-clinic",
    index: "03",
    title: "Clinic Operations",
    tagline: "Yii2 ERP for a healthcare network.",
    summary:
      "Sistema de gestão para rede de clínicas — agenda médica, prontuários, faturamento. Arquitetura modular em Yii2 com permissionamento granular e auditoria completa.",
    year: "2024",
    role: "Backend · DBA",
    stack: ["PHP", "Yii2", "MySQL", "Redis", "Docker"],
    status: "live",
    cover: "/assets/projects/clinic.svg",
    accent: "chrome",
  },
  {
    slug: "portfolio-3",
    index: "04",
    title: "Portfolio 3.0",
    tagline: "This site. A machine pretending to be an album.",
    summary:
      "Reescrita completa em Next.js 15 com design system industrial-cromado, scroll cinético via Lenis, animações com GSAP ScrollTrigger e Framer Motion. Lighthouse 95+.",
    year: "2026",
    role: "Design · Engineering",
    stack: ["Next.js 15", "TypeScript", "Tailwind", "GSAP", "Lenis"],
    status: "live",
    repo: "https://github.com/jotavtech/portfoliojvc",
    cover: "/assets/projects/portfolio-3.svg",
    accent: "rust",
  },
];
