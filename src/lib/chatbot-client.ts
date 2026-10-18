/**
 * AskiDesk Portfolio Client Adapter
 * 
 * Safely bridges the portfolio frontend with the AskiDesk workflow (D:\chatbot)
 * without modifying or executing file writes against D:\chatbot.
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
}

// Embedded Grounded Knowledge regarding Abhigyan Saikia
const GROUNDED_PORTFOLIO_KNOWLEDGE = {
  about:
    "Abhigyan Saikia is a full-stack creative developer and product architect based in Assam, India. He is currently pursuing a Bachelor of Medical Laboratory Science (BSc MLT) at RIPANS. His background in medical laboratory science strongly shapes his software engineering discipline: methodical problem-solving, meticulous edge-case handling, and zero-compromise reliability.",
  toolkb:
    "ToolKB (toolkb.in) is Abhigyan's premier client-side developer utility platform. It provides instant, zero-latency code converters, formatters, cryptographic hash generators, and data parsers running completely in the visitor's browser with zero server roundtrips.",
  arogyarelief:
    "Arogya Relief is an emergency healthcare logistics and crisis triage platform engineered to track essential medical supplies and triage patient severity across distributed relief clinics during disasters.",
  motionsubtitles:
    "Motion Subtitle Studio is a specialized browser tool leveraging the Web Audio API and HTML5 Canvas to deliver real-time audio waveform transcription, frame-accurate timing, and kinetic animated subtitles.",
  brandcey:
    "Brandcey is a B2B creative services platform and design token exchange connecting agencies with vetted creative talent, backed by milestone escrow protection.",
  skills:
    "Abhigyan's verified technology stack includes React 19, Next.js (App Router), TypeScript, Tailwind CSS, Node.js, Python, CSS 3D / WebGL graphics, Lenis Smooth Scroll, and Vitest for testing.",
  contact:
    "You can reach Abhigyan directly at work.abhigyansaikia@gmail.com. He is based in Assam, India and works with global clients on high-impact web applications, client-side tools, and product engineering.",
  availability:
    "Abhigyan is open for freelance contracts, full-stack product development collaborations, and bespoke technical projects.",
};

export async function sendChatMessage(query: string): Promise<ChatResponse> {
  const normalized = query.toLowerCase().trim();

  // 1. Attempt connection to live AskiDesk backend if available
  const apiUrl = (import.meta as any).env?.VITE_CHATBOT_API_URL || 'http://localhost:3000/api/chat';

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1800); // 1.8s fast probe

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, businessId: 'cng_biz_8471' }),
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
        };
      }
    }
  } catch (_err) {
    // Live backend offline or not booted; fallback seamlessly to grounded portfolio engine
  }

  // 2. Embedded Grounded Engine (Guaranteed zero hallucination & instant response)
  if (normalized.includes('toolkb')) {
    return {
      reply: GROUNDED_PORTFOLIO_KNOWLEDGE.toolkb,
      intent: 'project_inquiry_toolkb',
      confidence: 0.98,
      detectedLanguage: 'en',
      isLiveServer: false,
    };
  }

  if (normalized.includes('arogya') || normalized.includes('relief') || normalized.includes('medical')) {
    return {
      reply: GROUNDED_PORTFOLIO_KNOWLEDGE.arogyarelief,
      intent: 'project_inquiry_arogya',
      confidence: 0.98,
      detectedLanguage: 'en',
      isLiveServer: false,
    };
  }

  if (normalized.includes('motion') || normalized.includes('subtitle') || normalized.includes('video')) {
    return {
      reply: GROUNDED_PORTFOLIO_KNOWLEDGE.motionsubtitles,
      intent: 'project_inquiry_motion',
      confidence: 0.98,
      detectedLanguage: 'en',
      isLiveServer: false,
    };
  }

  if (normalized.includes('brandcey') || normalized.includes('marketplace')) {
    return {
      reply: GROUNDED_PORTFOLIO_KNOWLEDGE.brandcey,
      intent: 'project_inquiry_brandcey',
      confidence: 0.98,
      detectedLanguage: 'en',
      isLiveServer: false,
    };
  }

  if (
    normalized.includes('who are you') ||
    normalized.includes('who is abhigyan') ||
    normalized.includes('about') ||
    normalized.includes('background') ||
    normalized.includes('ripans')
  ) {
    return {
      reply: GROUNDED_PORTFOLIO_KNOWLEDGE.about,
      intent: 'about_inquiry',
      confidence: 0.99,
      detectedLanguage: 'en',
      isLiveServer: false,
    };
  }

  if (
    normalized.includes('tech') ||
    normalized.includes('stack') ||
    normalized.includes('skills') ||
    normalized.includes('framework') ||
    normalized.includes('language')
  ) {
    return {
      reply: GROUNDED_PORTFOLIO_KNOWLEDGE.skills,
      intent: 'skills_inquiry',
      confidence: 0.97,
      detectedLanguage: 'en',
      isLiveServer: false,
    };
  }

  if (
    normalized.includes('contact') ||
    normalized.includes('email') ||
    normalized.includes('reach') ||
    normalized.includes('hire') ||
    normalized.includes('freelance') ||
    normalized.includes('collaborate')
  ) {
    return {
      reply: `${GROUNDED_PORTFOLIO_KNOWLEDGE.contact} ${GROUNDED_PORTFOLIO_KNOWLEDGE.availability}`,
      intent: 'contact_inquiry',
      confidence: 0.99,
      detectedLanguage: 'en',
      isLiveServer: false,
    };
  }

  // Default respectful, grounded response
  return {
    reply: `Hello! I am Abhigyan's portfolio assistant powered by the AskiDesk workflow. I can provide accurate information about his engineered products (such as ToolKB, Arogya Relief, Motion Subtitle Studio, and Brandcey), his verified tech stack, his background at RIPANS, or how to get in touch directly at work.abhigyansaikia@gmail.com. What would you like to know?`,
    intent: 'general_assistance',
    confidence: 0.95,
    detectedLanguage: 'en',
    isLiveServer: false,
  };
}
