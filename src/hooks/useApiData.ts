import { useQuery } from '@tanstack/react-query';
import type { Profile, AnimeStats, TierAnime, TierData, GamingStats, WebsiteData, NowWatching } from '../types/api';

async function fetchWebsiteData(): Promise<WebsiteData> {
  const res = await fetch('/data.json');
  if (!res.ok) throw new Error('Failed to load data');
  return res.json();
}

export function useProfile() {
  return useQuery<Profile, Error>({
    queryKey: ['profile'],
    queryFn: async () => {
      const data = await fetchWebsiteData();
      return data.profile;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useAnimeStats() {
  return useQuery<AnimeStats | null, Error>({
    queryKey: ['anime-stats'],
    queryFn: async () => {
      const data = await fetchWebsiteData();
      return data.anime.stats;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useTop10() {
  return useQuery<TierAnime[], Error>({
    queryKey: ['anime-top10'],
    queryFn: async () => {
      const data = await fetchWebsiteData();
      return data.anime.top10 ?? [];
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useTiers() {
  return useQuery<TierData[], Error>({
    queryKey: ['anime-tiers'],
    queryFn: async () => {
      const data = await fetchWebsiteData();
      return data.anime.tiers ?? [];
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useGamingStats() {
  return useQuery<GamingStats | null, Error>({
    queryKey: ['gaming-stats'],
    queryFn: async () => {
      const data = await fetchWebsiteData();
      return data.gaming.stats;
    },
    staleTime: 5 * 60 * 1000,
  });
}

// Vercel Cloud API URL (same domain for production)
const VERCEL_API_URL = typeof window !== 'undefined' ? window.location.origin : '';

async function fetchNowWatching(): Promise<NowWatching> {
  // Use Vercel Cloud API only - no localhost fallback needed with cloud sync
  try {
    const res = await fetch(`${VERCEL_API_URL}/api/now-watching`);
    if (!res.ok) throw new Error('Failed to fetch from Vercel API');
    return res.json();
  } catch (error) {
    console.debug('Now watching API error:', error);
    // Return not watching state on error
    return {
      isWatching: false,
      timestamp: new Date().toISOString(),
    };
  }
}

export function useNowWatching() {
  return useQuery<NowWatching, Error>({
    queryKey: ['now-watching'],
    queryFn: fetchNowWatching,
    refetchInterval: 5000,
    staleTime: 0,
    retry: false,
  });
}
