import { useIntersectionObserver } from "../hooks/use-intersection-observer.js";
import { motion } from "framer-motion";
import FlowingMenu from "./FlowingMenu";
import "./FlowingMenu.css";

export default function Skills() {
  const { ref, isInView } = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });

  // Dados das habilidades para o FlowingMenu
  const skillItems = [
    { 
      link: '#', 
      text: 'React & TypeScript', 
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop' 
    },
    { 
      link: '#', 
      text: 'Frontend Development', 
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop' 
    },
    { 
      link: '#', 
      text: 'UI/UX Design', 
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop' 
    },
    { 
      link: '#', 
      text: 'Database Management', 
      image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&h=400&fit=crop' 
    },
    { 
      link: '#', 
      text: 'Backend com Node.js', 
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop' 
    },
    { 
      link: '#', 
      text: 'Responsive Design', 
      image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&h=400&fit=crop' 
    }
  ];

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
          <motion.h2 className="text-xl uppercase tracking-widest text-white font-bold mb-3">
            MINHAS HABILIDADES
          </motion.h2>
          <motion.h3 className="text-4xl md:text-5xl font-black mb-6 text-white">
            EXPERTISE & TECNOLOGIAS
          </motion.h3>
        </motion.div>

        {/* FlowingMenu com habilidades */}
        <motion.div 
          className="h-[600px] relative"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <FlowingMenu items={skillItems} />
        </motion.div>
      </div>
    </section>
  );
}