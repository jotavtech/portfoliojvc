import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  
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
    if (dotRef.current && outlineRef.current) {
      // Add animation effect - slight lag to the dot outline
      const dotX = position.x;
      const dotY = position.y;
      
      dotRef.current.style.transform = `translate(${dotX}px, ${dotY}px)`;
      
      // Apply smooth animation to outline with slight delay
      outlineRef.current.animate({
        transform: `translate(${dotX}px, ${dotY}px)`
      }, {
        duration: 500,
        fill: "forwards",
        easing: "ease-out"
      });
    }
  }, [position]);
  
  return (
    <>
      <div 
        ref={dotRef}
        className="cursor-dot fixed top-0 left-0 z-[9999]"
        style={{ 
          opacity: isVisible ? 1 : 0,
          transform: `translate(${position.x}px, ${position.y}px)`
        }}
      />
      <div 
        ref={outlineRef}
        className={`cursor-dot-outline fixed top-0 left-0 z-[9999] ${isHovering ? 'cursor-hover' : ''}`}
        style={{ 
          opacity: isVisible ? 1 : 0,
          transform: `translate(${position.x}px, ${position.y}px)`
        }}
      />
    </>
  );
}