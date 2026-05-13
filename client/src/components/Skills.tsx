import { motion } from "framer-motion";
import { useIntersectionObserver } from "../hooks/use-intersection-observer.js";
import InfiniteScroll from "./InfiniteScroll";
import SpotlightCard from "./SpotlightCard";
import SplitText from "./SplitText";
import MagnetLines from "./MagnetLines";
import { Code2, Database, Palette, Server, Globe, Smartphone, Layers, Cpu, Cloud, Wrench } from "lucide-react";

const skills = [
  { name: "React", level: "Advanced", icon: <Code2 className="w-8 h-8" />, color: "#61DAFB", description: "Components, Hooks, Context" },
  { name: "JavaScript", level: "Advanced", icon: <Globe className="w-8 h-8" />, color: "#F7DF1E", description: "ES6+, Async/Await, DOM" },
  { name: "TypeScript", level: "Advanced", icon: <Layers className="w-8 h-8" />, color: "#3178C6", description: "Types, Interfaces, Generics" },
  { name: "Laravel", level: "Advanced", icon: <Server className="w-8 h-8" />, color: "#FF2D20", description: "MVC, Eloquent, APIs" },
  { name: "PHP", level: "Advanced", icon: <Cpu className="w-8 h-8" />, color: "#777BB4", description: "OOP, PSR, Composer" },
  { name: "CSS/Tailwind", level: "Advanced", icon: <Palette className="w-8 h-8" />, color: "#06B6D4", description: "Flexbox, Grid, Animations" },
  { name: "Database", level: "Advanced", icon: <Database className="w-8 h-8" />, color: "#336791", description: "MySQL, PostgreSQL, Redis" },
  { name: "Vue.js", level: "Intermediate", icon: <Code2 className="w-8 h-8" />, color: "#4FC08D", description: "Composition API, Vuex" },
  { name: "Deploy", level: "Intermediate", icon: <Cloud className="w-8 h-8" />, color: "#FF6B35", description: "Vercel, Railway, Docker" },
  { name: "Figma", level: "Intermediate", icon: <Wrench className="w-8 h-8" />, color: "#F24E1E", description: "UI Design, Prototyping" },
];

const items = skills.map(skill => ({
  content: (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <div className="text-white mb-2" style={{ color: skill.color }}>{skill.icon}</div>
      <h3 className="text-xl font-bold text-white">{skill.name}</h3>
      <span className="text-xs text-white/50 uppercase tracking-wider mt-1">{skill.level}</span>
    </div>
  )
}));

export default function Skills() {
  const { ref, isInView } = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });

  return (
    <section
      ref={ref}
      className="min-h-screen bg-black py-20 relative overflow-hidden"
    >
      {/* MagnetLines Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
        <MagnetLines 
          rows={12} 
          columns={12} 
          containerSize="100vmin"
          lineColor="var(--primary-hex)"
          lineHeight="20px"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <SplitText 
            text="SKILLS & TECHNOLOGIES"
            className="text-4xl md:text-6xl font-bold text-white mb-6 space-grotesk-bold"
            delay={40}
          />
          <motion.p
            className="text-white/60 text-lg max-w-2xl mx-auto mt-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Tecnologias que domino e utilizo para criar experiências digitais incríveis
          </motion.p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <SpotlightCard 
                className="h-full rounded-none border border-[#1A1A1A] bg-[#0D0D0D]/95 p-6 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                spotlightColor={`${skill.color}40`}
              >
                <motion.div 
                  className="mb-3"
                  style={{ color: skill.color }}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {skill.icon}
                </motion.div>
                <h3 className="text-lg font-bold text-white mb-1">{skill.name}</h3>
                <span 
                  className="text-xs uppercase tracking-wider px-2 py-1 rounded-full inline-block"
                  style={{ 
                    backgroundColor: `${skill.color}20`,
                    color: skill.color 
                  }}
                >
                  {skill.level}
                </span>
                <p className="text-white/50 text-xs mt-2">{skill.description}</p>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Navigation Instructions */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="text-gray-400 text-lg space-grotesk-regular">
            <span className="text-primary font-semibold">💡 Dica:</span> Role o scroll para navegar pelos cards abaixo
          </p>
        </motion.div>

        {/* Infinite Scroll Skills */}
        <motion.div
          className="flex justify-center w-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div style={{height: '500px', position: 'relative', width: '100%'}}>
            <InfiniteScroll
              items={items}
              isTilted={true}
              tiltDirection='left'
              autoplay={true}
              autoplaySpeed={0.05}
              autoplayDirection="down"
              pauseOnHover={true}
              width="40rem"
              itemMinHeight={120}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}