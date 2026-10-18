"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useId,
} from "react";

export interface WavingPortfolioLandingProps {
  name?: string;
  year?: string;
  roles?: string[];
  lettersLeft?: string[];
  giantLetter?: string;
  lettersRight?: string[];
  title?: string;
  signature?: string;
  greeting?: string;
  accent?: string;
  paper?: string;
  ink?: string;
  intro?: boolean;
  height?: string;
  className?: string;
}

const GLYPH_WIDTH_MAP: Record<string, number> = {
  A: 1.04,
  M: 1.3,
  N: 1.04,
  Q: 1.02,
  V: 1.04,
  W: 1.44,
  X: 1.02,
};

function glyphWidth(ch: string, base: number, stroke: number): number {
  return ch === "I" ? stroke : ch === " " ? base * 0.5 : base * (GLYPH_WIDTH_MAP[ch] ?? 1);
}

function glyphPath(ch: string, width: number, height: number, stroke: number): string {
  const H = stroke / 2;
  const M = H;
  const _ = width - H;
  const O = H;
  const S = height - H;
  const g = width / 2;
  const U = height / 2;
  const G = _ - M;
  const L = S - O;
  const Z = G / 2;
  const lt = Math.min(G * 0.62, L / 4);

  const q = (...parts: (string | number)[]) =>
    parts
      .map((p) => (typeof p === "number" ? String(Math.round(p * 10) / 10) : p))
      .join(" ");

  const arc = (r: number, sweep: number, ex: number, ey: number) =>
    q("A", r, r, 0, 0, sweep, ex, ey);

  const circleClosed =
    q("M", M, O + Z) +
    arc(Z, 1, _, O + Z) +
    q("L", _, S - Z) +
    arc(Z, 1, M, S - Z) +
    "Z";

  const cCurve =
    q("M", _, O + Z) +
    arc(Z, 0, M, O + Z) +
    q("L", M, S - Z) +
    arc(Z, 0, _, S - Z);

  const bowl = (bottomY: number) => {
    const Q = Math.min(lt, (bottomY - O) / 2);
    return (
      q("M", M, S, "L", M, O, "L", _ - Q, O) +
      arc(Q, 1, _, O + Q) +
      q("L", _, bottomY - Q) +
      arc(Q, 1, _ - Q, bottomY) +
      q("L", M, bottomY)
    );
  };

  switch (ch) {
    case "A": {
      const K = O + L * 0.64;
      const Q = (S - K) / L;
      return q(
        "M", M, S,
        "L", g, O,
        "L", _, S,
        "M", M + (g - M) * Q, K,
        "L", _ - (_ - g) * Q, K
      );
    }
    case "B": {
      const K = O + L * 0.47;
      const Q = _ - stroke * 0.4;
      const yt = Math.min(lt, (K - O) / 2, Q - M);
      const st = Math.min(lt, (S - K) / 2, G);
      return (
        q("M", M, K, "L", Q - yt, K) +
        arc(yt, 0, Q, K - yt) +
        q("L", Q, O + yt) +
        arc(yt, 0, Q - yt, O) +
        q("L", M, O, "L", M, S, "L", _ - st, S) +
        arc(st, 0, _, S - st) +
        q("L", _, K + st) +
        arc(st, 0, _ - st, K) +
        q("L", M, K)
      );
    }
    case "C":
      return cCurve;
    case "D": {
      const K = Math.min(G * 0.75, L / 2);
      return (
        q("M", M, O, "L", _ - K, O) +
        arc(K, 1, _, O + K) +
        q("L", _, S - K) +
        arc(K, 1, _ - K, S) +
        q("L", M, S) +
        "Z"
      );
    }
    case "E":
      return q(
        "M", _, O,
        "L", M, O,
        "L", M, S,
        "L", _, S,
        "M", M, U,
        "L", _ - G * 0.12, U
      );
    case "F":
      return q(
        "M", _, O,
        "L", M, O,
        "L", M, S,
        "M", M, U - L * 0.02,
        "L", _ - G * 0.12, U - L * 0.02
      );
    case "G":
      return cCurve + q("L", _, U + L * 0.04, "L", g, U + L * 0.04);
    case "H":
      return q(
        "M", M, O,
        "L", M, S,
        "M", _, O,
        "L", _, S,
        "M", M, U,
        "L", _, U
      );
    case "I":
      return q("M", g, O, "L", g, S);
    case "J":
      return (
        q("M", _, O, "L", _, S - Z) +
        arc(Z, 1, M, S - Z) +
        q("L", M, S - Z - L * 0.06)
      );
    case "K":
      return q(
        "M", M, O,
        "L", M, S,
        "M", _, O,
        "L", M, O + L * 0.62,
        "M", M + G * 0.28, O + L * 0.47,
        "L", _, S
      );
    case "L":
      return q("M", M, O, "L", M, S, "L", _, S);
    case "M":
      return q(
        "M", M, S,
        "L", M, O,
        "L", g, O + L * 0.55,
        "L", _, O,
        "L", _, S
      );
    case "N":
      return q("M", M, S, "L", M, O, "L", _, S, "L", _, O);
    case "O":
      return circleClosed;
    case "P":
      return bowl(O + L * 0.52);
    case "Q":
      return circleClosed + q("M", g + G * 0.1, S - L * 0.16, "L", _ + stroke * 0.2, S + stroke * 0.3);
    case "R":
      return bowl(O + L * 0.5) + q("M", M + G * 0.42, O + L * 0.5, "L", _, S);
    case "S":
      return (
        q("M", _, O + Z) +
        arc(Z, 0, M, O + Z) +
        q("C", M, U - L * 0.02, _, U + L * 0.02, _, S - Z) +
        arc(Z, 1, M, S - Z)
      );
    case "T":
      return q("M", M, O, "L", _, O, "M", g, O, "L", g, S);
    case "U":
      return q("M", M, O, "L", M, S - Z) + arc(Z, 0, _, S - Z) + q("L", _, O);
    case "V":
      return q("M", M, O, "L", g, S, "L", _, O);
    case "W": {
      const K = G * 0.24;
      return q(
        "M", M, O,
        "L", M + K, S,
        "L", g, O + L * 0.3,
        "L", _ - K, S,
        "L", _, O
      );
    }
    case "X":
      return q("M", M, O, "L", _, S, "M", _, O, "L", M, S);
    case "Y":
      return q(
        "M", M, O,
        "L", g, U - L * 0.04,
        "L", _, O,
        "M", g, U - L * 0.04,
        "L", g, S
      );
    case "Z":
      return q("M", M, O, "L", _, O, "L", M, S, "L", _, S);
    default:
      return "";
  }
}

const CHAR_H = 230;
const CHAR_W_BASE = 115;
const STROKE_BASE = 22;
const CHAR_GAP = 30;
const ROW_GAP = 20;
const GIANT_W_BASE = 220;
const GIANT_STROKE = 42;
const MARGIN_DEFAULT = 100;
const CHAR_SLOT_W = 520;
const TOP_OFFSET = 100;

function cleanRow(text: string): string {
  return text.toUpperCase().replace(/[^A-Z ]/g, "").trim();
}

function rowWidth(str: string): number {
  let w = 0;
  [...str].forEach((ch, i) => {
    w += glyphWidth(ch, CHAR_W_BASE, STROKE_BASE) + (i ? CHAR_GAP : 0);
  });
  return w;
}

interface LetterCellLayout {
  ch: string;
  x: number;
  y: number;
  w: number;
  h: number;
  s: number;
  row: number;
  giant: boolean;
}

interface PosterLayout {
  cells: LetterCellLayout[];
  width: number;
  height: number;
  margin: number;
  charScale: number;
  gapStart: number;
  charX: number;
  bottom: number;
}

function layoutPoster(
  leftRows: string[],
  giant: string,
  rightRows: string[],
  compact = false
): PosterLayout {
  const margin = compact ? 30 : MARGIN_DEFAULT;
  const centerSlotWidth = compact ? 390 : CHAR_SLOT_W;
  const charScale = compact ? 0.84 : 1;

  const leftClean = [cleanRow(leftRows[0] ?? ""), cleanRow(leftRows[1] ?? "")];
  const rightClean = [cleanRow(rightRows[0] ?? ""), cleanRow(rightRows[1] ?? "")];
  const giantChar = cleanRow(giant).replace(/ /g, "").slice(0, 1) || "O";

  const maxLeftWidth = Math.max(rowWidth(leftClean[0]), rowWidth(leftClean[1]));
  const maxRightWidth = Math.max(rowWidth(rightClean[0]), rowWidth(rightClean[1]));

  const cells: LetterCellLayout[] = [];

  const placeRow = (str: string, startX: number, rowIndex: number) => {
    let curX = startX;
    for (const ch of str) {
      const gw = glyphWidth(ch, CHAR_W_BASE, STROKE_BASE);
      if (ch !== " ") {
        cells.push({
          ch,
          x: curX,
          y: TOP_OFFSET + rowIndex * (CHAR_H + ROW_GAP),
          w: gw,
          h: CHAR_H,
          s: STROKE_BASE,
          row: rowIndex,
          giant: false,
        });
      }
      curX += gw + CHAR_GAP;
    }
  };

  leftClean.forEach((str, i) => {
    placeRow(str, margin + maxLeftWidth - rowWidth(str), i);
  });

  const giantX = margin + maxLeftWidth + (maxLeftWidth ? CHAR_GAP : 0);
  const giantW = giantChar === "I" ? GIANT_STROKE : GIANT_W_BASE * (GLYPH_WIDTH_MAP[giantChar] ?? 1);
  const rightSlotX = giantX + giantW + centerSlotWidth;

  rightClean.forEach((str, i) => {
    placeRow(str, rightSlotX, i);
  });

  cells.push({
    ch: giantChar,
    x: giantX,
    y: TOP_OFFSET,
    w: giantW,
    h: CHAR_H * 2 + ROW_GAP,
    s: GIANT_STROKE,
    row: 0,
    giant: true,
  });

  const totalWidth = rightSlotX + maxRightWidth + margin;

  return {
    cells,
    width: totalWidth,
    height: 700,
    margin,
    charScale,
    gapStart: giantX + giantW,
    charX: giantX + giantW + centerSlotWidth * 0.36,
    bottom: TOP_OFFSET + CHAR_H * 2 + ROW_GAP,
  };
}

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function pseudoHash(d: number): number {
  const r = Math.sin(d * 127.1 + 311.7) * 43758.5453;
  return r - Math.floor(r);
}

const LABEL_FONT_SIZE = 30;
function labelWidth(text: string): number {
  return text.length * LABEL_FONT_SIZE * 0.72;
}

const TIMING_INTRO_SCRAMBLE = 2650;
const TIMING_WAVE_START = 4950;
const TIMING_DONE = 7000;
const WAVE_DURATION = 1500;

function useScramble(target: string, delayMs: number, trigger: number, enabled: boolean): string {
  const [output, setOutput] = useState(enabled ? "" : target);

  useEffect(() => {
    if (!enabled) {
      setOutput(target);
      return;
    }
    setOutput("");
    let rafId = 0;
    let lastUpdate = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime - delayMs;
      if (elapsed >= (target.length - 1) * 30 + 320) {
        setOutput(target);
        return;
      }
      if (elapsed >= 0 && now - lastUpdate > 45) {
        lastUpdate = now;
        let res = "";
        for (let i = 0; i < target.length && elapsed >= i * 30; i++) {
          const ch = target[i];
          res += ch === " " || elapsed > i * 30 + 320 ? ch : ALPHABET[(Math.random() * 26) | 0];
        }
        setOutput(res);
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [target, delayMs, trigger, enabled]);

  return output;
}

function dicePips(val: number): [number, number][] {
  const map: Record<number, [number, number][]> = {
    1: [[0, 0]],
    2: [[-1, -1], [1, 1]],
    3: [[-1, -1], [0, 0], [1, 1]],
    4: [[-1, -1], [1, -1], [-1, 1], [1, 1]],
    5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]],
    6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]],
  };
  return map[val] ?? map[1];
}

interface RuleProps {
  a: number;
  b: number;
  y: number;
  mid?: boolean;
  delay: number;
  color: string;
}

function Rule({ a, b, y, mid, delay, color }: RuleProps) {
  if (b - a < 40) return null;
  const dots = mid ? [a, (a + b) / 2, b] : [a, b];
  return (
    <g>
      <path
        className="wpl-draw"
        pathLength={1}
        d={"M " + a + " " + y + " L " + b + " " + y}
        stroke={color}
        strokeWidth={3}
        style={{ animationDelay: delay + "s" }}
      />
      {dots.map((xVal, idx) => (
        <circle
          key={idx}
          className="wpl-dot"
          cx={xVal}
          cy={y}
          r={6.5}
          fill={color}
          style={{ animationDelay: delay + idx * 0.35 + "s" }}
        />
      ))}
    </g>
  );
}

interface LetterCellProps {
  c: LetterCellLayout;
  i: number;
  roll: number;
  intro: boolean;
  delay: number;
  color: string;
  onEnter: () => void;
}

function LetterCell({ c, i, roll, intro, delay, color, onEnter }: LetterCellProps) {
  const stroke = c.s;
  const cellHeight = c.h + c.s * 2 + 24;
  const rollCount = roll > 0 ? 6 : c.giant ? 14 : 10;
  const baseW = c.giant ? GIANT_W_BASE : CHAR_W_BASE;
  const isRolling = intro || roll > 0;

  const stack: { ch: string; w: number }[] = [];
  if (isRolling) {
    for (let k = 1; k < rollCount; k++) {
      const randCh = ALPHABET[Math.floor(pseudoHash(i * 131 + roll * 977 + k * 53) * 26)];
      stack.push({
        ch: randCh,
        w: Math.min(glyphWidth(randCh, baseW, c.s), c.w * 1.25),
      });
    }
  }

  const reelStyle: React.CSSProperties = {
    "--dist": (rollCount - 1) * cellHeight + "px",
    "--delay": (roll > 0 ? 0 : delay) + "s",
    "--dur": roll > 0 ? "0.7s" : c.giant ? "0.85s" : "1s",
  } as React.CSSProperties;

  return (
    <g className={"wpl-cell" + (c.giant ? " wpl-giant" : "")} onPointerEnter={onEnter}>
      <rect x={c.x} y={c.y} width={c.w} height={c.h} fill="transparent" />
      <svg
        x={c.x - stroke}
        y={c.y - stroke}
        width={c.w + stroke * 2}
        height={c.h + stroke * 2}
        viewBox={-stroke + " " + -stroke + " " + (c.w + stroke * 2) + " " + (c.h + stroke * 2)}
        overflow="hidden"
      >
        <g
          className={"wpl-reel" + (isRolling ? " is-rolling" : "")}
          style={reelStyle}
          fill="none"
          stroke={color}
          strokeWidth={c.s}
          strokeLinecap="square"
          strokeMiterlimit={4}
          key={roll}
        >
          <path d={glyphPath(c.ch, c.w, c.h, c.s)} />
          {stack.map((item, idx) => (
            <path
              key={idx}
              transform={"translate(" + (c.w - item.w) / 2 + " " + -(idx + 1) * cellHeight + ")"}
              d={glyphPath(item.ch, item.w, c.h, c.s)}
            />
          ))}
        </g>
      </svg>
    </g>
  );
}

interface SignatureProps {
  lines: string[];
  color: string;
}

function Signature({ lines, color }: SignatureProps) {
  const parsed = lines.map((line) => {
    const chars = [...line.replace(/[^A-Z ]/g, "")];
    let curX = 0;
    const items = chars.map((ch) => {
      const w = glyphWidth(ch, 15, 3.6);
      const res = { ch, x: curX, w };
      curX += w + 4;
      return res;
    });
    return {
      items,
      width: Math.max(0, curX - 4),
    };
  });

  const maxWidth = Math.max(1, ...parsed.map((p) => p.width));
  const scale = Math.min(1, 80 / maxWidth);
  const rowY = parsed.length > 1 ? [30, 66] : [48];

  let charCounter = 0;

  return (
    <svg viewBox="-10 -18 140 140" aria-hidden="true">
      <path
        className="wpl-draw"
        pathLength={1}
        d="M 60 8 C 96 6 116 30 114 62 C 112 96 88 114 58 112 C 26 110 6 88 8 58 C 10 28 30 10 66 12"
        fill="none"
        stroke={color}
        strokeWidth={4}
        strokeLinecap="round"
        style={{ animationDelay: "3s" }}
      />
      {parsed.map((row, rIdx) => (
        <g
          key={rIdx}
          transform={
            "translate(" +
            (60 - (row.width * scale) / 2) +
            " " +
            (rowY[rIdx] - (26 * scale) / 2) +
            ") scale(" +
            scale +
            ")"
          }
        >
          {row.items.map((item, cIdx) => {
            const count = charCounter++;
            const rot = (pseudoHash(count * 7 + 3) - 0.5) * 16;
            const dy = (pseudoHash(count * 11 + 5) - 0.5) * 5;
            return (
              <path
                key={cIdx}
                className="wpl-draw"
                pathLength={1}
                transform={
                  "translate(" +
                  item.x +
                  " " +
                  dy +
                  ") rotate(" +
                  rot +
                  " " +
                  item.w / 2 +
                  " " +
                  13 +
                  ")"
                }
                d={glyphPath(item.ch, item.w, 26, 3.6)}
                fill="none"
                stroke={color}
                strokeWidth={3.6}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ animationDelay: 3.2 + count * 0.07 + "s" }}
              />
            );
          })}
        </g>
      ))}
      {["M 110 2 L 118 -8", "M 118 16 L 130 11", "M 100 -2 L 101 -14"].map(
        (sp, idx) => (
          <path
            key={idx}
            className="wpl-draw wpl-spark"
            pathLength={1}
            d={sp}
            stroke={color}
            strokeWidth={4}
            strokeLinecap="round"
            style={{ animationDelay: 3.8 + idx * 0.08 + "s" }}
          />
        )
      )}
    </svg>
  );
}

interface CharacterProps {
  ink: string;
  paper: string;
  shirtId: string;
  headRef: React.RefObject<SVGGElement | null>;
}

function Character({ ink, paper, shirtId, headRef }: CharacterProps) {
  const shirtPath =
    "M 120 240 C 134 222 166 213 202 213 C 240 213 272 221 290 238 C 300 285 298 345 292 392 C 288 440 288 478 290 520 L 120 520 C 120 478 118 440 114 392 C 108 345 108 285 120 240 Z";

  const renderLimb = (d: string, w: number) => (
    <React.Fragment>
      <path
        d={d}
        fill="none"
        stroke={ink}
        strokeWidth={w + 8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={d}
        fill="none"
        stroke={paper}
        strokeWidth={w}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </React.Fragment>
  );

  const fingerPaths = [
    "M 388 170 L 380 116",
    "M 399 166 L 399 106",
    "M 410 168 L 418 112",
    "M 419 178 L 434 136",
    "M 382 192 L 352 170",
  ];

  const shirtDots = useMemo(
    () =>
      Array.from({ length: 64 }, (_, g) => [
        110 + pseudoHash(g * 3.1) * 190,
        215 + pseudoHash(g * 5.7 + 1) * 305,
        1 + pseudoHash(g * 9.3 + 2) * 1.8,
      ]),
    []
  );

  return (
    <g className="wpl-rise">
      <g className="wpl-tilt">
        <g className="wpl-breathe">
          {/* Trousers */}
          <path d="M 128 505 L 286 505 L 294 640 L 120 640 Z" fill={ink} />
          <path d="M 206 548 L 208 640" stroke={paper} strokeWidth={3} />

          {/* Neck */}
          <path
            d="M 184 158 L 184 226 L 222 226 L 222 158 Z"
            fill={paper}
            stroke={ink}
            strokeWidth={4}
          />

          {/* Shirt */}
          <clipPath id={shirtId}>
            <path d={shirtPath} />
          </clipPath>
          <path d={shirtPath} fill={ink} />
          <g clipPath={"url(#" + shirtId + ")"} fill={paper} opacity={0.8}>
            {shirtDots.map(([cx, cy, r], idx) => (
              <circle key={idx} cx={cx} cy={cy} r={r} />
            ))}
          </g>

          {/* Tie & Collar */}
          <path d="M 178 216 L 203 262 L 228 216 Z" fill={paper} />
          <path
            d="M 168 218 L 180 252 L 200 267 M 238 218 L 226 252 L 206 267"
            fill="none"
            stroke={paper}
            strokeWidth={3}
            strokeLinejoin="round"
          />
          <path
            d="M 203 280 L 203 505"
            stroke={paper}
            strokeWidth={6}
            strokeLinecap="round"
            strokeDasharray="0 36"
          />
          <path
            d="M 122 512 C 160 518 250 518 288 512"
            fill="none"
            stroke={paper}
            strokeWidth={3}
          />

          {/* Left Arm (Relaxed) */}
          {renderLimb("M 118 384 C 140 410 168 428 194 438", 30)}
          <circle cx={204} cy={440} r={24} fill={ink} />
          <circle cx={204} cy={440} r={20} fill={paper} />
          <path
            d="M 206 426 C 214 430 218 438 216 448 M 196 446 C 202 452 210 454 216 450"
            fill="none"
            stroke={ink}
            strokeWidth={3}
            strokeLinecap="round"
          />
          <path
            d="M 124 250 C 110 300 106 345 112 382"
            fill="none"
            stroke={ink}
            strokeWidth={50}
            strokeLinecap="round"
          />
          <path
            d="M 144 282 C 136 320 134 350 138 376"
            fill="none"
            stroke={paper}
            strokeWidth={2.5}
            strokeLinecap="round"
          />
          <path
            d="M 90 380 C 102 394 126 396 140 386"
            fill="none"
            stroke={paper}
            strokeWidth={2.5}
            strokeLinecap="round"
          />

          {/* Right Arm (Waving) */}
          <g className="wpl-uarm">
            <g className="wpl-farm">
              {renderLimb("M 350 350 L 392 214", 30)}
              <path d="M 381 252 L 387 233" stroke={ink} strokeWidth={40} />
              <circle cx={384} cy={243} r={8} fill={paper} stroke={ink} strokeWidth={3} />
              <g className="wpl-hand">
                <ellipse
                  cx={400}
                  cy={180}
                  rx={31}
                  ry={35}
                  fill={ink}
                  transform="rotate(12 400 180)"
                />
                {fingerPaths.map((fp) => (
                  <path key={"o" + fp} d={fp} stroke={ink} strokeWidth={24} strokeLinecap="round" />
                ))}
                <ellipse
                  cx={400}
                  cy={180}
                  rx={27}
                  ry={31}
                  fill={paper}
                  transform="rotate(12 400 180)"
                />
                {fingerPaths.map((fp) => (
                  <path key={"f" + fp} d={fp} stroke={paper} strokeWidth={16} strokeLinecap="round" />
                ))}
                <path
                  d="M 392 196 C 400 202 410 200 416 192 M 394 150 L 394 164 M 405 148 L 405 162"
                  fill="none"
                  stroke={ink}
                  strokeWidth={2.5}
                  strokeLinecap="round"
                />
              </g>
            </g>
            <path
              d="M 288 250 C 312 280 330 310 344 340"
              fill="none"
              stroke={ink}
              strokeWidth={50}
              strokeLinecap="round"
            />
            <path
              d="M 282 294 C 296 316 306 334 314 350"
              fill="none"
              stroke={paper}
              strokeWidth={2.5}
              strokeLinecap="round"
            />
            <path
              d="M 318 344 Q 342 356 364 324"
              fill="none"
              stroke={paper}
              strokeWidth={2.5}
              strokeLinecap="round"
            />
          </g>

          {/* Head & Face */}
          <g className="wpl-head" ref={headRef}>
            <g className="wpl-look">
              {/* Ear */}
              <ellipse cx={158} cy={118} rx={12} ry={18} fill={paper} stroke={ink} strokeWidth={4} />
              <path d="M 156 110 C 162 112 162 124 156 126" fill="none" stroke={ink} strokeWidth={2.5} />

              {/* Head shape */}
              <path
                d="M 160 92 C 158 142 172 180 206 184 C 240 182 258 150 258 100 C 258 64 236 46 208 46 C 180 46 162 64 160 92 Z"
                fill={paper}
                stroke={ink}
                strokeWidth={4}
              />

              {/* Hair */}
              <path
                d="M 154 108 C 146 70 156 30 196 18 C 232 8 276 16 284 44 C 288 60 278 72 264 72 C 250 62 226 60 206 66 C 186 72 172 86 168 110 Z"
                fill={ink}
              />
              <path d="M 160 94 L 166 126 L 173 104 Z" fill={ink} />
              <path
                d="M 196 30 C 220 22 250 24 266 38 M 190 44 C 210 36 236 38 250 46"
                fill="none"
                stroke={paper}
                strokeWidth={2.5}
                strokeLinecap="round"
              />

              {/* Eyebrows */}
              <g className="wpl-brows">
                <path
                  d="M 176 88 C 184 84 194 84 202 87 M 218 87 C 226 84 238 84 246 88"
                  fill="none"
                  stroke={ink}
                  strokeWidth={4.5}
                  strokeLinecap="round"
                />
              </g>

              {/* Eyes */}
              <g className="wpl-eyes">
                <g className="wpl-pupils">
                  <circle cx={189} cy={110} r={4.4} fill={ink} />
                  <circle cx={232} cy={110} r={4.4} fill={ink} />
                </g>
              </g>

              {/* Smile / Expressions */}
              <path
                className="wpl-happy"
                d="M 182 113 Q 189 104 196 113 M 225 113 Q 232 104 239 113"
                fill="none"
                stroke={ink}
                strokeWidth={3.5}
                strokeLinecap="round"
              />
              <path
                d="M 172 102 L 160 100 M 206 105 C 209 101 211 101 214 105"
                fill="none"
                stroke={ink}
                strokeWidth={4}
                strokeLinecap="round"
              />

              {/* Glasses / Details */}
              <rect
                x={172}
                y={98}
                width={32}
                height={26}
                rx={6}
                fill="none"
                stroke={ink}
                strokeWidth={3.5}
              />
              <rect
                x={216}
                y={98}
                width={32}
                height={26}
                rx={6}
                fill="none"
                stroke={ink}
                strokeWidth={3.5}
              />
              <path d="M 204 110 L 216 110" stroke={ink} strokeWidth={3.5} />

              {/* Mouth & Chin */}
              <path
                className="wpl-smile"
                d="M 198 144 Q 210 156 222 144"
                fill="none"
                stroke={ink}
                strokeWidth={3.5}
                strokeLinecap="round"
              />
              <path
                className="wpl-grin"
                d="M 194 140 Q 210 162 226 140 Z"
                fill={ink}
              />
              <path
                d="M 204 162 Q 210 166 216 162"
                fill="none"
                stroke={ink}
                strokeWidth={2.5}
                strokeLinecap="round"
              />
            </g>
          </g>
        </g>
      </g>
    </g>
  );
}

export function WavingPortfolioLanding({
  name = "Abhigyan Saikia",
  year = "2026",
  roles = ["Full Stack Developer", "Web Developer"],
  lettersLeft = ["P", "F"],
  giantLetter = "O",
  lettersRight = ["RT", "LIO"],
  title = "Portfolio",
  signature = "ABHI/GYAN",
  greeting = "Hi there!",
  accent = "#e5262c",
  paper = "#f6f4f0",
  ink = "#141414",
  intro = true,
  height = "100svh",
  className = "",
}: WavingPortfolioLandingProps) {
  const componentId = useId().replace(/:/g, "");
  const rootRef = useRef<HTMLDivElement | null>(null);
  const headRef = useRef<SVGGElement | null>(null);
  const animFrameId = useRef<number>(0);
  const timeoutIds = useRef<number[]>([]);
  const rollTimers = useRef<number[]>([]);
  const burstIdRef = useRef<number>(0);
  const isWavingRef = useRef<boolean>(false);

  const [replayKey, setReplayKey] = useState<number>(0);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [introDone, setIntroDone] = useState<boolean>(!intro);
  const [isWaving, setIsWaving] = useState<boolean>(false);
  const [cellRolls, setCellRolls] = useState<number[]>([]);
  const [diceValues, setDiceValues] = useState<[number, number]>([2, 1]);
  const [diceRollCounts, setDiceRollCounts] = useState<[number, number]>([0, 0]);
  const [bursts, setBursts] = useState<
    {
      id: number;
      x: number;
      y: number;
      bits: { ch: string; dx: number; dy: number; rot: number }[];
    }[]
  >([]);
  const [isCompact, setIsCompact] = useState<boolean>(false);

  const addTimeout = useCallback((fn: () => void, ms: number) => {
    const tid = window.setTimeout(fn, ms);
    timeoutIds.current.push(tid);
    return tid;
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      timeoutIds.current.forEach(clearTimeout);
      cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width && height) {
        setIsCompact(width / height < 0.9);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const triggerWave = useCallback(() => {
    if (isWavingRef.current) return;
    isWavingRef.current = true;
    setIsWaving(true);
    addTimeout(() => {
      isWavingRef.current = false;
      setIsWaving(false);
    }, WAVE_DURATION);
  }, [addTimeout]);

  const runIntro = intro && !reducedMotion;

  useEffect(() => {
    if (!runIntro) {
      setIntroDone(true);
      return;
    }
    setIntroDone(false);
    const waveTimer = addTimeout(triggerWave, TIMING_WAVE_START);
    const doneTimer = addTimeout(() => setIntroDone(true), TIMING_DONE);
    return () => {
      clearTimeout(waveTimer);
      clearTimeout(doneTimer);
    };
  }, [replayKey, runIntro, triggerWave, addTimeout]);

  const posterLayout = useMemo(
    () => layoutPoster(lettersLeft, giantLetter, lettersRight, isCompact),
    [lettersLeft, giantLetter, lettersRight, isCompact]
  );

  const poolChars = posterLayout.cells.map((c) => c.ch).join("") || "ABC";

  const upperName = name.toUpperCase();
  const upperYear = year.toUpperCase();
  const upperRole1 = (roles[0] ?? "").toUpperCase();
  const upperRole2 = (roles[1] ?? "").toUpperCase();

  const scrambledName = useScramble(upperName, TIMING_INTRO_SCRAMBLE, replayKey, runIntro);
  const scrambledYear = useScramble(upperYear, TIMING_INTRO_SCRAMBLE + 250, replayKey, runIntro);
  const scrambledRole1 = useScramble(upperRole1, TIMING_INTRO_SCRAMBLE + 150, replayKey, runIntro);
  const scrambledRole2 = useScramble(upperRole2, TIMING_INTRO_SCRAMBLE + 400, replayKey, runIntro);

  const signatureLines = useMemo(() => {
    if (signature) return signature.toUpperCase().split("/").slice(0, 2);
    const firstWord = (name.trim().split(/\s+/)[0] ?? "").toUpperCase().replace(/[^A-Z]/g, "");
    const half = Math.ceil(firstWord.length / 2);
    return firstWord.length > 3 ? [firstWord.slice(0, half), firstWord.slice(half)] : [firstWord];
  }, [signature, name]);

  const stormRows = useMemo(() => {
    const fullPool = poolChars + poolChars + ALPHABET;
    return Array.from({ length: 7 }, (_, rIdx) => {
      let x = 0;
      const items: { ch: string; x: number; w: number }[] = [];
      for (let k = 0; k < 34; k++) {
        const ch = fullPool[Math.floor(pseudoHash(rIdx * 97 + k * 13) * fullPool.length)];
        const w = glyphWidth(ch, 62, 12);
        items.push({ ch, x, w });
        x += w + 26;
      }
      return { row: rIdx, half: items, span: x };
    });
  }, [poolChars]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reducedMotion || e.pointerType === "touch") return;
      const clientX = e.clientX;
      const clientY = e.clientY;

      cancelAnimationFrame(animFrameId.current);
      animFrameId.current = requestAnimationFrame(() => {
        const root = rootRef.current;
        if (!root) return;
        const rect = root.getBoundingClientRect();
        const clamp = (val: number, max: number) => Math.max(-1, Math.min(1, val / max));

        root.style.setProperty("--wpl-mx", (((clientX - rect.left) / rect.width) * 2 - 1).toFixed(3));
        root.style.setProperty("--wpl-my", (((clientY - rect.top) / rect.height) * 2 - 1).toFixed(3));

        const head = headRef.current;
        if (!head) return;
        const headRect = head.getBoundingClientRect();
        const dx = clientX - (headRect.left + headRect.width / 2);
        const dy = clientY - (headRect.top + headRect.height / 2);

        root.style.setProperty("--wpl-ex", (clamp(dx, 260) * 4.5).toFixed(2));
        root.style.setProperty("--wpl-ey", (clamp(dy, 260) * 3.5).toFixed(2));
        root.style.setProperty("--wpl-hr", (clamp(dx, 700) * 7).toFixed(2));
      });
    },
    [reducedMotion]
  );

  const handlePointerLeave = useCallback(() => {
    const root = rootRef.current;
    if (root) {
      for (const prop of ["--wpl-mx", "--wpl-my", "--wpl-ex", "--wpl-ey", "--wpl-hr"]) {
        root.style.setProperty(prop, "0");
      }
    }
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const target = e.target as HTMLElement;
      if (reducedMotion || target.closest("button,.wpl-char,.wpl-cell")) return;
      const root = rootRef.current;
      if (!root) return;
      const rect = root.getBoundingClientRect();

      const bits = Array.from({ length: 10 }, (_, idx) => {
        const angle = (idx / 10) * Math.PI * 2 + Math.random() * 0.5;
        const dist = 50 + Math.random() * 90;
        return {
          ch: poolChars[(Math.random() * poolChars.length) | 0],
          dx: Math.cos(angle) * dist,
          dy: Math.sin(angle) * dist - 24,
          rot: (Math.random() - 0.5) * 260,
        };
      });

      const burstId = ++burstIdRef.current;
      setBursts((prev) => [
        ...prev.slice(-5),
        { id: burstId, x: e.clientX - rect.left, y: e.clientY - rect.top, bits },
      ]);

      addTimeout(() => {
        setBursts((prev) => prev.filter((b) => b.id !== burstId));
      }, 1100);
    },
    [reducedMotion, poolChars, addTimeout]
  );

  const handleCellReroll = useCallback(
    (cellIndex: number) => {
      if (!introDone || reducedMotion) return;
      const now = performance.now();
      if (now - (rollTimers.current[cellIndex] ?? 0) < 750) return;
      rollTimers.current[cellIndex] = now;
      setCellRolls((prev) => {
        const next = [...prev];
        next[cellIndex] = (next[cellIndex] ?? 0) + 1;
        return next;
      });
    },
    [introDone, reducedMotion]
  );

  const handleRollDie = useCallback((dieIndex: number) => {
    setDiceValues((prev) => {
      const next: [number, number] = [prev[0], prev[1]];
      let newVal = next[dieIndex];
      while (newVal === next[dieIndex]) {
        newVal = 1 + ((Math.random() * 6) | 0);
      }
      next[dieIndex] = newVal;
      return next;
    });
    setDiceRollCounts((prev) =>
      dieIndex === 0 ? [prev[0] + 1, prev[1]] : [prev[0], prev[1] + 1]
    );
  }, []);

  const handleReplay = useCallback(() => {
    setCellRolls([]);
    setBursts([]);
    isWavingRef.current = false;
    setIsWaving(false);
    if (runIntro) {
      setReplayKey((k) => k + 1);
    } else {
      triggerWave();
    }
  }, [runIntro, triggerWave]);

  const handleCharKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        triggerWave();
      }
    },
    [triggerWave]
  );

  const introStatus = intro ? (introDone ? "done" : "on") : "off";
  const line1Left = posterLayout.margin + labelWidth(upperName) + 26;
  const line1Right = posterLayout.width - posterLayout.margin - labelWidth(upperYear) - 26;
  const line2Left = posterLayout.margin + labelWidth(upperRole1) + 26;
  const line2Right = posterLayout.width - posterLayout.margin - labelWidth(upperRole2) - 26;

  const bubbleWidth = greeting.length * 19 + 48;
  const charScale = posterLayout.charScale;
  const charSvgX = posterLayout.charX - 205 * charScale;

  return (
    <div
      ref={rootRef}
      className={"wpl-root " + className}
      data-intro={introStatus}
      style={{
        height,
        ["--wpl-accent" as string]: accent,
        ["--wpl-paper" as string]: paper,
        ["--wpl-ink" as string]: ink,
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
    >
      <style>{WAVING_POSTER_CSS}</style>
      <h1 className="wpl-sr">{title}</h1>
      <p className="wpl-sr">
        {name}, {roles.filter(Boolean).join(" and ")}, {year}
      </p>

      <div className="wpl-stage" key={replayKey}>
        {/* Poster Canvas */}
        <svg
          className="wpl-poster"
          viewBox={"0 0 " + posterLayout.width + " " + posterLayout.height}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Header & Footer Rules & Typography */}
          <g className="wpl-par-lines" aria-hidden="true">
            <text className="wpl-label" x={posterLayout.margin} y={73}>
              {scrambledName}
            </text>
            <text
              className="wpl-label"
              x={posterLayout.width - posterLayout.margin}
              y={73}
              textAnchor="end"
            >
              {scrambledYear}
            </text>
            <Rule a={line1Left} b={line1Right} y={62} mid={true} delay={2.55} color={accent} />

            <text className="wpl-label" x={posterLayout.margin} y={663}>
              {scrambledRole1}
            </text>
            <text
              className="wpl-label"
              x={posterLayout.width - posterLayout.margin}
              y={663}
              textAnchor="end"
            >
              {scrambledRole2}
            </text>
            <Rule a={line2Left} b={line2Right} y={652} delay={2.75} color={accent} />
          </g>

          {/* Letter Grid Cells */}
          <g className="wpl-par-letters" aria-hidden="true">
            {posterLayout.cells.map((cell, idx) => (
              <LetterCell
                key={idx}
                c={cell}
                i={idx}
                roll={cellRolls[idx] ?? 0}
                intro={runIntro}
                delay={
                  cell.giant
                    ? 1.75
                    : 1 + (cell.x / posterLayout.width) * 0.55 + cell.row * 0.1
                }
                color={accent}
                onEnter={() => handleCellReroll(idx)}
              />
            ))}
          </g>

          {/* Character */}
          <g className="wpl-par-char">
            <svg
              x={charSvgX}
              y={605 - 600 * charScale}
              width={460 * charScale}
              height={600 * charScale}
              viewBox="0 0 460 600"
              overflow="hidden"
            >
              <g
                className={"wpl-char" + (isWaving ? " is-waving" : "")}
                role="button"
                tabIndex={0}
                aria-label="Wave hello"
                onPointerEnter={(e) => {
                  if (introDone && e.pointerType !== "touch") triggerWave();
                }}
                onClick={triggerWave}
                onKeyDown={handleCharKeyDown}
              >
                <Character
                  ink={ink}
                  paper={paper}
                  shirtId={"wpl-" + componentId + "-shirt"}
                  headRef={headRef}
                />
              </g>
            </svg>
          </g>

          {/* Speech Bubble */}
          {isWaving && (
            <g className="wpl-bubble" aria-hidden="true">
              <path
                d={
                  "M " +
                  (charSvgX + 372 * charScale) +
                  " 20 h " +
                  bubbleWidth +
                  " v 56 h " +
                  -(bubbleWidth - 34) +
                  " l -30 22 l 6 -22 h -10 Z"
                }
                fill={paper}
                stroke={accent}
                strokeWidth={4}
                strokeLinejoin="round"
              />
              <text
                className="wpl-label wpl-bubble-text"
                x={charSvgX + 372 * charScale + bubbleWidth / 2}
                y={58}
                textAnchor="middle"
              >
                {greeting.toUpperCase()}
              </text>
            </g>
          )}
        </svg>

        {/* Intro Letter Storm */}
        {runIntro && !introDone && (
          <div className="wpl-storm" aria-hidden="true">
            {stormRows.map(({ row, half, span }) => (
              <div
                key={row}
                className="wpl-srow"
                data-dir={row % 2 ? "r" : "l"}
                style={{
                  animationDelay: row * 0.04 + "s, " + (1.25 + row * 0.06) + "s",
                }}
              >
                <svg
                  className="wpl-strip"
                  data-dir={row % 2 ? "r" : "l"}
                  viewBox={"0 -6 " + span * 2 + " 152"}
                  style={{ animationDuration: 4.6 + (row % 3) * 1.5 + "s" }}
                  fill="none"
                  strokeLinecap="square"
                  strokeMiterlimit={4}
                >
                  {[0, span].map((offset) =>
                    half.map((item, k) => {
                      const pathStr = glyphPath(item.ch, item.w, 140, 12);
                      const isMulti = row % 3 !== 0;
                      return (
                        <g
                          key={offset + "-" + k}
                          transform={"translate(" + (offset + item.x) + " 0)"}
                        >
                          <path
                            d={pathStr}
                            stroke={row % 3 === 2 ? ink : accent}
                            strokeWidth={12}
                          />
                          {isMulti && <path d={pathStr} stroke={paper} strokeWidth={5} />}
                        </g>
                      );
                    })
                  )}
                </svg>
              </div>
            ))}
          </div>
        )}

        {/* Corner Dice */}
        {[0, 1].map((dieIdx) => (
          <button
            key={dieIdx}
            type="button"
            className={"wpl-corner " + (dieIdx ? "wpl-corner-r" : "wpl-corner-l")}
            aria-label={"Roll the dice, showing " + diceValues[dieIdx]}
            onClick={() => handleRollDie(dieIdx)}
          >
            <svg viewBox="0 0 170 170" aria-hidden="true">
              {[108, 124, 140].map((dim) => (
                <path
                  key={dim}
                  d={"M 0 " + dim + " L " + dim + " " + dim + " L " + dim + " 0"}
                  fill="none"
                  stroke={accent}
                  strokeWidth={2}
                />
              ))}
              <rect x={0} y={0} width={92} height={92} fill={accent} />
              <g
                className={"wpl-pips" + (diceRollCounts[dieIdx] ? " is-rolled" : "")}
                key={diceRollCounts[dieIdx]}
              >
                <rect x={10} y={8} width={76} height={76} fill="none" />
                {dicePips(diceValues[dieIdx]).map(([dx, dy], pIdx) => (
                  <circle
                    key={pIdx}
                    cx={48 + dx * 20}
                    cy={46 + dy * 20}
                    r={7.5}
                    fill={paper}
                  />
                ))}
              </g>
            </svg>
          </button>
        ))}

        {/* Signature Replay Button */}
        <button
          type="button"
          className="wpl-sign"
          aria-label={runIntro ? "Replay the intro" : "Wave again"}
          onClick={handleReplay}
        >
          <Signature lines={signatureLines} color={accent} />
        </button>
      </div>

      {/* Click Bursts */}
      {bursts.map((burst) => (
        <div
          key={burst.id}
          className="wpl-burst"
          style={{ left: burst.x, top: burst.y }}
          aria-hidden="true"
        >
          {burst.bits.map((bit, bIdx) => (
            <svg
              key={bIdx}
              className="wpl-bit"
              viewBox="-3 -3 26 38"
              style={{
                ["--dx" as string]: bit.dx + "px",
                ["--dy" as string]: bit.dy + "px",
                ["--rot" as string]: bit.rot + "deg",
              }}
            >
              <path
                d={glyphPath(bit.ch, glyphWidth(bit.ch, 14, 3.4), 32, 3.4)}
                fill="none"
                stroke={bIdx % 3 ? accent : ink}
                strokeWidth={3.4}
                strokeLinecap="square"
              />
            </svg>
          ))}
        </div>
      ))}
    </div>
  );
}

export default WavingPortfolioLanding;

const WAVING_POSTER_CSS = `

.wpl-root{position:relative;width:100%;overflow:hidden;background:var(--wpl-paper);color:var(--wpl-ink);container-type:size;isolation:isolate;user-select:none;-webkit-user-select:none;-webkit-tap-highlight-color:transparent}
.wpl-sr{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}
.wpl-stage{position:absolute;inset:0}
.wpl-poster{position:absolute;left:3%;top:clamp(86px, 12cqh, 105px);width:94%;height:clamp(340px, 68cqh, 600px);max-width:none;overflow:visible;z-index:2}
.wpl-label{font-family:"Futura","Century Gothic","Avenir Next","Trebuchet MS",ui-sans-serif,system-ui,sans-serif;font-weight:700;font-size:30px;letter-spacing:.04em;fill:var(--wpl-accent)}
.wpl-bubble-text{fill:var(--wpl-ink);font-size:26px}
.wpl-par-letters{transform:translate(calc(var(--wpl-mx,0) * -14px),calc(var(--wpl-my,0) * -8px));transition:transform .7s cubic-bezier(.2,.8,.2,1)}
.wpl-par-lines{transform:translate(calc(var(--wpl-mx,0) * -5px),calc(var(--wpl-my,0) * -3px));transition:transform .7s cubic-bezier(.2,.8,.2,1)}
.wpl-par-char{transform:translate(calc(var(--wpl-mx,0) * 9px),0px);transition:transform .7s cubic-bezier(.2,.8,.2,1)}
.wpl-draw{stroke-dasharray:1;stroke-dashoffset:0}
.wpl-dot{transform-box:fill-box;transform-origin:center}
.wpl-reel.is-rolling{animation:wpl-roll var(--dur,1s) var(--delay,0s) both}
.wpl-cell{cursor:crosshair}
.wpl-char{cursor:pointer;outline:none}
.wpl-char:focus-visible .wpl-head{filter:drop-shadow(0 0 6px var(--wpl-accent))}
.wpl-tilt{transform-box:view-box;transform-origin:205px 600px;transform:rotate(-7deg)}
.wpl-breathe{transform-box:view-box;transform-origin:205px 600px;animation:wpl-breathe 3.8s ease-in-out infinite}
.wpl-uarm{transform-box:view-box;transform-origin:288px 248px}
.wpl-farm{transform-box:view-box;transform-origin:348px 346px}
.wpl-hand{transform-box:view-box;transform-origin:392px 216px}
.wpl-head{transform-box:view-box;transform-origin:203px 200px;transform:rotate(-4deg)}
.wpl-look{transform-box:view-box;transform-origin:203px 200px;transform:rotate(calc(var(--wpl-hr,0) * 1deg));transition:transform .4s ease-out}
.wpl-pupils{transform:translate(calc(var(--wpl-ex,0) * 1px),calc(var(--wpl-ey,0) * 1px));transition:transform .2s ease-out}
.wpl-eyes{transform-box:fill-box;transform-origin:center;animation:wpl-blink 5.2s 7.5s infinite}
.wpl-brows{transition:transform .25s cubic-bezier(.3,1.6,.5,1)}
.wpl-happy,.wpl-grin{opacity:0}
.wpl-bubble{transform-box:fill-box;transform-origin:0% 100%;animation:wpl-pop .45s cubic-bezier(.3,1.6,.5,1) both}
.wpl-root[data-intro="done"] .wpl-hand{animation:wpl-wiggle 6.5s 1.5s infinite}

.wpl-root[data-intro="on"] .wpl-poster{animation:wpl-thump .5s 2.5s both}
.wpl-root[data-intro="on"] .wpl-draw{animation:wpl-draw .9s cubic-bezier(.6,0,.2,1) both}
.wpl-root[data-intro="on"] .wpl-dot{animation:wpl-dot .45s cubic-bezier(.3,1.8,.5,1) both}
.wpl-root[data-intro="on"] .wpl-rise{animation:wpl-rise .95s 3.4s cubic-bezier(.2,1.2,.35,1) both}
.wpl-root[data-intro="on"] .wpl-tilt{animation:wpl-tilt .8s 6s cubic-bezier(.3,1.5,.5,1) both}
.wpl-root[data-intro="on"] .wpl-uarm{animation:wpl-uarm .6s 4.3s cubic-bezier(.3,1.3,.5,1) both}
.wpl-root[data-intro="on"] .wpl-farm{animation:wpl-farm .62s 4.3s cubic-bezier(.3,1.3,.5,1) both}
.wpl-root[data-intro="on"] .wpl-head{animation:wpl-headin 1.3s 3.5s ease-out both}
.wpl-root[data-intro="on"] .wpl-corner-l{animation:wpl-corner-l .9s 2.7s cubic-bezier(.2,.9,.2,1) both}
.wpl-root[data-intro="on"] .wpl-corner-r{animation:wpl-corner-r .9s 2.8s cubic-bezier(.2,.9,.2,1) both}
.wpl-root[data-intro="on"] .wpl-sign svg{animation:wpl-sign .7s 3s cubic-bezier(.3,1.6,.5,1) both}

.wpl-char.is-waving .wpl-farm{animation:wpl-wave 1.5s ease-in-out}
.wpl-char.is-waving .wpl-hand{animation:wpl-hand 1.5s ease-in-out}
.wpl-char.is-waving .wpl-head{animation:wpl-nod 1.5s ease-in-out}
.wpl-char.is-waving .wpl-brows{transform:translateY(-6px)}
.wpl-char.is-waving .wpl-eyes,.wpl-char.is-waving .wpl-smile{opacity:0}
.wpl-char.is-waving .wpl-happy,.wpl-char.is-waving .wpl-grin{opacity:1}

.wpl-storm{position:absolute;inset:-25% -15%;display:flex;flex-direction:column;justify-content:center;gap:2.2cqh;transform:rotate(-7deg);pointer-events:none;z-index:3}
.wpl-srow{height:15cqh;flex:none;overflow:visible;animation:wpl-row-in .6s cubic-bezier(.2,.9,.2,1) both,wpl-shutter .45s cubic-bezier(.7,0,.3,1) forwards}
.wpl-srow[data-dir="r"]{animation-name:wpl-row-in-r,wpl-shutter}
.wpl-strip{display:block;height:100%;width:auto;max-width:none;animation:wpl-marq 5s linear infinite;will-change:transform}
.wpl-strip[data-dir="r"]{animation-name:wpl-marq-r}

.wpl-corner{position:absolute;top:0;width:clamp(64px,15cqmin,168px);height:clamp(64px,15cqmin,168px);margin:0;padding:0;border:0;background:none;cursor:pointer;z-index:4}
.wpl-corner-l{left:0}
.wpl-corner-r{right:0}
.wpl-corner svg{display:block;width:100%;height:100%;max-width:none;overflow:visible}
.wpl-corner-r svg{transform:scaleX(-1)}
.wpl-corner:hover .wpl-pips{transform:rotate(-8deg)}
.wpl-pips{transform-box:fill-box;transform-origin:center;transition:transform .3s cubic-bezier(.3,1.6,.5,1)}
.wpl-pips.is-rolled{animation:wpl-dice .6s cubic-bezier(.3,1.4,.5,1)}

.wpl-sign{position:absolute;left:50%;bottom:clamp(12px,4cqh,44px);width:clamp(60px,11cqmin,120px);height:clamp(60px,11cqmin,120px);margin:0;padding:0;border:0;background:none;cursor:pointer;z-index:4;transform:translateX(-50%);transition:transform .35s cubic-bezier(.3,1.6,.5,1)}
.wpl-sign:hover{transform:translateX(-50%) rotate(-8deg) scale(1.07)}
.wpl-sign svg{display:block;width:100%;height:100%;max-width:none;overflow:visible}
.wpl-root button:focus-visible{outline:2px solid var(--wpl-accent);outline-offset:4px}

.wpl-burst{position:absolute;width:0;height:0;pointer-events:none;z-index:6}
.wpl-bit{position:absolute;left:-9px;top:-18px;width:18px;height:36px;max-width:none;overflow:visible;animation:wpl-bit .95s cubic-bezier(.15,.7,.3,1) forwards}

@container (max-aspect-ratio: 9/10){
.wpl-poster{left:2%;width:96%;top:clamp(82px, 13cqh, 96px);height:clamp(250px, 58cqh, 440px)}
}

@keyframes wpl-roll{
0%{transform:translateY(var(--dist));opacity:0;animation-timing-function:cubic-bezier(.5,0,.25,1)}
6%{opacity:1}
82%{transform:translateY(-16px);opacity:1;animation-timing-function:ease-in-out}
100%{transform:translateY(0px);opacity:1}
}
@keyframes wpl-thump{0%{transform:none}30%{transform:translateY(7px) scale(1.012)}60%{transform:translateY(-3px)}100%{transform:none}}
@keyframes wpl-draw{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}
@keyframes wpl-dot{from{transform:scale(0)}to{transform:scale(1)}}
@keyframes wpl-rise{from{transform:translateY(640px)}to{transform:translateY(0px)}}
@keyframes wpl-tilt{from{transform:rotate(0deg)}to{transform:rotate(-7deg)}}
@keyframes wpl-uarm{from{transform:rotate(26deg)}to{transform:rotate(0deg)}}
@keyframes wpl-farm{from{transform:rotate(150deg)}to{transform:rotate(0deg)}}
@keyframes wpl-headin{0%{transform:rotate(9deg)}55%{transform:rotate(-8deg)}100%{transform:rotate(-4deg)}}
@keyframes wpl-wave{0%{transform:rotate(0deg)}15%{transform:rotate(-17deg)}32%{transform:rotate(12deg)}50%{transform:rotate(-17deg)}68%{transform:rotate(12deg)}84%{transform:rotate(-7deg)}100%{transform:rotate(0deg)}}
@keyframes wpl-hand{0%{transform:rotate(0deg)}15%{transform:rotate(-10deg)}32%{transform:rotate(10deg)}50%{transform:rotate(-10deg)}68%{transform:rotate(10deg)}84%{transform:rotate(-5deg)}100%{transform:rotate(0deg)}}
@keyframes wpl-nod{0%{transform:rotate(-4deg)}25%{transform:rotate(-9deg)}55%{transform:rotate(-1deg)}80%{transform:rotate(-6deg)}100%{transform:rotate(-4deg)}}
@keyframes wpl-wiggle{0%,86%,100%{transform:rotate(0deg)}90%{transform:rotate(-9deg)}94%{transform:rotate(7deg)}97%{transform:rotate(-3deg)}}
@keyframes wpl-breathe{0%,100%{transform:scale(1,1)}50%{transform:scale(1.008,1.012)}}
@keyframes wpl-blink{0%,94%,100%{transform:scaleY(1)}97%{transform:scaleY(.1)}}
@keyframes wpl-pop{from{transform:scale(0) rotate(-8deg);opacity:0}to{transform:scale(1) rotate(0deg);opacity:1}}
@keyframes wpl-corner-l{from{transform:translate(-70%,-70%)}to{transform:translate(0,0)}}
@keyframes wpl-corner-r{from{transform:translate(70%,-70%)}to{transform:translate(0,0)}}
@keyframes wpl-sign{from{transform:scale(0) rotate(-40deg)}to{transform:scale(1) rotate(0deg)}}
@keyframes wpl-dice{from{transform:rotate(-360deg) scale(.4)}to{transform:rotate(0deg) scale(1)}}
@keyframes wpl-row-in{from{transform:translateX(35%);opacity:0}to{transform:translateX(0);opacity:1}}
@keyframes wpl-row-in-r{from{transform:translateX(-35%);opacity:0}to{transform:translateX(0);opacity:1}}
@keyframes wpl-shutter{from{transform:scaleY(1);opacity:1}to{transform:scaleY(0);opacity:0}}
@keyframes wpl-marq{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes wpl-marq-r{from{transform:translateX(-50%)}to{transform:translateX(0)}}
@keyframes wpl-bit{from{transform:translate(0,0) rotate(0deg) scale(.4);opacity:1}to{transform:translate(var(--dx),var(--dy)) rotate(var(--rot)) scale(1);opacity:0}}

@media (prefers-reduced-motion:reduce){
.wpl-root *,.wpl-root *::before,.wpl-root *::after{animation:none!important;transition:none!important}
}

`;
