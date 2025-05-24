import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isInProjectsSection, setIsInProjectsSection] = useState(false);
  
  const dotRef = useRef<HTMLDivElement>(null);
  const projectsCursorRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const mobileViewport = window.matchMedia("(max-width: 768px)").matches;
    
    if (mobileViewport) return;
    
    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Verificar se o mouse está na seção de projetos
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
    
    const handleMouseEnter = () => {
      setIsVisible(true);
    };
    
    const handleMouseLeave = () => {
      setIsVisible(false);
    };
    
    const handleMouseDown = () => {
      setIsClicking(true);
    };
    
    const handleMouseUp = () => {
      setIsClicking(false);
    };
    
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
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    
    const cleanup = handleLinkHoverEvents();
    
    return () => {
      document.removeEventListener("mousemove", updateCursorPosition);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      cleanup();
    };
  }, []);
  
  useEffect(() => {
    if (dotRef.current) {
      // Animação suave para o cursor
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
      <div 
        ref={dotRef}
        className={`fixed top-0 left-0 z-[9999] pointer-events-none transition-all duration-300 mix-blend-normal
                    ${isHovering ? 'scale-150 backdrop-blur-sm' : ''} 
                    ${isClicking ? 'scale-75' : ''}
                    ${isInProjectsSection ? 'opacity-0' : ''}`}
        style={{ 
          opacity: isVisible ? 1 : 0,
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          backgroundColor: '#FF4500',
          marginLeft: '-8px',
          marginTop: '-8px',
          transition: 'all 0.2s ease-out'
        }}
      />
      <div
        ref={projectsCursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference transition-all duration-300
                   ${isInProjectsSection ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
      >
        <div className="relative w-[100px] h-[100px]">
          <div className="absolute inset-0 bg-white rounded-full opacity-50 blur-lg" />
          <div className="absolute inset-0 flex items-center justify-center text-black font-bold">
            Projects
          </div>
        </div>
      </div>
    </>
  );
}