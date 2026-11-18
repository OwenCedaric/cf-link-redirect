import type { Env, ClickRecord, LinkItem, LinkStats } from '../types.ts';

function normalizeStatsSlug(slug: string): string {
  return slug === '/' || slug === '' ? '_root' : slug;
}

/**
 * Asynchronously record click event into Analytics Engine and update bound link stats in KV.
 */
export async function trackClick(env: Env, record: ClickRecord): Promise<void> {
  const promises: Promise<any>[] = [];
  const slugKey = normalizeStatsSlug(record.slug);

  // 1. If Analytics Engine dataset binding exists, write time-series point
  if (env && env.ANALYTICS) {
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

  // 2. Update bound link statistics in KV
  if (env && env.LINKS_KV) {
    promises.push(
      (async () => {
        try {
          const linkKey = `link:${slugKey}`;
          const rawLink = await env.LINKS_KV.get(linkKey);
          if (rawLink) {
            try {
              const link: LinkItem = JSON.parse(rawLink);
              link.clicks = (link.clicks || 0) + 1;
              if (!link.stats) {
                link.stats = {
                  totalClicks: 0,
                  referrers: {},
                  countries: {},
                  devices: {},
                  recentClicks: []
                };
              }
              link.stats.totalClicks = (link.stats.totalClicks || 0) + 1;

              const ref = record.referer || 'Direct';
              link.stats.referrers = link.stats.referrers || {};
              link.stats.referrers[ref] = (link.stats.referrers[ref] || 0) + 1;

              const country = record.country || 'Unknown';
              link.stats.countries = link.stats.countries || {};
              link.stats.countries[country] = (link.stats.countries[country] || 0) + 1;

              const device = record.device || 'Other';
              link.stats.devices = link.stats.devices || {};
              link.stats.devices[device] = (link.stats.devices[device] || 0) + 1;

              if (!Array.isArray(link.stats.recentClicks)) {
                link.stats.recentClicks = [];
              }
              link.stats.recentClicks.unshift({
                timestamp: record.timestamp,
                country: record.country,
                city: record.city,
                device: record.device,
                referer: record.referer
              });
              if (link.stats.recentClicks.length > 20) {
                link.stats.recentClicks = link.stats.recentClicks.slice(0, 20);
              }

              await env.LINKS_KV.put(linkKey, JSON.stringify(link));
            } catch (e) {
              console.error('[KVStats] Failed to update bound link stats:', e);
            }
          }

          // Legacy counter update for backwards compatibility
          const counterKey = `stats:${slugKey}:total`;
          const rawCount = await env.LINKS_KV.get(counterKey);
          const currentCount = rawCount ? parseInt(rawCount, 10) : 0;
          await env.LINKS_KV.put(counterKey, String(currentCount + 1));

          // Legacy recent clicks (last 20)
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
          const trimmedRecent = recentList.slice(0, 20);
          await env.LINKS_KV.put(recentKey, JSON.stringify(trimmedRecent));
        } catch (err) {
          console.error('[KVStats] Failed to update click counter:', err);
        }
      })()
    );
  }

  await Promise.allSettled(promises);
}

/**
 * Get aggregated statistics for a specific slug from KV.
 */
export async function getSlugStats(env: Env, slug: string): Promise<LinkStats> {
  try {
    if (!env || !env.LINKS_KV) {
      return {
        slug,
        totalClicks: 0,
        todayClicks: 0,
        recentClicks: [],
        referrers: {},
        countries: {},
        devices: {}
      };
    }
    const slugKey = normalizeStatsSlug(slug);

    // Try reading bound stats directly from link object first
    const rawLink = await env.LINKS_KV.get(`link:${slugKey}`);
    if (rawLink) {
      try {
        const link: LinkItem = JSON.parse(rawLink);
        if (link.stats) {
          return {
            slug,
            totalClicks: link.stats.totalClicks ?? link.clicks ?? 0,
            todayClicks: 0,
            recentClicks: link.stats.recentClicks || [],
            referrers: link.stats.referrers || {},
            countries: link.stats.countries || {},
            devices: link.stats.devices || {}
          };
        }
      } catch {}
    }

    // Fallback to legacy stats keys
    const total = await env.LINKS_KV.get(`stats:${slugKey}:total`);
    const recent = await env.LINKS_KV.get<Array<any>>(`stats:${slugKey}:recent`, { type: 'json' });
    return {
      slug,
      totalClicks: total ? parseInt(total, 10) : 0,
      todayClicks: 0,
      recentClicks: recent || [],
      referrers: {},
      countries: {},
      devices: {}
    };
  } catch {
    return {
      slug,
      totalClicks: 0,
      todayClicks: 0,
      recentClicks: [],
      referrers: {},
      countries: {},
      devices: {}
    };
  }
}
