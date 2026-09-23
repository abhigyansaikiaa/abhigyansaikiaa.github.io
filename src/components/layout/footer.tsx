"use client";



import { useRef, useEffect } from "react";
import {
  FaBehance,
  FaInstagram,
  FaYoutube,
  FaArrowRight,
  FaDiscord,
} from "react-icons/fa6";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { getCalApi } from "@calcom/embed-react";

const SocialLink = ({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center gap-2 overflow-hidden rounded border border-border/50 bg-background/50 px-4 py-2 text-sm font-medium backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-primary/10 cursor-pointer"
    >
      <Icon className="relative z-10 size-4 text-muted-foreground transition-colors group-hover:text-primary" />
      <span className="relative z-10 text-muted-foreground transition-colors group-hover:text-primary">
        {label}
      </span>
      {/* Fill effect */}
      <div className="absolute inset-0 -translate-x-[105%] bg-gradient-to-r from-primary/10 to-transparent transition-transform duration-500 ease-out group-hover:translate-x-0" />
    </a>
  );
};

// A "Magnetic" button that pulls towards the mouse cursor
const MagneticButton = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring animation for the movement
  const xSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const ySpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((e.clientX - centerX) * 0.2); // Move 20% of distance
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
    >
      {children}
    </motion.div>
  );
};

export default function CreativeFooter() {
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  const handleLetsTalkClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    const cal = await getCalApi({ namespace: "30min" });
    cal("modal", {
      calLink: "your-username/30min",
    });
  };

  return (
    <footer className="relative w-full overflow-hidden border-t pt-20 md:pt-32 pb-10">
      {/* --- BACKGROUND EFFECTS --- */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Noise Texture Overlay for that 'premium' feel */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-hard-light"></div>

        {/* Animated Blobs (x.ai style) */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/2 left-1/4 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            x: [-50, 50, -50],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-primary/30 blur-[100px]"
        />
      </div>

      {/* --- CONTENT CONTAINER --- */}
      <div className="container mx-auto px-6">
        {/* 1. CTA SECTION */}
        <div className="mb-24 flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div className="max-w-2xl overflow-hidden">
            <motion.h2
              initial={{ opacity: 0, y: 60, clipPath: "inset(0 0 100% 0)" }}
              whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl font-bold tracking-tighter md:text-8xl lg:text-9xl"
            >
              Let&apos;s make <br />
              <span className=" text-primary/80">waves.</span>
            </motion.h2>
          </div>

          <MagneticButton>
            <button
              onClick={handleLetsTalkClick}
              className="group relative cursor-pointer flex h-32 w-32 items-center justify-center rounded-full bg-foreground text-background transition-colors hover:bg-primary md:h-40 md:w-40"
            >
              <span className="absolute z-10 text-lg font-medium group-hover:opacity-0 transition-opacity duration-300">
                Let&apos;s Talk
              </span>
              <FaArrowRight className="absolute z-10 size-8 -translate-x-10 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 text-white" />
            </button>
          </MagneticButton>
        </div>

        {/* 2. GRID SECTION (Links & Branding) */}
        <div className="grid grid-cols-1 gap-12 border-t border-border/40 pt-12 md:grid-cols-12 md:gap-6">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-1 md:col-span-5 flex flex-col gap-6"
          >
            <a href="/" className="flex w-fit items-center gap-3">
              <div className="relative size-12 overflow-hidden rounded-xl bg-linear-to-br from-background to-muted border border-border shadow-sm flex items-center justify-center">
                <img
                  src="/md-red-logo.svg"
                  alt="Md Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Your Name
              </span>
            </a>
            <p className="max-w-xs text-muted-foreground text-sm leading-relaxed">
              A creative agency crafting digital experiences that merge art with
              functionality.
            </p>
          </motion.div>

          {/* Navigation Links (Sitemap) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-1 md:col-span-3 flex flex-col gap-4"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/80">
              Sitemap
            </h3>
            {[
              { label: "Home", href: "#hero" },
              { label: "About", href: "#about" },
              { label: "Projects", href: "#projects" },
              { label: "Contact", href: "#contact" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.2 + i * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <a
                  href={item.href}
                  className="w-fit text-foreground/80 hover:text-primary hover:translate-x-1 transition-all duration-300"
                >
                  {item.label}
                </a>
              </motion.div>
            ))}
          </motion.div>

          {/* Socials Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-1 md:col-span-4 flex flex-col gap-4"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/80">
              Socials
            </h3>
            <div className="flex flex-wrap gap-2">
              <SocialLink
                href="https://www.youtube.com/@yourusername"
                icon={FaYoutube}
                label="YouTube"
              />
              <SocialLink
                href="https://www.behance.net/yourusername"
                icon={FaBehance}
                label="Behance"
              />
              <SocialLink
                href="https://www.instagram.com/yourusername"
                icon={FaInstagram}
                label="Instagram"
              />
              <SocialLink
                href="https://discord.gg/yourinvite"
                icon={FaDiscord}
                label="Discord"
              />
            </div>
          </motion.div>
        </div>

        {/* 3. BOTTOM BAR */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/40 py-6 text-xs text-muted-foreground md:flex-row"
        >
          <p>© {currentYear} Your Name. All rights reserved.</p>
          {/* <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div> */}
        </motion.div>
      </div>
    </footer>
  );
}
