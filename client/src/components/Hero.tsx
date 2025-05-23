import { motion } from "framer-motion";
import { socialLinks } from "@/lib/constants";
import { ExternalLink, Github, Instagram, Linkedin, ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function Hero() {
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
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section 
      id="home" 
      className="min-h-screen relative flex justify-center items-end pb-32 overflow-hidden"
      style={{
        backgroundImage: `url('/image_1748031086511.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay with slight blue tint */}
      <div className="absolute inset-0 bg-background/40 backdrop-blur-sm"></div>
      
      {/* Floating social links */}
      <motion.div 
        className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col space-y-6 z-10"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        {socialLinks.map((link, index) => (
          <motion.a 
            key={index}
            href={link.url} 
            className="p-3 bg-secondary/90 text-white rounded-full shadow-lg"
            aria-label={link.label}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 140, 0, 1)" }}
            whileTap={{ scale: 0.9 }}
          >
            {getSocialIcon(link.name)}
          </motion.a>
        ))}
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        style={{ opacity: 1 - scrollY / 400 }}
      >
        <span className="text-white/80 font-semibold mb-2">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="text-white/80" size={24} />
        </motion.div>
      </motion.div>
      
      {/* Main name */}
      <div className="container z-10 mx-auto px-6">
        <motion.h1 
          className="text-7xl md:text-9xl lg:text-[10rem] font-black tracking-tighter text-white drop-shadow-lg text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        >
          JOÃO VITOR <br /> <span className="text-secondary">CHAVES</span>
        </motion.h1>
      </div>
    </section>
  );
}
