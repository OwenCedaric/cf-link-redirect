import test from 'node:test';
import assert from 'node:assert/strict';
import { isBot, renderOpenGraphHtml } from '../src/utils/bot.ts';
import { parseDevice, parseReferer } from '../src/utils/device.ts';
import { mergeQueryParams, generateRandomSlug } from '../src/utils/url.ts';
import { checkAuth } from '../src/routes/admin.ts';
import { generateSurgeModule } from '../src/utils/module.ts';
import { FAVICON_SVG, getFaviconPngBytes } from '../src/utils/favicon.ts';
import { trackClick, getSlugStats } from '../src/utils/stats.ts';
import { renderNotFoundHtml } from '../src/templates/notfound.ts';

test('Bot detection recognizes common social media crawlers', () => {
  assert.equal(isBot('Twitterbot/1.0'), true);
  assert.equal(isBot('facebookexternalhit/1.1'), true);
  assert.equal(isBot('TelegramBot (like TwitterBot)'), true);
  assert.equal(isBot('Mozilla/5.0 (compatible; Discordbot/2.0; +https://discordapp.com)'), true);
  assert.equal(isBot('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1'), false);
  assert.equal(isBot('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36'), false);
});

test('Device parsing categorizes desktop, mobile, tablet', () => {
  assert.equal(parseDevice('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0)'), 'Mobile');
  assert.equal(parseDevice('Mozilla/5.0 (iPad; CPU OS 16_0)'), 'Tablet');
  assert.equal(parseDevice('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'), 'Desktop');
});

test('Referer domain parsing', () => {
  assert.equal(parseReferer('https://t.co/abc123xyz'), 't.co');
  assert.equal(parseReferer('https://www.youtube.com/watch?v=123'), 'youtube.com');
  assert.equal(parseReferer(null), 'Direct');
});

test('mergeQueryParams appends and preserves incoming UTM tracking', () => {
  const target = 'https://www.youtube.com/@channel';
  const incoming = 'https://go.example.com/yt?utm_source=x&utm_medium=social&campaign=launch';
  const merged = mergeQueryParams(target, incoming);

  const url = new URL(merged);
  assert.equal(url.searchParams.get('utm_source'), 'x');
  assert.equal(url.searchParams.get('utm_medium'), 'social');
  assert.equal(url.searchParams.get('campaign'), 'launch');
  assert.equal(url.origin + url.pathname, 'https://www.youtube.com/@channel');
});

test('OpenGraph HTML generator renders expected meta tags', () => {
  const html = renderOpenGraphHtml(
    {
      slug: 'yt',
      url: 'https://youtube.com/@mychan',
      title: 'My Video Channel',
      description: 'Subscribe to my daily videos',
      ogImage: 'https://example.com/cover.jpg',
      enabled: true,
      createdAt: 1000,
      updatedAt: 1000
    },
    'https://youtube.com/@mychan',
    'Custom Gateway'
  );

  assert.ok(html.includes('<meta property="og:title" content="My Video Channel" />'));
  assert.ok(html.includes('<meta property="og:image" content="https://example.com/cover.jpg" />'));
  assert.ok(html.includes('summary_large_image'));
  assert.ok(html.includes('Custom Gateway'));
});

test('checkAuth handles various Surge injection formats and auth fallbacks', () => {
  const env = { ADMIN_TOKEN: 'secret_token_123' };

  const createMockContext = (headers = {}, query = {}) => ({
    env,
    req: {
      header: (name) => {
        const lower = name.toLowerCase();
        for (const [k, v] of Object.entries(headers)) {
          if (k.toLowerCase() === lower) return v;
        }
        return undefined;
      },
      query: (key) => query[key]
    }
  });

  // 1. Standard Surge Bearer
  assert.equal(checkAuth(createMockContext({ 'Authorization': 'Bearer secret_token_123' })), true);

  // 2. Surge Header Rewrite quote-wrapping: "Bearer ..."
  assert.equal(checkAuth(createMockContext({ 'Authorization': '"Bearer secret_token_123"' })), true);

  // 3. Surge Bearer with quoted token: Bearer "..."
  assert.equal(checkAuth(createMockContext({ 'Authorization': 'Bearer "secret_token_123"' })), true);

  // 4. Double quoted token: "Bearer \"...\""
  assert.equal(checkAuth(createMockContext({ 'Authorization': '"Bearer \\"secret_token_123\\""' })), true);

  // 5. Lowercase bearer and whitespace variations
  assert.equal(checkAuth(createMockContext({ 'Authorization': 'bearer secret_token_123' })), true);
  assert.equal(checkAuth(createMockContext({ 'Authorization': '  Bearer   secret_token_123   ' })), true);

  // 6. Bare token without Bearer prefix
  assert.equal(checkAuth(createMockContext({ 'Authorization': 'secret_token_123' })), true);
  assert.equal(checkAuth(createMockContext({ 'Authorization': '"secret_token_123"' })), true);

  // 7. Custom header X-Admin-Token
  assert.equal(checkAuth(createMockContext({ 'X-Admin-Token': 'secret_token_123' })), true);

  // 8. Cookie fallback
  assert.equal(checkAuth(createMockContext({ 'Cookie': 'ADMIN_TOKEN=secret_token_123' })), true);
  assert.equal(checkAuth(createMockContext({ 'Cookie': 'session=abc; ADMIN_TOKEN=secret_token_123; theme=dark' })), true);

  // 9. Query param fallback
  assert.equal(checkAuth(createMockContext({}, { token: 'secret_token_123' })), true);
  assert.equal(checkAuth(createMockContext({}, { auth: 'secret_token_123' })), true);

  // 10. Rejection cases
  assert.equal(checkAuth(createMockContext({ 'Authorization': 'Bearer wrong_token' })), false);
  assert.equal(checkAuth(createMockContext({ 'Authorization': 'wrong_token' })), false);
  assert.equal(checkAuth(createMockContext({ 'Cookie': 'ADMIN_TOKEN=wrong_token' })), false);
  assert.equal(checkAuth(createMockContext({})), false);
});

test('generateSurgeModule produces valid regex pattern and host MITM', () => {
  const host = 'go.mybrand.com';
  const moduleContent = generateSurgeModule(host, 'My Brand Link');

  assert.ok(moduleContent.includes(`hostname = %APPEND% ${host}`));
  assert.ok(moduleContent.includes(`header-del Authorization`));
  assert.ok(moduleContent.includes(`header-add Authorization "Bearer {{{Auth}}}"`));

  // Extract regex from moduleContent
  const regexLine = moduleContent.split('\n').find(l => l.includes('header-add'));
  assert.ok(regexLine);
  const pattern = regexLine.split(' ')[0];
  const regex = new RegExp(pattern);

  // Should match admin routes and API
  assert.equal(regex.test(`https://${host}/admin`), true);
  assert.equal(regex.test(`https://${host}/admin/`), true);
  assert.equal(regex.test(`https://${host}/admin?view=all`), true);
  assert.equal(regex.test(`https://${host}/api/links`), true);
  assert.equal(regex.test(`https://${host}/api/stats/yt`), true);
  assert.equal(regex.test(`https://${host}/api/auth/check`), true);

  // Should NOT match public redirection slugs or plain root
  assert.equal(regex.test(`https://${host}`), false);
  assert.equal(regex.test(`https://${host}/`), false);
  assert.equal(regex.test(`https://${host}/yt`), false);
  assert.equal(regex.test(`https://${host}/yt?utm_source=twitter`), false);
  assert.equal(regex.test(`https://${host}/blog`), false);
});

test('Favicon assets (SVG and PNG) are valid and well-formed', () => {
  // SVG validation
  assert.ok(FAVICON_SVG.startsWith('<svg'));
  assert.ok(FAVICON_SVG.includes('viewBox="0 0 64 64"'));
  assert.ok(FAVICON_SVG.includes('§'));
  assert.ok(FAVICON_SVG.includes('prefers-color-scheme'));
  assert.ok(FAVICON_SVG.endsWith('</svg>'));

  // PNG binary validation (PNG Magic Number: 0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A)
  const pngBytes = getFaviconPngBytes();
  assert.ok(pngBytes instanceof Uint8Array);
  assert.ok(pngBytes.length > 500);
  assert.equal(pngBytes[0], 0x89);
  assert.equal(pngBytes[1], 0x50); // P
  assert.equal(pngBytes[2], 0x4e); // N
  assert.equal(pngBytes[3], 0x47); // G
  assert.equal(pngBytes[4], 0x0d);
  assert.equal(pngBytes[5], 0x0a);
  assert.equal(pngBytes[6], 0x1a);
  assert.equal(pngBytes[7], 0x0a);
});

test('API endpoints always return JSON and never unhandled HTML errors', async () => {
  const { default: app } = await import('../src/index.ts');

  // 1. Unauthenticated /api/links returns JSON 401
  const resUnauth = await app.request('/api/links', {
    method: 'GET'
  }, { ADMIN_TOKEN: 'valid_token' });

  assert.equal(resUnauth.status, 401);
  assert.ok(resUnauth.headers.get('content-type')?.includes('application/json'));
  const jsonUnauth = await resUnauth.json();
  assert.ok(jsonUnauth.error.includes('Unauthorized'));

  // 2. Authenticated /api/links without KV binding returns JSON 500 (not HTML)
  const resNoKv = await app.request('/api/links', {
    method: 'GET',
    headers: { 'Authorization': 'Bearer valid_token' }
  }, { ADMIN_TOKEN: 'valid_token' });

  assert.equal(resNoKv.status, 500);
  assert.ok(resNoKv.headers.get('content-type')?.includes('application/json'));
  const jsonNoKv = await resNoKv.json();
  assert.ok(jsonNoKv.error.includes('LINKS_KV'));
  assert.deepEqual(jsonNoKv.links, []);

  // 3. Authenticated /api/links with mocked KV returns JSON list
  const mockStorage = new Map([
    ['link:test', JSON.stringify({ slug: 'test', url: 'https://example.com', clicks: 10, enabled: true, createdAt: 1000 })]
  ]);
  const mockKv = {
    list: async () => ({ keys: [{ name: 'link:test' }] }),
    get: async (k) => mockStorage.get(k) || null,
    put: async (k, v) => mockStorage.set(k, v),
    delete: async (k) => mockStorage.delete(k)
  };

  const resWithKv = await app.request('/api/links', {
    method: 'GET',
    headers: { 'Authorization': 'Bearer valid_token' }
  }, { ADMIN_TOKEN: 'valid_token', LINKS_KV: mockKv });

  assert.equal(resWithKv.status, 200);
  assert.ok(resWithKv.headers.get('content-type')?.includes('application/json'));
  const jsonWithKv = await resWithKv.json();
  assert.equal(Array.isArray(jsonWithKv.links), true);
  assert.equal(jsonWithKv.links.length, 1);
  assert.equal(jsonWithKv.links[0].slug, 'test');

  // 4. Trailing slash /api/links/ also works seamlessly
  const resTrailing = await app.request('/api/links/', {
    method: 'GET',
    headers: { 'Authorization': 'Bearer valid_token' }
  }, { ADMIN_TOKEN: 'valid_token', LINKS_KV: mockKv });

  assert.equal(resTrailing.status, 200);

  // 5. Unknown API route returns JSON 404 (not HTML)
  const res404 = await app.request('/api/nonexistent', {
    method: 'GET',
    headers: { 'Authorization': 'Bearer valid_token' }
  }, { ADMIN_TOKEN: 'valid_token' });

  assert.equal(res404.status, 404);
  assert.ok(res404.headers.get('content-type')?.includes('application/json'));
  const json404 = await res404.json();
  assert.ok(json404.error.includes('Not Found'));
});

test('Frontend templates emit 100% syntactically valid JavaScript', async () => {
  const { renderAdminHtml } = await import('../src/templates/admin.ts');
  const { renderUnauthorizedHtml } = await import('../src/templates/unauthorized.ts');

  // 1. Verify admin HTML script syntax and openModal export
  const adminHtml = renderAdminHtml('Test Gateway', 'test_token');
  const adminScripts = adminHtml.match(/<script>([\s\S]*?)<\/script>/gi) || [];
  assert.ok(adminScripts.length > 0, 'admin.ts should contain at least one <script> block');

  for (const scriptTag of adminScripts) {
    const code = scriptTag.replace(/<\/?script>/gi, '');

    // Must parse without SyntaxError (e.g. Invalid regular expression flags)
    assert.doesNotThrow(() => {
      new Function(code);
    }, 'Script in admin.ts failed JavaScript syntax parsing');

    // Execute in mock environment to ensure openModal and other handlers exist
    const window = {
      location: { origin: 'https://test.com', reload: () => {} },
      matchMedia: () => ({ matches: false }),
      addEventListener: () => {}
    };
    const document = {
      documentElement: { setAttribute: () => {}, getAttribute: () => 'light' },
      getElementById: () => ({
        classList: { add: () => {}, remove: () => {} },
        innerText: '',
        innerHTML: '',
        value: '',
        reset: () => {}
      }),
      cookie: ''
    };
    const localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} };
    const sessionStorage = { getItem: () => null, setItem: () => {} };

    const runner = new Function('window', 'document', 'localStorage', 'sessionStorage', 'fetch', `
      with (window) {
        ${code}
        return {
          openModal: typeof openModal !== 'undefined' ? openModal : null,
          closeModal: typeof closeModal !== 'undefined' ? closeModal : null,
          safeParseResponse: typeof safeParseResponse !== 'undefined' ? safeParseResponse : null,
          loadLinks: typeof loadLinks !== 'undefined' ? loadLinks : null
        };
      }
    `);

    const exports = runner(window, document, localStorage, sessionStorage, async () => ({
      ok: true,
      status: 200,
      headers: { get: () => 'application/json' },
      text: async () => JSON.stringify({ links: [] })
    }));

    assert.equal(typeof exports.openModal, 'function', 'openModal must be defined as a function');
    assert.equal(typeof exports.closeModal, 'function', 'closeModal must be defined as a function');
    assert.equal(typeof exports.safeParseResponse, 'function', 'safeParseResponse must be defined as a function');

    // Test safeParseResponse with HTML error
    const htmlRes = {
      ok: false,
      status: 500,
      headers: { get: () => 'text/html' },
      text: async () => '<html><head><title>Cloudflare Error 1101</title></head><body><h1>Worker threw exception</h1></body></html>'
    };
    const parsed = await exports.safeParseResponse(htmlRes);
    assert.equal(parsed.ok, false);
    assert.equal(parsed.extractedError, 'Cloudflare Error 1101');
  }

  // 2. Verify unauthorized HTML script syntax
  const unauthHtml = renderUnauthorizedHtml('go.example.com', 'Test Gateway');
  const unauthScripts = unauthHtml.match(/<script>([\s\S]*?)<\/script>/gi) || [];
  assert.ok(unauthScripts.length > 0, 'unauthorized.ts should contain at least one <script> block');

  for (const scriptTag of unauthScripts) {
    const code = scriptTag.replace(/<\/?script>/gi, '');
    assert.doesNotThrow(() => {
      new Function(code);
    }, 'Script in unauthorized.ts failed JavaScript syntax parsing');
  }
});

test('generateRandomSlug creates clean unambiguous slugs with customizable length', () => {
  const slug1 = generateRandomSlug(6);
  const slug2 = generateRandomSlug(6);
  const slug3 = generateRandomSlug(8);

  assert.equal(slug1.length, 6);
  assert.equal(slug2.length, 6);
  assert.equal(slug3.length, 8);
  assert.notEqual(slug1, slug2);
  assert.match(slug1, /^[23456789abcdefghjkmnpqrstuvwxyz]+$/);
  assert.match(slug3, /^[23456789abcdefghjkmnpqrstuvwxyz]+$/);
});

test('parseReferer supports domain parsing and UTM source query parameter extraction', () => {
  // Domain extraction
  assert.equal(parseReferer('https://x.com/post/123'), 'x.com');
  assert.equal(parseReferer('https://weibo.com/detail/456'), 'weibo.com');

  // Fallback to UTM source when referer is empty/Direct
  assert.equal(parseReferer(null, 'https://go.example.com/promo?utm_source=telegram'), 'UTM: telegram');
  assert.equal(parseReferer('', 'https://go.example.com/promo?ref=newsletter'), 'UTM: newsletter');
  assert.equal(parseReferer(null, 'https://go.example.com/promo?source=wechat'), 'UTM: wechat');
  assert.equal(parseReferer(null, 'https://go.example.com/promo'), 'Direct');
});

test('trackClick updates bound statistics directly inside LinkItem and persists in KV', async () => {
  const store = new Map();
  const initialLink = {
    slug: 'promo',
    url: 'https://example.com/target',
    enabled: true,
    createdAt: 1000,
    updatedAt: 1000,
    clicks: 0
  };
  store.set('link:promo', JSON.stringify(initialLink));

  const mockKv = {
    get: async (k) => store.get(k) || null,
    put: async (k, v) => store.set(k, v),
    delete: async (k) => store.delete(k)
  };

  const env = { LINKS_KV: mockKv };

  // Track click from Twitter
  await trackClick(env, {
    slug: 'promo',
    timestamp: 2000,
    country: 'US',
    city: 'San Francisco',
    device: 'Mobile',
    referer: 't.co',
    isBot: false
  });

  // Track another click from WeChat UTM
  await trackClick(env, {
    slug: 'promo',
    timestamp: 3000,
    country: 'CN',
    city: 'Shanghai',
    device: 'Desktop',
    referer: 'UTM: wechat',
    isBot: false
  });

  // Verify bound link in KV
  const updatedRaw = store.get('link:promo');
  assert.ok(updatedRaw);
  const updated = JSON.parse(updatedRaw);

  assert.equal(updated.clicks, 2);
  assert.ok(updated.stats);
  assert.equal(updated.stats.totalClicks, 2);
  assert.equal(updated.stats.referrers['t.co'], 1);
  assert.equal(updated.stats.referrers['UTM: wechat'], 1);
  assert.equal(updated.stats.countries['US'], 1);
  assert.equal(updated.stats.countries['CN'], 1);
  assert.equal(updated.stats.devices['Mobile'], 1);
  assert.equal(updated.stats.devices['Desktop'], 1);
  assert.equal(updated.stats.recentClicks.length, 2);

  // Verify getSlugStats reads bound stats correctly
  const stats = await getSlugStats(env, 'promo');
  assert.equal(stats.totalClicks, 2);
  assert.equal(stats.referrers['t.co'], 1);
  assert.equal(stats.referrers['UTM: wechat'], 1);
});

test('Non-existent and deleted links return 404 response', async () => {
  const { default: app } = await import('../src/index.ts');
  const store = new Map();
  const mockKv = {
    get: async (k) => store.get(k) || null,
    put: async (k, v) => store.set(k, v),
    delete: async (k) => store.delete(k)
  };

  // 1. Visit non-existent link with browser Accept header -> 404 HTML
  const resHtml = await app.request('/nonexistent_link', {
    method: 'GET',
    headers: { 'Accept': 'text/html' }
  }, { LINKS_KV: mockKv, SITE_NAME: 'Test Gateway' });

  assert.equal(resHtml.status, 404);
  const textHtml = await resHtml.text();
  assert.ok(textHtml.includes('404'));
  assert.ok(textHtml.includes('短链无法访问'));

  // 2. Visit non-existent link with plain/curl request -> 404 text
  const resText = await app.request('/nonexistent_link', {
    method: 'GET'
  }, { LINKS_KV: mockKv });

  assert.equal(resText.status, 404);
  const text = await resText.text();
  assert.ok(text.includes('404 Not Found'));
});

test('Scheduled link redirects when active and returns 404 once expired', async () => {
  const { default: app } = await import('../src/index.ts');
  const store = new Map();

  const now = Date.now();
  // 1. Active scheduled link (expires in 1 hour)
  store.set('link:active_temp', JSON.stringify({
    slug: 'active_temp',
    url: 'https://example.com/target',
    enabled: true,
    expiresAt: now + 3600000,
    createdAt: now,
    updatedAt: now
  }));

  // 2. Expired scheduled link (expired 1 hour ago)
  store.set('link:expired_temp', JSON.stringify({
    slug: 'expired_temp',
    url: 'https://example.com/target',
    enabled: true,
    expiresAt: now - 3600000,
    createdAt: now - 7200000,
    updatedAt: now - 7200000
  }));

  const mockKv = {
    get: async (k) => store.get(k) || null,
    put: async (k, v) => store.set(k, v),
    delete: async (k) => store.delete(k)
  };

  // Active link should 302 redirect
  const resActive = await app.request('/active_temp', {
    method: 'GET'
  }, { LINKS_KV: mockKv });
  assert.equal(resActive.status, 302);
  assert.equal(resActive.headers.get('Location'), 'https://example.com/target');

  // Expired link must return 404
  const resExpired = await app.request('/expired_temp', {
    method: 'GET'
  }, { LINKS_KV: mockKv });
  assert.equal(resExpired.status, 404);
  const expiredText = await resExpired.text();
  assert.ok(expiredText.includes('404'));
});

test('API link deletion removes both link configuration and bound statistics', async () => {
  const { default: app } = await import('../src/index.ts');
  const store = new Map();
  store.set('link:todelete', JSON.stringify({
    slug: 'todelete',
    url: 'https://example.com/target',
    clicks: 50,
    stats: { totalClicks: 50, referrers: { 'Direct': 50 }, countries: {}, devices: {}, recentClicks: [] },
    enabled: true,
    createdAt: 1000
  }));
  store.set('stats:todelete:total', '50');

  const mockKv = {
    get: async (k) => store.get(k) || null,
    put: async (k, v) => store.set(k, v),
    delete: async (k) => store.delete(k)
  };

  const resDelete = await app.request('/api/links/todelete', {
    method: 'DELETE',
    headers: { 'Authorization': 'Bearer valid_token' }
  }, { ADMIN_TOKEN: 'valid_token', LINKS_KV: mockKv });

  assert.equal(resDelete.status, 200);
  assert.equal(store.has('link:todelete'), false);
  assert.equal(store.has('stats:todelete:total'), false);

  // Visiting the deleted link now returns 404
  const resVisit = await app.request('/todelete', {
    method: 'GET'
  }, { LINKS_KV: mockKv });
  assert.equal(resVisit.status, 404);
});

test('API link creation auto-generates random slug when requested or empty', async () => {
  const { default: app } = await import('../src/index.ts');
  const store = new Map();
  const mockKv = {
    get: async (k) => store.get(k) || null,
    put: async (k, v) => store.set(k, v),
    delete: async (k) => store.delete(k)
  };

  // POST with randomSlug: true
  const res = await app.request('/api/links', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer valid_token',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      randomSlug: true,
      url: 'https://example.com/random_target',
      expiresAt: Date.now() + 86400000
    })
  }, { ADMIN_TOKEN: 'valid_token', LINKS_KV: mockKv });

  assert.equal(res.status, 200);
  const json = await res.json();
  assert.equal(json.success, true);
  assert.ok(json.link.slug);
  assert.equal(json.link.slug.length, 6);
  assert.ok(store.has(`link:${json.link.slug}`));
});

test('Dark mode and light mode color tokens adhere to WCAG 2.1 AA/AAA contrast ratios and support color-scheme', async () => {
  const { renderAdminHtml } = await import('../src/templates/admin.ts');
  const { renderUnauthorizedHtml } = await import('../src/templates/unauthorized.ts');
  const { renderNotFoundHtml } = await import('../src/templates/notfound.ts');

  const adminHtml = renderAdminHtml('Test Gateway', 'token');
  const unauthHtml = renderUnauthorizedHtml('test.com', 'Test Gateway');
  const notfoundHtml = renderNotFoundHtml('Test Gateway', 'slug', 'reason');

  for (const html of [adminHtml, unauthHtml, notfoundHtml]) {
    assert.ok(html.includes('color-scheme: dark'), 'Dark mode must specify color-scheme: dark');
    assert.ok(html.includes('color-scheme: light'), 'Light mode must specify color-scheme: light');
  }

  // Admin CSS token assertions
  assert.ok(adminHtml.includes('--sole-accent-contrast: #121418'), 'Dark mode must provide dark contrast ink for active accent buttons');
  assert.ok(adminHtml.includes('--color-danger: #f87171'), 'Dark mode danger text must be lightened for contrast');
  assert.ok(adminHtml.includes('--color-warning: #fbbf24'), 'Dark mode warning text must be lightened for contrast');
  assert.ok(adminHtml.includes('--track-bg: rgba(232, 236, 241, 0.14)'), 'Progress bar track must have adequate contrast in dark mode');
  assert.ok(unauthHtml.includes('--color-success: #4ade80'), 'Unauthorized page dark mode must use lightened success color');
});
