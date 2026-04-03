import { Hono } from "hono";
import type { Env } from './core-utils';
import { SpotEntity } from "./entities";
import { ok, notFound, bad } from './core-utils';
import { analyzeForecast } from "./ai-engine";
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // SPOTS LIST
  app.get('/api/spots', async (c) => {
    await SpotEntity.ensureSeed(c.env);
    const cursor = c.req.query('cursor');
    const limit = c.req.query('limit');
    const page = await SpotEntity.list(
      c.env,
      cursor ?? null,
      limit ? Math.max(1, (Number(limit) | 0)) : 20
    );
    return ok(c, page);
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
        ...analysis.aiInsight
      },
      sportRatings: {
        ...s.sportRatings,
        ...analysis.sportRatings
      }
    }));
    return ok(c, updatedState);
  });
}