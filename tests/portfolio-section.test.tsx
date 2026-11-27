import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import { waitFor, within } from '@testing-library/react'
import { renderWithRouter } from './utils'
import { getContent } from '@/content'
import { LANGS } from '@/i18n/lang'

const FILES = {
  captivad: 'public/portfolio/captivad.webp',
  geoarthasemesta: 'public/portfolio/geoarthasemesta.webp',
  'organization-dashboard': 'public/portfolio/organization-dashboard.webp',
} as const
const SITES: Record<string, string> = {
  captivad: 'https://www.captivad.co',
  geoarthasemesta: 'https://www.geoarthasemesta.com',
}

describe('portfolio screenshots', () => {
  it.each(Object.entries(FILES))('%s is an optimised webp, small enough for a landing page', (_id, file) => {
    expect(fs.existsSync(file)).toBe(true)
    expect(fs.statSync(file).size).toBeLessThan(400 * 1024)
  })
  it('does not ship the 8 MB originals from public/', () => {
    expect(fs.readdirSync('public/portfolio').filter((f) => f.endsWith('.png'))).toEqual([])
  })
})

describe.each(LANGS)('PortfolioSection %s', (lang) => {
  const c = getContent(lang)

  async function section() {
    await renderWithRouter(`/${lang}`)
    return waitFor(() => {
      const el = document.getElementById('portfolio')
      if (!el) throw new Error('no portfolio section')
      return el
    })
  }

  it('lists the three projects: two company profile sites and the organisation dashboard', () => {
    expect(c.portfolio.items.map((p) => p.id)).toEqual(['captivad', 'geoarthasemesta', 'organization-dashboard'])
    expect(c.portfolio.items.map((p) => p.name)).toEqual(['Captivad', 'PT GEO Artha Semesta', expect.any(String)])
  })

  it('has a title, and each project a name, a kind, a description and its highlights', async () => {
    const sec = await section()
    expect(within(sec).getByRole('heading', { level: 2, name: c.portfolio.title })).toBeInTheDocument()
    for (const p of c.portfolio.items) {
      expect(within(sec).getByRole('heading', { level: 3, name: p.name })).toBeInTheDocument()
      expect(within(sec).getAllByText(p.kind).length).toBeGreaterThan(0) // the two websites share a kind
      expect(within(sec).getByText(p.description)).toBeInTheDocument()
      for (const h of p.highlights) expect(within(sec).getByText(h)).toBeInTheDocument()
    }
  })

  it('shows each screenshot with descriptive alt text and its size, lazy-loaded', async () => {
    const sec = await section()
    for (const p of c.portfolio.items) {
      const img = within(sec).getByRole('img', { name: p.imageAlt })
      expect(img).toHaveAttribute('src', `/portfolio/${p.id}.webp`)
      expect(img).toHaveAttribute('width')
      expect(img).toHaveAttribute('height')
      expect(img).toHaveAttribute('loading', 'lazy')
    }
  })

  it('links the two live websites in a new tab, and does not link the login-only dashboard', async () => {
    const sec = await section()
    for (const p of c.portfolio.items) {
      const link = within(sec).queryByRole('link', { name: p.visit ?? '__none__' })
      if (SITES[p.id]) {
        expect(p.visit).toBeTruthy()
        expect(link).toHaveAttribute('href', SITES[p.id])
        expect(link).toHaveAttribute('target', '_blank')
        expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      } else {
        expect(p.visit).toBeUndefined()
        expect(link).toBeNull()
      }
    }
    expect(within(sec).getAllByRole('link')).toHaveLength(Object.keys(SITES).length)
  })
})
