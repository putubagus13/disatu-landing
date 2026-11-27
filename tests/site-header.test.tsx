import { describe, it, expect, beforeEach } from 'vitest'
import { screen, waitFor, fireEvent, within } from '@testing-library/react'
import { renderWithRouter } from './utils'
import { getContent } from '@/content'
import { THEME_KEY } from '@/theme/theme'

beforeEach(() => {
  localStorage.clear()
  document.documentElement.classList.remove('dark')
})

describe.each(['id', 'en'] as const)('SiteHeader %s', (lang) => {
  const other = lang === 'id' ? 'en' : 'id'
  const c = getContent(lang)

  it('nav links and language switch', async () => {
    await renderWithRouter(`/${lang}/about`)
    const header = await screen.findByRole('banner')
    const links = within(header).getAllByRole('link')
    const hrefOf = (name: string) => links.find((a) => a.textContent === name)?.getAttribute('href')
    expect(c.nav.map((n) => hrefOf(n.label))).toEqual([`/${lang}#services`, `/${lang}#process`, `/${lang}#products`, `/${lang}/about`])
    const consult = within(header).getByRole('link', { name: c.ui.consult })
    expect(consult).toHaveAttribute('href', 'https://wa.me/6282184677520')
    expect(links.some((a) => /chartlab/i.test(a.getAttribute('href') ?? ''))).toBe(false)
    const sw = within(header).getByRole('link', { name: other.toUpperCase() })
    expect(sw.getAttribute('href')).toBe(`/${other}/about`)
    expect(within(header).getByRole('link', { name: lang.toUpperCase() })).toHaveAttribute('aria-current', 'page')
  })

  it('theme toggle cycles light -> dark -> system', async () => {
    await renderWithRouter(`/${lang}`)
    const header = await screen.findByRole('banner')
    const btn = await waitFor(() => {
      const b = within(header).getAllByRole('button').find((x) => /theme|tema/i.test(x.getAttribute('aria-label') ?? ''))
      if (!b) throw new Error('no toggle')
      return b
    })
    fireEvent.click(btn)
    expect(localStorage.getItem(THEME_KEY)).toBe('light')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    fireEvent.click(btn)
    expect(localStorage.getItem(THEME_KEY)).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    fireEvent.click(btn)
    expect(localStorage.getItem(THEME_KEY)).toBe('system')
  })

  it('mobile menu opens, closes on Escape and on link click', async () => {
    await renderWithRouter(`/${lang}`)
    const menuBtn = await screen.findByRole('button', { name: c.ui.menuOpen })
    expect(menuBtn).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(menuBtn)
    expect(menuBtn).toHaveAttribute('aria-expanded', 'true')
    expect(document.getElementById('mobile-menu')).toBeInTheDocument()
    fireEvent.keyDown(document, { key: 'Escape' })
    await waitFor(() => expect(menuBtn).toHaveAttribute('aria-expanded', 'false'))
    fireEvent.click(menuBtn)
    const menu = document.getElementById('mobile-menu')!
    fireEvent.click(within(menu).getByRole('link', { name: c.nav[2].label }))
    await waitFor(() => expect(menuBtn).toHaveAttribute('aria-expanded', 'false'))
  })

  it('mobile menu closes after switching language from inside it', async () => {
    await renderWithRouter(`/${lang}`)
    const menuBtn = await screen.findByRole('button', { name: c.ui.menuOpen })
    fireEvent.click(menuBtn)
    const menu = document.getElementById('mobile-menu')!
    fireEvent.click(within(menu).getByRole('link', { name: other.toUpperCase() }))
    await waitFor(() => expect(document.documentElement.lang).toBe(other))
    await waitFor(() => expect(screen.getByRole('button', { name: getContent(other).ui.menuOpen })).toHaveAttribute('aria-expanded', 'false'))
  })

  it('language switch keeps the hash after mount', async () => {
    await renderWithRouter(`/${lang}#services`)
    const header = await screen.findByRole('banner')
    await waitFor(() => expect(within(header).getByRole('link', { name: other.toUpperCase() })).toHaveAttribute('href', `/${other}#services`))
  })
})
