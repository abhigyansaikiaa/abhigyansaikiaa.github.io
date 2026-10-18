# Project Gallery Specification (Prompt 1 Integration)

## 1. Overview
The Project Showcase integrates the **FerrisWheelGallery** component pattern as an interactive 3D revolving carousel. It showcases Abhigyan's real software developments with authentic screenshots and destination URLs, strictly excluding fabricated metrics, client quotes, or unrelated projects.

---

## 2. Featured Projects Matrix

| Rank | Project Title | Live Domain / Destination | Screenshot Asset | Key Technologies |
| :---: | :--- | :--- | :--- | :--- |
| **1** | **ToolKB** *(First featured)* | `https://toolkb.in/` | `/assets/toolkb.webp` | React, TypeScript, Next.js, Web APIs |
| **2** | **Arogya Relief** | `https://arogyarelief.vercel.app/` | `/assets/arogyarelief.webp` | React, Tailwind CSS, Leaflet, Express |
| **3** | **Motion Subtitle Studio**| `https://motionsubtitles.vercel.app/` | `/assets/motionsubtitles.webp` | Web Audio API, Canvas, TypeScript |
| **4** | **Brandcey** | `https://brandcey.vercel.app/` | `/assets/brandcey.webp` | React 19, Tailwind CSS, Node.js |

> [!IMPORTANT]
> Projects `TradeGate` and `Trade-Guardian` are strictly excluded from the codebase per specification constraints.

---

## 3. Interaction Architecture
1. **Revolving Wheel Mechanics**:
   - The gallery computes radial angular positioning for each card: `angle = (index - activeIndex) * (360 / total)`.
   - Cards are rotated in 3D space (`transform: rotateY(${angle}deg) translateZ(${radius}px)`), with non-active cards scaled and softened in opacity.
2. **Interactive Controls**:
   - Next (`ChevronRight`) and Previous (`ChevronLeft`) circular buttons.
   - Clickable thumbnail pills displaying project names.
   - Left and Right keyboard arrow listeners (`ArrowLeft`, `ArrowRight`).
   - Touch swipe listeners with momentum threshold.
   - Non-capturing wheel event listener allowing natural page scrolling without trapping the user.
3. **Accessibility**:
   - `role="region"` with `aria-label="Interactive Projects Showcase"`.
   - Card links contain explicit accessible names and target markers (`rel="noopener noreferrer"`).
   - Reduced motion mode displays an editorial card grid instead of 3D revolving transforms.
