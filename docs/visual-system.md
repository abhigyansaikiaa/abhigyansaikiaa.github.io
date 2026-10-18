# Visual System & Design Tokens

## 1. Palette Architecture
The palette is calibrated for dark editorial contrast with intentional functional accents. Neon gradients and generic purple glow panels are strictly avoided.

| Token | Hex Value | Semantic Role |
| :--- | :--- | :--- |
| `--bg-root` | `#06080d` | Base background void |
| `--surface-card` | `#0d121c` | Primary container surface |
| `--surface-elevated` | `#141c2a` | Hover and active state card background |
| `--border-subtle` | `rgba(255, 255, 255, 0.08)` | Structural layout boundaries and cards |
| `--border-strong` | `rgba(255, 255, 255, 0.16)` | Active card highlights and focused inputs |
| `--text-primary` | `#f8fafc` | Main headings, wordmark, and primary titles |
| `--text-secondary` | `#94a3b8` | Subtitles, editorial commentary, and captions |
| `--text-muted` | `#64748b` | Timestamps, metadata keys, and alignment marks |
| `--accent-vermilion` | `#e11d48` | Primary interactive trigger, status pulses, active tags |
| `--accent-emerald` | `#10b981` | Verification checkmarks, live status badges |

---

## 2. Typography Hierarchy
- **Wordmark & Primary Headings**: `Syne`, sans-serif (700/800 weight), tracking `-0.03em`.
- **Editorial Subtitles & Body**: `Inter`, sans-serif (400/500 weight), line-height `1.65`.
- **Technical Schematics & Numerals**: `JetBrains Mono` / `Space Mono`, monospace, tabular numerals enabled (`font-variant-numeric: tabular-nums`).

---

## 3. Surface Treatment & Micro-Interactions
- **Glassmorphism**: Muted background blur (`backdrop-filter: blur(12px)`) restricted to sticky navigation and modal dialogs to preserve 60fps scrolling.
- **Physical Borders**: Solid 1px borders with subtle alpha contrast rather than heavy outer drop shadows.
- **Active Focus States**: Visible 2px outline with offset `2px` for complete WCAG 2.2 AA accessibility.
