import { Hono } from 'hono';
import type { Env, LinkItem } from '../types';
import { isBot, renderOpenGraphHtml } from '../utils/bot';
import { parseDevice, parseReferer } from '../utils/device';
import { mergeQueryParams } from '../utils/url';
import { trackClick } from '../utils/stats';

export const redirectApp = new Hono<{ Bindings: Env }>();

/**
 * Handles redirection logic including analytics tracking, UTM forwarding, and bot preview.
 */
async function handleRedirection(c: any, slug: string, link: LinkItem) {
  if (link.enabled === false) {
    return c.text(`Link '${slug}' is currently disabled`, 403);
  }

  // Merge Query Parameters (e.g. UTM tracking params)
  const finalTargetUrl = mergeQueryParams(link.url, c.req.url);

  // Extract client metadata for stats & bot detection
  const userAgent = c.req.header('User-Agent') || '';
  const referer = c.req.header('Referer') || '';
  const cf = (c.req.raw as any).cf || {};
  const country = cf.country || 'Unknown';
  const city = cf.city || 'Unknown';
  const device = parseDevice(userAgent);
  const parsedReferer = parseReferer(referer);
  const botDetected = isBot(userAgent);

  // Asynchronous Click Tracking via waitUntil (non-blocking, 0ms overhead for user)
  c.executionCtx.waitUntil(
    trackClick(c.env, {
      slug,
      timestamp: Date.now(),
      country,
      city,
      device,
      referer: parsedReferer,
      isBot: botDetected
    })
  );

  // Social Media Bot Handling: Return rich OpenGraph metadata
  if (botDetected) {
    const html = renderOpenGraphHtml(link, finalTargetUrl, c.env.SITE_NAME || 'Link Gateway');
    return c.html(html, 200, {
      'Cache-Control': 'public, max-age=60'
    });
  }

  // Normal User: Immediate 302 Redirect
  return c.redirect(finalTargetUrl, 302);
}

// Favicon handler
redirectApp.get('/favicon.ico', (c) => {
  return c.body(null, 204);
});

// Dynamic Path Redirection Route
redirectApp.get('/:slug', async (c) => {
  const slug = c.req.param('slug').toLowerCase();

  // Reserved paths
  if (['admin', 'api', 'favicon.ico'].includes(slug)) {
    return c.notFound();
  }

  // Look up slug in KV
  const raw = await c.env.LINKS_KV.get(`link:${slug}`);
  if (!raw) {
    const fallback = c.env.DEFAULT_FALLBACK_URL;
    if (fallback && fallback.trim()) {
      return c.redirect(fallback, 302);
    }
    return c.redirect('/', 302);
  }

  let link: LinkItem;
  try {
    link = JSON.parse(raw);
  } catch {
    return c.text('Invalid link configuration', 500);
  }

  return await handleRedirection(c, slug, link);
});
