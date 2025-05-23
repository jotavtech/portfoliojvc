import { useEffect, useState, useRef } from 'react';

type AnimationType = 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'scale' | 'none';

export function useAnimationOnScroll(options: {
  threshold?: number;
  triggerOnce?: boolean;
  animationType?: AnimationType;
  delay?: number;
}) {
  const {
    threshold = 0.2,
    triggerOnce = false,
    animationType = 'fadeUp',
    delay = 0
  } = options;
  
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          
          if (triggerOnce && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, triggerOnce, delay]);

  // Define classes based on animation type
  let animationClasses = '';
  
  if (isVisible) {
    animationClasses = 'animate-in';
  } else {
    switch (animationType) {
      case 'fadeDown':
        animationClasses = 'opacity-0 translate-y-[-30px] transition-all duration-700';
        break;
      case 'fadeLeft':
        animationClasses = 'opacity-0 translate-x-[-30px] transition-all duration-700';
        break;
      case 'fadeRight':
        animationClasses = 'opacity-0 translate-x-[30px] transition-all duration-700';
        break;
      case 'scale':
        animationClasses = 'opacity-0 scale-95 transition-all duration-700';
        break;
      case 'none':
        animationClasses = '';
        break;
      default: // fadeUp
        animationClasses = 'opacity-0 translate-y-[30px] transition-all duration-700';
    }
  }

  return { ref, isVisible, animationClasses };
}