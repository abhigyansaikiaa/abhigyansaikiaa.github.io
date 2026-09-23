"use client";

import React, { useEffect, useRef } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import PhraseAnimation from "@/components/common/phrase-reveal";

const CalBooking = () => {
  const containerRef = useRef(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, {
    once: true,
    margin: "0px 0px -80px 0px",
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax Logic
  const yImage = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const yCalendar = useTransform(scrollYProgress, [0, 1], [100, -100]);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full py-10 md:py-20 overflow-hidden px-4 md:px-8"
    >
      {/* 1. Heading with scroll-triggered reveal */}
      <div
        ref={headerRef}
        className="container relative z-10 mb-16 px-6 text-center mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
          animate={
            headerInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
          }
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-4 w-fit rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-medium text-primary uppercase tracking-widest"
        >
          Book time
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
          animate={
            headerInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
          }
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            <PhraseAnimation phrase="Let's  Make  Something " />
            <span className="block bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              <PhraseAnimation
                phrase="Awesome  Together"
                className="text-primary"
              />
            </span>
          </h3>
        </motion.div>

        {/* Sweeping line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={headerInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ originX: 0 }}
          className="mx-auto mt-6 h-px max-w-xs bg-linear-to-r from-primary/60 via-primary/20 to-transparent"
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl"
        >
          Schedule a 30-minute call to discuss your project and process.
        </motion.div>
      </div>

      {/* 2. Responsive Container: Flex Column on Mobile, Block on Desktop */}
      <div className="relative flex flex-col items-center lg:block max-w-7xl mx-auto">
        {/* --- LAYER 1: The Image --- */}
        <motion.div
          style={{ y: yImage }}
          className="relative z-0 w-full max-w-[400px] lg:max-w-none lg:mx-auto"
        >
          <img
            src={"/ichigo2.png"}
            alt="Profile photo"
            className="block mx-auto object-cover w-full h-auto"
          />
        </motion.div>

        {/* --- LAYER 2: The Overlays --- */}
        {/* Attached to yImage so they stick to the image during parallax */}
        <motion.div
          style={{ y: yImage }}
          className="absolute -top-1 w-full h-32 md:h-60 bg-gradient-to-b from-background to-transparent pointer-events-none z-10"
        />
        <motion.div
          style={{ y: yImage }}
          className="absolute -bottom-1 w-full h-32 md:h-60 bg-gradient-to-t from-background to-transparent pointer-events-none z-10"
        />

        {/* --- LAYER 3: The Calendar --- */}
        {/* 
           Mobile: Relative position, margin-top, centered width 
           Desktop (lg): Absolute position, right aligned
        */}
        <motion.div
          style={{ y: yCalendar }}
          className="
            relative z-20 mt-4 w-full max-w-md 
            lg:absolute lg:top-14 lg:right-0 lg:mt-0 lg:w-[450px]
          "
        >
          <div className="bg-background/50 backdrop-blur-sm rounded-xl p-2 md:p-0">
            <Cal
              namespace="30min"
              calLink="your-username/30min"
              // Change fixed width to 100% so the parent div controls the size
              style={{ width: "100%", height: "280px", overflowX: "scroll" }}
              config={{ layout: "month_view" }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CalBooking;
