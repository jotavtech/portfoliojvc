export type StackEntry = {
  name: string;
  level: 1 | 2 | 3 | 4 | 5;
  years: string;
  note?: string;
};

export type StackLane = {
  id: string;
  label: string;
  ordinal: string;
  entries: StackEntry[];
};

export const stack: StackLane[] = [
  {
    id: "languages",
    ordinal: "01",
    label: "Languages",
    entries: [
      { name: "TypeScript", level: 5, years: "4y", note: "primary daily driver" },
      { name: "JavaScript", level: 5, years: "5y" },
      { name: "PHP", level: 4, years: "3y", note: "Laravel & Yii2 in prod" },
      { name: "SQL", level: 4, years: "4y", note: "MySQL · PostgreSQL · MariaDB" },
      { name: "Python", level: 3, years: "2y", note: "scripts & data" },
      { name: "GLSL", level: 2, years: "1y", note: "shaders for the lab" },
    ],
  },
  {
    id: "frontend",
    ordinal: "02",
    label: "Frontend",
    entries: [
      { name: "React", level: 5, years: "4y" },
      { name: "Next.js", level: 5, years: "3y", note: "App Router, RSC" },
      { name: "Tailwind", level: 5, years: "3y" },
      { name: "Framer Motion", level: 4, years: "3y" },
      { name: "GSAP", level: 4, years: "2y", note: "ScrollTrigger pinned scenes" },
      { name: "Vue 3", level: 3, years: "1y" },
    ],
  },
  {
    id: "backend",
    ordinal: "03",
    label: "Backend",
    entries: [
      { name: "Laravel", level: 4, years: "3y", note: "Eloquent · queues · Filament" },
      { name: "Yii2", level: 4, years: "2y", note: "enterprise ERPs" },
      { name: "Node.js", level: 4, years: "3y", note: "Express · realtime" },
      { name: "REST APIs", level: 5, years: "4y" },
      { name: "GraphQL", level: 3, years: "1y" },
    ],
  },
  {
    id: "infra",
    ordinal: "04",
    label: "Infra & Tooling",
    entries: [
      { name: "Docker", level: 4, years: "2y" },
      { name: "Vercel", level: 4, years: "3y" },
      { name: "GitHub Actions", level: 4, years: "2y" },
      { name: "Linux", level: 4, years: "4y", note: "Fedora daily" },
      { name: "Nginx", level: 3, years: "2y" },
    ],
  },
  {
    id: "design",
    ordinal: "05",
    label: "Design & Motion",
    entries: [
      { name: "Figma", level: 4, years: "3y" },
      { name: "Design Systems", level: 4, years: "2y" },
      { name: "Motion Design", level: 4, years: "2y", note: "spring physics" },
      { name: "WebGL / Three", level: 3, years: "1y" },
    ],
  },
];
