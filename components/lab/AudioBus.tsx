"use client";

import { useEffect, useRef, useState } from "react";

export function AudioBus() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr: number = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      width = r.width;
      height = r.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let raf = 0;
    let analyser: AnalyserNode | null = null;
    let dataArray: Uint8Array | null = null;
    let stream: MediaStream | null = null;
    let audioCtx: AudioContext | null = null;
    let t = 0;

    const initMic = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioCtx = new AudioContext();
        const src = audioCtx.createMediaStreamSource(stream);
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 128;
        src.connect(analyser);
        dataArray = new Uint8Array(analyser.frequencyBinCount);
      } catch {
        setError("mic denied · running synthetic");
      }
    };

    if (enabled) initMic();

    const draw = () => {
      t += 0.025;
      ctx.clearRect(0, 0, width, height);
      const bars = 48;
      const gap = 2;
      const barW = (width - gap * (bars - 1)) / bars;

      const synth: number[] = [];
      if (analyser && dataArray) {
        analyser.getByteFrequencyData(dataArray as unknown as Uint8Array<ArrayBuffer>);
        for (let i = 0; i < bars; i++) {
          const idx = Math.floor((i / bars) * dataArray.length);
          synth.push(dataArray[idx] / 255);
        }
      } else {
        for (let i = 0; i < bars; i++) {
          const f = i / bars;
          synth.push(
            (Math.sin(t + f * 4) * 0.5 + 0.5) * (1 - f * 0.4) *
              (0.4 + Math.sin(t * 0.6 + f * 8) * 0.3),
          );
        }
      }

      for (let i = 0; i < bars; i++) {
        const h = synth[i] * (height * 0.85);
        const x = i * (barW + gap);
        const y = height - h;
        ctx.fillStyle = i > bars - 6 ? "#FF3B1F" : i > bars - 14 ? "#C8C8C8" : "#6E6E6E";
        ctx.fillRect(x, y, barW, h);
      }

      // baseline
      ctx.fillStyle = "rgba(255,255,255,0.08)";
      ctx.fillRect(0, height - 1, width, 1);

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      stream?.getTracks().forEach((tr) => tr.stop());
      audioCtx?.close();
    };
  }, [enabled]);

  return (
    <div className="relative h-full w-full bg-ink">
      <canvas ref={canvasRef} className="block h-full w-full" />
      <button
        onClick={() => setEnabled((e) => !e)}
        className="absolute bottom-3 right-3 border border-chrome-300/40 bg-ink/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.32em] text-chrome-200 backdrop-blur transition-colors hover:border-rust-500 hover:bg-rust-500 hover:text-ink"
      >
        {enabled ? "STOP MIC" : "ENABLE MIC"}
      </button>
      <span className="absolute left-3 top-3 font-mono text-[10px] uppercase tracking-[0.32em] text-chrome-500">
        · FFT_128 · 48kHz
      </span>
      {error && (
        <span className="absolute right-3 top-3 font-mono text-[10px] uppercase tracking-[0.32em] text-rust-400">
          {error}
        </span>
      )}
    </div>
  );
}
