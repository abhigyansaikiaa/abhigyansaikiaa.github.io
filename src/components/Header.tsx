import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 bg-white/80 backdrop-blur-md border-b border-black/10 transition-all duration-300">
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 h-20 flex justify-between items-center">
          
          {/* Logo */}
          <div className="font-clash font-bold text-2xl uppercase tracking-tighter text-[#121212]">
            <a href="#">ABHIGYAN</a>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-6">
            <a 
              href="mailto:abhigyannsaikia@gmail.com" 
              className="hidden md:flex items-center justify-center px-6 py-3 bg-[#121212] text-[#F2F2F2] rounded-full font-satoshi text-xs font-bold tracking-[0.2em] uppercase hover:bg-cyan-500 transition-colors duration-300"
            >
              LET'S TALK
            </a>
            
            {/* Grid Toggle Icon (Unifex Style) */}
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="flex flex-col gap-[6px] w-8 h-8 justify-center items-center group"
            >
              <div className="flex gap-[6px]">
                <div className="w-1.5 h-1.5 bg-[#121212] rounded-full group-hover:bg-cyan-500 transition-colors" />
                <div className="w-1.5 h-1.5 bg-[#121212] rounded-full group-hover:bg-cyan-500 transition-colors" />
              </div>
              <div className="flex gap-[6px]">
                <div className="w-1.5 h-1.5 bg-[#121212] rounded-full group-hover:bg-cyan-500 transition-colors" />
                <div className="w-1.5 h-1.5 bg-[#121212] rounded-full group-hover:bg-cyan-500 transition-colors" />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Off-canvas Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Dark Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
            />
            
            {/* Drawer */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              className="fixed top-0 right-0 w-full md:w-[400px] h-full bg-[#121212] z-50 text-[#F2F2F2] p-8 flex flex-col justify-between"
            >
              <div className="flex justify-between items-center mb-16">
                <span className="font-clash font-bold text-xl uppercase tracking-tighter">MENU</span>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center hover:text-cyan-400 transition-colors"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <nav className="flex flex-col gap-6">
                <a href="#about" onClick={() => setIsMenuOpen(false)} className="font-clash text-4xl font-bold uppercase tracking-tighter hover:text-cyan-400 transition-colors">ABOUT</a>
                <a href="#services" onClick={() => setIsMenuOpen(false)} className="font-clash text-4xl font-bold uppercase tracking-tighter hover:text-cyan-400 transition-colors">EXPERTISE</a>
                <a href="#projects" onClick={() => setIsMenuOpen(false)} className="font-clash text-4xl font-bold uppercase tracking-tighter hover:text-cyan-400 transition-colors">WORK</a>
                <a href="#contact" onClick={() => setIsMenuOpen(false)} className="font-clash text-4xl font-bold uppercase tracking-tighter hover:text-cyan-400 transition-colors">CONTACT</a>
              </nav>

              <div className="mt-auto flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                  <span className="font-satoshi text-xs font-bold tracking-[0.2em] uppercase text-white/50">SAY HELLO</span>
                  <a href="mailto:abhigyannsaikia@gmail.com" className="font-satoshi text-lg hover:text-cyan-400 transition-colors">abhigyannsaikia@gmail.com</a>
                </div>
                
                <div className="flex gap-6 font-satoshi text-xs font-bold tracking-[0.2em] uppercase">
                  <a href="https://github.com/abhigyansaikiaa" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">GITHUB</a>
                  <a href="https://www.linkedin.com/in/abhigyan-saikia-26641227b" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">LINKEDIN</a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
