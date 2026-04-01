import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useMemo, useState, useEffect } from "react";
import { GraduationCap, Briefcase, Code, Award, Calendar } from "lucide-react";
import CountUp from "./CountUp";

interface TimelineItem {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  type: "education" | "work" | "project" | "achievement";
  current?: boolean;
}

const calculateAge = (birthDate: Date): number => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const GRADUATION_DATE = new Date(2026, 4, 29); // 29 de Maio de 2026

const calculateDaysUntilGraduation = (): number => {
  const diffTime = GRADUATION_DATE.getTime() - Date.now();
  return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
};

const Timeline: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const age = useMemo(() => calculateAge(new Date(2005, 11, 27)), []);
  const yearsOfExperience = useMemo(() => new Date().getFullYear() - 2020, []);

  const [countdown, setCountdown] = useState(() => GRADUATION_DATE.getTime() - Date.now());
  useEffect(() => {
    const timer = setInterval(() => setCountdown(GRADUATION_DATE.getTime() - Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const isGraduated = countdown <= 0;
  const totalSec = Math.max(0, Math.floor(countdown / 1000));
  const cDays = Math.floor(totalSec / 86400);
  const cHours = Math.floor((totalSec % 86400) / 3600);
  const cMinutes = Math.floor((totalSec % 3600) / 60);
  const cSeconds = totalSec % 60;

  const timelineItems: TimelineItem[] = [
    {
      year: "2026.1",
      title: isGraduated ? "Formado em Sistemas para Internet!" : "Formatura em Sistemas para Internet",
      subtitle: "UNIESP",
      description: isGraduated
        ? "Oficialmente tecnólogo em Sistemas para Internet! 🎓"
        : `Em ${cDays} dias serei oficialmente um tecnólogo em Sistemas para Internet!`,
      type: "education",
      current: true,
    },
    {
      year: "2024",
      title: "Início da Graduação",
      subtitle: "UNIESP - Sistemas para Internet",
      description: "Começando a jornada acadêmica em tecnologia, focado em desenvolvimento web e sistemas.",
      type: "education",
    },
    {
      year: "2024",
      title: "Desenvolvedor Full Stack",
      subtitle: "Projetos Freelance & Empresas",
      description: "Desenvolvimento de aplicações web completas com React, Laravel, e tecnologias modernas.",
      type: "work",
    },
    {
      year: "2020",
      title: "Primeiros Passos na Programação",
      subtitle: "Autodidata & Cursos Online",
      description: "Descoberta do mundo da programação e início dos estudos com JavaScript, HTML e CSS.",
      type: "achievement",
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "education":
        return <GraduationCap className="w-6 h-6" />;
      case "work":
        return <Briefcase className="w-6 h-6" />;
      case "project":
        return <Code className="w-6 h-6" />;
      case "achievement":
        return <Award className="w-6 h-6" />;
      default:
        return <Calendar className="w-6 h-6" />;
    }
  };

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      {/* Stats Section */}
      <motion.div
        className="container mx-auto px-6 mb-20"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10">
            <div className="text-5xl font-black text-primary space-grotesk-bold">
              <CountUp to={age} duration={2} />
            </div>
            <p className="text-white/70 mt-2 text-sm uppercase tracking-wider">Anos de Vida</p>
          </div>
          
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10">
            <div className="text-5xl font-black text-primary space-grotesk-bold">
              <CountUp to={yearsOfExperience} duration={2} suffix="+" />
            </div>
            <p className="text-white/70 mt-2 text-sm uppercase tracking-wider">Anos Codando</p>
          </div>
          
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10">
            <div className="text-5xl font-black text-primary space-grotesk-bold">
              <CountUp to={50} duration={2} suffix="+" />
            </div>
            <p className="text-white/70 mt-2 text-sm uppercase tracking-wider">Projetos</p>
          </div>
          
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 relative overflow-hidden">
            {isGraduated ? (
              <>
                <motion.div
                  className="absolute inset-0 bg-primary/15"
                  animate={{ opacity: [0.1, 0.35, 0.1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="relative z-10"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <div className="text-4xl mb-1">🎓</div>
                  <p className="text-primary font-black text-lg">FORMADO!</p>
                </motion.div>
              </>
            ) : (
              <>
                <div className="text-4xl font-black text-primary space-grotesk-bold leading-none">
                  {cDays}<span className="text-lg text-white/40">d</span>{" "}
                  {String(cHours).padStart(2, "0")}<span className="text-lg text-white/40">h</span>
                </div>
                <div className="text-2xl font-black text-primary space-grotesk-bold leading-none mt-1">
                  {String(cMinutes).padStart(2, "0")}<span className="text-lg text-white/40">m</span>{" "}
                  {String(cSeconds).padStart(2, "0")}<span className="text-lg text-white/40">s</span>
                </div>
                <p className="text-white/70 mt-2 text-sm uppercase tracking-wider">Formatura</p>
              </>
            )}
          </div>
        </div>
      </motion.div>

      {/* Timeline */}
      <div className="container mx-auto px-6 relative">
        {/* Vertical Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary via-white/30 to-transparent" />

        <div className="space-y-16">
          {timelineItems.map((item, index) => (
            <motion.div
              key={index}
              className={`flex items-center gap-8 ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              {/* Content */}
              <div className={`flex-1 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                <motion.div
                  className={`inline-block p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 ${
                    item.current ? "border-primary/50 shadow-lg shadow-primary/20" : ""
                  }`}
                  whileHover={{ scale: 1.02, borderColor: "rgba(var(--primary-rgb), 0.5)" }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-primary font-bold text-sm uppercase tracking-wider">
                    {item.year}
                    {item.current && (
                      <span className="ml-2 px-2 py-0.5 bg-primary/20 rounded-full text-xs">
                        Em andamento
                      </span>
                    )}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-2 space-grotesk-bold">
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-sm mt-1">{item.subtitle}</p>
                  <p className="text-white/80 mt-3 leading-relaxed">{item.description}</p>
                </motion.div>
              </div>

              {/* Icon */}
              <motion.div
                className={`w-14 h-14 rounded-full flex items-center justify-center z-10 ${
                  item.current
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/50"
                    : "bg-white/10 text-white border border-white/20"
                }`}
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {getIcon(item.type)}
              </motion.div>

              {/* Empty space for alignment */}
              <div className="flex-1" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
