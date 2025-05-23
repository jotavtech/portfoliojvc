import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";
import { skillBars, skillCategories, tools } from "@/lib/constants";
import SkillBar from "./ui/skill-bar";
import { motion } from "framer-motion";
import { Code, Layout, Smartphone, Palette } from "lucide-react";

export default function Skills() {
  const { ref, isInView } = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const getSkillIcon = (iconName: string) => {
    switch (iconName) {
      case 'web-design':
        return <Layout className="w-10 h-10 text-secondary mb-4" />;
      case 'app-design':
        return <Smartphone className="w-10 h-10 text-secondary mb-4" />;
      case 'frontend-dev':
        return <Code className="w-10 h-10 text-secondary mb-4" />;
      case 'branding':
        return <Palette className="w-10 h-10 text-secondary mb-4" />;
      default:
        return <Code className="w-10 h-10 text-secondary mb-4" />;
    }
  };

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div 
          ref={ref}
          className={cn(
            "max-w-2xl mx-auto text-center mb-16 reveal-element",
            isInView && "active"
          )}
        >
          <h2 className="text-sm uppercase tracking-widest gradient-text font-semibold mb-4">
            Minhas habilidades
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            Expertise & Competências
          </h3>
          <p className="text-muted-foreground">
            Combinando criatividade com conhecimento técnico para entregar soluções de design eficazes e inovadoras.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-8">
            {skillBars.map((skill, index) => (
              <SkillBar 
                key={index} 
                name={skill.name} 
                percentage={skill.percentage} 
                isVisible={isInView}
                delay={index * 0.2}
              />
            ))}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {skillCategories.map((category, index) => (
              <motion.div 
                key={index}
                className="p-6 bg-muted rounded-xl card-shadow hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              >
                {getSkillIcon(category.iconName)}
                <h4 className="text-xl font-bold mb-2">{category.title}</h4>
                <p className="text-muted-foreground text-sm">{category.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
        
        <motion.div 
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {tools.map((tool, index) => (
            <motion.div 
              key={index}
              className="text-center p-6 hover:transform hover:scale-105 transition-transform bg-white rounded-lg card-shadow"
              variants={item}
            >
              <img 
                src={tool.icon} 
                alt={tool.name} 
                className="w-16 h-16 mx-auto mb-4" 
              />
              <h5 className="font-medium">{tool.name}</h5>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
