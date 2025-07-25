import { motion } from "framer-motion";
import { useIntersectionObserver } from "../hooks/use-intersection-observer.js";
import InfiniteScroll from "./InfiniteScroll";

const skills = [
  { name: "Database", level: "Advanced" },
  { name: "JavaScript", level: "Advanced" },
  { name: "CSS", level: "Advanced" },
  { name: "React", level: "Advanced" },
  { name: "Vue", level: "Intermediate" },
  { name: "PHP", level: "Advanced" },
  { name: "Blade", level: "Advanced" },
  { name: "Laravel", level: "Advanced" },
  { name: "Deploy", level: "Intermediate" },
  { name: "Figma", level: "Intermediate" },
];

const items = skills.map(skill => ({
  content: (
    <div className="flex flex-col items-center justify-center h-full">
      <h3 className="text-xl font-bold text-[#ff4500]">{skill.name}</h3>
    </div>
  )
}));

export default function Skills() {
  const { ref, isInView } = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });

  return (
    <section
      ref={ref}
      id="skills"
      className="min-h-screen bg-black py-20 relative overflow-hidden"
    >
      {/* Gradiente de fundo removido */}
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 space-grotesk-bold">
            Skills & Technologies
          </h2>
        </motion.div>

        {/* Navigation Instructions */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <p className="text-gray-400 text-lg space-grotesk-regular">
            <span className="text-[#ff4500] font-semibold">💡 Como navegar:</span> Role o scroll do mouse para navegar pelos cards. 
            Passe o mouse sobre os cards para pausar o autoplay.
          </p>
        </motion.div>

        {/* Infinite Scroll Skills */}
        <motion.div
          className="flex justify-center w-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div style={{height: '700px', position: 'relative', width: '100%'}}>
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