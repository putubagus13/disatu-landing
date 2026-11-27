import { createFileRoute, redirect } from '@tanstack/react-router'
import { isLang } from '@/i18n/lang'
import { chartlabLandingHref } from '@/lib/site-links'

// ChartLab has its own landing now. This address used to embed the app here and is already shared, so it sends
// visitors on to the app page on the ChartLab landing, in the same language. 307, not 301: browsers cache a 301
// forever, so a wrong first value of VITE_CHARTLAB_LANDING_URL would keep misdirecting visitors after it is fixed.
export const Route = createFileRoute('/$lang/chartlab')({
  beforeLoad: ({ params }) => {
    throw redirect({ href: chartlabLandingHref(isLang(params.lang) ? params.lang : 'id', '/chartlab'), statusCode: 307 })
  },
})
