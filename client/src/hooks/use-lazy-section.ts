import { useState, useEffect, useRef } from 'react';

interface UseLazySectionOptions {
  threshold?: number;
  rootMargin?: string;
  onLoad?: () => void;
}

export const useLazySection = (options: UseLazySectionOptions = {}) => {
  const { threshold = 0.1, rootMargin = '0px', onLoad } = options;
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoaded) {
          setIsVisible(true);
          setIsLoaded(true);
          onLoad?.();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [threshold, rootMargin, isLoaded, onLoad]);

  return { sectionRef, isVisible, isLoaded };
}; 