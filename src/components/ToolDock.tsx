import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import {
  Code2,
  Cpu,
  FileCode2,
  Palette,
  Server,
  Terminal,
  Box,
  Layers,
  CheckCircle2,
  GitBranch,
  Sparkles,
} from 'lucide-react';

export interface TechItem {
  id: string;
  name: string;
  category: string;
  role: string;
  icon: React.ReactNode;
  level: string;
}

export const VERIFIED_TECH_STACK: TechItem[] = [
  {
    id: 'react',
    name: 'React 19',
    category: 'Frontend Core',
    role: 'Component state modeling, hooks, concurrent rendering',
    icon: <Code2 size={24} className="text-cyan-400" />,
    level: 'Daily Production',
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'Full-Stack Framework',
    role: 'Server components, API endpoints, App Router, static generation',
    icon: <Server size={24} className="text-white" />,
    level: 'Production Systems',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Language',
    role: 'Strict type contracts, interfaces, refactoring reliability',
    icon: <FileCode2 size={24} className="text-blue-400" />,
    level: 'Core Language',
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'Design Systems',
    role: 'Design tokens, layout geometry, responsive UI, micro-motion',
    icon: <Palette size={24} className="text-sky-400" />,
    level: 'Design Language',
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'Runtime & APIs',
    role: 'REST APIs, file transformations, automated tooling scripts',
    icon: <Cpu size={24} className="text-emerald-400" />,
    level: 'Backend & Tooling',
  },
  {
    id: 'python',
    name: 'Python',
    category: 'Scripting & ML',
    role: 'Data pipeline processing, automated crawlers, algorithms',
    icon: <Terminal size={24} className="text-amber-400" />,
    level: 'Applied Systems',
  },
  {
    id: 'css3d',
    name: 'CSS 3D & WebGL',
    category: 'Spatial Graphics',
    role: 'Hardware-accelerated perspective, spatial matrices, interactive scenes',
    icon: <Box size={24} className="text-rose-400" />,
    level: 'Creative Motion',
  },
  {
    id: 'lenis',
    name: 'Lenis',
    category: 'Motion & Physics',
    role: 'Virtual momentum scrolling, RAF synchronization, anchor routing',
    icon: <Layers size={24} className="text-purple-400" />,
    level: 'Motion Architecture',
  },
  {
    id: 'vitest',
    name: 'Vitest',
    category: 'Quality Assurance',
    role: 'Unit testing, math verification, test-driven reliability',
    icon: <CheckCircle2 size={24} className="text-lime-400" />,
    level: 'Continuous QA',
  },
  {
    id: 'git',
    name: 'Git & GitHub',
    category: 'Version Control',
    role: 'Atomic commit hygiene, branch management, deployment automation',
    icon: <GitBranch size={24} className="text-orange-400" />,
    level: 'Version Control',
  },
];

interface ToolDockTileProps {
  item: TechItem;
  mouseX: any;
  onSelect: (item: TechItem) => void;
  isSelected: boolean;
}

const ToolDockTile: React.FC<ToolDockTileProps> = ({ item, mouseX, onSelect, isSelected }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-140, 0, 140], [54, 82, 54]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 180, damping: 14 });

  return (
    <div className="dock-tile-wrapper" ref={ref}>
      <motion.button
        style={{ width, height: width }}
        className={`dock-tile-btn ${isSelected ? 'is-selected' : ''}`}
        onClick={() => onSelect(item)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        type="button"
        aria-label={`Inspect ${item.name} technology details`}
      >
        <div className="dock-tile-icon">{item.icon}</div>

        {/* Floating Tooltip */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="dock-tooltip"
            >
              <span className="tooltip-name">{item.name}</span>
              <span className="tooltip-cat">{item.category}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export const ToolDock: React.FC = () => {
  const mouseX = useMotionValue(Infinity);
  const [selectedTech, setSelectedTech] = useState<TechItem>(VERIFIED_TECH_STACK[0]);

  return (
    <section id="skills" className="tool-dock-section" aria-label="Technology and Engineering Stack (Prompt 2)">
      <div className="dock-container">
        <div className="section-head text-center">
          <span className="section-kicker">TECHNICAL DOCK</span>
          <h2 className="section-title">Verified Technologies & Stack</h2>
          <p className="dock-subtitle">
            Hover or tap any tile to inspect real production applications and engineering utility.
          </p>
          <div className="kicker-line" />
        </div>

        {/* Magnification Dock Container */}
        <div className="dock-shelf-container">
          <motion.div
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className="dock-shelf"
            role="toolbar"
            aria-label="Interactive Technology Dock"
          >
            {VERIFIED_TECH_STACK.map((item) => (
              <ToolDockTile
                key={item.id}
                item={item}
                mouseX={mouseX}
                onSelect={(selected) => setSelectedTech(selected)}
                isSelected={selectedTech.id === item.id}
              />
            ))}
          </motion.div>
        </div>

        {/* Selected Technology Inspection Panel */}
        <div className="dock-inspection-panel">
          <div className="panel-badge-row">
            <span className="panel-tag">{selectedTech.category}</span>
            <span className="panel-level">{selectedTech.level}</span>
          </div>

          <div className="panel-content-row">
            <div className="panel-icon-wrap">{selectedTech.icon}</div>
            <div className="panel-text-wrap">
              <h3 className="panel-tech-name">{selectedTech.name}</h3>
              <p className="panel-tech-role">{selectedTech.role}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
