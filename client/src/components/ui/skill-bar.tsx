import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface SkillBarProps {
  name: string;
  percentage: number;
  isVisible: boolean;
  delay?: number;
}

export default function SkillBar({ name, percentage, isVisible, delay = 0 }: SkillBarProps) {
  const [width, setWidth] = useState(0);
  
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setWidth(percentage);
      }, delay * 1000);
      
      return () => clearTimeout(timer);
    } else {
      setWidth(0);
    }
  }, [isVisible, percentage, delay]);

  return (
    <div className="skill-bar">
      <div className="flex justify-between mb-2">
        <span className="font-medium">{name}</span>
        <span className="text-neutral-500">{percentage}%</span>
      </div>
      <div className="bg-neutral-200 h-2.5 rounded-full overflow-hidden">
        <motion.div 
          className="bg-secondary h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 1, ease: "easeOut", delay: delay }}
        />
      </div>
    </div>
  );
}
