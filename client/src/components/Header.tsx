import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToHash } from "@/lib/scroll-to-hash";
import { useIsMobile } from "@/hooks/use-mobile";
import ThemeSwitcher from "./ThemeSwitcher";
import AudioToggle from "./AudioToggle";
import { useLenisScroll } from "@/providers/SmoothScrollProvider";

interface HeaderProps {
  activeSection: string | null;
  mobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  logoTransformed?: boolean;
}

const navigation = [
  { name: "Home", href: "#home" },
  { name: "Projects", href: "#projects" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Header({
  activeSection,
  mobileMenuOpen,
  toggleMobileMenu,
  logoTransformed = false,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState(() => new Date());
  const isMobile = useIsMobile();
  const { lenisRef } = useLenisScroll();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    const updateTime = () => setTime(new Date());

    window.addEventListener("scroll", handleScroll);
    const timeInterval = setInterval(updateTime, 1000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(timeInterval);
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    if (mobileMenuOpen) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, [mobileMenuOpen, lenisRef]);

  const navigateToSection = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
      e.preventDefault();
      if (mobileMenuOpen) toggleMobileMenu();
      scrollToHash(hash, lenisRef.current);
    },
    [mobileMenuOpen, toggleMobileMenu, lenisRef],
  );

  const pausePortal =
    typeof document !== "undefined"
      ? createPortal(
          <AnimatePresence mode="wait">
            {mobileMenuOpen && (
              <motion.div
                className="fixed inset-0 z-[150]"
                role="dialog"
                aria-modal="true"
                aria-label="Menu de navegação"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.14, ease: "easeOut" }}
              >
                <motion.button
                  type="button"
                  className="absolute right-8 top-8 z-[160] rounded border border-primary/35 bg-black/70 px-4 py-3 font-menu-punk text-xs uppercase tracking-widest text-stone-200 backdrop-blur-sm transition-colors hover:border-primary hover:text-primary"
                  aria-label="Fechar menu"
                  initial={{ x: 56 }}
                  animate={{ x: 0 }}
                  transition={{ duration: 0.28, ease: [0.25, 0.9, 0.35, 1] }}
                  onClick={toggleMobileMenu}
                >
                  Fechar ✕
                </motion.button>

                <div
                  className="absolute inset-0 bg-[#030303]"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-overlay"
                  aria-hidden
                  style={{
                    backgroundImage: grainDataUrl(),
                    backgroundRepeat: "repeat",
                    backgroundSize: "220px 220px",
                  }}
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(196,30,58,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(196,30,58,0.05)_1px,transparent_1px)] bg-[length:48px_48px]"
                  aria-hidden
                />

                <div
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_50%_35%,transparent_38%,rgba(0,0,0,0.92)_94%)]"
                  aria-hidden
                />

                <div className="relative z-[155] mx-auto flex h-full max-w-5xl flex-col px-10 pb-14 pt-[18vh] md:flex-row md:items-start md:gap-24 md:px-16">
                  <motion.div
                    className="mb-14 hidden md:block md:w-[18%]"
                    initial={{ x: -56 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.3, ease: [0.2, 0.85, 0.36, 1] }}
                  >
                    <div className="font-mono text-[10px] uppercase tracking-[0.5em] text-stone-500">
                      {time.toLocaleDateString("pt-BR", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                    <div className="mt-6 font-mono text-3xl text-stone-300">
                      {time.toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </div>
                  </motion.div>

                  <div className="relative flex flex-1 flex-col md:pt-4">
                    <div
                      className="absolute -left-2 top-0 hidden h-full w-1 bg-gradient-to-b from-primary/80 via-stone-600/40 to-transparent md:block"
                      aria-hidden
                    />
                    <motion.p
                      className="mb-8 font-rock-mono text-[10px] font-bold uppercase tracking-[0.7em] text-primary"
                      initial={{ x: -40 }}
                      animate={{ x: 0 }}
                      transition={{ duration: 0.28, ease: [0.2, 0.82, 0.35, 1] }}
                    >
                      JOTA CHAVES · PAUSED
                    </motion.p>
                    <nav aria-label="Secções">
                      <ul className="flex flex-col gap-1 md:gap-3">
                        {navigation.map((item, i) => {
                          const id = item.href.slice(1);
                          const active = activeSection === id;
                          return (
                            <motion.li
                              key={item.name}
                              initial={{ x: 112, skewX: -2 }}
                              animate={{ x: 0, skewX: 0 }}
                              transition={{
                                delay: 0.04 + i * 0.05,
                                duration: 0.34,
                                ease: [0.15, 0.85, 0.2, 1],
                              }}
                            >
                              <a
                                href={item.href}
                                onClick={(ev) => navigateToSection(ev, item.href)}
                                className={cn(
                                  "group relative block py-1 pl-0 font-menu-punk text-4xl uppercase tracking-[0.04em] text-stone-200 transition-colors md:text-7xl md:pl-6 md:leading-[0.95]",
                                  active ? "text-primary" : "hover:text-primary",
                                )}
                              >
                                <span
                                  className={cn(
                                    "absolute left-0 top-1/2 hidden h-px w-8 -translate-y-1/2 bg-primary transition-all md:block",
                                    active ? "opacity-100" : "opacity-0 group-hover:opacity-60",
                                  )}
                                  aria-hidden
                                />
                                {item.name}
                              </a>
                            </motion.li>
                          );
                        })}
                      </ul>
                    </nav>

                    {isMobile && (
                      <motion.div
                        className="mt-10 flex flex-wrap items-center gap-4 border-t border-primary/25 pt-8"
                        initial={{ x: 48 }}
                        animate={{ x: 0 }}
                        transition={{ duration: 0.32, ease: [0.2, 0.82, 0.35, 1], delay: 0.32 }}
                      >
                        <AudioToggle />
                        <ThemeSwitcher />
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )
      : null;

  return (
    <header
      className={cn(
        "fixed w-full z-[120] transition-all duration-300",
        scrolled ? "py-2" : "py-4",
      )}
    >
      {pausePortal}
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <a
              href="#home"
              onClick={(ev) => navigateToSection(ev, "#home")}
              className={cn(
                "text-lg font-bold tracking-tight text-white hover:text-primary transition-all duration-500 md:text-xl",
                logoTransformed ? "opacity-0 scale-0" : "opacity-100 scale-100",
              )}
            >
              JOTA CHAVES
            </a>

            <AnimatePresence>
              {logoTransformed && (
                <motion.a
                  href="#home"
                  onClick={(ev) => navigateToSection(ev, "#home")}
                  className="text-xl font-bold tracking-tight text-white hover:text-primary transition-colors"
                  initial={{ opacity: 0, scale: 0, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <span className="text-primary">JC</span>
                </motion.a>
              )}
            </AnimatePresence>

            {!isMobile && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.4 }}
              >
                <AudioToggle />
              </motion.div>
            )}

            {!isMobile && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <ThemeSwitcher />
              </motion.div>
            )}
          </div>

          <button
            type="button"
            onClick={toggleMobileMenu}
            className="relative z-[160] flex h-14 min-h-[48px] min-w-[48px] flex-col items-center justify-center space-y-3 group"
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-8 w-8 text-white" />
            ) : (
              <>
                <div className="w-10 h-1 bg-white transform transition-all duration-300 group-hover:bg-primary group-hover:rotate-45 group-hover:translate-y-1.5" />
                <div className="w-10 h-1 bg-white transform transition-all duration-300 group-hover:bg-primary group-hover:-rotate-45 group-hover:-translate-y-1.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

function grainDataUrl() {
  return `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`;
}
