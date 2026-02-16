import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Globe, Shield, Cpu, Terminal, Palette, Zap, ExternalLink, Github, Bot, Sparkles, Layers, X } from 'lucide-react';
import SectionReveal from './SectionReveal';

const projects = [
  {
    id: 'artemis-ide',
    name: 'Artemis IDE',
    tagline: 'AI-Powered IDE',
    shortDesc: 'Open-source agentic IDE with 13 AI providers',
    description: 'Free, open-source agentic IDE — no subscriptions, no cloud lock-in. Built with security-first architecture where AI is treated as untrusted code.',
    icon: Code2,
    color: '#E74C3C',
    gradient: 'from-[#E74C3C] to-[#C0392B]',
    media: {
      type: 'video',
      url: 'https://preview.redd.it/i-built-an-agentic-ide-that-gives-you-full-control-run-v0-fppi2cur74jg1.gif?width=1080&crop=smart&auto=webp&s=a6b529ef0fe141894faa0f4b2f1bf64a0ed75f83',
    },
    stats: [
      { label: 'Lines', value: '15K+' },
      { label: 'AI Providers', value: '13' },
      { label: 'MCP Servers', value: '33' },
      { label: 'Themes', value: '16' },
    ],
    features: [
      { icon: Bot, label: '4 AI Modes', desc: 'Builder, Planner, Chat, Ask' },
      { icon: Shield, label: 'Security First', desc: 'Defense-in-depth' },
      { icon: Terminal, label: 'Terminal', desc: 'PTY-backed shell' },
      { icon: Cpu, label: 'Editor', desc: 'Monaco (VS Code)' },
    ],
    techStack: ['Electron', 'React', 'TypeScript', 'Tailwind'],
    links: {
      github: 'https://github.com/Foxemsx/Artemis',
      demo: 'https://github.com/Foxemsx/Artemis/releases',
    },
  },
  {
    id: 'artemis-web',
    name: 'Artemis Web',
    tagline: 'Landing Page',
    shortDesc: 'Official website showcasing Artemis IDE',
    description: 'Beautiful, modern landing page built with Next.js 14 featuring live IDE demos and responsive design.',
    icon: Globe,
    color: '#5865F2',
    gradient: 'from-[#5865F2] to-[#EB459E]',
    media: {
      type: 'image',
      url: 'https://preview.redd.it/i-built-a-free-open-source-ai-powered-ide-13-providers-33-v0-49pi259oswig1.png?width=1080&crop=smart&auto=webp&s=5ee1f3216238aef8a16a53215413b6d26cfd9f15',
    },
    stats: [
      { label: 'Framework', value: 'Next.js 14' },
      { label: 'Components', value: '20+' },
      { label: 'Animations', value: 'Motion' },
      { label: 'Themes', value: '2' },
    ],
    features: [
      { icon: Palette, label: 'Design', desc: 'Modern UI/UX' },
      { icon: Zap, label: 'Performance', desc: 'App Router' },
      { icon: Layers, label: 'Responsive', desc: 'All screens' },
      { icon: Sparkles, label: 'Demo', desc: 'Interactive IDE' },
    ],
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind'],
    links: {
      github: 'https://github.com/Foxemsx/Artemis',
      demo: 'https://artemis-ide.vercel.app',
    },
  },
];

function CompactProjectCard({ project, isExpanded, onToggle }: { 
  project: typeof projects[0]; 
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      layout
      onClick={onToggle}
      className={`relative cursor-pointer group ${isExpanded ? 'col-span-1 sm:col-span-2 lg:col-span-2' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        layout
        className={`relative rounded-2xl bg-[#1E2028] border border-white/5 overflow-hidden transition-all duration-300 ${
          isExpanded ? 'shadow-2xl shadow-black/50 border-white/20' : 'hover:border-white/10 hover:shadow-lg'
        }`}
      >
        {/* Compact View */}
        <div className={`p-5 ${isExpanded ? 'hidden' : 'block'}`}>
          {/* Header */}
          <div className="flex items-start gap-4 mb-4">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${project.color}40 0%, ${project.color}20 100%)` }}
            >
              <project.icon size={24} style={{ color: project.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-white truncate">{project.name}</h3>
              <p className="text-xs text-[var(--text-muted)]">{project.tagline}</p>
            </div>
          </div>

          {/* Preview Image */}
          <div className="relative h-32 rounded-xl overflow-hidden mb-4">
            <img 
              src={project.media.url} 
              alt={project.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E2028] via-transparent to-transparent" />
          </div>

          {/* Short Description */}
          <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">
            {project.shortDesc}
          </p>

          {/* Stats Row */}
          <div className="flex gap-2 flex-wrap">
            {project.stats.slice(0, 2).map((stat) => (
              <span 
                key={stat.label}
                className="px-2 py-1 rounded-lg text-xs font-medium bg-white/5 text-white/70"
              >
                {stat.value} {stat.label}
              </span>
            ))}
            <span className="px-2 py-1 rounded-lg text-xs font-medium bg-white/5 text-white/50">
              +{project.stats.length - 2} more
            </span>
          </div>

          {/* Expand Hint */}
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-center">
            <span className="text-xs text-[var(--text-muted)] group-hover:text-white/70 transition-colors">
              Click to expand
            </span>
          </div>
        </div>

        {/* Expanded View */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle();
                }}
                className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X size={20} className="text-white" />
              </button>

              {/* Media Preview */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.media.url} 
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E2028] via-[#1E2028]/50 to-transparent" />
                
                {/* Overlay Info */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-14 h-14 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${project.color}30` }}
                    >
                      <project.icon size={28} style={{ color: project.color }} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white">{project.name}</h3>
                      <p className="text-sm text-white/70">{project.tagline}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Description */}
                <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-4 gap-2 mb-6">
                  {project.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="text-center p-3 rounded-xl bg-[#0F1014] border border-white/5"
                    >
                      <div className="text-lg font-black" style={{ color: project.color }}>
                        {stat.value}
                      </div>
                      <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {project.features.map((feature) => (
                    <div
                      key={feature.label}
                      className="flex items-start gap-3 p-3 rounded-xl bg-[#0F1014] border border-white/5"
                    >
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${project.color}20` }}
                      >
                        <feature.icon size={16} style={{ color: project.color }} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">{feature.label}</div>
                        <div className="text-xs text-[var(--text-muted)]">{feature.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tech Stack */}
                <div className="mb-6">
                  <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2">Tech Stack</div>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 text-white/70 border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0F1014] border border-white/10 hover:border-white/20 transition-colors group"
                  >
                    <Github size={18} className="text-white/70 group-hover:text-white transition-colors" />
                    <span className="text-sm font-bold text-white/70 group-hover:text-white transition-colors">Source</span>
                  </a>
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-colors group"
                    style={{ backgroundColor: `${project.color}20`, border: `1px solid ${project.color}40` }}
                  >
                    <ExternalLink size={18} style={{ color: project.color }} />
                    <span className="text-sm font-bold" style={{ color: project.color }}>
                      {project.id === 'artemis-ide' ? 'Releases' : 'Live'}
                    </span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <SectionReveal id="projects" className="pb-24 pt-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl font-black mb-4">
            My <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl">
            Open-source projects I have built. Click any card to explore details.
          </p>
        </motion.div>

        {/* Compact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <CompactProjectCard
              key={project.id}
              project={project}
              isExpanded={expandedId === project.id}
              onToggle={() => handleToggle(project.id)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-[var(--text-muted)] mb-4">
            Like my work? Star the repositories on GitHub!
          </p>
          <motion.a
            href="https://github.com/Foxemsx"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#F0B132] text-black font-bold hover:bg-[#F0B132]/90 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={20} />
            View All Projects
          </motion.a>
        </motion.div>
      </div>
    </SectionReveal>
  );
}
