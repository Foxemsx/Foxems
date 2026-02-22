import { useState, useMemo, useEffect, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Film, Star, BarChart3, TrendingUp, Sparkles, Grid3X3, Dna, RotateCcw, ChevronRight, Calendar, Bookmark, Trophy, Flame, Medal, Crown, type LucideIcon } from 'lucide-react';
import { useAnimeStats } from '../hooks/useApiData';
import SectionReveal from './SectionReveal';
import type { GenreData, SeasonalData, LengthData } from '../types/api';

const COLORS = ['#5865F2', '#EB459E', '#F0B132', '#3BA55D', '#9B59B6', '#E67E73', '#00ADB5', '#ED4245'];

function StatCard({ icon: Icon, label, value, subLabel, color, delay, badge, progress, tags }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="rounded-2xl p-6 border relative overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-[1.02]"
      style={{ 
        background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
        borderColor: `${color}30`
      }}
    >
      {/* Hover glow effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: `linear-gradient(135deg, ${color}10 0%, transparent 100%)` }}
      />
      
      <div className="relative z-10">
        {/* Header with icon and badge */}
        <div className="flex items-center justify-between mb-4">
          <div 
            className="w-14 h-14 rounded-xl flex items-center justify-center relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)` }}
          >
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
            <Icon size={28} className="text-white relative z-10" />
          </div>
          
          {badge && (
            <div className="text-right">
              <div className="text-xs font-medium" style={{ color }}>{badge.label}</div>
              <div className="text-xs text-white/40">{badge.sublabel}</div>
            </div>
          )}
        </div>
        
        {/* Value and Label */}
        <div className="text-3xl font-black text-white mb-1">{value}</div>
        <div className="text-sm font-bold text-white/60">{label}</div>
        {subLabel && <div className="text-xs text-white/40 mt-1">{subLabel}</div>}
        
        {/* Progress bar */}
        {progress && (
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-white/40">{progress.label}</span>
              <span style={{ color }}>{progress.percent}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${progress.percent}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: delay + 0.2 }}
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${color} 0%, ${color}dd 100%)` }}
              />
            </div>
          </div>
        )}
        
        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag: any, idx: number) => (
              <span 
                key={idx}
                className="px-2 py-1 rounded text-xs font-medium"
                style={{ backgroundColor: `${color}20`, color: `${color}dd` }}
              >
                {tag.label} {tag.value}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function TasteDNAChart({ genres }: { genres: GenreData[] }) {
  const topGenres = genres.slice(0, 8);
  const size = 280;
  const center = size / 2;
  const maxRadius = size / 2 - 50;
  const levels = 5;

  if (topGenres.length < 3) return null;

  const angleStep = (2 * Math.PI) / topGenres.length;
  const maxCount = topGenres[0]?.count || 1;

  const radarPoints = topGenres.map((genre, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const normalizedScore = genre.count / maxCount;
    const radius = normalizedScore * maxRadius;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
      name: genre.name,
      count: genre.count,
      angle,
      color: COLORS[i % COLORS.length],
    };
  });

  const pathData = radarPoints.map((p, i) =>
    `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
  ).join(' ') + ' Z';

  return (
    <div className="flex items-center justify-center">
      <svg width={size} height={size} className="overflow-visible">
        {/* Background levels */}
        {Array.from({ length: levels }).map((_, level) => {
          const levelRadius = ((level + 1) / levels) * maxRadius;
          const levelPoints = topGenres.map((_, i) => {
            const angle = i * angleStep - Math.PI / 2;
            return `${center + levelRadius * Math.cos(angle)},${center + levelRadius * Math.sin(angle)}`;
          }).join(' ');
          return (
            <polygon
              key={level}
              points={levelPoints}
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth={1}
              opacity={0.3 + (level / levels) * 0.3}
            />
          );
        })}

        {/* Axis lines */}
        {radarPoints.map((p, i) => (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={center + maxRadius * Math.cos(p.angle)}
            y2={center + maxRadius * Math.sin(p.angle)}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={1}
            opacity={0.3}
          />
        ))}

        {/* Data polygon with gradient fill */}
        <defs>
          <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5865F2" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#EB459E" stopOpacity="0.5" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <motion.path
          d={pathData}
          fill="url(#radarGradient)"
          stroke="#5865F2"
          strokeWidth={2}
          filter="url(#glow)"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ transformOrigin: 'center' }}
        />

        {/* Data points */}
        {radarPoints.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={5}
            fill={p.color}
            stroke="white"
            strokeWidth={2}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ delay: 0.1 * i, duration: 0.3 }}
          />
        ))}

        {/* Labels */}
        {radarPoints.map((p, i) => {
          const labelRadius = maxRadius + 30;
          const labelX = center + labelRadius * Math.cos(p.angle);
          const labelY = center + labelRadius * Math.sin(p.angle);
          const isRight = Math.cos(p.angle) > 0;
          const isBottom = Math.sin(p.angle) > 0;

          return (
            <g key={`label-${i}`}>
              <text
                x={labelX}
                y={labelY}
                textAnchor={Math.abs(Math.cos(p.angle)) < 0.1 ? 'middle' : isRight ? 'start' : 'end'}
                dominantBaseline={Math.abs(Math.sin(p.angle)) < 0.1 ? 'middle' : isBottom ? 'hanging' : 'alphabetic'}
                fill="rgba(255,255,255,0.7)"
                fontSize={10}
                fontWeight={500}
              >
                {p.name}
              </text>
              <text
                x={labelX}
                y={labelY + 12}
                textAnchor={Math.abs(Math.cos(p.angle)) < 0.1 ? 'middle' : isRight ? 'start' : 'end'}
                dominantBaseline={Math.abs(Math.sin(p.angle)) < 0.1 ? 'middle' : isBottom ? 'hanging' : 'alphabetic'}
                fill={p.color}
                fontSize={9}
                fontWeight={600}
              >
                {p.count}
              </text>
            </g>
          );
        })}

        {/* Center label */}
        <text
          x={center}
          y={center - 6}
          textAnchor="middle"
          fill="white"
          fontSize={12}
          fontWeight={700}
          opacity={0.9}
        >
          TASTE
        </text>
        <text
          x={center}
          y={center + 8}
          textAnchor="middle"
          fill="#5865F2"
          fontSize={12}
          fontWeight={700}
        >
          DNA
        </text>
      </svg>
    </div>
  );
}

const GenreBar = forwardRef<HTMLDivElement, { genre: GenreData; index: number; maxCount: number }>(
  ({ genre, index, maxCount }, ref) => {
    const percentage = (genre.count / maxCount) * 100;
    const color = COLORS[index % COLORS.length];

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ delay: index * 0.03, duration: 0.3 }}
        className="group"
      >
      <div className="flex justify-between text-sm mb-2">
        <span className="font-bold text-[var(--text-secondary)] group-hover:text-white transition-colors">
          {genre.name}
        </span>
        <span className="font-bold text-white">{genre.count}</span>
      </div>
      <div className="h-2.5 w-full bg-[#0F1014] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.6, delay: 0.1 + index * 0.03, ease: 'easeOut' }}
          className="h-full rounded-full relative"
          style={{ backgroundColor: color }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 rounded-full" />
        </motion.div>
      </div>
    </motion.div>
    );
  }
);

function ScoreDistributionGraph({ scores }: { scores: { score: number; count: number }[] }) {
  const maxCount = Math.max(...scores.map(s => s.count), 1);
  const totalScored = scores.reduce((acc, s) => acc + s.count, 0);
  const dominantScore = scores.reduce((max, s) => s.count > max.count ? s : max, scores[0]);
  const avgScore = scores.reduce((acc, s) => acc + s.score * s.count, 0) / totalScored;

  const getScoreColor = (score: number) => {
    const colors: { [key: number]: string } = {
      1: '#ED4245', 2: '#E67E73', 3: '#F0B132', 4: '#99AAB5',
      5: '#5865F2', 6: '#5865F2', 7: '#3BA55D', 8: '#3BA55D',
      9: '#9B59B6', 10: '#EB459E'
    };
    return colors[score] || '#5865F2';
  };

  const sortedScores = [...scores].sort((a, b) => b.score - a.score);
  
  return (
    <div className="space-y-4">
      {/* Visual Bars */}
      <div className="space-y-2">
        {sortedScores.map((score, i) => {
          const percentage = (score.count / maxCount) * 100;
          const percentageOfTotal = Math.round((score.count / totalScored) * 100);
          const isDominant = score.score === dominantScore.score;
          const color = getScoreColor(score.score);
          
          return (
            <motion.div
              key={score.score}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="relative group"
            >
              <div className="flex items-center gap-3">
                {/* Score Label */}
                <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm"
                  style={{ backgroundColor: `${color}20`, color: color }}
                >
                  {score.score}
                </div>
                
                {/* Bar Container */}
                <div className="flex-1 relative h-10 bg-[#0F1014] rounded-xl overflow-hidden">
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, ${color}10 10px, ${color}10 20px)`
                  }} />
                  
                  {/* Animated bar */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, delay: 0.1 + i * 0.05, ease: 'easeOut' }}
                    className="h-full rounded-xl relative overflow-hidden"
                    style={{ 
                      background: `linear-gradient(90deg, ${color}40 0%, ${color} 100%)`,
                    }}
                  >
                    {/* Shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{ duration: 1.5, delay: 0.5 + i * 0.05, ease: 'easeInOut' }}
                    />
                  </motion.div>
                  
                  {/* Count label inside bar */}
                  <div className="absolute inset-0 flex items-center px-3">
                    <span className="text-sm font-bold text-white drop-shadow-md">
                      {score.count} {score.count === 1 ? 'anime' : 'anime'}
                    </span>
                  </div>
                  
                  {/* Dominant badge */}
                  {isDominant && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.05 }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded-full text-[10px] font-bold"
                      style={{ backgroundColor: `${color}40`, color: 'white' }}
                    >
                      TOP
                    </motion.div>
                  )}
                </div>
                
                {/* Percentage */}
                <div className="w-12 text-right">
                  <span className="text-xs font-medium text-[var(--text-muted)]">
                    {percentageOfTotal}%
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="pt-4 border-t border-white/10"
      >
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-black text-white">{totalScored}</div>
            <div className="text-xs text-[var(--text-muted)]">Total Scored</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black" style={{ color: getScoreColor(Math.round(avgScore)) }}>
              {avgScore.toFixed(2)}
            </div>
            <div className="text-xs text-[var(--text-muted)]">Average Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black" style={{ color: getScoreColor(dominantScore.score) }}>
              {dominantScore.score}
            </div>
            <div className="text-xs text-[var(--text-muted)]">Most Given</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

interface LibraryStatusItem {
  label: string;
  value: number;
  color: string;
}

function LibraryStatusList({ stats }: { stats: LibraryStatusItem[] }) {
  const totalCount = stats.reduce((acc, s) => acc + s.value, 0);
  const maxCount = Math.max(...stats.map(s => s.value), 1);

  const sortedStats = [...stats].sort((a, b) => b.value - a.value);
  
  return (
    <div className="space-y-3">
      {sortedStats.map((stat, i) => {
        const percentage = (stat.value / maxCount) * 100;
        
        return (
          <div key={stat.label}>
            <div className="flex items-center justify-between mb-1.5">
              <span 
                className="text-base font-bold"
                style={{ color: stat.color }}
              >
                {stat.label}
              </span>
              <span className="text-xl font-black text-white">{stat.value}</span>
            </div>
            <div className="h-2 w-full bg-[#0F1014] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${percentage}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="h-full rounded-full"
                style={{ backgroundColor: stat.color }}
              />
            </div>
          </div>
        );
      })}
      
      <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between">
        <span className="text-sm font-medium text-[var(--text-muted)]">Total Library</span>
        <span className="text-2xl font-black text-white">{totalCount}</span>
      </div>
    </div>
  );
}

function LengthPreferenceGraph({ stats }: { stats: LengthData[] }) {
  const maxCount = Math.max(...stats.map(s => s.count), 1);
  const totalCount = stats.reduce((acc, s) => acc + s.count, 0);
  const dominant = stats.reduce((max, s) => s.count > max.count ? s : max, stats[0]);

  const sortedStats = [...stats].sort((a, b) => b.count - a.count);
  
  return (
    <div className="space-y-5">
      {/* Visual Bars */}
      <div className="space-y-3">
        {sortedStats.map((stat, i) => {
          const percentage = (stat.count / maxCount) * 100;
          const isDominant = stat.category === dominant.category;
          
          return (
            <motion.div
              key={stat.category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="relative"
            >
              <div className="flex items-center gap-3 mb-1">
                <div className="w-16 text-xs font-bold uppercase tracking-wider" style={{ color: stat.color }}>
                  {stat.category}
                </div>
                <div className="flex-1 relative h-8 bg-[#0F1014] rounded-lg overflow-hidden">
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-30" style={{
                    backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, ${stat.color}10 10px, ${stat.color}10 20px)`
                  }} />
                  
                  {/* Animated bar */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: 'easeOut' }}
                    className="h-full rounded-lg relative overflow-hidden"
                    style={{ 
                      background: `linear-gradient(90deg, ${stat.color}40 0%, ${stat.color} 100%)`,
                    }}
                  >
                    {/* Shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{ duration: 1.5, delay: 0.5 + i * 0.1, ease: 'easeInOut' }}
                    />
                  </motion.div>
                  
                  {/* Count label inside bar */}
                  <div className="absolute inset-0 flex items-center px-2">
                    <span className="text-sm font-bold text-white drop-shadow-md">
                      {stat.count}
                    </span>
                  </div>
                </div>
                <div className="w-12 text-right">
                  <span className="text-xs font-medium text-[var(--text-muted)]">
                    {stat.percentage}%
                  </span>
                </div>
              </div>
              
              {/* Range label */}
              <div className="flex items-center gap-3 text-[10px] text-[var(--text-muted)]">
                <div className="w-16" />
                <span>{stat.range}</span>
                {isDominant && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="ml-auto px-2 py-0.5 rounded-full text-[10px] font-bold"
                    style={{ backgroundColor: `${stat.color}30`, color: stat.color }}
                  >
                    TOP
                  </motion.span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="pt-4 border-t border-white/10"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: dominant.color }}
            />
            <span className="text-sm font-bold text-white">
              {dominant.category}
            </span>
            <span className="text-xs text-[var(--text-muted)]">
              is Foxems' preferred length
            </span>
          </div>
          <span className="text-xs font-medium text-[var(--text-muted)]">
            {totalCount} anime total
          </span>
        </div>
      </motion.div>
    </div>
  );
}

function SeasonalTimeline({ stats }: { stats: SeasonalData[] }) {
  const [selectedSeason, setSelectedSeason] = useState<string | null>(null);

  const getSelectedSeasonData = () => {
    if (!selectedSeason) return null;
    return stats.find(s => `${s.season}-${s.year}` === selectedSeason);
  };
  
  const selectedData = getSelectedSeasonData();
  
  return (
    <div className="space-y-6">
      {/* Season Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {stats.slice(0, 12).map((season, i) => {
          const key = `${season.season}-${season.year}`;
          const isSelected = selectedSeason === key;
          
          return (
            <motion.button
              key={key}
              onClick={() => setSelectedSeason(isSelected ? null : key)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`relative p-4 rounded-2xl border transition-all duration-300 text-left ${
                isSelected 
                  ? 'bg-[#0F1014] border-white/30 shadow-lg' 
                  : 'bg-[#16181D] border-white/5 hover:border-white/20'
              }`}
              style={isSelected ? { borderColor: season.color } : {}}
            >
              {/* Season Emoji & Badge */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{season.emoji}</span>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: season.color }}
                  />
                )}
              </div>
              
              {/* Season Info */}
              <div className="text-sm font-bold text-white mb-1">
                {season.season}
              </div>
              <div className="text-xs text-[var(--text-muted)]">{season.year}</div>
              
              {/* Stats Row */}
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/5">
                <span className="text-sm font-bold" style={{ color: season.color }}>
                  {season.count}
                </span>
                <span className="text-xs text-[var(--text-muted)]">anime</span>
                <div className="flex items-center gap-1 ml-auto">
                  <Star size={10} className="text-yellow-500" fill="currentColor" />
                  <span className="text-xs font-medium text-white">{season.avgScore}</span>
                </div>
              </div>
              
              {/* Selection indicator */}
              {isSelected && (
                <motion.div
                  layoutId="seasonIndicator"
                  className="absolute inset-0 rounded-2xl border-2 pointer-events-none"
                  style={{ borderColor: season.color }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
      
      {/* Expanded Season Details Panel */}
      <AnimatePresence mode="wait">
        {selectedData && (
          <motion.div
            key={selectedSeason}
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div 
              className="p-6 rounded-2xl border"
              style={{ 
                backgroundColor: `${selectedData.color}08`,
                borderColor: `${selectedData.color}30`
              }}
            >
              {/* Panel Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{selectedData.emoji}</span>
                  <div>
                    <h4 className="text-xl font-bold text-white">
                      {selectedData.season} {selectedData.year}
                    </h4>
                    <div className="flex items-center gap-4 mt-1 text-sm">
                      <span style={{ color: selectedData.color }}>
                        {selectedData.count} anime watched
                      </span>
                      <span className="text-[var(--text-muted)]">•</span>
                      <span className="flex items-center gap-1 text-[var(--text-muted)]">
                        <Star size={12} className="text-yellow-500" fill="currentColor" />
                        Average: {selectedData.avgScore}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Close button */}
                <button
                  onClick={() => setSelectedSeason(null)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <RotateCcw size={16} className="text-[var(--text-muted)]" />
                </button>
              </div>
              
              {/* Top Anime Grid */}
              {selectedData.topAnime && selectedData.topAnime.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles size={14} style={{ color: selectedData.color }} />
                    <span className="text-sm font-bold text-white">Top Picks from this Season</span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {selectedData.topAnime.map((anime, idx) => (
                      <motion.a
                        key={anime.id}
                        href={`https://myanimelist.net/anime/${anime.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center gap-4 p-3 rounded-xl bg-[#0F1014] hover:bg-[#16181D] border border-white/5 hover:border-white/15 transition-all group"
                      >
                        <img
                          src={anime.image}
                          alt={anime.title}
                          className="w-12 h-16 object-cover rounded-lg shadow-md"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate group-hover:text-[var(--accent-primary)] transition-colors">
                            {anime.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center gap-1">
                              <Star size={12} className="text-yellow-500" fill="currentColor" />
                              <span className="text-xs font-bold text-white">{anime.score}</span>
                            </div>
                            <span className="text-xs text-[var(--text-muted)]">Your Score</span>
                          </div>
                        </div>
                        <ChevronRight size={16} className="text-[var(--text-muted)] group-hover:text-white transition-colors flex-shrink-0" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Empty state */}
              {(!selectedData.topAnime || selectedData.topAnime.length === 0) && (
                <div className="text-center py-8 text-[var(--text-muted)]">
                  <Film size={32} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No top picks recorded for this season</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* View More Years */}
      {stats.length > 12 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center pt-4"
        >
          <p className="text-xs text-[var(--text-muted)]">
            Showing 12 of {stats.length} seasons • Scroll to see more
          </p>
        </motion.div>
      )}
    </div>
  );
}

const GenreCard = forwardRef<HTMLDivElement, { genre: GenreData; index: number; maxCount: number }>(
  ({ genre, index, maxCount }, ref) => {
    const percentage = Math.round((genre.count / maxCount) * 100);
    const color = COLORS[index % COLORS.length];

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: -10 }}
        transition={{
          delay: index * 0.02,
          duration: 0.35,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        whileHover={{ scale: 1.05, y: -2 }}
        className="group relative"
      >
      <div
        className="relative p-4 rounded-2xl bg-[#0F1014] border border-white/5 overflow-hidden transition-all duration-300 group-hover:border-white/20 group-hover:shadow-lg"
        style={{ boxShadow: `0 0 0 0 ${color}20`, transition: 'all 0.3s ease' }}
      >
        {/* Background glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `linear-gradient(135deg, ${color}10 0%, transparent 100%)` }}
        />

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-2">
            <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
              #{index + 1}
            </span>
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: color }}
            />
          </div>

          <h4 className="font-bold text-white text-sm mb-1 truncate" title={genre.name}>
            {genre.name}
          </h4>

          <div className="flex items-end justify-between">
            <span className="text-2xl font-black" style={{ color }}>
              {genre.count}
            </span>
            <span className="text-xs font-medium text-[var(--text-muted)]">
              {percentage}%
            </span>
          </div>

          {/* Mini progress bar */}
          <div className="mt-3 h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.02 }}
              className="h-full rounded-full"
              style={{ backgroundColor: color }}
            />
          </div>
        </div>
      </div>
    </motion.div>
    );
  }
);

const CompactView = forwardRef<HTMLDivElement, { genres: GenreData[]; maxCount: number }>(
  ({ genres, maxCount }, ref) => {
    const initialGenreCount = 8;
    const displayGenres = genres.slice(0, initialGenreCount);

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
      {/* Left: Taste DNA Radar */}
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={16} className="text-[#F0B132]" />
          <span className="text-sm font-bold text-[var(--text-secondary)]">Taste DNA</span>
        </div>
        <TasteDNAChart genres={genres} />
        <p className="text-xs text-[var(--text-muted)] text-center mt-4 max-w-xs">
          Foxems' top 8 genres by watch count
        </p>
      </div>

      {/* Right: Genre List */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={16} className="text-[#EB459E]" />
          <span className="text-sm font-bold text-[var(--text-secondary)]">
            Top Genres ({initialGenreCount} of {genres.length})
          </span>
        </div>

        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {displayGenres.map((genre, idx) => (
              <GenreBar key={genre.name} genre={genre} index={idx} maxCount={maxCount} />
            ))}
          </AnimatePresence>
        </div>

        {genres.length > initialGenreCount && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xs text-[var(--text-muted)] mt-4 text-center"
          >
            +{genres.length - initialGenreCount} more genres available
          </motion.p>
        )}
      </div>
    </motion.div>
    );
  }
);

const ExpandedView = forwardRef<HTMLDivElement, { genres: GenreData[]; maxCount: number }>(
  ({ genres, maxCount }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="h-full"
      >
      {/* Stats Summary */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center justify-center gap-8 mb-6"
      >
        <div className="text-center">
          <span className="text-3xl font-black text-white">{genres.length}</span>
          <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mt-1">Total Genres</p>
        </div>
        <div className="w-px h-10 bg-white/10" />
        <div className="text-center">
          <span className="text-3xl font-black text-[#5865F2]">{genres[0]?.count || 0}</span>
          <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mt-1">Top Genre Count</p>
        </div>
        <div className="w-px h-10 bg-white/10" />
        <div className="text-center">
          <span className="text-3xl font-black text-[#EB459E]">
            {Math.round(genres.reduce((acc, g) => acc + g.count, 0) / genres.length)}
          </span>
          <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mt-1">Average</p>
        </div>
      </motion.div>

      {/* Genre Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        <AnimatePresence mode="popLayout">
          {genres.map((genre, idx) => (
            <GenreCard key={genre.name} genre={genre} index={idx} maxCount={maxCount} />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
    );
  }
);

type InsightPanel = 'overview' | 'score' | 'library' | 'length' | 'seasons' | 'genres';

const INSIGHT_META: Record<InsightPanel, { label: string; subtitle: string; color: string; icon: LucideIcon }> = {
  overview: {
    label: 'Overview',
    subtitle: 'Quick essentials',
    color: '#F0B132',
    icon: Sparkles,
  },
  score: {
    label: 'Scores',
    subtitle: 'Rating behavior',
    color: '#5865F2',
    icon: BarChart3,
  },
  library: {
    label: 'Library',
    subtitle: 'Collection status',
    color: '#3BA55D',
    icon: Bookmark,
  },
  length: {
    label: 'Length',
    subtitle: 'Episode preferences',
    color: '#5865F2',
    icon: TrendingUp,
  },
  seasons: {
    label: 'Seasons',
    subtitle: 'Yearly rhythm',
    color: '#F0B132',
    icon: Calendar,
  },
  genres: {
    label: 'Genres',
    subtitle: 'Taste DNA',
    color: '#EB459E',
    icon: Dna,
  },
};

export default function AnimeStats() {
  const { data: stats } = useAnimeStats();
  const [isExpanded, setIsExpanded] = useState(false);
  const [activePanel, setActivePanel] = useState<InsightPanel>('overview');
  const genres = stats?.genres ?? [];
  const scores = stats?.scores ?? [];
  const seasonalStats = stats?.seasonalStats ?? [];
  const lengthStats = stats?.lengthStats ?? [];
  const maxGenreCount = genres[0]?.count || 1;

  const availablePanels = useMemo(() => {
    const panels: InsightPanel[] = ['overview', 'score', 'library'];
    if (lengthStats && lengthStats.length > 0) panels.push('length');
    if (seasonalStats && seasonalStats.length > 0) panels.push('seasons');
    panels.push('genres');
    return panels;
  }, [lengthStats, seasonalStats]);

  useEffect(() => {
    if (!availablePanels.includes(activePanel)) {
      setActivePanel('overview');
    }
  }, [activePanel, availablePanels]);

  if (!stats?.userStats) return null;
  const { userStats } = stats;

  const libraryStats: LibraryStatusItem[] = [
    { label: 'Completed', value: userStats.completed, color: '#3BA55D' },
    { label: 'Watching', value: userStats.watching, color: '#5865F2' },
    { label: 'Plan to Watch', value: userStats.plan_to_watch, color: '#F0B132' },
    { label: 'On Hold', value: userStats.on_hold, color: '#99AAB5' },
    { label: 'Dropped', value: userStats.dropped, color: '#ED4245' },
  ];

  const activePanelIndex = Math.max(availablePanels.indexOf(activePanel), 0);

  const showNextPanel = () => {
    const nextIndex = (activePanelIndex + 1) % availablePanels.length;
    setActivePanel(availablePanels[nextIndex]);
  };

  const renderPanel = (panel: InsightPanel) => {
    if (panel === 'overview') {
      const topGenres = genres.slice(0, 5);
      return (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 rounded-2xl bg-[#16181D] border border-white/5 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles size={16} className="text-[#F0B132]" />
              <h3 className="font-bold text-lg">Need-To-Know Snapshot</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-[#0F1014] border border-white/10 p-4">
                <p className="text-xs uppercase tracking-wider text-[var(--text-muted)]">Titles</p>
                <p className="text-2xl font-black text-white mt-1">{userStats.total_anime}</p>
              </div>
              <div className="rounded-xl bg-[#0F1014] border border-white/10 p-4">
                <p className="text-xs uppercase tracking-wider text-[var(--text-muted)]">Episodes</p>
                <p className="text-2xl font-black text-white mt-1">{userStats.total_episodes.toLocaleString()}</p>
              </div>
              <div className="rounded-xl bg-[#0F1014] border border-white/10 p-4">
                <p className="text-xs uppercase tracking-wider text-[var(--text-muted)]">Watch Time</p>
                <p className="text-2xl font-black text-white mt-1">{userStats.days_watched.toFixed(1)}d</p>
              </div>
              <div className="rounded-xl bg-[#0F1014] border border-white/10 p-4">
                <p className="text-xs uppercase tracking-wider text-[var(--text-muted)]">Mean Score</p>
                <p className="text-2xl font-black text-white mt-1">{userStats.mean_score.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-5">
              <a
                href="#top-10"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F0B132] text-black text-sm font-bold hover:brightness-105 transition-all"
              >
                Jump to Top 10
                <ChevronRight size={14} />
              </a>
              <a
                href="#tier-list"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#5865F2] text-white text-sm font-bold hover:brightness-110 transition-all"
              >
                Jump to Tier List
                <ChevronRight size={14} />
              </a>
            </div>
          </div>

          <div className="rounded-2xl bg-[#16181D] border border-white/5 p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp size={16} className="text-[#EB459E]" />
              <h3 className="font-bold text-lg">Top Genre Pulse</h3>
            </div>
            <div className="space-y-4">
              {topGenres.map((genre, idx) => (
                <GenreBar key={genre.name} genre={genre} index={idx} maxCount={maxGenreCount} />
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (panel === 'score') {
      return (
        <div className="rounded-2xl bg-[#1E2028] border border-white/5 p-6">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="text-[#5865F2]" />
            <div>
              <h3 className="font-bold text-xl">Score Distribution</h3>
              <p className="text-xs text-[var(--text-muted)]">How you rate your anime</p>
            </div>
          </div>
          {scores && scores.length > 0 ? (
            <ScoreDistributionGraph scores={scores} />
          ) : (
            <div className="rounded-xl bg-[#16181D] border border-white/5 py-12 text-center text-sm text-[var(--text-muted)]">
              No score data available yet.
            </div>
          )}
        </div>
      );
    }

    if (panel === 'library') {
      return (
        <div className="rounded-2xl bg-[#1E2028] border border-white/5 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#5865F2]/20 flex items-center justify-center">
              <Bookmark size={20} className="text-[#5865F2]" />
            </div>
            <div>
              <h3 className="font-bold text-xl">Library Status</h3>
              <p className="text-xs text-[var(--text-muted)]">Your anime collection breakdown</p>
            </div>
          </div>
          <LibraryStatusList stats={libraryStats} />
        </div>
      );
    }

    if (panel === 'length') {
      if (!lengthStats || lengthStats.length === 0) {
        return (
          <div className="rounded-2xl bg-[#1E2028] border border-white/5 p-6 text-sm text-[var(--text-muted)]">
            Length preference data is not available.
          </div>
        );
      }
      return (
        <div className="rounded-2xl bg-[#1E2028] border border-white/5 p-6">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="text-[#5865F2]" />
            <div>
              <h3 className="font-bold text-xl">Length Preference</h3>
              <p className="text-xs text-[var(--text-muted)]">Episode count breakdown</p>
            </div>
          </div>
          <LengthPreferenceGraph stats={lengthStats} />
        </div>
      );
    }

    if (panel === 'seasons') {
      if (!seasonalStats || seasonalStats.length === 0) {
        return (
          <div className="rounded-2xl bg-[#1E2028] border border-white/5 p-6 text-sm text-[var(--text-muted)]">
            Seasonal data is not available.
          </div>
        );
      }
      return (
        <div className="rounded-2xl bg-[#1E2028] border border-white/5 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="text-[#F0B132]" />
            <div>
              <h3 className="font-bold text-xl">Seasonal Journey</h3>
              <p className="text-xs text-[var(--text-muted)]">Your anime watching patterns across seasons</p>
            </div>
          </div>
          <SeasonalTimeline stats={seasonalStats} />
        </div>
      );
    }

    return (
      <div className="rounded-2xl bg-[#1E2028] border border-white/5 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5865F2]/20 to-[#EB459E]/20 flex items-center justify-center">
              {isExpanded ? (
                <Grid3X3 size={20} className="text-[#EB459E]" />
              ) : (
                <Dna size={20} className="text-[#5865F2]" />
              )}
            </div>
            <div>
              <h3 className="font-bold text-xl">{isExpanded ? 'All Genres' : 'Genre Analysis'}</h3>
              <p className="text-xs text-[var(--text-muted)]">
                {isExpanded ? `Complete breakdown of all ${genres.length} genres` : 'Genre preference breakdown'}
              </p>
            </div>
          </div>

          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0F1014] border border-white/10 hover:border-white/20 hover:bg-[#15161C] transition-all group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-sm font-bold text-[var(--text-secondary)] group-hover:text-white transition-colors">
              {isExpanded ? 'Show DNA View' : 'Show All Genres'}
            </span>
            <motion.div
              animate={{ rotate: isExpanded ? -360 : 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              {isExpanded ? (
                <RotateCcw size={16} className="text-[#5865F2]" />
              ) : (
                <Grid3X3 size={16} className="text-[#EB459E]" />
              )}
            </motion.div>
          </motion.button>
        </div>

        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {isExpanded ? (
              <ExpandedView key="expanded" genres={genres} maxCount={maxGenreCount} />
            ) : (
              <CompactView key="compact" genres={genres} maxCount={maxGenreCount} />
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  };

  return (
    <SectionReveal id="anime-stats" className="pb-24 pt-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl font-black mb-4">Anime <span className="text-gradient">Statistics</span></h2>
          <p className="text-[var(--text-secondary)] text-lg">A deep dive into my viewing habits.</p>
        </motion.div>

        {/* 1. Main Stats Grid - Gamification Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            icon={Trophy}
            label="Total Titles"
            value={userStats.total_anime}
            color="#5865F2"
            delay={0}
            badge={{ label: `Level ${Math.floor(userStats.total_anime / 50) + 1}`, sublabel: 'Anime Explorer' }}
            progress={{ 
              label: `Next: Collector (${(Math.floor(userStats.total_anime / 50) + 1) * 50})`, 
              percent: Math.round(Math.min(100, (userStats.total_anime % 50) * 2)) 
            }}
            tags={[
              { label: 'Completed', value: userStats.completed },
              { label: 'Watching', value: userStats.watching },
              { label: 'Plan to Watch', value: userStats.plan_to_watch }
            ]}
          />
          <StatCard
            icon={Flame}
            label="Episodes"
            value={userStats.total_episodes.toLocaleString()}
            color="#3BA55D"
            delay={0.1}
            badge={{ label: 'Binge Watcher', sublabel: 'Current Rank' }}
            progress={{ 
              label: `Goal: 2,500 episodes`, 
              percent: Math.round(Math.min(100, (userStats.total_episodes / 2500) * 100)) 
            }}
            tags={[
              { label: 'Avg', value: `${(userStats.total_episodes / (userStats.total_anime || 1)).toFixed(1)}/title` },
              { label: 'Total', value: `${Math.floor(userStats.total_episodes / 24)} days content` }
            ]}
          />
          <StatCard
            icon={Medal}
            label="Time Spent"
            value={`${userStats.days_watched.toFixed(1)}d`}
            subLabel="Total Watch Time"
            color="#F0B132"
            delay={0.2}
            badge={{ label: 'Time Master', sublabel: `${(userStats.days_watched / 365).toFixed(1)} years` }}
            progress={{ 
              label: 'Goal: 50 days watched', 
              percent: Math.round(Math.min(100, (userStats.days_watched / 50) * 100)) 
            }}
            tags={[
              { label: 'Hours', value: Math.floor(userStats.days_watched * 24) },
              { label: 'Minutes', value: Math.floor(userStats.days_watched * 24 * 60) }
            ]}
          />
          <StatCard
            icon={Crown}
            label="Mean Score"
            value={userStats.mean_score.toFixed(2)}
            color="#EB459E"
            delay={0.3}
            badge={{ label: 'Critical Eye', sublabel: userStats.mean_score >= 7.5 ? 'High Rater' : 'Balanced' }}
            progress={{ 
              label: 'Target: 8.0+ rating', 
              percent: Math.round(Math.min(100, (userStats.mean_score / 10) * 100)) 
            }}
            tags={[
              { label: 'Rated', value: `${userStats.completed + userStats.dropped + userStats.on_hold} titles` },
              { label: 'Top', value: userStats.mean_score >= 9 ? 'Elite' : userStats.mean_score >= 8 ? 'Great' : 'Good' }
            ]}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 rounded-3xl bg-[#1E2028] border border-white/5 p-6 sm:p-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={15} className="text-[#F0B132]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                  Insight Deck
                </span>
              </div>
              <h3 className="text-2xl font-black">Focus On What Matters</h3>
              <p className="text-sm text-[var(--text-muted)] mt-1">
                One panel at a time so users can scan fast, then progressively reveal deeper stats.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="#top-10"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F0B132] text-black text-sm font-bold hover:brightness-105 transition-all"
              >
                Top 10
                <ChevronRight size={14} />
              </a>
              <a
                href="#tier-list"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#5865F2] text-white text-sm font-bold hover:brightness-110 transition-all"
              >
                Tier List
                <ChevronRight size={14} />
              </a>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {availablePanels.map((panel) => {
              const meta = INSIGHT_META[panel];
              const Icon = meta.icon;
              const isActive = activePanel === panel;
              return (
                <button
                  key={panel}
                  onClick={() => setActivePanel(panel)}
                  className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
                    isActive
                      ? 'bg-[#0F1014] text-white border-white/20'
                      : 'bg-transparent text-[var(--text-muted)] border-white/10 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <Icon size={15} style={{ color: isActive ? meta.color : undefined }} />
                  <span className="text-sm font-bold">{meta.label}</span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activePanel}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="mt-6"
            >
              {renderPanel(activePanel)}
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
            <div className="text-xs text-[var(--text-muted)]">
              {INSIGHT_META[activePanel].subtitle} - Insight {activePanelIndex + 1} of {availablePanels.length}
            </div>
            <button
              onClick={showNextPanel}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0F1014] border border-white/10 hover:border-white/20 hover:text-white text-sm font-bold text-[var(--text-secondary)] transition-all"
            >
              Show Next Insight
              <ChevronRight size={14} />
            </button>
          </div>
        </motion.div>
      </div>
    </SectionReveal>
  );
}
