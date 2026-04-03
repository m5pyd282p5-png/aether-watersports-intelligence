export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
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
export interface Spot {
  id: string;
  name: string;
  location: string;
  image: string;
  description: string;
  generalRating: number;
  sportRatings: SportRatings;
  forecast: ForecastPoint[];
  aiInsight: AiInsight;
}
export interface User {
  id: string;
  name: string;
}