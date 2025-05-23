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
            className="flex flex-col space-y-1.5 items-center justify-center h-10 w-10"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-secondary" />
            ) : (
              <>
                <div className="w-6 h-0.5 bg-secondary"></div>
                <div className="w-6 h-0.5 bg-secondary"></div>
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Fullscreen Menu with Backdrop Blur */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-40 menu-backdrop flex flex-col justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-6">
              <div className="text-center mb-8">
                <div className="text-xl text-secondary mb-2">
                  {time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className="text-sm text-muted-foreground">
                  {time.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
              </div>
              
              <motion.ul 
                className="flex flex-col items-center space-y-6 text-2xl"
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
                {navigation.map((item) => (
                  <motion.li 
                    key={item.name}
                    variants={{
                      visible: { opacity: 1, y: 0 },
                      hidden: { opacity: 0, y: 20 },
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <a 
                      href={item.href}
                      className={cn(
                        "block py-2 transition-colors hover:text-secondary",
                        activeSection === item.href.substring(1) && "red-gradient red-border font-bold"
                      )}
                      onClick={toggleMobileMenu}
                    >
                      {item.name}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
