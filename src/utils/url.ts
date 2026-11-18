/**
 * Merges query parameters from incoming request into the target URL.
 * Preserves UTM tags, referral codes, and tracking parameters.
 */
export function mergeQueryParams(targetUrl: string, requestUrl: string): string {
  try {
    const target = new URL(targetUrl);
    const incoming = new URL(requestUrl);

    // Append/merge incoming search params
    for (const [key, value] of incoming.searchParams.entries()) {
      if (!target.searchParams.has(key)) {
        target.searchParams.set(key, value);
      }
    }

    return target.toString();
  } catch {
    // If targetUrl is not a valid absolute URL, return as-is
    return targetUrl;
  }
}

/**
 * Generates a clean, readable random slug (lowercase alphanumeric, unambiguous characters).
 */
export function generateRandomSlug(length: number = 6): string {
  const chars = '23456789abcdefghjkmnpqrstuvwxyz';
  let result = '';
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  for (let i = 0; i < length; i++) {
    result += chars[bytes[i] % chars.length];
  }
  return result;
}
