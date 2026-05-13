export type ProjectAccent = "blood" | "cream" | "void" | "rust" | "gold";

export type Project = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  category: "web" | "ui" | "branding";
  tags: string[];
  url?: string;
  /** Short category line (e.g. tour poster vibe) */
  label?: string;
  accent?: ProjectAccent;
};

export type SkillCategory = {
  iconName: string;
  title: string;
  description: string;
};

export type Tool = {
  name: string;
  icon: string;
};

/** Retrato About (Cloudinary) — substituir só alterando esta constante */
export const ABOUT_PORTRAIT_URL =
  "https://res.cloudinary.com/dzwfuzxxw/image/upload/v1778693394/923ab890-18b2-4aca-accb-827fe9021fb6_s2bp9g.png";

export const projects: Project[] = [
  {
    id: 1,
    label: "Music",
    title: "PlayOff",
    description:
      "Real-time music battle with dynamic voting system, real-time ranking and interactive interface for music competitions.",
    imageUrl: "/images/playoff-projects-hero-ref.png",
    imageAlt: "PlayOff — interface editorial de batalhas musicais",
    category: "web",
    tags: ["JavaScript", "Vue.js", "Node.js"],
    accent: "blood",
  },
  {
    id: 2,
    label: "Dashboard",
    title: "DashMEBoard",
    description:
      "Modern and intuitive dashboard for data management with responsive interface and advanced visualization features.",
    imageUrl:
      "https://res.cloudinary.com/dzwfuzxxw/image/upload/v1753404264/2025-07-24_21-44_jtqh8i.png",
    imageAlt: "DashMEBoard dashboard",
    category: "web",
    tags: ["Blade", "Laravel", "MariaDB"],
    accent: "void",
  },
];

export const skillCategories: SkillCategory[] = [
  {
    iconName: "code",
    title: "Frontend Development",
    description: "Creating modern interfaces with React and TypeScript, focusing on interactive and responsive experiences."
  },
  {
    iconName: "database",
    title: "Database",
    description: "Experience with modeling and managing SQL and NoSQL databases for scalable applications."
  },
  {
    iconName: "design",
    title: "Design & Prototyping",
    description: "Creating prototypes and designs in Figma, with advanced animations using Framer Motion."
  },
  {
    iconName: "dev",
    title: "Web Development",
    description: "Full-stack development with focus on TypeScript and React to create robust and performant applications."
  }
];

export const tools = [
  { name: "React", icon: "react" },
  { name: "TypeScript", icon: "typescript" },
  { name: "Database", icon: "database" },
  { name: "Figma", icon: "figma" },
  { name: "Framer", icon: "framer" },
  { name: "Prototyping", icon: "prototype" }
];

export type SocialLink = {
  name: string;
  url: string;
  label: string;
};

export const socialLinks: SocialLink[] = [
  { name: "linkedin", url: "https://www.linkedin.com/in/joão-vitor-chaves-761b102b5/", label: "Jota Chaves LinkedIn" },
  { name: "github", url: "https://github.com/jotavtech", label: "Jota Chaves GitHub" },
  { name: "whatsapp", url: "https://wa.me/5583999290376", label: "WhatsApp — João Martins" }
];

export type ContactInfo = {
  icon: string;
  title: string;
  content: string;
};

export const contactInfo: ContactInfo[] = [
  { 
    icon: "location",
    title: "Location",
    content: "João Pessoa, Brazil" 
  },
  { 
    icon: "email",
    title: "Email",
    content: "martinsjoao1227@gmail.com" 
  },
  { 
    icon: "phone",
    title: "Phone",
    content: "+55 83 99929-0376" 
  }
];
