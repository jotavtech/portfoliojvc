import { ExternalLink, Github, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export type Project = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  category: "web" | "ui" | "branding";
  tags: string[];
};

export type SkillCategory = {
  iconName: string;
  title: string;
  description: string;
};

export type SkillBar = {
  name: string;
  percentage: number;
};

export type Tool = {
  name: string;
  icon: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "Atlas Tech Redesign",
    description: "Redesign completo do site da Atlas Tech, melhorando UX e performance.",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&h=700",
    imageAlt: "Website redesign project for tech company",
    category: "web",
    tags: ["Web Design", "React"]
  },
  {
    id: 2,
    title: "Finova App UI",
    description: "Design de interface para aplicativo de finanças pessoais com foco em clareza visual.",
    imageUrl: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&h=700",
    imageAlt: "Mobile app UI design for finance application",
    category: "ui",
    tags: ["UI/UX", "Figma"]
  },
  {
    id: 3,
    title: "EcoFarm Branding",
    description: "Identidade visual para marca de produtos orgânicos, incluindo logo e materiais de marketing.",
    imageUrl: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&h=700",
    imageAlt: "Brand identity for organic food company",
    category: "branding",
    tags: ["Branding", "Illustrator"]
  },
  {
    id: 4,
    title: "ModaStore E-commerce",
    description: "Plataforma de e-commerce para marca de moda, com experiência de compra otimizada.",
    imageUrl: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&h=700",
    imageAlt: "E-commerce website design for fashion brand",
    category: "web",
    tags: ["Web Design", "Shopify"]
  },
  {
    id: 5,
    title: "DataView Dashboard",
    description: "Interface de dashboard para visualização de dados complexos com gráficos interativos.",
    imageUrl: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&h=700",
    imageAlt: "Dashboard UI design for analytics platform",
    category: "ui",
    tags: ["UI/UX", "React"]
  },
  {
    id: 6,
    title: "Casa Italia Branding",
    description: "Identidade visual para restaurante italiano, incluindo menu, cartões e sinalização.",
    imageUrl: "https://images.unsplash.com/photo-1557053503-0c252e19d34b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&h=700",
    imageAlt: "Restaurant branding and identity package",
    category: "branding",
    tags: ["Branding", "Photoshop"]
  }
];

export const skillBars: SkillBar[] = [
  { name: "UI/UX Design", percentage: 95 },
  { name: "HTML/CSS", percentage: 90 },
  { name: "JavaScript/React", percentage: 85 },
  { name: "Figma/Adobe XD", percentage: 92 }
];

export const skillCategories: SkillCategory[] = [
  {
    iconName: "web-design",
    title: "Web Design",
    description: "Criação de websites responsivos com foco em usabilidade e estética."
  },
  {
    iconName: "app-design",
    title: "App Design",
    description: "Design de interfaces intuitivas para aplicativos iOS e Android."
  },
  {
    iconName: "frontend-dev",
    title: "Frontend Dev",
    description: "Desenvolvimento de interfaces dinâmicas com HTML, CSS e JavaScript."
  },
  {
    iconName: "branding",
    title: "Branding",
    description: "Criação de identidades visuais memoráveis e consistentes para marcas."
  }
];

export const tools: Tool[] = [
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Photoshop", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg" },
  { name: "Illustrator", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" }
];

export type SocialLink = {
  name: string;
  url: string;
  label: string;
};

export const socialLinks: SocialLink[] = [
  { name: "linkedin", url: "#", label: "LinkedIn" },
  { name: "github", url: "#", label: "GitHub" },
  { name: "instagram", url: "#", label: "Instagram" },
  { name: "dribbble", url: "#", label: "Dribbble" }
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
    content: "São Paulo, Brasil" 
  },
  { 
    icon: "email",
    title: "Email",
    content: "contato@joaovitorchaves.com" 
  },
  { 
    icon: "phone",
    title: "Telefone",
    content: "+55 11 98765-4321" 
  }
];
