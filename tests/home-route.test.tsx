import { describe, it, expect } from 'vitest'
import { waitFor } from '@testing-library/react'
import { renderWithRouter } from './utils'
import { getContent } from '@/content'
import { LANGS } from '@/i18n/lang'
import { SITE_URL } from '@/seo/site-url'

describe.each(LANGS)('home route %s', (lang) => {
  const c = getContent(lang)
  it('renders the Disatu sections in order, with the services title', async () => {
    await renderWithRouter(`/${lang}`)
    await waitFor(() => expect(document.getElementById('contact')).not.toBeNull())
    const ids = Array.from(document.querySelectorAll('main section[id]')).map((s) => s.id)
    expect(ids).toEqual(['hero', 'services', 'portfolio', 'process', 'products', 'about', 'contact'])
    await waitFor(() => expect(document.title).toBe(c.meta.homeTitle))
  })
  it('emits absolute hreflang alternates and a self-referencing canonical', async () => {
    await renderWithRouter(`/${lang}`)
    await waitFor(() => {
      const hrefs = Array.from(document.querySelectorAll('link[rel="alternate"][hreflang]')).map((l) => `${l.getAttribute('hreflang')}=${l.getAttribute('href')}`)
      expect(hrefs).toEqual(expect.arrayContaining([`id=${SITE_URL}/id`, `en=${SITE_URL}/en`, `x-default=${SITE_URL}/id`]))
      expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(`${SITE_URL}/${lang}`)
    })
  })
  it('describes the company in structured data', async () => {
    await renderWithRouter(`/${lang}`)
    await waitFor(() => {
      const ld = Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map((s) => JSON.parse(s.textContent ?? '{}'))
      expect(ld).toHaveLength(1)
      expect(JSON.stringify(ld[0])).toContain('"ProfessionalService"')
    })
  })
})
