import { createFileRoute } from '@tanstack/react-router'
import { LANGS } from '@/i18n/lang'
import { INDEXABLE_PAGES } from '@/seo/pages'
import { SITE_URL } from '@/seo/site-url'
import { buildSitemap } from '@/seo/sitemap'

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: () =>
        new Response(buildSitemap(SITE_URL, INDEXABLE_PAGES, LANGS), {
          headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
          },
        }),
    },
  },
})
