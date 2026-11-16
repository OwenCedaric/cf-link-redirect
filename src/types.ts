export interface Env {
  LINKS_KV: KVNamespace;
  ANALYTICS?: AnalyticsEngineDataset;
  ADMIN_TOKEN: string;
  DEFAULT_FALLBACK_URL: string;
  SITE_NAME: string;
}

export interface LinkItem {
  slug: string;
  url: string;
  title?: string;
  description?: string;
  ogImage?: string;
  enabled: boolean;
  createdAt: number;
  updatedAt: number;
  clicks?: number;
}

export interface ClickRecord {
  slug: string;
  timestamp: number;
  country: string;
  city: string;
  device: string;
  referer: string;
  isBot: boolean;
}

export interface LinkStats {
  slug: string;
  totalClicks: number;
  todayClicks: number;
  recentClicks: Array<{
    timestamp: number;
    country: string;
    city: string;
    device: string;
    referer: string;
  }>;
}
