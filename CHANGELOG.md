# Changelog

All notable changes documented here. Format inspired by [Keep a Changelog](https://keepachangelog.com).

## [3.0.0] — 2026-05-20

### Added

- Full rewrite on **Next.js 15** App Router with TypeScript and Tailwind 3.4.
- New industrial design system: matte black, chrome silver, rust accent.
- 7 custom-built sections: Hero, Selected Projects, Experience, Technologies, About, Contact, Lab.
- `/lab` experimental playground with 4 mini-experiments (ChromeField, WatchNode, AudioBus, NoiseLoom).
- `/projects/[slug]` statically generated case study pages.
- Edge-rendered Open Graph image via `app/opengraph-image.tsx`.
- `sitemap.ts` and `robots.ts` for SEO.
- Smooth scroll via Lenis, scroll-pinned timelines via Framer Motion.
- CI pipeline: lint + typecheck + build on every PR.
- Conventional commits, Prettier + ESLint flat config.
- Bilingual README (EN primary / PT-BR summary), MIT license.

### Removed

- Legacy Vite + React app (`/client`).
- Legacy Express server (`serve-static.js`, `start-frontend.js`).
- Replit / Railway / Nixpacks configs.
- Stale folders: `projects.tsx/`, `relogiojavascript/`, `attached_assets/`.
- Dead dependencies: Express, Drizzle, Neon, Passport, Wouter, OGL, Postprocessing, and 20+ unused Radix primitives.
- Performance/Resumo MD files (consolidated into this changelog).

## [2.x] — 2024–2025

QOTSA / AIC / RHCP rock-themed Vite portfolio with WebGL EvilEye hero and ReactBits effects. Archived in git history.
