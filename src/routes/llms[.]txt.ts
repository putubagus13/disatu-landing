import { createFileRoute } from '@tanstack/react-router'
import { getContent } from '@/content'
import { CHARTLAB_LANDING_URL } from '@/lib/site-links'
import { buildLlmsTxt } from '@/seo/llms'
import { SITE_URL } from '@/seo/site-url'

export const Route = createFileRoute('/llms.txt')({
  server: {
    handlers: {
      GET: () =>
        new Response(buildLlmsTxt(SITE_URL, { id: getContent('id'), en: getContent('en') }, CHARTLAB_LANDING_URL), {
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
          },
        }),
    },
  },
})
