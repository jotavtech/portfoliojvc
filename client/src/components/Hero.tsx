import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Github, Linkedin, Instagram, Mail } from "lucide-react";
import RotatingText from "./RotatingText";
import Magnet from "./Magnet";
import ShinyText from "./ShinyText";

interface HeroProps {
  showSocialLinks: boolean;
  onLogoTransform?: (isTransformed: boolean) => void;
}

const socialLinks = [
  { icon: <Github className="w-5 h-5" />, url: "https://github.com/jotavtech", label: "GitHub" },
  { icon: <Linkedin className="w-5 h-5" />, url: "https://linkedin.com/in/jotachaves", label: "LinkedIn" },
  { icon: <Instagram className="w-5 h-5" />, url: "https://instagram.com/jotachaves", label: "Instagram" },
  { icon: <Mail className="w-5 h-5" />, url: "mailto:contato@jotachaves.dev", label: "Email" },
];

const roles = [
  "Full Stack Developer",
  "UI/UX Enthusiast",
  "Problem Solver",
  "Creative Coder",
  "Tech Innovator",
];

export default function Hero({ onLogoTransform }: HeroProps) {
  const ref = useRef(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (textContainerRef.current && isHovering) {
        const rect = textContainerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) / 15;
        const deltaY = (e.clientY - centerY) / 15;
        setMousePosition({ x: deltaX, y: deltaY });
      }
    };

    if (isHovering) {
      window.addEventListener("mousemove", handleMouseMove);
    } else {
      setMousePosition({ x: 0, y: 0 });
    }

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isHovering]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      onLogoTransform?.(latest > 0.5);
    });
    return unsubscribe;
  }, [scrollYProgress, onLogoTransform]);

  return (
    <section
      ref={ref}
      id="home"
      className="min-h-screen relative flex justify-center items-center overflow-hidden bg-black"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dzwfuzxxw/image/upload/v1748037375/assets_task_01jvzj4sa2ehzr6hj5tpxgs2xk_1748037239_img_2_bpw6es.webp')`,
        }}
      />

      {/* Name */}
      <div className="absolute inset-0 flex items-center justify-center select-none z-20">
        <motion.div
          ref={textContainerRef}
          className="relative cursor-pointer"
          style={{ width: "fit-content", height: "fit-content" }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          animate={{
            x: mousePosition.x,
            y: mousePosition.y,
            scale: isHovering ? 1.05 : 1,
          }}
          transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center">
              <motion.h1
                className="text-9xl md:text-[10rem] lg:text-[13rem] xl:text-[16rem] font-black leading-none tracking-tighter relative z-10 space-grotesk-bold"
                style={{
                  color: "var(--primary-hex)",
                  textShadow: "0 0 30px rgba(var(--primary-rgb), 0.5)",
                  mixBlendMode: "normal",
                  filter: "contrast(1.2) brightness(1.1)",
                  transition: "letter-spacing 0.3s ease, text-shadow 0.3s ease, color 0.4s ease",
                  letterSpacing: isHovering ? "0.05em" : "0em",
                }}
                animate={{
                  textShadow: isHovering
                    ? "0 0 50px rgba(var(--primary-rgb), 0.8), 0 0 80px rgba(var(--primary-rgb), 0.4)"
                    : "0 0 30px rgba(var(--primary-rgb), 0.5)",
                  rotateX: isHovering ? mousePosition.y / 5 : 0,
                  rotateY: isHovering ? mousePosition.x / 5 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                JOTA
              </motion.h1>
            </div>
            <motion.h1
              className="text-7xl md:text-8xl lg:text-[10rem] xl:text-[12rem] font-black leading-none tracking-tighter relative z-10 ml-8 md:ml-12 lg:ml-16 xl:ml-20 space-grotesk-bold"
              style={{
                color: "var(--primary-hex)",
                textShadow: "0 0 30px rgba(var(--primary-rgb), 0.5)",
                mixBlendMode: "normal",
                filter: "contrast(1.2) brightness(1.1)",
                transition: "letter-spacing 0.3s ease, text-shadow 0.3s ease, color 0.4s ease",
                letterSpacing: isHovering ? "0.05em" : "0em",
              }}
              animate={{
                textShadow: isHovering
                  ? "0 0 50px rgba(var(--primary-rgb), 0.8), 0 0 80px rgba(var(--primary-rgb), 0.4)"
                  : "0 0 30px rgba(var(--primary-rgb), 0.5)",
                rotateX: isHovering ? mousePosition.y / 5 : 0,
                rotateY: isHovering ? mousePosition.x / 5 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              CHAVES
            </motion.h1>
          </div>
        </motion.div>
      </div>

      {/* Side text */}
      <motion.div
        className="absolute inset-0 pointer-events-none select-none z-20"
        style={{ opacity, y }}
      >
        <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2">
          <motion.div
            className="flex flex-col gap-2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <p className="text-white text-2xl md:text-3xl font-serif italic tracking-wider">
              Freedom
            </p>
            <p className="text-white/50 text-sm tracking-widest uppercase">
              Since 2020
            </p>
          </motion.div>
        </div>

        <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 flex flex-col items-end">
          <motion.div
            className="flex flex-col gap-2 items-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <p className="text-white text-2xl md:text-3xl font-serif italic tracking-wider">
              The Creative
            </p>
            <p className="text-white/50 text-sm tracking-widest uppercase">
              João Pessoa, PB
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Rotating role */}
      <motion.div
        className="absolute bottom-32 left-1/2 -translate-x-1/2 z-30"
        style={{ opacity }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <div className="flex items-center gap-3 text-white/80">
          <span className="text-lg md:text-xl">I'm a</span>
          <RotatingText
            texts={roles}
            className="text-lg md:text-xl font-bold text-primary"
            rotationInterval={2500}
          />
        </div>
      </motion.div>

      {/* Social links */}
      <motion.div
        className="fixed left-4 md:left-8 bottom-1/4 z-40 flex flex-col gap-4"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        {socialLinks.map((social, index) => (
          <Magnet key={index} padding={50} magnetStrength={0.3}>
            <motion.a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all duration-300"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={social.label}
            >
              {social.icon}
            </motion.a>
          </Magnet>
        ))}
        <div className="w-px h-20 bg-gradient-to-b from-white/30 to-transparent mx-auto" />
      </motion.div>

      {/* "+" symbols */}
      <div className="absolute inset-0 pointer-events-none select-none z-10">
        {[
          { top: "20%", left: "15%", size: "4xl", delay: 0.2 },
          { top: "35%", right: "25%", size: "3xl", delay: 0.4 },
          { top: "60%", left: "10%", size: "5xl", delay: 0.6 },
          { top: "75%", right: "15%", size: "2xl", delay: 0.8 },
          { top: "25%", left: "70%", size: "4xl", delay: 1.0 },
          { top: "80%", left: "60%", size: "3xl", delay: 1.2 },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className={`absolute text-white/30 text-${pos.size} font-bold`}
            style={{ top: pos.top, left: pos.left, right: (pos as any).right }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: pos.delay }}
          >
            +
          </motion.div>
        ))}
      </div>

      {/* (27) badge */}
      <motion.div className="relative z-30 container mx-auto px-6 text-center flex flex-col items-center justify-center min-h-screen" style={{ scale }}>
        <motion.span
          className="fixed md:absolute bottom-8 right-8 font-extrabold text-7xl md:text-8xl leading-none z-40 select-none pointer-events-none text-primary"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          (27)
        </motion.span>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center z-40"
        style={{ opacity }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <ShinyText text="Scroll" className="text-white font-bold mb-2 text-lg" />
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="text-white drop-shadow-lg" size={32} />
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
    </section>
  );
}
