import type Lenis from "lenis";

/** Compensa altura fixed header (~6rem em md+). */
const HEADER_OFFSET_PX = 96;

/** Scroll suave até `#id`; `force:true` porque o menu pára Lenis aos abrir. */
export function scrollToHash(hashOrId: string, lenis?: Lenis | null): void {
  const raw = hashOrId.startsWith("#") ? hashOrId.slice(1) : hashOrId;
  if (!raw) return;
  const asHash = `#${raw}`;

  const run = () => {
    if (lenis) {
      lenis.scrollTo(asHash, {
        offset: -HEADER_OFFSET_PX,
        duration: 1.05,
        force: true,
        programmatic: true,
      });
    } else {
      document.getElementById(raw)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    window.history.replaceState(null, "", asHash);
  };

  queueMicrotask(() => {
    requestAnimationFrame(run);
  });
}
