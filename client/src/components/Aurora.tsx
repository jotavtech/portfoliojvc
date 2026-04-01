import { useRef, useEffect } from 'react';

interface AuroraProps {
  colorStops?: string[];
  amplitude?: number;
  blend?: number;
  time?: number;
  speed?: number;
  className?: string;
}

const Aurora: React.FC<AuroraProps> = ({
  colorStops = ["var(--primary-hex, #c41e3a)", "#a3001e", "#7a0016", "#c41e3a"],
  amplitude = 1.0,
  blend = 0.5,
  time = 0,
  speed = 1,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const timeRef = useRef(time);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      if (!canvas || !ctx) return;

      const width = canvas.getBoundingClientRect().width;
      const height = canvas.getBoundingClientRect().height;

      ctx.clearRect(0, 0, width, height);

      timeRef.current += 0.01 * speed;

      // Create aurora waves
      for (let i = 0; i < colorStops.length; i++) {
        ctx.beginPath();
        ctx.moveTo(0, height);

        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, colorStops[i] + 'cc');
        gradient.addColorStop(0.5, colorStops[(i + 1) % colorStops.length] + '99');
        gradient.addColorStop(1, colorStops[(i + 2) % colorStops.length] + '66');

        for (let x = 0; x <= width; x += 10) {
          const y =
            height * 0.3 +
            Math.sin((x * 0.01 + timeRef.current + i * 0.5) * amplitude) * height * 0.15 +
            Math.sin((x * 0.02 + timeRef.current * 1.5 + i * 0.3) * amplitude) * height * 0.1 +
            Math.cos((x * 0.015 + timeRef.current * 0.8 + i * 0.7) * amplitude) * height * 0.08;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();

        ctx.fillStyle = gradient;
        ctx.globalAlpha = blend;
        ctx.fill();
      }

      ctx.globalAlpha = 1;

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [colorStops, amplitude, blend, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`aurora-canvas ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
};

export default Aurora;
