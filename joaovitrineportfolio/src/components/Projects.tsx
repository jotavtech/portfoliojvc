import React from "react";
import { motion } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "Portfólio Pessoal - João Vitor Chaves",
    description: "Um portfólio moderno e responsivo para destacar os trabalhos de João Vitor Chaves.",
  },
  {
    id: 2,
    title: "Portfólio Criativo - João Vitor Chaves",
    description: "Um portfólio criativo com animações e design único para João Vitor Chaves.",
  },
  {
    id: 3,
    title: "Casa de Massagem Relaxar",
    description: "Site institucional para uma casa de massagem, com informações sobre serviços e agendamentos.",
  },
  {
    id: 4,
    title: "E-commerce de Maquiagem",
    description: "Loja virtual para venda de produtos de maquiagem, com design moderno e responsivo.",
  },
  {
    id: 5,
    title: "Venda de Templates",
    description: "Site para venda de templates de sites e designs prontos, com foco em desenvolvedores e designers.",
  },
];

export default function Projects() {
  return (
    <motion.section
      id="projects"
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
            MEUS TRABALHOS
          </h2>
          <h3 className="text-4xl md:text-5xl font-black mb-6 text-white drop-shadow-lg">
            PROJETOS EM DESTAQUE
          </h3>
        </div>

        {/* Grid de projetos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
            >
              <h4 className="text-xl font-bold mb-2 text-white">{project.title}</h4>
              <p className="text-white/80 font-medium">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}