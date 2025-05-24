import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isInProjectsSection, setIsInProjectsSection] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const projectsCursorRef = useRef<HTMLDivElement>(null);
  
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
  
  useEffect(() => {
    if (dotRef.current) {
      dotRef.current.animate({
        transform: `translate(${position.x}px, ${position.y}px)`
      }, {
        duration: 150,
        fill: "forwards",
        easing: "ease-out"
      });
    }

    if (projectsCursorRef.current) {
      projectsCursorRef.current.animate({
        transform: `translate(${position.x - 50}px, ${position.y - 50}px)`
      }, {
        duration: 150,
        fill: "forwards",
        easing: "ease-out"
      });
    }
  }, [position]);
  
  return (
    <>
      {/* Cursor padrão (bolinha laranja) */}
      <div 
        ref={dotRef}
        className={`fixed top-0 left-0 z-[9999] pointer-events-none transition-all duration-300
                    ${isInProjectsSection ? 'opacity-0' : 'opacity-100'}`}
        style={{ 
          width: isHovering ? '20px' : '12px',
          height: isHovering ? '20px' : '12px',
          backgroundColor: '#F45000',
          borderRadius: '50%',
          marginLeft: isHovering ? '-10px' : '-6px',
          marginTop: isHovering ? '-10px' : '-6px',
          transition: 'all 0.2s ease-out'
        }}
      />

      {/* Cursor especial para seção de projetos */}
      <div
        ref={projectsCursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-all duration-300
                   ${isInProjectsSection ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
      >
        <div className="relative w-[100px] h-[100px] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/20 rounded-full backdrop-blur-md" />
          <span className="relative text-white font-bold text-lg z-10">
            Projects
          </span>
        </div>
      </div>
    </>
  );
}