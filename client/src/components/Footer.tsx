import { ChevronUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="bg-primary py-8 text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <a href="#home" className="text-xl font-bold tracking-tight">
              João<span className="gradient-text">.</span>
            </a>
          </div>
          
          <div>
            <p className="text-neutral-400 text-sm">
              © {new Date().getFullYear()} João Vitor Chaves. Todos os direitos reservados.
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center p-2 text-neutral-400 hover:gradient-text transition-colors"
              aria-label="Voltar ao topo"
            >
              <ChevronUp className="mr-2 h-4 w-4" />
              Voltar ao topo
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
