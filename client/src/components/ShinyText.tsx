import { motion } from "framer-motion";

interface ShinyTextProps {
  text: string;
  className?: string;
  disabled?: boolean;
  speed?: number;
  shimmerWidth?: number;
}

const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  className = "",
  disabled = false,
  speed = 3,
  shimmerWidth = 100,
}) => {
  return (
    <motion.span
      className={`shiny-text relative inline-block ${className}`}
      style={{
        backgroundImage: disabled
          ? "none"
          : `linear-gradient(
              120deg,
              rgba(255, 255, 255, 0) 40%,
              rgba(255, 255, 255, 0.8) 50%,
              rgba(255, 255, 255, 0) 60%
            )`,
        backgroundSize: `${shimmerWidth}% 100%`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: disabled ? "inherit" : "transparent",
        WebkitTextFillColor: disabled ? "inherit" : "transparent",
      }}
      animate={
        disabled
          ? {}
          : {
              backgroundPosition: ["200% center", "-200% center"],
            }
      }
      transition={
        disabled
          ? {}
          : {
              duration: speed,
              repeat: Infinity,
              ease: "linear",
            }
      }
    >
      <span
        style={{
          background: "linear-gradient(90deg, #ffffff 0%, var(--primary-hex) 50%, #ffffff 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {text}
      </span>
    </motion.span>
  );
};

export default ShinyText;
