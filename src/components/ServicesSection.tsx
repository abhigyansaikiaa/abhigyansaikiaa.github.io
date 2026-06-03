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
  return (
    <section
      id="services"
      className="relative w-full bg-[#08080C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <FadeIn y={40}>
        <h2
          className="hero-heading text-center font-black uppercase mb-16 sm:mb-20 md:mb-28 leading-none"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Services
        </h2>
      </FadeIn>

      <div className="mx-auto max-w-5xl">
        {SERVICES.map((service, i) => (
          <FadeIn key={service.number} delay={i * 0.1} y={30}>
            <div
              className="flex flex-row items-start gap-6 sm:gap-10 md:gap-14 py-8 sm:py-10 md:py-12 transition-all duration-300 hover:bg-[#12121A] rounded-2xl px-4"
              style={{
                borderTop: '1px solid rgba(138, 43, 226, 0.2)',
                ...(i === SERVICES.length - 1
                  ? { borderBottom: '1px solid rgba(138, 43, 226, 0.2)' }
                  : {}),
              }}
            >
              <div
                className="shrink-0 font-black text-primary/80 leading-none"
                style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
              >
                {service.number}
              </div>

              <div className="group flex flex-col gap-3 sm:gap-4 md:gap-5 pt-2 sm:pt-3 md:pt-4">
                <h3
                  className="font-medium uppercase text-white leading-tight relative inline-block w-fit group-hover:text-secondary transition-colors"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {service.title}
                  <span className="absolute left-0 -bottom-1 h-px w-0 bg-secondary transition-all duration-500 group-hover:w-full shadow-[0_0_10px_rgba(0,255,255,0.8)]" />
                </h3>
                <p
                  className="font-light leading-relaxed text-[#D7E2EA] max-w-2xl"
                  style={{
                    fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)',
                    opacity: 0.7,
                  }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
