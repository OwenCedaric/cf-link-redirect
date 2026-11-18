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
 * Extracts friendly referrer domain or UTM source.
 */
export function parseReferer(referer: string | null, requestUrl?: string): string {
  if (referer) {
    try {
      const url = new URL(referer);
      return url.hostname.replace(/^www\./, '');
    } catch {
      return 'Unknown';
    }
  }

  // If no referer, check UTM or referral params in incoming requestUrl
  if (requestUrl) {
    try {
      const u = new URL(requestUrl);
      const utmSource = u.searchParams.get('utm_source') || u.searchParams.get('source') || u.searchParams.get('ref');
      if (utmSource) {
        return `UTM: ${utmSource.slice(0, 30)}`;
      }
    } catch {}
  }

  return 'Direct';
}
