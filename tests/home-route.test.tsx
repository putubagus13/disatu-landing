import { describe, it, expect } from 'vitest'
import { waitFor } from '@testing-library/react'
import { renderWithRouter } from './utils'
import { getContent } from '@/content'
import { LANGS } from '@/i18n/lang'

describe.each(LANGS)('home route %s', (lang) => {
  const c = getContent(lang)
  it('renders the Disatu sections in order, with the services title', async () => {
    await renderWithRouter(`/${lang}`)
    await waitFor(() => expect(document.getElementById('contact')).not.toBeNull())
    const ids = Array.from(document.querySelectorAll('main section[id]')).map((s) => s.id)
    expect(ids).toEqual(['hero', 'services', 'portfolio', 'process', 'products', 'about', 'contact'])
    await waitFor(() => expect(document.title).toBe(c.meta.homeTitle))
  })
  it('emits hreflang alternates', async () => {
    await renderWithRouter(`/${lang}`)
    await waitFor(() => {
      const hrefs = Array.from(document.querySelectorAll('link[rel="alternate"][hreflang]')).map((l) => `${l.getAttribute('hreflang')}=${l.getAttribute('href')}`)
      expect(hrefs).toEqual(expect.arrayContaining(['id=/id', 'en=/en', 'x-default=/id']))
    })
  })
})
