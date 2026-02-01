import { motion, AnimatePresence } from 'framer-motion';
import { Play, Star, Clock } from 'lucide-react';
import { useNowWatching } from '../hooks/useApiData';

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default function NowWatching() {
  const { data: watching, isLoading } = useNowWatching();

  // Don't render anything if not watching and not loading
  if (!isLoading && !watching?.isWatching) {
    return null;
  }

  // Calculate progress percentage
  const progressPercent = watching?.progress && watching.progress.duration > 0
    ? Math.round((watching.progress.current / watching.progress.duration) * 100)
    : 0;

  return (
    <AnimatePresence mode="wait">
      {watching?.isWatching ? (
        <motion.div
          key="watching"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative group"
        >
          {/* Animated glow effect */}
          <motion.div 
            className="absolute -inset-1 bg-gradient-to-r from-orange-500/40 via-pink-500/40 to-purple-500/40 rounded-2xl blur-lg"
            animate={{
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Main card - Sleek floating design */}
          <div className="relative p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-purple-500/5 pointer-events-none" />
            
            {/* Header with orange animated dot */}
            <div className="relative flex items-center gap-2 mb-4">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500" />
              </span>
              <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">Now Watching</span>
            </div>

            {/* Anime Title */}
            <h4 className="relative font-bold text-white text-lg leading-tight mb-2 line-clamp-2">
              {watching.title || 'Unknown Anime'}
            </h4>

            {/* Episode & Season Info */}
            <div className="relative flex items-center gap-3 text-sm text-white/60 mb-4">
              {watching.episode && (
                <span className="flex items-center gap-1">
                  <Play size={12} className="text-orange-400" />
                  {watching.episode}
                </span>
              )}
              {watching.season && (
                <span className="px-2 py-0.5 rounded-full bg-white/10 text-xs text-white/50">
                  {watching.season}
                </span>
              )}
            </div>

            {/* Progress bar with gradient */}
            {watching.progress && watching.progress.duration > 0 && (
              <div className="relative space-y-1.5 mb-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white/40">Progress</span>
                  <span className="text-orange-400 font-semibold">{progressPercent}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full rounded-full bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-white/40">
                  <span className="flex items-center gap-1">
                    <Clock size={10} />
                    {formatTime(watching.progress.current)} / {formatTime(watching.progress.duration)}
                  </span>
                </div>
              </div>
            )}

            {/* Rating */}
            <div className="relative flex items-center gap-1.5 pt-3 border-t border-white/10">
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              <span className="text-base font-bold text-white">9.2</span>
              <span className="text-xs text-white/40">/10</span>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
