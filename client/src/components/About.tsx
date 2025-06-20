import { motion } from "framer-motion";
import Aurora from "./Aurora";
import ProfileCard from "./ProfileCard";

export default function About() {
  return (
    <section 
      id="about" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black py-20"
    >
      {/* Transição suave da seção anterior */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-slate-900 via-slate-800/80 to-transparent z-10" />

      {/* Aurora animated background */}
      <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />

      {/* Overlay com desfoque sutil */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
          {/* ProfileCard à esquerda */}
          <motion.div 
            className="w-full lg:w-auto flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <ProfileCard
              name="João Vitor"
              title="Frontend Developer"
              handle="jotavtech"
              status="Online"
              contactText="Contato"
              avatarUrl="https://res.cloudinary.com/dzwfuzxxw/image/upload/v1750340935/IMG_7967-removebg-preview_umtgzq.png"
              miniAvatarUrl="https://res.cloudinary.com/dzwfuzxxw/image/upload/v1750340935/IMG_7967-removebg-preview_umtgzq.png"
              enableTilt={true}
              onContactClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            />
          </motion.div>

          {/* Conteúdo à direita */}
          <motion.div 
            className="flex-1 max-w-2xl text-center lg:text-left"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.h2 
              className="text-xl uppercase tracking-widest text-white font-bold mb-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              QUEM É JOTA
            </motion.h2>
            
            <motion.h3 
              className="text-4xl md:text-5xl font-black mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              CONHEÇA MAIS SOBRE MIM
            </motion.h3>
            
            <motion.p 
              className="text-white text-lg leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Olá! Sou um desenvolvedor front-end de {new Date().getFullYear() - 2005} anos, nascido e criado em João Pessoa, Paraíba. 
              Minha jornada na programação começou em 2020, e desde então tenho me dedicado a criar experiências digitais excepcionais 
              que combinam design intuitivo com funcionalidade impecável.
            </motion.p>

            <motion.p
              className="text-white/90 text-lg leading-relaxed mt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              Atualmente, estou próximo de me formar (2026.1) e sou apaixonado por desenvolvimento front-end, 
              onde posso unir minha criatividade com habilidades técnicas para construir interfaces que não só 
              funcionam perfeitamente, mas também encantam os usuários. Acredito que cada projeto é uma 
              oportunidade de superar limites e entregar o melhor resultado possível.
            </motion.p>

            <motion.p
              className="text-white/90 text-lg leading-relaxed mt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              Minha especialidade está em transformar conceitos em realidade através de código limpo e design 
              responsivo, sempre buscando criar experiências que façam a diferença na vida dos usuários. 
              Cada linha de código que escrevo é guiada pela busca da excelência e pelo desejo de inovar.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
