import { ArrowDown } from "lucide-react";

interface HeroProps {
  showSocialLinks: boolean;
}

export default function Hero({ showSocialLinks }: HeroProps) {
  return (
    <section
      id="home"
      className="min-h-screen relative flex justify-center items-center overflow-hidden"
      style={{
        backgroundImage: `url('https://res.cloudinary.com/dzwfuzxxw/image/upload/v1748037375/assets_task_01jvzj4sa2ehzr6hj5tpxgs2xk_1748037239_img_2_bpw6es.webp')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay transparente com blur */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      {/* Container principal centralizado */}
      <div className="z-10 w-full flex flex-col items-center justify-center text-center px-4">
        {/* Frases laterais */}
        <div className="absolute left-6 text-white text-lg md:text-2xl font-serif tracking-wide z-10 transform -translate-y-20">
          Freedom
        </div>
        <div className="absolute right-6 text-white text-lg md:text-2xl font-serif tracking-wide z-10 transform -translate-y-20">
          The Creative
        </div>

        <h1 className="hero-name">
          <span className="block" style={{ color: 'white' }}>JOTA</span>
          <span
            className="block"
            style={{
              color: '#FF4500',
              textShadow: '0 6px 30px rgba(255, 69, 0, 0.6)',
            }}
          >
            CHAVES
          </span>
        </h1>
        
        {showSocialLinks && (
          <div className="mt-12 flex justify-center gap-6">
            <a
              href="https://github.com/seu-usuario"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/seu-usuario"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-colors"
            >
              LinkedIn
            </a>
          </div>
        )}
      </div>

      {/* Indicador de rolagem estático */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
        <span className="text-white font-bold mb-2 text-lg drop-shadow-md">Scroll</span>
        <div className="animate-bounce">
          <ArrowDown className="text-white drop-shadow-lg" size={32} />
        </div>
      </div>
    </section>
  );
}