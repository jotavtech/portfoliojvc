import { motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import LightRays from "./LightRays";
import { MapPin, Calendar, Code2, Heart, Zap, Coffee, Rocket } from "lucide-react";
import CircularText from './CircularText';
import SplitText from './SplitText';
import SpotlightCard from './SpotlightCard';
import GlitchText from './GlitchText';
import CountUp from './CountUp';
import Timeline from "./Timeline";
import BorderGlow from "./BorderGlow";
import { BRAND_HEX, BRAND_MOTION } from "@/lib/brand-motion";
import { ABOUT_PORTRAIT_URL } from "@/lib/constants";

const calculateAge = (birthDate: Date): number => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const CAREER_START_YEAR = 2019;

const calculateYearsExperience = (): number => {
  const y = new Date().getFullYear() - CAREER_START_YEAR;
  return Math.max(5, y);
};

export default function About() {
  const age = useMemo(() => calculateAge(new Date(2005, 11, 27)), []); // 27 de Dezembro de 2005
  const yearsExperience = useMemo(() => calculateYearsExperience(), []);
  const graduationYear = "2026.1";
  const graduationDate = new Date(2026, 4, 29); // 29 de Maio de 2026

  const [countdown, setCountdown] = useState(() => {
    const now = new Date();
    return graduationDate.getTime() - now.getTime();
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(graduationDate.getTime() - Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const isGraduated = countdown <= 0;
  const totalSeconds = Math.max(0, Math.floor(countdown / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const passions = [
    { icon: <Code2 className="w-5 h-5" />, text: "Clean Code" },
    { icon: <Heart className="w-5 h-5" />, text: "UI/UX Design" },
    { icon: <Zap className="w-5 h-5" />, text: "Performance" },
    { icon: <Coffee className="w-5 h-5" />, text: "Problem Solving" },
    { icon: <Rocket className="w-5 h-5" />, text: "Innovation" },
  ];

  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const fn = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black py-20"
    >
      <div className="rock-noise pointer-events-none absolute inset-0 z-[2] opacity-[0.25]" aria-hidden />

      {/* LightRays background */}
      <div style={{ 
        width: '100%', 
        height: '100%', 
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1
      }}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />
      </div>

      {/* Overlay com desfoque sutil */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[0.5px] z-[3]" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        {/* CircularText destacado no topo da seção About */}
        <div className="mb-10 pointer-events-auto">
          <CircularText
            text="*hit the world is the objective"
            onHover="speedUp"
            spinDuration={20}
            className="custom-class"
          />
        </div>

        {/* Título com efeito Glitch */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <GlitchText 
            text="WHO IS JOTA CHAVES?" 
            className="text-5xl md:text-7xl font-black space-grotesk-bold"
            speed={0.8}
            enableOnHover={true}
          />
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16 w-full max-w-7xl">
          {/* Perfil — painel QOTSA / Hero (sem polaroid) */}
          <motion.div
            className="relative z-10 flex w-full justify-center lg:w-auto"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative w-full max-w-[300px] sm:max-w-[340px]">
              <BorderGlow
                className="w-full [&_.border-glow-inner]:overflow-hidden [&_.border-glow-inner]:rounded-lg"
                borderRadius={16}
                backgroundColor="#050505"
                glowColor="348 72 44"
                glowRadius={44}
                glowIntensity={1.05}
                edgeSensitivity={30}
                animated={!reducedMotion}
                colors={["#24060a", "#c41e3a", "#080203"]}
              >
                <div className="flex flex-col bg-[#050505]">
                  <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-black/90 px-4 py-2.5">
                    <span className="font-menu-punk text-[10px] uppercase tracking-[0.22em] text-primary">
                      Perfil
                    </span>
                    <span className="font-rock-mono text-[9px] uppercase tracking-[0.4em] text-white/40">
                      JVC · live
                    </span>
                  </div>

                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    <img
                      src={ABOUT_PORTRAIT_URL}
                      alt="João Martins — retrato"
                      className="h-full w-full object-cover object-[center_12%] contrast-[1.06] grayscale transition-[filter] duration-500 hover:grayscale-0"
                      loading="lazy"
                      decoding="async"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/15 to-black/50"
                      aria-hidden
                    />
                    <div
                      className="pointer-events-none absolute left-3 top-3 h-8 w-8 border-l-2 border-t-2 border-primary/80"
                      aria-hidden
                    />
                    <div
                      className="pointer-events-none absolute right-3 top-3 h-8 w-8 border-r-2 border-t-2 border-primary/60"
                      aria-hidden
                    />

                    <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-black/80 px-4 py-3.5 backdrop-blur-sm">
                      <p className="font-menu-punk text-[13px] uppercase leading-snug tracking-[0.12em] text-[#eaeaea] md:text-sm">
                        Fullstack × UI
                      </p>
                      <div className="mt-2 flex items-center gap-2 border-l-2 border-primary pl-3">
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
                        <span className="font-rock-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-white/85">
                          João Pessoa, PB
                        </span>
                      </div>
                      <p className="mt-1.5 font-rock-mono text-[9px] uppercase tracking-[0.35em] text-white/45">
                        {age} anos · ID stack
                      </p>
                    </div>
                  </div>
                </div>
              </BorderGlow>
            </div>
          </motion.div>

          {/* Conteúdo à direita */}
          <motion.div 
            className="flex-1 max-w-2xl text-center lg:text-left"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <SpotlightCard className="border border-white/10 bg-black/55 p-4 text-center backdrop-blur-[1px]" spotlightColor={BRAND_MOTION.spotlightSoft}>
                <div className="text-3xl font-black text-primary space-grotesk-bold">
                  <CountUp to={age} duration={2} />
                </div>
                <p className="mt-1 font-rock-mono text-[10px] uppercase tracking-[0.25em] text-white/55">Anos</p>
              </SpotlightCard>

              <SpotlightCard className="border border-white/10 bg-black/55 p-4 text-center backdrop-blur-[1px]" spotlightColor={BRAND_MOTION.spotlightSoft}>
                <div className="text-3xl font-black text-primary space-grotesk-bold">
                  <CountUp to={yearsExperience} duration={2} suffix="+" />
                </div>
                <p className="mt-1 font-rock-mono text-[10px] uppercase tracking-[0.25em] text-white/55">XP Coding</p>
              </SpotlightCard>

              <SpotlightCard className="relative overflow-hidden border border-white/10 bg-black/55 p-4 text-center backdrop-blur-[1px]" spotlightColor={BRAND_MOTION.spotlightSoft}>
                {isGraduated ? (
                  <>
                    <motion.div
                      className="absolute inset-0 bg-primary/20"
                      animate={{ opacity: [0.1, 0.3, 0.1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div
                      className="relative z-10"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <div className="text-2xl">🎓</div>
                      <p className="text-primary font-black text-sm mt-1">FORMADO!</p>
                    </motion.div>
                  </>
                ) : (
                  <>
                    <div className="text-3xl font-black text-primary space-grotesk-bold">
                      <CountUp to={days} duration={2} />
                    </div>
                    <p className="mt-1 font-rock-mono text-[10px] uppercase tracking-[0.22em] text-white/55">
                      Dias p/ Formatura
                    </p>
                  </>
                )}
              </SpotlightCard>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <SplitText 
                text="LEARN MORE ABOUT ME"
                className="text-4xl md:text-5xl font-black mb-6 text-white space-grotesk-bold"
                delay={30}
                textAlign="left"
              />
            </motion.div>
            
            <motion.p 
              className="text-white text-lg leading-relaxed font-bold"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <span className="text-primary text-6xl yesteryear-regular italic">"</span>
              Sou <span className="text-primary font-black">João Martins (Jota Chaves)</span>, desenvolvedor full stack nível pleno com mais de <span className="text-primary font-black">{yearsExperience} anos</span> de experiência profissional, e tenho <span className="text-primary font-black">{age} anos</span>. Nasci e cresci em João Pessoa, Paraíba. 
              Minha jornada na programação começou em 2020, e desde então venho me dedicando a criar experiências digitais excepcionais 
              que combinam design intuitivo com funcionalidade impecável.
            </motion.p>

            <motion.p
              className="text-white/90 text-lg leading-relaxed mt-4 font-bold"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              Atualmente, estou cursando <span className="text-primary">Sistemas para Internet na UNIESP</span> e me formo em <span className="text-primary font-black">{graduationYear}</span>!{" "}
              {isGraduated ? (
                <span className="text-primary font-black">Oficialmente formado! 🎓🎉</span>
              ) : (
                <>Faltam apenas <span className="text-primary font-black">{days}d {String(hours).padStart(2, '0')}h {String(minutes).padStart(2, '0')}m {String(seconds).padStart(2, '0')}s</span> para a formatura.</>
              )}{" "}
              Sou apaixonado por desenvolvimento front-end, onde posso combinar minha criatividade com habilidades técnicas
              para construir interfaces que não apenas funcionam perfeitamente, mas também encantam os usuários.
            </motion.p>

            <motion.p
              className="text-white/90 text-lg leading-relaxed mt-4 font-bold"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              Minha especialidade é transformar conceitos em realidade através de código limpo e design responsivo, 
              sempre buscando criar experiências que fazem a diferença na vida dos usuários. 
              Cada linha de código que escrevo é guiada pela busca da excelência e pelo desejo de inovar.
            </motion.p>

            {/* Passions */}
            <motion.div
              className="flex flex-wrap gap-3 mt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              {passions.map((passion, index) => (
                <motion.div
                  key={index}
                  className="flex min-h-[48px] items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-white/80 backdrop-blur-lg text-sm"
                  whileHover={{ scale: 1.05, borderColor: BRAND_MOTION.borderHover, color: BRAND_HEX }}
                  transition={{ duration: 0.2 }}
                >
                  {passion.icon}
                  {passion.text}
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              <motion.a
                href="#contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-bold rounded-full text-lg shadow-lg shadow-primary/30"
                whileHover={{ scale: 1.05, boxShadow: BRAND_MOTION.boxElevated }}
                whileTap={{ scale: 0.95 }}
              >
                <Calendar className="w-5 h-5" />
                Vamos trabalhar juntos!
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Timeline Section */}
        <Timeline />
      </div>
    </section>
  );
}
