import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  animationType?: "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "scale";
}

export default function AnimatedSection({
  id,
  children,
  className = "",
  animationType = "fadeUp"
}: AnimatedSectionProps) {
  
  let initial = {};
  
  switch (animationType) {
    case "fadeDown":
      initial = { opacity: 0, y: -50 };
      break;
    case "fadeLeft":
      initial = { opacity: 0, x: -50 };
      break;
    case "fadeRight":
      initial = { opacity: 0, x: 50 };
      break;
    case "scale":
      initial = { opacity: 0, scale: 0.8 };
      break;
    default: // fadeUp
      initial = { opacity: 0, y: 50 };
  }
  
  return (
    <motion.section
      id={id}
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      exit={initial}
      transition={{ duration: 0.8 }}
      viewport={{ once: false, margin: "-100px" }}
    >
      {children}
    </motion.section>
  );
}

export const AnimatedElement = ({ 
  children, 
  delay = 0,
  className = "",
  animation = "fadeUp" // fadeUp, fadeLeft, fadeRight, scale
}: { 
  children: ReactNode; 
  delay?: number;
  className?: string;
  animation?: "fadeUp" | "fadeLeft" | "fadeRight" | "scale";
}) => {
  let variants;
  
  switch (animation) {
    case "fadeLeft":
      variants = {
        hidden: { opacity: 0, x: -30 },
        visible: { 
          opacity: 1, 
          x: 0,
          transition: { 
            duration: 0.5, 
            delay,
            ease: "easeOut" 
          }
        }
      };
      break;
    case "fadeRight":
      variants = {
        hidden: { opacity: 0, x: 30 },
        visible: { 
          opacity: 1, 
          x: 0,
          transition: { 
            duration: 0.5, 
            delay,
            ease: "easeOut" 
          }
        }
      };
      break;
    case "scale":
      variants = {
        hidden: { opacity: 0, scale: 0.85 },
        visible: { 
          opacity: 1, 
          scale: 1,
          transition: { 
            duration: 0.5, 
            delay,
            ease: "easeOut" 
          }
        }
      };
      break;
    default: // fadeUp
      variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { 
            duration: 0.5, 
            delay,
            ease: "easeOut" 
          }
        }
      };
  }

  return (
    <motion.div
      className={className}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};