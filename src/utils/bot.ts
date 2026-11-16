import type { LinkItem } from '../types';

const BOT_USER_AGENTS = [
  'twitterbot',
  'facebookexternalhit',
  'line-poker',
  'meta-externalagent',
  'telegrambot',
  'discordbot',
  'slackbot',
  'whatsapp',
  'skypeuripreview',
  'linkedinbot',
  'applebot',
  'googlebot',
  'bingbot',
  'duckduckbot',
  'yandexbot',
  'baiduspider',
  'redditbot',
  'pinterest',
  'mastodon',
  'misskey',
  'bluesky',
  'threads'
];

/**
 * Checks if the request User-Agent corresponds to a known social media or search crawler.
 */
export function isBot(userAgent: string | null): boolean {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return BOT_USER_AGENTS.some((bot) => ua.includes(bot));
}

/**
 * Renders an HTML page equipped with OpenGraph meta tags so social networks preview nicely.
 */
export function renderOpenGraphHtml(link: LinkItem, targetUrl: string, siteName: string = 'Link Gateway'): string {
  const title = escapeHtml(link.title || link.slug);
  const description = escapeHtml(link.description || `Redirecting to ${link.url}`);
  const escapedUrl = escapeHtml(targetUrl);
  const imageTag = link.ogImage
    ? `<meta property="og:image" content="${escapeHtml(link.ogImage)}" />
       <meta name="twitter:image" content="${escapeHtml(link.ogImage)}" />`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - ${escapeHtml(siteName)}</title>
  
  <!-- Open Graph / Facebook / Discord / Telegram -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${escapedUrl}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:site_name" content="${escapeHtml(siteName)}" />
  ${imageTag}

  <!-- Twitter / X -->
  <meta name="twitter:card" content="${link.ogImage ? 'summary_large_image' : 'summary'}" />
  <meta name="twitter:url" content="${escapedUrl}" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />

  <!-- Immediate Client Redirection for crawlers that execute JS/Meta Refresh -->
  <meta http-equiv="refresh" content="0;url=${escapedUrl}">
  <script>
    window.location.replace(${JSON.stringify(targetUrl)});
  </script>
</head>
<body style="font-family: 'Noto Serif SC', Songti SC, Source Han Serif SC, Georgia, serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background-color: #fbf9f6; color: #16181d;">
  <div style="text-align: center; padding: 2rem; max-width: 480px;">
    <div style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">正在前往目标页面...</div>
    <p style="font-family: -apple-system, BlinkMacSystemFont, 'Noto Sans SC', sans-serif; font-size: 13px; color: #464e5f; line-height: 1.8;">
      若页面未自动跳转，请 <a href="${escapedUrl}" style="color: #537791; text-decoration: underline; text-underline-offset: 3px;">点击此处直接访问</a>。
    </p>
  </div>
</body>
</html>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
