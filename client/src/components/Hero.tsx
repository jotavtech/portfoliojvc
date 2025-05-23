import { motion } from "framer-motion";
import { socialLinks } from "@/lib/constants";
import { ExternalLink, Github, Instagram, Linkedin, Code, Server, Database, PenTool } from "lucide-react";

export default function Hero() {
  const getSocialIcon = (name: string) => {
    switch (name) {
      case "linkedin":
        return <Linkedin size={20} />;
      case "github":
        return <Github size={20} />;
      case "instagram":
        return <Instagram size={20} />;
      case "dribbble":
        return <ExternalLink size={20} />;
      default:
        return <ExternalLink size={20} />;
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center pt-20 bg-background">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h5 className="text-lg red-gradient font-medium">Olá, eu sou</h5>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              João Vitor <span className="red-gradient">Chaves</span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-muted-foreground">Desenvolvedor de Software</h2>
            <p className="text-muted-foreground max-w-lg">
              Especialista em TypeScript, React, Node, HTML, CSS, JavaScript, Docker, Bancos de Dados, Figma, Framer e Bubble.
            </p>
            
            <div className="flex flex-wrap gap-6 pt-2">
              <div className="flex items-center space-x-2 text-secondary">
                <Code size={18} />
                <span>TypeScript</span>
              </div>
              <div className="flex items-center space-x-2 text-secondary">
                <Server size={18} />
                <span>Docker</span>
              </div>
              <div className="flex items-center space-x-2 text-secondary">
                <Database size={18} />
                <span>SQL/NoSQL</span>
              </div>
              <div className="flex items-center space-x-2 text-secondary">
                <PenTool size={18} />
                <span>Figma/Framer</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 pt-6">
              <a 
                href="#projects" 
                className="px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-all shadow-lg red-glow"
              >
                Ver projetos
              </a>
              <a 
                href="#contact" 
                className="px-6 py-3 bg-muted border border-border rounded-lg hover:border-secondary hover:text-secondary transition-all"
              >
                Entrar em contato
              </a>
            </div>
            <div className="flex space-x-6 pt-6">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.url} 
                  className="text-muted-foreground hover:text-secondary transition-colors"
                  aria-label={link.label}
                >
                  {getSocialIcon(link.name)}
                </a>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div 
              className="w-full aspect-square rounded-xl shadow-xl bg-red-600 overflow-hidden relative"
            >
              <img 
                src="https://framerusercontent.com/images/48taPCMYbMhKvt3By8zyGNNPZ0.jpg" 
                alt="João Vitor Chaves - Design" 
                className="w-full h-full object-cover absolute opacity-30 mix-blend-hard-light"
              />
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <img 
                  src="https://framerusercontent.com/images/Mf8ODxm0XnyBmqNuMnFYZIclU.png" 
                  alt="Design elements" 
                  className="max-w-full max-h-full"
                />
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-accent rounded-lg -z-10 opacity-80"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-secondary rounded-lg -z-10 opacity-80"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
