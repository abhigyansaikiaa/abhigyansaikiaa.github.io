# Jack — 3D Creator

A dark-themed 3D creator portfolio landing page built with **React + TypeScript + Vite + Tailwind CSS + Framer Motion**. Designed for one-click deployment on **Vercel**.

## Stack

- React 18 / TypeScript
- Vite (build tool)
- Tailwind CSS (utility-first styling)
- Framer Motion (animations + scroll effects)
- Lucide React (icon set, available for future additions)
- Kanit font (Google Fonts, weights 300–900)

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → /dist
npm run preview  # serve /dist locally
```

## Project structure

```
src/
├── App.tsx                  # composes all sections
├── main.tsx                 # React entry
├── index.css                # global styles + .hero-heading gradient
└── components/
    ├── HeroSection.tsx      # navbar, massive heading, magnetic portrait
    ├── MarqueeSection.tsx   # two scroll-driven horizontal image rows
    ├── AboutSection.tsx     # corner 3D objects, animated paragraph
    ├── ServicesSection.tsx  # white section with 5 numbered services
    ├── ProjectsSection.tsx  # sticky-stacking project cards
    │
    ├── ContactButton.tsx    # gradient pill CTA
    ├── LiveProjectButton.tsx# ghost outline pill
    ├── FadeIn.tsx           # whileInView animation wrapper
    ├── Magnet.tsx           # mouse-following magnetic hover
    └── AnimatedText.tsx     # char-by-char scroll-driven reveal
```

## Deploy to Vercel

### Option A — via the Vercel dashboard (easiest)

1. Push this folder to a new GitHub / GitLab / Bitbucket repo.
2. Go to [vercel.com/new](https://vercel.com/new) → import the repo.
3. Vercel auto-detects **Vite**. Defaults are correct:
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`
4. Click **Deploy**.

### Option B — via the Vercel CLI

```bash
npm i -g vercel
vercel        # follow prompts (first deploy = preview)
vercel --prod # promote to production
```

A `vercel.json` is included with an SPA rewrite rule so deep links resolve to `index.html`.

## Customisation pointers

| Want to change… | Open this file |
|---|---|
| Name / nav links / hero text | `src/components/HeroSection.tsx` |
| Marquee images | `src/components/MarqueeSection.tsx` (top-level `IMAGES` array) |
| About paragraph + decorative 3D images | `src/components/AboutSection.tsx` |
| Services list | `src/components/ServicesSection.tsx` (`SERVICES` array) |
| Projects content + images | `src/components/ProjectsSection.tsx` (`PROJECTS` array) |
| Brand gradient / dark colour / font | `src/index.css` and `tailwind.config.js` |
| Page title / meta description | `index.html` |

All images currently point to external URLs (Figma site CDN + motionsites.ai + higgs.ai CloudFront). To use your own assets, drop them in `public/` and reference them as `/your-image.png`.
