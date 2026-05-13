import { ChevronUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="border-t border-white/[0.07] bg-[#050505] py-8 font-mono text-[11px] uppercase tracking-[0.18em] text-[#6B6B6B]">
      <div className="container mx-auto px-6">
        <div className="mb-6 flex flex-col gap-3 border border-white/10 bg-[#0D0D0D]/90 px-4 py-3 text-[10px] text-[#BDBDBD]/90 md:flex-row md:items-center md:justify-between">
          <span className="text-[#F3F3F3]/90">
            <span className="text-primary">JOTA CHAVES</span> · DEV STACK v2.5.1 · ONLINE
          </span>
          <span className="hidden text-[#6B6B6B] md:inline">BUILD_OK · SYS_IDLE</span>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <a
            href="#home"
            className="text-sm font-bold tracking-[0.35em] text-[#F3F3F3] transition-colors hover:text-primary"
          >
            JOTA<span className="text-primary">.</span>CHAVES
          </a>

          <p className="text-center normal-case tracking-normal text-[#6B6B6B]">
            © {new Date().getFullYear()} João Martins — Jota Chaves. All rights reserved.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 border border-white/15 bg-black/40 px-4 py-2 text-[10px] text-[#BDBDBD] transition-colors hover:border-primary/60 hover:text-primary"
            aria-label="Voltar ao topo"
          >
            <ChevronUp className="h-4 w-4" />
            SYS.REBOOT ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
