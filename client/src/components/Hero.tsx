import { ArrowDown } from "lucide-react";

export default function Hero() {
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

      {/* Frases nos cantos superiores */}
      <div className="absolute top-6 left-6 text-white text-lg md:text-2xl font-serif tracking-wide z-10">
        Freedom
      </div>
      <div className="absolute top-6 right-6 text-white text-lg md:text-2xl font-serif tracking-wide z-10">
        The Creative
      </div>

      {/* Container principal centralizado */}
      <div className="z-10 w-full flex flex-col items-center justify-center text-center px-4">
        <h1
          className="font-black text-white drop-shadow-lg leading-none"
          style={{
            fontSize: "clamp(4rem, 20vw, 12rem)",
            lineHeight: 1,
            textShadow: "0 6px 30px rgba(0, 0, 0, 0.5)",
            userSelect: "none",
            margin: 0,
            padding: 0,
          }}
          aria-label="Jota Chaves"
        >
          <span className="block">JOTA</span>
          <span
            className="block"
            style={{
              color: "#FF4500",
              filter: "brightness(1.3) contrast(1.1)",
              textShadow: "0 6px 30px rgba(255, 69, 0, 0.6)",
            }}
          >
            CHAVES
          </span>
        </h1>
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