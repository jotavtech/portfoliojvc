import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed w-full z-50 transition-all duration-300",
      scrolled ? "bg-white/90 backdrop-blur-sm shadow-sm py-2" : "bg-transparent py-4"
    )}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          <a 
            href="#home" 
            className="text-xl font-bold tracking-tight hover:text-secondary transition-colors"
          >
            João<span className="gradient-text">.</span>
          </a>
          
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href}
                    className={cn(
                      "hover:text-secondary transition-colors",
                      activeSection === item.href.substring(1) && "gradient-text gradient-border font-medium"
                    )}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden flex items-center"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={cn(
        "md:hidden bg-white w-full py-4 px-6 shadow-md absolute top-full left-0 transition-all duration-300 ease-in-out",
        mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
      )}>
        <ul className="space-y-4">
          {navigation.map((item) => (
            <li key={item.name}>
              <a 
                href={item.href}
                className={cn(
                  "block py-2 hover:text-secondary transition-colors",
                  activeSection === item.href.substring(1) && "gradient-text gradient-border font-medium"
                )}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
