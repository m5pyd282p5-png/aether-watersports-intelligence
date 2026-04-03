import { Hono } from "hono";
import type { Env } from './core-utils';
import { SpotEntity } from "./entities";
import { ok, notFound, bad } from './core-utils';
import { analyzeForecast } from "./ai-engine";
import { MOCK_SPOTS } from "@shared/mock-data";
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // SPOTS LIST
  app.get('/api/spots', async (c) => {
    // Top-up seeding: Ensure all mock spots exist in DO
    const listResult = await SpotEntity.list(c.env, null, 100);
    const existingIds = listResult.items || [];
    const existingIdSet = new Set(existingIds.map(s => s?.id || '').filter(Boolean));
    const missingSpots = MOCK_SPOTS.filter(s => !existingIdSet.has(s.id));
    if (missingSpots.length > 0) {
      for (const spot of missingSpots) {
        await SpotEntity.create(c.env, spot);
      }
    }
    const cursor = c.req.query('cursor');
    const limit = c.req.query('limit');
    const region = c.req.query('region');
    let { items, next } = await SpotEntity.list(
      c.env,
      cursor ?? null,
      limit ? Math.max(1, (Number(limit) | 0)) : 100
    );
    if (region && region !== 'All') {
      items = items.filter(s => s.region === region);
    }
    items = items.filter((spot): spot is any => !!spot && !!spot.name && !!spot.location && !!spot.region && !!spot.sportRatings);
    return ok(c, { items, next });
  });
  // SINGLE SPOT
  app.get('/api/spots/:id', async (c) => {
    const id = c.req.param('id');
    const spot = new SpotEntity(c.env, id);
    if (!await spot.exists()) {
      return notFound(c, 'Spot not found');
    }
    const data = await spot.getState();
    return ok(c, data);
  });
  // ANALYZE SPOT
  app.post('/api/spots/:id/analyze', async (c) => {
    const id = c.req.param('id');
    const spotEntity = new SpotEntity(c.env, id);
    if (!await spotEntity.exists()) {
      return notFound(c, 'Spot not found');
    }
    const currentState = await spotEntity.getState();
    const analysis = analyzeForecast(currentState.forecast);
    const updatedState = await spotEntity.mutate((s) => ({
      ...s,
      ...analysis,
      aiInsight: {
        ...s.aiInsight,
        ...(analysis.aiInsight as any)
      },
      sportRatings: {
        ...s.sportRatings,
        ...(analysis.sportRatings as any)
      }
    }));
    return ok(c, updatedState);
  });
}