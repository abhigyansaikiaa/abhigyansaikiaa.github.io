"use client"

// Weight Sweep Preloader — a type-specimen loading gate. The page is one giant
// counter set in a variable grotesk, and as the load climbs from 000 to 100 the
// numerals thicken from hairline to black: the weight axis is the progress bar.
// A specimen HUD reads out the live weight, a tick rail fills along the foot,
// and at 100 an ink panel rises over the sheet with one line of italic serif
// before the gate lifts off whatever it was guarding.
//
// One file, React only. Every rule in the scoped <style> is .wsp- prefixed and
// nothing is fetched: the faces come from the host page or the fallback stacks.

import * as React from "react"

export interface SweepPalette {
  /** The specimen sheet. */
  paper: string
  /** The numerals, HUD type, rail and the panel that rises at the end. */
  ink: string
}

export type SweepPreset = "paper" | "ink" | "vermilion" | "bone"

export interface WeightSweepPreloaderProps {
  /** Content revealed once the gate lifts. Ignored while `loop` is set. */
  children?: React.ReactNode
  /** Run forever as a showcase: children are never revealed, onComplete never fires. */
  loop?: boolean
  /**
   * Real loading progress, 0–100. Leave undefined to run the built-in
   * simulated load over `durationMs`. The count holds until this hits 100.
   */
  progress?: number
  /** Length of the simulated load. Defaults to 3600ms. */
  durationMs?: number
  /** Starting colours. Defaults to "paper". */
  preset?: SweepPreset
  /** Colour overrides, merged over the preset. */
  palette?: { paper?: string; ink?: string }
  /** Top-left line of the HUD. */
  label?: string
  /** Bottom-left caption beside the rail. */
  caption?: string
  /** The italic line on the closing panel. Empty string skips the panel. */
  message?: string
  /** Lightest and heaviest weight of the sweep. Defaults to [100, 900]. */
  weights?: [number, number]
  /** Corner type, the rail and the live weight readout. Defaults to true. */
  hud?: boolean
  /** Face for the numerals. Variable fonts sweep smoothly; static ones step. */
  fontFamily?: string
  /** Face for the closing line. */
  serifFamily?: string
  /** Face for the HUD. */
  monoFamily?: string
  /** Root height. A definite length, never a percentage. */
  height?: string
  /** Fired once, after the gate has lifted. */
  onComplete?: () => void
  /** Extra root class names. */
  className?: string
}

const PRESETS: { [K in SweepPreset]: SweepPalette } = {
  paper: { paper: "#f1eee8", ink: "#151412" },
  ink: { paper: "#121110", ink: "#ece6da" },
  vermilion: { paper: "#ec472c", ink: "#140c0a" },
  bone: { paper: "#e6dfd1", ink: "#2b2620" },
}

const SANS_STACK =
  '"Inter Tight", "Inter Variable", "Inter", "Segoe UI Variable Display", "SF Pro Display", "Helvetica Neue", system-ui, sans-serif'
const SERIF_STACK = '"Instrument Serif", "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif'
const MONO_STACK = '"JetBrains Mono", "SF Mono", ui-monospace, Menlo, Consolas, monospace'

const TICKS = 40
const PANEL_MS = 900
const HOLD_MS = 1300
const LIFT_MS = 700

// #region timeline
// Pure helpers, lifted out and executed by tests/weight-sweep-preloader.test.mjs.

/** Clamp to [0, 1]. */
export function wspClamp01(v: number) {
  return v < 0 ? 0 : v > 1 ? 1 : v
}

/**
 * The simulated load at time fraction t ∈ [0, 1], as a percentage. Eased in and
 * out, with two short stalls so it reads like real assets arriving, and never
 * runs backwards. Exactly 0 at t = 0 and exactly 100 at t = 1.
 */
export function wspSimulated(t: number) {
  const k = wspClamp01(t)
  const ease = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2
  const stall = 0.035 * Math.sin(k * Math.PI * 3) * Math.sin(k * Math.PI)
  return Math.max(0, Math.min(100, (ease - stall) * 100))
}

/** The weight drawn at a given percentage, between the lightest and heaviest. */
export function wspWeight(pct: number, lo: number, hi: number) {
  const a = Math.max(1, Math.min(1000, lo))
  const b = Math.max(1, Math.min(1000, hi))
  return Math.round(a + (b - a) * wspClamp01(pct / 100))
}

/** Tracking in em for a weight: hairlines sit open, black sits tight. */
export function wspTracking(weight: number) {
  return -0.02 - 0.06 * wspClamp01((weight - 100) / 800)
}

/** How many of the rail's ticks are lit at a percentage. */
export function wspTicks(pct: number, total: number) {
  return Math.round(wspClamp01(pct / 100) * total)
}

/** Zero-padded three-digit count. */
export function wspPad(pct: number) {
  const n = Math.max(0, Math.min(100, Math.floor(pct)))
  return (n < 10 ? "00" : n < 100 ? "0" : "") + n
}
// #endregion

const WSP_CSS = `
.wsp-root { position: relative; width: 100%; overflow: hidden; isolation: isolate; }
.wsp-gate {
  position: absolute; inset: 0; z-index: 2; overflow: hidden;
  container-type: size; background: var(--wsp-paper); color: var(--wsp-ink);
  transition: opacity 700ms cubic-bezier(.65,0,.35,1), visibility 0s linear 700ms;
  -webkit-font-smoothing: antialiased; cursor: default;
}
.wsp-gate[data-phase="lift"] { opacity: 0; visibility: hidden; pointer-events: none; }
.wsp-gate[data-loop="true"] { cursor: pointer; }
.wsp-hud {
  position: absolute; left: 0; right: 0; top: 0; display: flex; justify-content: space-between;
  gap: 16px; padding: clamp(18px, 3.2cqw, 34px) clamp(18px, 3.2cqw, 40px) 0;
  font-family: var(--wsp-mono); font-size: 10px; font-weight: 500; letter-spacing: .2em; text-transform: uppercase;
}
.wsp-hud span:last-child { opacity: .55; font-variant-numeric: tabular-nums; text-align: right; }
.wsp-rule {
  position: absolute; left: clamp(18px, 3.2cqw, 40px); right: clamp(18px, 3.2cqw, 40px);
  top: calc(clamp(18px, 3.2cqw, 34px) + 22px); height: 0; border-top: 0.5px solid currentColor; opacity: .18;
}
.wsp-count {
  position: absolute; left: clamp(6px, 1.4cqw, 22px); bottom: 0; margin: 0;
  font-family: var(--wsp-sans); line-height: .74; white-space: nowrap;
  font-size: min(70cqh, 43cqw); font-variant-numeric: tabular-nums; font-feature-settings: "tnum" 1, "ss01" 1;
  transform: translateY(6%); will-change: font-weight;
}
.wsp-foot {
  position: absolute; left: clamp(18px, 3.2cqw, 40px); right: clamp(18px, 3.2cqw, 40px);
  top: calc(clamp(18px, 3.2cqw, 34px) + 38px); display: flex; align-items: flex-end; justify-content: space-between; gap: 20px;
  font-family: var(--wsp-mono); font-size: 10px; letter-spacing: .2em; text-transform: uppercase;
}
.wsp-foot > span { opacity: .55; white-space: nowrap; }
.wsp-rail { display: flex; align-items: flex-end; gap: 0; flex: 0 1 min(46cqw, 520px); justify-content: space-between; height: 11px; }
.wsp-tick { width: 1px; height: 5px; background: currentColor; opacity: .2; transition: opacity 180ms linear; }
.wsp-tick[data-major="true"] { height: 11px; }
.wsp-tick[data-on="true"] { opacity: 1; }
.wsp-panel {
  position: absolute; inset: 0; display: grid; place-content: center; justify-items: center; gap: 14px;
  background: var(--wsp-ink); color: var(--wsp-paper);
  transform: translateY(101%); transition: transform 900ms cubic-bezier(.76,0,.24,1);
}
.wsp-gate[data-phase="panel"] .wsp-panel, .wsp-gate[data-phase="lift"] .wsp-panel { transform: none; }
.wsp-line {
  margin: 0; font-family: var(--wsp-serif); font-style: italic; font-weight: 400;
  font-size: clamp(30px, 6.4cqw, 76px); line-height: 1; letter-spacing: -.01em;
  opacity: 0; transform: translateY(14px); transition: opacity 600ms ease 420ms, transform 800ms cubic-bezier(.2,.7,.1,1) 420ms;
}
.wsp-replay { font-family: var(--wsp-mono); font-size: 10px; letter-spacing: .2em; text-transform: uppercase; opacity: 0; transition: opacity 500ms ease 900ms; }
.wsp-gate[data-phase="panel"] .wsp-line { opacity: 1; transform: none; }
.wsp-gate[data-phase="panel"][data-loop="true"] .wsp-replay { opacity: .45; }
.wsp-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@media (prefers-reduced-motion: reduce) {
  .wsp-panel { transition: none; }
  .wsp-line, .wsp-replay { transition: none; transform: none; }
  .wsp-tick { transition: none; }
}
`

export default function WeightSweepPreloader({
  children,
  loop = false,
  progress,
  durationMs = 3600,
  preset = "paper",
  palette,
  label = "Specimen Nº 07",
  caption = "Loading assets",
  message = "Set in motion.",
  weights = [100, 900],
  hud = true,
  fontFamily = SANS_STACK,
  serifFamily = SERIF_STACK,
  monoFamily = MONO_STACK,
  height = "100svh",
  onComplete,
  className = "",
}: WeightSweepPreloaderProps) {
  const colors = { ...(PRESETS[preset] || PRESETS.paper), ...(palette || {}) }
  const [pct, setPct] = React.useState(0)
  const [phase, setPhase] = React.useState("load" as "load" | "panel" | "lift" | "done")
  const [run, setRun] = React.useState(0)
  const [reduced, setReduced] = React.useState(false)
  const onCompleteRef = React.useRef(onComplete)
  onCompleteRef.current = onComplete
  const progressRef = React.useRef(progress)
  progressRef.current = progress

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => setReduced(mq.matches)
    sync()
    mq.addEventListener("change", sync)
    return () => mq.removeEventListener("change", sync)
  }, [])

  // The count: simulated, or eased toward the real progress, never backwards.
  React.useEffect(() => {
    if (phase !== "load") return
    let raf = 0
    let shown = 0
    const t0 = performance.now()
    const dur = Math.max(400, durationMs)
    const tick = (now: number) => {
      const real = progressRef.current
      const target = real === undefined ? wspSimulated((now - t0) / dur) : Math.max(0, Math.min(100, Number(real) || 0))
      shown = reduced ? Math.max(shown, target) : Math.max(shown, shown + (target - shown) * 0.18)
      if (target >= 100 && shown > 99.6) shown = 100
      setPct(shown)
      if (shown >= 100) {
        setPhase(message ? "panel" : "lift")
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [phase, run, durationMs, reduced, message])

  // Panel → hold → lift (or loop back to the start).
  React.useEffect(() => {
    if (phase === "panel") {
      const t = setTimeout(() => {
        if (loop) return
        setPhase("lift")
      }, (reduced ? 0 : PANEL_MS) + HOLD_MS)
      return () => clearTimeout(t)
    }
    if (phase === "lift") {
      const t = setTimeout(() => {
        setPhase("done")
        if (!loop) onCompleteRef.current?.()
      }, reduced ? 0 : LIFT_MS)
      return () => clearTimeout(t)
    }
    return undefined
  }, [phase, loop, reduced])

  // A showcase loop restarts by itself a beat after the panel lands.
  React.useEffect(() => {
    if (!loop || phase !== "panel") return
    const t = setTimeout(() => replay(), PANEL_MS + HOLD_MS + 1600)
    return () => clearTimeout(t)
  }, [loop, phase, run])

  const replay = () => {
    setPct(0)
    setPhase("load")
    setRun((r) => r + 1)
  }

  const [lo, hi] = weights
  const weight = wspWeight(pct, lo, hi)
  const lit = wspTicks(pct, TICKS)
  const count = wspPad(pct)
  const done = phase === "done"

  return (
    <div
      className={"wsp-root " + className}
      style={
        {
          height,
          "--wsp-paper": colors.paper,
          "--wsp-ink": colors.ink,
          "--wsp-sans": fontFamily,
          "--wsp-serif": serifFamily,
          "--wsp-mono": monoFamily,
        } as React.CSSProperties
      }
    >
      <style>{WSP_CSS}</style>
      {loop ? null : children}
      {done && !loop ? null : (
        <div
          className="wsp-gate"
          data-phase={phase}
          data-loop={loop}
          role="progressbar"
          aria-label={label}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.floor(pct)}
          onClick={loop && phase === "panel" ? replay : undefined}
        >
          {hud ? (
            <>
              <div className="wsp-hud" aria-hidden="true">
                <span>{label}</span>
                <span>wght {weight}</span>
              </div>
              <div className="wsp-rule" aria-hidden="true" />
            </>
          ) : null}
          <p
            className="wsp-count"
            aria-hidden="true"
            style={{
              fontWeight: weight,
              fontVariationSettings: "'wght' " + weight,
              letterSpacing: wspTracking(weight) + "em",
            }}
          >
            {count}
          </p>
          {hud ? (
            <div className="wsp-foot" aria-hidden="true">
              <span>{caption}</span>
              <div className="wsp-rail">
                {Array.from({ length: TICKS + 1 }, (_, i) => (
                  <i key={i} className="wsp-tick" data-major={i % 10 === 0} data-on={i <= lit} />
                ))}
              </div>
            </div>
          ) : null}
          {message ? (
            <div className="wsp-panel" aria-hidden={phase === "load"}>
              <p className="wsp-line">{message}</p>
              {loop ? <span className="wsp-replay">Click to replay</span> : null}
            </div>
          ) : null}
          <span className="wsp-sr" aria-live="polite">
            {phase === "load" ? "" : message || "Loaded"}
          </span>
        </div>
      )}
    </div>
  )
}

export { WeightSweepPreloader }
