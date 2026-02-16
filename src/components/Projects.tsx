import { motion } from 'framer-motion';
import { Code2, Globe, Shield, Cpu, Terminal, Palette, Zap, ExternalLink, Github, Bot, Sparkles, Layers } from 'lucide-react';
import SectionReveal from './SectionReveal';

const projects = [
  {
    id: 'artemis-ide',
    name: 'Artemis IDE',
    tagline: 'The AI-Powered IDE Built for Speed',
    description: 'Free, open-source agentic IDE — no subscriptions, no cloud lock-in. Built with security-first architecture where AI is treated as untrusted code.',
    icon: Code2,
    color: '#E74C3C',
    gradient: 'from-[#E74C3C] to-[#C0392B]',
    stats: [
      { label: 'Lines of Code', value: '15,000+' },
      { label: 'AI Providers', value: '13' },
      { label: 'MCP Servers', value: '33' },
      { label: 'Themes', value: '16' },
    ],
    features: [
      { icon: Bot, label: '4 AI Agent Modes', desc: 'Builder, Planner, Chat, Ask' },
      { icon: Shield, label: 'Security First', desc: 'Defense-in-depth model' },
      { icon: Terminal, label: 'Integrated Terminal', desc: 'PTY-backed shell' },
      { icon: Cpu, label: 'Monaco Editor', desc: 'Same engine as VS Code' },
    ],
    techStack: ['Electron', 'React', 'TypeScript', 'Tailwind', 'Monaco Editor', 'xterm.js'],
    links: {
      github: 'https://github.com/Foxemsx/Artemis',
      demo: 'https://github.com/Foxemsx/Artemis/releases',
    },
  },
  {
    id: 'artemis-web',
    name: 'Artemis Web',
    tagline: 'The Official Website for Artemis IDE',
    description: 'Beautiful, modern landing page showcasing the Artemis IDE project. Built with Next.js 14 for optimal performance.',
    icon: Globe,
    color: '#5865F2',
    gradient: 'from-[#5865F2] to-[#EB459E]',
    stats: [
      { label: 'Framework', value: 'Next.js 14' },
      { label: 'Components', value: '20+' },
      { label: 'Animations', value: 'Framer Motion' },
      { label: 'Theme Support', value: 'Dark/Light' },
    ],
    features: [
      { icon: Palette, label: 'Beautiful Design', desc: 'Modern UI with animations' },
      { icon: Zap, label: 'Fast Performance', desc: 'Next.js App Router' },
      { icon: Layers, label: 'Responsive', desc: 'All screen sizes' },
      { icon: Sparkles, label: 'Live Demo', desc: 'Interactive IDE preview' },
    ],
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Framer Motion', 'Lucide'],
    links: {
      github: 'https://github.com/Foxemsx/Artemis',
      demo: 'https://artemis-ide.vercel.app',
    },
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative rounded-3xl bg-[#1E2028] border border-white/5 overflow-hidden hover:border-white/15 transition-all duration-300">
        <div className={`relative h-32 bg-gradient-to-br ${project.gradient} p-6`}>
          <div className="absolute inset-0 bg-black/20" />
          
          <div className="relative z-10 flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                <project.icon size={32} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white">{project.name}</h3>
                <p className="text-white/80 text-sm font-medium">{project.tagline}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
            {project.description}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {project.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 + i * 0.05 }}
                className="text-center p-3 rounded-xl bg-[#0F1014] border border-white/5"
              >
                <div className="text-xl font-black" style={{ color: project.color }}>
                  {stat.value}
                </div>
                <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {project.features.map((feature, i) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 + 0.2 + i * 0.05 }}
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
              </motion.div>
            ))}
          </div>

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

          <div className="flex gap-3">
            <motion.a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0F1014] border border-white/10 hover:border-white/20 transition-colors group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Github size={18} className="text-white/70 group-hover:text-white transition-colors" />
              <span className="text-sm font-bold text-white/70 group-hover:text-white transition-colors">Source Code</span>
            </motion.a>
            <motion.a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-colors group"
              style={{ backgroundColor: `${project.color}20`, border: `1px solid ${project.color}40` }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ExternalLink size={18} style={{ color: project.color }} />
              <span className="text-sm font-bold" style={{ color: project.color }}>{project.id === 'artemis-ide' ? 'View Releases' : 'View Live'}</span>
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
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
            Open-source projects I have built, focusing on developer tools and AI-powered applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

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
