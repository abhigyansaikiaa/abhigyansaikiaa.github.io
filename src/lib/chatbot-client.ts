/**
 * AskiDesk Portfolio Client Adapter & Grounded Conversational Engine
 *
 * Provides a grounded, highly responsive portfolio assistant for Abhigyan Saikia.
 * Strictly adheres to verified facts regarding background, projects, skills, and contact methods.
 *
 * Supports:
 * - Live AskiDesk backend integration (when active at VITE_CHATBOT_API_URL or http://localhost:3000/api/chat)
 * - Zero-latency grounded fallback engine with multi-turn context awareness
 * - Intent classification and confidence scoring
 * - Pronoun & follow-up reference resolution (e.g., "tell me more about the first one")
 * - Dynamic suggested follow-up chips
 * - Input sanitization and length capping
 */

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  intent?: string;
  isStreaming?: boolean;
}

export interface ChatResponse {
  reply: string;
  intent: string;
  confidence: number;
  detectedLanguage: string;
  isLiveServer: boolean;
  suggestedFollowUps: string[];
}

// ============================================================================
// VERIFIED GROUNDED KNOWLEDGE BASE — ABHIGYAN SAIKIA
// ============================================================================

export const GROUNDED_KNOWLEDGE = {
  identity: {
    name: 'Abhigyan Saikia',
    role: 'Full-Stack Creative Web Developer & Product Architect',
    location: 'Assam, India',
    education:
      'Currently pursuing a Bachelor of Medical Laboratory Science (BSc MLT) at the Regional Institute of Paramedical and Nursing Sciences (RIPANS).',
    disciplineConnection:
      'His training in medical laboratory science instills a clinical engineering discipline: systematic diagnostic debugging, strict edge-case handling, data integrity, and high reliability.',
  },

  projects: {
    deadModelCheck: {
      name: 'Dead Model Check',
      url: '/dead-model-check/',
      tagline: 'Client-Side AI Model Deprecation & Shutdown Scanner',
      description:
        'A browser-native scanner that detects deprecated OpenAI, Anthropic, and Google AI model IDs in code and configuration files before breaking production outages. Runs 100% locally with zero external network requests.',
      architecture:
        'Client-side text parsing with strict Content Security Policy, zero external telemetry, and offline safety.',
      stack: ['HTML5', 'Vanilla JavaScript', 'Strict CSP'],
    },
    toolkb: {
      name: 'ToolKB',
      url: 'https://toolkb.in',
      tagline: 'Zero-Latency Client-Side Developer Utilities',
      description:
        'A high-speed suite of browser-native developer tools including instant code converters, JSON/CSS formatters, cryptographic hash calculators (SHA/MD5), JWT decoders, and regex testers.',
      architecture:
        'Engineered to run 100% in the visitor’s browser using Web Crypto API and modern client workers. No data is sent to external servers, guaranteeing zero latency and absolute data privacy.',
      stack: ['React', 'TypeScript', 'Tailwind CSS', 'Web Crypto API', 'Vite'],
    },
    arogya: {
      name: 'Arogya Relief',
      tagline: 'Emergency Healthcare Logistics & Disaster Clinic Triage',
      description:
        'A crisis logistics platform designed to track distributed emergency medicine inventory, blood availability, and rapid patient acuity triage across temporary relief clinics during health emergencies.',
      architecture:
        'Built with offline-first local synchronization, high-contrast disaster UI, and emergency triage workflows informed by Abhigyan’s medical laboratory training at RIPANS.',
      stack: ['React', 'TypeScript', 'Node.js', 'Express', 'SQLite/PostgreSQL', 'Tailwind CSS'],
    },
    motion: {
      name: 'Motion Subtitle Studio',
      tagline: 'Browser-Native Audio Waveform Transcription & Kinetic Subtitles',
      description:
        'A browser-based creative tool that visualizes audio waveforms in real time and renders frame-accurate, kinetic animated subtitles.',
      architecture:
        'Leverages the HTML5 Canvas API and Web Audio API for hardware-accelerated 60 FPS animation and waveform processing without heavy server rendering.',
      stack: ['React', 'TypeScript', 'HTML5 Canvas API', 'Web Audio API', 'CSS 3D Motion'],
    },
    brandcey: {
      name: 'Brandcey',
      tagline: 'B2B Creative Token Exchange & Vetted Talent Marketplace',
      description:
        'A specialized platform connecting creative agencies with verified design talent, featuring milestone escrow guarantees and automated deliverables tracking.',
      architecture:
        'Features multi-tenant organization workspaces, verifiable milestone progression, and tamper-resistant project escrow workflows.',
      stack: ['Next.js (App Router)', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Prisma'],
    },
    portfolio: {
      name: 'Portfolio 2026',
      tagline: 'High-Craft Interactive Developer Portfolio',
      description:
        'Abhigyan’s modernized production portfolio featuring an interactive waving hero experience, custom 3D-feel Ferris wheel project showcase, dark editorial typography, and Lenis smooth scrolling.',
      architecture:
        'Built with React 19, TypeScript, Vite, Tailwind CSS, Lenis, and zero bloated third-party widget dependencies.',
      stack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Vite', 'Lenis', 'Vitest'],
    },
  },

  skills: {
    frontend: ['React 19', 'Next.js (App Router)', 'TypeScript', 'Tailwind CSS', 'HTML5 Canvas', 'Web Audio API', 'Framer Motion', 'Lenis'],
    backend: ['Node.js', 'Express', 'Python', 'RESTful API Engineering', 'Microservices', 'Web Workers'],
    databases: ['PostgreSQL', 'SQLite', 'Prisma ORM', 'Redis caching'],
    practices: ['Diagnostic Debugging', 'Zero-Latency Client Computation', 'Responsive Systems', 'Accessibility (WCAG AA)', 'Vitest Unit Testing'],
  },

  philosophy:
    'Abhigyan builds with a methodical philosophy: prioritize client-side execution to eliminate unnecessary server latency and protect privacy; treat edge cases and error states with clinical precision; and craft interfaces with distinctive, typography-driven editorial design rather than generic templates.',

  collaboration: {
    status: 'Open for freelance development contracts, bespoke web applications, and technical product engineering collaborations.',
    services: [
      'Full-stack web application development (React / Next.js / TypeScript)',
      'High-performance frontend architecture and interactive experiences',
      'Browser-based developer tools and zero-latency utilities',
      'Performance audits, UI optimization, and code modernization',
    ],
    pricing:
      'Abhigyan evaluates projects on a milestone or scope basis rather than arbitrary flat rates. For custom estimates, please provide project scope and timeline via hello@abhigyansaikia.in.',
  },

  contact: {
    email: 'hello@abhigyansaikia.in',
    github: 'https://github.com/abhigyansaikiaa',
    linkedin: 'https://www.linkedin.com/in/abhigyan-saikia-26641227b/',
    location: 'Assam, India (collaborates globally via remote workflows)',
  },
};

// ============================================================================
// CONTEXT & TOPIC RESOLVER
// ============================================================================

type TopicSubject = 'toolkb' | 'arogya' | 'motion' | 'brandcey' | 'portfolio' | 'skills' | 'about' | 'contact' | 'collaboration' | 'general';

function detectSubjectFromHistory(history?: ChatMessage[]): TopicSubject {
  if (!history || history.length === 0) return 'general';

  // Traverse recent assistant and user messages backwards
  for (let i = history.length - 1; i >= 0; i--) {
    const text = history[i].text.toLowerCase();
    const intent = history[i].intent || '';

    if (text.includes('toolkb') || intent.includes('toolkb')) return 'toolkb';
    if (text.includes('arogya') || text.includes('relief') || intent.includes('arogya')) return 'arogya';
    if (text.includes('motion') || text.includes('subtitle') || intent.includes('motion')) return 'motion';
    if (text.includes('brandcey') || intent.includes('brandcey')) return 'brandcey';
    if (text.includes('stack') || text.includes('skill') || intent.includes('skills')) return 'skills';
    if (text.includes('contact') || text.includes('email') || intent.includes('contact')) return 'contact';
    if (text.includes('collab') || text.includes('hire') || text.includes('work together')) return 'collaboration';
    if (text.includes('about') || text.includes('who is') || text.includes('ripans')) return 'about';
  }

  return 'general';
}

// ============================================================================
// LOCAL GROUNDED ENGINE IMPLEMENTATION
// ============================================================================

export function processGroundedQuery(query: string, history?: ChatMessage[]): ChatResponse {
  // Input sanitization
  const clean = query
    .slice(0, 500)
    .replace(/<[^>]*>/g, '') // remove HTML tags
    .trim();

  const lower = clean.toLowerCase();
  const contextSubject = detectSubjectFromHistory(history);

  // Check for pronoun / ordinal follow-ups: "the first one", "the second one", "it", "tell me more"
  const isOrdinalFirst = lower.includes('first one') || lower.includes('1st one') || lower.includes('#1');
  const isOrdinalSecond = lower.includes('second one') || lower.includes('2nd one') || lower.includes('#2');
  const isOrdinalThird = lower.includes('third one') || lower.includes('3rd one') || lower.includes('#3');
  const isOrdinalFourth = lower.includes('fourth one') || lower.includes('4th one') || lower.includes('#4');
  const hasOrdinal = isOrdinalFirst || isOrdinalSecond || isOrdinalThird || isOrdinalFourth;

  const isDeepDiveFollowUp =
    !hasOrdinal &&
    (lower.includes('tell me more') ||
      lower.includes('how does it work') ||
      lower.includes('how was it built') ||
      lower.includes('what stack') ||
      lower.includes('what technologies') ||
      lower.includes('more details') ||
      lower.includes('explain it'));

  // 1. PROJECT SPECIFIC: TOOLKB
  if (
    lower.includes('toolkb') ||
    isOrdinalFirst ||
    (isDeepDiveFollowUp && contextSubject === 'toolkb')
  ) {
    const p = GROUNDED_KNOWLEDGE.projects.toolkb;
    return {
      reply: `**${p.name}** — ${p.tagline}\n\n${p.description}\n\n- **Architecture**: ${p.architecture}\n- **Core Tech**: ${p.stack.join(', ')}\n- **Live Website**: [${p.url}](${p.url})\n\nWould you like to explore another project like **Arogya Relief** or inspect Abhigyan's verified tech stack?`,
      intent: 'project_inquiry_toolkb',
      confidence: 0.98,
      detectedLanguage: 'en',
      isLiveServer: false,
      suggestedFollowUps: ['Tell me about Arogya Relief', 'What technologies does he work with?', 'Can we work together?'],
    };
  }

  // 2. PROJECT SPECIFIC: AROGYA RELIEF
  if (
    lower.includes('arogya') ||
    lower.includes('relief') ||
    isOrdinalSecond ||
    (isDeepDiveFollowUp && contextSubject === 'arogya')
  ) {
    const p = GROUNDED_KNOWLEDGE.projects.arogya;
    return {
      reply: `**${p.name}** — ${p.tagline}\n\n${p.description}\n\n- **Engineering Focus**: ${p.architecture}\n- **Verified Stack**: ${p.stack.join(', ')}\n- **Clinical Insight**: Designed with direct domain insights from Abhigyan's medical laboratory science training at RIPANS.`,
      intent: 'project_inquiry_arogya',
      confidence: 0.98,
      detectedLanguage: 'en',
      isLiveServer: false,
      suggestedFollowUps: ['How does his medical background help?', 'Tell me about Motion Subtitle Studio', 'Can we work together?'],
    };
  }

  // 3. PROJECT SPECIFIC: MOTION SUBTITLE STUDIO
  if (
    lower.includes('motion subtitle') ||
    lower.includes('subtitle studio') ||
    lower.includes('waveform') ||
    isOrdinalThird ||
    (isDeepDiveFollowUp && contextSubject === 'motion')
  ) {
    const p = GROUNDED_KNOWLEDGE.projects.motion;
    return {
      reply: `**${p.name}** — ${p.tagline}\n\n${p.description}\n\n- **Performance**: ${p.architecture}\n- **Tech Stack**: ${p.stack.join(', ')}`,
      intent: 'project_inquiry_motion',
      confidence: 0.98,
      detectedLanguage: 'en',
      isLiveServer: false,
      suggestedFollowUps: ['Tell me about Brandcey', 'What technologies does he work with?', 'How can I contact Abhigyan?'],
    };
  }

  // 4. PROJECT SPECIFIC: BRANDCEY
  if (
    lower.includes('brandcey') ||
    lower.includes('escrow') ||
    isOrdinalFourth ||
    (isDeepDiveFollowUp && contextSubject === 'brandcey')
  ) {
    const p = GROUNDED_KNOWLEDGE.projects.brandcey;
    return {
      reply: `**${p.name}** — ${p.tagline}\n\n${p.description}\n\n- **Key Features**: ${p.architecture}\n- **Stack**: ${p.stack.join(', ')}`,
      intent: 'project_inquiry_brandcey',
      confidence: 0.98,
      detectedLanguage: 'en',
      isLiveServer: false,
      suggestedFollowUps: ['Tell me about ToolKB', 'Show me some projects', 'Can we work together?'],
    };
  }

  // 5. PROJECTS OVERVIEW
  if (
    lower.includes('projects') ||
    lower.includes('portfolio work') ||
    lower.includes('what has he built') ||
    lower.includes('show me projects') ||
    lower.includes('show some projects') ||
    lower.includes('show projects') ||
    lower.includes('work showcase')
  ) {
    return {
      reply: `Here are Abhigyan's verified featured engineering projects:\n\n1. **[ToolKB.in](https://toolkb.in)**: Zero-latency client-side developer utility platform (formatters, converters, crypto).\n2. **Arogya Relief**: Emergency healthcare logistics and triage system for disaster relief clinics.\n3. **Motion Subtitle Studio**: Hardware-accelerated browser audio waveform transcription and kinetic subtitles.\n4. **Brandcey**: B2B design token exchange and talent marketplace with milestone escrow.\n5. **Portfolio 2026**: Modernized React 19 portfolio with interactive waving hero and Ferris wheel showcase.\n\nWhich project would you like to explore in detail?`,
      intent: 'projects_overview',
      confidence: 0.98,
      detectedLanguage: 'en',
      isLiveServer: false,
      suggestedFollowUps: ['Tell me about ToolKB', 'Tell me about Arogya Relief', 'What technologies does he work with?'],
    };
  }

  // 6. TECH STACK & SKILLS
  if (
    lower.includes('technologies') ||
    lower.includes('tech stack') ||
    lower.includes('skills') ||
    lower.includes('languages') ||
    lower.includes('frameworks') ||
    (isDeepDiveFollowUp && contextSubject === 'skills')
  ) {
    const s = GROUNDED_KNOWLEDGE.skills;
    return {
      reply: `Abhigyan's verified technology stack covers modern full-stack development and creative engineering:\n\n- **Frontend**: ${s.frontend.join(', ')}\n- **Backend & APIs**: ${s.backend.join(', ')}\n- **Databases & Storage**: ${s.databases.join(', ')}\n- **Engineering Discipline**: ${s.practices.join(', ')}\n\nHe specializes in building zero-latency client-side tools and responsive, accessible web applications.`,
      intent: 'skills_inquiry',
      confidence: 0.97,
      detectedLanguage: 'en',
      isLiveServer: false,
      suggestedFollowUps: ['How does he approach web development?', 'Show me some projects', 'Can we work together?'],
    };
  }

  // 7. APPROACH TO BUILDING WEBSITES / PHILOSOPHY
  if (
    lower.includes('approach') ||
    lower.includes('philosophy') ||
    lower.includes('how does he build') ||
    lower.includes('how he works') ||
    lower.includes('development process')
  ) {
    return {
      reply: `Abhigyan's approach to web development combines **medical-grade precision** with **modern frontend craft**:\n\n1. **Methodical Rigor**: His training at RIPANS shapes how he writes code—treating bugs and edge cases like clinical diagnostics that must be isolated and resolved at the root.\n2. **Client-Side Performance**: Prioritizes local, browser-native computation (such as in ToolKB) to eliminate unnecessary roundtrips and preserve user privacy.\n3. **Restrained Editorial Design**: Creates typography-driven, fluid interfaces that respect user focus without relying on bloated generic templates.\n4. **Resilient Production Code**: Uses strict TypeScript, responsive layouts, and thorough automated testing.`,
      intent: 'engineering_philosophy',
      confidence: 0.97,
      detectedLanguage: 'en',
      isLiveServer: false,
      suggestedFollowUps: ['Show me some projects', 'What technologies does he work with?', 'Can we work together?'],
    };
  }

  // 8. ABOUT ABHIGYAN / BACKGROUND / EDUCATION / RIPANS
  if (
    lower.includes('who is abhigyan') ||
    lower.includes('tell me about abhigyan') ||
    lower.includes('about abhigyan') ||
    lower.includes('about him') ||
    lower.includes('background') ||
    lower.includes('ripans') ||
    lower.includes('education') ||
    lower.includes('medical') ||
    (isDeepDiveFollowUp && contextSubject === 'about')
  ) {
    const id = GROUNDED_KNOWLEDGE.identity;
    return {
      reply: `**${id.name}** is a ${id.role} based in ${id.location}.\n\n- **Education**: ${id.education}\n- **Engineering Mindset**: ${id.disciplineConnection}\n- **Core Focus**: High-performance web applications, browser-native developer tools (like ToolKB), and bespoke digital experiences.\n\nHe is currently available for freelance contracts and technical collaborations.`,
      intent: 'about_inquiry',
      confidence: 0.99,
      detectedLanguage: 'en',
      isLiveServer: false,
      suggestedFollowUps: ['Show me some projects', 'What technologies does he work with?', 'Can we work together?'],
    };
  }

  // 9. COLLABORATION / HIRE / SERVICES / PRICING
  if (
    lower.includes('work together') ||
    lower.includes('hire') ||
    lower.includes('collaborate') ||
    lower.includes('collaboration') ||
    lower.includes('freelance') ||
    lower.includes('services') ||
    lower.includes('rates') ||
    lower.includes('cost') ||
    lower.includes('pricing') ||
    (isDeepDiveFollowUp && contextSubject === 'collaboration')
  ) {
    const c = GROUNDED_KNOWLEDGE.collaboration;
    return {
      reply: `**Collaboration & Services**:\n\nAbhigyan is ${c.status.toLowerCase()}\n\n**Core Capabilities**:\n${c.services.map((s) => `- ${s}`).join('\n')}\n\n**Pricing & Estimates**:\n${c.pricing}\n\nDirect contact: **[${GROUNDED_KNOWLEDGE.contact.email}](mailto:${GROUNDED_KNOWLEDGE.contact.email})** or jump to the [Contact Section](#contact).`,
      intent: 'services_collaboration',
      confidence: 0.98,
      detectedLanguage: 'en',
      isLiveServer: false,
      suggestedFollowUps: ['How can I contact Abhigyan?', 'Show me some projects', 'What technologies does he work with?'],
    };
  }

  // 10. CONTACT / REACH / EMAIL / SOCIALS
  if (
    lower.includes('contact') ||
    lower.includes('email') ||
    lower.includes('reach') ||
    lower.includes('github') ||
    lower.includes('linkedin') ||
    lower.includes('message') ||
    (isDeepDiveFollowUp && contextSubject === 'contact')
  ) {
    const ct = GROUNDED_KNOWLEDGE.contact;
    return {
      reply: `You can connect with Abhigyan directly through these verified channels:\n\n- **Email**: [${ct.email}](mailto:${ct.email})\n- **GitHub**: [github.com/abhigyansaikiaa](${ct.github})\n- **LinkedIn**: [Abhigyan Saikia on LinkedIn](${ct.linkedin})\n- **Location**: ${ct.location}\n- **On-Page Form**: You can also use the [Contact Section](#contact) directly on this page.\n\nHe typically replies within 24 hours.`,
      intent: 'contact_inquiry',
      confidence: 0.99,
      detectedLanguage: 'en',
      isLiveServer: false,
      suggestedFollowUps: ['Can we work together?', 'Show me some projects', 'Tell me about Abhigyan'],
    };
  }

  // 11. GREETINGS
  if (
    lower === 'hi' ||
    lower === 'hello' ||
    lower === 'hey' ||
    lower.startsWith('good morning') ||
    lower.startsWith('good afternoon') ||
    lower.startsWith('good evening') ||
    lower === 'what can you do' ||
    lower === 'help'
  ) {
    return {
      reply: `Hello! I am AskiDesk, Abhigyan's portfolio assistant. You can ask me about his software projects (ToolKB, Arogya Relief, Motion Subtitles, Brandcey), his verified tech stack, his medical laboratory background at RIPANS, or how to get in touch for collaborations.`,
      intent: 'greeting',
      confidence: 0.98,
      detectedLanguage: 'en',
      isLiveServer: false,
      suggestedFollowUps: ['Tell me about Abhigyan', 'Show me some projects', 'What technologies does he work with?', 'Can we work together?'],
    };
  }

  // 12. FALLBACK GROUNDED (Zero hallucination & honest guidance)
  return {
    reply: `I am AskiDesk, Abhigyan's portfolio assistant, dedicated to providing accurate information about his background, verified projects (such as **ToolKB** and **Arogya Relief**), technical skills, and collaboration opportunities.\n\nFor details not covered here, or for bespoke project quotes, please reach out directly at **[${GROUNDED_KNOWLEDGE.contact.email}](mailto:${GROUNDED_KNOWLEDGE.contact.email})** or visit the [Contact Section](#contact).`,
    intent: 'general_assistance',
    confidence: 0.88,
    detectedLanguage: 'en',
    isLiveServer: false,
    suggestedFollowUps: ['Tell me about Abhigyan', 'Show me some projects', 'What technologies does he work with?', 'Can we work together?'],
  };
}

// ============================================================================
// MAIN SEND FUNCTION WITH LIVE BACKEND PROBE & RESILIENT FALLBACK
// ============================================================================

export async function sendChatMessage(query: string, history?: ChatMessage[]): Promise<ChatResponse> {
  const cleanQuery = query.slice(0, 500).trim();
  if (!cleanQuery) {
    return processGroundedQuery('hello', history);
  }

  // 1. Attempt connection to live AskiDesk backend if configured
  const apiUrl = (import.meta as any).env?.VITE_CHATBOT_API_URL || 'http://localhost:3000/api/chat';

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1800); // 1.8s timeout

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: cleanQuery,
        businessId: 'cng_biz_8471',
        history: (history || []).slice(-6).map((m) => ({ role: m.sender, content: m.text })),
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data?.data?.reply) {
        return {
          reply: data.data.reply,
          intent: data.data.intent || 'custom_query',
          confidence: data.data.confidence || 0.95,
          detectedLanguage: data.data.detectedLanguage || 'en',
          isLiveServer: true,
          suggestedFollowUps:
            Array.isArray(data.data.suggestedFollowUps) && data.data.suggestedFollowUps.length > 0
              ? data.data.suggestedFollowUps
              : ['Show me some projects', 'What technologies does he work with?', 'Can we work together?'],
        };
      }
    }
  } catch (_err) {
    // Backend offline or unreachable: seamlessly fall back to local grounded engine
  }

  // 2. Grounded local intelligence
  return processGroundedQuery(cleanQuery, history);
}
