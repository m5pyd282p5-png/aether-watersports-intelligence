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
    region: 'Dodecanese',
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
    region: 'Cyclades',
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
    region: 'Ionian',
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
    region: 'North Aegean',
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
    region: 'Cyclades',
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
    region: 'Attica',
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
  },
  {
    id: 'alimos-athens',
    name: 'Alimos',
    location: 'Athens, Greece',
    region: 'Attica',
    image: 'https://images.unsplash.com/photo-1516483642777-66986685834e?auto=format&fit=crop&q=80&w=800',
    description: 'Urban windsurfing at its finest. Convenient city access with surprisingly clean thermal winds.',
    generalRating: 7.8,
    sportRatings: { windsurf: 9, kite: 4, wing: 7, surf: 1 },
    forecast: generateForecast(14),
    aiInsight: {
      summary: "Steady urban thermal breeze. Perfect for a post-work slalom blast.",
      idealSport: "Windsurf",
      timeframe: "16:00 - 19:30",
      confidence: 0.82
    },
    lat: 37.91,
    lng: 23.72,
    bestDirection: "N Thermal"
  },
  {
    id: 'fanari-naxos',
    name: 'Fanari',
    location: 'Naxos, Greece',
    region: 'Cyclades',
    image: 'https://images.unsplash.com/photo-1536411396596-afed9fa3c1b2?auto=format&fit=crop&q=80&w=800',
    description: 'Rugged beauty with aggressive wind acceleration. A favorite for technical kite riders.',
    generalRating: 8.9,
    sportRatings: { windsurf: 7, kite: 10, wing: 9, surf: 3 },
    forecast: generateForecast(21),
    aiInsight: {
      summary: "Intense Meltemi funneling. Expect strong gusts; prepare for big air.",
      idealSport: "Kitesurf",
      timeframe: "11:00 - 17:00",
      confidence: 0.90
    },
    lat: 37.09,
    lng: 25.42,
    bestDirection: "N Meltemi"
  },
  {
    id: 'kalafati-mykonos',
    name: 'Kalafati',
    location: 'Mykonos, Greece',
    region: 'Cyclades',
    image: 'https://images.unsplash.com/photo-1520116468816-95b69f847357?auto=format&fit=crop&q=80&w=800',
    description: 'The windsurfing heart of Mykonos. Long reaches and consistent Meltemi flow.',
    generalRating: 9.1,
    sportRatings: { windsurf: 10, kite: 6, wing: 8, surf: 4 },
    forecast: generateForecast(23),
    aiInsight: {
      summary: "Iconic Mykonos power. The bay is charging with steady 25-knot peaks.",
      idealSport: "Windsurf",
      timeframe: "10:30 - 18:30",
      confidence: 0.94
    },
    lat: 37.40,
    lng: 25.38,
    bestDirection: "N Meltemi"
  },
  {
    id: 'bloom-rhodos',
    name: 'Bloom',
    location: 'Rhodes, Greece',
    region: 'Dodecanese',
    image: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fab35?auto=format&fit=crop&q=80&w=800',
    description: 'A hidden gem offering versatile conditions for all skill levels.',
    generalRating: 8.5,
    sportRatings: { windsurf: 8, kite: 8, wing: 9, surf: 5 },
    forecast: generateForecast(17),
    aiInsight: {
      summary: "Balanced thermal flow. Excellent for multidisciplinary training sessions.",
      idealSport: "Wingfoil",
      timeframe: "13:00 - 18:00",
      confidence: 0.86
    },
    lat: 36.35,
    lng: 28.18,
    bestDirection: "SE Thermal"
  },
  {
    id: 'faneromeni-paros',
    name: 'Faneromeni',
    location: 'Paros, Greece',
    region: 'Cyclades',
    image: 'https://images.unsplash.com/photo-1589136142566-3cb444e9089e?auto=format&fit=crop&q=80&w=800',
    description: 'Wild and untouched. For those who seek the authentic Meltemi experience.',
    generalRating: 8.7,
    sportRatings: { windsurf: 9, kite: 8, wing: 7, surf: 2 },
    forecast: generateForecast(22),
    aiInsight: {
      summary: "Raw Aegean power. The North-East component is perfectly aligned today.",
      idealSport: "Windsurf",
      timeframe: "12:00 - 19:00",
      confidence: 0.91
    },
    lat: 37.05,
    lng: 25.18,
    bestDirection: "N Meltemi"
  },
  {
    id: 'agios-georgios-corfu',
    name: 'Agios Georgios',
    location: 'Corfu, Greece',
    region: 'Ionian',
    image: 'https://images.unsplash.com/photo-1559128192-39c4c3f443d8?auto=format&fit=crop&q=80&w=800',
    description: 'Vast sandy bay with turquoise water. The Ionian thermal engine at its best.',
    generalRating: 8.6,
    sportRatings: { windsurf: 6, kite: 9, wing: 9, surf: 4 },
    forecast: generateForecast(15),
    aiInsight: {
      summary: "Steady Maestro wind kicking in. Silky smooth water for freestyle kite.",
      idealSport: "Kitesurf",
      timeframe: "14:30 - 19:00",
      confidence: 0.89
    },
    lat: 39.47,
    lng: 19.92,
    bestDirection: "W Offshore"
  },
  {
    id: 'mikri-fterou-ios',
    name: 'Mikri Fterou',
    location: 'Ios, Greece',
    region: 'Cyclades',
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=800',
    description: 'A secluded sanctuary for foilers looking for the perfect glide.',
    generalRating: 8.4,
    sportRatings: { windsurf: 5, kite: 7, wing: 10, surf: 2 },
    forecast: generateForecast(16),
    aiInsight: {
      summary: "Exceptional foil efficiency today. The fetch is short, the water is flat.",
      idealSport: "Wingfoil",
      timeframe: "13:00 - 17:30",
      confidence: 0.87
    },
    lat: 36.69,
    lng: 25.30,
    bestDirection: "N Meltemi"
  },
  {
    id: 'karpathos-afiartis',
    name: 'Afiartis',
    location: 'Karpathos, Greece',
    region: 'Dodecanese',
    image: 'https://images.unsplash.com/photo-1506466010722-395aa2bef877?auto=format&fit=crop&q=80&w=800',
    description: 'The legendary high-wind capital of Europe. Brutal, consistent, and addictive.',
    generalRating: 9.8,
    sportRatings: { windsurf: 10, kite: 5, wing: 7, surf: 1 },
    forecast: generateForecast(28),
    aiInsight: {
      summary: "Nuclear level wind! 30-35 knot gusts. Only for the experienced.",
      idealSport: "Windsurf",
      timeframe: "09:00 - 19:30",
      confidence: 0.98
    },
    lat: 35.80,
    lng: 27.12,
    bestDirection: "NE Meltemi"
  },
  {
    id: 'agios-nikitas-lefkada',
    name: 'Agios Nikitas',
    location: 'Lefkada, Greece',
    region: 'Ionian',
    image: 'https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?auto=format&fit=crop&q=80&w=800',
    description: 'Dramatic cliffs and deep blue water. The West coast experience.',
    generalRating: 8.3,
    sportRatings: { windsurf: 4, kite: 8, wing: 9, surf: 6 },
    forecast: generateForecast(14),
    aiInsight: {
      summary: "Western swell meets the afternoon thermal. Potential for small wave winging.",
      idealSport: "Wingfoil",
      timeframe: "15:00 - 18:30",
      confidence: 0.84
    },
    lat: 38.72,
    lng: 20.75,
    bestDirection: "SW"
  },
  {
    id: 'milos-komi',
    name: 'Komi',
    location: 'Milos, Greece',
    region: 'Cyclades',
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&q=80&w=800',
    description: 'Unique volcanic landscapes and high-intensity North winds.',
    generalRating: 8.8,
    sportRatings: { windsurf: 9, kite: 9, wing: 8, surf: 4 },
    forecast: generateForecast(20),
    aiInsight: {
      summary: "Strong North pressure against the caldera. Exceptional vistas and power.",
      idealSport: "Kitesurf",
      timeframe: "11:00 - 18:00",
      confidence: 0.92
    },
    lat: 36.73,
    lng: 24.52,
    bestDirection: "N"
  }
];
export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Alex Windrider' }
];