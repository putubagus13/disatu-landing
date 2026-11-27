import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { render, screen, waitFor, within } from '@testing-library/react'
import { LinkButton } from '@/components/ui/button'
import { renderWithRouter } from './utils'
import { getContent } from '@/content'

const css = readFileSync('src/styles.css', 'utf8')
const shiny = css.slice(css.indexOf('/* ---- Shiny button'))

describe('LinkButton', () => {
  const c = getContent('id')

  it('primary buttons use the shiny style, with the label in the span the effect hangs on', async () => {
    await renderWithRouter('/id')
    const header = await screen.findByRole('banner')
    const cta = within(header).getByRole('link', { name: c.ui.consult })
    expect(cta.className).toContain('shiny-cta')
    expect(cta.querySelector(':scope > span')?.textContent).toBe(c.ui.consult)
    expect(cta).toHaveAttribute('href', 'https://wa.me/6282184677520') // WhatsApp: its own tab
    expect(cta).toHaveAttribute('target', '_blank')
  })

  it('external links open in a new tab unless newTab is false', () => {
    const { container } = render(
      <>
        <LinkButton external href="https://wa.me/1">a</LinkButton>
        <LinkButton external newTab={false} href="https://x.vercel.app/id">b</LinkButton>
      </>,
    )
    const [a, b] = Array.from(container.querySelectorAll('a'))
    expect(a).toHaveAttribute('target', '_blank')
    expect(a).toHaveAttribute('rel', 'noopener noreferrer')
    expect(b).not.toHaveAttribute('target')
    expect(b).toHaveAttribute('href', 'https://x.vercel.app/id')
  })

  it('ghost buttons stay quiet outlines', async () => {
    await renderWithRouter('/id')
    const hero = await waitFor(() => {
      const el = document.getElementById('hero')
      if (!el) throw new Error('no hero')
      return el
    })
    const ghost = within(hero).getByRole('link', { name: c.ui.seeServices })
    expect(ghost.className).not.toContain('shiny-cta')
    expect(ghost.className).toContain('border')
  })
})

describe('shiny button stylesheet', () => {
  it('exists and is built on the registered gradient properties', () => {
    expect(shiny.length).toBeGreaterThan(200)
    for (const p of ['--gradient-angle', '--gradient-angle-offset', '--gradient-percent', '--gradient-shine']) {
      expect(shiny).toContain(`@property ${p}`)
    }
  })
  it('uses brand colours (green highlight, logo-yellow shine), not the example blue', () => {
    expect(shiny).toMatch(/--shiny-cta-highlight:\s*#3fa37f/i)
    expect(shiny).toMatch(/#ffd33f/i)
    expect(shiny).not.toMatch(/highlight:\s*blue/i)
    expect(shiny).not.toMatch(/#8484ff/i)
  })
  it('dims the cursor-tubes glow while the pointer is on an interactive element, so labels stay readable', () => {
    expect(css).toMatch(/body:has\([^)]*a:hover[^)]*button:hover[^)]*\)\s*\.cursor-tubes\s*\{[^}]*opacity/)
  })
  it('does not pull a web font from Google and switches animation off for reduced motion', () => {
    expect(shiny).not.toMatch(/@import/)
    expect(shiny).toMatch(/prefers-reduced-motion:\s*reduce\)[\s\S]*animation:\s*none/)
  })
})
