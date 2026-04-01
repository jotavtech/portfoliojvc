import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  separator?: string;
  decimals?: number;
  onComplete?: () => void;
}

const CountUp: React.FC<CountUpProps> = ({
  to,
  from = 0,
  duration = 2,
  delay = 0,
  suffix = "",
  prefix = "",
  className = "",
  separator = "",
  decimals = 0,
  onComplete,
}) => {
  const [count, setCount] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!isInView || hasStarted.current) return;
    hasStarted.current = true;

    const startTime = Date.now() + delay * 1000;
    const endTime = startTime + duration * 1000;

    const updateCount = () => {
      const now = Date.now();
      
      if (now < startTime) {
        requestAnimationFrame(updateCount);
        return;
      }

      const progress = Math.min(1, (now - startTime) / (duration * 1000));
      
      // Easing function (ease out cubic)
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      
      const currentValue = from + (to - from) * easedProgress;
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(to);
        onComplete?.();
      }
    };

    requestAnimationFrame(updateCount);
  }, [isInView, from, to, duration, delay, onComplete]);

  const formatNumber = (num: number) => {
    const fixed = num.toFixed(decimals);
    if (separator) {
      const [intPart, decPart] = fixed.split(".");
      const formatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
      return decPart ? `${formatted}.${decPart}` : formatted;
    }
    return fixed;
  };

  return (
    <motion.span
      ref={ref}
      className={`count-up ${className}`}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      {prefix}
      {formatNumber(count)}
      {suffix}
    </motion.span>
  );
};

export default CountUp;
