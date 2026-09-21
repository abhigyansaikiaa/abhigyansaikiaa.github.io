import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from './FadeIn';

const SERVICES = [
  {
    number: '01',
    title: 'Content & Analysis',
    description:
      'Leveraging media data analysis and YouTube strategy to craft engaging scripts and content that maximize audience retention and drive growth.',
  },
  {
    number: '02',
    title: 'Full Stack Web Development',
    description:
      'Building robust, full-stack applications with React, Next.js, TypeScript, Tailwind CSS, and Supabase to deliver responsive and user-centric digital products.',
  },
  {
    number: '03',
    title: 'Digital Media & Design',
    description:
      'Executing professional video editing, brand identity creation, and high-CTR thumbnail design to create cohesive and high-impact digital experiences.',
  },
];

const ServicesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-66.66%']);

  return (
    <section id="services" ref={containerRef} className="relative h-[300vh] bg-[#05050A]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden border-t border-white/5 pt-12">
        <FadeIn y={30} className="w-full max-w-screen-2xl mx-auto px-6 md:px-12 mb-12">
          <h2 className="font-clash text-5xl sm:text-7xl md:text-[8rem] font-semibold text-white tracking-tighter uppercase leading-[0.8]">
            Services.
          </h2>
        </FadeIn>

        <div className="w-full overflow-hidden">
          <motion.div 
            style={{ x }} 
            className="flex w-[300vw] h-full items-center"
          >
            {SERVICES.map((service, index) => (
              <div key={service.number} className="w-[100vw] px-6 md:px-12 flex-shrink-0 flex items-center justify-center">
                <div className="max-w-4xl w-full flex flex-col md:flex-row gap-8 md:gap-16 items-start md:items-center">
                  <span className="font-clash font-bold text-[6rem] md:text-[12rem] leading-none text-white/5 tracking-tighter">
                    {service.number}
                  </span>
                  <div className="flex flex-col gap-6">
                    <h3 className="font-clash text-3xl sm:text-5xl md:text-6xl font-semibold text-white uppercase tracking-tight leading-[0.9]">
                      {service.title}
                    </h3>
                    <p className="text-base sm:text-lg md:text-xl text-[#D7E2EA]/60 font-light leading-relaxed max-w-xl">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
