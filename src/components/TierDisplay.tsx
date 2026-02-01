import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Layers, ChevronDown, ChevronRight, ExternalLink, Search, X } from 'lucide-react';
import { useTop10, useTiers } from '../hooks/useApiData';
import type { TierName, TierData, TierAnime } from '../types/api';
import SectionReveal from './SectionReveal';

type ViewMode = 'top10' | 'tiers';

const TIER_COLORS: Record<TierName, { bg: string; text: string; gradient: string }> = {
  'S+': { bg: '#F0B132', text: '#000', gradient: 'from-[#F0B132] to-[#F59F00]' },
  'S': { bg: '#EB459E', text: '#fff', gradient: 'from-[#EB459E] to-[#D63384]' },
  'A': { bg: '#5865F2', text: '#fff', gradient: 'from-[#5865F2] to-[#4752C4]' },
  'B': { bg: '#3BA55D', text: '#fff', gradient: 'from-[#3BA55D] to-[#2D7D46]' },
  'C': { bg: '#202225', text: '#fff', gradient: 'from-[#40444B] to-[#2F3136]' },
  'D': { bg: '#202225', text: '#999', gradient: 'from-[#2F3136] to-[#202225]' },
  'E': { bg: '#202225', text: '#777', gradient: 'from-[#2F3136] to-[#202225]' },
  'F': { bg: '#202225', text: '#555', gradient: 'from-[#2F3136] to-[#202225]' },
};

function TierRow({ tier, delay }: { tier: TierData; delay: number }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const colors = TIER_COLORS[tier.name];

  // Get description based on tier name
  const getTierDescription = (tierName: string): string => {
    const descriptions: Record<string, string> = {
      'S+': 'Masterpiece',
      'S': 'Outstanding',
      'A': 'Excellent',
      'B': 'Great',
      'C': 'Good',
      'D': 'Average',
      'E': 'Below Average',
      'F': 'Not Recommended'
    };
    return descriptions[tierName] || '';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="mb-4 rounded-xl overflow-hidden border border-white/5 bg-[#16181D]"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center gap-4 p-4 hover:bg-white/5 transition-colors"
      >
        <div 
          className={`w-12 h-12 rounded-lg flex items-center justify-center font-black text-xl bg-gradient-to-br ${colors.gradient} shadow-lg`}
          style={{ color: colors.text }}
        >
          {tier.name}
        </div>
        <div className="flex-1 text-left">
           <div className="flex items-center gap-3 flex-wrap">
             {/* Tier Name */}
             <span 
               className="font-black text-lg"
               style={{ color: tier.name === 'S+' ? '#F0B132' : tier.name === 'S' ? '#EB459E' : tier.name === 'A' ? '#5865F2' : tier.name === 'B' ? '#3BA55D' : '#fff' }}
             >
               {tier.name}
             </span>
             
             {/* Separator */}
             <span className="text-[var(--text-muted)]">•</span>
             
             {/* Description */}
             <span className="font-semibold text-lg text-white">
               {getTierDescription(tier.name)}
             </span>
             
             {/* Count Badge */}
             <span 
               className="ml-2 px-3 py-1 rounded-full text-sm font-bold"
               style={{ 
                 backgroundColor: `${colors.bg}30`, 
                 color: tier.name === 'S+' || tier.name === 'B' ? colors.bg : '#fff'
               }}
             >
               {tier.items.length} Anime
             </span>
             
             <div className="h-px flex-1 bg-white/10 hidden sm:block" />
           </div>
        </div>
        {isExpanded ? <ChevronDown className="text-[var(--text-muted)]" /> : <ChevronRight className="text-[var(--text-muted)]" />}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {tier.items.map((anime) => (
                <a
                  key={anime.id}
                  href={`https://myanimelist.net/anime/${anime.id}`}
                  target="_blank"
                  className="group relative aspect-[2/3] rounded-lg overflow-hidden bg-[#0F1014]"
                >
                  <img src={anime.image} alt={anime.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ExternalLink size={16} className="text-white" />
                  </div>
                  {anime.score > 0 && (
                    <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-black/80 backdrop-blur-sm">
                      {anime.score}
                    </div>
                  )}
                </a>
              ))}
              {tier.items.length === 0 && (
                <div className="col-span-full py-4 text-center text-sm text-[var(--text-muted)]">
                  No anime in this tier
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function TierDisplay() {
  const [view, setView] = useState<ViewMode>('top10');
  const [searchQuery, setSearchQuery] = useState('');
  const { data: top10 } = useTop10();
  const { data: tiers } = useTiers();

  // Build search index for all anime in tiers
  const searchResults = useMemo(() => {
    if (!searchQuery.trim() || !tiers) return [];
    
    const results: {anime: TierAnime; tier: TierData}[] = [];
    const lowerQuery = searchQuery.toLowerCase();
    
    tiers.forEach(tier => {
      tier.items.forEach(anime => {
        if (anime.title.toLowerCase().includes(lowerQuery)) {
          results.push({ anime, tier });
        }
      });
    });
    
    return results;
  }, [searchQuery, tiers]);

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <SectionReveal id="tier-list" className="py-24 bg-[#0F1014] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#F0B132] font-bold tracking-wider uppercase text-sm mb-2 block">Hall of Fame</span>
            <h2 className="text-4xl font-black">Rankings & <span className="text-[#F0B132]">Tiers</span></h2>
          </motion.div>

          {/* View Toggle */}
          <div className="bg-[#16181D] p-1 rounded-xl border border-white/5 flex">
            <button
              onClick={() => setView('top10')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                view === 'top10' 
                  ? 'bg-[#F0B132] text-black shadow-lg' 
                  : 'text-[var(--text-muted)] hover:text-white'
              }`}
            >
              <Crown size={16} />
              Top 10
            </button>
            <button
              onClick={() => setView('tiers')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                view === 'tiers' 
                  ? 'bg-[#5865F2] text-white shadow-lg' 
                  : 'text-[var(--text-muted)] hover:text-white'
              }`}
            >
              <Layers size={16} />
              Tier List
            </button>
          </div>
        </div>

        {/* Search Bar - Only show in Tier List view */}
        {view === 'tiers' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-4">
              <div className="flex-1 max-w-md flex items-center gap-3 px-4 py-3 rounded-xl bg-[#16181D] border border-white/10">
                <Search className="w-4 h-4 text-[var(--text-muted)]" />
                <input
                  type="text"
                  placeholder="Search for an anime to see its tier..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-[var(--text-muted)]"
                />
                {searchQuery && (
                  <button 
                    onClick={clearSearch}
                    className="p-1 hover:bg-white/10 rounded transition-colors"
                  >
                    <X className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                  </button>
                )}
              </div>
              
              {searchQuery && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-[var(--text-muted)]"
                >
                  {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
                </motion.span>
              )}
            </div>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {view === 'top10' && top10 && top10.length > 0 ? (
            <motion.div
              key="top10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Podium View (Keeping your Top 10 layout) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 items-end">
                {/* #2 */}
                <motion.a href={`https://myanimelist.net/anime/${top10[1]?.id}`} target="_blank" className="relative group order-2 md:order-1 aspect-[3/4] rounded-2xl overflow-hidden border-2 border-[#C0C0C0]/30 bg-[#16181D]">
                  <img src={top10[1]?.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute bottom-4 left-4">
                    <div className="text-[#C0C0C0] font-black text-6xl opacity-20 absolute -top-8 -left-2">2</div>
                    <h3 className="text-white font-bold text-lg relative z-10 line-clamp-2">{top10[1]?.title}</h3>
                  </div>
                </motion.a>
                {/* #1 */}
                <motion.a href={`https://myanimelist.net/anime/${top10[0]?.id}`} target="_blank" className="relative group order-1 md:order-2 aspect-[3/4] rounded-2xl overflow-hidden border-2 border-[#F0B132] shadow-2xl shadow-[#F0B132]/20 bg-[#16181D]">
                  <img src={top10[0]?.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute top-4 right-4 bg-[#F0B132] text-black p-2 rounded-full shadow-lg"><Crown size={24} /></div>
                  <div className="absolute bottom-6 left-6 right-6 text-center">
                    <h3 className="text-white font-black text-2xl mb-2">{top10[0]?.title}</h3>
                  </div>
                </motion.a>
                {/* #3 */}
                <motion.a href={`https://myanimelist.net/anime/${top10[2]?.id}`} target="_blank" className="relative group order-3 aspect-[3/4] rounded-2xl overflow-hidden border-2 border-[#CD7F32]/30 bg-[#16181D]">
                  <img src={top10[2]?.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute bottom-4 left-4">
                    <div className="text-[#CD7F32] font-black text-6xl opacity-20 absolute -top-8 -left-2">3</div>
                    <h3 className="text-white font-bold text-lg relative z-10 line-clamp-2">{top10[2]?.title}</h3>
                  </div>
                </motion.a>
              </div>
              
              {/* Rest of Top 10 */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
                {top10.slice(3, 10).map((anime, idx) => (
                  <a key={anime.id} href={`https://myanimelist.net/anime/${anime.id}`} target="_blank" className="group relative aspect-[2/3] rounded-xl overflow-hidden bg-[#1E2028] border border-white/5 hover:border-white/20 transition-all">
                    <img src={anime.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-black/70 flex items-center justify-center text-[10px] font-bold">{idx + 4}</div>
                  </a>
                ))}
              </div>
            </motion.div>
          ) : searchQuery && searchResults.length > 0 ? (
            /* Search Results View */
            <motion.div
              key="search-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Search Results</h3>
                <button
                  onClick={clearSearch}
                  className="text-sm px-4 py-2 rounded-lg bg-[#16181D] text-[var(--text-muted)] hover:text-white transition-colors"
                >
                  Clear Search
                </button>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {searchResults.map(({ anime, tier }) => {
                  const colors = TIER_COLORS[tier.name];
                  return (
                    <motion.a
                      key={anime.id}
                      href={`https://myanimelist.net/anime/${anime.id}`}
                      target="_blank"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="group relative aspect-[2/3] rounded-xl overflow-hidden bg-[#0F1014] border-2"
                      style={{ borderColor: colors.bg }}
                    >
                      <img src={anime.image} alt={anime.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                      
                      {/* Tier Badge */}
                      <div 
                        className={`absolute top-0 left-0 px-2 py-1 text-[10px] font-black rounded-br bg-gradient-to-br ${colors.gradient}`}
                        style={{ color: colors.text }}
                      >
                        {tier.name}
                      </div>
                      
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ExternalLink size={16} className="text-white" />
                      </div>
                      
                      {anime.score > 0 && (
                        <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-black/80 backdrop-blur-sm">
                          {anime.score}
                        </div>
                      )}
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          ) : searchQuery ? (
            /* No Results View */
            <motion.div
              key="no-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center py-16 rounded-xl bg-[#16181D]"
            >
              <Search className="w-12 h-12 mb-4 text-[var(--text-muted)] opacity-30" />
              <p className="text-[var(--text-muted)]">
                No anime found matching "{searchQuery}"
              </p>
              <button
                onClick={clearSearch}
                className="mt-4 text-sm px-4 py-2 rounded-lg bg-[#0F1014] text-white hover:bg-[#0F1014]/80 transition-colors"
              >
                Clear Search
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="tiers"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {tiers?.map((tier, i) => (
                <TierRow key={tier.name} tier={tier} delay={i * 0.05} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionReveal>
  );
}