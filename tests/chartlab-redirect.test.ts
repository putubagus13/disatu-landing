import { describe, it, expect } from 'vitest'
import { isRedirect } from '@tanstack/react-router'
import { Route } from '@/routes/$lang/chartlab'
import { LANGS } from '@/i18n/lang'

// /{lang}/chartlab used to embed the app here, and those links are already shared. ChartLab now has its own landing,
// so the old address sends visitors to the app page there, in the same language.
describe.each(LANGS)('/%s/chartlab', (lang) => {
  it('redirects (temporarily, so a corrected URL takes effect for everyone) to the ChartLab landing app page in the same language', () => {
    const beforeLoad = Route.options.beforeLoad as (ctx: unknown) => unknown
    let thrown: unknown
    try {
      beforeLoad({ params: { lang } })
    } catch (e) {
      thrown = e
    }
    expect(isRedirect(thrown)).toBe(true)
    const r = thrown as { options: { href?: string; statusCode?: number } }
    expect(r.options.href).toBe(`http://localhost:3000/${lang}/chartlab`)
    expect(r.options.statusCode).toBe(307)
  })
})
