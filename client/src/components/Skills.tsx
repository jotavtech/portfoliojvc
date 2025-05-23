import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";
import { skillBars, skillCategories, tools } from "@/lib/constants";
import { motion } from "framer-motion";
import { Code, Database, Server, PenTool } from "lucide-react";

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
      case 'code':
        return <Code className="w-12 h-12 text-gray-500 mb-4" />;
      case 'database':
        return <Database className="w-12 h-12 text-gray-500 mb-4" />;
      case 'server':
        return <Server className="w-12 h-12 text-gray-500 mb-4" />;
      case 'paintBrush':
        return <PenTool className="w-12 h-12 text-gray-500 mb-4" />;
      default:
        return <Code className="w-12 h-12 text-gray-500 mb-4" />;
    }
  };

  return (
    <motion.section 
      id="skills" 
      className="py-20 relative overflow-hidden"
      style={{ backgroundColor: "#87CEEB" }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/5 rounded-full"
            style={{
              width: Math.random() * 200 + 50,
              height: Math.random() * 200 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          ref={ref}
          className="max-w-2xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-xl uppercase tracking-widest text-secondary font-bold mb-3"
            whileInView={{ opacity: 1, scale: [0.8, 1.2, 1] }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            MINHAS HABILIDADES
          </motion.h2>
          <motion.h3 
            className="text-4xl md:text-5xl font-black mb-6 text-white drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            EXPERTISE & TECNOLOGIAS
          </motion.h3>
          <motion.p 
            className="text-white/90 text-lg font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Desenvolvimento de soluções modernas e otimizadas utilizando as mais recentes tecnologias.
          </motion.p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-10">
          <div className="grid grid-cols-2 gap-4">
            {skillBars.map((skill, index) => (
              <motion.div
                key={index}
                className="bg-white/20 backdrop-blur-sm p-4 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
              >
                <h4 className="text-lg font-bold text-white mb-2">{skill.name}</h4>
                <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-secondary rounded-full"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "100%" } : { width: 0 }}
                    transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {skillCategories.map((category, index) => (
              <motion.div 
                key={index}
                className="p-6 bg-white/10 backdrop-blur-sm rounded-xl shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                whileHover={{ 
                  scale: 1.03, 
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
                }}
              >
                {getSkillIcon(category.iconName)}
                <h4 className="text-xl font-bold mb-2 text-white">{category.title}</h4>
                <p className="text-white/90 font-medium">{category.description}</p>
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
              className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl shadow-xl"
              variants={item}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
              }}
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">{tool.name.charAt(0)}</span>
              </div>
              <h5 className="font-bold text-white">{tool.name}</h5>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
