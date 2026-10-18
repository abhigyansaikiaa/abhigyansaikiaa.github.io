import React, { useEffect } from 'react';
import { SiteLoader } from './components/SiteLoader';
import { WavingHero } from './components/WavingHero';
import { EditorialSections } from './components/EditorialSections';
import { ChatbotWidget } from './components/ChatbotWidget';
import './styles/reel-hero.css';
import './styles/browser-hero.css';

export const App: React.FC = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      if (!window.location.hash) {
        window.scrollTo(0, 0);
      }
    }
  }, []);

  return (
    <SiteLoader>
      <WavingHero />
      <EditorialSections />
      <ChatbotWidget />
    </SiteLoader>
  );
};

