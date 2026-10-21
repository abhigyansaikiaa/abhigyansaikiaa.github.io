import { describe, it, expect } from 'vitest';
import { processGroundedQuery, sendChatMessage, ChatMessage } from './chatbot-client';

describe('Chatbot Grounded Client Engine', () => {
  it('handles initial greeting queries', () => {
    const res = processGroundedQuery('hello');
    expect(res.intent).toBe('greeting');
    expect(res.reply).toContain('portfolio assistant');
    expect(res.suggestedFollowUps.length).toBeGreaterThan(0);
  });

  it('answers "Tell me about Abhigyan" with accurate bio and RIPANS education', () => {
    const res = processGroundedQuery('Tell me about Abhigyan');
    expect(res.intent).toBe('about_inquiry');
    expect(res.reply).toContain('Abhigyan Saikia');
    expect(res.reply).toContain('RIPANS');
    expect(res.reply).toContain('Assam, India');
  });

  it('lists verified projects upon "Show me some projects"', () => {
    const res = processGroundedQuery('Show me some projects');
    expect(res.intent).toBe('projects_overview');
    expect(res.reply).toContain('ToolKB.in');
    expect(res.reply).toContain('Arogya Relief');
    expect(res.reply).toContain('Motion Subtitle Studio');
    expect(res.reply).toContain('Brandcey');
  });

  it('provides detailed response for ToolKB', () => {
    const res = processGroundedQuery('Tell me about ToolKB');
    expect(res.intent).toBe('project_inquiry_toolkb');
    expect(res.reply).toContain('ToolKB');
    expect(res.reply).toContain('Zero-Latency');
    expect(res.reply).toContain('https://toolkb.in');
  });

  it('provides detailed response for Arogya Relief', () => {
    const res = processGroundedQuery('What is Arogya Relief?');
    expect(res.intent).toBe('project_inquiry_arogya');
    expect(res.reply).toContain('Arogya Relief');
    expect(res.reply).toContain('Emergency Healthcare Logistics');
    expect(res.reply).toContain('RIPANS');
  });

  it('resolves multi-turn follow-up pronouns and ordinals', () => {
    const history: ChatMessage[] = [
      {
        id: '1',
        sender: 'user',
        text: 'Show me some projects',
        timestamp: '12:00',
      },
      {
        id: '2',
        sender: 'assistant',
        text: 'Here are Abhigyan\'s projects: 1. ToolKB.in, 2. Arogya Relief, 3. Motion Subtitle Studio, 4. Brandcey',
        timestamp: '12:01',
        intent: 'projects_overview',
      },
    ];

    // Follow-up: "tell me more about the first one"
    const followUpFirst = processGroundedQuery('tell me more about the first one', history);
    expect(followUpFirst.intent).toBe('project_inquiry_toolkb');
    expect(followUpFirst.reply).toContain('ToolKB');

    // Follow-up: "tell me more about the second one"
    const followUpSecond = processGroundedQuery('tell me more about the second one', history);
    expect(followUpSecond.intent).toBe('project_inquiry_arogya');
    expect(followUpSecond.reply).toContain('Arogya Relief');
  });

  it('provides verified tech stack details', () => {
    const res = processGroundedQuery('What technologies does he work with?');
    expect(res.intent).toBe('skills_inquiry');
    expect(res.reply).toContain('React 19');
    expect(res.reply).toContain('TypeScript');
    expect(res.reply).toContain('Tailwind CSS');
    expect(res.reply).toContain('Node.js');
  });

  it('provides collaboration and service details for "Can we work together?"', () => {
    const res = processGroundedQuery('Can we work together?');
    expect(res.intent).toBe('services_collaboration');
    expect(res.reply).toContain('Collaboration & Services');
    expect(res.reply).toContain('hello@abhigyansaikia.in');
  });

  it('provides contact information', () => {
    const res = processGroundedQuery('How can I contact Abhigyan?');
    expect(res.intent).toBe('contact_inquiry');
    expect(res.reply).toContain('hello@abhigyansaikia.in');
    expect(res.reply).toContain('github.com/abhigyansaikiaa');
    expect(res.reply).toContain('linkedin.com/in/abhigyan-saikia-26641227b');
  });

  it('handles out-of-scope queries with a grounded disclaimer and honest handoff', () => {
    const res = processGroundedQuery('What is the square root of 987654321?');
    expect(res.intent).toBe('general_assistance');
    expect(res.reply).toContain('portfolio assistant');
    expect(res.reply).toContain('hello@abhigyansaikia.in');
  });

  it('sanitizes input and caps length safely', async () => {
    const maliciousQuery = '<script>alert("xss")</script> Tell me about ToolKB ' + 'A'.repeat(800);
    const res = await sendChatMessage(maliciousQuery);
    expect(res.intent).toBe('project_inquiry_toolkb');
    expect(res.reply).not.toContain('<script>');
  });
});
