import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Gamepad2, Tv, Code2 } from 'lucide-react';
import { useProfile, useGamingStats, useNowWatching, useAnimeStats } from '../hooks/useApiData';
import NowWatching from './NowWatching';

export default function Hero() {
  const { data: profile } = useProfile();
  const { data: gamingStats } = useGamingStats();
  const { data: watching } = useNowWatching();
  const { data: animeStats } = useAnimeStats();
  const isWatching = watching?.isWatching || false;

  const totalPlaytimeHours = gamingStats ? Math.floor(gamingStats.totalPlaytime / 60) : 1247;

  const floatVariants = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="hero" className="relative isolate min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Hero Background Image - Fully visible */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: 'url(/hero-bg.png)',
          imageRendering: 'auto',
        }}
      />

      {/* Gradient Overlay - From left for text readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0F1014]/95 via-[#0F1014]/70 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0F1014]/50 via-transparent to-[#0F1014]/80 pointer-events-none" />

      {/* Ambient glow effects */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[5%] w-[300px] h-[300px] bg-purple-500/10 rounded-full filter blur-[100px]" />
        <div className="absolute bottom-[30%] left-[10%] w-[250px] h-[250px] bg-pink-500/10 rounded-full filter blur-[80px]" />
      </div>

      {/* Floating Shapes & Now Watching - Only when watching */}
      <AnimatePresence>
        {isWatching && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-10 overflow-hidden pointer-events-none hidden lg:block"
          >
            {/* Large rotated square - With Now Watching Card attached */}
            <motion.div
              variants={floatVariants}
              animate="animate"
              className="absolute top-[15%] right-[12%]"
            >
              {/* The square shape */}
              <div 
                className="w-28 h-28 border border-white/10 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm"
                style={{ transform: 'rotate(15deg)' }}
              />
              
              {/* Now Watching Card - Attached to the square */}
              <div 
                className="absolute -top-4 -right-20 w-64 z-20"
                style={{ transform: 'rotate(-5deg)' }}
              >
                <NowWatching />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        {/* Main Content - Left Aligned Asymmetric Layout */}
        <div className="mt-12 lg:mt-16 max-w-2xl">

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-left"
          >
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm"
            >
              <span className="text-xs font-bold text-white tracking-wide">Foxems</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs font-medium text-[var(--text-secondary)]">Personal Dashboard</span>
              </div>
            </motion.div>

            {/* Title: FOXEMS with split styling */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[1] mb-4"
            >
              <span className="text-white">FOX</span>
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 bg-clip-text text-transparent">
                EMS
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl sm:text-2xl font-medium text-white/80 mb-6 tracking-wide"
            >
              Leveling Up Every Day
            </motion.p>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-base text-[var(--text-secondary)] mb-8 max-w-lg leading-relaxed"
            >
              {profile?.bio || "Welcome to my personal universe. I track my anime journey, gaming achievements, and development projects. Explore my stats and see what I'm up to."}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-start"
            >
              <a
                href="#anime-stats"
                className="px-8 py-4 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-[#5865F2]/25"
              >
                Explore Stats
                <ArrowRight size={20} />
              </a>
              <a
                href="#gaming"
                className="px-8 py-4 rounded-xl bg-[#1E2028] border border-white/10 hover:bg-[#2B2D31] text-white font-bold transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                <Gamepad2 size={20} />
                View Library
              </a>
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 pt-8 border-t border-white/10"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Gaming Hours - With gradient and progress bar */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-purple-400">
                    <Gamepad2 size={20} />
                  </div>
                  <div>
                    <p className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                      {totalPlaytimeHours.toLocaleString()}
                    </p>
                    <p className="text-xs text-white/50 uppercase tracking-wider font-medium">Gaming Hours</p>
                  </div>
                </div>
                {/* Progress bar */}
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mt-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '75%' }}
                    transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  />
                </div>
              </motion.div>

              {/* Anime Series */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/70 group-hover:text-orange-400 transition-colors">
                    <Tv size={20} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white/70 group-hover:text-white transition-colors">
                      {animeStats?.userStats?.total_anime?.toLocaleString() ?? '342'}
                    </p>
                    <p className="text-xs text-white/50 uppercase tracking-wider font-medium">Anime Series</p>
                  </div>
                </div>
              </motion.div>

              {/* Days Spent Watching */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/70 group-hover:text-blue-400 transition-colors">
                    <Code2 size={20} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white/70 group-hover:text-white transition-colors">
                      {animeStats?.userStats?.days_watched?.toLocaleString() ?? '89'}
                    </p>
                    <p className="text-xs text-white/50 uppercase tracking-wider font-medium">Days Spent</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Wave Transition to Next Section */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#0F1014"
          />
        </svg>
      </div>

    </section>
  );
}
