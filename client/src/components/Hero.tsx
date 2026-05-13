import { useRef, useEffect, useState, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import RotatingText from "./RotatingText";
import Magnet from "./Magnet";
import ShinyText from "./ShinyText";
import { BRAND_MOTION } from "@/lib/brand-motion";
import BorderGlow from "./BorderGlow";
import EvilEye from "./EvilEye";

interface HeroProps {
  showSocialLinks: boolean;
  onLogoTransform?: (isTransformed: boolean) => void;
}

const socialLinks = [
  { icon: <Github className="w-5 h-5" />, url: "https://github.com/jotavtech", label: "GitHub" },
  { icon: <Linkedin className="w-5 h-5" />, url: "https://linkedin.com/in/jotachaves", label: "LinkedIn" },
  { icon: <Mail className="w-5 h-5" />, url: "mailto:contato@jotachaves.dev", label: "Email" },
];

const roles = [
  "Fullstack Developer",
  "Design Engineer",
  "React / TypeScript",
  "PHP / Laravel",
  "UI/UX · Motion",
];

function formatSurveillanceTime(d: Date) {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}

const birth = new Date(2005, 11, 27);
function computeAge(): number {
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

export default function Hero({ showSocialLinks: _showSocialLinks, onLogoTransform }: HeroProps) {
  const ref = useRef(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const artRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [artTilt, setArtTilt] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [camTime, setCamTime] = useState(() => new Date());
  const [reducedMotion, setReducedMotion] = useState(false);
  const age = useMemo(() => computeAge(), []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  useEffect(() => {
    const tick = () => setCamTime(new Date());
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (textContainerRef.current && isHovering) {
        const rect = textContainerRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        setMousePosition({ x: (e.clientX - cx) / 15, y: (e.clientY - cy) / 15 });
      }
      if (artRef.current) {
        const r = artRef.current.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        setArtTilt({
          x: Math.max(-12, Math.min(12, (e.clientY - cy) / 25)),
          y: Math.max(-12, Math.min(12, (cx - e.clientX) / 25)),
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
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
      className="min-h-screen relative flex flex-col justify-center overflow-hidden bg-[#050505]"
    >
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dzwfuzxxw/image/upload/v1748037375/assets_task_01jvzj4sa2ehzr6hj5tpxgs2xk_1748037239_img_2_bpw6es.webp')`,
        }}
      />
      <div className="absolute inset-0 z-[5] bg-gradient-to-b from-black/90 via-[#050505]/92 to-black" />
      <div className="absolute inset-0 z-[6] mix-blend-color-dodge bg-[radial-gradient(ellipse_70%_50%_at_70%_30%,hsl(var(--wild)/0.12),transparent)]" />

      {/* Scanline hint */}
      <div
        className="pointer-events-none absolute inset-0 z-[7] opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.06) 2px, rgba(255,255,255,0.06) 4px)",
        }}
        aria-hidden
      />

      <div className="pointer-events-none absolute left-[8%] top-[14%] z-[15] hidden font-mono text-[10px] uppercase tracking-[0.35em] text-[#6B6B6B] md:block">
        SYS · BOOT_OK
      </div>
      <div className="pointer-events-none absolute right-[6%] top-[14%] z-[15] hidden text-right font-mono text-[10px] tracking-wider text-[#6B6B6B] md:block">
        <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-primary" aria-hidden />
        <span className="text-primary">REC</span> CAM_02 · {formatSurveillanceTime(camTime)}
      </div>

      <motion.div
        className="relative z-20 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-6 py-28 lg:py-0"
        style={{ scale }}
      >
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          {/* Left column */}
          <motion.div style={{ opacity, y }}>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.45em] text-[#BDBDBD]/80">
              FULLSTACK INTERFACE
            </p>
            <div
              ref={textContainerRef}
              className="relative cursor-pointer"
              style={{ width: "fit-content" }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <motion.h1
                className="font-jota-display text-6xl leading-[0.9] tracking-tight text-[#F3F3F3] sm:text-8xl md:text-9xl lg:text-[7.5rem]"
                animate={{
                  x: mousePosition.x,
                  y: mousePosition.y,
                  scale: isHovering ? 1.03 : 1,
                  rotateX: isHovering ? mousePosition.y / 8 : 0,
                  rotateY: isHovering ? mousePosition.x / 8 : 0,
                  textShadow: isHovering ? BRAND_MOTION.textShadowHover : BRAND_MOTION.textShadowIdle,
                }}
                transition={{ type: "spring", stiffness: 120, damping: 18 }}
                style={{ color: "var(--primary-hex)" }}
              >
                JOTA
              </motion.h1>
              <motion.h1
                className="font-jota-display mt-1 text-6xl leading-[0.9] tracking-tight text-[#F3F3F3] sm:text-8xl md:text-9xl lg:text-[7.5rem]"
                animate={{
                  x: mousePosition.x,
                  y: mousePosition.y,
                  scale: isHovering ? 1.03 : 1,
                  rotateX: isHovering ? mousePosition.y / 8 : 0,
                  rotateY: isHovering ? mousePosition.x / 8 : 0,
                  textShadow: isHovering ? BRAND_MOTION.textShadowHover : BRAND_MOTION.textShadowIdle,
                }}
                transition={{ type: "spring", stiffness: 120, damping: 18 }}
                style={{ color: "var(--primary-hex)" }}
              >
                CHAVES
              </motion.h1>
            </div>

            <div className="mt-6 max-w-lg space-y-2 font-rock-body text-sm font-semibold uppercase leading-relaxed tracking-[0.18em] text-[#BDBDBD] md:text-base">
              <p>Fullstack Developer</p>
              <p>Design Engineer</p>
              <p className="text-primary">Digital Chaos</p>
            </div>

            <motion.div
              className="mt-10 flex flex-wrap items-center gap-3 text-[#F3F3F3]/85"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="font-mono text-xs uppercase tracking-widest text-[#6B6B6B]">Role</span>
              <RotatingText
                texts={roles}
                className="text-sm font-bold text-primary md:text-base"
                rotationInterval={2600}
              />
            </motion.div>
          </motion.div>

          {/* Right column — só o olho (WebGL); transição tipo “quadro ligado” */}
          <motion.div
            ref={artRef}
            className="relative mx-auto flex w-full max-w-xl justify-center lg:mx-0 lg:max-w-none lg:justify-end"
            style={{ opacity, y }}
          >
            <motion.div
              className="relative w-full max-w-[min(100%,460px)]"
              style={{
                transform: `perspective(1100px) rotateX(${artTilt.x * 0.45}deg) rotateY(${artTilt.y * 0.45}deg)`,
                transition: "transform 0.18s ease-out",
              }}
              {...(!reducedMotion
                ? {
                    initial: {
                      clipPath: "inset(14% 16% 14% 16% round 16px)",
                      filter: "brightness(1.35) contrast(1.08)",
                    },
                    animate: {
                      clipPath: "inset(0% 0% 0% 0% round 14px)",
                      filter: "brightness(1) contrast(1)",
                    },
                    transition: { duration: 0.62, ease: [0.2, 0.9, 0.2, 1] as const, delay: 0.06 },
                  }
                : {})}
            >
              <motion.div
                {...(!reducedMotion
                  ? {
                      initial: { scale: 1.045 },
                      animate: { scale: 1 },
                      transition: { type: "spring" as const, stiffness: 520, damping: 32, delay: 0.04 },
                    }
                  : {})}
                className="w-full"
              >
                <BorderGlow
                  className="w-full [&_.border-glow-inner]:overflow-hidden [&_.border-glow-inner]:rounded-xl"
                  borderRadius={16}
                  backgroundColor="#050505"
                  glowColor="348 72 44"
                  glowRadius={52}
                  glowIntensity={1.15}
                  edgeSensitivity={34}
                  animated={!reducedMotion}
                  colors={["#32080c", "#c41e3a", "#080203"]}
                >
                  <div className="relative flex aspect-square w-full items-stretch bg-[#050505] md:aspect-[4/5] md:max-h-[min(70vh,540px)]">
                    <div className="noise-overlay relative min-h-[280px] w-full md:min-h-[340px]">
                      <EvilEye
                        className="min-h-[280px] h-full w-full md:min-h-[340px]"
                        eyeColor="#8b0a0a"
                        intensity={1.5}
                        pupilSize={0.58}
                        irisWidth={0.22}
                        glowIntensity={0.34}
                        scale={0.32}
                        noiseScale={0.92}
                        pupilFollow={2.2}
                        flameSpeed={2.6}
                        backgroundColor="#050505"
                      />
                      <div className="pointer-events-none absolute inset-x-0 bottom-4 text-center font-mono text-[9px] uppercase tracking-[0.55em] text-white/55">
                        WATCH NODE · LIVE
                      </div>
                    </div>
                  </div>
                </BorderGlow>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Social */}
      <motion.div
        className="fixed left-4 md:left-8 bottom-1/4 z-40 flex flex-col gap-4"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        {socialLinks.map((social, index) => (
          <Magnet key={index} padding={50} magnetStrength={0.3}>
            <motion.a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 min-h-[48px] w-12 min-w-[48px] items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-lg transition-all duration-300 hover:border-primary hover:bg-primary"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={social.label}
            >
              {social.icon}
            </motion.a>
          </Magnet>
        ))}
        <div className="mx-auto h-20 w-px bg-gradient-to-b from-white/30 to-transparent" />
      </motion.div>

      {/* Decor + */}
      <div className="pointer-events-none absolute inset-0 z-10 select-none">
        {[
          { top: "20%", left: "15%", cls: "text-4xl", delay: 0.2 },
          { top: "35%", right: "25%", cls: "text-3xl", delay: 0.4 },
          { top: "60%", left: "10%", cls: "text-5xl", delay: 0.6 },
          { top: "75%", right: "15%", cls: "text-2xl", delay: 0.8 },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className={`absolute font-bold text-white/20 ${pos.cls}`}
            style={{ top: pos.top, left: pos.left, right: pos.right }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: pos.delay }}
          >
            +
          </motion.div>
        ))}
      </div>

      <motion.span
        className="pointer-events-none absolute bottom-28 right-6 z-40 hidden select-none font-jota-display text-6xl leading-none text-primary sm:block md:bottom-32 md:right-10 md:text-8xl"
        style={{ opacity }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        aria-hidden
      >
        ({age})
      </motion.span>

      <motion.div
        className="absolute bottom-16 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center"
        style={{ opacity }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
      >
        <ShinyText text="Scroll" className="mb-2 text-lg font-bold text-white" />
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="drop-shadow-lg text-white" size={32} />
        </motion.div>
      </motion.div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
