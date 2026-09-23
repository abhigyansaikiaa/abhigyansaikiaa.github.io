import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import Cursor from './components/Cursor';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoaded = () => {
    setIsLoading(false);
    document.body.style.cursor = 'default';
    window.scrollTo(0, 0);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={handleLoaded} />}
      </AnimatePresence>

      <Cursor />
      {!isLoading && <Header />}
      <main
        className={`relative w-full text-[var(--text-dark)] bg-[var(--bg-light)] ${isLoading ? 'h-screen overflow-hidden' : ''}`}
        style={{ overflowX: 'clip' }}
      >
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </>
  );
};

export default App;
