import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InitialLoadingProps {
  onComplete: () => void;
}

export default function InitialLoading({ onComplete }: InitialLoadingProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [flashCount, setFlashCount] = useState(0);

  useEffect(() => {
    // Flash sequence - only 3 blinks
    const flashSequence = [
        { delay: 500, color: 'bg-[#ff4500]' },
  { delay: 500, color: 'bg-[#ff4500]' },
  { delay: 500, color: 'bg-[#ff4500]' },
    ];

    let currentIndex = 0;

    const flashInterval = setInterval(() => {
      if (currentIndex < flashSequence.length) {
        setFlashCount(currentIndex);
        currentIndex++;
      } else {
        clearInterval(flashInterval);
        // Aguarda um pouco mais antes de desaparecer
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(onComplete, 500); // Call onComplete after exit animation
        }, 500);
      }
    }, 200);

    return () => clearInterval(flashInterval);
  }, [onComplete]);

  const getBackgroundColor = () => {
      const colors = [
    'bg-[#ff4500]',
    'bg-white',
    'bg-[#ff4500]',
    'bg-white',
    'bg-[#ff4500]',
    'bg-white',
    'bg-[#ff4500]',
  ];
  return colors[flashCount] || 'bg-[#ff4500]';
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed inset-0 z-[9999] flex items-center justify-center ${getBackgroundColor()} transition-colors duration-200`}
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
                color: flashCount % 2 === 0 ? '#ffffff' : '#000000',
                fontFamily: 'Space Grotesk, sans-serif'
              }}
            >
              João<span style={{ color: flashCount % 2 === 0 ? '#000000' : '#ff4500' }}>.</span>
            </motion.h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 