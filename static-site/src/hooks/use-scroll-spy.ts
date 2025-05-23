import { useState, useEffect } from "react";

interface UseScrollSpyProps {
  sectionIds: string[];
  offset?: number;
}

export function useScrollSpy({ sectionIds, offset = 0 }: UseScrollSpyProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;
      
      // Find the section that is currently in view
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        
        if (!element) continue;
        
        const top = element.offsetTop;
        const height = element.offsetHeight;
        
        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveSection(id);
          break;
        }
      }
      
      // Handle case when scrolled to bottom of page
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.scrollHeight;
      const scrollToBottom = scrollPosition + windowHeight >= documentHeight - 50;
      
      if (scrollToBottom) {
        const lastSection = sectionIds[sectionIds.length - 1];
        setActiveSection(lastSection);
      }
    };
    
    // Initial check
    handleScroll();
    
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [sectionIds, offset]);

  return activeSection;
}
