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
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h5 
              className="text-xl red-gradient font-bold uppercase tracking-wider"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Olá, eu sou
            </motion.h5>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-black leading-tight tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              JOÃO VITOR <span className="red-gradient">CHAVES</span>
            </motion.h1>
            
            <motion.h2 
              className="text-3xl md:text-4xl text-muted-foreground font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              DESENVOLVEDOR DE SOFTWARE
            </motion.h2>
            
            <motion.p 
              className="text-xl text-muted-foreground max-w-lg font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Especialista em TypeScript, React, Node, HTML, CSS, JavaScript, Docker, Bancos de Dados, Figma, Framer e Bubble.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-6 pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {[
                { icon: <Code size={24} />, text: "TypeScript" },
                { icon: <Server size={24} />, text: "Docker" },
                { icon: <Database size={24} />, text: "SQL/NoSQL" },
                { icon: <PenTool size={24} />, text: "Figma/Framer" }
              ].map((skill, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center space-x-2 text-secondary font-bold text-lg"
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {skill.icon}
                  <span>{skill.text}</span>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              className="flex flex-wrap gap-4 pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <motion.a 
                href="#projects" 
                className="px-8 py-4 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-all shadow-lg red-glow text-xl font-bold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                VER PROJETOS
              </motion.a>
              <motion.a 
                href="#contact" 
                className="px-8 py-4 bg-muted border border-border rounded-lg hover:border-secondary hover:text-secondary transition-all text-xl font-bold"
                whileHover={{ scale: 1.05, borderColor: "hsl(var(--secondary))" }}
                whileTap={{ scale: 0.95 }}
              >
                CONTATO
              </motion.a>
            </motion.div>
            
            <motion.div 
              className="flex space-x-8 pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              {socialLinks.map((link, index) => (
                <motion.a 
                  key={index}
                  href={link.url} 
                  className="text-muted-foreground hover:text-secondary transition-colors"
                  aria-label={link.label}
                  whileHover={{ scale: 1.2, color: "hsl(var(--secondary))" }}
                  whileTap={{ scale: 0.9 }}
                >
                  {getSocialIcon(link.name)}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div 
              className="w-full aspect-square rounded-xl shadow-xl overflow-hidden relative bg-[#87CEEB]"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img 
                src="/image_1748031086511.png" 
                alt="João Vitor Chaves - Design" 
                className="w-full h-full object-contain absolute"
              />
            </motion.div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-accent rounded-lg -z-10 opacity-80"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-secondary rounded-lg -z-10 opacity-80"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
