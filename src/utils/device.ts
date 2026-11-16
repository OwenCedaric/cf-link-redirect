/**
 * Parses simplified device categories from User-Agent.
 */
export function parseDevice(userAgent: string | null): string {
  if (!userAgent) return 'Unknown';
  const ua = userAgent.toLowerCase();

  if (ua.includes('ipad') || ua.includes('tablet') || (ua.includes('android') && !ua.includes('mobile'))) {
    return 'Tablet';
  }
  if (ua.includes('mobile') || ua.includes('iphone') || ua.includes('android') || ua.includes('ipod')) {
    return 'Mobile';
  }
  if (ua.includes('macintosh') || ua.includes('windows') || ua.includes('linux')) {
    return 'Desktop';
  }
  return 'Other';
}

/**
 * Extracts friendly referrer domain or category.
 */
export function parseReferer(referer: string | null): string {
  if (!referer) return 'Direct';
  try {
    const url = new URL(referer);
    return url.hostname.replace(/^www\./, '');
  } catch {
    return 'Unknown';
  }
}
