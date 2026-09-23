"use client";

import { useEffect, useState } from "react";

/**
 * Tracks *real* page-load progress so the Preloader can gate the UI on assets
 * actually being ready instead of a hard-coded timeout.
 *
 * Completion is driven by two honest signals:
 *   1. `window` "load"   → hero image/video + all same-origin resources are in.
 *   2. `document.fonts.ready` → the Google fonts (Poppins / Cormorant) are ready.
 *
 * The *displayed* number trickles up smoothly (eased) for a premium feel, is
 * capped below 100 until those signals fire, and is bounded by:
 *   - MIN_MS: keeps the intro on screen long enough to read the greetings.
 *   - MAX_MS: a safety cap so a slow third-party embed can never hang the page.
 */
export function useAssetLoader() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const MIN_MS = 2200; // let the greeting animation breathe
    const MAX_MS = 9000; // never hold the site hostage to a slow asset
    const start = performance.now();

    let realDone = false;
    let raf = 0;
    let current = 0;
    // Only push a React re-render when the *displayed* (integer) value actually
    // changes — turns ~60 state updates/sec into ~1 per whole percent, which is
    // what makes the overlay light enough to stay smooth on phones.
    let lastShown = -1;

    // Resolve once the real assets have landed (window load + fonts).
    let pending = 2;
    const settle = () => {
      pending -= 1;
      if (pending <= 0) realDone = true;
    };

    if (document.readyState === "complete") settle();
    else window.addEventListener("load", settle, { once: true });

    if ("fonts" in document) document.fonts.ready.then(settle).catch(settle);
    else settle();

    const loop = (now: number) => {
      const elapsed = now - start;
      // Perceived progress eases toward 90% over ~time, then real completion
      // (or the safety cap) releases it to 100%.
      const trickle = 90 * (1 - Math.exp(-elapsed / 1300));
      const finished = (realDone && elapsed >= MIN_MS) || elapsed >= MAX_MS;
      const target = finished ? 100 : Math.min(trickle, realDone ? 96 : 90);

      current += (target - current) * 0.1;
      if (finished && target - current < 0.4) current = 100;

      const shown = Math.round(current);
      if (shown !== lastShown) {
        lastShown = shown;
        setProgress(shown);
      }

      if (current >= 100) {
        setIsComplete(true);
        return; // stop the RAF loop
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(raf);
  }, []);

  return { progress, isComplete };
}
