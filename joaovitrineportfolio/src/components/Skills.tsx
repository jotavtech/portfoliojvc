import React from "react";
import { motion } from "framer-motion";

const skills = [
  { name: "HTML", description: "Estruturação de páginas web." },
  { name: "CSS", description: "Estilização e design responsivo." },
  { name: "JavaScript", description: "Interatividade e lógica de programação." },
  { name: "React", description: "Desenvolvimento de interfaces modernas." },
];

export default function Skills() {
  return (
    <motion.section
      id="skills"
      className="min-h-screen relative flex items-center justify-center overflow-hidden bg-black"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        backgroundImage: `url('/path-to-your-image.webp')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div className="container mx-auto px-6 relative z-10 py-20">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-xl uppercase tracking-widest text-gray-400 font-bold mb-3">
            MINHAS HABILIDADES
          </h2>
          <h3 className="text-4xl md:text-5xl font-black mb-6 text-white drop-shadow-lg">
            EXPERTISE & TECNOLOGIAS
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 text-center"
            >
              <h4 className="text-xl font-bold mb-2 text-white">{skill.name}</h4>
              <p className="text-white/80 font-medium">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}