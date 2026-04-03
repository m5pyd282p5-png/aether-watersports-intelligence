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
    bestDirection: "NE Meltemi",
    difficulty: 'Expert',
    facilities: ['Pro Center', 'Rescue', 'Parking', 'Taverna', 'Shower'],
    crowd: 'Crowded',
    tips: ['Watch out for the offshore wind on the flat side', 'Rig 4.2-5.0m for the afternoon blast'],
    launchArea: 'Wide sandy spit between two bays. Plenty of rigging space.',
    bestGear: [{ sport: 'windsurf', sizeRange: '4.0-5.3m' }, { sport: 'kite', sizeRange: '7-9m' }],
    schoolInfo: [
      { name: 'Prasonisi Center', distanceKm: 0.1, phone: '+30 2244 091045' },
      { name: 'Taboo Surf Center', distanceKm: 0.2 }
    ]
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
    bestDirection: "N Thermal",
    difficulty: 'Intermediate',
    facilities: ['Surf Club', 'Beach Bar', 'Parking', 'Sunbeds'],
    crowd: 'High',
    tips: ['Best wind is further out from the shore', 'Morning is great for beginners'],
    launchArea: 'Sandy beach with easy entry. Side-shore wind simplifies launching.',
    bestGear: [{ sport: 'wing', sizeRange: '4.5-5.5m' }, { sport: 'windsurf', sizeRange: '5.5-7.0m' }],
    schoolInfo: [{ name: 'Sunwind Surf Club', distanceKm: 0.1, phone: '+30 2284 041692' }]
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
    bestDirection: "SW Eric",
    difficulty: 'Advanced',
    facilities: ['World Class Schools', 'Rescue Boats', 'Hotels', 'Rigging Lawns'],
    crowd: 'High',
    tips: ['Wait for the mountain clouds to form for "Eric"', 'Flat water on the upwind side of the bay'],
    launchArea: 'Multiple gravel/grass launch spots along the bay front.',
    bestGear: [{ sport: 'windsurf', sizeRange: '4.7-5.8m' }, { sport: 'wing', sizeRange: '4.0-5.0m' }],
    schoolInfo: [
      { name: 'Club Vass', distanceKm: 0.1, phone: '+30 2645 031588' },
      { name: 'Wildwind', distanceKm: 0.2 }
    ]
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
    bestDirection: "NE Meltemi",
    difficulty: 'Expert',
    facilities: ['Rigging Stations', 'Rescue', 'Parking', 'Studios'],
    crowd: 'Medium',
    tips: ['Eat a heavy breakfast, you will need the strength', 'Smallest sails only: 3.4-4.2m'],
    launchArea: 'Rocky entry in some spots, wear booties. Intense offshore wind.',
    bestGear: [{ sport: 'windsurf', sizeRange: '3.4-4.5m' }],
    schoolInfo: [{ name: 'Karpathos Surf Center', distanceKm: 0.1, phone: '+30 2245 091060' }]
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
    bestDirection: "N Thermal",
    difficulty: 'Beginner',
    facilities: ['Schools', 'Showers', 'Parking', 'Cafes'],
    crowd: 'High',
    tips: ['Great for practicing your first jibes', 'Watch for swimmers in high summer'],
    launchArea: 'Long sandy beach with shallow water for 50 meters.',
    bestGear: [{ sport: 'windsurf', sizeRange: '6.0-7.5m' }, { sport: 'wing', sizeRange: '5.5-6.5m' }],
    schoolInfo: [{ name: 'Athens Watersports', distanceKm: 0.5, phone: '+30 2294 089666' }]
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
    bestDirection: "NE Meltemi",
    difficulty: 'Intermediate',
    facilities: ['Glamping', 'Surf Schools', 'Eco-center', 'Rescue'],
    crowd: 'Medium',
    tips: ['The north end is flatter for kite freestyle', 'Perfect for learning to foil'],
    launchArea: 'Massive sandy bay. Shallow and safe for hundreds of meters.',
    bestGear: [{ sport: 'kite', sizeRange: '9-12m' }, { sport: 'wing', sizeRange: '5.0-6.0m' }],
    schoolInfo: [{ name: 'Surf Club Keros', distanceKm: 0.1, phone: '+30 2254 041162' }]
  }
];
export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Alex Windrider' }
];