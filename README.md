<div align="center">

# 🔴 PokéFolio

### A Pokémon-themed developer portfolio that lets visitors choose a starter and re-themes itself around their type.

[![Next.js](https://img.shields.io/badge/Next.js-16-000?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-ff4d8d?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Deploy](https://img.shields.io/badge/Deployed_on-Vercel-000?logo=vercel)](https://vercel.com)

**[⚡ Live Demo → pokemon-psi-ashen.vercel.app](https://pokemon-psi-ashen.vercel.app)**

</div>

---

## ✨ Overview

PokéFolio reimagines the developer portfolio of **Shahriar Ahmed Seam** ( AI/ML Engineer &
LLM Researcher) as a Pokémon journey. Visitors **choose a starter** through the Professor's
trial, after which the **entire site re-themes** to their type — Fire, Water, Grass or
Electric — and the choice is remembered on their next visit.

It's a single, cinematic scrolling experience with real Pokémon artwork, a custom Poké Ball
cursor, and content organised around a Pokémon metaphor.

## 🎮 Features

| Section | The Play |
| --- | --- |
| **Cinematic Hero** | Full-screen backdrop, animated title, floating starter artwork, custom spinning Poké Ball cursor with an energy trail. |
| **Choose Your Starter** | A 5-question Professor's trial (or pick directly). The result **re-themes the whole site** and persists via `localStorage`. |
| **Trainer Card** | About section as a Pokémon Trainer ID — with a type-matched avatar, a party roster, and animated scanline. |
| **Battle Lab** | Skills presented as battle **moves** with type badges, categories and power ratings, grouped into move-sets. |
| **Project Dex** | Projects as caught Pokémon — each a real Pokédex-style entry with official artwork, type, and links. Filterable. |
| **Region Journey** | Career & experience as gym badges earned across regions. |
| **Pokémon League** | A contact form styled as challenging the Champion. |

### 🎨 Craft details

- **Four type themes** applied through CSS custom properties for instant, animated re-theming.
- **Real Pokémon artwork** from the open [PokéAPI](https://pokeapi.co) sprite set, served via the jsDelivr CDN and optimised by `next/image`.
- **Custom effects** — spinning Poké Ball cursor, energy motes, twinkles — pure CSS/React.
- **Accessible** — `prefers-reduced-motion` support, keyboard navigation, ARIA labels, fine-pointer-only cursor.
- **Fast & SEO-ready** — statically generated, AVIF/WebP images, dynamic OG image, `sitemap.xml` and `robots.txt`.

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router) · React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 with a custom design-token system
- **Animation:** Framer Motion
- **Data:** PokéAPI artwork (build-agnostic CDN URLs) + Unsplash backdrops (resolved at build time)
- **Hosting:** Vercel

## 🚀 Getting Started

```bash
npm install
npm run dev   # → http://localhost:3000
```

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Lint the codebase |
| `npm run fetch:images` | Refresh cinematic backdrops from Unsplash (needs `UNSPLASH_ACCESS_KEY`) |

## ✏️ Making it yours

All personal content lives in **[`src/data/portfolio.ts`](src/data/portfolio.ts)** — profile,
socials, moves (skills), Project Dex and journey. Type definitions and the starter quiz live
in [`src/data/types.ts`](src/data/types.ts). Trainer avatars are in `public/trainer/`.

## 📁 Project Structure

```
src/
├── app/                    # App Router: layout, page, SEO (sitemap, robots, OG image)
├── components/
│   ├── layout/             # Navbar, Footer
│   ├── fx/                 # Pokeball, PokeballCursor, Particles
│   ├── sections/           # Hero, Starter, Trainer, BattleLab, ProjectDex, RegionJourney, League
│   └── ui/                 # Reveal, SectionHeading, UnsplashImage, TypeBadge, BrandIcons
├── context/                # TypeProvider (theme + persistence)
├── data/                   # portfolio.ts, types.ts, images.json  ← your content
└── lib/                    # utils, hooks
scripts/
└── fetch-images.mjs        # build-time Unsplash resolver
```

## ⚖️ Disclaimer

A **fan-made tribute** for a developer portfolio. Not affiliated with, endorsed by, or
sponsored by Nintendo, Game Freak, or The Pokémon Company. Pokémon and all related names are
trademarks of their respective owners. Artwork courtesy of the open [PokéAPI](https://pokeapi.co);
photography via [Unsplash](https://unsplash.com).

## 📜 License

Released under the [MIT License](LICENSE).

<div align="center">

_Gotta build 'em all._

</div>
