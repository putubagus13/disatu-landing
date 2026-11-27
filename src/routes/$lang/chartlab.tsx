import { createFileRoute, redirect } from '@tanstack/react-router'
import { isLang } from '@/i18n/lang'
import { chartlabLandingHref } from '@/lib/site-links'

// ChartLab has its own landing now. This address used to embed the app here and is already shared, so it sends
// visitors on to the app page on the ChartLab landing, in the same language.
export const Route = createFileRoute('/$lang/chartlab')({
  beforeLoad: ({ params }) => {
    throw redirect({ href: chartlabLandingHref(isLang(params.lang) ? params.lang : 'id', '/chartlab'), statusCode: 301 })
  },
})
