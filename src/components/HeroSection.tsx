import FadeIn from './FadeIn';
import Magnet from './Magnet';
import ContactButton from './ContactButton';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const HeroSection = () => {
  return (
    <section
      className="relative flex h-screen w-full flex-col"
      style={{ overflowX: 'clip' }}
    >
      {/* Navbar */}
      <FadeIn delay={0} y={-20} as="nav" className="relative z-20">
        <ul className="flex w-full items-center justify-between px-6 md:px-10 pt-6 md:pt-8">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-sm md:text-lg lg:text-[1.4rem] font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </FadeIn>

          {/* Massive Heading */}
                <div className="relative z-0 mt-6 sm:mt-4 md:-mt-5 w-full overflow-hidden px-2 sm:px-4 md:px-6">
                  <FadeIn delay={0.15} y={40}>
                    <h1
          className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[13vw] sm:text-[13.5vw] md:text-[14.5vw] lg:text-[15.5vw]"
                    >
                      Hi, i&apos;m harsh
                    </h1>
                  </FadeIn>
                </div>

          {/* Portrait - magnetic; centered+smaller on mobile, large centered-bottom on desktop */}
                <FadeIn
                  delay={0.6}
                  y={30}
                  className="pointer-events-none absolute z-10 left-1/2 -translate-x-1/2 bottom-24 sm:bottom-0 w-[220px] sm:w-[360px] md:w-[440px] lg:w-[520px]"
                >
        <div className="pointer-events-auto">
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
          >
            <img
              src="/harsh.png"
              alt="Harsh Goyal — developer and designer"
              className="w-full h-auto select-none"
              draggable={false}
            />
          </Magnet>
        </div>
      </FadeIn>

          {/* Mobile-only big tagline filling the empty space */}
                <FadeIn delay={0.35} y={20} className="block sm:hidden relative z-20 px-6 pt-8">
                  <p
                    className="font-light uppercase tracking-wide leading-tight text-[#D7E2EA]/85"
                    style={{ fontSize: 'clamp(1.5rem, 7vw, 2.5rem)' }}
                  >
                    a developer and designer driven by crafting striking and unforgettable projects
                  </p>
                </FadeIn>

                {/* Bottom bar — desktop tagline + contact button */}
                <div className="relative z-20 mt-auto flex w-full items-end justify-between px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 gap-4">
                  <FadeIn delay={0.35} y={20} className="hidden sm:block">
                    <p
                      className="font-light uppercase tracking-wide leading-snug text-[#D7E2EA] max-w-[280px] sm:max-w-[360px] md:max-w-[440px]"
                      style={{ fontSize: 'clamp(0.75rem, 1.1vw, 1.15rem)' }}
                    >
                      a developer and designer driven by crafting striking and unforgettable projects
                    </p>
                  </FadeIn>

                  <FadeIn delay={0.5} y={20} className="ml-auto">
                    <ContactButton />
                  </FadeIn>
                </div>
    </section>
  );
};

export default HeroSection;
