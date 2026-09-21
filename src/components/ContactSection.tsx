import { Mail, Linkedin, Github, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
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
    value: 'in/abhigyan-saikia',
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
      className="relative w-full bg-[#05050A] pt-40 md:pt-56 pb-12 overflow-hidden flex flex-col"
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <div className="absolute bottom-[-20%] left-[20%] w-[50vw] h-[50vw] bg-primary/20 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 md:px-12 flex flex-col items-center">
        {/* Massive Closing Typography */}
        <FadeIn y={30} className="w-full text-center flex flex-col items-center">
          <h2 className="font-clash text-5xl sm:text-7xl md:text-[8rem] lg:text-[11rem] font-semibold text-white tracking-tighter leading-[0.8] uppercase mb-8">
            HAVE AN IDEA<br />WORTH BUILDING?
          </h2>
          <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.3em] text-[#D7E2EA]/60 max-w-2xl leading-relaxed mt-4">
            Good design gets noticed. Great design gets remembered. Let's create something people remember.
          </p>
        </FadeIn>

        {/* Contact Links (Magnetic style) */}
        <div className="mt-24 md:mt-40 flex flex-col md:flex-row gap-6 md:gap-12 w-full justify-center">
          {CONTACT_METHODS.map((method, i) => {
            const Icon = method.icon;
            const isExternal = method.href.startsWith('http');

            return (
              <FadeIn key={method.label} delay={i * 0.1} y={20}>
                <motion.a
                  href={method.href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  whileHover={{ scale: 0.96 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="group relative flex items-center gap-6 rounded-full border border-white/10 bg-white/[0.02] px-8 py-5 transition-colors hover:bg-white/[0.05] hover:border-white/20"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-white/5 group-hover:bg-primary/20 group-hover:border-primary/40 transition-colors">
                    <Icon className="text-secondary/80 group-hover:text-primary transition-colors" size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D7E2EA]/40 group-hover:text-[#D7E2EA]/60 transition-colors">
                      {method.label}
                    </span>
                    <span className="font-clash text-xl font-semibold tracking-wide text-white">
                      {method.value}
                    </span>
                  </div>
                  <ArrowUpRight className="ml-4 text-white/20 group-hover:text-white transition-colors group-hover:rotate-45" size={24} />
                </motion.a>
              </FadeIn>
            );
          })}
        </div>
      </div>

      {/* Footer Line */}
      <FadeIn delay={0.4} y={20} className="w-full">
        <div className="relative z-10 mx-auto mt-40 md:mt-56 max-w-screen-2xl flex flex-col sm:flex-row justify-between items-center gap-4 px-6 md:px-12 border-t border-white/5 pt-8">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D7E2EA]/40">
            © 2026 Abhigyan Saikia
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D7E2EA]/40">
            All rights reserved
          </span>
        </div>
      </FadeIn>
    </section>
  );
};

export default ContactSection;
