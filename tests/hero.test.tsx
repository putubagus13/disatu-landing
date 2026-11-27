import { describe, it, expect } from 'vitest'
import { renderToString } from 'react-dom/server'
import { RouterProvider, createRouter, createMemoryHistory } from '@tanstack/react-router'
import { screen, waitFor, within } from '@testing-library/react'
import { routeTree } from '@/routeTree.gen'
import { renderWithRouter } from './utils'
import { getContent } from '@/content'
import { LANGS } from '@/i18n/lang'

describe('Hero', () => {
  it('server-renders without touching browser APIs', async () => {
    const router = createRouter({ routeTree, history: createMemoryHistory({ initialEntries: ['/id'] }) })
    await router.load()
    const html = renderToString(<RouterProvider router={router} />)
    expect(html).toContain(getContent('id').hero.title)
  })

  describe.each(LANGS)('%s', (lang) => {
    const c = getContent(lang)
    it('renders copy, CTAs and the animated visual', async () => {
      await renderWithRouter(`/${lang}`)
      const hero = await waitFor(() => {
        const el = document.getElementById('hero')
        if (!el) throw new Error('no hero')
        return el
      })
      const h1s = within(hero).getAllByRole('heading', { level: 1 })
      expect(h1s).toHaveLength(1)
      expect(h1s[0]).toHaveTextContent(c.hero.title)
      const open = within(hero).getByRole('link', { name: c.ui.tryFree })
      expect(open).toHaveAttribute('href', `http://localhost:3000/${lang}`)
      expect(open).not.toHaveAttribute('target')
      expect(within(hero).getByRole('link', { name: c.ui.seeApp })).toHaveAttribute('href', `/${lang}#chartlab`)
      expect(within(hero).getByRole('img')).toHaveAttribute('aria-label', c.ui.visualLabel)
      expect(hero.textContent ?? '').not.toMatch(/strata/i)
      expect(within(hero).getByText(c.hero.bundleNote)).toBeInTheDocument()
      expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    })
  })
})
