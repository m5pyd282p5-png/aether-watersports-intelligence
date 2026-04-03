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
    }
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
    }
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
    }
  }
];
export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Alex Windrider' }
];