"use client";

import { motion } from "framer-motion";
import { Eye, Heart, MessageCircle, Repeat2 } from "lucide-react";
import type { showReelI } from "@/data/show-reel";
import { CARD_VARIANTS } from "./constants";
import { padIndex } from "./utils";
import { ScrambleText } from "./scramble-text";
import { StatChip } from "./stat-chip";

interface ReelCardProps {
  item: showReelI;
  index: number;
  total: number;
  direction: number;
  onOpen: () => void;
}

/**
 * HUD-only overlay — title, stats, watermark, navigation indicators.
 * Video playback is handled by a separate persistent layer in the parent
 * so iframes are never destroyed on slide transitions.
 */
export function ReelCard({
  item,
  index,
  total,
  direction,
  onOpen,
}: ReelCardProps) {
  return (
    <motion.div
      key={item.title}
      custom={direction}
      variants={CARD_VARIANTS}
      initial="enter"
      animate="active"
      exit="exit"
      className="absolute inset-0 z-10 cursor-none"
      onClick={onOpen}
    >
      {/* Ghost index watermark */}
      <motion.span
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 0.06, x: 0 }}
        transition={{ delay: 0.15, duration: 0.7 }}
        className="pointer-events-none absolute bottom-0 right-6 select-none font-mono font-black leading-none text-white"
        style={{ fontSize: "clamp(160px, 26vw, 340px)", lineHeight: 0.85 }}
      >
        {padIndex(index)}
      </motion.span>

      {/* ── TOP HUD ── */}
      <div className="absolute inset-x-0 top-0 flex items-start justify-between px-8 pt-7 md:px-14">
        <div>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="font-mono text-[10px] font-semibold tracking-[0.4em] text-white/35 uppercase"
          >
            Selected Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="font-mono text-xl font-black uppercase tracking-tight text-white md:text-2xl"
          >
            Show Reel
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.24 }}
          className="flex items-center gap-2 pt-1"
        >
          <span className="mr-2 font-mono text-[10px] font-semibold tracking-[0.3em] text-white/35 uppercase">
            {padIndex(index)} / {padIndex(total - 1)}
          </span>
          {Array.from({ length: total }).map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scaleX: i === index ? 1 : 0.5,
                opacity: i === index ? 1 : 0.2,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="h-[2px] w-8 origin-left rounded-full bg-white"
            />
          ))}
        </motion.div>
      </div>

      {/* ── BOTTOM HUD ── */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 px-8 pb-10 md:px-14">
        <div className="flex max-w-xl flex-col gap-4">
          <h3
            className="font-mono font-black uppercase leading-tight tracking-wider text-white"
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              textShadow: "0 4px 40px rgba(0,0,0,0.95)",
            }}
          >
            <ScrambleText
              text={item.title}
              trigger
              className="whitespace-nowrap"
            />
          </h3>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap gap-2"
          >
            <StatChip
              icon={Eye}
              value={item.stats.views}
              label="views"
              trigger
            />
            <StatChip
              icon={Heart}
              value={item.stats.likes}
              label="likes"
              trigger
            />
            <StatChip
              icon={MessageCircle}
              value={item.stats.comments}
              label="comments"
              trigger
            />
            <StatChip
              icon={Repeat2}
              value={item.stats.repost}
              label="reposts"
              trigger
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
