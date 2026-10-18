import React from 'react';
import { PROJECTS } from '../data/projects';
import { ExternalLink, Terminal, Eye } from 'lucide-react';

export interface AgentModeViewProps {
  onSwitchToHuman: () => void;
}

export const AgentModeView: React.FC<AgentModeViewProps> = ({ onSwitchToHuman }) => {
  return (
    <main className="agent-mode-container" role="main" aria-label="Machine-Readable Portfolio Representation">
      <header className="agent-header">
        <div className="agent-mode-badge">
          <Terminal size={14} className="agent-badge-icon" />
          <span>AGENT / MACHINE-READABLE PRESENTATION MODE</span>
        </div>

        <button
          type="button"
          onClick={onSwitchToHuman}
          className="agent-switch-btn"
          aria-label="Switch back to Human visual mode"
        >
          <Eye size={14} />
          <span>Return to Human View</span>
        </button>
      </header>

      <article className="agent-content">
        <section className="agent-section">
          <h1 className="agent-title">Abhigyan Saikia — Full Stack Developer</h1>
          <p className="agent-meta">
            Location: Assam, India &bull; Role: Full-Stack Web Developer &bull; Status: Available for High-Impact Projects
          </p>
          <p className="agent-lede">
            Developer focused on engineering practical, high-performance digital products, web tools, and scalable software from concept to launch. Currently pursuing a Bachelor of Medical Laboratory Science at RIPANS while actively shipping production web applications.
          </p>
        </section>

        <section className="agent-section">
          <h2>Machine-Readable Endpoints & System Context</h2>
          <ul className="agent-link-list">
            <li>
              <code>/llms.txt</code> — <a href="/llms.txt" target="_blank">Full Context & Raw Markdown Summary for AI Coding Agents</a>
            </li>
            <li>
              <code>/developers</code> — <a href="#developers">Public Route Inventory & Technical API Schemas</a>
            </li>
            <li>
              <code>/sitemap.xml</code> — <a href="/sitemap.xml" target="_blank">Search & Agent Crawler Sitemap</a>
            </li>
            <li>
              <code>/robots.txt</code> — <a href="/robots.txt" target="_blank">Crawler Directives & Indexing Permissions</a>
            </li>
          </ul>
        </section>

        <section className="agent-section">
          <h2>Verified Project Index ({PROJECTS.length} Verified Applications)</h2>
          <div className="agent-table-wrapper">
            <table className="agent-table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Project Name</th>
                  <th scope="col">Category</th>
                  <th scope="col">Technical Description</th>
                  <th scope="col">Live Target URL</th>
                </tr>
              </thead>
              <tbody>
                {PROJECTS.map((proj, idx) => (
                  <tr key={proj.id}>
                    <td><code>{String(idx + 1).padStart(2, '0')}</code></td>
                    <td><strong>{proj.title}</strong></td>
                    <td><span className="agent-tag">{proj.tag}</span></td>
                    <td>{proj.description}</td>
                    <td>
                      {proj.external ? (
                        <a href={proj.link} target="_blank" rel="noopener noreferrer" className="agent-url-link">
                          {proj.link} <ExternalLink size={11} />
                        </a>
                      ) : (
                        <code>{proj.link}</code>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="agent-section">
          <h2>Core Competencies & Stack</h2>
          <div className="agent-grid">
            <div className="agent-col">
              <h3>Frontend & Motion</h3>
              <ul>
                <li>React 18 &bull; Next.js &bull; Vite &bull; TypeScript</li>
                <li>Native CSS 3D Transforms &bull; Hardware Acceleration</li>
                <li>Framer Motion &bull; GSAP ScrollTrigger &bull; Responsive Layouts</li>
              </ul>
            </div>
            <div className="agent-col">
              <h3>Backend & Architecture</h3>
              <ul>
                <li>Node.js &bull; Express &bull; RESTful APIs &bull; Webhooks</li>
                <li>MongoDB &bull; PostgreSQL &bull; Edge Functions</li>
                <li>Authentication &bull; Cloudflare &bull; Vercel Deployment</li>
              </ul>
            </div>
            <div className="agent-col">
              <h3>Domain & Technical Focus</h3>
              <ul>
                <li>Web Utilities & Developer Tooling (ToolKB)</li>
                <li>Healthcare Platforms & Relief Systems (Arogya Relief, GCMR)</li>
                <li>Marketplace & SaaS Infrastructure (Brandcey, BrollWriter)</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="agent-section">
          <h2>Verified Contact & Verification Channels</h2>
          <ul>
            <li>
              <strong>Direct Email:</strong>{' '}
              <a href="mailto:work.abhigyansaikia@gmail.com">work.abhigyansaikia@gmail.com</a>
            </li>
            <li>
              <strong>GitHub Repository & Code:</strong>{' '}
              <a href="https://github.com/abhigyansaikiaa" target="_blank" rel="noopener noreferrer">
                https://github.com/abhigyansaikiaa
              </a>
            </li>
            <li>
              <strong>LinkedIn Profile:</strong>{' '}
              <a href="https://www.linkedin.com/in/abhigyan-saikia-26641227b" target="_blank" rel="noopener noreferrer">
                https://www.linkedin.com/in/abhigyan-saikia-26641227b
              </a>
            </li>
            <li>
              <strong>Production Portfolio URL:</strong>{' '}
              <a href="https://abhigyan-portfolio-eta.vercel.app/" target="_blank" rel="noopener noreferrer">
                https://abhigyan-portfolio-eta.vercel.app/
              </a>
            </li>
          </ul>
        </section>
      </article>
    </main>
  );
};
