import { useRef, useEffect, useCallback } from 'react';

interface UseOptimizedAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useOptimizedAnimation = (options: UseOptimizedAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true
  } = options;

  const elementRef = useRef<HTMLElement>(null);
  const hasTriggered = useRef(false);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && (!triggerOnce || !hasTriggered.current)) {
        const element = entry.target as HTMLElement;
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        hasTriggered.current = true;
      }
    });
  }, [triggerOnce]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Configuração inicial
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [handleIntersection, threshold, rootMargin]);

  return elementRef;
};

// Hook para debounce de scroll
export const useScrollDebounce = (callback: () => void, delay: number = 16) => {
  const timeoutRef = useRef<number | undefined>(undefined);

  const debouncedCallback = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(callback, delay);
  }, [callback, delay]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
};

// Hook para otimizar re-renders de listas
export const useOptimizedList = <T>(items: T[], keyExtractor: (item: T, index: number) => string | number) => {
  const memoizedItems = useRef<Map<string | number, T>>(new Map());
  
  const optimizedItems = items.map((item, index) => {
    const key = keyExtractor(item, index);
    const existingItem = memoizedItems.current.get(key);
    
    if (existingItem === item) {
      return existingItem;
    }
    
    memoizedItems.current.set(key, item);
    return item;
  });

  return optimizedItems;
}; 