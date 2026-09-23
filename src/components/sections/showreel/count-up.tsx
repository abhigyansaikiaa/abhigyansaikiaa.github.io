"use client";

import { useState, useEffect, useRef } from "react";
import { formatStat } from "./utils";

interface CountUpProps {
  to: number;
  trigger: boolean;
  className?: string;
}

export function CountUp({ to, trigger, className }: CountUpProps) {
  const [val, setVal] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!trigger) {
      setVal(0);
      return;
    }
    const duration = 1400;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setVal(Math.round((1 - Math.pow(1 - t, 3)) * to));
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, [trigger, to]);

  return <span className={className}>{formatStat(val)}</span>;
}
