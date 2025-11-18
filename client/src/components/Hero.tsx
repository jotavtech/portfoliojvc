import { useRef, useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { ArrowDown } from "lucide-react";

interface HeroProps {
  showSocialLinks: boolean;
  onLogoTransform?: (isTransformed: boolean) => void;
}

export default function Hero({ showSocialLinks, onLogoTransform }: HeroProps) {
  const ref = useRef(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  // Magnetic mouse tracking effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (textContainerRef.current && isHovering) {
        const rect = textContainerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) / 15;
        const deltaY = (e.clientY - centerY) / 15;
        
        setMousePosition({ x: deltaX, y: deltaY });
      }
    };

    if (isHovering) {
      window.addEventListener('mousemove', handleMouseMove);
    } else {
      setMousePosition({ x: 0, y: 0 });
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovering]);
  
  // Notificar Header sobre transformação (mantido para integração)
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (onLogoTransform) {
        onLogoTransform(latest > 0.5);
      }
    });
    return unsubscribe;
  }, [scrollYProgress, onLogoTransform]);

  return (
    <section
      ref={ref}
      id="home"
      className="min-h-screen relative flex justify-center items-center overflow-hidden bg-black"
    >
      {/* Background principal com a imagem fornecida */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dzwfuzxxw/image/upload/v1748037375/assets_task_01jvzj4sa2ehzr6hj5tpxgs2xk_1748037239_img_2_bpw6es.webp')`,
        }}
      />

      {/* Texto "JOTA CHAVES" em cor contrária */}
      <div className="absolute inset-0 flex items-center justify-center select-none z-20">
        <motion.div 
          ref={textContainerRef}
          className="relative cursor-pointer"
          style={{
            width: 'fit-content',
            height: 'fit-content',
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          animate={{
            x: mousePosition.x,
            y: mousePosition.y,
            scale: isHovering ? 1.05 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 15,
            mass: 0.1
          }}
        >
          {/* Texto "JOTA CHAVES" com cor contrária */}
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center">
              {/* (27) removido */}
              <motion.h1
                className="text-9xl md:text-[10rem] lg:text-[13rem] xl:text-[16rem] font-black leading-none tracking-tighter relative z-10 space-grotesk-bold"
                style={{
                  color: '#ff4500',
                  textShadow: '0 0 30px rgba(255, 69, 0, 0.5)',
                  mixBlendMode: 'normal',
                  filter: 'contrast(1.2) brightness(1.1)',
                  transition: 'letter-spacing 0.3s ease, text-shadow 0.3s ease',
                  letterSpacing: isHovering ? '0.05em' : '0em',
                }}
                animate={{
                  textShadow: isHovering 
                    ? '0 0 50px rgba(255, 69, 0, 0.8), 0 0 80px rgba(255, 69, 0, 0.4)' 
                    : '0 0 30px rgba(255, 69, 0, 0.5)',
                  rotateX: isHovering ? mousePosition.y / 5 : 0,
                  rotateY: isHovering ? mousePosition.x / 5 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                JOTA
              </motion.h1>
            </div>
            <motion.h1
              className="text-7xl md:text-8xl lg:text-[10rem] xl:text-[12rem] font-black leading-none tracking-tighter relative z-10 ml-8 md:ml-12 lg:ml-16 xl:ml-20 space-grotesk-bold"
              style={{
                color: '#ff4500',
                textShadow: '0 0 30px rgba(255, 69, 0, 0.5)',
                mixBlendMode: 'normal',
                filter: 'contrast(1.2) brightness(1.1)',
                transition: 'letter-spacing 0.3s ease, text-shadow 0.3s ease',
                letterSpacing: isHovering ? '0.05em' : '0em',
              }}
              animate={{
                textShadow: isHovering 
                  ? '0 0 50px rgba(255, 69, 0, 0.8), 0 0 80px rgba(255, 69, 0, 0.4)' 
                  : '0 0 30px rgba(255, 69, 0, 0.5)',
                rotateX: isHovering ? mousePosition.y / 5 : 0,
                rotateY: isHovering ? mousePosition.x / 5 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              CHAVES
            </motion.h1>
            {/* CircularText abaixo do texto principal */}
            {/* Removido conforme solicitado */}
          </div>
        </motion.div>
      </div>

      {/* Frases laterais */}
      <div className="absolute inset-0 pointer-events-none select-none z-20">
        {/* Freedom - lado esquerdo */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <motion.p 
            className="text-white text-2xl md:text-3xl font-serif italic tracking-wider"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Freedom
          </motion.p>
        </div>

        {/* The Creative - lado direito */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-end">
          <motion.p 
            className="text-white text-2xl md:text-3xl font-serif italic tracking-wider"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            The Creative
          </motion.p>
          {/* (27) removido */}
        </div>
      </div>

      {/* Símbolos "+" espalhados */}
      <div className="absolute inset-0 pointer-events-none select-none z-10">
        {/* + 1 */}
        <motion.div
          className="absolute text-white/30 text-4xl font-bold"
          style={{ top: '20%', left: '15%' }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          +
        </motion.div>
        
        {/* + 2 */}
        <motion.div
          className="absolute text-white/30 text-3xl font-bold"
          style={{ top: '35%', right: '25%' }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          +
        </motion.div>
        
        {/* + 3 */}
        <motion.div
          className="absolute text-white/30 text-5xl font-bold"
          style={{ top: '60%', left: '10%' }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          +
        </motion.div>
        
        {/* + 4 */}
        <motion.div
          className="absolute text-white/30 text-2xl font-bold"
          style={{ top: '75%', right: '15%' }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          +
        </motion.div>
        
        {/* + 5 */}
        <motion.div
          className="absolute text-white/30 text-4xl font-bold"
          style={{ top: '25%', left: '70%' }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          +
        </motion.div>
        
        {/* + 6 */}
        <motion.div
          className="absolute text-white/30 text-3xl font-bold"
          style={{ top: '80%', left: '60%' }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          +
        </motion.div>
      </div>

      {/* Container principal com blur (conteúdo) */}
      <div className="relative z-30 container mx-auto px-6 text-center flex flex-col items-center justify-center min-h-screen">
        {/* Links sociais */}
        {showSocialLinks && (
          <motion.div 
            className="flex justify-center space-x-6 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <a
              href="https://github.com/seu-usuario"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/seu-usuario"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-colors"
            >
              LinkedIn
            </a>
          </motion.div>
        )}
        {/* (27) grande, verde suave, canto inferior direito */}
        <span className="fixed md:absolute bottom-8 right-8 text-[#ff4500] font-extrabold text-7xl md:text-8xl leading-none z-40 select-none pointer-events-none" style={{ WebkitTextStroke: '0px' }}>
          (27)
        </span>
      </div>

      {/* Indicador de rolagem estático */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center z-40">
        <span className="text-white font-bold mb-2 text-lg drop-shadow-md">Scroll</span>
        <div className="animate-bounce">
          <ArrowDown className="text-white drop-shadow-lg" size={32} />
        </div>
      </div>
    </section>
  );
}