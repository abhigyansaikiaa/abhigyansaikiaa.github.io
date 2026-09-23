"use client";

import { useIsMobile } from "@/hooks/use-mobile";

export function Grain() {
  // A full-viewport, `fixed` live `feTurbulence` filter is one of the most
  // expensive things a mobile GPU can be asked to rasterize — and because it's
  // fixed it recomposites on every scroll frame. It's a subtle desktop nicety,
  // so we simply drop it on phones where it costs the most and shows the least.
  const isMobile = useIsMobile();
  if (isMobile) return null;

  return (
    <svg
      className="pointer-events-none fixed inset-0 z-[999] h-full w-full opacity-[0.04]"
      aria-hidden
    >
      <filter id="grain-filter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.65"
          numOctaves="3"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain-filter)" />
    </svg>
  );
}
