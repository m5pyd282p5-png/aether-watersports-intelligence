import { Spot, User } from './types';
const generateForecast = (baseSpeed: number): any[] => {
  return Array.from({ length: 24 }).map((_, i) => ({
    time: `${i}:00`,
    windSpeed: baseSpeed + Math.sin(i / 3) * 5 + Math.random() * 2,
    gust: baseSpeed + 8 + Math.sin(i / 3) * 5 + Math.random() * 4,
    direction: 310 + Math.random() * 20,
  }));
};
export const MOCK_SPOTS: Spot[] = [
  {
    id: 'prasonisi-rhodes',
    name: 'Prasonisi',
    location: 'Rhodes, Greece',
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&q=80&w=800',
    description: 'The world-famous meeting point of two seas. Flat water on one side, waves on the other.',
    generalRating: 9.5,
    sportRatings: { windsurf: 10, kite: 9, wing: 8, surf: 4 },
    forecast: generateForecast(22),
    aiInsight: {
      summary: "Meltemi is pumping. Solid 22-28 knots expected from noon. Perfect for smaller sails.",
      idealSport: "Windsurf",
      timeframe: "12:00 - 19:00",
      confidence: 0.95
    },
    lat: 35.92,
    lng: 27.79,
    bestDirection: "NE Meltemi"
  },
  {
    id: 'golden-beach-paros',
    name: 'Golden Beach',
    location: 'Paros, Greece',
    image: 'https://images.unsplash.com/photo-1544551763-47a0159f9234?auto=format&fit=crop&q=80&w=800',
    description: 'Crystal clear waters and consistent side-shore winds.',
    generalRating: 8.8,
    sportRatings: { windsurf: 9, kite: 7, wing: 9, surf: 2 },
    forecast: generateForecast(18),
    aiInsight: {
      summary: "Steady thermal breeze building up. Ideal for wingfoiling progression in the bay.",
      idealSport: "Wingfoil",
      timeframe: "14:00 - 18:30",
      confidence: 0.88
    },
    lat: 37.01,
    lng: 25.24,
    bestDirection: "N Thermal"
  },
  {
    id: 'vassiliki-lefkada',
    name: 'Vassiliki',
    location: 'Lefkada, Greece',
    image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&q=80&w=800',
    description: 'Famous for "Eric", the strong cross-shore wind that kicks in every afternoon.',
    generalRating: 9.2,
    sportRatings: { windsurf: 10, kite: 4, wing: 8, surf: 1 },
    forecast: generateForecast(20),
    aiInsight: {
      summary: "Thermal pressure looks good. Expect the cross-shore blast to start around 15:30.",
      idealSport: "Windsurf",
      timeframe: "15:30 - 20:00",
      confidence: 0.92
    },
    lat: 38.62,
    lng: 20.60,
    bestDirection: "SW Eric"
  },
  {
    id: 'keros-limnos',
    name: 'Keros Beach',
    location: 'Limnos, Greece',
    image: 'https://images.unsplash.com/photo-1534120247760-c44c3e4a62f1?auto=format&fit=crop&q=80&w=800',
    description: 'A vast bay with super shallow turquoise water. A paradise for kitesurfers and wingfoilers.',
    generalRating: 9.0,
    sportRatings: { windsurf: 8, kite: 10, wing: 9, surf: 3 },
    forecast: generateForecast(19),
    aiInsight: {
      summary: "Limnos is catching the full force of the Aegean Meltemi today. Endless flat water speed runs.",
      idealSport: "Kitesurf",
      timeframe: "10:00 - 19:00",
      confidence: 0.94
    },
    lat: 39.91,
    lng: 25.36,
    bestDirection: "NE Meltemi"
  },
  {
    id: 'mikri-vigla-naxos',
    name: 'Mikri Vigla',
    location: 'Naxos, Greece',
    image: 'https://images.unsplash.com/photo-1506929013022-77735952d7e5?auto=format&fit=crop&q=80&w=800',
    description: 'The windiest spot in the Cyclades. The wind is accelerated by a funnel effect between Naxos and Paros.',
    generalRating: 9.4,
    sportRatings: { windsurf: 9, kite: 10, wing: 9, surf: 2 },
    forecast: generateForecast(24),
    aiInsight: {
      summary: "Extreme venturi effect in the channel. Hold on to your gear, it's going to be wild.",
      idealSport: "Kitesurf",
      timeframe: "11:00 - 18:00",
      confidence: 0.96
    },
    lat: 37.02,
    lng: 25.37,
    bestDirection: "N Meltemi"
  },
  {
    id: 'loutsa-artemida',
    name: 'Loutsa (Artemida)',
    location: 'Attica, Greece',
    image: 'https://images.unsplash.com/photo-1500375591448-4a4c84450bd8?auto=format&fit=crop&q=80&w=800',
    description: 'The home spot for many Athenians. Shallow water and reliable North winds.',
    generalRating: 8.2,
    sportRatings: { windsurf: 9, kite: 6, wing: 8, surf: 2 },
    forecast: generateForecast(16),
    aiInsight: {
      summary: "Close-to-city session alert. The North thermal is steady enough for a large-sail blast.",
      idealSport: "Windsurf",
      timeframe: "14:00 - 19:00",
      confidence: 0.85
    },
    lat: 37.97,
    lng: 24.01,
    bestDirection: "N Thermal"
  }
];
export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Alex Windrider' }
];