import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Globe, Shield, Cpu, Terminal, Palette, Zap, ExternalLink, Github, Bot, Sparkles, Layers, X } from 'lucide-react';
import SectionReveal from './SectionReveal';

// Custom Nothing Card Component
function NothingCard({ isExpanded, onToggle, className = '' }: { isExpanded: boolean; onToggle: () => void; className?: string }) {
  const [narratorText, setNarratorText] = useState('');
  const [showNarrator, setShowNarrator] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wordTimingsRef = useRef<{ word: string; startTime: number; endTime: number }[]>([]);

  const narratorLines = [
    "Congratulations. You have successfully clicked on nothing. You are now viewing detailed information about absolute nothingness. This project took three weeks to build, four seconds to understand, and will leave you with zero practical skills.",
  ];

  // Calculate word timings based on average speech rate (~150 WPM = 2.5 words/sec)
  const calculateWordTimings = (text: string) => {
    const words = text.split(' ');
    const timings: { word: string; startTime: number; endTime: number }[] = [];
    let currentTime = 0;
    const avgWordDuration = 0.4; // seconds per word
    const punctuationPause = 0.6; // extra pause after periods

    words.forEach((word) => {
      const hasPeriod = word.includes('.');
      const duration = avgWordDuration + (hasPeriod ? punctuationPause : 0);
      
      timings.push({
        word,
        startTime: currentTime,
        endTime: currentTime + duration,
      });
      
      currentTime += duration;
    });

    return timings;
  };

  useEffect(() => {
    if (isExpanded) {
      setShowNarrator(true);
      setNarratorText(narratorLines[0]);
      setCurrentWordIndex(0);
      
      // Calculate word timings
      wordTimingsRef.current = calculateWordTimings(narratorLines[0]);
      
      // Play narration audio
      if (audioRef.current) {
        audioRef.current.play().catch(() => {
          // Audio autoplay blocked, that's fine
        });
      }
    } else {
      setNarratorText('');
      setShowNarrator(false);
      setCurrentWordIndex(0);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [isExpanded]);

  // Track audio time and update current word
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !isExpanded) return;

    const handleTimeUpdate = () => {
      const currentTime = audio.currentTime;
      const wordIndex = wordTimingsRef.current.findIndex(
        (timing) => currentTime >= timing.startTime && currentTime < timing.endTime
      );
      if (wordIndex !== -1 && wordIndex !== currentWordIndex) {
        setCurrentWordIndex(wordIndex);
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    return () => audio.removeEventListener('timeupdate', handleTimeUpdate);
  }, [isExpanded, currentWordIndex]);

  // Split text into words for rendering
  const renderNarratorWords = () => {
    const words = narratorText.split(' ');
    return words.map((word, index) => (
      <motion.span
        key={index}
        className={`inline-block mr-1 transition-colors duration-150 ${
          index === currentWordIndex 
            ? 'text-white font-medium' 
            : index < currentWordIndex 
              ? 'text-white/60' 
              : 'text-white/30'
        }`}
        animate={{
          scale: index === currentWordIndex ? 1.05 : 1,
        }}
        transition={{ duration: 0.1 }}
      >
        {word}
      </motion.span>
    ));
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/narrator/nothing-narrator.mp3"
        preload="auto"
      />
      <motion.div
        onClick={onToggle}
        className={`relative cursor-pointer group ${className || (isExpanded ? 'col-span-1 sm:col-span-2 lg:col-span-2' : '')}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          layoutId="project-card-nothing"
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className={`relative rounded-2xl bg-gradient-to-br from-[#0a0a0c] via-[#111114] to-[#0d0d0f] border border-white/[0.03] overflow-hidden transition-all duration-500 ${
            isExpanded ? 'shadow-2xl shadow-black/80 border-white/10' : 'hover:border-white/[0.08] hover:shadow-xl hover:shadow-black/60'
          }`}
        >
        {/* Animated grain overlay */}
        <div className="absolute inset-0 opacity-[0.15] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Dissolved edge effects */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
        
        {/* Compact View */}
        <div className={`p-5 relative ${isExpanded ? 'hidden' : 'block'}`}>
          {/* Header with void symbol */}
          <div className="flex items-start gap-4 mb-4">
            <motion.div 
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 relative overflow-hidden"
              style={{ background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08) 0%, transparent 50%)' }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-2xl font-light text-white/90 select-none" style={{ fontFamily: 'Cormorant Garamond, serif' }}>∅</span>
              <div className="absolute inset-0 rounded-xl border border-white/[0.05]" />
            </motion.div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-white/90 truncate tracking-wide">Nothing</h3>
              <p className="text-xs text-white/40 italic">The Museum of Absence</p>
            </div>
          </div>

          {/* Dissolved preview area */}
          <div className="relative h-32 rounded-xl overflow-hidden mb-4 group-hover:shadow-lg transition-shadow duration-500"
            style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(20,20,25,1) 0%, rgba(8,8,10,1) 100%)' }}
          >
            {/* Central void glow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                className="w-20 h-20 rounded-full"
                style={{ 
                  background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
                  boxShadow: 'inset 0 0 60px rgba(255,255,255,0.02)'
                }}
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
            
            {/* Dissolved particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-white/20"
                style={{
                  left: `${20 + i * 12}%`,
                  top: `${30 + (i % 3) * 20}%`,
                }}
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              />
            ))}
            
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent" />
          </div>

          {/* Description */}
          <p className="text-sm text-white/50 mb-4 line-clamp-2 italic">
            A contemplative journey through six chambers of emptiness. Where nothing becomes everything.
          </p>

          {/* Minimal stats */}
          <div className="flex gap-2 flex-wrap">
            <span className="px-2 py-1 rounded-lg text-xs font-light bg-white/[0.03] text-white/50 border border-white/[0.03]">
              6 Rooms
            </span>
            <span className="px-2 py-1 rounded-lg text-xs font-light bg-white/[0.03] text-white/50 border border-white/[0.03]">
              WebGL
            </span>
            <span className="px-2 py-1 rounded-lg text-xs font-light bg-white/[0.03] text-white/50 border border-white/[0.03]">
              Void
            </span>
          </div>

          {/* Expand hint */}
          <div className="mt-4 pt-3 border-t border-white/[0.03] flex items-center justify-center">
            <span className="text-xs text-white/30 group-hover:text-white/50 transition-colors duration-300">
              Click to enter the void
            </span>
          </div>
        </div>

        {/* Expanded View */}
        <AnimatePresence mode="wait">
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle();
                }}
                className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/[0.05]"
              >
                <X size={20} className="text-white/70" />
              </button>

              {/* Expanded Media Preview */}
              <div className="relative h-48 overflow-hidden"
                style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(25,25,30,1) 0%, rgba(5,5,7,1) 100%)' }}
              >
                {/* Animated void center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    className="relative"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  >
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute rounded-full border border-white/[0.05]"
                        style={{
                          width: `${80 + i * 40}px`,
                          height: `${80 + i * 40}px`,
                          left: '50%',
                          top: '50%',
                          transform: 'translate(-50%, -50%)',
                        }}
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.1, 0.2, 0.1],
                        }}
                        transition={{
                          duration: 4 + i,
                          repeat: Infinity,
                          delay: i * 0.5,
                        }}
                      />
                    ))}
                  </motion.div>
                  
                  <motion.div 
                    className="text-5xl font-light text-white/80 select-none"
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    ∅
                  </motion.div>
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/60 to-transparent" />
                
                {/* Overlay Info */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-14 h-14 rounded-xl flex items-center justify-center border border-white/[0.05]"
                      style={{ background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.05) 0%, transparent 50%)' }}
                    >
                      <span className="text-3xl font-light text-white/90" style={{ fontFamily: 'Cormorant Garamond, serif' }}>∅</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white/90 tracking-wide">Nothing</h3>
                      <p className="text-sm text-white/50 italic">The Museum of Absence</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Narrator */}
                <AnimatePresence>
                  {showNarrator && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mb-4 p-3 rounded-lg bg-white/[0.03] border border-white/[0.05]"
                    >
                      <div className="flex items-start gap-2">
                        <motion.span 
                          className="text-xs text-white/40 flex-shrink-0 mt-0.5"
                          animate={{ opacity: [0.3, 0.7, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          ◉
                        </motion.span>
                        <p 
                          className="text-sm italic leading-relaxed"
                          style={{ fontFamily: 'Cormorant Garamond, serif' }}
                        >
                          {renderNarratorWords()}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Description */}
                <p className="text-white/60 mb-6 leading-relaxed italic">
                  A self-aware digital void that observes you as you observe it. Six rooms exploring the paradox of nothingness: The Threshold, The Singularity, Quantum Chamber, Echo Hall, Dissolution Room, and The Final Void.
                </p>

                {/* Rooms Grid */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                  {[
                    { num: '00', name: 'Threshold', label: 'Entrance' },
                    { num: '01', name: 'Singularity', label: 'Physics' },
                    { num: '02', name: 'Quantum', label: 'Vacuum' },
                    { num: '03', name: 'Echo', label: 'Memory' },
                    { num: '04', name: 'Dissolution', label: 'Entropy' },
                    { num: '05', name: 'Void', label: 'Return' },
                  ].map((room) => (
                    <div
                      key={room.num}
                      className="text-center p-3 rounded-xl bg-white/[0.02] border border-white/[0.03] hover:bg-white/[0.04] transition-colors"
                    >
                      <div className="text-[10px] text-white/30 mb-1">{room.num}</div>
                      <div className="text-xs font-medium text-white/70">{room.name}</div>
                      <div className="text-[9px] text-white/30 uppercase tracking-wider mt-1">{room.label}</div>
                    </div>
                  ))}
                </div>

                {/* Philosophy Quote */}
                <div className="mb-6 p-4 rounded-xl bg-white/[0.02] border border-white/[0.03]">
                  <p className="text-white/40 text-sm italic text-center" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    "The void is not empty. It is full of potential."
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="mb-6">
                  <div className="text-xs text-white/30 uppercase tracking-wider mb-2">Experience</div>
                  <div className="flex flex-wrap gap-2">
                    {['Three.js', 'WebGL', 'GSAP', 'Canvas', 'Audio'].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded-lg text-xs font-light bg-white/[0.03] text-white/60 border border-white/[0.03]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  <a
                    href="https://github.com/Foxemsx/Nothing"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.06] hover:border-white/[0.08] transition-all group"
                  >
                    <Github size={18} className="text-white/50 group-hover:text-white/70 transition-colors" />
                    <span className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors">Source</span>
                  </a>
                  <a
                    href="https://nothing-delta.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.05] border border-white/[0.10] hover:bg-white/[0.08] hover:border-white/[0.15] transition-all group"
                  >
                    <ExternalLink size={18} className="text-white/60 group-hover:text-white/80 transition-colors" />
                    <span className="text-sm font-medium text-white/70 group-hover:text-white/90 transition-colors">
                      Enter Void
                    </span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
    </>
  );
}

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

function CompactProjectCard({ project, isExpanded, onToggle, className = '' }: { 
  project: typeof projects[0]; 
  isExpanded: boolean;
  onToggle: () => void;
  className?: string;
}) {
  return (
    <motion.div
      onClick={onToggle}
      className={`relative cursor-pointer group ${className || (isExpanded ? 'col-span-1 sm:col-span-2 lg:col-span-2' : '')}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        layoutId={`project-card-${project.id}`}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className={`relative rounded-2xl bg-[#1E2028] border border-white/5 overflow-hidden transition-colors duration-300 ${
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
        <AnimatePresence mode="wait">
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, height: 0 }}
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
            Projects I have built, including tools, experiences, and explorations of nothingness.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(() => {
            // Build ordered list: expanded card first (if any), then others
            const orderedProjects = [...projects];
            const expandedProjectIndex = orderedProjects.findIndex(p => p.id === expandedId);
            
            // Build final render array
            const renderItems: React.ReactNode[] = [];
            
            // If a regular project is expanded, render it first spanning full width
            if (expandedProjectIndex >= 0) {
              const expandedProject = orderedProjects[expandedProjectIndex];
              renderItems.push(
                <CompactProjectCard
                  key={expandedProject.id}
                  project={expandedProject}
                  isExpanded={true}
                  onToggle={() => handleToggle(expandedProject.id)}
                  className="col-span-1 sm:col-span-2 lg:col-span-3"
                />
              );
              // Remove from ordered list since we already rendered it
              orderedProjects.splice(expandedProjectIndex, 1);
            }
            
            // If Nothing is expanded, render it first
            if (expandedId === 'nothing') {
              renderItems.unshift(
                <NothingCard
                  key="nothing"
                  isExpanded={true}
                  onToggle={() => handleToggle('nothing')}
                  className="col-span-1 sm:col-span-2 lg:col-span-3"
                />
              );
            }
            
            // Render remaining non-expanded projects
            orderedProjects.forEach(project => {
              renderItems.push(
                <CompactProjectCard
                  key={project.id}
                  project={project}
                  isExpanded={false}
                  onToggle={() => handleToggle(project.id)}
                  className=""
                />
              );
            });
            
            // Render Nothing if not expanded
            if (expandedId !== 'nothing') {
              renderItems.push(
                <NothingCard
                  key="nothing"
                  isExpanded={false}
                  onToggle={() => handleToggle('nothing')}
                  className=""
                />
              );
            }
            
            return renderItems;
          })()}
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
