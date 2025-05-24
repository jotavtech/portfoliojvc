import { motion } from "framer-motion";

export default function About() {
  return (
    <section 
      id="about" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url('https://res.cloudinary.com/dzwfuzxxw/image/upload/v1748047159/assets_task_01jvzvgfn4fe798dafvcxrc9wf_1748047059_img_0_vwmthd.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay com desfoque e gradiente */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <motion.h2 
            className="text-xl uppercase tracking-widest text-secondary font-bold mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            SOBRE MIM
          </motion.h2>
          
          <motion.h3 
            className="text-4xl md:text-5xl font-black mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            CONHEÇA MAIS SOBRE MIM
          </motion.h3>
          
          <motion.p 
            className="text-white text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Olá! Sou um desenvolvedor front-end de {new Date().getFullYear() - 2005} anos, nascido e criado em João Pessoa, Paraíba. 
            Minha jornada na programação começou em 2020, e desde então tenho me dedicado a criar experiências digitais excepcionais 
            que combinam design intuitivo com funcionalidade impecável.
          </motion.p>

          <motion.p
            className="text-white/80 text-lg leading-relaxed mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            Atualmente, estou próximo de me formar (2026.1) e sou apaixonado por desenvolvimento front-end, 
            onde posso unir minha criatividade com habilidades técnicas para construir interfaces que não só 
            funcionam perfeitamente, mas também encantam os usuários. Acredito que cada projeto é uma 
            oportunidade de superar limites e entregar o melhor resultado possível.
          </motion.p>

          <motion.p
            className="text-white/80 text-lg leading-relaxed mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            Minha especialidade está em transformar conceitos em realidade através de código limpo e design 
            responsivo, sempre buscando criar experiências que façam a diferença na vida dos usuários. 
            Cada linha de código que escrevo é guiada pela busca da excelência e pelo desejo de inovar.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
