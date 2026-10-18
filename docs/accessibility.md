# Accessibility Compliance (WCAG 2.2 AA)

## 1. Core Principles & Inclusive Design
Every interactive element on the portfolio is designed to be accessible via keyboard, screen reader, and under reduced motion constraints.

---

## 2. Accessibility Checklist & Implementation

| Area | Requirement | Implementation |
| :--- | :--- | :--- |
| **Intro Loader** | Non-blocking bypass | "Skip Intro" button in top-right fold; `Escape` key skips directly to hero; pressing `Tab` focuses skip control first. |
| **Reduced Motion** | `prefers-reduced-motion` | Media query detected on mount. If active, all 3D rotations, wheel spins, and counter transitions immediately jump to final state. |
| **Color Contrast** | Minimum 4.5:1 text contrast | Primary text `#f8fafc` on `#06080d` achieves 17.5:1 contrast ratio. Subtitles `#94a3b8` achieve 8.2:1 contrast ratio. |
| **Keyboard Navigation** | Visible focus indicators | All interactive buttons (`button`, `a`, `input`, `textarea`) have 2px offset focus rings (`outline: 2px solid #e11d48`). |
| **Screen Readers** | Semantic markup | `<h1>` for page title, `<section>` with `aria-label`, `<form>` with visible `<label>`s, and ARIA live regions for copy/submit actions. |
| **Touch Targets** | Minimum 44×44px | Carousel navigation buttons, launcher bubble, and copy buttons meet touch target sizes. |
| **Chatbot Drawer** | Focus containment | `role="dialog"`, `aria-modal="true"`, `Escape` to close, and keyboard-trapped tab order. |
