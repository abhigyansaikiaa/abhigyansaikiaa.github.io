import React from 'react';

const PROJECTS = [
  {
    number: '01',
    name: 'ToolKB.in',
    category: 'Web Tool',
    description: 'A client-side web utility for compressing, resizing, cropping, and converting images entirely within the browser for privacy and speed.',
    liveUrl: 'https://toolkb.in/',
    image: '/assets/toolkb.png',
  },
  {
    number: '02',
    name: 'Arogya Relief',
    category: 'Healthcare Platform',
    description: 'A disaster healthcare coordination platform helping people find emergency resources and information.',
    liveUrl: 'https://www.arogyarelief.in/',
    image: '/assets/arogyarelief.png',
  },
  {
    number: '03',
    name: 'Motion Subtitle Studio',
    category: 'Creator Tool',
    description: 'Browser-based caption generation tool for short-form video creators with auto transcription and styling.',
    liveUrl: '#',
    image: '/assets/motionsubtitles.png',
  },
  {
    number: '04',
    name: 'Brandcey',
    category: 'Marketplace',
    description: 'Freelancer-client marketplace making hiring and project management easier with verified workflows.',
    liveUrl: 'https://www.brandcey.in/',
    image: '/assets/brandcey.png',
  },
  {
    number: '05',
    name: 'Qrivna',
    category: 'Web App',
    description: '',
    liveUrl: '#',
    image: '/qrivna_demo_pro.png',
  },
  {
    number: '06',
    name: 'BrollWriter',
    category: 'SaaS',
    description: '',
    liveUrl: '#',
    image: '/brollwriter_demo_pro.png',
  },
  {
    number: '07',
    name: 'Dhankathaa',
    category: 'Analytics',
    description: '',
    liveUrl: '#',
    image: '/dhankathaa_demo_pro.png',
  },
  {
    number: '08',
    name: 'GCMR.IN',
    category: 'Platform',
    description: '',
    liveUrl: '#',
    image: 'none',
  },
  {
    number: '09',
    name: 'ESR Analyzer',
    category: 'Hardware/CV',
    description: '',
    liveUrl: '#',
    image: 'none',
  },
  {
    number: '10',
    name: 'Revenue Command Center',
    category: 'Automation',
    description: '',
    liveUrl: '#',
    image: 'none',
  },
  {
    number: '11',
    name: 'Vibe-Code Website Bug Tester',
    category: 'Dev Tool',
    description: '',
    liveUrl: '#',
    image: 'none',
  },
  {
    number: '12',
    name: 'Orchids',
    category: 'Web App',
    description: '',
    liveUrl: '#',
    image: 'none',
  },
  {
    number: '13',
    name: 'TheTapeChart',
    category: 'Web Dev',
    description: '',
    liveUrl: '#',
    image: 'none',
  }
];


const ProjectsSection = () => {
  return (
    <section id="projects" className="relative w-full bg-[var(--bg-light)] text-[var(--text-dark)] pb-32">
      
      <div className="flex flex-col lg:flex-row w-full max-w-[1600px] mx-auto px-6 md:px-12 pt-32">
        
        {/* Sticky Left Sidebar (Unifex Style) */}
        <div className="w-full lg:w-1/3 mb-16 lg:mb-0 relative">
          <div className="lg:sticky lg:top-40 flex flex-col gap-6">
            <h2 className="font-clash font-bold text-7xl md:text-[8vw] lg:text-[7vw] leading-[0.8] tracking-tighter uppercase">
              WORK.
            </h2>
            <p className="font-satoshi text-sm md:text-base text-[#666] max-w-sm">
              A selection of recent projects focusing on robust technical architecture and polished user interfaces.
            </p>
          </div>
        </div>

        {/* Scrollable Right Project Cards */}
        <div className="w-full lg:w-2/3 flex flex-col gap-12 md:gap-24">
          {PROJECTS.map((project) => (
            <div key={project.number} className="w-full group">
              <div className="w-full aspect-[4/3] md:aspect-video rounded-[32px] overflow-hidden bg-[#121212] mb-6 relative">
                {project.image !== 'none' ? (
                  <img 
                    src={project.image} 
                    alt={project.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center p-8 text-center bg-[#1A1A1A] group-hover:bg-[#222] transition-colors duration-500">
                    <span className="font-clash text-[4vw] md:text-[3vw] text-white/10 uppercase tracking-tighter leading-none">
                      {project.name}
                    </span>
                  </div>
                )}
                
                {/* Overlay Metadata */}
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                  <div className="bg-white text-black px-4 py-2 rounded-full font-satoshi text-xs font-bold tracking-[0.1em] uppercase shadow-lg">
                    {project.category}
                  </div>
                  {project.liveUrl !== '#' && (
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-cyan-400 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2 px-2">
                <div className="flex items-center gap-4">
                  <span className="font-clash font-bold text-2xl text-cyan-500">{project.number}</span>
                  <h3 className="font-clash font-bold text-3xl md:text-5xl uppercase tracking-tighter">{project.name}</h3>
                </div>
                <p className="font-satoshi text-sm text-[#666] max-w-xl pl-11">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
