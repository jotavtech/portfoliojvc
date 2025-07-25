export type Project = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  category: "web" | "ui" | "branding";
  tags: string[];
  url?: string;
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
    title: "PlayOff",
    description: "Real-time music battle with dynamic voting system, real-time ranking and interactive interface for music competitions.",
    imageUrl: "",
    imageAlt: "PlayOff application for music voting",
    category: "web",
    tags: ["JavaScript", "Vue.js", "Node.js"],
    url: "https://exemplo.com/playoff"
  },
  {
    id: 2,
    title: "Cynthia Makes",
    description: "E-commerce specialized in makeup and beauty products with modern interface, advanced filtering system and optimized shopping experience.",
    imageUrl: "",
    imageAlt: "Cynthia Makes E-commerce - Makeup Products",
    category: "web",
    tags: ["TypeScript", "React", "Vite", "Tailwind CSS"],
    url: "https://exemplo.com/cynthia-makes"
  },
  {
    id: 3,
    title: "Comparate",
    description: "Car comparison website based on FIPE table with detailed price analysis, technical specifications and value history.",
    imageUrl: "",
    imageAlt: "Comparate - Car Comparison by FIPE Table",
    category: "web",
    tags: ["React", "Express", "API REST"],
    url: "https://exemplo.com/comparate"
  },
  {
    id: 4,
    title: "Folheando",
    description: "Book evaluation and discovery platform with review system, personalized recommendations and reader community.",
    imageUrl: "",
    imageAlt: "Folheando - Book Evaluation and Discovery",
    category: "web",
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    url: "https://exemplo.com/folheando"
  },
  {
    id: 5,
    title: "DashMEBoard",
    description: "Modern and intuitive dashboard for data management with responsive interface and advanced visualization features.",
    imageUrl: "",
    imageAlt: "Modern dashboard for data management",
    category: "web",
    tags: ["Blade", "Laravel", "MariaDB"],
    url: "https://exemplo.com/dashboard"
  }
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
