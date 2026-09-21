import { motion } from 'framer-motion';
import { Code2, Video, PenTool, LayoutTemplate } from 'lucide-react';
import FadeIn from './FadeIn';

const CARDS = [
  {
    title: 'Developer',
    description: 'Architecting scalable, full-stack digital products.',
    icon: Code2,
    delay: 0.1,
  },
  {
    title: 'Video Editor',
    description: 'Crafting cinematic, high-retention content.',
    icon: Video,
    delay: 0.2,
  },
  {
    title: 'Brand Designer',
    description: 'Building cohesive, impossible-to-ignore identities.',
    icon: PenTool,
    delay: 0.3,
  },
  {
    title: 'Product Builder',
    description: 'Taking ideas from zero to a live, polished launch.',
    icon: LayoutTemplate,
    delay: 0.4,
  },
];

const ExpertiseCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 w-full max-w-7xl mx-auto px-6 md:px-12 z-10 relative">
      {CARDS.map((card, index) => {
        const Icon = card.icon;
        return (
          <FadeIn key={index} delay={card.delay} y={40} className="h-full">
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group relative flex flex-col items-start justify-between h-full p-8 sm:p-10 rounded-2xl sm:rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-500 hover:bg-[#0A0A0F] overflow-hidden shadow-sm hover:shadow-2xl"
            >
              {/* Subtle animated background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-cinematic" />
              
              <div className="relative z-10 flex flex-col gap-6">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 group-hover:bg-primary/20 group-hover:border-primary/30 transition-colors duration-500 w-fit shadow-inner">
                  <Icon className="text-secondary/80 group-hover:text-primary transition-colors duration-500" size={28} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-[#D7E2EA]/60 text-sm sm:text-base font-light leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </FadeIn>
        );
      })}
    </div>
  );
};

export default ExpertiseCards;
