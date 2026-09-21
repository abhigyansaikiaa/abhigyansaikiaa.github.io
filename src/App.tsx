import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import Cursor from './components/Cursor';

const App = () => {
  return (
    <>
      <Cursor />
      <Header />
      <main
        className="relative w-full text-[var(--text-dark)] bg-[var(--bg-light)]"
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
