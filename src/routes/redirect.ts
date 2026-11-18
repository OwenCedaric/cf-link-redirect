import { Hono } from 'hono';
import type { Env, LinkItem } from '../types.ts';
import { isBot, renderOpenGraphHtml } from '../utils/bot.ts';
import { parseDevice, parseReferer } from '../utils/device.ts';
import { mergeQueryParams } from '../utils/url.ts';
import { trackClick } from '../utils/stats.ts';
import { FAVICON_SVG, getFaviconPngBuffer } from '../utils/favicon.ts';
import { renderNotFoundHtml } from '../templates/notfound.ts';

export const redirectApp = new Hono<{ Bindings: Env }>();

/**
 * Returns 404 response (HTML for browsers, plain text for API/CLI).
 */
function renderNotFoundResponse(c: any, slug: string, reason: string = '该短链不存在或已被删除。') {
  const accept = c.req.header('Accept') || '';
  if (accept.includes('text/html')) {
    const siteName = c.env.SITE_NAME || 'Link Redirect Gateway';
    return c.html(renderNotFoundHtml(siteName, slug, reason), 404);
  }
  return c.text(`404 Not Found: /${slug} - ${reason}`, 404);
}

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
  const parsedReferer = parseReferer(referer, c.req.url);
  const botDetected = isBot(userAgent);

  // Asynchronous Click Tracking via waitUntil (non-blocking, 0ms overhead for user)
  const clickData = {
    slug,
    timestamp: Date.now(),
    country,
    city,
    device,
    referer: parsedReferer,
    isBot: botDetected
  };

  let hasWaitUntil = false;
  try {
    if (c.executionCtx && typeof c.executionCtx.waitUntil === 'function') {
      hasWaitUntil = true;
      c.executionCtx.waitUntil(trackClick(c.env, clickData));
    }
  } catch {}

  if (!hasWaitUntil) {
    trackClick(c.env, clickData).catch(err => console.error('[trackClick Error]', err));
  }

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

// Favicon handlers
redirectApp.get('/favicon.svg', (c) => {
  return c.body(FAVICON_SVG, 200, {
    'Content-Type': 'image/svg+xml',
    'Cache-Control': 'public, max-age=86400'
  });
});

redirectApp.get('/favicon.ico', (c) => {
  return c.body(getFaviconPngBuffer(), 200, {
    'Content-Type': 'image/png',
    'Cache-Control': 'public, max-age=86400'
  });
});

// Dynamic Path Redirection Route
redirectApp.get('/:slug', async (c) => {
  const slug = c.req.param('slug').toLowerCase();

  // Reserved paths
  if (['admin', 'api', 'favicon.ico', 'favicon.svg', 'auth.sgmodule'].includes(slug)) {
    return c.notFound();
  }

  // Look up slug in KV
  const raw = await c.env.LINKS_KV.get(`link:${slug}`);
  if (!raw) {
    // Deleted links or non-existent records return 404
    return renderNotFoundResponse(c, slug, '该短链不存在或已被删除。');
  }

  let link: LinkItem;
  try {
    link = JSON.parse(raw);
  } catch {
    return c.text('Invalid link configuration', 500);
  }

  // Scheduled / periodic expiration check: return 404 once expired
  if (link.expiresAt && Date.now() > link.expiresAt) {
    return renderNotFoundResponse(c, slug, '该短链已过有效访问期限，重定向已停用。');
  }

  return await handleRedirection(c, slug, link);
});
