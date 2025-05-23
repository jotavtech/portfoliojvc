import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  bgColor?: string;
  delayMultiplier?: number;
}

export default function AnimatedSection({
  id,
  children,
  className = "",
  bgColor,
  delayMultiplier = 1
}: AnimatedSectionProps) {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1 
      }
    },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.3,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: custom * 0.1 * delayMultiplier,
        ease: "easeOut"
      }
    }),
    exit: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  return (
    <motion.section
      id={id}
      className={className}
      style={bgColor ? { backgroundColor: bgColor } : undefined}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      variants={sectionVariants}
      viewport={{ once: false, margin: "-10%" }}
    >
      {children}
    </motion.section>
  );
}

export const AnimatedElement = ({ 
  children, 
  delay = 0,
  className = "" 
}: { 
  children: ReactNode; 
  delay?: number;
  className?: string;
}) => {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { 
            duration: 0.5, 
            delay,
            ease: "easeOut" 
          }
        },
        exit: { 
          opacity: 0, 
          y: -10,
          transition: { 
            duration: 0.3,
            ease: "easeIn" 
          } 
        }
      }}
    >
      {children}
    </motion.div>
  );
};