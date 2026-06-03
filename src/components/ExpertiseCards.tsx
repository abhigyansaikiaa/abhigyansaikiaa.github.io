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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full max-w-7xl mx-auto px-4 sm:px-6 z-10 relative">
      {CARDS.map((card, index) => {
        const Icon = card.icon;
        return (
          <FadeIn key={index} delay={card.delay} y={30} className="h-full">
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group relative flex flex-col items-start justify-between h-full p-6 sm:p-8 rounded-3xl bg-[#0A0A0F]/60 backdrop-blur-xl border border-primary/10 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_-5px_rgba(0,255,255,0.2)] overflow-hidden"
            >
              {/* Subtle animated background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex flex-col gap-4">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-primary/10 group-hover:border-primary/30 transition-colors duration-500 w-fit">
                  <Icon className="text-secondary group-hover:text-primary transition-colors duration-500" size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-[#D7E2EA]/60 text-sm leading-relaxed">
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
