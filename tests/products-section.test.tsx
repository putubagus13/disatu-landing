import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import { waitFor, within } from '@testing-library/react'
import { renderWithRouter } from './utils'
import { getContent } from '@/content'
import { LANGS } from '@/i18n/lang'

describe('ChartLab logo files', () => {
  it.each(['chartlab-horizontal-color.svg', 'chartlab-horizontal-reverse-transparent.svg'])('has public/brand/%s', (f) => {
    expect(fs.existsSync(`public/brand/${f}`)).toBe(true)
  })
})

describe.each(LANGS)('ProductsSection %s', (lang) => {
  const c = getContent(lang)
  const p = c.products.items[0]

  async function section() {
    await renderWithRouter(`/${lang}`)
    return waitFor(() => {
      const el = document.getElementById('products')
      if (!el) throw new Error('no products section')
      return el
    })
  }

  it('presents ChartLab as a product Disatu built, with its features', async () => {
    const sec = await section()
    expect(within(sec).getByRole('heading', { level: 2, name: c.products.title })).toBeInTheDocument()
    expect(within(sec).getByText(p.badge)).toBeInTheDocument()
    expect(within(sec).getByText(p.description)).toBeInTheDocument()
    for (const f of p.features) expect(within(sec).getByText(f)).toBeInTheDocument()
  })

  it('shows the ChartLab logo per theme, at least 112 px wide', async () => {
    const sec = await section()
    const imgs = sec.querySelectorAll('img[alt="ChartLab"]')
    expect(imgs).toHaveLength(2)
    const light = sec.querySelector('img[src="/brand/chartlab-horizontal-color.svg"]')!
    const dark = sec.querySelector('img[src="/brand/chartlab-horizontal-reverse-transparent.svg"]')!
    expect(light.className).toContain('dark:hidden')
    expect(dark.className).toContain('hidden')
    expect(dark.className).toContain('dark:block')
    for (const img of [light, dark]) expect(img.className).toMatch(/\bw-(2[89]|3\d|[4-9]\d)\b/)
  })

  it('sends visitors to the ChartLab landing in their language, in the same tab', async () => {
    const sec = await section()
    const cta = within(sec).getByRole('link', { name: p.cta })
    expect(cta).toHaveAttribute('href', `http://localhost:3000/${lang}`)
    expect(cta).not.toHaveAttribute('target')
  })

  it('carries no endorsement marks (this is Disatu’s own site)', async () => {
    const sec = await section()
    expect(sec.querySelector('img[src*="endorsed"]')).toBeNull()
    expect(sec.querySelector('img[src*="badge-"]')).toBeNull()
  })
})
