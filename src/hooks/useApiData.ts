import { useQuery } from '@tanstack/react-query';
import type { Profile, AnimeStats, TierAnime, TierData, GamingStats, WebsiteData, NowWatching } from '../types/api';

const ELECTRON_API_PORT = 8765;
const ELECTRON_API_URL = `http://localhost:${ELECTRON_API_PORT}`;

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

// Vercel Cloud API URL (same domain for production, configurable for dev)
const VERCEL_API_URL = import.meta.env.VERCEL_URL 
  ? `https://${import.meta.env.VERCEL_URL}` 
  : (typeof window !== 'undefined' ? window.location.origin : '');

async function fetchNowWatching(): Promise<NowWatching> {
  // Try 1: Vercel Cloud API (primary - works everywhere)
  try {
    const res = await fetch(`${VERCEL_API_URL}/api/now-watching`);
    if (!res.ok) throw new Error('Failed to fetch from Vercel API');
    const data = await res.json();
    // Only use cloud data if it's actually watching
    if (data.isWatching) {
      return data;
    }
  } catch (error) {
    console.debug('Vercel API unavailable:', error);
  }

  // Try 2: Local FoxCLI App (works when running locally)
  try {
    const res = await fetch(`${ELECTRON_API_URL}/api/now-watching`);
    if (!res.ok) throw new Error('Failed to fetch from Electron API');
    return res.json();
  } catch {
    console.debug('Local FoxCLI unavailable');
  }

  // Fallback: Not watching
  return {
    isWatching: false,
    timestamp: new Date().toISOString(),
  };
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
