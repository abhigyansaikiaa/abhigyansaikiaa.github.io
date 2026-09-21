import { Mail, MessageCircle, Linkedin, Github, ArrowUpRight } from 'lucide-react';
import FadeIn from './FadeIn';

interface ContactMethod {
  icon: typeof Mail;
  label: string;
  value: string;
  href: string;
}

const CONTACT_METHODS: ContactMethod[] = [
  {
    icon: Mail,
    label: 'Email',
    value: 'abhigyannsaikia@gmail.com',
    href: 'mailto:abhigyannsaikia@gmail.com',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'in/abhigyan-saikia-26641227b',
    href: 'https://www.linkedin.com/in/abhigyan-saikia-26641227b',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: '@abhigyansaikiaa',
    href: 'https://github.com/abhigyansaikiaa',
  },
];

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="relative w-full bg-[#05050A] px-6 md:px-12 pt-32 md:pt-40 pb-20 md:pb-24 border-t border-white/[0.02]"
    >
      {/* Heading */}
      <FadeIn y={40}>
        <h2
          className="hero-heading text-center font-black uppercase tracking-tighter leading-[0.9] mb-8"
          style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)' }}
        >
          Have an idea<br/>worth building?
        </h2>
      </FadeIn>

      <FadeIn delay={0.15} y={20}>
        <p
          className="text-center font-light uppercase tracking-[0.3em] text-[#D7E2EA]/50 mb-16 md:mb-24 max-w-2xl mx-auto"
          style={{ fontSize: 'clamp(0.75rem, 1.2vw, 1rem)' }}
        >
          Good design gets noticed. Great design gets remembered. Let's create something people remember.
        </p>
      </FadeIn>

      {/* Contact cards */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {CONTACT_METHODS.map((method, i) => {
          const Icon = method.icon;
          const isExternal = method.href.startsWith('http');

          return (
            <FadeIn key={method.label} delay={i * 0.1} y={40}>
              <a
                href={method.href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className="group relative flex h-full flex-col justify-between gap-12 rounded-2xl sm:rounded-[2rem] border border-white/5 bg-white/[0.02] p-8 sm:p-10 transition-all duration-700 ease-cinematic hover:border-white/10 hover:bg-[#0A0A0F] hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* Subtle animated background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-cinematic pointer-events-none rounded-2xl sm:rounded-[2rem]" />

                <div className="relative z-10 flex items-start justify-between">
                  <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4 transition-colors duration-500 ease-cinematic group-hover:border-primary/30 group-hover:bg-primary/10 shadow-inner">
                    <Icon
                      className="text-secondary/80 transition-colors duration-500 group-hover:text-primary"
                      size={24}
                      strokeWidth={1.5}
                    />
                  </div>
                  <ArrowUpRight
                    className="text-[#D7E2EA]/30 transition-all duration-500 ease-cinematic group-hover:text-white group-hover:rotate-45"
                    size={24}
                    strokeWidth={1.5}
                  />
                </div>

                <div className="relative z-10 flex flex-col gap-3">
                  <span
                    className="font-medium uppercase tracking-[0.2em] text-secondary/60 text-[10px] sm:text-xs"
                  >
                    {method.label}
                  </span>
                  <span
                    className="font-bold text-white tracking-tight break-all text-xl sm:text-2xl"
                  >
                    {method.value}
                  </span>
                </div>
              </a>
            </FadeIn>
          );
        })}
      </div>

      {/* Footer line */}
      <FadeIn delay={0.4} y={20}>
        <div className="mx-auto mt-24 md:mt-32 flex max-w-6xl flex-col items-center gap-4 border-t border-white/5 pt-10 text-center sm:flex-row sm:justify-between px-4">
          <span
            className="font-medium uppercase tracking-[0.2em] text-[#D7E2EA]/40 text-[10px]"
          >
            © 2026 Abhigyan Saikia
          </span>
          <span
            className="font-medium uppercase tracking-[0.2em] text-[#D7E2EA]/40 text-[10px]"
          >
            All rights reserved
          </span>
        </div>
      </FadeIn>
    </section>
  );
};

export default ContactSection;
