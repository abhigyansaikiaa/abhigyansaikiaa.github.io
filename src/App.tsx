import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";

import LenisWrapper from "@/providers/lenis-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import FooterSection from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import CustomCursor from "@/components/ui/custom-cursor";

import AboutMe from "@/components/sections/about/about-me";
import CalBooking from "@/components/sections/home/cal-booking";
import Testimonials from "@/components/sections/home/testimonials";
import { TimelineDemo } from "@/components/sections/home/timeline-demo";
import Preloader from "@/components/common/preloader";
import ShowReel from "@/components/sections/showreel";
import CollabSec from "@/components/sections/home/collab-section";
import AboutScrollSection from "@/components/sections/about/about-scroll-section";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoaded = () => {
    setIsLoading(false);
    document.body.style.cursor = "default";
    window.scrollTo(0, 0);
  };

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <LenisWrapper>
        <CustomCursor />
        <Navbar />

        <div className="flex min-h-screen flex-col items-center justify-center scroll-smooth">
          <AnimatePresence mode="wait">
            {isLoading && <Preloader onComplete={handleLoaded} />}
          </AnimatePresence>

          <section id="hero" className="w-full scroll-mt-24">
            <AboutMe />
          </section>
          
          <ShowReel />

          <section id="about" className="">
            <AboutScrollSection />
          </section>

          <section id="projects" className="w-full scroll-mt-24">
            <TimelineDemo />
          </section>
          
          <CollabSec />

          <Testimonials />
          
          <section id="contact" className="w-full scroll-mt-24">
            <CalBooking />
          </section>
        </div>
        
        <FooterSection />
      </LenisWrapper>
    </ThemeProvider>
  );
};

export default App;
