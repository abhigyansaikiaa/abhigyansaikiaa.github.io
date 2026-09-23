"use client";

import { useState, useEffect, useRef } from "react";
import { SCRAMBLE_CHARS } from "./constants";

interface ScrambleTextProps {
  text: string;
  trigger: boolean;
  className?: string;
}

export function ScrambleText({ text, trigger, className }: ScrambleTextProps) {
  const [display, setDisplay] = useState(text);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!trigger) {
      setDisplay(text);
      return;
    }
    const total = 24;
    let frame = 0;

    const tick = () => {
      setDisplay(
        text
          .split("")
          .map((ch, i) => {
            if (ch === " ") return " ";
            if (frame >= Math.round((i / text.length) * total)) return ch;
            return SCRAMBLE_CHARS[
              Math.floor(Math.random() * SCRAMBLE_CHARS.length)
            ];
          })
          .join(""),
      );
      frame++;
      if (frame <= total) raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, [trigger, text]);

  return <span className={className}>{display}</span>;
}
