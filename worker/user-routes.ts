import { Hono } from "hono";
import type { Env } from './core-utils';
import { SpotEntity } from "./entities";
import { ok, notFound } from './core-utils';
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // SPOTS LIST
  app.get('/api/spots', async (c) => {
    // Ensure we have data in the Durable Object
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
}