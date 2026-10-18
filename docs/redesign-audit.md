# Production Redesign Audit — Abhigyan Saikia Portfolio

**Audit Date**: October 2026  
**Auditor**: Lead Product Designer & Senior Frontend Engineer  
**Live Site**: [https://abhigyan-portfolio-eta.vercel.app/](https://abhigyan-portfolio-eta.vercel.app/)  
**Target Repository**: `c:\portfolio\portfolio-2`  

---

## 1. Baseline Technical Architecture

| Dimension | Baseline Specification | Notes / Governance |
| :--- | :--- | :--- |
| **Framework & Version** | React 18.3.1 on Vite 5.4.8 | High-performance SPA with HMR and optimized asset bundling |
| **Language** | TypeScript 5.5.3 | Strict type-checking, tsconfig paths configured (`@/*` -> `./src/*`) |
| **Package Manager** | npm (with `package-lock.json`) | Lockfile preserved without drift |
| **Styling Engine** | Tailwind CSS 3.4.13 + Scoped CSS | Hand-crafted CSS tokens in `browser-hero.css` and `reel-hero.css` |
| **Smooth Scrolling** | Lenis 1.3.27 | Coordinated via `src/lib/lenis-scroll.ts`; paused behind preloader/modals |
| **Animation Libraries** | Framer Motion 12.38.0 + GSAP 3.12 | Pure hardware-accelerated transforms |
| **Test Suite** | Vitest 2.1.9 | 26/26 unit tests covering geometry, scene coordinates, and state |
| **App Mount Point** | `index.html` (`#reel-hero-mount`) | Mounts `src/main.tsx` -> `src/App.tsx` |

---

## 2. Opening Sequence Audit: Elimination of "Terminal to Reality"

### The Issue
Previous iterations featured an artificial "Terminal to Reality" terminal simulation, command-line intro, and multi-step welcome screen before allowing visitors to view the portfolio. This created high interaction friction, delays, and poor first-impression metrics.

### Resolution
- **Rule**: Opening sequence is strictly: **`Weight Sweep Preloader → actual portfolio homepage directly`**.
- **Module A**: Integrated `WeightSweepPreloader` verbatim into `src/components/ui/weight-sweep-preloader.tsx`.
- **`SiteLoader` Wrapper**:
  - `sessionStorage` guard (`abhigyan_portfolio_loaded`) prevents repeating the loader within the same browsing session.
  - Deep-link bypass: If a visitor lands via URL hash (e.g. `#works`, `#skills`, `#contact`), the preloader immediately bypasses.
  - Reduced-motion compliance: Visitors with `prefers-reduced-motion: reduce` skip directly to content.
  - Caption cycling: Displays verified project captions only (`Preparing ToolKB.in`, `Loading Arogya Relief`, etc.).
  - Bounded fallback timeout: Max 2200ms ensures slow network or asset delays never deadlock visitors.
  - Scroll unblocking: Lenis smooth scroll is paused during loading and cleanly resumed once the gate lifts.

---

## 3. Real Project Registry & Ground Truth

Zero stock photos or placeholder projects are permitted. All projects are grounded in Abhigyan Saikia's verified work:

| Project | Live Link / Repository | Discipline / Category | Stack | Status |
| :--- | :--- | :--- | :--- | :--- |
| **ToolKB.in** | [https://toolkb.in/](https://toolkb.in/) | Browser Utility Platform | Next.js, TypeScript, Web Workers, Tailwind | Verified Production |
| **Arogya Relief** | [https://www.arogyarelief.in/](https://www.arogyarelief.in/) | Healthcare Platform | React, Node.js, PostgreSQL, Mapbox | Verified Production |
| **Motion Subtitle Studio** | [github.com/.../Motion-Subtitle-Studio](https://github.com/abhigyansaikiaa/Motion-Subtitle-Studio) | Creator Tooling SaaS | Python, Whisper AI, FFmpeg, React | Verified OSS |
| **Brandcey** | [https://www.brandcey.in/](https://www.brandcey.in/) | Services Marketplace | Next.js, Tailwind, Stripe, Node.js | Verified Production |
| **Qrivna** | [github.com/abhigyansaikiaa](https://github.com/abhigyansaikiaa) | Interactive Web Experience | WebGL, CSS 3D, TypeScript | Verified Build |
| **BrollWriter** | [github.com/abhigyansaikiaa](https://github.com/abhigyansaikiaa) | Production Scripting SaaS | React, FastAPI, Python | Verified Build |
| **Dhankathaa** | [github.com/abhigyansaikiaa](https://github.com/abhigyansaikiaa) | Wealth & Asset Analytics | Next.js, Chart.js, PostgreSQL | Verified Build |
| **ResumeIQ** | [github.com/abhigyansaikiaa](https://github.com/abhigyansaikiaa) | Career Tech | React, Python, NLP | Verified Build |

*Excluded Unverified Work*: `TradeGate` and `TradeGuardian` have been deliberately excluded as their production details cannot be substantiated.

---

## 4. Skills & Verification Audit

Module C (`ToolDock` in `src/components/ui/techstack.tsx`) is deployed through `src/components/SkillsSection.tsx`:
- Contains only technologies actively utilized across verified projects:
  - **Frontend**: React 19, Next.js, Tailwind CSS
  - **Languages**: TypeScript, Python
  - **Backend**: Node.js, PostgreSQL
  - **Toolchains & DevOps**: GitHub, Vite, Vitest, Vercel
- **Accessibility Enhancement**: Includes an accessible non-hover matrix (`.skills-accessible-grid`) below the magnification dock, giving mobile touch users and keyboard navigators instant, permanent discoverability with verified project citations.

---

## 5. SEO, Canonical URLs, and Machine Endpoints

- **Canonical URL**: `https://abhigyan-portfolio-eta.vercel.app/`
- **Machine Endpoints**:
  - `/llms.txt`: Structured markdown containing raw system context, biographies, projects, and contact avenues for LLM crawlers.
  - `/sitemap.xml`: XML index of canonical routes with change frequencies.
  - `/robots.txt`: Search crawler permissions pointing directly to `/sitemap.xml`.
- **Meta Tags**: Open Graph, Twitter cards, viewport configuration, and favicon verified.

---

## 6. Chatbot Integration & `D:\chatbot` Governance

- `D:\chatbot` is strictly **read-only**.
- No files have been written, modified, deleted, formatted, or touched inside `D:\chatbot`.
- Portfolio integration uses a decoupled client adapter (`src/lib/chatbot-client.ts`) and floating concierge widget (`src/components/ChatbotWidget.tsx`) with verified fallback knowledge when the external daemon is offline.
