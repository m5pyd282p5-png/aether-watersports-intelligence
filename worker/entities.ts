import { IndexedEntity } from "./core-utils";
import type { Spot } from "@shared/types";
import { MOCK_SPOTS } from "@shared/mock-data";
export class SpotEntity extends IndexedEntity<Spot> {
  static readonly entityName = "spot";
  static readonly indexName = "spots";
  static readonly initialState: Spot = {
    id: "",
    name: "",
    location: "",
    image: "",
    description: "",
    generalRating: 0,
    sportRatings: { windsurf: 0, kite: 0, wing: 0, surf: 0 },
    forecast: [],
    aiInsight: {
      summary: "",
      idealSport: "Windsurf",
      timeframe: "",
      confidence: 0
    },
    lat: 0,
    lng: 0,
    bestDirection: ""
  };
  static seedData = MOCK_SPOTS;
}