import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, priority: 1 },
    { url: `${siteUrl}/banquet`, priority: 0.9 },
    { url: `${siteUrl}/menu`, priority: 0.8 },
  ];
}
