export type Project = {
  slug: string;
  index: string;
  title: string;
  tagline: string;
  summary: string;
  approach?: string;
  outcome?: string;
  teardownHref?: string;
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
      "A personal command system designed to unify AI, automation, smart home control, productivity, and environmental intelligence through a single physical-digital interface layer. Presented as a navigable interactive 3D prototype.",
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
    slug: "atribuicao-prefeitura-jacarei",
    index: "01",
    title: "Atribuição Prefeitura de Jacareí",
    tagline: "Municipal attribution system — public sector, production scale.",
    summary:
      "Attribution system built for Jacareí City Hall — managing operational workflows, process traceability, and administrative clarity for daily municipal use. 5,000+ active users across 3+ municipalities in production.",
    approach:
      "Modular PHP/Yii2 architecture with MySQL, strict component isolation, and an interface built for daily non-technical users. No framework overhead — every decision oriented toward operational reliability.",
    outcome:
      "5,000+ municipal workers active daily across 3+ municipalities. Replaced a manual process with traceable, auditable workflows. In production since 2024.",
    teardownHref: "/lab#atrib-teardown",
    year: "2024",
    role: "Fullstack · Public Sector",
    stack: ["PHP", "Yii2", "MySQL", "Bootstrap", "JavaScript"],
    status: "live",
    cover: "/assets/projects/atribuicao-jacarei.svg",
    accent: "chrome",
    kpis: [
      { label: "Daily users", value: "5,000+" },
      { label: "Municipalities", value: "3+" },
      { label: "Sector", value: "Public" },
    ],
  },
  {
    slug: "playoff",
    index: "02",
    title: "PlayOff",
    tagline: "Real-time music battle platform — product, not demo.",
    summary:
      "Full product: real-time voting, dynamic ranking, and a pirate-radio UI that actually ships. Built for competitive, low-latency music battles at scale. Not a prototype — users are live and sessions are running.",
    approach:
      "Vue 3 frontend over Node.js + Socket.IO for sub-120ms real-time sync. PostgreSQL for persistent rankings. UX modeled on competitive sports scoring — information density without cognitive overload.",
    outcome:
      "Live product handling 5K concurrent users. Ranking and voting systems run in real time without polling. Users return session after session — this is a working product, not a showcase.",
    teardownHref: "/lab#playoff-teardown",
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
      { label: "Concurrent", value: "5K users" },
    ],
  },
  {
    slug: "dashmeboard",
    index: "03",
    title: "DashMEBoard",
    tagline: "Operational dashboard for distributed teams.",
    summary:
      "Data management dashboard with advanced visualizations and editorial workflows. Built on Laravel with Blade templates, optimized for small teams running at high velocity.",
    approach:
      "Laravel with Blade templates kept the stack thin and deployable. Alpine.js for reactive UI without full SPA overhead. 12 modules, zero external dashboard dependencies.",
    outcome:
      "30+ active organizations running editorial workflows on it. Built and iterated solo — tight feedback loop between builder and users in the field.",
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
];
