"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// Placeholder sequence: Lorem Picsum's seeded URLs return a distinct, stable
// photo per seed, which gives us 47 real (if unrelated) frames for the
// scroll-scrub without needing an account. `seed-${index}` keeps each frame
// deterministic across reloads. On phones we never need full-res frames for a
// scroll-scrub, so we cap the requested width per device.
// TODO: swap this for your own 47 sequential frames (e.g. hosted on
// ImageKit/Cloudinary/S3) for a real scrubbing animation instead of a slideshow.
function buildImageUrl(index: number): string {
  const width =
    typeof window === "undefined"
      ? 1200
      : Math.round(
          Math.min(
            window.innerWidth * Math.min(window.devicePixelRatio || 1, 2),
            window.innerWidth < 768 ? 900 : 1920,
          ),
        );
  const height = Math.round(width * 1.3);

  return `https://picsum.photos/seed/about-section-${index}/${width}/${height}`;
}

const aboutSectionImages = Array.from({ length: 47 }, (_, i) => ({ index: i }));

// Ratio: 5 units (images) + 2 units (text reveal) = 7 total → h-[700vh]
const IMAGE_DURATION = 5;
const TEXT_DURATION = 2;

// oklch(59.71% 0.23 23.86) ≈ #c93a2a — site-wide red accent
const redColor = "oklch(59.71% 0.23 23.86)";

const AboutScrollSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameIndexRef = useRef({ value: 0 });

  // Preload all images
  useEffect(() => {
    const loadImages = async () => {
      const promises = aboutSectionImages.map((img, index) => {
        return new Promise<HTMLImageElement>((resolve, reject) => {
          const image = new window.Image();
          image.crossOrigin = "anonymous";
          image.src = buildImageUrl(img.index);
          image.onload = () => {
            imagesRef.current[index] = image;
            resolve(image);
          };
          image.onerror = reject;
        });
      });

      try {
        await Promise.all(promises);
        setImagesLoaded(true);
      } catch (error) {
        console.error("Error loading images:", error);
      }
    };

    loadImages();
  }, []);

  // Render frame on canvas
  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img) return;

    // Only touch canvas.width/height when the viewport actually changed.
    // Assigning them resets + reallocates the entire backing store, so doing it
    // on every scrubbed frame (as before) was the main source of scroll jank on
    // phones. Reading them first and comparing keeps 99% of frames allocation-free.
    if (canvas.width !== window.innerWidth) canvas.width = window.innerWidth;
    if (canvas.height !== window.innerHeight)
      canvas.height = window.innerHeight;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate dimensions to cover the canvas (like object-fit: cover)
    const imgRatio = img.width / img.height;
    const canvasRatio = canvas.width / canvas.height;

    let drawWidth, drawHeight, drawX, drawY;

    if (canvasRatio > imgRatio) {
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgRatio;
      drawX = 0;
      drawY = (canvas.height - drawHeight) / 2;
    } else {
      drawHeight = canvas.height;
      drawWidth = canvas.height * imgRatio;
      drawX = (canvas.width - drawWidth) / 2;
      drawY = 0;
    }

    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  };

  // GSAP ScrollTrigger animation
  useGSAP(
    () => {
      if (
        !imagesLoaded ||
        !sectionRef.current ||
        !canvasRef.current ||
        !pinWrapperRef.current ||
        !textRef.current
      )
        return;

      // Render the first frame immediately
      renderFrame(0);

      // Single timeline: pin the whole wrapper (canvas + text overlay) for the
      // entire section. Phase 1 → image frames, Phase 2 → text reveal.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: pinWrapperRef.current,
          scrub: 0.5,
        },
      });

      // Phase 1 — animate through all image frames
      tl.to(
        frameIndexRef.current,
        {
          value: aboutSectionImages.length - 1,
          ease: "none",
          duration: IMAGE_DURATION,
          onUpdate: () => {
            renderFrame(Math.round(frameIndexRef.current.value));
          },
        },
        0,
      );

      // Scroll hint — stays visible until ~frame 15, then fades out over the
      // next few frames so it never overlaps the rest of the sequence.
      const scrollHint =
        pinWrapperRef.current.querySelector<HTMLElement>("[data-scroll-hint]");

      if (scrollHint) {
        const lastFrame = aboutSectionImages.length - 1;
        const frameToTime = (frame: number) =>
          (IMAGE_DURATION * frame) / lastFrame;
        const fadeStart = frameToTime(0);
        const fadeEnd = frameToTime(30);

        tl.to(
          scrollHint,
          { opacity: 0, ease: "none", duration: fadeEnd - fadeStart },
          fadeStart,
        );
      }

      // Phase 2 — progressively reveal the about card once last frame is held
      const overlay = textRef.current.querySelector<HTMLElement>(
        "[data-reveal-overlay]",
      );

      if (overlay) {
        tl.fromTo(
          overlay,
          { opacity: 0 },
          { opacity: 1, ease: "none", duration: TEXT_DURATION / 2 },
          IMAGE_DURATION,
        );
      }

      const textLines =
        textRef.current.querySelectorAll<HTMLElement>("[data-reveal-line]");

      tl.fromTo(
        textLines.length ? textLines : textRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          duration: TEXT_DURATION,
          stagger: textLines.length
            ? TEXT_DURATION / (textLines.length * 2)
            : 0,
        },
        IMAGE_DURATION, // starts right after image phase ends
      );

      // Handle window resize
      const handleResize = () => {
        renderFrame(Math.round(frameIndexRef.current.value));
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    },
    { scope: sectionRef, dependencies: [imagesLoaded] },
  );

  return (
    // 700vh = 500vh image scroll + 200vh text reveal
    <div ref={sectionRef} className="relative h-[800vh]">
      {/* Loading State — scoped to this section (absolute, not fixed) so the
          47-frame preload never covers the hero/above-the-fold content */}
      {!imagesLoaded && (
        <div className="absolute inset-x-0 top-0 z-40 flex h-screen items-center justify-center bg-black">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent" />
            <p className="text-lg text-white">Loading images...</p>
          </div>
        </div>
      )}

      {/* Pinned container — holds both canvas and text overlay */}
      <div
        ref={pinWrapperRef}
        className="relative h-screen w-full overflow-hidden"
      >
        {/* Canvas for rendering frames */}
        <canvas ref={canvasRef} className="h-full w-full" />

        {/* Scroll hint — nudges the user to keep scrolling to play the reel */}
        <div
          data-scroll-hint
          className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 md:inset-y-auto md:bottom-10 md:justify-start"
        >
          <span
            className="text-[10px] uppercase tracking-[0.35em] text-white/70 md:text-xs"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Scroll to play
          </span>
          <span
            className="flex h-9 w-5.5 items-start justify-center rounded-full border pt-2"
            style={{ borderColor: "oklch(59.71% 0.23 23.86 / 0.6)" }}
          >
            <span
              className="h-1.5 w-1.5 animate-bounce rounded-full"
              style={{ backgroundColor: redColor }}
            />
          </span>
        </div>

        {/* Creative about card — revealed once the last frame is held */}
        <div ref={textRef} className="pointer-events-none absolute inset-0">
          {/* Readability gradient over the frame */}
          <div
            data-reveal-overlay
            className="absolute inset-0 bg-linear-to-r from-black/80 via-black/35 to-transparent opacity-0"
          />

          <div className="absolute inset-y-0 left-0 flex w-full flex-col justify-center px-6 sm:w-[55%] sm:px-14 lg:px-20">
            <div className="relative max-w-xl p-8 sm:p-10">
              {/* Corner brackets */}
              <div
                data-reveal-line
                className="absolute left-0 top-0 h-8 w-8 border-l border-t opacity-0"
                style={{ borderColor: "oklch(59.71% 0.23 23.86 / 0.6)" }}
              />
              <div
                data-reveal-line
                className="absolute right-0 top-0 h-8 w-8 border-r border-t opacity-0"
                style={{ borderColor: "oklch(59.71% 0.23 23.86 / 0.6)" }}
              />
              <div
                data-reveal-line
                className="absolute bottom-0 left-0 h-8 w-8 border-b border-l opacity-0"
                style={{ borderColor: "oklch(59.71% 0.23 23.86 / 0.6)" }}
              />
              <div
                data-reveal-line
                className="absolute bottom-0 right-0 h-8 w-8 border-b border-r opacity-0"
                style={{ borderColor: "oklch(59.71% 0.23 23.86 / 0.6)" }}
              />

              <p
                data-reveal-line
                className="mb-5 text-[10px] uppercase tracking-[0.3em] opacity-0 md:text-xs"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  color: redColor,
                }}
              >
                ✦ About Me ✦
              </p>

              <h2
                data-reveal-line
                className="mb-5 text-3xl font-bold leading-[1.08] text-white opacity-0 sm:text-4xl lg:text-5xl"
              >
                I&apos;d rather let the{" "}
                <span
                  className="font-normal italic"
                  style={{
                    fontFamily: "'DM Serif Display', Georgia, serif",
                    color: redColor,
                  }}
                >
                  work
                </span>{" "}
                do the talking.
              </h2>

              <p
                data-reveal-line
                className="mb-6 max-w-md text-sm leading-relaxed text-white/60 opacity-0 sm:text-base"
              >
                7 years of turning design into motion — across brands, creators,
                and culture-led stories. Built on one simple rule: quality over
                quantity, always.
              </p>

              {/* Accent divider */}
              <div
                data-reveal-line
                className="mb-6 h-px w-24 opacity-0"
                style={{
                  backgroundImage: `linear-gradient(to right, ${redColor}, transparent)`,
                }}
              />

              {/* Discipline chips */}
              <div
                data-reveal-line
                className="mb-8 flex flex-wrap items-center gap-3 opacity-0"
              >
                {["CREATIVE DIRECTION", "MOTION", "ANIMATION", "EDIT"].map(
                  (discipline, i) => (
                    <span
                      key={discipline}
                      className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-white/50"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      {i !== 0 && (
                        <span
                          className="h-1 w-1 rounded-full"
                          style={{ backgroundColor: redColor }}
                        />
                      )}
                      {discipline}
                    </span>
                  ),
                )}
              </div>

              <p data-reveal-line className="opacity-0">
                <span
                  className="text-xs uppercase tracking-[0.25em] text-white"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  Happy to collaborate
                </span>{" "}
                <span style={{ color: redColor }}>✦</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutScrollSection;
