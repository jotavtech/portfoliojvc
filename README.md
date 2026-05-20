<div align="center">

# Jotavtech Portfolio — 3.0

#### Industrial · dark · cinematic. Built like a machine, shipped like a record.

[![Next.js](https://img.shields.io/badge/Next.js-15-070707?style=flat-square&logo=next.js&labelColor=070707&color=E8E8E8)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-070707?style=flat-square&logo=typescript&labelColor=070707&color=E8E8E8)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3-070707?style=flat-square&logo=tailwindcss&labelColor=070707&color=E8E8E8)](https://tailwindcss.com/)
[![CI](https://img.shields.io/github/actions/workflow/status/jotavtech/jotavtech-portfolio/ci.yml?style=flat-square&label=ci&labelColor=070707&color=FF3B1F)](https://github.com/jotavtech/jotavtech-portfolio/actions)
[![License: MIT](https://img.shields.io/badge/license-MIT-FF3B1F?style=flat-square&labelColor=070707)](LICENSE)

</div>

---

## EN

Personal portfolio of **João Vitor Chaves Félix** — fullstack engineer, designer of industrial-looking interfaces, based in João Pessoa, Brazil.

### Stack

- **Next.js 15** — App Router, RSC, Edge OG.
- **TypeScript** — strict.
- **TailwindCSS 3.4** — custom design tokens (`ink`, `chrome`, `rust`).
- **Framer Motion** — micro-interactions, clip-path reveals.
- **GSAP + Lenis** — scroll-driven scenes, buttery scroll.
- **Canvas / shaders** — `/lab` experiments.

### Architecture

```
app/
  layout.tsx              fonts, Lenis, Grain, Header, Footer
  page.tsx                home — 7 sections
  projects/[slug]/        case studies (statically generated)
  lab/                    experimental WebGL/canvas playground
  opengraph-image.tsx     edge-rendered OG
  sitemap.ts / robots.ts
components/
  chrome/                 Header · Footer · BootSequence · LenisProvider
  primitives/             ChromeText · TerminalLabel · PaneFrame · Magnetic · ScrambleText · Grain · Scanlines
  sections/               Hero · SelectedProjects · Experience · Technologies · About · Contact · LabTeaser
  lab/                    ChromeField · WatchNode · AudioBus · NoiseLoom
content/                  projects · experience · stack · site (data layer)
lib/                      fonts · motion · utils
```

### Design system

| Token            | Value              | Purpose                       |
| ---------------- | ------------------ | ----------------------------- |
| `ink`            | `#070707`          | matte black background        |
| `chrome-100`     | `#E8E8E8`          | primary foreground            |
| `chrome-300/500` | `#A8A8A8 / #6E6E6E`| secondary type                |
| `rust-500`       | `#FF3B1F`          | accent (CTAs, REC, status)    |
| `hairline`       | `rgba(255 255 255 / .08)` | 1px UI borders         |

### Run locally

```bash
nvm use            # node 20
npm install
npm run dev        # http://localhost:3000
```

Production:

```bash
npm run build
npm start
```

Quality gates (also enforced by CI):

```bash
npm run lint
npm run typecheck
npm run format:check
```

### Deploy

Optimized for **Vercel**. Push to `main` triggers preview/prod deploys. Static routes are pre-rendered; `/lab` is fully client-side; OG image is edge.

### License

MIT © 2026 João Vitor Chaves Félix

---

## PT-BR (resumo)

Portfólio pessoal industrial/cromado. Reescrita 3.0 em Next.js 15 com design system próprio (matte black, chrome silver, accent rust burn), scroll cinético, animações com Framer Motion e GSAP, e um `/lab` com experiências em canvas e WebGL.

- `npm install && npm run dev` para rodar local.
- CI executa lint + typecheck + build em todo PR.
- Deploy automático na Vercel.

### Links

- [jotavtech / github](https://github.com/jotavtech)
- [linkedin / joaovitorchaves27](https://www.linkedin.com/in/joaovitorchaves27/)
- [whatsapp · +55 83 99929-0376](https://wa.me/5583999290376)
