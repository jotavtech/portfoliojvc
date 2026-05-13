import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { usePortfolioAudio } from "@/contexts/PortfolioAudioContext";
import { cn } from "@/lib/utils";

/**
 * Toggle for optional procedural ambient bed (off by default, disabled with reduced motion).
 */
export default function AudioToggle() {
  const { enabled, setEnabled, primeAudio } = usePortfolioAudio();

  return (
    <motion.button
      type="button"
      onClick={() => {
        void (async () => {
          await primeAudio();
          setEnabled(!enabled);
        })();
      }}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 backdrop-blur-sm transition-colors",
        enabled ? "border-primary/60 bg-primary/15 text-primary" : "hover:border-primary/40 hover:text-primary",
      )}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      aria-pressed={enabled}
      aria-label={enabled ? "Desligar áudio ambiente" : "Ligar áudio ambiente"}
      title={enabled ? "Desligar ruído ambiente" : "Ligar ruído ambiente (muito baixo)"}
    >
      {enabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
    </motion.button>
  );
}
