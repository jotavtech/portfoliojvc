import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.section
      id="about"
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
            SOBRE MIM
          </h2>
          <h3 className="text-4xl md:text-5xl font-black mb-6 text-white drop-shadow-lg">
            CONHEÇA MAIS SOBRE MIM
          </h3>
        </div>

        <div className="text-white text-lg leading-relaxed">
          <p>
            Sou um desenvolvedor apaixonado por criar experiências digitais incríveis. Com
            experiência em desenvolvimento web e design, busco sempre entregar projetos de alta
            qualidade e impacto visual.
          </p>
          <p className="mt-4">
            Meu objetivo é transformar ideias em realidade, utilizando as melhores práticas e
            tecnologias disponíveis no mercado.
          </p>
        </div>
      </div>
    </motion.section>
  );
}