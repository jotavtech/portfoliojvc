import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "@/lib/gsap-setup";

type LenisCtx = {
  lenisRef: React.RefObject<Lenis | null>;
};

const LenisScrollContext = createContext<LenisCtx | null>(null);

export function useLenisScroll() {
  const ctx = useContext(LenisScrollContext);
  return ctx ?? { lenisRef: { current: null } as React.RefObject<Lenis | null> };
}

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      ScrollTrigger.refresh();
      return undefined;
    }

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      touchMultiplier: 1.8,
      anchors: {
        offset: -96,
      },
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    let frame = 0;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    ScrollTrigger.refresh();

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      lenisRef.current = null;
      lenis.destroy();
      ScrollTrigger.refresh();
    };
  }, []);

  const value = useMemo(() => ({ lenisRef }), []);

  return (
    <LenisScrollContext.Provider value={value}>
      {children}
    </LenisScrollContext.Provider>
  );
}
