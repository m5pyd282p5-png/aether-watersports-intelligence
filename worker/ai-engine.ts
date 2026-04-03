import type { ForecastPoint, AiInsight, SportRatings, Spot } from "@shared/types";
export function analyzeForecast(forecast: ForecastPoint[]): Partial<Spot> {
  if (!forecast || forecast.length === 0) return {};
  // 1. Calculate Averages and Peaks
  const avgWind = forecast.reduce((acc, p) => acc + p.windSpeed, 0) / forecast.length;
  const maxWind = Math.max(...forecast.map(p => p.windSpeed));
  const maxGust = Math.max(...forecast.map(p => p.gust));
  // 2. Determine Ideal Sport
  let idealSport: AiInsight['idealSport'] = 'Windsurf';
  let summary = "";
  if (avgWind < 12) {
    idealSport = 'Surf';
    summary = "Light winds today. Look for swell activity or grab the foil for some glide.";
  } else if (avgWind >= 12 && avgWind < 18) {
    idealSport = 'Wingfoil';
    summary = "Perfect wingfoiling breeze. Smooth water and consistent pressure expected.";
  } else if (avgWind >= 18 && avgWind < 24) {
    idealSport = 'Kitesurf';
    summary = "Solid kite conditions. The Meltemi is delivering steady power across the bay.";
  } else {
    idealSport = 'Windsurf';
    summary = "Nuclear conditions! High-wind windsurfing session incoming. Rig small.";
  }
  // 3. Find Prime Window (Continuous 4-hour block with highest wind)
  let bestStartIndex = 0;
  let maxWindowAvg = 0;
  if (forecast.length >= 4) {
    for (let i = 0; i <= forecast.length - 4; i++) {
      const windowAvg = forecast.slice(i, i + 4).reduce((acc, p) => acc + p.windSpeed, 0) / 4;
      if (windowAvg > maxWindowAvg) {
        maxWindowAvg = windowAvg;
        bestStartIndex = i;
      }
    }
  }
  const timeframe = `${forecast[bestStartIndex]?.time ?? 'N/A'} - ${forecast[Math.min(bestStartIndex + 4, forecast.length - 1)]?.time ?? 'N/A'}`;
  // 4. Update Sport Ratings
  const ratings: SportRatings = {
    windsurf: Math.min(10, Math.max(1, Math.round(avgWind / 3 + 2))),
    kite: Math.min(10, Math.max(1, Math.round(avgWind / 3 + 1))),
    wing: Math.min(10, Math.max(1, Math.round(avgWind / 2.5))),
    surf: Math.min(10, Math.max(1, avgWind > 15 ? 2 : 7))
  };
  return {
    sportRatings: ratings,
    aiInsight: {
      summary,
      idealSport,
      timeframe,
      confidence: Math.min(0.98, 0.7 + (avgWind / 50))
    }
  };
}