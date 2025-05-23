import { useState, useEffect } from "react";
import { AlignJustify, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
  activeSection: string | null;
  mobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

const navigation = [
  { name: "Home", href: "#home" },
  { name: "Projetos", href: "#projects" },
  { name: "Sobre", href: "#about" },
  { name: "Habilidades", href: "#skills" },
  { name: "Contato", href: "#contact" },
];

export default function Header({ activeSection, mobileMenuOpen, toggleMobileMenu }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    const updateTime = () => {
      setTime(new Date());
    };
    
    window.addEventListener("scroll", handleScroll);
    const timeInterval = setInterval(updateTime, 1000);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(timeInterval);
    };
  }, []);

  return (
    <header className={cn(
      "fixed w-full z-50 transition-all duration-300",
      scrolled ? "py-2" : "py-4"
    )}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          <a 
            href="#home" 
            className="text-xl font-bold tracking-tight hover:text-secondary transition-colors"
          >
            João<span className="red-gradient">.</span>
          </a>
          
          <button 
            onClick={toggleMobileMenu}
            className="flex flex-col space-y-3 items-center justify-center h-14 w-14 group z-50"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-8 w-8 text-white" />
            ) : (
              <>
                <div className="w-10 h-1 bg-secondary transform transition-all duration-300 group-hover:translate-y-1.5 group-hover:-translate-x-2"></div>
                <div className="w-10 h-1 bg-secondary transform transition-all duration-300 group-hover:-translate-y-1.5 group-hover:translate-x-2"></div>
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Fullscreen Menu with Backdrop Blur */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-40 menu-backdrop flex flex-row justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Left side - Clock */}
            <motion.div 
              className="flex-1 flex items-center justify-center p-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-left">
                <div className="text-6xl md:text-8xl font-bold text-secondary mb-2 tracking-tighter">
                  {time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </div>
                <div className="text-xl text-muted-foreground">
                  {time.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
              </div>
            </motion.div>
            
            {/* Right side - Navigation */}
            <motion.div 
              className="flex-1 flex items-center justify-center p-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.ul 
                className="flex flex-col items-start space-y-8 text-4xl md:text-5xl font-bold"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                  hidden: {},
                }}
              >
                {navigation.map((item, index) => (
                  <motion.li 
                    key={item.name}
                    variants={{
                      visible: { opacity: 1, x: 0 },
                      hidden: { opacity: 0, x: 50 },
                    }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.05, x: 10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <a 
                      href={item.href}
                      className={cn(
                        "block py-2 transition-colors hover:text-secondary relative overflow-hidden group",
                        activeSection === item.href.substring(1) && "red-gradient"
                      )}
                      onClick={toggleMobileMenu}
                    >
                      <span className="inline-block relative z-10">
                        {item.name}
                      </span>
                      <span className="absolute bottom-0 left-0 w-0 h-1 bg-secondary transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
