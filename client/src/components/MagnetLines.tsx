import { useEffect, useRef } from 'react';

interface MagnetLinesProps {
  rows?: number;
  columns?: number;
  containerSize?: string;
  lineColor?: string;
  lineWidth?: string;
  lineHeight?: string;
  baseAngle?: number;
  className?: string;
}

const MagnetLines: React.FC<MagnetLinesProps> = ({
  rows = 9,
  columns = 9,
  containerSize = '80vmin',
  lineColor = 'var(--primary-hex, #c41e3a)',
  lineWidth = '1px',
  lineHeight = '30px',
  baseAngle = -10,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const lines = container.querySelectorAll<HTMLSpanElement>('.magnet-line');

    const handleMouseMove = (e: MouseEvent) => {
      const containerRect = container.getBoundingClientRect();
      const centerX = containerRect.left + containerRect.width / 2;
      const centerY = containerRect.top + containerRect.height / 2;

      lines.forEach((line) => {
        const lineRect = line.getBoundingClientRect();
        const lineCenterX = lineRect.left + lineRect.width / 2;
        const lineCenterY = lineRect.top + lineRect.height / 2;

        const deltaX = e.clientX - lineCenterX;
        const deltaY = e.clientY - lineCenterY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        const maxDistance = 300;
        const influence = Math.max(0, 1 - distance / maxDistance);
        
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
        const targetAngle = baseAngle + angle * influence;

        line.style.transform = `rotate(${targetAngle}deg)`;
        line.style.opacity = `${0.3 + influence * 0.7}`;
      });
    };

    const handleMouseLeave = () => {
      lines.forEach((line) => {
        line.style.transform = `rotate(${baseAngle}deg)`;
        line.style.opacity = '0.3';
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [baseAngle]);

  const gridItems = [];
  for (let i = 0; i < rows * columns; i++) {
    gridItems.push(
      <div
        key={i}
        className="flex items-center justify-center"
      >
        <span
          className="magnet-line block transition-all duration-300 ease-out"
          style={{
            width: lineWidth,
            height: lineHeight,
            backgroundColor: lineColor,
            transform: `rotate(${baseAngle}deg)`,
            opacity: 0.3,
            borderRadius: '2px',
          }}
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`magnet-lines-container ${className}`}
      style={{
        display: 'grid',
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        width: containerSize,
        height: containerSize,
        gap: '8px',
      }}
    >
      {gridItems}
    </div>
  );
};

export default MagnetLines;
