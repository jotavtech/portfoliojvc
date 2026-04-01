import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RotatingTextProps {
  texts: string[];
  className?: string;
  interval?: number;
  mainClassName?: string;
  staggerFrom?: "first" | "last" | "center";
  initial?: { y: number; opacity: number };
  animate?: { y: number; opacity: number };
  exit?: { y: number; opacity: number };
  staggerDuration?: number;
  splitLevelClassName?: string;
  transition?: {
    type?: string;
    damping?: number;
    stiffness?: number;
  };
  rotationInterval?: number;
}

const RotatingText: React.FC<RotatingTextProps> = ({
  texts,
  className = "",
  mainClassName = "",
  staggerFrom = "first",
  initial = { y: 20, opacity: 0 },
  animate = { y: 0, opacity: 1 },
  exit = { y: -20, opacity: 0 },
  staggerDuration = 0.025,
  splitLevelClassName = "",
  transition = { type: "spring", damping: 30, stiffness: 400 },
  rotationInterval = 3000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, rotationInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [texts.length, rotationInterval]);

  const currentText = texts[currentIndex];
  const characters = currentText.split("");

  const getStaggerDelay = (index: number) => {
    const total = characters.length;
    switch (staggerFrom) {
      case "last":
        return (total - 1 - index) * staggerDuration;
      case "center":
        const center = Math.floor(total / 2);
        return Math.abs(center - index) * staggerDuration;
      default:
        return index * staggerDuration;
    }
  };

  return (
    <span className={`rotating-text inline-flex overflow-hidden ${mainClassName}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          className={`inline-flex ${className}`}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {characters.map((char, index) => (
            <motion.span
              key={`${currentIndex}-${index}`}
              className={`inline-block ${splitLevelClassName}`}
              style={{ whiteSpace: char === " " ? "pre" : "normal" }}
              variants={{
                initial: initial,
                animate: {
                  ...animate,
                  transition: {
                    ...transition,
                    delay: getStaggerDelay(index),
                  },
                },
                exit: {
                  ...exit,
                  transition: {
                    ...transition,
                    delay: getStaggerDelay(index),
                  },
                },
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export default RotatingText;
