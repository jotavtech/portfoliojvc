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
    description: "Batalha de músicas em tempo real com sistema de votação dinâmica, ranking em tempo real e interface interativa para competições musicais.",
    imageUrl: "https://res.cloudinary.com/dzwfuzxxw/image/upload/v1748972944/2025-06-03_12-50_iodj9l.png",
    imageAlt: "Aplicação PlayOff para votação de músicas",
    category: "web",
    tags: ["JavaScript", "Vue.js", "Node.js"],
    url: "https://exemplo.com/playoff"
  },
  {
    id: 2,
    title: "Cynthia Makes",
    description: "Plataforma moderna para showcase de projetos criativos com galeria interativa, sistema de categorização e interface responsiva elegante.",
    imageUrl: "https://res.cloudinary.com/dzwfuzxxw/image/upload/v1748972944/2025-06-03_13-54_aj7yd0.png",
    imageAlt: "Plataforma Cynthia Makes E-commerce de produtos de beleza",
    category: "web",
    tags: ["TypeScript", "React", "Vite", "Tailwind CSS"],
    url: "https://exemplo.com/cynthia-makes"
  },
  {
    id: 3,
    title: "Comparate",
    description: "Plataforma de comparação de produtos com sistema de filtros avançados, análise de preços e recomendações inteligentes.",
    imageUrl: "https://res.cloudinary.com/dzwfuzxxw/image/upload/v1748972944/comparate_ea3kgx.png",
    imageAlt: "Plataforma Comparate para comparação de Veículos",
    category: "web",
    tags: ["React", "Express", "API REST"],
    url: "https://exemplo.com/comparate"
  },
  {
    id: 4,
    title: "Folheando",
    description: "Aplicação moderna para leitura e organização de livros digitais com interface intuitiva e recursos avançados de navegação.",
    imageUrl: "https://res.cloudinary.com/dzwfuzxxw/image/upload/v1748972944/folheando_u5ifrg.png",
    imageAlt: "Aplicativo Folheando para leitura digital",
    category: "web",
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    url: "https://exemplo.com/folheando"
  },
  {
    id: 5,
    title: "Portfolio Atualizado",
    description: "Portfolio pessoal moderno com design responsivo, animações fluidas e interface interativa desenvolvida com as mais recentes tecnologias web.",
    imageUrl: "https://res.cloudinary.com/dzwfuzxxw/image/upload/v1753137375/2025-07-21_19-35_b1mbvm.png",
    imageAlt: "Portfolio pessoal moderno e responsivo",
    category: "web",
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"],
    url: "https://exemplo.com/portfolio"
  }
];

export const skillCategories: SkillCategory[] = [
  {
    iconName: "code",
    title: "Desenvolvimento Frontend",
    description: "Criação de interfaces modernas com React e TypeScript, focando em experiências interativas e responsivas."
  },
  {
    iconName: "database",
    title: "Banco de Dados",
    description: "Experiência com modelagem e gestão de bancos de dados SQL e NoSQL para aplicações escaláveis."
  },
  {
    iconName: "design",
    title: "Design & Prototipagem",
    description: "Criação de protótipos e designs no Figma, com animações avançadas usando Framer Motion."
  },
  {
    iconName: "dev",
    title: "Desenvolvimento Web",
    description: "Desenvolvimento full-stack com foco em TypeScript e React para criar aplicações robustas e performáticas."
  }
];

export const tools = [
  { name: "React", icon: "react" },
  { name: "TypeScript", icon: "typescript" },
  { name: "Banco de Dados", icon: "database" },
  { name: "Figma", icon: "figma" },
  { name: "Framer", icon: "framer" },
  { name: "Prototipagem", icon: "prototype" }
];

export type SocialLink = {
  name: string;
  url: string;
  label: string;
};

export const socialLinks: SocialLink[] = [
  { name: "linkedin", url: "https://www.linkedin.com/in/joão-vitor-chaves-761b102b5/", label: "LinkedIn de Jota Chaves" },
  { name: "github", url: "https://github.com/jotavtech", label: "GitHub de Jota Chaves" },
  { name: "instagram", url: "https://instagram.com/jvc.martinss", label: "Instagram de Jota Chaves" }
];

export type ContactInfo = {
  icon: string;
  title: string;
  content: string;
};

export const contactInfo: ContactInfo[] = [
  { 
    icon: "location",
    title: "Localização",
    content: "João Pessoa, Brasil" 
  },
  { 
    icon: "email",
    title: "Email",
    content: "martinsjoao1227@gmail.com" 
  },
  { 
    icon: "phone",
    title: "Telefone",
    content: "+55 83 99929-0376" 
  }
];
