"use client";

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { showRealData, type showReelI } from "@/data/show-reel";
import { Grain } from "./grain";
import { ReelCard } from "./reel-card";
import { VideoModal } from "./video-modal";

/**
 * Persistent Vimeo backdrop for a single slide.
 * Mounted once and never destroyed — only opacity toggles.
 */
function VimeoBackdrop({
  item,
  isActive,
  mountVideo,
}: {
  item: showReelI;
  isActive: boolean;
  /** When false we render only the thumbnail — no iframe. On phones we pass
   *  false for non-active slides so at most one Vimeo player is ever alive. */
  mountVideo: boolean;
}) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        zIndex: isActive ? 2 : 1,
        opacity: isActive ? 1 : 0,
        transition: "opacity 0.7s ease-in-out",
      }}
    >
      {/* Thumbnail fallback — visible instantly */}
      <img
        src={item.thumbnail}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />

      {/* Vimeo background player — autoplays muted, no UI */}
      {mountVideo && (
        <iframe
          src={`https://player.vimeo.com/video/${item.vimeoId}?background=1&autoplay=1&loop=1&muted=1&dnt=1`}
          loading="lazy"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "max(100%, 177.78vh)",
            height: "max(100%, 56.25vw)",
            transform: "translate(-50%, -50%)",
            border: 0,
          }}
          allow="autoplay; fullscreen"
          title={item.title}
        />
      )}

      {/* Cinematic grade overlays */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-black/50" />
      <div className="absolute inset-0 bg-linear-to-r from-black/50 via-transparent to-black/20" />
    </div>
  );
}

export default function ShowReel() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const [locked, setLocked] = useState(false);
  const [modal, setModal] = useState<showReelI | null>(null);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [lastNav, setLastNav] = useState(0);
  const [isTouch, setIsTouch] = useState(false);

  const lockTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragStart = useRef<{ x: number; y: number } | null>(null);
  const suppressClick = useRef(false);
  const total = showRealData.length;

  // Detect touch / coarse-pointer devices → hide the custom play cursor
  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  // Which slide indices should have their iframes mounted (current + adjacent)
  const mountedIndices = useMemo(() => {
    const set = new Set<number>();
    set.add(active);
    set.add((active + 1) % total);
    set.add((active - 1 + total) % total);
    return set;
  }, [active, total]);

  // Cursor spring
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 40 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 40 });

  // 10-second autoplay — pauses while modal is open, resets on manual nav
  useEffect(() => {
    if (modal) return;
    const id = setInterval(() => {
      setDir(1);
      setActive((prev) => (prev + 1) % total);
    }, 10000);
    return () => clearInterval(id);
  }, [modal, total, lastNav]);

  const navigate = useCallback(
    (step: number) => {
      if (locked) return;
      const next = active + step;
      if (next < 0 || next >= total) return;
      setDir(step);
      setActive(next);
      setLastNav(Date.now());
      setLocked(true);
      if (lockTimer.current) clearTimeout(lockTimer.current);
      lockTimer.current = setTimeout(() => setLocked(false), 700);
    },
    [active, locked, total],
  );

  // Drag / swipe to move to the previous or next reel
  const handleDragStart = useCallback(
    (e: React.PointerEvent) => {
      if (modal) return;
      suppressClick.current = false;
      dragStart.current = { x: e.clientX, y: e.clientY };
    },
    [modal],
  );

  const handleDragEnd = useCallback(
    (e: React.PointerEvent) => {
      if (!dragStart.current || modal) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      dragStart.current = null;

      const SWIPE_THRESHOLD = 50;
      // Horizontal swipe wins → drag left = next, drag right = previous
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > SWIPE_THRESHOLD) {
        suppressClick.current = true; // don't also open the modal on a swipe
        navigate(dx < 0 ? 1 : -1);
      }
    },
    [modal, navigate],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") navigate(1);
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") navigate(-1);
      if (e.key === "Escape") setModal(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  return (
    <>
      <Grain />

      {/* Shadcn-based fullscreen video modal */}
      <VideoModal item={modal} onClose={() => setModal(null)} />

      <section
        className={`relative h-dvh md:h-screen w-full select-none overflow-hidden bg-black ${
          modal || isTouch ? "cursor-auto" : "cursor-none"
        }`}
        style={{ touchAction: "pan-y" }}
        aria-label="Show Reel"
        onPointerDown={handleDragStart}
        onPointerUp={handleDragEnd}
        onMouseMove={(e) => {
          if (!modal) {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
          }
        }}
        onMouseEnter={() => {
          if (!modal) setCursorVisible(true);
        }}
        onMouseLeave={() => setCursorVisible(false)}
      >
        {/* ── PERSISTENT VIDEO BACKDROPS ──
            Current + adjacent slides stay mounted so their iframes never reload.
            Only opacity toggles on transition → instant video swap. */}
        {showRealData.map((item, i) => {
          if (!mountedIndices.has(i)) return null;
          // Desktop pre-mounts neighbors for an instant swap; touch devices
          // keep only the active player alive to avoid 3 concurrent iframes.
          const mountVideo = isTouch ? i === active : true;
          return (
            <VimeoBackdrop
              key={`backdrop-${i}`}
              item={item}
              isActive={i === active}
              mountVideo={mountVideo}
            />
          );
        })}

        {/* Custom play cursor — desktop / fine-pointer only */}
        {!isTouch && (
          <motion.div
            style={{ x: springX, y: springY }}
            animate={{
              opacity: cursorVisible && !modal ? 1 : 0,
              scale: cursorVisible && !modal ? 1 : 0.5,
            }}
            transition={{
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 },
            }}
            className="pointer-events-none fixed left-0 top-0 z-9998 flex size-18 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm"
          >
            <svg
              viewBox="0 0 10 12"
              className="h-4 w-3.5 translate-x-px fill-white"
              aria-hidden
            >
              <polygon points="0,0 10,6 0,12" />
            </svg>
          </motion.div>
        )}

        {/* Full-bleed cards */}
        <AnimatePresence custom={dir} mode="wait">
          <ReelCard
            key={active}
            item={showRealData[active]}
            index={active}
            total={total}
            direction={dir}
            onOpen={() => {
              if (suppressClick.current) return;
              setModal(showRealData[active]);
            }}
          />
        </AnimatePresence>

        {/* Prev / Next + dot navigation */}
        <div className="absolute bottom-10 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3">
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              navigate(-1);
            }}
            disabled={active === 0}
            whileHover={active === 0 ? {} : { scale: 1.1 }}
            whileTap={active === 0 ? {} : { scale: 0.92 }}
            className="flex size-10 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md transition-colors hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-25"
          >
            <ChevronLeft size={18} />
          </motion.button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: total }).map((_, i) => (
              <motion.button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  if (i !== active) {
                    setDir(i > active ? 1 : -1);
                    setActive(i);
                    setLastNav(Date.now());
                  }
                }}
                animate={{
                  width: i === active ? 20 : 6,
                  opacity: i === active ? 1 : 0.35,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="h-1.5 rounded-full bg-white"
              />
            ))}
          </div>

          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              navigate(1);
            }}
            disabled={active === total - 1}
            whileHover={active === total - 1 ? {} : { scale: 1.1 }}
            whileTap={active === total - 1 ? {} : { scale: 0.92 }}
            className="flex size-10 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md transition-colors hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-25"
          >
            <ChevronRight size={18} />
          </motion.button>
        </div>

        <AnimatePresence>
          {active === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2 font-mono text-[10px] font-semibold tracking-[0.4em] text-white/25 uppercase"
            >
              Scroll to Explore ↓
            </motion.p>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}
