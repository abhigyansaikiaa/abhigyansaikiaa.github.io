# Performance Optimization & Asset Pipeline

## 1. Asset Strategy & Modern Formats
- All project screenshots are encoded as modern WebP (`.webp`) format, reducing image payloads by >60% compared to legacy PNG/JPEG.
- Responsive image delivery using CSS `aspect-ratio` to eliminate Cumulative Layout Shift (CLS).

---

## 2. Rendering & Frame Rate Optimization
- **Hardware Acceleration**: 3D spatial transforms (`translate3d`, `rotate3d`, `scale3d`) and opacity changes are isolated to GPU compositor layers (`will-change: transform`).
- **Zero Layout Thrashing**: React state is not updated on every `requestAnimationFrame` tick. Smooth values rely on CSS transitions, Motion values, and Lenis virtual scroll interpolation.
- **Lazy Loading**: All images below the hero fold have `loading="lazy"` and `decoding="async"` attributes.

---

## 3. Production Bundle Metrics
- Vite production build produces clean gzipped chunks:
  - Total JavaScript: ~109 kB gzipped.
  - Total CSS: ~8 kB gzipped.
- Zero heavyweight external runtime dependencies (no Three.js, WebGL shaders, or heavy 3D engines when CSS 3D achieves 60fps).
- Clean tree-shaking with ES modules.
