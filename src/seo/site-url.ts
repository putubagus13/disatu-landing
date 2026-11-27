// This site's own public address (VITE_SITE_URL): the base of every canonical, hreflang, sitemap and share URL.
// Like the link to the other landing (lib/site-links.ts) it is never hard-coded: a production build without it is
// stopped by vite-env-guard.ts, so a page can never ship pointing search engines at the wrong address.
import { resolveSiteUrl } from '@/lib/resolve-site-url'

export const SITE_URL: string = resolveSiteUrl(
  import.meta.env.VITE_SITE_URL as string | undefined,
  // only in dev builds, so the local URL never ends up in a production bundle
  import.meta.env.DEV ? 'http://localhost:3001' : '',
  import.meta.env.DEV,
  'VITE_SITE_URL',
)
