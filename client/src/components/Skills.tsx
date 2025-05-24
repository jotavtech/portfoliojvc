import { useIntersectionObserver } from "../hooks/use-intersection-observer.js";
import { motion } from "framer-motion";
import { Code, Database, Paintbrush, Layers, BrainCircuit, Figma } from "lucide-react";
import { skillCategories, tools } from "../lib/constants.js";

export default function Skills() {
  const { ref, isInView } = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });

  const getSkillIcon = (iconName: string) => {
    switch (iconName) {
      case 'code':
        return <Code className="w-12 h-12 text-secondary mb-4" />;
      case 'database':
        return <Database className="w-12 h-12 text-secondary mb-4" />;
      case 'design':
        return <Paintbrush className="w-12 h-12 text-secondary mb-4" />;
      case 'dev':
        return <BrainCircuit className="w-12 h-12 text-secondary mb-4" />;
      default:
        return <Layers className="w-12 h-12 text-secondary mb-4" />;
    }
  };

  const getToolIcon = (iconName: string) => {
    switch (iconName) {
      case 'figma':
        return <Figma className="w-8 h-8 text-secondary" />;
      case 'framer':
        return <motion.div className="w-8 h-8 text-secondary font-bold">Fr</motion.div>;
      case 'typescript':
        return <motion.div className="w-8 h-8 text-secondary font-bold">Ts</motion.div>;
      case 'react':
        return <motion.div className="w-8 h-8 text-secondary font-bold">Re</motion.div>;
      case 'database':
        return <Database className="w-8 h-8 text-secondary" />;
      default:
        return <Layers className="w-8 h-8 text-secondary" />;
    }
  };

  return (
    <section id="skills" className="py-20 relative overflow-hidden bg-black">
      <div className="container mx-auto px-6">
        <motion.div 
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 className="text-xl uppercase tracking-widest text-secondary font-bold mb-3">
            MINHAS HABILIDADES
          </motion.h2>
          <motion.h3 className="text-4xl md:text-5xl font-black mb-6 text-white">
            EXPERTISE & TECNOLOGIAS
          </motion.h3>
        </motion.div>

        {/* Skill Categories */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {skillCategories.map((category, index: number) => (
            <motion.div
              key={index}
              className="p-6 bg-white/5 backdrop-blur-sm rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
              whileHover={{ 
                scale: 1.02,
                backgroundColor: "rgba(255, 255, 255, 0.1)"
              }}
            >
              {getSkillIcon(category.iconName)}
              <h4 className="text-xl font-bold mb-2 text-white">{category.title}</h4>
              <p className="text-white/80">{category.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Tools Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {tools.map((tool, index: number) => (
            <motion.div
              key={index}
              className="flex flex-col items-center justify-center p-4 bg-white/5 backdrop-blur-sm rounded-xl"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.1)"
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
            >
              {getToolIcon(tool.icon)}
              <span className="mt-2 text-white font-medium">{tool.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}