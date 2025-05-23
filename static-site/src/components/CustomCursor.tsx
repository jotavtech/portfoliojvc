import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  const dotRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const mobileViewport = window.matchMedia("(max-width: 768px)").matches;
    
    if (mobileViewport) return;
    
    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
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
  }, [position]);
  
  return (
    <div 
      ref={dotRef}
      className={`fixed top-0 left-0 z-[9999] pointer-events-none 
                  ${isHovering ? 'scale-150' : ''} 
                  ${isClicking ? 'scale-75' : ''}`}
      style={{ 
        opacity: isVisible ? 1 : 0,
        width: '16px',
        height: '16px',
        borderRadius: '50%',
        backgroundColor: '#FF8C00',
        boxShadow: '0 0 12px rgba(255, 140, 0, 0.8)',
        marginLeft: '-8px',
        marginTop: '-8px',
        transition: 'transform 0.2s ease-out, width 0.2s ease-out, height 0.2s ease-out, opacity 0.2s ease-out'
      }}
    />
  );
}