import type { Env, ClickRecord } from '../types';

function normalizeStatsSlug(slug: string): string {
  return slug === '/' || slug === '' ? '_root' : slug;
}

/**
 * Asynchronously record click event into Analytics Engine and update KV cache.
 */
export async function trackClick(env: Env, record: ClickRecord): Promise<void> {
  const promises: Promise<any>[] = [];
  const slugKey = normalizeStatsSlug(record.slug);

  // 1. If Analytics Engine dataset binding exists, write time-series point
  if (env.ANALYTICS) {
    try {
      env.ANALYTICS.writeDataPoint({
        blobs: [
          record.slug,
          record.country || 'Unknown',
          record.city || 'Unknown',
          record.device || 'Unknown',
          record.referer || 'Direct',
          record.isBot ? 'bot' : 'human'
        ],
        doubles: [1],
        indexes: [slugKey]
      });
    } catch (err) {
      console.error('[AnalyticsEngine] Failed to write data point:', err);
    }
  }

  // 2. Update KV counters and recent clicks for quick dashboard display
  promises.push(
    (async () => {
      try {
        const counterKey = `stats:${slugKey}:total`;
        const rawCount = await env.LINKS_KV.get(counterKey);
        const currentCount = rawCount ? parseInt(rawCount, 10) : 0;
        await env.LINKS_KV.put(counterKey, String(currentCount + 1));

        // Update recent clicks (last 20)
        const recentKey = `stats:${slugKey}:recent`;
        const rawRecent = await env.LINKS_KV.get<Array<any>>(recentKey, { type: 'json' });
        const recentList = Array.isArray(rawRecent) ? rawRecent : [];
        recentList.unshift({
          timestamp: record.timestamp,
          country: record.country,
          city: record.city,
          device: record.device,
          referer: record.referer
        });
        // Keep max 20 entries
        const trimmedRecent = recentList.slice(0, 20);
        await env.LINKS_KV.put(recentKey, JSON.stringify(trimmedRecent));
      } catch (err) {
        console.error('[KVStats] Failed to update click counter:', err);
      }
    })()
  );

  await Promise.allSettled(promises);
}

/**
 * Get aggregated statistics for a specific slug from KV.
 */
export async function getSlugStats(env: Env, slug: string) {
  try {
    const slugKey = normalizeStatsSlug(slug);
    const total = await env.LINKS_KV.get(`stats:${slugKey}:total`);
    const recent = await env.LINKS_KV.get<Array<any>>(`stats:${slugKey}:recent`, { type: 'json' });
    return {
      totalClicks: total ? parseInt(total, 10) : 0,
      recentClicks: recent || []
    };
  } catch {
    return {
      totalClicks: 0,
      recentClicks: []
    };
  }
}
