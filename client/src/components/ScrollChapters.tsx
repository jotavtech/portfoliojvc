import { useLayoutEffect, useRef, useState, useEffect, type RefObject } from "react";
import { gsap } from "@/lib/gsap-setup";

function ChapterContent({
  pinRef,
  line1Ref,
  line2Ref,
  line3Ref,
  badgeRef,
  variant = "pinned",
}: {
  pinRef: RefObject<HTMLDivElement>;
  line1Ref: RefObject<HTMLHeadingElement>;
  line2Ref: RefObject<HTMLParagraphElement>;
  line3Ref: RefObject<HTMLParagraphElement>;
  badgeRef: RefObject<HTMLDivElement>;
  variant?: "pinned" | "static";
}) {
  return (
    <div
      ref={pinRef}
      className={
        variant === "static"
          ? "relative flex min-h-[65vh] flex-col items-center justify-center overflow-hidden px-6 py-16"
          : "relative flex h-screen flex-col items-center justify-center overflow-hidden px-6"
      }
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,hsl(var(--wild)/0.15),transparent_55%),radial-gradient(ellipse_60%_40%_at_80%_20%,hsl(var(--primary)/0.12),transparent_50%)]"
        aria-hidden
      />
      <div
        ref={badgeRef}
        className="font-marker mb-8 rotate-[-4deg] border-2 border-dashed border-wild bg-black/60 px-5 py-2 text-sm uppercase tracking-[0.35em] text-wild shadow-[4px_4px_0_hsl(var(--primary))]"
      >
        side a · desert session
      </div>
      <h2
        ref={line1Ref}
        className="font-punk-display text-center text-5xl uppercase leading-[0.9] text-[#e8dcc4] sm:text-7xl md:text-8xl lg:text-9xl"
      >
        feel the
        <span className="block text-primary">grit</span>
      </h2>
      <p
        ref={line2Ref}
        className="mt-8 max-w-xl text-center font-rock-body text-lg text-stone-400 md:text-xl"
      >
        Cada secção é um track. Scroll como quem folheia um zine — papel, ruído e um bocado de
        atitude.
      </p>
      <p
        ref={line3Ref}
        className="font-rock-mono mt-6 text-[10px] uppercase tracking-[0.55em] text-stone-600"
      >
        stoner · punk · y2k bleed
      </p>
    </div>
  );
}

/**
 * Pinned "chapter" between Hero and Projects — scrubbed narrative (Spotify-campaign style).
 */
export default function ScrollChapters() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLParagraphElement>(null);
  const line3Ref = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useLayoutEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=220%",
            scrub: 1.15,
            pin: pin,
          },
        })
        .from(line1Ref.current, {
          opacity: 0,
          y: 100,
          rotateZ: -4,
          scale: 0.92,
        })
        .from(line2Ref.current, { opacity: 0, y: 48 }, "-=0.35")
        .from(line3Ref.current, { opacity: 0, letterSpacing: "0.5em" }, "-=0.4")
        .from(badgeRef.current, { scale: 0.4, rotate: -25, opacity: 0 }, "-=0.55")
        .to(line1Ref.current, { opacity: 0, y: -72, rotateZ: 2, scale: 1.06 }, 0.42)
        .to(line2Ref.current, { opacity: 0, y: -36 }, 0.48)
        .to(line3Ref.current, { opacity: 0, y: -24 }, 0.52)
        .to(badgeRef.current, { scale: 1.15, opacity: 0, rotate: 20 }, 0.5);
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <section
        id="scene-chapter"
        className="relative bg-black py-24"
        aria-label="Capítulo de apresentação"
      >
        <ChapterContent
          pinRef={pinRef}
          line1Ref={line1Ref}
          line2Ref={line2Ref}
          line3Ref={line3Ref}
          badgeRef={badgeRef}
          variant="static"
        />
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="scene-chapter"
      className="relative bg-black"
      aria-label="Capítulo interativo de scroll"
    >
      <ChapterContent
        pinRef={pinRef}
        line1Ref={line1Ref}
        line2Ref={line2Ref}
        line3Ref={line3Ref}
        badgeRef={badgeRef}
      />
    </section>
  );
}
