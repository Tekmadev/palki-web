/**
 * Absolute site URL for metadata, sitemap and structured data.
 * Server-only: VERCEL_PROJECT_PRODUCTION_URL isn't exposed to the browser.
 *
 * Set NEXT_PUBLIC_SITE_URL (e.g. https://palkirestaurant.ca) when hosting
 * anywhere other than Vercel; on Vercel the production domain is used.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000')
).replace(/\/$/, '');
