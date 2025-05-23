import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { socialLinks } from "@/lib/constants";
import { ExternalLink, Github, Instagram, Linkedin, ArrowDown } from "lucide-react";
import { useEffect, useState, useRef } from "react";

interface HeroProps {
  showSocialLinks?: boolean;
}

export default function Hero({ showSocialLinks = true }: HeroProps) {
  const getSocialIcon = (name: string) => {
    switch (name) {
      case "linkedin":
        return <Linkedin size={24} />;
      case "github":
        return <Github size={24} />;
      case "instagram":
        return <Instagram size={24} />;
      case "dribbble":
        return <ExternalLink size={24} />;
      default:
        return <ExternalLink size={24} />;
    }
  };

  const [scrollY, setScrollY] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState('rgba(135, 206, 235, 1)');
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  // Valores de transformação para animação de cores
  const hueRotate = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const saturation = useTransform(scrollYProgress, [0, 1], [85, 100]);
  const lightness = useTransform(scrollYProgress, [0, 1], [70, 60]);
  
  // Combinar os valores em um template CSS
  const backgroundFilter = useMotionTemplate`hue-rotate(${hueRotate}deg) saturate(${saturation}%) brightness(${lightness}%)`;
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Calcular cor de fundo com base na posição de rolagem
      const scrollPercent = Math.min(window.scrollY / window.innerHeight, 1);
      const r = Math.round(135 - (scrollPercent * 30));
      const g = Math.round(206 - (scrollPercent * 100));
      const b = Math.round(235 - (scrollPercent * 100));
      setBackgroundColor(`rgba(${r}, ${g}, ${b}, 1)`);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section 
      id="home" 
      ref={sectionRef}
      className="min-h-screen relative flex justify-center items-end pb-40 overflow-hidden"
      style={{
        backgroundImage: `url('/image_1748031086511.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay com filtro de cor dinâmico */}
      <motion.div 
        className="absolute inset-0 bg-background/40 backdrop-blur-sm"
        style={{ filter: backgroundFilter }}
      ></motion.div>
      
      {/* Floating social links - visíveis apenas após rolagem */}
      {showSocialLinks && (
        <motion.div 
          className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col space-y-6 z-10"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {socialLinks.map((link, index) => (
            <motion.a 
              key={index}
              href={link.url} 
              className="p-3 bg-secondary/90 text-white rounded-full shadow-lg"
              aria-label={link.label}
              whileHover={{ 
                scale: 1.2, 
                rotate: 5,
                backgroundColor: "rgba(255, 140, 0, 1)",
                boxShadow: "0 0 20px rgba(255, 140, 0, 0.5)"
              }}
              whileTap={{ scale: 0.9 }}
            >
              {getSocialIcon(link.name)}
            </motion.a>
          ))}
        </motion.div>
      )}
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        style={{ opacity: 1 - scrollY / 400 }}
      >
        <span className="text-white font-bold mb-2 text-lg drop-shadow-md">Scroll</span>
        <motion.div
          animate={{ 
            y: [0, 12, 0],
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <ArrowDown className="text-secondary drop-shadow-lg" size={32} />
        </motion.div>
      </motion.div>
      
      {/* Main name */}
      <div className="container z-10 mx-auto px-6">
        <motion.h1 
          className="text-7xl md:text-9xl lg:text-[12rem] font-black tracking-tighter text-white drop-shadow-lg text-center"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1.2, 
            ease: [0.22, 1, 0.36, 1],
            staggerChildren: 0.2
          }}
          style={{ 
            transform: `translateY(${scrollY * 0.2}px)`,
            textShadow: "0 4px 30px rgba(0, 0, 0, 0.3)"
          }}
        >
          <motion.span
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="block"
          >
            JOTA
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="block text-secondary"
            style={{ 
              color: backgroundColor === 'rgba(135, 206, 235, 1)' ? '#FF8C00' : '#FFFFFF',
              filter: "brightness(1.2) contrast(1.1)" 
            }}
          >
            CHAVES
          </motion.span>
        </motion.h1>
      </div>
      
      {/* Partículas animadas */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-secondary/30"
            style={{
              width: Math.random() * 10 + 5 + "px",
              height: Math.random() * 10 + 5 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
            animate={{
              y: [0, Math.random() * -100 - 50],
              x: [0, (Math.random() - 0.5) * 50],
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0.5]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>
    </section>
  );
}
