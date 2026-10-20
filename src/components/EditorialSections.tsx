import React, { useState } from 'react';
import { ProjectShowcase } from './ProjectShowcase';
import { SkillsSection } from './SkillsSection';
import { CopyButton, LiquidButton } from './ui/animate-buttons';
import {
  ExternalLink,
  ArrowRight,
  Terminal,
  BookOpen,
  Layers,
  ShieldCheck,
  Mail,
  Send,
  MapPin,
  Github,
  Linkedin,
  CheckCircle2,
} from 'lucide-react';

export const EditorialSections: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill out all fields before submitting.');
      return;
    }
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('sent');
      // Direct mailto handoff
      window.location.href = `mailto:work.abhigyansaikia@gmail.com?subject=Project Inquiry from ${encodeURIComponent(
        formData.name
      )}&body=${encodeURIComponent(formData.message + '\n\nFrom: ' + formData.email)}`;
    }, 600);
  };

  return (
    <div className="editorial-sections-wrapper">
      {/* =========================================================================
          STATEMENT & NUMBERED DIRECTORY
          ========================================================================= */}
      <section className="editorial-intro-statement" id="directory">
        <div className="statement-container">
          <p className="statement-label">PHILOSOPHY & FOCUS</p>
          <blockquote className="statement-quote">
            "I focus on building practical digital products — tools that are fast, focused and genuinely useful to the people using them."
          </blockquote>

          {/* Inline Numbered Directory */}
          <div className="directory-nav-strip">
            <a href="#works" className="directory-item">
              <span className="dir-num">01</span>
              <span className="dir-label">Work</span>
              <span className="dir-desc">Ferris Wheel Showcase</span>
            </a>
            <a href="#skills" className="directory-item">
              <span className="dir-num">02</span>
              <span className="dir-label">Skills</span>
              <span className="dir-desc">Magnification Tool Dock</span>
            </a>
            <a href="#about" className="directory-item">
              <span className="dir-num">03</span>
              <span className="dir-label">About</span>
              <span className="dir-desc">Laboratory Precision & Code</span>
            </a>
            <a href="#contact" className="directory-item">
              <span className="dir-num">04</span>
              <span className="dir-label">Contact</span>
              <span className="dir-desc">Collaboration & Direct Email</span>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MODULE B: FERRIS WHEEL PROJECT SHOWCASE (#works)
          Featuring ToolKB first, Arogya Relief, Motion Subtitles, Brandcey
          ========================================================================= */}
      <ProjectShowcase />

      {/* =========================================================================
          MODULE C: INTERACTIVE TOOL DOCK (#skills)
          Magnification Dock with Verified Technologies
          ========================================================================= */}
      <SkillsSection />

      {/* =========================================================================
          ABOUT & DOMAINS: BUILD · ABOUT · LEARN (#about)
          ========================================================================= */}
      <section className="what-i-do-area" id="about">
        <div className="what-container">
          {/* Authentic Author Portrait Spotlight */}
          <div className="about-portrait-spotlight">
            <div className="portrait-image-card">
              <div className="portrait-frame">
                <img
                  src="./abhigyan.jpg"
                  alt="Abhigyan Saikia — Full-Stack Developer & Product Architect"
                  className="portrait-img"
                  loading="lazy"
                />
                <div className="portrait-overlay-badge">
                  <span className="portrait-dot" />
                  <span>ABHIGYAN SAIKIA // FOUNDER & ARCHITECT</span>
                </div>
              </div>
            </div>

            <div className="portrait-narrative-card">
              <span className="narrative-tag">BACKGROUND & PHILOSOPHY</span>
              <h3 className="narrative-title">Clinical Diagnostic Standard Applied to Code</h3>
              <p className="narrative-p">
                I am Abhigyan Saikia, a full-stack developer and product architect based in Assam, India. Alongside engineering digital products like <strong>ToolKB.in</strong> and <strong>Brandcey</strong>, I study Medical Laboratory Science at RIPANS.
              </p>
              <p className="narrative-p">
                In clinical laboratories, an undetected margin of error has critical diagnostic consequences. I bring that same uncompromising discipline into software engineering: defensive data modeling, deterministic state management, rigorous type guarantees, and rock-solid edge-case tolerances.
              </p>
              <div className="narrative-meta-chips">
                <div className="meta-chip">
                  <span className="chip-key">FOCUS</span>
                  <span className="chip-val">Full-Stack Architecture & Client Utilities</span>
                </div>
                <div className="meta-chip">
                  <span className="chip-key">EDUCATION</span>
                  <span className="chip-val">BSc MLT, RIPANS (Mizoram)</span>
                </div>
                <div className="meta-chip">
                  <span className="chip-key">BASE</span>
                  <span className="chip-val">Assam, India • Global Availability</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pillars-grid">
            {/* Pillar 1: Build */}
            <div className="pillar-card">
              <div className="pillar-header">
                <div className="pillar-icon-box">
                  <Layers size={22} />
                </div>
                <span className="pillar-number">01</span>
              </div>
              <h3 className="pillar-title">Build</h3>
              <p className="pillar-text">
                Full-stack web applications, developer utilities, and production systems. I build platforms like <strong>ToolKB.in</strong> (browser utility platform) and <strong>Brandcey</strong> (creative services marketplace) with a focus on speed, clean architecture, and reliable execution.
              </p>
              <a href="#works" className="pillar-link">
                <span>Inspect Selected Products</span>
                <ArrowRight size={14} />
              </a>
            </div>

            {/* Pillar 2: About */}
            <div className="pillar-card">
              <div className="pillar-header">
                <div className="pillar-icon-box">
                  <ShieldCheck size={22} />
                </div>
                <span className="pillar-number">02</span>
              </div>
              <h3 className="pillar-title">Medical MLS Rigor</h3>
              <p className="pillar-text">
                Currently pursuing a Bachelor of Medical Laboratory Science at RIPANS. Clinical laboratory analysis demands absolute diagnostic accuracy; I apply that same methodical standard to edge-case handling, type systems, and failure tolerances in code.
              </p>
              <a href="#contact" className="pillar-link">
                <span>Discuss Engineering Approach</span>
                <ArrowRight size={14} />
              </a>
            </div>

            {/* Pillar 3: Learn */}
            <div className="pillar-card">
              <div className="pillar-header">
                <div className="pillar-icon-box">
                  <BookOpen size={22} />
                </div>
                <span className="pillar-number">03</span>
              </div>
              <h3 className="pillar-title">Technical Systems</h3>
              <p className="pillar-text">
                Technical write-ups, architecture notes, and developer guides covering 3D web interfaces, CSS perspective rendering, automated workflows, and practical full-stack deployment patterns.
              </p>
              <a href="./llms.txt" target="_blank" className="pillar-link">
                <span>Inspect Technical Documentation</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FIRST-CLASS REACT CONTACT SECTION (#contact)
          Built with Animate UI Copy Button, Liquid Button, and validated forms
          ========================================================================= */}
      <section className="contact-section-area" id="contact" aria-label="Contact and Inquiries">
        <div className="contact-container">
          <div className="section-head text-center">
            <span className="section-kicker">COLLABORATION</span>
            <h2 className="section-title">Let's Build Something Meaningful</h2>
            <p className="contact-subtitle">
              Open for high-impact web applications, client-side tools, and product engineering collaborations.
            </p>
            <div className="kicker-line" />
          </div>

          <div className="contact-layout-grid">
            {/* Left Info Column */}
            <div className="contact-info-col">
              <div className="contact-card-box">
                <div className="contact-card-header">
                  <div className="contact-icon-bubble">
                    <Mail size={22} />
                  </div>
                  <div>
                    <span className="contact-label">DIRECT EMAIL</span>
                    <h3 className="contact-heading">work.abhigyansaikia@gmail.com</h3>
                  </div>
                </div>

                <p className="contact-card-desc">
                  Feel free to send a message directly to my inbox regarding project proposals, freelance contracts, or technical inquiries.
                </p>

                <div className="contact-card-actions">
                  <a
                    href="mailto:work.abhigyansaikia@gmail.com"
                    className="direct-mail-btn"
                  >
                    <span>Send Email</span>
                    <ArrowRight size={14} />
                  </a>

                  {/* Animate UI: Animated Copy to Clipboard Button */}
                  <CopyButton textToCopy="work.abhigyansaikia@gmail.com" label="Copy Email Address" />
                </div>
              </div>

              {/* Location and Verified Links */}
              <div className="contact-meta-box">
                <div className="meta-item">
                  <MapPin size={18} className="text-red-500" />
                  <span>Assam, India • Available Globally</span>
                </div>
                <div className="meta-social-row">
                  <a
                    href="https://github.com/abhigyansaikiaa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="meta-social-btn"
                  >
                    <Github size={16} />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/abhigyan-saikia-26641227b"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="meta-social-btn"
                  >
                    <Linkedin size={16} />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="contact-form-col">
              <form className="contact-glass-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="user_name" className="form-label">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="user_name"
                    required
                    className="form-input"
                    placeholder="e.g. Sarah Connor"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="user_email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="user_email"
                    required
                    className="form-input"
                    placeholder="e.g. sarah@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="user_msg" className="form-label">
                    Your Message / Project Scope
                  </label>
                  <textarea
                    id="user_msg"
                    rows={4}
                    required
                    className="form-textarea"
                    placeholder="Tell me about your project, timeline, and goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <div className="form-group submit-wrap">
                  {/* Animate UI Liquid Button */}
                  <LiquidButton
                    type="submit"
                    disabled={formStatus === 'sending'}
                    className="submit-liquid-btn"
                  >
                    {formStatus === 'sending' ? (
                      <span className="flex-center gap-2">
                        <span>Preparing Message...</span>
                      </span>
                    ) : formStatus === 'sent' ? (
                      <span className="flex-center gap-2 text-emerald-300">
                        <CheckCircle2 size={16} />
                        <span>Message Sent!</span>
                      </span>
                    ) : (
                      <span className="flex-center gap-2">
                        <span>Send Message</span>
                        <Send size={15} />
                      </span>
                    )}
                  </LiquidButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          DEVELOPER RESOURCES & MACHINE READABLE SECTION
          ========================================================================= */}
      <section className="developer-resources-area" id="developers">
        <div className="dev-container">
          <div className="dev-box">
            <div className="dev-header">
              <Terminal size={20} className="dev-icon" />
              <div>
                <h3 className="dev-title">Developer & Agent Endpoints</h3>
                <p className="dev-sub">Public machine-readable context, endpoints, and specifications for LLMs and automated tools.</p>
              </div>
            </div>

            <div className="dev-endpoints-grid">
              <a href="./dead-model-check/" className="dev-endpoint-card">
                <span className="dev-endpoint-badge">UTILITY</span>
                <code className="dev-endpoint-path">/dead-model-check/</code>
                <p className="dev-endpoint-desc">Scan code and configuration files for known deprecated AI model IDs before they cause problems.</p>
              </a>

              <a href="./llms.txt" target="_blank" className="dev-endpoint-card">
                <span className="dev-endpoint-badge">TEXT/MARKDOWN</span>
                <code className="dev-endpoint-path">/llms.txt</code>
                <p className="dev-endpoint-desc">Comprehensive system prompt context, project directory, and raw text representations.</p>
              </a>

              <a href="./sitemap.xml" target="_blank" className="dev-endpoint-card">
                <span className="dev-endpoint-badge">XML</span>
                <code className="dev-endpoint-path">/sitemap.xml</code>
                <p className="dev-endpoint-desc">Index of all canonical website routes and update frequencies for search crawlers.</p>
              </a>

              <a href="./robots.txt" target="_blank" className="dev-endpoint-card">
                <span className="dev-endpoint-badge">TXT</span>
                <code className="dev-endpoint-path">/robots.txt</code>
                <p className="dev-endpoint-desc">Crawler access permissions and direct references to machine-readable sitemaps.</p>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          EDITORIAL FOOTER
          ========================================================================= */}
      <footer className="editorial-footer">
        <div className="footer-top-row">
          <div className="footer-brand">
            <h4>ABHIGYAN SAIKIA</h4>
            <p>Full-Stack Creative Developer & Product Architect • Assam, India</p>
          </div>

          <div className="footer-links-row">
            <a href="#works" className="footer-link">Work</a>
            <a href="#skills" className="footer-link">Skills</a>
            <a href="#about" className="footer-link">About</a>
            <a href="#contact" className="footer-link">Contact</a>
            <a href="https://github.com/abhigyansaikiaa" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
            <a href="https://www.linkedin.com/in/abhigyan-saikia-26641227b" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
          </div>
        </div>

        <div className="footer-bottom-row">
          <span>&copy; {new Date().getFullYear()} Abhigyan Saikia. All rights reserved.</span>
          <div className="footer-endpoints">
            <a href="./dead-model-check/">dead-model-check</a>
            <span>•</span>
            <a href="./llms.txt" target="_blank">llms.txt</a>
            <span>•</span>
            <a href="./sitemap.xml" target="_blank">sitemap.xml</a>
            <span>•</span>
            <a href="./robots.txt" target="_blank">robots.txt</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
