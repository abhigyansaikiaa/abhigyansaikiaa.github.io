# Technology & Skills Section (Prompt 2 Integration)

## 1. Overview
The Technology and Skills section integrates the **ToolDock** and **ToolDockTile** component pattern. Instead of a passive wall of badge chips, it delivers an interactive magnification dock inspired by high-end desktop operating systems.

---

## 2. Interaction Model & Physics
- **Pointer Tracking**: A Framer Motion `mouseX` motion value tracks the cursor's horizontal coordinate across the dock container.
- **Distance-Based Magnification**: Each `ToolDockTile` measures its center relative to `mouseX` and calculates a magnification scale curve:
  $$\text{scale} = 1 + (\text{maxScale} - 1) \cdot \cos^2\left(\frac{\pi \cdot \text{distance}}{2 \cdot \text{range}}\right)$$
  for $|\text{distance}| < \text{range}$, smoothly falling back to `1.0`.
- **Neighbor Spacing**: As tiles scale up, surrounding tiles separate smoothly via spring physics (`damping: 15, stiffness: 200`) without jumping or layout thrashing.
- **Tooltips**: Hovering a tile triggers a floating tooltip with spring entrance, revealing the technology title and real engineering usage context.
- **Touch Devices**: On mobile/touch devices where hover does not exist, tapping a tile activates it and reveals its detail drawer below the dock.

---

## 3. Verified Technologies Matrix

| Technology | Category | Role in Abhigyan's Stack |
| :--- | :--- | :--- |
| **React 19** | Frontend Framework | Component architecture, Concurrent React, hooks |
| **Next.js** | Full-Stack | Server-side rendering, API routes, App Router |
| **TypeScript** | Language | Static typing, interface contracts, safe refactoring |
| **Tailwind CSS** | Styling | Utility classes, responsive design, custom tokens |
| **Node.js** | Backend | REST endpoints, automated tooling, file pipelines |
| **Python** | Scripting & ML | Data transformations, automation scripts, algorithms |
| **CSS 3D / Canvas**| Graphics | Spatial perspective, hardware-accelerated transforms |
| **Lenis** | Motion | Momentum-based smooth scroll orchestration |
| **Vitest** | Testing | Fast unit testing and geometry verification |
| **Git & GitHub** | Version Control | CI/CD pipelines, branch management, collaboration |
