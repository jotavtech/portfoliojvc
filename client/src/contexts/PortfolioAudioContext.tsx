import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface PortfolioAudioContextValue {
  enabled: boolean;
  setEnabled: (v: boolean) => void;
  canPlay: boolean;
  /** Garante AudioContext em execução (obrigatório após gesto do utilizador). */
  primeAudio: () => Promise<void>;
}

const PortfolioAudioContext = createContext<PortfolioAudioContextValue | null>(null);

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/** Very low stereo noise + low saw "sub" — no external assets, toggled off by default. */
function startHum(ctx: AudioContext, gainNode: GainNode) {
  const duration = 2;
  const bufferSize = ctx.sampleRate * duration;
  const noiseBuffer = ctx.createBuffer(2, bufferSize, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const data = noiseBuffer.getChannelData(ch);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.1;
    }
  }
  const noise = ctx.createBufferSource();
  noise.buffer = noiseBuffer;
  noise.loop = true;
  const hp = ctx.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = 400;
  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 2800;

  noise.connect(hp);
  hp.connect(lp);
  lp.connect(gainNode);

  const osc = ctx.createOscillator();
  osc.type = "sawtooth";
  osc.frequency.value = 55;
  const oscGain = ctx.createGain();
  oscGain.gain.value = 0.022;
  osc.connect(oscGain);
  oscGain.connect(gainNode);

  noise.start();
  osc.start();

  return () => {
    try {
      noise.stop();
      osc.stop();
    } catch {
      // ignore
    }
  };
}

export function PortfolioAudioProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabledState] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const stopRef = useRef<(() => void) | null>(null);
  const gainConnectedRef = useRef(false);

  const primeAudio = useCallback(async () => {
    if (reducedMotion) return;
    const ctx = ctxRef.current ?? new AudioContext();
    ctxRef.current = ctx;
    try {
      if (ctx.state === "suspended") await ctx.resume();
      setCanPlay(ctx.state === "running");
    } catch {
      setCanPlay(false);
    }
  }, [reducedMotion]);

  const setEnabled = useCallback(
    (next: boolean) => {
      if (reducedMotion) return;
      setEnabledState(next);
    },
    [reducedMotion],
  );

  useEffect(() => {
    const onFirst = () => {
      void primeAudio();
    };
    window.addEventListener("pointerdown", onFirst, { once: true });
    window.addEventListener("keydown", onFirst, { once: true });
    return () => {
      window.removeEventListener("pointerdown", onFirst);
      window.removeEventListener("keydown", onFirst);
    };
  }, [primeAudio]);

  useEffect(() => {
    if (reducedMotion || !enabled) {
      if (stopRef.current) {
        stopRef.current();
        stopRef.current = null;
      }
      const g = gainRef.current;
      if (g) {
        try {
          g.gain.cancelScheduledValues(g.context.currentTime);
          g.gain.setValueAtTime(0, g.context.currentTime);
        } catch {
          g.gain.value = 0;
        }
      }
      return;
    }

    let cancelled = false;

    async function boot() {
      const ctx = ctxRef.current ?? new AudioContext();
      ctxRef.current = ctx;
      try {
        await ctx.resume();
      } catch {
        /* browser policy — toggle click must have called primeAudio */
      }

      setCanPlay(!cancelled && ctx.state === "running");
      if (cancelled) return;

      let master = gainRef.current;
      if (!master) {
        master = ctx.createGain();
        gainRef.current = master;
      }
      if (!gainConnectedRef.current) {
        master.connect(ctx.destination);
        gainConnectedRef.current = true;
      }

      try {
        master.gain.cancelScheduledValues(ctx.currentTime);
        master.gain.setValueAtTime(0.09, ctx.currentTime);
      } catch {
        master.gain.value = 0.09;
      }

      stopRef.current?.();
      stopRef.current = startHum(ctx, master);
    }

    void boot();

    return () => {
      cancelled = true;
      if (stopRef.current) {
        stopRef.current();
        stopRef.current = null;
      }
      const g = gainRef.current;
      if (g?.context) {
        try {
          g.gain.cancelScheduledValues(g.context.currentTime);
          g.gain.setValueAtTime(0, g.context.currentTime);
        } catch {
          g.gain.value = 0;
        }
      }
    };
  }, [enabled, reducedMotion]);

  return (
    <PortfolioAudioContext.Provider value={{ enabled, setEnabled, canPlay, primeAudio }}>
      {children}
    </PortfolioAudioContext.Provider>
  );
}

export function usePortfolioAudio() {
  const ctx = useContext(PortfolioAudioContext);
  if (!ctx) throw new Error("usePortfolioAudio must be inside PortfolioAudioProvider");
  return ctx;
}
