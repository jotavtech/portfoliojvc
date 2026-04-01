import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InitialLoadingProps {
  onComplete: () => void;
}

export default function InitialLoading({ onComplete }: InitialLoadingProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [flashCount, setFlashCount] = useState(0);

  useEffect(() => {
    let currentIndex = 0;

    const flashInterval = setInterval(() => {
      if (currentIndex < 3) {
        setFlashCount(currentIndex);
        currentIndex++;
      } else {
        clearInterval(flashInterval);
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(onComplete, 500);
        }, 500);
      }
    }, 200);

    return () => clearInterval(flashInterval);
  }, [onComplete]);

  const isPrimary = flashCount % 2 === 0;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed inset-0 z-[9999] flex items-center justify-center transition-colors duration-200 ${
            isPrimary ? "bg-primary" : "bg-white"
          }`}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.h1
              className="text-6xl md:text-8xl font-bold tracking-tight"
              style={{
                color: isPrimary ? '#ffffff' : '#000000',
                fontFamily: 'Space Grotesk, sans-serif',
              }}
            >
              João
              <span style={{ color: isPrimary ? '#000000' : 'var(--primary-hex)' }}>.</span>
            </motion.h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
