import { motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import LightRays from "./LightRays";
import { ArrowUpRight, MapPin, Calendar, Code2, Heart, Zap, Coffee, Rocket } from "lucide-react";
import CircularText from './CircularText';
import SplitText from './SplitText';
import SpotlightCard from './SpotlightCard';
import GlitchText from './GlitchText';
import CountUp from './CountUp';
import Timeline from './Timeline';

const calculateAge = (birthDate: Date): number => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const calculateYearsExperience = (): number => {
  return new Date().getFullYear() - 2020;
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

  return (
    <section 
      id="about" 
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black py-20"
    >
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
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] z-2" />

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
            text="WHO IS JOTA?" 
            className="text-5xl md:text-7xl font-black space-grotesk-bold"
            speed={0.8}
            enableOnHover={true}
          />
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16 w-full max-w-7xl">
          {/* Imagem à esquerda com SpotlightCard */}
          <motion.div 
            className="w-full lg:w-auto flex justify-center relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <SpotlightCard className="p-2 pb-8 !overflow-visible" spotlightColor="rgba(var(--primary-rgb), 0.3)">
              <div className="relative">
                <span className="absolute left-1/2 -translate-x-1/2 top-8 md:top-6 text-white font-serif italic text-lg md:text-xl lg:text-2xl whitespace-nowrap pointer-events-none select-none z-20" style={{textShadow: '0 2px 8px #0008'}}>Fullstack Development</span>
                <img
                  src="https://res.cloudinary.com/dzwfuzxxw/image/upload/f_auto,q_auto,w_1000/v1753372753/5f6be734-92a8-4231-84c8-4ef6c21f7e2d_dqadw0.jpg"
                  alt="João Vitor"
                  className="w-96 h-96 object-cover rounded-lg filter grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute -top-4 -right-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    <ArrowUpRight className="w-8 h-8 text-primary" />
                  </motion.div>
                </div>

                {/* Info badge */}
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-10 flex gap-3">
                  <motion.div 
                    className="px-4 py-2 bg-primary rounded-full flex items-center gap-2 text-primary-foreground text-sm font-bold shadow-lg shadow-primary/30"
                    whileHover={{ scale: 1.05 }}
                  >
                    <MapPin className="w-4 h-4" />
                    João Pessoa, PB
                  </motion.div>
                </div>
              </div>
            </SpotlightCard>
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
              <SpotlightCard className="p-4 text-center">
                <div className="text-3xl font-black text-primary space-grotesk-bold">
                  <CountUp to={age} duration={2} />
                </div>
                <p className="text-white/70 text-xs uppercase tracking-wider mt-1">Anos</p>
              </SpotlightCard>
              
              <SpotlightCard className="p-4 text-center">
                <div className="text-3xl font-black text-primary space-grotesk-bold">
                  <CountUp to={yearsExperience} duration={2} suffix="+" />
                </div>
                <p className="text-white/70 text-xs uppercase tracking-wider mt-1">XP Coding</p>
              </SpotlightCard>
              
              <SpotlightCard className="p-4 text-center relative overflow-hidden">
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
                    <p className="text-white/70 text-xs uppercase tracking-wider mt-1">Dias p/ Formatura</p>
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
              E aí! Sou um desenvolvedor full stack de <span className="text-primary font-black">{age} anos</span>, nascido e criado em João Pessoa, Paraíba. 
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
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-lg border border-white/10 rounded-full text-white/80 text-sm"
                  whileHover={{ scale: 1.05, borderColor: "rgba(var(--primary-rgb), 0.5)", color: "var(--primary-hex)" }}
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
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(var(--primary-rgb), 0.4)" }}
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
