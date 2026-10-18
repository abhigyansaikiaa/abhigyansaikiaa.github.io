# Scroll Effects & Lenis Integration

## 1. Smooth Scroll Engine
The application uses **Lenis** (`@studio-freight/lenis` / `lenis`) as the unified smooth scrolling library.

### Initialization & Configuration (`src/lib/lenis-scroll.ts`):
- `lerp: 0.08`: Smooth momentum without excessive float or input delay.
- `duration: 1.1`: Consistent scroll easing across mouse wheels, trackpads, and touch devices.
- `autoRaf: true`: Synchronized with browser requestAnimationFrame cycles.

---

## 2. Resolving Conflicting Virtual Scroll Engines
Previously, the legacy Unifex template had `ScrollSmoother.create({ smooth: 4 })` initializing on `#smooth-wrapper` and `#smooth-content` in [`custom-gsap.js`](file:///c:/portfolio/portfolio-2/public/assets-unifex/js/custom-gsap.js).
When Lenis was also active, the two virtual scroll engines clashed, transforming the entire page content into negative virtual coordinates and causing black screens on hash navigation.

### Permanent Resolution:
1. Disabled `ScrollSmoother.create` in [`custom-gsap.js`](file:///c:/portfolio/portfolio-2/public/assets-unifex/js/custom-gsap.js).
2. Removed `gsap-scroll-smoother.js` from [`index.html`](file:///c:/portfolio/portfolio-2/index.html).
3. Enforced CSS override:
   ```css
   #smooth-wrapper, #smooth-content {
     overflow: visible !important;
     position: static !important;
     transform: none !important;
     width: 100% !important;
   }
   ```
4. Harmonized anchor scrolling: all `a[href^="#"]` links invoke `lenis.scrollTo(target, { offset: -70, duration: 1.1 })`.

---

## 3. Scroll-Linked Parallax Effects
- **Hero Horizon Parallax**: Soft depth movement in the hero background as user leaves the top fold.
- **Section Reveal**: Progressive fade and slide on section titles (`.section-title`) tied to Lenis scroll offsets.
- **Reduced Motion**: If user enables `prefers-reduced-motion`, smooth scroll interpolation is bypassed in favor of native instant scrolling.
