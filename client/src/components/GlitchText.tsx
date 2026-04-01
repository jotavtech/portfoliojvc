import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface GlitchTextProps {
  text: string;
  className?: string;
  speed?: number;
  enableShadows?: boolean;
  enableOnHover?: boolean;
  colors?: {
    text?: string;
    shadow1?: string;
    shadow2?: string;
  };
}

const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  className = "",
  speed = 0.5,
  enableShadows = true,
  enableOnHover = false,
  colors = {
    text: "#ffffff",
    shadow1: "var(--primary-hex, #c41e3a)",
    shadow2: "#00ffff",
  },
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [glitchActive, setGlitchActive] = useState(!enableOnHover);

  useEffect(() => {
    if (enableOnHover) {
      setGlitchActive(isHovering);
    }
  }, [isHovering, enableOnHover]);

  const glitchAnimation = {
    animate: glitchActive
      ? {
          x: [0, -2, 2, -2, 0, 2, -2, 0],
          y: [0, 2, -2, 0, 2, -2, 0, 0],
        }
      : {},
    transition: {
      duration: speed,
      repeat: Infinity,
      repeatType: "loop" as const,
    },
  };

  const shadowStyle = enableShadows
    ? {
        textShadow: glitchActive
          ? `
            ${Math.random() * 4 - 2}px 0 ${colors.shadow1},
            ${Math.random() * 4 - 2}px 0 ${colors.shadow2}
          `
          : "none",
      }
    : {};

  return (
    <motion.div
      ref={containerRef}
      className={`glitch-text relative inline-block ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        ...shadowStyle,
        color: colors.text,
      }}
    >
      <motion.span
        className="relative z-10"
        {...glitchAnimation}
        style={{
          display: "inline-block",
        }}
      >
        {text}
      </motion.span>
      
      {glitchActive && enableShadows && (
        <>
          <motion.span
            className="absolute top-0 left-0 z-0"
            style={{
              color: colors.shadow1,
              opacity: 0.8,
              clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
            }}
            animate={{
              x: [0, 2, -2, 2, 0],
            }}
            transition={{
              duration: speed * 0.5,
              repeat: Infinity,
            }}
          >
            {text}
          </motion.span>
          <motion.span
            className="absolute top-0 left-0 z-0"
            style={{
              color: colors.shadow2,
              opacity: 0.8,
              clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)",
            }}
            animate={{
              x: [0, -2, 2, -2, 0],
            }}
            transition={{
              duration: speed * 0.5,
              repeat: Infinity,
            }}
          >
            {text}
          </motion.span>
        </>
      )}
    </motion.div>
  );
};

export default GlitchText;
