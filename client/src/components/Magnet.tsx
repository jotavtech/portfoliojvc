import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

interface MagnetProps {
  children: React.ReactNode;
  className?: string;
  padding?: number;
  disabled?: boolean;
  magnetStrength?: number;
  activeTransition?: {
    type?: string;
    stiffness?: number;
    damping?: number;
    mass?: number;
  };
  inactiveTransition?: {
    type?: string;
    stiffness?: number;
    damping?: number;
    mass?: number;
  };
}

const Magnet: React.FC<MagnetProps> = ({
  children,
  className = "",
  padding = 100,
  disabled = false,
  magnetStrength = 0.5,
  activeTransition = {
    type: "spring",
    stiffness: 200,
    damping: 20,
    mass: 0.5,
  },
  inactiveTransition = {
    type: "spring",
    stiffness: 300,
    damping: 25,
    mass: 0.5,
  },
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || !ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * magnetStrength;
      const deltaY = (e.clientY - centerY) * magnetStrength;

      setPosition({ x: deltaX, y: deltaY });
    },
    [disabled, magnetStrength]
  );

  const handleMouseEnter = useCallback(() => {
    if (!disabled) {
      setIsHovering(true);
    }
  }, [disabled]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setPosition({ x: 0, y: 0 });
  }, []);

  return (
    <motion.div
      ref={ref}
      className={`magnet-wrapper ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={isHovering ? activeTransition : inactiveTransition}
      style={{
        display: "inline-block",
        padding: `${padding}px`,
        margin: `-${padding}px`,
      }}
    >
      {children}
    </motion.div>
  );
};

export default Magnet;
