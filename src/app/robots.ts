import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';

// Open to all crawlers, including AI search (GPTBot, ClaudeBot, PerplexityBot, Google-Extended).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
