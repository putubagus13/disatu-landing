// sitemap.xml as a pure function: every page in every language as an absolute URL, each with its language
// alternates (itself included) and x-default. No <lastmod>: nobody maintains one, and a wrong date is worse than none.
import type { Lang } from '@/i18n/lang'
import { DEFAULT_LANG } from '@/i18n/lang'

const escapeXml = (s: string): string => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')

/** `subPaths` are the pages below the language segment ('' is the home page, '/about' a page under it). */
export function buildSitemap(origin: string, subPaths: readonly string[], langs: readonly Lang[]): string {
  const url = (lang: Lang, sub: string): string => escapeXml(`${origin}/${lang}${sub}`)
  const entries = subPaths.flatMap((sub) => langs.map((lang) => ({ lang, sub })))
  const body = entries
    .map(({ lang, sub }) => {
      const alternates = [...langs.map((l) => ({ hreflang: l as string, href: url(l, sub) })), { hreflang: 'x-default', href: url(DEFAULT_LANG, sub) }]
      return [
        '  <url>',
        `    <loc>${url(lang, sub)}</loc>`,
        ...alternates.map((a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}"/>`),
        '  </url>',
      ].join('\n')
    })
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${body}\n</urlset>\n`
}
