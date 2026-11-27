import { describe, it, expect } from 'vitest'
import { waitFor, within } from '@testing-library/react'
import { renderWithRouter } from './utils'
import { getContent } from '@/content'
import { LANGS } from '@/i18n/lang'

describe.each(LANGS)('Disatu services on the homepage %s', (lang) => {
  const c = getContent(lang)
  it('lists the four kinds of work, with working contact links', async () => {
    await renderWithRouter(`/${lang}`)
    const sec = await waitFor(() => {
      const el = document.getElementById('services')
      if (!el) throw new Error('no services section')
      return el
    })
    expect(within(sec).getByRole('heading', { level: 2, name: c.services.title })).toBeInTheDocument()
    expect(c.services.items.map((i) => i.icon)).toEqual(['web', 'mobile', 'backend', 'webapp'])
    for (const i of c.services.items) {
      expect(within(sec).getByRole('heading', { level: 3, name: i.title })).toBeInTheDocument()
      expect(within(sec).getByText(i.description)).toBeInTheDocument()
    }
    const wa = within(sec).getByRole('link', { name: c.ui.whatsapp })
    expect(wa).toHaveAttribute('href', 'https://wa.me/6282184677520')
    expect(wa).toHaveAttribute('target', '_blank')
    expect(wa.getAttribute('rel')).toContain('noopener')
    expect(within(sec).getByRole('link', { name: c.ui.email })).toHaveAttribute('href', 'mailto:ptbagusraditya@gmail.com')
  })
})
