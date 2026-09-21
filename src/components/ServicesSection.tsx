import React from 'react';

const SERVICES = [
  {
    num: '01',
    title: 'FULL STACK',
    desc: 'End-to-end development bridging robust backend architecture with seamless user experiences.',
    color: 'bg-purple-500'
  },
  {
    num: '02',
    title: 'WEB APP',
    desc: 'Building high-performance, client-heavy web applications optimized for speed and scale.',
    color: 'bg-cyan-400'
  },
  {
    num: '03',
    title: 'PRODUCT',
    desc: 'Taking ideas from zero to one with strong product strategy and user-centric design.',
    color: 'bg-orange-400'
  },
  {
    num: '04',
    title: 'AUTOMATION',
    desc: 'Streamlining workflows and data processing through custom scripts and internal tooling.',
    color: 'bg-emerald-400'
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="relative w-full bg-[#121212] pt-32 pb-32 md:pb-48 rounded-t-[40px] md:rounded-t-[80px] -mt-10 z-20 overflow-hidden">
      
      <div className="w-full max-w-screen-2xl mx-auto px-6 md:px-12 mb-20 flex justify-between items-end">
        <h2 className="font-clash font-bold text-[10vw] md:text-[8vw] text-white uppercase tracking-tighter leading-[0.8] m-0">
          EXPERTISE.
        </h2>
        <div className="hidden md:block w-1/3">
          <p className="font-satoshi text-sm text-white/50 leading-relaxed">
            Delivering complete digital solutions from system architecture to polished user interfaces.
          </p>
        </div>
      </div>

      <div className="w-full max-w-screen-2xl mx-auto px-6 md:px-12 flex flex-col gap-6">
        {SERVICES.map((service) => (
          <div 
            key={service.num} 
            className="group relative w-full border border-white/10 rounded-[32px] md:stadium-border p-6 md:p-12 lg:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 hover:bg-white/[0.03] transition-colors duration-500"
          >
            {/* Left: Number & Title */}
            <div className="flex items-center gap-6 md:gap-12 w-full md:w-1/2">
              <span className="font-satoshi font-bold text-lg md:text-2xl text-cyan-400">
                {service.num}
              </span>
              <h3 className="font-clash font-bold text-4xl md:text-5xl lg:text-7xl text-white uppercase tracking-tighter">
                {service.title}
              </h3>
            </div>
            
            {/* Right: Desc & Capsule visual */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8 w-full md:w-1/2 justify-end">
              <p className="font-satoshi text-sm text-white/60 max-w-xs md:text-right">
                {service.desc}
              </p>
              
              {/* Unifex Stadium Visual Element */}
              <div className="hidden md:flex items-center justify-center w-[120px] h-[60px] stadium-border overflow-hidden bg-[#1A1A1A] border border-white/10">
                {/* Abstract shape representing the service */}
                <div className={`w-8 h-8 rounded-full ${service.color} opacity-80 group-hover:scale-150 transition-transform duration-700 blur-sm`} />
              </div>
            </div>
          </div>
        ))}
      </div>
      
    </section>
  );
};

export default ServicesSection;
