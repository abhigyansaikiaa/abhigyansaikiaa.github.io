import React from 'react';

const ContactSection = () => {
  return (
    <section id="contact" className="relative w-full bg-[#121212] text-white pt-32 flex flex-col items-center rounded-t-[40px] md:rounded-t-[80px] -mt-10 z-20 overflow-hidden">
      
      <div className="w-full max-w-screen-2xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-32">
        <h2 className="font-clash font-bold text-6xl md:text-[8vw] uppercase tracking-tighter leading-[0.8] max-w-4xl">
          LET'S CREATE SOMETHING <span className="text-cyan-400">MEANINGFUL.</span>
        </h2>
        
        <div className="flex flex-col gap-6 font-satoshi text-sm md:text-base font-bold tracking-[0.2em] uppercase">
          <a href="mailto:abhigyannsaikia@gmail.com" className="hover:text-cyan-400 transition-colors">abhigyannsaikia@gmail.com</a>
          <a href="https://www.linkedin.com/in/abhigyan-saikia-26641227b" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">LINKEDIN</a>
          <a href="https://github.com/abhigyansaikiaa" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">GITHUB</a>
        </div>
      </div>

      {/* Giant Footer Marquee */}
      <div className="w-full overflow-hidden border-t border-white/10 pt-12 pb-6 flex items-center bg-[#0a0a0a]">
        <div className="flex whitespace-nowrap animate-[scroll_20s_linear_infinite]">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center">
              <span className="font-clash font-bold text-[15vw] md:text-[20vw] leading-none uppercase tracking-tighter text-white/5 mx-8 hover:text-cyan-400/20 transition-colors duration-500 cursor-default">
                ABHIGYAN SAIKIA
              </span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default ContactSection;
