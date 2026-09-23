"use client";

import React, { useRef, useEffect, useState } from "react";

import { motion, useScroll, useTransform, useInView } from "motion/react";

// ─── Animated counter hook ────────────────────────────────────────────────────
function useCountUp(target: number, inView: boolean, duration = 1800) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [inView, target, duration]);

  return value;
}

// ─── Metric card ──────────────────────────────────────────────────────────────
interface MetricCardProps {
  prefix?: string;
  value: number;
  suffix?: string;
  label: string;
  description: string;
  highlight?: boolean;
  delay?: number;
}

const MetricCard = ({
  prefix = "",
  value,
  suffix = "",
  label,
  description,
  highlight = false,
  delay = 0,
}: MetricCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const count = useCountUp(value, inView, 1800);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative flex flex-col gap-3 p-8 rounded-2xl border overflow-hidden transition-all duration-500 cursor-default ${
        highlight
          ? "border-primary/40 bg-primary/5 hover:bg-primary/10"
          : "border-border bg-card hover:border-primary/30 hover:bg-muted/40"
      }`}
    >
      {highlight && (
        <motion.div
          animate={{ opacity: [0.25, 0.55, 0.25] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-linear-to-br from-primary/20 via-primary/5 to-transparent pointer-events-none"
        />
      )}
      <div className="absolute -bottom-8 -right-8 w-28 h-28 rounded-full border border-border opacity-15 group-hover:scale-[2] transition-transform duration-700" />
      <div className="relative z-10">
        <div
          className={`font-black tracking-tighter leading-none mb-1 ${
            highlight
              ? "text-primary text-7xl md:text-8xl"
              : "text-foreground text-6xl md:text-7xl"
          }`}
        >
          {prefix}
          {count}
          {suffix}
        </div>
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">
          {label}
        </p>
        <div
          className={`h-px w-10 mb-3 ${highlight ? "bg-primary/40" : "bg-border"}`}
        />
        <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

// ─── Main component ────────────────────────────────────────────────────────────
const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [50, -30]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [0.94, 1.02]);

  // Section-level entrance: panel slides up with subtle clip-path wipe
  const sectionY = useTransform(scrollYProgress, [0, 0.25], [40, 0]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <motion.section
      ref={sectionRef}
      style={{ y: sectionY, opacity: sectionOpacity }}
      className="relative w-full py-28 md:py-40 bg-background overflow-hidden"
    >
      {/* Subtle dot-grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      {/* Ambient glow behind metrics panel */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8 }}
        className="pointer-events-none absolute right-0 top-1/4 w-150 h-150 rounded-full bg-primary/10 blur-[140px]"
      />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
          {/* ══════════ LEFT — Identity ══════════ */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 w-fit px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-xs font-mono uppercase tracking-widest text-primary"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              About
            </motion.div>

            {/* Profile image with parallax */}
            <motion.div
              style={{ y: imageY, scale: imageScale }}
              className="relative w-full aspect-3/4 max-w-85 mx-auto lg:mx-0 overflow-hidden rounded-3xl"
            >
              {/* Border frame */}
              <div className="absolute -inset-px rounded-3xl border border-primary/15 z-20 pointer-events-none" />

              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop"
                alt="Your Name — Creative Director"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 340px, 28vw"
              />

              {/* Bottom fade */}
              <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-linear-to-t from-background via-background/50 to-transparent z-10" />

              {/* Availability pill */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute bottom-5 left-5 right-5 z-20 flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-background/85 backdrop-blur-md border border-border text-sm font-medium"
              >
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                  <span className="relative flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                Available for Projects
              </motion.div>
            </motion.div>

            {/* Name & designation */}
            <div className="space-y-3">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-4xl md:text-5xl font-black tracking-tighter leading-none"
              >
                Your Name
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="font-mono text-sm uppercase tracking-widest text-primary"
              >
                Creative Director & Video Editor
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-muted-foreground text-[15px] leading-relaxed max-w-xs"
              >
                Crafting high-impact visuals for gaming, sports, and lifestyle
                brands. Turning raw footage into stories that resonate and
                convert.
              </motion.p>
            </div>

            {/* Expertise tags */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-2"
            >
              {[
                "2D Animation",
                "Motion Design",
                "Video Editing",
                "Color Grading",
                "Brand Direction",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-5 py-2 rounded border border-border bg-muted text-xs font-mono uppercase tracking-wider text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors duration-300 cursor-default"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ══════════ RIGHT — Metrics ══════════ */}
          <div className="lg:col-span-7 flex flex-col justify-center gap-10">
            {/* Headline */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4"
              >
                By the numbers
              </motion.p>

              <motion.h3
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-4xl md:text-5xl lg:text-[3.5rem] font-black tracking-tighter leading-[0.93] uppercase"
              >
                Results that
                <br />
                <span className=" text-primary">Speak Loudly.</span>
              </motion.h3>
            </div>

            {/* Metric cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <MetricCard
                value={5}
                suffix="+ yrs"
                label="Years of Experience"
                description="Half a decade honing the craft of visual storytelling across global brands and viral campaigns."
                delay={0.15}
              />

              <MetricCard
                value={100}
                suffix="+"
                label="Projects Completed"
                description="From FIFA tournaments to esports highlights — diverse, delivered, and always ahead of deadline."
                delay={0.25}
              />

              {/* Revenue — full-width highlighted */}
              <div className="sm:col-span-2">
                <MetricCard
                  prefix="$"
                  value={3}
                  suffix="M+"
                  label="Revenue Achieved"
                  description="Revenue generated for clients through high-conversion content, brand campaigns, and viral media strategies that move the needle."
                  highlight
                  delay={0.35}
                />
              </div>
            </div>

            {/* Footnote */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-xs font-mono text-muted-foreground/50 uppercase tracking-widest border-t border-border pt-6"
            >
              Numbers reflect verified client outcomes — not estimates.
            </motion.p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
