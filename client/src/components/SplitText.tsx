import { useMemo, useRef, useCallback, useEffect, useState } from "react";
import { motion, useInView, Variants, Transition } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  animationFrom?: {
    opacity?: number;
    y?: number;
    x?: number;
    scale?: number;
    rotateX?: number;
    filter?: string;
  };
  animationTo?: {
    opacity?: number;
    y?: number;
    x?: number;
    scale?: number;
    rotateX?: number;
    filter?: string;
  };
  easing?: string;
  threshold?: number;
  rootMargin?: string;
  textAlign?: "left" | "center" | "right";
  onLetterAnimationComplete?: () => void;
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = "",
  delay = 50,
  animationFrom = { opacity: 0, y: 40, filter: "blur(10px)" },
  animationTo = { opacity: 1, y: 0, filter: "blur(0px)" },
  easing = "easeOut",
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  onLetterAnimationComplete,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: rootMargin,
    amount: threshold,
  });

  const [completedCount, setCompletedCount] = useState(0);

  const letters = useMemo(() => {
    const result: { char: string; index: number }[] = [];
    let index = 0;
    text.split("").forEach((char) => {
      result.push({ char, index });
      index++;
    });
    return result;
  }, [text]);

  const handleAnimationComplete = useCallback(() => {
    setCompletedCount((prev) => {
      const newCount = prev + 1;
      if (newCount === letters.length && onLetterAnimationComplete) {
        onLetterAnimationComplete();
      }
      return newCount;
    });
  }, [letters.length, onLetterAnimationComplete]);

  const letterVariants: Variants = {
    hidden: animationFrom,
    visible: (i: number) => ({
      ...animationTo,
      transition: {
        delay: i * (delay / 1000),
        duration: 0.5,
        ease: easing,
      } as Transition,
    }),
  };

  useEffect(() => {
    if (!isInView) {
      setCompletedCount(0);
    }
  }, [isInView]);

  return (
    <div
      ref={ref}
      className={`split-text ${className}`}
      style={{
        textAlign,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: textAlign === "center" ? "center" : textAlign === "right" ? "flex-end" : "flex-start",
      }}
    >
      {letters.map(({ char, index }) => (
        <motion.span
          key={index}
          custom={index}
          variants={letterVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          onAnimationComplete={handleAnimationComplete}
          style={{
            display: "inline-block",
            whiteSpace: char === " " ? "pre" : "normal",
            willChange: "transform, opacity, filter",
          }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
};

export default SplitText;
