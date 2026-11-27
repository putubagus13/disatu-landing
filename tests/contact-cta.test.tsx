import { describe, it, expect } from 'vitest'
import { waitFor, within } from '@testing-library/react'
import { renderWithRouter } from './utils'
import { getContent } from '@/content'
import { LANGS } from '@/i18n/lang'

describe.each(LANGS)('ContactCta %s', (lang) => {
  const c = getContent(lang)
  it('closes the page with a WhatsApp and an email call to action', async () => {
    await renderWithRouter(`/${lang}`)
    const sec = await waitFor(() => {
      const el = document.getElementById('contact')
      if (!el) throw new Error('no contact section')
      return el
    })
    expect(within(sec).getByRole('heading', { level: 2, name: c.contactCta.title })).toBeInTheDocument()
    expect(within(sec).getByText(c.contactCta.subtitle)).toBeInTheDocument()
    const hrefs = within(sec).getAllByRole('link').map((a) => a.getAttribute('href'))
    expect(hrefs).toEqual(['https://wa.me/6282184677520', 'mailto:ptbagusraditya@gmail.com'])
  })
})
