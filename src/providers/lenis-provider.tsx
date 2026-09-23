"use client";

import React, { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children?: React.ReactNode;
};

/**
 * Drives Lenis from GSAP's ticker and keeps ScrollTrigger in sync with the
 * smoothed scroll position. Without this, pinned/scrubbed ScrollTriggers (e.g.
 * the About canvas section) read a scroll position that lags behind Lenis's
 * interpolation, which shows up as a jittery pin. Rendered inside <ReactLenis>
 * so `useLenis()` can reach the instance via context.
 */
function LenisGsapSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(raf);
    };
  }, [lenis]);

  return null;
}

const LenisWrapper = ({ children }: Props) => {
  return (
    // autoRaf is off because GSAP's ticker drives Lenis (see LenisGsapSync),
    // which avoids running two competing rAF loops.
    // syncTouch:false (Lenis's default) means touch devices keep NATIVE momentum
    // scrolling — Lenis stays out of the way on iOS/Android, so there's no
    // fighting Safari's rubber-band / address-bar behaviour.
    <ReactLenis root autoRaf={false} options={{ syncTouch: false }}>
      <LenisGsapSync />
      {children}
    </ReactLenis>
  );
};

export default LenisWrapper;
