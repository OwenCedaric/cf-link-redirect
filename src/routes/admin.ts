import { Hono } from 'hono';
import type { Env, LinkItem } from '../types.ts';
import { renderAdminHtml } from '../templates/admin.ts';
import { renderUnauthorizedHtml } from '../templates/unauthorized.ts';
import { getSlugStats } from '../utils/stats.ts';
import { generateSurgeModule } from '../utils/module.ts';
import { generateRandomSlug } from '../utils/url.ts';
import { FAVICON_SVG, getFaviconPngBuffer } from '../utils/favicon.ts';

export const adminApp = new Hono<{ Bindings: Env }>();

/**
 * Checks authentication for requests:
 * 1. Authorization: Bearer <token> (supports quoted tokens, missing Bearer, and Surge header-add quirks)
 * 2. X-Admin-Token: <token>
 * 3. Cookie: ADMIN_TOKEN=<token>
 * 4. Query param fallback: ?token=<token> or ?auth=<token>
 */
export function checkAuth(c: any): boolean {
  const token = c.env.ADMIN_TOKEN;
  if (!token) return true; // If no token configured, open by default

  const matchesToken = (raw: string | undefined | null): boolean => {
    if (!raw || typeof raw !== 'string') return false;
    let val = raw.trim();
    if (!val) return false;

    // Handle comma-separated tokens (if proxy or Surge merged headers e.g. "Bearer t1, Bearer t2")
    if (val.includes(',')) {
      const parts = val.split(',');
      for (const part of parts) {
        if (matchesToken(part)) return true;
      }
    }

    const stripQuotes = (str: string): string => {
      let s = str.trim();
      let changed = true;
      while (changed) {
        changed = false;
        if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
          s = s.slice(1, -1).trim();
          changed = true;
        }
        if (s.startsWith('\\"') && s.endsWith('\\"')) {
          s = s.slice(2, -2).trim();
          changed = true;
        }
      }
      return s;
    };

    val = stripQuotes(val);
    if (val === token) return true;

    // Strip Bearer prefix (case-insensitive)
    if (/^Bearer\s+/i.test(val)) {
      val = stripQuotes(val.replace(/^Bearer\s+/i, ''));
      if (val === token) return true;
    }

    return false;
  };

  // 1. Check Authorization header
  const authHeader = c.req.header('Authorization') || c.req.header('authorization');
  if (matchesToken(authHeader)) {
    return true;
  }

  // 2. Check Custom header (e.g. X-Admin-Token)
  const customHeader = c.req.header('X-Admin-Token') || c.req.header('x-admin-token');
  if (matchesToken(customHeader)) {
    return true;
  }

  // 3. Check Cookie
  const cookieHeader = c.req.header('Cookie') || c.req.header('cookie') || '';
  if (cookieHeader) {
    const match = cookieHeader.match(/(?:^|;\s*)ADMIN_TOKEN=([^;]+)/);
    if (match) {
      const cookieVal = match[1].trim();
      let decodedVal = cookieVal;
      try {
        decodedVal = decodeURIComponent(cookieVal);
      } catch {}
      if (matchesToken(cookieVal) || matchesToken(decodedVal)) {
        return true;
      }
    }
    if (cookieHeader.includes(`ADMIN_TOKEN=${encodeURIComponent(token)}`) || cookieHeader.includes(`ADMIN_TOKEN=${token}`)) {
      return true;
    }
  }

  // 4. Check Query parameter fallback (?token=... or ?auth=...)
  const queryToken = c.req.query('token') || c.req.query('auth');
  if (matchesToken(queryToken)) {
    return true;
  }

  return false;
}

// Admin Dashboard UI (accessible directly via /, /admin, /admin/)
const renderDashboard = (c: any) => {
  const isAuthed = checkAuth(c);
  const siteName = c.env.SITE_NAME || 'Link Redirect Gateway';
  const url = new URL(c.req.url);

  if (!isAuthed) {
    return c.html(renderUnauthorizedHtml(url.host, siteName), 401);
  }

  // Auto set-cookie so that all future browser requests/subrequests are authenticated
  const token = c.env.ADMIN_TOKEN;
  if (token) {
    c.header('Set-Cookie', `ADMIN_TOKEN=${encodeURIComponent(token)}; Path=/; Max-Age=2592000; SameSite=Lax`);
  }

  return c.html(renderAdminHtml(siteName, token));
};

adminApp.get('/', (c) => {
  if (checkAuth(c)) {
    return renderDashboard(c);
  }
  return c.redirect('/admin', 302);
});
adminApp.get('/admin', renderDashboard);
adminApp.get('/admin/', renderDashboard);

// Favicon endpoints
adminApp.get('/favicon.svg', (c) => {
  return c.body(FAVICON_SVG, 200, {
    'Content-Type': 'image/svg+xml',
    'Cache-Control': 'public, max-age=86400'
  });
});

adminApp.get('/favicon.ico', (c) => {
  return c.body(getFaviconPngBuffer(), 200, {
    'Content-Type': 'image/png',
    'Cache-Control': 'public, max-age=86400'
  });
});

// Download Surge Module configuration
adminApp.get('/auth.sgmodule', (c) => {
  const url = new URL(c.req.url);
  const siteName = c.env.SITE_NAME || 'Link Redirect Gateway';
  const content = generateSurgeModule(url.host, siteName);
  return c.text(content, 200, {
    'Content-Type': 'text/plain; charset=utf-8',
    'Content-Disposition': `attachment; filename="auth-${url.hostname}.sgmodule"`
  });
});

// Lightweight Auth Check endpoint for probing by Surge or browser
adminApp.get('/api/auth/check', (c) => {
  if (!checkAuth(c)) {
    return c.json({ authenticated: false }, 401);
  }
  const token = c.env.ADMIN_TOKEN;
  if (token) {
    c.header('Set-Cookie', `ADMIN_TOKEN=${encodeURIComponent(token)}; Path=/; Max-Age=2592000; SameSite=Lax`);
  }
  return c.json({ authenticated: true });
});

// Global API Error Handler for adminApp
adminApp.onError((err, c) => {
  console.error('[adminApp Error]', err);
  return c.json({ error: err.message || 'Internal Server Error' }, 500);
});

// Protected API Middlewares
adminApp.use('/api/*', async (c, next) => {
  if (!checkAuth(c)) {
    return c.json({ error: 'Unauthorized: Missing or invalid Bearer Token' }, 401);
  }
  await next();
});

// List all links handler
const handleGetLinks = async (c: any) => {
  try {
    if (!c.env.LINKS_KV) {
      console.warn('[API /api/links] LINKS_KV is not bound in environment');
      return c.json({
        error: 'LINKS_KV 未绑定，请在 Cloudflare 控制台或 wrangler.toml 中配置正确的 KV 命名空间',
        links: []
      }, 500);
    }

    const list = await c.env.LINKS_KV.list({ prefix: 'link:' });
    const keys = (list.keys || []).filter((k: any) => k.name !== 'link:_root');

    // Fetch link details in parallel using Promise.all
    const linkPromises = keys.map(async (key: any) => {
      try {
        const raw = await c.env.LINKS_KV.get(key.name);
        if (!raw) return null;
        const item: LinkItem = JSON.parse(raw);
        if (item.stats && typeof item.stats.totalClicks === 'number') {
          item.clicks = item.stats.totalClicks;
        } else {
          const stats = await getSlugStats(c.env, item.slug);
          item.clicks = stats.totalClicks;
          if (!item.stats) {
            item.stats = {
              totalClicks: stats.totalClicks,
              referrers: stats.referrers || {},
              countries: stats.countries || {},
              devices: stats.devices || {},
              recentClicks: stats.recentClicks || []
            };
          }
        }
        return item;
      } catch {
        return null;
      }
    });

    const results = await Promise.all(linkPromises);
    const links: LinkItem[] = results.filter((item): item is LinkItem => item !== null);

    // Sort by createdAt desc
    links.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

    return c.json({ links });
  } catch (err: any) {
    console.error('[API /api/links Error]', err);
    return c.json({ error: err.message || '获取短链列表失败', links: [] }, 500);
  }
};

adminApp.get('/api/links', handleGetLinks);
adminApp.get('/api/links/', handleGetLinks);

// Create or update a link handler
const handleCreateOrUpdateLink = async (c: any) => {
  try {
    if (!c.env.LINKS_KV) {
      return c.json({ error: 'LINKS_KV 未绑定，无法保存短链' }, 500);
    }

    let body: any;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: '无效的 JSON 请求体' }, 400);
    }

    let { slug, url, title, description, ogImage, enabled, expiresAt, randomSlug } = body;

    slug = (slug || '').trim().toLowerCase();
    if (slug.startsWith('/')) {
      slug = slug.slice(1);
    }

    // Auto-generate random slug if requested or slug is empty
    if (!slug || randomSlug === true || slug === 'random') {
      let attempts = 0;
      let candidate = generateRandomSlug(6);
      while (attempts < 5) {
        const existing = await c.env.LINKS_KV.get(`link:${candidate}`);
        if (!existing) break;
        candidate = generateRandomSlug(6);
        attempts++;
      }
      slug = candidate;
    } else {
      if (!/^[a-z0-9-_]+$/.test(slug)) {
        return c.json({ error: '短链路径只能包含小写字母、数字、下划线及连字符' }, 400);
      }
      if (['admin', 'api', 'favicon.ico', 'favicon.svg', 'auth.sgmodule'].includes(slug)) {
        return c.json({ error: `路径 '${slug}' 为系统保留路径，无法作为短链地址` }, 400);
      }
    }

    if (!url || typeof url !== 'string' || !/^https?:\/\//i.test(url.trim())) {
      return c.json({ error: '目标地址必须是以 http:// 或 https:// 开头的有效网址' }, 400);
    }

    // Parse optional expiration timestamp (ms)
    let parsedExpiresAt: number | null = null;
    if (expiresAt) {
      if (typeof expiresAt === 'number' && expiresAt > 0) {
        parsedExpiresAt = expiresAt;
      } else if (typeof expiresAt === 'string') {
        const ts = Date.parse(expiresAt);
        if (!isNaN(ts)) {
          parsedExpiresAt = ts;
        }
      }
    }

    const kvKey = `link:${slug}`;
    const existingRaw = await c.env.LINKS_KV.get(kvKey);
    const existing: LinkItem | null = existingRaw ? JSON.parse(existingRaw) : null;

    const now = Date.now();
    const item: LinkItem = {
      slug,
      url: url.trim(),
      title: title?.trim() || '',
      description: description?.trim() || '',
      ogImage: ogImage?.trim() || '',
      enabled: enabled !== false,
      expiresAt: parsedExpiresAt,
      createdAt: existing?.createdAt || now,
      updatedAt: now,
      clicks: existing?.clicks ?? existing?.stats?.totalClicks ?? 0,
      stats: existing?.stats
    };

    await c.env.LINKS_KV.put(kvKey, JSON.stringify(item));

    return c.json({ success: true, link: item });
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
};

adminApp.post('/api/links', handleCreateOrUpdateLink);
adminApp.post('/api/links/', handleCreateOrUpdateLink);

// Delete a link
adminApp.delete('/api/links/:slug', async (c) => {
  try {
    if (!c.env.LINKS_KV) {
      return c.json({ error: 'LINKS_KV 未绑定，无法删除短链' }, 500);
    }

    let slug = decodeURIComponent(c.req.param('slug')).toLowerCase();
    if (slug.startsWith('/')) slug = slug.slice(1);
    const kvKey = `link:${slug}`;

    // Deleting the link removes the configuration and bound statistics
    await c.env.LINKS_KV.delete(kvKey);

    // Concurrently clean up legacy stats keys if any
    const slugKey = slug === '' ? '_root' : slug;
    await Promise.allSettled([
      c.env.LINKS_KV.delete(`stats:${slugKey}:total`),
      c.env.LINKS_KV.delete(`stats:${slugKey}:recent`)
    ]);

    return c.json({ success: true });
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

// Get stats for a slug
adminApp.get('/api/stats/:slug', async (c) => {
  try {
    const slug = c.req.param('slug');
    const stats = await getSlugStats(c.env, slug);
    return c.json(stats);
  } catch (err: any) {
    return c.json({ error: err.message, totalClicks: 0, recentClicks: [] }, 500);
  }
});
