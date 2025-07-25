import { motion } from "framer-motion";
import LightRays from "./LightRays";
import { ArrowUpRight } from "lucide-react";
import CircularText from './CircularText';

export default function About() {
  return (
    <section 
      id="about" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black py-20"
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
            text=" hit the world is the objective"
            onHover="speedUp"
            spinDuration={20}
            className="custom-class"
          />
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
          {/* Imagem à esquerda */}
          <motion.div 
            className="w-full lg:w-auto flex justify-center relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="relative">
              {/* Frase na curvatura da cabeça */}
              <span className="absolute left-1/2 -translate-x-1/2 top-8 md:top-6 text-white font-serif italic text-lg md:text-xl lg:text-2xl whitespace-nowrap pointer-events-none select-none" style={{textShadow: '0 2px 8px #0008'}}>Fullstack Development</span>
              <img
                src="https://res.cloudinary.com/dzwfuzxxw/image/upload/f_auto,q_auto,w_1000/v1753372753/5f6be734-92a8-4231-84c8-4ef6c21f7e2d_dqadw0.jpg"
                alt="João Vitor"
                className="w-96 h-96 object-cover rounded-lg filter grayscale"
              />
              <div className="absolute -top-4 -right-4">
                <ArrowUpRight className="w-8 h-8 text-[#ff4500]" />
              </div>
            </div>
          </motion.div>

          {/* Conteúdo à direita */}
          <motion.div 
            className="flex-1 max-w-2xl text-center lg:text-left"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.h2 
              className="text-xl uppercase tracking-widest text-white font-bold mb-3 space-grotesk-semibold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              WHO IS JOTA
            </motion.h2>
            
            <motion.h3 
              className="text-4xl md:text-5xl font-black mb-6 text-white space-grotesk-bold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              LEARN MORE ABOUT ME
            </motion.h3>
            
            <motion.p 
              className="text-white text-lg leading-relaxed font-bold"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <span className="text-[#ff4500] text-6xl yesteryear-regular italic">"</span>
              Hello! I'm a full stack developer, 19 years old, born and raised in João Pessoa, Paraíba. 
              My programming journey began in 2020, and since then I've been dedicated to creating exceptional digital experiences 
              that combine intuitive design with impeccable functionality.
            </motion.p>

            <motion.p
              className="text-white/90 text-lg leading-relaxed mt-4 font-bold"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              Currently, I'm close to graduating (2026.1) and I'm passionate about front-end development, 
              where I can combine my creativity with technical skills to build interfaces that not only 
              work perfectly, but also enchant users. I believe that each project is an 
              opportunity to push boundaries and deliver the best possible result.
            </motion.p>

            <motion.p
              className="text-white/90 text-lg leading-relaxed mt-4 font-bold"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              My specialty is transforming concepts into reality through clean code and responsive design, 
              always seeking to create experiences that make a difference in users' lives. 
              Every line of code I write is guided by the pursuit of excellence and the desire to innovate.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
