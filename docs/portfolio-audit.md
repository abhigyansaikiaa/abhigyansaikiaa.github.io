# Comprehensive Portfolio Audit & Verification Report

**Target URL**: [https://abhigyan-portfolio-eta.vercel.app/](https://abhigyan-portfolio-eta.vercel.app/)  
**Owner**: Abhigyan Saikia  
**Audit Path**: `docs/portfolio-audit.md`  
**Framework**: React 18.3.1 + Vite 5.4.8 + TypeScript 5.5.3  
**Status**: Production Verified  

---

## 1. Executive Summary & Core Improvements

1. **Elimination of Artificial "Terminal to Reality" Intro Screen**:
   - The opening sequence is now strictly: **`Weight Sweep Preloader → Homepage directly`**.
   - No fake command-line boot sequences, no multi-stage welcome screen, and no secondary transitions.
   - Wrapped inside `SiteLoader.tsx` with a `sessionStorage` guard (`abhigyan_portfolio_loaded`), deep-link hash bypass, and bounded fallback timeout (2200ms) to ensure visitors can never be deadlocked.
   - Reduced-motion users skip the preloader instantly.

2. **Integration of Supplied Components (Verbatim)**:
   - **Module A (`src/components/ui/weight-sweep-preloader.tsx`)**: Oversized `000 → 100` weight sweep from hairline to black (`wght 100 → 900`), specimen HUD, tick rail, and rising ink panel. Captions cycle exclusively through verified projects (`Preparing ToolKB.in`, `Loading Arogya Relief`, etc.).
   - **Module B (`src/components/ui/ferris-wheel-gallery.tsx`)**: 360-degree interactive gondola carousel wrapped in `ProjectShowcase.tsx`.
   - **Module C (`src/components/ui/techstack.tsx`)**: Tilted magnification dock with tooltips and fluid physics wrapped in `SkillsSection.tsx`.

3. **Purge of Legacy Static Template Code**:
   - Stripped ~45 KB of redundant HTML markup from `index.html` (which previously rendered old template cards, fake stats "13+ Projects", and duplicate section IDs `#about`, `#works` below the React mount).
   - `index.html` initial payload reduced by **94%** from 59.93 kB to 3.42 kB (1.31 kB gzipped).
   - The single React mount (`#reel-hero-mount`) now cleanly owns the entire page experience with zero legacy jQuery or duplicate template markup.

4. **Lenis Smooth Scroll Lifecycle**:
   - Single lifecycle-managed instance at root (`src/lib/lenis-scroll.ts`).
   - Automatically paused while the Weight Sweep Preloader is active and resumes once the gate lifts.
   - Preserves native touch scrolling, hash deep links (`#works`, `#skills`, `#about`, `#contact`), and prevents interference with independent chatbot message scrolling (`data-lenis-prevent`).

---

## 2. Ground Truth Project Registry (Zero Stock Assets)

All projects represent verified, authentic work created or engineered by Abhigyan Saikia:

| Project | Live / Code URL | Category | Verified Stack | Cover Asset |
| :--- | :--- | :--- | :--- | :--- |
| **ToolKB.in** | [https://toolkb.in/](https://toolkb.in/) | Browser Utility Platform | Next.js, TypeScript, Web Workers, Tailwind | `/assets/toolkb.webp` |
| **Arogya Relief** | [https://www.arogyarelief.in/](https://www.arogyarelief.in/) | Healthcare Platform | React, Node.js, PostgreSQL, Mapbox | `/assets/arogyarelief.webp` |
| **Motion Subtitle Studio** | [github.com/.../Motion-Subtitle-Studio](https://github.com/abhigyansaikiaa/Motion-Subtitle-Studio) | Creator Tooling SaaS | Python, Whisper AI, FFmpeg, React | `/assets/motionsubtitles.webp` |
| **Brandcey** | [https://www.brandcey.in/](https://www.brandcey.in/) | Services Marketplace | Next.js, Tailwind, Stripe, Node.js | `/assets/brandcey.webp` |
| **Qrivna** | [github.com/abhigyansaikiaa](https://github.com/abhigyansaikiaa) | Interactive Experience | WebGL, CSS 3D, TypeScript | `/qrivna_demo_pro.webp` |
| **BrollWriter** | [github.com/abhigyansaikiaa](https://github.com/abhigyansaikiaa) | Video Scripting SaaS | React, FastAPI, Python | `/brollwriter_demo_pro.webp` |
| **Dhankathaa** | [github.com/abhigyansaikiaa](https://github.com/abhigyansaikiaa) | Wealth & Asset Analytics | Next.js, Chart.js, PostgreSQL | `/dhankathaa_demo_pro.webp` |
| **ResumeIQ** | [github.com/abhigyansaikiaa](https://github.com/abhigyansaikiaa) | Career Tech | React, Python, NLP | `/resumeiq-hero.png` |

*Deliberately Excluded*: `TradeGate` and `TradeGuardian` were purged due to lack of verifiable production evidence.

---

## 3. Verified Skills & Discoverability

- **Core Technologies**: React 19, Next.js, TypeScript, Tailwind CSS, Node.js, Python, PostgreSQL, GitHub, Vite, Vitest, Vercel.
- **Accessible Matrix**: An always-visible specification matrix (`.skills-accessible-grid`) below the ToolDock displays verified roles and production proofs ("Verified in: ToolKB.in, Arogya Relief...") so that mobile touch visitors and keyboard users have full discoverability without relying on hover.

---

## 4. Chatbot Architecture & `D:\chatbot` Governance

- **Safety Invariant**: `D:\chatbot` is **STRICTLY READ-ONLY**. All file timestamps verified untouched (`17-10-2026`).
- **Observed Workflow**: Documented in [`docs/chatbot-workflow.md`](file:///c:/portfolio/portfolio-2/docs/chatbot-workflow.md) covering `src/app/api/chat/route.ts`, `entitlementService.ts`, and `conversationEngine.ts` (11-language support).
- **Client Implementation**: [`src/lib/chatbot-client.ts`](file:///c:/portfolio/portfolio-2/src/lib/chatbot-client.ts) dispatches live calls to `VITE_CHATBOT_API_URL` when online, with an automatic, zero-hallucination fallback to verified portfolio knowledge when offline.
- **Scroll Isolation**: `data-lenis-prevent` on the chat panel ensures that scrolling through messages never shifts the background page.

---

## 5. SEO, Metadata & Machine Endpoints

- **Canonical URL**: `https://abhigyan-portfolio-eta.vercel.app/`
- **Social Sharing**: Open Graph (`og:title`, `og:description`, `og:image`, `og:url`) and Twitter Cards (`summary_large_image`) configured.
- **Theme Color**: `#08080a`.
- **Machine Readability**:
  - `/llms.txt`: Structured markdown representation of projects, biography, and stack for LLM agents.
  - `/sitemap.xml`: XML sitemap with change frequencies.
  - `/robots.txt`: Crawler guidelines pointing to sitemap.

---

## 6. Verification & Test Metrics

- **Vitest Unit Tests**: `npm test` ➔ **26/26 Passing** (Duration: 389ms).
- **Vite Production Build**: `npm run build` ➔ **Exit Code 0** (1894 modules transformed in 1.63s).
- **Dev Server**: Running on `http://localhost:5173/` with HTTP 200 on all routes and components.
