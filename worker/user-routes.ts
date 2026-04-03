import { Hono } from "hono";
import type { Env } from './core-utils';
import { SpotEntity } from "./entities";
import { ok, notFound, bad } from './core-utils';
import { analyzeForecast } from "./ai-engine";
import { MOCK_SPOTS } from "@shared/mock-data";
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // SPOTS LIST
  app.get('/api/spots', async (c) => {
    try {
      const region = c.req.query('region');
      const cursor = c.req.query('cursor');
      const limitParam = c.req.query('limit');
      const limit = limitParam ? Math.max(1, Math.min(100, (Number(limitParam) | 0))) : 100;
      // Aggressive Seeding Verification
      // Ensure the index is at least roughly populated.
      await SpotEntity.ensureSeed(c.env);
      const listResult = await SpotEntity.list(c.env, null, 100);
      const existingSpots = listResult.items || [];
      const existingIdSet = new Set(existingSpots.filter(s => s && s.id).map(s => s.id));
      // If we are missing more than 2 spots from the mock list, force creation of missing ones.
      if (existingIdSet.size < MOCK_SPOTS.length) {
        console.log(`[SEEDING] Found ${existingIdSet.size} spots, expected ${MOCK_SPOTS.length}. Synchronizing...`);
        for (const mockSpot of MOCK_SPOTS) {
          if (!existingIdSet.has(mockSpot.id)) {
            await SpotEntity.create(c.env, mockSpot);
          }
        }
      }
      let { items, next } = await SpotEntity.list(c.env, cursor ?? null, limit);
      // Final Defensive Filtering
      let validItems = (items || []).filter((spot): spot is any =>
        !!spot && typeof spot === 'object' && !!spot.id && !!spot.name
      );
      if (region && region !== 'All') {
        const targetRegion = region.toLowerCase();
        validItems = validItems.filter(s => s.region?.toLowerCase() === targetRegion);
      }
      return ok(c, { items: validItems, next });
    } catch (err) {
      console.error('[API ERROR] Failed to list spots:', err);
      return bad(c, 'Failed to retrieve spots data');
    }
  });
  // SYSTEM RESEED (Admin/Debug)
  app.post('/api/system/reseed', async (c) => {
    try {
      console.log('[SYSTEM] Starting aggressive re-sync of all spots...');
      const listResult = await SpotEntity.list(c.env, null, 100);
      const ids = (listResult.items || []).map(s => s.id).filter(Boolean);
      // We don't drop the whole DO storage to avoid breaking other entities,
      // but we force update every spot from the mock data.
      for (const mockSpot of MOCK_SPOTS) {
        await SpotEntity.create(c.env, mockSpot);
      }
      return ok(c, { message: 'Intelligence re-synchronized successfully', count: MOCK_SPOTS.length });
    } catch (err) {
      console.error('[API ERROR] Reseed failed:', err);
      return bad(c, 'System synchronization failure');
    }
  });
  // SINGLE SPOT
  app.get('/api/spots/:id', async (c) => {
    const id = c.req.param('id');
    if (!id) return bad(c, 'ID required');
    const spotEntity = new SpotEntity(c.env, id);
    if (!await spotEntity.exists()) {
      return notFound(c, 'Spot not found');
    }
    try {
      const data = await spotEntity.getState();
      if (!data || !data.id) return notFound(c, 'Corrupted spot data');
      return ok(c, data);
    } catch (err) {
      return bad(c, 'Failed to fetch spot intelligence');
    }
  });
  // ANALYZE SPOT
  app.post('/api/spots/:id/analyze', async (c) => {
    const id = c.req.param('id');
    if (!id) return bad(c, 'ID required');
    const spotEntity = new SpotEntity(c.env, id);
    if (!await spotEntity.exists()) {
      return notFound(c, 'Spot not found');
    }
    try {
      const currentState = await spotEntity.getState();
      const analysis = analyzeForecast(currentState.forecast || []);
      const updatedState = await spotEntity.mutate((s) => ({
        ...s,
        ...analysis,
        aiInsight: {
          ...s.aiInsight,
          ...(analysis.aiInsight || {})
        },
        sportRatings: {
          ...s.sportRatings,
          ...(analysis.sportRatings || {})
        }
      }));
      return ok(c, updatedState);
    } catch (err) {
      console.error('[API ERROR] Analysis failed:', err);
      return bad(c, 'Meteorological analysis engine failure');
    }
  });
}