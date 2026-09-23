"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { showReelI } from "@/data/show-reel";
import { Dialog, DialogPortal, DialogOverlay } from "@/components/ui/dialog";

interface VideoModalProps {
  item: showReelI | null;
  onClose: () => void;
}

export function VideoModal({ item, onClose }: VideoModalProps) {
  return (
    <Dialog open={!!item} onOpenChange={(open) => !open && onClose()}>
      <DialogPortal>
        <DialogOverlay className="bg-black/80" />

        <DialogPrimitive.Content
          aria-describedby={undefined}
          className="fixed inset-0 z-50 flex flex-col bg-black outline-none"
        >
          {/* Visually hidden title for accessibility */}
          <DialogPrimitive.Title className="sr-only">
            {item?.title ?? "Video"}
          </DialogPrimitive.Title>

          {/* Full-viewport Vimeo player with controls */}
          {item && (
            <iframe
              key={item.vimeoId}
              src={`https://player.vimeo.com/video/${item.vimeoId}?autoplay=1&byline=0&title=0&dnt=1`}
              className="h-full w-full"
              style={{ border: 0 }}
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
              referrerPolicy="strict-origin-when-cross-origin"
              title={item.title}
            />
          )}

          {/* Top gradient */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/70 to-transparent" />

          {/* Title */}
          <p
            className="absolute left-6 top-5 font-mono text-base font-bold tracking-widest text-white uppercase whitespace-nowrap"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.9)" }}
          >
            {item?.title}
          </p>

          {/* Close button */}
          <DialogPrimitive.Close
            onClick={onClose}
            className="absolute right-5 top-4 flex size-10 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/25"
          >
            <X size={16} />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
