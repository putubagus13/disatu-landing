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

  it('is built in parallax layers: the glow, the mesh and the text, each moving at its own pace', async () => {
    await renderWithRouter('/id')
    const hero = await waitFor(() => {
      const el = document.getElementById('hero')
      if (!el) throw new Error('no hero')
      return el
    })
    const layers = Array.from(hero.querySelectorAll('[data-parallax]')).map((l) => l.getAttribute('data-parallax'))
    expect(layers).toEqual(['glow', 'bg', 'content'])
    expect(hero.querySelector('[data-parallax="bg"] [data-wave-mesh]')).not.toBeNull()
    expect(hero.querySelector('[data-parallax="content"] h1')).not.toBeNull()
  })

  describe.each(LANGS)('%s', (lang) => {
    const c = getContent(lang)
    it('says what Disatu does and offers a consult first, then the services', async () => {
      await renderWithRouter(`/${lang}`)
      const hero = await waitFor(() => {
        const el = document.getElementById('hero')
        if (!el) throw new Error('no hero')
        return el
      })
      const h1s = within(hero).getAllByRole('heading', { level: 1 })
      expect(h1s).toHaveLength(1)
      expect(h1s[0]).toHaveTextContent(c.hero.title)
      expect(within(hero).getByText(c.hero.eyebrow)).toBeInTheDocument()
      expect(within(hero).getByText(c.hero.subtitle)).toBeInTheDocument()
      const links = within(hero).getAllByRole('link')
      expect(links[0]).toHaveTextContent(c.ui.consult)
      expect(links[0]).toHaveAttribute('href', 'https://wa.me/6282184677520')
      expect(links[1]).toHaveTextContent(c.ui.seeServices)
      expect(links[1]).toHaveAttribute('href', `/${lang}#services`)
      for (const a of links) expect(a.getAttribute('href') ?? '').not.toMatch(/chartlab/i)
      // the wave mesh is decoration, so it is hidden from assistive tech and carries no image role
      const mesh = hero.querySelector('[data-wave-mesh]') as HTMLElement
      expect(mesh).not.toBeNull()
      expect(mesh.closest('[aria-hidden="true"]')).not.toBeNull()
      expect(within(hero).queryByRole('img')).toBeNull()
      expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    })
  })
})
