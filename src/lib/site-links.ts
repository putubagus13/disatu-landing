// Where the other landing lives. The two sites (Disatu, ChartLab) find each other only through build-time env vars,
// never a hard-coded production URL. A production build without the var is stopped by vite-env-guard.ts.
import type { Lang } from '@/i18n/lang'
import { resolveSiteUrl } from './resolve-site-url'

export { resolveSiteUrl }

/** The ChartLab landing (VITE_CHARTLAB_LANDING_URL). Dev default: its local dev server on port 3000. */
export const CHARTLAB_LANDING_URL: string = resolveSiteUrl(
  import.meta.env.VITE_CHARTLAB_LANDING_URL as string | undefined,
  // only in dev builds, so the local URL never ends up in a production bundle
  import.meta.env.DEV ? 'http://localhost:3000' : '',
  import.meta.env.DEV,
  'VITE_CHARTLAB_LANDING_URL',
)

/** A page on the ChartLab landing in the visitor's language: its home, or the app page. */
export function chartlabLandingHref(lang: Lang, path: '' | '/chartlab' = ''): string {
  return `${CHARTLAB_LANDING_URL}/${lang}${path}`
}
