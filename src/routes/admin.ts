import { Hono } from 'hono';
import type { Env, LinkItem } from '../types';
import { renderAdminHtml } from '../templates/admin';
import { renderUnauthorizedHtml } from '../templates/unauthorized';
import { getSlugStats } from '../utils/stats';

export const adminApp = new Hono<{ Bindings: Env }>();

// Auth Helper
function checkAuth(c: any): boolean {
  const token = c.env.ADMIN_TOKEN;
  if (!token) return true; // If no token configured, open by default

  // 1. Check Authorization: Bearer <token>
  const authHeader = c.req.header('Authorization');
  if (authHeader && authHeader === `Bearer ${token}`) {
    return true;
  }

  // 2. Check Cookie fallback (for browser testing / manual login)
  const cookieHeader = c.req.header('Cookie') || '';
  if (cookieHeader.includes(`ADMIN_TOKEN=${encodeURIComponent(token)}`) || cookieHeader.includes(`ADMIN_TOKEN=${token}`)) {
    return true;
  }

  return false;
}

// Admin Dashboard UI (accessible directly via / and /admin)
const renderDashboard = (c: any) => {
  const isAuthed = checkAuth(c);
  const siteName = c.env.SITE_NAME || 'Link Redirect Gateway';
  const url = new URL(c.req.url);

  if (!isAuthed) {
    return c.html(renderUnauthorizedHtml(url.host, siteName), 401);
  }

  return c.html(renderAdminHtml(siteName));
};

adminApp.get('/', renderDashboard);
adminApp.get('/admin', renderDashboard);

// Protected API Middlewares
adminApp.use('/api/*', async (c, next) => {
  if (!checkAuth(c)) {
    return c.json({ error: 'Unauthorized: Missing or invalid Bearer Token' }, 401);
  }
  await next();
});

// List all links
adminApp.get('/api/links', async (c) => {
  try {
    const list = await c.env.LINKS_KV.list({ prefix: 'link:' });
    const links: LinkItem[] = [];

    for (const key of list.keys) {
      if (key.name === 'link:_root') continue; // Skip legacy root key if any
      const raw = await c.env.LINKS_KV.get(key.name);
      if (raw) {
        try {
          const item: LinkItem = JSON.parse(raw);
          const stats = await getSlugStats(c.env, item.slug);
          item.clicks = stats.totalClicks;
          links.push(item);
        } catch {
          // ignore corrupted JSON
        }
      }
    }

    // Sort by createdAt desc
    links.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

    return c.json({ links });
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

// Create or update a link
adminApp.post('/api/links', async (c) => {
  try {
    const body = await c.req.json();
    let { slug, url, title, description, ogImage, enabled } = body;

    slug = (slug || '').trim().toLowerCase();
    if (slug.startsWith('/')) {
      slug = slug.slice(1);
    }
    if (!slug) {
      return c.json({ error: '请填写短链路径 (如 yt, blog, x)' }, 400);
    }
    if (!/^[a-z0-9-_]+$/.test(slug)) {
      return c.json({ error: '短链路径只能包含小写字母、数字、下划线及连字符' }, 400);
    }
    if (['admin', 'api', 'favicon.ico'].includes(slug)) {
      return c.json({ error: `路径 '${slug}' 为系统保留路径，无法作为短链地址` }, 400);
    }

    if (!url || typeof url !== 'string' || !/^https?:\/\//i.test(url.trim())) {
      return c.json({ error: '目标地址必须是以 http:// 或 https:// 开头的有效网址' }, 400);
    }

    const kvKey = `link:${slug}`;
    const existingRaw = await c.env.LINKS_KV.get(kvKey);
    const existing = existingRaw ? JSON.parse(existingRaw) : null;

    const now = Date.now();
    const item: LinkItem = {
      slug,
      url: url.trim(),
      title: title?.trim() || '',
      description: description?.trim() || '',
      ogImage: ogImage?.trim() || '',
      enabled: enabled !== false,
      createdAt: existing?.createdAt || now,
      updatedAt: now
    };

    await c.env.LINKS_KV.put(kvKey, JSON.stringify(item));

    return c.json({ success: true, link: item });
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

// Delete a link
adminApp.delete('/api/links/:slug', async (c) => {
  let slug = decodeURIComponent(c.req.param('slug')).toLowerCase();
  if (slug.startsWith('/')) slug = slug.slice(1);
  const kvKey = `link:${slug}`;

  try {
    await c.env.LINKS_KV.delete(kvKey);
    return c.json({ success: true });
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

// Get stats for a slug
adminApp.get('/api/stats/:slug', async (c) => {
  const slug = c.req.param('slug');
  const stats = await getSlugStats(c.env, slug);
  return c.json(stats);
});
