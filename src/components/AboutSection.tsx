import { motion } from 'framer-motion';
import FadeIn from './FadeIn';
import TechMarquee from './TechMarquee';
import ExpertiseCards from './ExpertiseCards';

const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative flex flex-col w-full bg-[#05050A] pt-32 pb-32 overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Side: Sticky Title */}
        <div className="w-full lg:w-5/12">
          <div className="lg:sticky lg:top-32 flex flex-col gap-6">
            <FadeIn y={30}>
              <h2 className="font-clash text-5xl sm:text-6xl md:text-8xl font-semibold text-white tracking-tight leading-[0.85] uppercase">
                THE<br />ENGINEER.
              </h2>
            </FadeIn>
            <FadeIn delay={0.2} y={20}>
              <div className="h-px w-24 bg-primary/40 mt-4 mb-4" />
              <p className="text-xs sm:text-sm font-semibold tracking-[0.3em] text-secondary/80 uppercase">
                Based in India
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Right Side: Bio & Flowing Text */}
        <div className="w-full lg:w-7/12 flex flex-col gap-12">
          <div className="flex flex-col gap-8 text-lg sm:text-xl md:text-2xl text-[#D7E2EA]/70 font-light leading-relaxed max-w-[65ch]">
            <FadeIn delay={0.1} y={30}>
              <p>
                I am currently pursuing a Bachelor of Medical Laboratory Science (BMLS) at RIPANS.
              </p>
            </FadeIn>
            <FadeIn delay={0.2} y={30}>
              <p>
                Alongside my studies, I focus on full-stack development, building real products, and experimenting with new tools. I enjoy taking ideas from concept to working software.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.4} y={30}>
            <div className="mt-12 rounded-2xl bg-white/[0.02] border border-white/5 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
              <div className="relative flex h-4 w-4 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-secondary"></span>
              </div>
              <p className="text-sm sm:text-base font-medium text-white/80 leading-relaxed uppercase tracking-widest text-center sm:text-left">
                Currently building real products and experimenting with developer tools.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Expertise Section */}
      <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 md:px-12 mt-32 md:mt-48">
        <FadeIn y={30} className="mb-16 border-t border-white/10 pt-16">
          <h3 className="font-clash text-3xl sm:text-5xl font-semibold text-white tracking-tight uppercase">
            Disciplines
          </h3>
        </FadeIn>
        <ExpertiseCards />
      </div>

      {/* Full Width Marquee */}
      <div className="w-full mt-32 md:mt-40">
        <TechMarquee />
      </div>
    </section>
  );
};

export default AboutSection;
