import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Clock, Trophy, Search, ArrowUpDown, Library, ArrowUpRight, Calendar, ExternalLink, LayoutGrid, List, ChevronDown } from 'lucide-react';
import { useGamingStats } from '../hooks/useApiData';
import SectionReveal from './SectionReveal';

// Filter types
const SORT_OPTIONS = [
  { label: 'Most Played', value: 'playtime', icon: Clock },
  { label: 'Alphabetical', value: 'alphabetical', icon: ArrowUpDown },
  { label: 'Recently Played', value: 'recent', icon: Calendar },
] as const;

type SortOption = (typeof SORT_OPTIONS)[number]['value'];
type ViewMode = 'comfortable' | 'compact';

// Format playtime to hours
function formatHours(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  if (hours < 1) return `${minutes}m`;
  return `${hours.toLocaleString()}h`;
}

// Format date to readable format
function formatLastPlayed(dateString?: string): string {
  if (!dateString) return 'Never played';
  const date = new Date(dateString);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

// Get most recent games
function getRecentGames(games: any[], count: number) {
  return [...games]
    .filter((g) => g.lastPlayed)
    .sort((a, b) => new Date(b.lastPlayed).getTime() - new Date(a.lastPlayed).getTime())
    .slice(0, count);
}

const GAMES_PER_BATCH = 30;

export default function GamingLibrary() {
  const { data: stats } = useGamingStats();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('playtime');
  const [viewMode, setViewMode] = useState<ViewMode>('comfortable');
  const [visibleCount, setVisibleCount] = useState(GAMES_PER_BATCH);

  // Prepare data - must be before any early returns to maintain hook order
  const games = stats?.games || [];
  const recentGames = getRecentGames(games, 3);
  const totalHours = Math.floor((stats?.totalPlaytime || 0) / 60);

  // Reset visible count when search or sort changes
  useMemo(() => {
    setVisibleCount(GAMES_PER_BATCH);
  }, [searchQuery, sortBy]);

  // Filter and sort games - must be before any early returns
  const filteredAndSortedGames = useMemo(() => {
    let filtered = games;

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = games.filter(
        (game) =>
          game.title.toLowerCase().includes(query) ||
          (game.id && game.id.toString().includes(query))
      );
    }

    // Sort
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'playtime':
          return b.playtime - a.playtime;
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        case 'recent':
          if (!a.lastPlayed && !b.lastPlayed) return 0;
          if (!a.lastPlayed) return 1;
          if (!b.lastPlayed) return -1;
          return new Date(b.lastPlayed).getTime() - new Date(a.lastPlayed).getTime();
        default:
          return 0;
      }
    });
  }, [games, searchQuery, sortBy]);

  // Slice games for pagination
  const displayedGames = filteredAndSortedGames.slice(0, visibleCount);
  const hasMoreGames = visibleCount < filteredAndSortedGames.length;
  const remainingCount = filteredAndSortedGames.length - visibleCount;

  if (!stats) return null;

  return (
    <SectionReveal id="gaming" className="py-24 relative">
      {/* Background gradient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#3BA55D]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#3BA55D]/3 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-[#3BA55D]/10 border border-[#3BA55D]/20">
              <Library size={32} className="text-[#3BA55D]" />
            </div>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black mb-4">
            Gaming <span className="text-[#3BA55D]">Library</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
            A complete collection of games from my Steam library.
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-white/5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-[#3BA55D]/10">
              <Gamepad2 size={24} className="text-[#3BA55D]" />
            </div>
            <div>
              <p className="text-[var(--text-muted)] text-sm">Total Games</p>
              <p className="text-2xl font-black text-white">{stats.totalGames}</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-white/5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-[#3BA55D]/10">
              <Clock size={24} className="text-[#3BA55D]" />
            </div>
            <div>
              <p className="text-[var(--text-muted)] text-sm">Total Playtime</p>
              <p className="text-2xl font-black text-[#3BA55D]">{totalHours.toLocaleString()}h</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-white/5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-yellow-500/10">
              <Trophy size={24} className="text-yellow-500" />
            </div>
            <div>
              <p className="text-[var(--text-muted)] text-sm">Most Played</p>
              <p className="text-lg font-bold text-white truncate max-w-[200px]">
                {games[0]?.title || 'N/A'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Recently Played Section */}
        {recentGames.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Calendar size={20} className="text-[#3BA55D]" />
              Recently Played
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentGames.map((game, idx) => (
                <motion.a
                  key={`recent-${game.id}`}
                  href={`https://store.steampowered.com/app/${game.id}`}
                  target="_blank"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative rounded-xl overflow-hidden bg-[var(--bg-card)] border border-white/5 hover:border-[#3BA55D]/50 transition-all"
                >
                  <div className="absolute top-3 right-3 z-10">
                    <div className="px-2 py-1 rounded-full bg-[#3BA55D]/20 backdrop-blur-sm border border-[#3BA55D]/30">
                      <span className="text-xs font-medium text-[#3BA55D]">
                        {formatLastPlayed(game.lastPlayed)}
                      </span>
                    </div>
                  </div>
                  <div className="h-40 w-full relative overflow-hidden">
                    <img
                      src={game.image}
                      alt={game.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-[var(--bg-card)]/50 to-transparent" />
                  </div>
                  <div className="p-4 relative -mt-8">
                    <h4 className="font-bold text-white group-hover:text-[#3BA55D] transition-colors truncate">
                      {game.title}
                    </h4>
                    <p className="text-sm text-[var(--text-muted)] mt-1">
                      {formatHours(game.playtime)} played
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}

        {/* Search and Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mb-8 space-y-4"
        >
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md w-full">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
              />
              <input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-[var(--bg-card)] border border-white/5 focus:border-[#3BA55D]/50 focus:outline-none text-white placeholder:text-[var(--text-muted)] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-white transition-colors"
                >
                  ×
                </button>
              )}
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-[var(--text-muted)] mr-2">Sort by:</span>
              {SORT_OPTIONS.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                      sortBy === option.value
                        ? 'bg-[#3BA55D]/20 text-[#3BA55D] border border-[#3BA55D]/30'
                        : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border border-white/5 hover:border-white/10'
                    }`}
                  >
                    <Icon size={14} />
                    {option.label}
                  </button>
                );
              })}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-[var(--bg-card)] rounded-lg border border-white/5 p-1">
              <button
                onClick={() => setViewMode('comfortable')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                  viewMode === 'comfortable'
                    ? 'bg-[#3BA55D]/20 text-[#3BA55D]'
                    : 'text-[var(--text-muted)] hover:text-white'
                }`}
                title="Comfortable view"
              >
                <LayoutGrid size={16} />
                <span className="hidden sm:inline">Grid</span>
              </button>
              <button
                onClick={() => setViewMode('compact')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                  viewMode === 'compact'
                    ? 'bg-[#3BA55D]/20 text-[#3BA55D]'
                    : 'text-[var(--text-muted)] hover:text-white'
                }`}
                title="Compact list view"
              >
                <List size={16} />
                <span className="hidden sm:inline">List</span>
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--text-muted)]">
              Showing {filteredAndSortedGames.length} of {games.length} games
            </span>
          </div>
        </motion.div>

        {/* Games Display */}
        {viewMode === 'comfortable' ? (
          /* Comfortable Grid View */
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {displayedGames.map((game, idx) => {
                const rank = games.findIndex((g) => g.id === game.id) + 1;
                const isTop3 = rank <= 3;

                return (
                  <motion.a
                    key={game.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: idx * 0.05 }}
                    href={`https://store.steampowered.com/app/${game.id}`}
                    target="_blank"
                    className="group relative rounded-2xl overflow-hidden bg-[var(--bg-card)] border border-white/5 hover:border-[#3BA55D]/50 transition-all hover:translate-y-[-4px] hover:shadow-xl hover:shadow-[#3BA55D]/5"
                  >
                    {/* Rank Badge */}
                    {isTop3 && (
                      <div
                        className={`absolute top-3 left-3 z-10 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          rank === 1
                            ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30'
                            : rank === 2
                            ? 'bg-gray-300/20 text-gray-300 border border-gray-300/30'
                            : 'bg-amber-600/20 text-amber-600 border border-amber-600/30'
                        }`}
                      >
                        {rank}
                      </div>
                    )}

                    {/* External Link Icon */}
                    <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="p-2 rounded-full bg-black/50 backdrop-blur-sm">
                        <ExternalLink size={14} className="text-white" />
                      </div>
                    </div>

                    {/* Game Image */}
                    <div className="h-48 w-full relative overflow-hidden">
                      <img
                        src={game.image}
                        alt={game.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent" />

                      {/* Playtime Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-white">
                            <Clock size={16} className="text-[#3BA55D]" />
                            <span className="font-bold">{formatHours(game.playtime)}</span>
                          </div>
                          {game.lastPlayed && (
                            <span className="text-xs text-[var(--text-muted)]">
                              {formatLastPlayed(game.lastPlayed)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Game Info */}
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-[#3BA55D] transition-colors">
                        {game.title}
                      </h3>

                      {/* Progress bar relative to top game */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                          <span>Relative to most played</span>
                          <span>{Math.round((game.playtime / games[0].playtime) * 100)}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-[var(--bg-primary)] rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${(game.playtime / games[0].playtime) * 100}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: idx * 0.05 }}
                            className="h-full bg-gradient-to-r from-[#3BA55D] to-[#2E8F4E] rounded-full"
                          />
                        </div>
                      </div>

                      {/* Action hint */}
                      <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
                        <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                          View on Steam
                          <ArrowUpRight size={12} />
                        </span>
                        <Trophy
                          size={16}
                          className={
                            isTop3
                              ? rank === 1
                                ? 'text-yellow-500'
                                : 'text-[var(--text-muted)]'
                              : 'text-transparent'
                          }
                        />
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Compact List View */
          <motion.div layout className="flex flex-col gap-2">
            <AnimatePresence mode="popLayout">
              {displayedGames.map((game, idx) => {
                const rank = games.findIndex((g) => g.id === game.id) + 1;
                const isTop3 = rank <= 3;

                return (
                  <motion.a
                    key={game.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: idx * 0.02 }}
                    href={`https://store.steampowered.com/app/${game.id}`}
                    target="_blank"
                    className="group flex items-center gap-4 p-3 rounded-xl bg-[var(--bg-card)] border border-white/5 hover:border-[#3BA55D]/50 transition-all hover:bg-[var(--bg-card)]/80"
                  >
                    {/* Rank */}
                    <div className="w-8 h-8 flex items-center justify-center text-sm font-bold text-[var(--text-muted)]">
                      {isTop3 ? (
                        <span className={rank === 1 ? 'text-yellow-500' : rank === 2 ? 'text-gray-300' : 'text-amber-600'}>
                          #{rank}
                        </span>
                      ) : (
                        <span className="text-xs text-[var(--text-muted)]/50">#{rank}</span>
                      )}
                    </div>

                    {/* Thumbnail */}
                    <div className="relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={game.image}
                        alt={game.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {isTop3 && (
                        <div className="absolute top-1 left-1">
                          <Trophy size={12} className={rank === 1 ? 'text-yellow-500' : 'text-[var(--text-muted)]'} />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white group-hover:text-[#3BA55D] transition-colors truncate">
                        {game.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-sm text-[#3BA55D] font-medium flex items-center gap-1">
                          <Clock size={12} />
                          {formatHours(game.playtime)}
                        </span>
                        {game.lastPlayed && (
                          <span className="text-xs text-[var(--text-muted)]">
                            {formatLastPlayed(game.lastPlayed)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Progress indicator */}
                    <div className="hidden sm:flex flex-col items-end gap-1 w-32">
                      <span className="text-xs text-[var(--text-muted)]">
                        {Math.round((game.playtime / games[0].playtime) * 100)}%
                      </span>
                      <div className="w-full h-1 bg-[var(--bg-primary)] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#3BA55D] to-[#2E8F4E] rounded-full"
                          style={{ width: `${(game.playtime / games[0].playtime) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* External link indicator */}
                    <ExternalLink size={16} className="text-[var(--text-muted)] group-hover:text-white transition-colors opacity-0 group-hover:opacity-100" />
                  </motion.a>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty State */}
        {filteredAndSortedGames.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="inline-flex p-4 rounded-2xl bg-[var(--bg-card)] border border-white/5 mb-4">
              <Search size={32} className="text-[var(--text-muted)]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No games found</h3>
            <p className="text-[var(--text-muted)]">
              No games match your search for &quot;{searchQuery}&quot;
            </p>
          </motion.div>
        )}

        {/* Load More Button */}
        {hasMoreGames && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mt-12"
          >
            <button
              onClick={() => setVisibleCount((prev) => prev + GAMES_PER_BATCH)}
              className="group relative w-full max-w-md overflow-hidden rounded-2xl backdrop-blur-md transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              {/* Glow border effect on hover */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(59, 165, 93, 0.5), rgba(59, 165, 93, 0.1), rgba(59, 165, 93, 0.5))',
                  padding: '1px',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude'
                }}
              />
              
              <div className="flex items-center gap-4 p-5 relative z-10">
                {/* Icon */}
                <div 
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:border-[#3BA55D]/30"
                  style={{
                    background: 'rgba(59, 165, 93, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <LayoutGrid size={24} className="text-[#3BA55D]" />
                </div>
                
                {/* Text */}
                <div className="flex-1 text-left">
                  <div className="text-white font-semibold text-lg">
                    Load More Games
                  </div>
                  <div className="text-gray-400 text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#3BA55D] animate-pulse"></span>
                    {remainingCount} more games remaining
                  </div>
                </div>
                
                {/* Arrow button */}
                <div 
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 group-hover:bg-[#3BA55D]/20"
                  style={{ background: 'rgba(255, 255, 255, 0.05)' }}
                >
                  <ChevronDown 
                    size={20} 
                    className="text-gray-400 group-hover:text-[#3BA55D] group-hover:translate-y-0.5 transition-all duration-300" 
                  />
                </div>
              </div>
              
              {/* Progress bar with glow */}
              <div className="h-1 relative overflow-hidden" style={{ background: 'rgba(0, 0, 0, 0.2)' }}>
                <motion.div
                  className="h-full relative"
                  style={{
                    background: 'linear-gradient(90deg, #3BA55D, #4ade80, #3BA55D)',
                    boxShadow: '0 0 10px rgba(59, 165, 93, 0.5)'
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(visibleCount / filteredAndSortedGames.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                >
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                      animation: 'shimmer 2s infinite'
                    }}
                  />
                </motion.div>
              </div>
            </button>
            
            {/* Shimmer animation keyframes */}
            <style>{`
              @keyframes shimmer {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
              }
            `}</style>
          </motion.div>
        )}

        {/* All Loaded Indicator */}
        {!hasMoreGames && filteredAndSortedGames.length > GAMES_PER_BATCH && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-12 py-4"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#3BA55D]/10 border border-[#3BA55D]/20">
              <Trophy size={16} className="text-[#3BA55D]" />
              <span className="text-sm text-[var(--text-secondary)]">
                All {filteredAndSortedGames.length} games loaded
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </SectionReveal>
  );
}
