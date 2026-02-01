export interface WebsiteSettings {
  enabled: boolean;
  apiPort: number;
  displayName: string;
  bio: string;
  avatar: string;
  socials: {
    discord?: string;
    twitter?: string;
    mal?: string;
    github?: string;
  };
  showAnimeStats: boolean;
  showGamingStats: boolean;
  showTierList: boolean;
  showTop10: boolean;
}

export interface Profile {
  displayName: string;
  bio: string;
  avatar: string;
  socials: {
    discord?: string;
    twitter?: string;
    mal?: string;
    github?: string;
  };
}

export interface MALUserStats {
  username: string;
  total_anime: number;
  completed: number;
  watching: number;
  plan_to_watch: number;
  on_hold: number;
  dropped: number;
  total_episodes: number;
  days_watched: number;
  mean_score: number;
}

export interface TierAnime {
  id: number;
  title: string;
  image: string;
  score: number;
}

export type TierName = 'S+' | 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export interface TierData {
  name: TierName;
  color: string;
  items: TierAnime[];
}

export interface GenreData {
  name: string;
  count: number;
  percentage: number;
}

export interface ScoreData {
  score: number;
  count: number;
}

export interface SeasonalData {
  season: string;
  year: number;
  count: number;
  avgScore: number;
  color: string;
  emoji: string;
  topAnime: {
    id: number;
    title: string;
    image: string;
    score: number;
  }[];
}

export interface LengthData {
  category: string;
  range: string;
  count: number;
  percentage: number;
  avgScore: number;
  color: string;
  description: string;
}

export interface AnimeStats {
  userStats: MALUserStats | null;
  genres: GenreData[];
  scores: ScoreData[];
  seasonalStats?: SeasonalData[];
  lengthStats?: LengthData[];
}

export interface SteamGame {
  id: number;
  title: string;
  image: string;
  playtime: number;
  lastPlayed?: string;
}

export interface GamingStats {
  totalPlaytime: number;
  totalGames: number;
  mostPlayed: SteamGame[];
  games: SteamGame[];
}

export interface WebsiteData {
  lastUpdated: string;
  profile: Profile;
  anime: {
    stats: AnimeStats | null;
    top10: TierAnime[];
    tiers: TierData[];
  };
  gaming: {
    stats: GamingStats | null;
  };
}

export interface ApiHealth {
  status: 'ok' | 'error';
  timestamp: string;
  version: string;
}

export interface NowWatching {
  isWatching: boolean;
  title?: string;
  episode?: string;
  season?: string;
  image?: string;
  progress?: {
    current: number;
    duration: number;
  };
  source?: string;
  timestamp: string;
}