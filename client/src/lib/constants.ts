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

export const projects: Project[] = [
  {
    id: 1,
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
  {
    id: 2,
    label: "E-commerce",
    title: "Cynthia Makes",
    description:
      "E-commerce specialized in makeup and beauty products with modern interface, advanced filtering system and optimized shopping experience.",
    imageUrl:
      "https://res.cloudinary.com/dzwfuzxxw/image/upload/v1748972944/2025-06-03_13-54_aj7yd0.png",
    imageAlt: "Cynthia Makes e-commerce",
    category: "web",
    tags: ["TypeScript", "React", "Vite", "Tailwind CSS"],
    accent: "cream",
  },
  {
    id: 3,
    label: "Comparison",
    title: "Comparate",
    description:
      "Car comparison website based on FIPE table with detailed price analysis, technical specifications and value history.",
    imageUrl:
      "https://res.cloudinary.com/dzwfuzxxw/image/upload/v1748972944/comparate_ea3kgx.png",
    imageAlt: "Comparate car comparison",
    category: "web",
    tags: ["React", "Express", "API REST"],
    accent: "rust",
  },
  {
    id: 4,
    label: "Literature",
    title: "Folheando",
    description:
      "Book evaluation and discovery platform with review system, personalized recommendations and reader community.",
    imageUrl:
      "https://res.cloudinary.com/dzwfuzxxw/image/upload/v1748972944/folheando_u5ifrg.png",
    imageAlt: "Folheando books",
    category: "web",
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    accent: "gold",
  },
  {
    id: 5,
    label: "Music",
    title: "PlayOff",
    description:
      "Real-time music battle with dynamic voting system, real-time ranking and interactive interface for music competitions.",
    imageUrl:
      "https://res.cloudinary.com/vicentimartins/image/upload/c_crop,g_center,w_0.98,h_0.85,fl_relative/v1774622830/d9f3e816-cba4-40fd-a9d2-abc59930898e.png",
    imageAlt: "PlayOff music battles",
    category: "web",
    tags: ["JavaScript", "Vue.js", "Node.js"],
    accent: "blood",
  },
  {
    id: 6,
    label: "Education",
    title: "Ksim",
    description:
      "Online and in-person testing platform with artificial intelligence for automated assessment and enhanced educational experience.",
    imageUrl:
      "https://res.cloudinary.com/dzwfuzxxw/image/upload/v1763477153/Captura_de_tela_de_2025-11-14_15-48-41_hnrejk.png",
    imageAlt: "Ksim assessment platform",
    category: "web",
    tags: ["React", "TypeScript", "AI"],
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
  { name: "instagram", url: "https://instagram.com/jvc.martinss", label: "Jota Chaves Instagram" }
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
