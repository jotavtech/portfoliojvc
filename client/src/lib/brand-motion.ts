/** QOTSA vermelho #c41e3a — literais RGBA para Framer Motion (não interpolar CSS vars). */
export const BRAND_HEX = "#c41e3a";

export const rgbaBrand = (alpha: number) => `rgba(196, 30, 58, ${alpha})`;

export const BRAND_MOTION = {
  spotlightSoft: rgbaBrand(0.2),
  spotlightCard: rgbaBrand(0.25),
  glowHover: rgbaBrand(0.4),
  borderHover: rgbaBrand(0.5),
  textShadowIdle: "0 0 30px rgba(196, 30, 58, 0.5)",
  textShadowHover:
    "0 0 50px rgba(196, 30, 58, 0.8), 0 0 80px rgba(196, 30, 58, 0.4)",
  boxElevated: "0 20px 40px rgba(196, 30, 58, 0.4)",
} as const;
