import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";

export default function About() {
  const { ref, isInView } = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="about" className="py-20 bg-neutral-100">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div 
            ref={ref}
            className={cn(
              "relative reveal-element",
              isInView && "active"
            )}
          >
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&h=900" 
              alt="João Vitor Chaves no estúdio" 
              className="w-full h-auto rounded-xl shadow-xl"
            />
            <motion.div 
              className="absolute -top-5 -left-5 bg-white p-4 rounded-lg shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <p className="text-5xl font-bold text-secondary">7+</p>
              <p className="text-sm text-neutral-500">Anos de Experiência</p>
            </motion.div>
            <motion.div 
              className="absolute -bottom-5 -right-5 bg-white p-4 rounded-lg shadow-lg"
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <p className="text-5xl font-bold text-accent">50+</p>
              <p className="text-sm text-neutral-500">Projetos Concluídos</p>
            </motion.div>
          </div>
          
          <div 
            className={cn(
              "space-y-6 reveal-element",
              isInView && "active"
            )}
          >
            <h2 className="text-sm uppercase tracking-widest text-secondary font-semibold">
              Sobre mim
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold">
              Designer e desenvolvedor com paixão por criar experiências digitais excepcionais
            </h3>
            <p className="text-neutral-500">
              Olá! Sou João Vitor, designer e desenvolvedor com base em São Paulo, Brasil. Há mais de 7 anos, tenho trabalhado na criação de experiências digitais que combinam estética e funcionalidade.
            </p>
            <p className="text-neutral-500">
              Minha abordagem é centrada no usuário, buscando sempre entender as necessidades do público para criar soluções que não apenas pareçam boas, mas também funcionem perfeitamente.
            </p>
            <p className="text-neutral-500">
              Quando não estou trabalhando, gosto de explorar novas tendências de design, fotografar e aprender novas tecnologias para expandir meu conjunto de habilidades.
            </p>
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-lg font-semibold mb-2">Educação</h4>
                <ul className="space-y-2 text-neutral-500">
                  <li>Bacharelado em Design Digital - Universidade XYZ, 2016</li>
                  <li>Mestrado em UX Design - Instituto ABC, 2018</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">Experiência</h4>
                <ul className="space-y-2 text-neutral-500">
                  <li>Designer Sênior - Studio Design, 2020-Presente</li>
                  <li>UI/UX Designer - Tech Solutions, 2018-2020</li>
                  <li>Web Designer - Agência Criativa, 2016-2018</li>
                </ul>
              </div>
            </div>
            <a 
              href="#contact" 
              className="inline-block px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-all"
            >
              Entre em contato
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
