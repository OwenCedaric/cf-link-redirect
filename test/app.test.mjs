import test from 'node:test';
import assert from 'node:assert/strict';
import { isBot, renderOpenGraphHtml } from '../src/utils/bot.ts';
import { parseDevice, parseReferer } from '../src/utils/device.ts';
import { mergeQueryParams } from '../src/utils/url.ts';

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
