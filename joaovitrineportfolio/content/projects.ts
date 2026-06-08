export type Project = {
  slug: string;
  index: string;
  title: string;
  tagline: string;
  summary: string;
  year: string;
  role: string;
  stack: string[];
  status: "live" | "archived" | "concept";
  href?: string;
  repo?: string;
  cover: string;
  accent?: "rust" | "chrome";
  featured?: boolean;
  kpis?: { label: string; value: string }[];
};

export const projects: Project[] = [
  {
    slug: "atlas-command-center",
    index: "00",
    title: "Atlas Command Center",
    tagline: "Personal command system for AI, automation & environment.",
    summary:
      "Sistema de comando pessoal — uma interface físico-digital que unifica IA, automação, controle de smart home, produtividade e inteligência ambiental em uma única camada de comando. Apresentado como protótipo 3D interativo navegável.",
    year: "2025",
    role: "Product · Creative Direction · 3D",
    stack: ["React", "Three.js", "GSAP", "3D Prototype", "Product Design", "UX Strategy"],
    status: "concept",
    cover: "/assets/projects/atlas-command-center.svg",
    accent: "chrome",
    featured: true,
    kpis: [
      { label: "Domains", value: "8 systems" },
      { label: "Format", value: "Physical-digital" },
    ],
  },
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
    slug: "atribuicao-prefeitura-jacarei",
    index: "03",
    title: "Atribuição Prefeitura de Jacareí",
    tagline: "Sistema interno para fluxos operacionais municipais.",
    summary:
      "Sistema de atribuição para a Prefeitura de Jacareí - SP, com foco em organização operacional, rastreabilidade de processos e interface administrativa clara para uso diário.",
    year: "2024",
    role: "Fullstack · Public Sector",
    stack: ["PHP", "Yii2", "MySQL", "Bootstrap", "JavaScript"],
    status: "live",
    cover: "/assets/projects/atribuicao-jacarei.svg",
    accent: "chrome",
    kpis: [
      { label: "Scope", value: "Municipal" },
      { label: "Context", value: "Jacareí-SP" },
    ],
  },
];
