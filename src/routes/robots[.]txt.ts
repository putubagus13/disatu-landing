import { createFileRoute } from '@tanstack/react-router'
import { SITE_URL } from '@/seo/site-url'
import { buildRobots } from '@/seo/robots'

export const Route = createFileRoute('/robots.txt')({
  server: {
    handlers: {
      GET: () =>
        new Response(buildRobots(SITE_URL), {
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
          },
        }),
    },
  },
})
