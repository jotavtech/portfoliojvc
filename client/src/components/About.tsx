import { motion, useMotionValue, useSpring } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";
import { useEffect, useState, useRef } from "react";

export default function About() {
  const { ref, isInView } = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Mouse position para efeito de desfoque
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Valor suavizado para movimento mais natural
  const springConfig = { damping: 25, stiffness: 700 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);
  
  // Acompanha movimento do mouse dentro da seção
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const section = sectionRef.current;
      if (!section) return;
      
      // Calcular posição relativa ao elemento
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      mouseX.set(x);
      mouseY.set(y);
    };
    
    const section = sectionRef.current;
    if (section) {
      section.addEventListener("mousemove", handleMouseMove);
    }
    
    return () => {
      if (section) {
        section.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [mouseX, mouseY]);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
      style={{ backgroundColor: "#87CEEB" }}
    >
      {/* Blur spotlight that follows the mouse */}
      <motion.div
        className="absolute bg-secondary/20 rounded-full blur-3xl pointer-events-none"
        style={{
          width: 400,
          height: 400,
          x: smoothMouseX,
          y: smoothMouseY,
          transform: "translate(-50%, -50%)",
          opacity: 0.6,
          mixBlendMode: "lighten"
        }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.h1
          className="text-5xl md:text-7xl font-black mb-16 text-white text-center drop-shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          SOBRE <span className="text-secondary">MIM</span>
        </motion.h1>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div 
            ref={ref}
            className={cn(
              "relative reveal-element",
              isInView && "active"
            )}
          >
            <motion.div 
              whileHover={{ 
                scale: 1.02,
                filter: "brightness(1.1)",
                transition: { duration: 0.3 } 
              }}
              onHoverStart={() => setHoveredElement("image")}
              onHoverEnd={() => setHoveredElement(null)}
            >
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&h=900" 
                alt="Jota Chaves no estúdio" 
                className="w-full h-auto rounded-xl shadow-xl"
                style={{ 
                  filter: hoveredElement && hoveredElement !== "image" ? "blur(5px) brightness(0.8)" : "none",
                  transition: "filter 0.5s ease-in-out"
                }}
              />
            </motion.div>
            
            <motion.div 
              className="absolute -top-5 -left-5 bg-white/90 backdrop-blur-sm p-5 rounded-lg shadow-xl"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileHover={{ 
                scale: 1.1, 
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              onHoverStart={() => setHoveredElement("exp")}
              onHoverEnd={() => setHoveredElement(null)}
              style={{ 
                filter: hoveredElement && hoveredElement !== "exp" ? "blur(3px)" : "none",
                transition: "filter 0.5s ease-in-out, transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out"
              }}
            >
              <p className="text-5xl font-black text-secondary">7+</p>
              <p className="text-sm font-semibold text-black">Anos de Experiência</p>
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-5 -right-5 bg-white/90 backdrop-blur-sm p-5 rounded-lg shadow-xl"
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              whileHover={{ 
                scale: 1.1, 
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              onHoverStart={() => setHoveredElement("proj")}
              onHoverEnd={() => setHoveredElement(null)}
              style={{ 
                filter: hoveredElement && hoveredElement !== "proj" ? "blur(3px)" : "none",
                transition: "filter 0.5s ease-in-out, transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out"
              }}
            >
              <p className="text-5xl font-black text-secondary">50+</p>
              <p className="text-sm font-semibold text-black">Projetos Concluídos</p>
            </motion.div>
          </div>
          
          <motion.div 
            className={cn(
              "space-y-6 reveal-element bg-white/10 backdrop-blur-sm p-8 rounded-xl shadow-xl",
              isInView && "active"
            )}
            whileHover={{ 
              scale: 1.02,
              backgroundColor: "rgba(255, 255, 255, 0.2)"
            }}
            style={{ 
              filter: hoveredElement && hoveredElement !== "text" ? "blur(3px)" : "none",
              transition: "filter 0.5s ease-in-out, transform 0.3s ease-in-out" 
            }}
            onHoverStart={() => setHoveredElement("text")}
            onHoverEnd={() => setHoveredElement(null)}
          >
            <motion.h2 
              className="text-xl uppercase tracking-widest text-secondary font-bold"
              whileHover={{ scale: 1.05, x: 5 }}
            >
              QUEM SOU EU
            </motion.h2>
            
            <motion.h3 
              className="text-3xl md:text-4xl font-black text-white drop-shadow-md"
              whileHover={{ scale: 1.02 }}
            >
              Desenvolvedor com paixão por criar experiências digitais impactantes
            </motion.h3>
            
            <motion.p className="text-white/90 font-medium backdrop-blur-sm bg-black/10 p-4 rounded-lg">
              Olá! Sou Jota, desenvolvedor com base em São Paulo, Brasil. Há mais de 7 anos, tenho trabalhado na criação de experiências digitais que combinam estética e funcionalidade.
            </motion.p>
            
            <motion.p className="text-white/90 font-medium backdrop-blur-sm bg-black/10 p-4 rounded-lg">
              Minha especialidade é desenvolver interfaces interativas e dinâmicas, utilizando as mais recentes tecnologias como TypeScript, React e Node.js, sempre buscando soluções eficientes e escaláveis.
            </motion.p>
            
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div 
                className="bg-white/20 backdrop-blur-sm p-4 rounded-lg"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
              >
                <h4 className="text-xl font-bold mb-2 text-secondary">Educação</h4>
                <ul className="space-y-2 text-white font-medium">
                  <li className="bg-black/10 p-2 rounded">Bacharelado em Ciência da Computação - 2016</li>
                  <li className="bg-black/10 p-2 rounded">Mestrado em Desenvolvimento Web - 2018</li>
                </ul>
              </motion.div>
              
              <motion.div 
                className="bg-white/20 backdrop-blur-sm p-4 rounded-lg"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
              >
                <h4 className="text-xl font-bold mb-2 text-secondary">Experiência</h4>
                <ul className="space-y-2 text-white font-medium">
                  <li className="bg-black/10 p-2 rounded">Dev Sênior - Tech Solutions, 2020-Presente</li>
                  <li className="bg-black/10 p-2 rounded">Fullstack Dev - WebStudio, 2018-2020</li>
                  <li className="bg-black/10 p-2 rounded">Frontend Dev - Digital Agency, 2016-2018</li>
                </ul>
              </motion.div>
            </div>
            
            <motion.a 
              href="#contact" 
              className="inline-block px-8 py-4 bg-secondary text-white rounded-lg shadow-xl font-bold text-lg"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              ENTRE EM CONTATO
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
