import { motion } from 'framer-motion';
import FadeIn from './FadeIn';
import TechMarquee from './TechMarquee';
import ExpertiseCards from './ExpertiseCards';

const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative flex flex-col min-h-screen w-full items-center justify-center overflow-hidden bg-[#05050A] pt-32 pb-20"
    >
      {/* Animated Atmospheric Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-primary/20 rounded-full blur-[120px] animate-glow-pulse mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-secondary/10 rounded-full blur-[100px] animate-float mix-blend-screen" />
        {/* Subtle noise overlay */}
        <div 
          className="absolute inset-0 opacity-20 mix-blend-overlay"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-16 md:gap-24 px-4 sm:px-6">
        {/* Top Text Section */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto gap-8">
          <FadeIn delay={0.1} y={40}>
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 tracking-tighter leading-[0.9]">
              Code meets<br/>creative instinct.
            </h2>
          </FadeIn>

          <div className="flex flex-col gap-6 text-lg sm:text-xl md:text-2xl text-[#D7E2EA]/70 font-light leading-relaxed max-w-3xl mt-4">
            <FadeIn delay={0.3} y={20}>
              <p>
                I am currently pursuing a Bachelor of Medical Laboratory Science (BMLS) at RIPANS. 
              </p>
            </FadeIn>
            <FadeIn delay={0.4} y={20}>
              <p>
                Alongside my studies, I am interested in full stack web development and have been building real-world websites and web applications.
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Expertise Cards Layer */}
        <div className="w-full">
          <ExpertiseCards />
        </div>
      </div>

      {/* Full Width Marquee */}
      <div className="w-full mt-24">
        <TechMarquee />
      </div>

      {/* Currently Building Banner */}
      <FadeIn delay={0.6} y={20} className="w-full max-w-4xl mx-auto px-4 mt-20">
        <div className="rounded-full border border-primary/20 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 backdrop-blur-xl px-6 py-4 text-center">
          <p className="text-sm sm:text-base font-medium text-white/80 flex items-center justify-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
            </span>
            Currently building real-world web applications and experimenting with full stack development.
          </p>
        </div>
      </FadeIn>

    </section>
  );
};

export default AboutSection;
