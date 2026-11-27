import { describe, it, expect } from 'vitest'
import { waitFor, within } from '@testing-library/react'
import { renderWithRouter } from './utils'
import { getContent } from '@/content'
import { LANGS } from '@/i18n/lang'

describe.each(LANGS)('AboutTeaser %s', (lang) => {
  const c = getContent(lang)
  it('shows the founding year and the principle, and links to the About page', async () => {
    await renderWithRouter(`/${lang}`)
    const sec = await waitFor(() => {
      const el = document.getElementById('about')
      if (!el) throw new Error('no about teaser')
      return el
    })
    expect(within(sec).getByRole('heading', { level: 2, name: c.aboutTeaser.title })).toBeInTheDocument()
    expect(within(sec).getByText(c.aboutTeaser.text)).toBeInTheDocument()
    expect(within(sec).getByText('2024')).toBeInTheDocument()
    expect(within(sec).getByText(c.about.company.principle)).toBeInTheDocument()
    expect(within(sec).getByRole('link', { name: c.aboutTeaser.cta })).toHaveAttribute('href', `/${lang}/about`)
  })
})
