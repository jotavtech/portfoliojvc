import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isInProjectsSection, setIsInProjectsSection] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const mobileViewport = window.matchMedia("(max-width: 768px)").matches;
    if (mobileViewport) return;
    
    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Check if cursor is in projects section
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        const rect = projectsSection.getBoundingClientRect();
        setIsInProjectsSection(
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom &&
          e.clientX >= rect.left &&
          e.clientX <= rect.right
        );
      }
    };
    
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    
    const handleLinkHoverEvents = () => {
      const handleMouseOver = () => setIsHovering(true);
      const handleMouseOut = () => setIsHovering(false);
      
      document.querySelectorAll("a, button, input, textarea, select").forEach(el => {
        el.addEventListener("mouseover", handleMouseOver);
        el.addEventListener("mouseout", handleMouseOut);
      });
      
      return () => {
        document.querySelectorAll("a, button, input, textarea, select").forEach(el => {
          el.removeEventListener("mouseover", handleMouseOver);
          el.removeEventListener("mouseout", handleMouseOut);
        });
      };
    };
    
    document.addEventListener("mousemove", updateCursorPosition);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    
    const cleanup = handleLinkHoverEvents();
    
    return () => {
      document.removeEventListener("mousemove", updateCursorPosition);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cleanup();
    };
  }, []);
  
  // Calcular tamanho e offset baseado no estado
  const getSize = () => {
    if (isInProjectsSection) return 100;
    if (isHovering) return 20;
    return 12;
  };
  
  const size = getSize();
  const offset = size / 2;
  
  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${position.x - offset}px, ${position.y - offset}px)`;
    }
  }, [position, offset]);
  
  return (
    <div 
      ref={cursorRef}
      className={`fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center
                  ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ 
        width: `${size}px`,
        height: `${size}px`,
        transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1), height 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease-in-out, background-color 0.5s ease, box-shadow 0.5s ease',
      }}
    >
      {/* Fundo do cursor que transiciona */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          backgroundColor: isInProjectsSection ? 'transparent' : '#ff4500',
          boxShadow: isInProjectsSection 
            ? 'none' 
            : '0 0 20px rgba(255, 69, 0, 0.6)',
          transition: 'background-color 0.5s ease, box-shadow 0.5s ease',
        }}
      />
      
      {/* Background blur apenas para seção de projetos */}
      <div 
        className="absolute inset-0 rounded-full backdrop-blur-md"
        style={{
          backgroundColor: isInProjectsSection ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
          opacity: isInProjectsSection ? 1 : 0,
          transition: 'opacity 0.5s ease, background-color 0.5s ease',
        }}
      />
      
      {/* Texto "Projects" */}
      <span 
        className="relative text-white font-bold text-lg z-10"
        style={{
          opacity: isInProjectsSection ? 1 : 0,
          transform: isInProjectsSection ? 'scale(1)' : 'scale(0)',
          transition: 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        Projects
      </span>
    </div>
  );
}