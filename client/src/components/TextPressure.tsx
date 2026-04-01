import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TextPressureProps {
  text: string;
  className?: string;
  fontFamily?: string;
  fontUrl?: string;
  width?: boolean;
  weight?: boolean;
  italic?: boolean;
  alpha?: boolean;
  flex?: boolean;
  stroke?: boolean;
  minFontSize?: number;
}

const TextPressure: React.FC<TextPressureProps> = ({
  text,
  className = "",
  fontFamily = "Space Grotesk",
  width = true,
  weight = true,
  italic = false,
  alpha = false,
  flex = true,
  stroke = false,
  minFontSize = 24,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [letterStates, setLetterStates] = useState<number[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setLetterStates(text.split("").map(() => 0));
  }, [text]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    const letterElements = containerRef.current.querySelectorAll(".pressure-letter");
    const newStates = Array.from(letterElements).map((el) => {
      const letterRect = el.getBoundingClientRect();
      const letterCenterX = letterRect.left - rect.left + letterRect.width / 2;
      const letterCenterY = letterRect.top - rect.top + letterRect.height / 2;
      
      const distance = Math.sqrt(
        Math.pow(mousePos.x - letterCenterX, 2) + Math.pow(mousePos.y - letterCenterY, 2)
      );
      
      const maxDistance = 150;
      const pressure = Math.max(0, 1 - distance / maxDistance);
      return pressure;
    });

    setLetterStates(newStates);
  };

  const handleMouseLeave = () => {
    setLetterStates(text.split("").map(() => 0));
  };

  return (
    <motion.div
      ref={containerRef}
      className={`text-pressure inline-flex flex-wrap ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        fontFamily,
        cursor: "default",
      }}
    >
      {text.split("").map((char, index) => {
        const pressure = letterStates[index] || 0;
        
        return (
          <motion.span
            key={index}
            className="pressure-letter inline-block transition-all duration-75"
            style={{
              fontWeight: weight ? 300 + pressure * 600 : 400,
              fontStretch: width ? `${100 + pressure * 50}%` : "100%",
              fontStyle: italic && pressure > 0.5 ? "italic" : "normal",
              opacity: alpha ? 0.3 + pressure * 0.7 : 1,
              flex: flex ? `0 1 ${1 + pressure * 0.5}em` : undefined,
              WebkitTextStroke: stroke ? `${pressure * 2}px currentColor` : undefined,
              transform: `scale(${1 + pressure * 0.2})`,
              whiteSpace: char === " " ? "pre" : "normal",
            }}
            animate={{
              color: pressure > 0.3 ? "var(--primary-hex)" : "#ffffff",
            }}
            transition={{ duration: 0.1 }}
          >
            {char}
          </motion.span>
        );
      })}
    </motion.div>
  );
};

export default TextPressure;
