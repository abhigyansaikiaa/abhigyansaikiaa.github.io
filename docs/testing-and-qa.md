# Testing & Visual Quality Assurance

## 1. Automated Test Suite (Vitest)
Unit tests verify core mathematics, command sequences, and geometry calculations independently of the DOM:

- `src/lib/terminal-script.test.ts`: Verifies terminal command initial state, step count, and execution scripts.
- `src/lib/browser-scene.test.ts`: Verifies camera pose, radial positioning, and bezier easing functions across different formation and expansion values.
- `src/lib/reel-geometry.test.ts`: Verifies circular angular distribution, wrap-around index arithmetic, and aspect ratios.

**Current Test Results**:
- 3 test files passed (100%).
- 26 unit tests passed (100%).

---

## 2. Visual Browser Verification (REA Runtime Evidence)
Runtime testing with Chrome subagents validates all responsive breakpoints and user interactions:

1. **Loader & Transition Test**: Verified counter progression, Skip Intro execution, and seamless hero handoff.
2. **Contact & Form Test**: Verified direct email card, Animate UI Copy Button with checkmark morphing, and Liquid Submit Button animation.
3. **FerrisWheel Gallery Test**: Verified rotating carousel, keyboard navigation, touch swipe, and active project spotlight.
4. **ToolDock Magnification Test**: Verified hover scaling, tooltip reveals, and touch tap drawer on mobile.
5. **Chatbot Integration Test**: Verified launcher button, empty state chips, user message sending, real-time answering, and error recovery.
6. **Smooth Scrolling Test**: Verified Lenis momentum scrolling across `#works`, `#skills`, `#about`, and `#contact` without scroll locking.
