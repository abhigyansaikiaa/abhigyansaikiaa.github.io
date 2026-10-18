# Storyline and Motion Choreography

## 1. Concept: Terminal to Reality
The core narrative follows the lifecycle of software:
1. **The Abstract Plane**: Terminal commands execute, emitting structural parameters.
2. **The Blueprint Assembly**: Raw specifications materialize into physical artifacts — blueprints, cropped browser window frames, interface panels, and alignment crosshairs.
3. **The Expansion**: The camera perspective changes, leveling out as the artifacts expand outward to become the digital foundation of the hero.
4. **The Living System**: The visitor controls the live application, scrolls through interactive galleries, magnifies the tech dock, and converses with the assistant.

---

## 2. Loader Stages & Shared Scene Model

The loader and the homepage hero do NOT unmount and mount separately. They share a single mathematical state model:

```typescript
export interface SceneModel {
  formation: number;    // [0..1] Assembling pieces into resting geometry
  expansion: number;    // [0..1] Opening the assembly into the hero landscape
  assetsReady: boolean; // Essential project screenshots preloaded
  introComplete: boolean;// Controls whether normal navigation and scrolling are active
}
```

### Stage A — Quiet Starting State (0% - 20%)
- **Background**: Deep void (`#06080d`) with subtle ambient gradient.
- **Counter**: Positioned in the lower-right quadrant, rendering tabular numerals (`00` to `20`).
- **Wordmark**: Fixed in the upper-left (`ABHIGYAN SAIKIA`).
- **Assembly**: 5 tightly overlapping physical blueprint layers centered on an isometric angle (`rotateX: 32deg, rotateY: -28deg`).
- **Caption**: `ASSEMBLING ARTIFACTS`.

### Stage B — Progressive Assembly (20% - 75%)
- **Choreography**: Artifacts progressively unstack and pivot toward their defined radial resting angles.
- **Physical Metaphor**: Resembles translucent technical schematics and window frames aligning along an orbital armature.
- **Counter**: Advances to `75%` as assets are verified.
- **Caption**: `COMPUTING LAYOUT BOUNDS`.

### Stage C — The Assembly Opens (75% - 100%)
- **Camera Movement**: Camera angle levels from `32deg` tilt to `8deg` gentle elevation.
- **Radius**: Expands from compact `140px` footprint to full-width `460px` spatial halo.
- **Opacity & Visibility**: Screenshots transition from schematic outlines to full-color interfaces.
- **Counter**: Hits `100%`.

### Stage D — Homepage Handoff (Interactive Phase)
- **Wordmark**: Retains optical weight and transitions into the primary navigation bar.
- **Headline**: Emerges with smooth bezier curve: `ABHIGYAN SAIKIA — CREATIVE DEVELOPER & PRODUCT ARCHITECT`.
- **Navigation & Controls**: Fade in with subtle stagger (`+100ms`).
- **Background**: Soft painted sky horizon emerges without flashes or scene reloads.

---

## 3. Skip & Accessibility Fallbacks
- **Skip Button**: Accessible in top-right with `Tab` focus ring.
- **Escape Key**: Global listener triggers immediate completion (`formation = 1, expansion = 1, introComplete = true`).
- **Reduced Motion**: If `prefers-reduced-motion: reduce` is detected, the animation steps are bypassed, immediately rendering the completed hero.
