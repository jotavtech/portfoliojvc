import { motion } from "framer-motion";
import { socialLinks } from "@/lib/constants";
import { ExternalLink, Github, Instagram, Linkedin } from "lucide-react";

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
    <section id="home" className="min-h-screen flex items-center pt-20 hero-background">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h5 className="text-lg gradient-text font-medium">Olá, eu sou</h5>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              João Vitor <span className="gradient-text">Chaves</span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-muted-foreground">Designer & Desenvolvedor</h2>
            <p className="text-muted-foreground max-w-lg">
              Criando experiências digitais impactantes através do design e desenvolvimento, focados em usabilidade e estética.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a 
                href="#projects" 
                className="px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-all shadow-lg glow"
              >
                Ver projetos
              </a>
              <a 
                href="#contact" 
                className="px-6 py-3 bg-white border border-border rounded-lg hover:border-secondary hover:text-secondary transition-all shadow-lg"
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
            <img 
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&h=900" 
              alt="João Vitor Chaves" 
              className="w-full h-auto rounded-2xl shadow-xl card-shadow"
            />
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-accent rounded-lg -z-10 opacity-80"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-secondary rounded-lg -z-10 opacity-80"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
