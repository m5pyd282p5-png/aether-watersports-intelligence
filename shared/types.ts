export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
export type SpotDifficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
export type CrowdLevel = 'Low' | 'Medium' | 'High' | 'Crowded';
export interface SportRatings {
  windsurf: number;
  kite: number;
  wing: number;
  surf: number;
}
export interface ForecastPoint {
  time: string;
  windSpeed: number;
  gust: number;
  direction: number; // degrees
  waveHeight?: number;
}
export interface AiInsight {
  summary: string;
  idealSport: 'Windsurf' | 'Kitesurf' | 'Wingfoil' | 'Surf';
  timeframe: string;
  confidence: number;
}
export interface RecommendedGear {
  sport: keyof SportRatings;
  sizeRange: string;
}
export interface SchoolInfo {
  name: string;
  distanceKm: number;
  phone?: string;
  website?: string;
}
export interface Spot {
  id: string;
  name: string;
  location: string;
  region: string;
  image: string;
  description: string;
  generalRating: number;
  sportRatings: SportRatings;
  forecast: ForecastPoint[];
  aiInsight: AiInsight;
  lat: number;
  lng: number;
  bestDirection: string;
  // New Practical Intelligence Fields
  difficulty: SpotDifficulty;
  facilities: string[];
  crowd: CrowdLevel;
  tips: string[];
  launchArea: string;
  bestGear: RecommendedGear[];
  schoolInfo: SchoolInfo[];
}
export interface User {
  id: string;
  name: string;
}