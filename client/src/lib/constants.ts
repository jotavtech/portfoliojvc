import { ExternalLink, Github, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

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
    title: "Portfólio Premium",
    description: "Portfólio profissional de alto padrão com animações avançadas, design moderno e experiência interativa imersiva.",
    imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3",
    imageAlt: "Portfólio premium com animações elegantes",
    category: "web",
    tags: ["React", "TypeScript", "Framer Motion", "TailwindCSS"],
    url: "https://exemplo.com/portfolio-premium"
  },
  {
    id: 2,
    title: "Portfólio Minimalista",
    description: "Design minimalista com foco na experiência do usuário, apresentando conteúdo de forma clara e direta com animações sutis.",
    imageUrl: "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&q=80&w=1480&ixlib=rb-4.0.3",
    imageAlt: "Portfolio com design minimalista e elegante",
    category: "web",
    tags: ["React", "JavaScript", "GSAP", "Styled Components"],
    url: "https://exemplo.com/portfolio-minimalista"
  },
  {
    id: 3,
    title: "E-Commerce Completo",
    description: "Plataforma de e-commerce desenvolvida com tecnologias modernas, incluindo sistema de pagamento, carrinho, e painel administrativo.",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3",
    imageAlt: "Plataforma de e-commerce com design moderno",
    category: "web",
    tags: ["Next.js", "Node.js", "MongoDB", "Stripe"],
    url: "https://exemplo.com/ecommerce"
  },
  {
    id: 4,
    title: "Site para Casa de Massagem",
    description: "Site moderno e elegante para um spa de massagem, com sistema de agendamento online e área do cliente.",
    imageUrl: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3",
    imageAlt: "Website para casa de massagem com design relaxante",
    category: "web",
    tags: ["React", "Express", "PostgreSQL", "Calendly API"],
    url: "https://exemplo.com/casa-massagem"
  },
  {
    id: 5,
    title: "Marketplace de Templates",
    description: "Plataforma de venda de templates para websites, com sistema de preview, download e áreas de membros.",
    imageUrl: "https://images.unsplash.com/photo-1481487196290-c152efe083f5?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3",
    imageAlt: "Marketplace de templates com vários designs",
    category: "web",
    tags: ["React", "Firebase", "Stripe", "Redux"],
    url: "https://exemplo.com/marketplace-templates"
  },
  {
    id: 6,
    title: "Dashboard Administrativo",
    description: "Painel administrativo completo com gráficos interativos, sistema de usuários e gerenciamento de conteúdo.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3",
    imageAlt: "Dashboard administrativo em um monitor",
    category: "web",
    tags: ["TypeScript", "React", "Node.js", "D3.js"],
    url: "https://exemplo.com/dashboard"
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
