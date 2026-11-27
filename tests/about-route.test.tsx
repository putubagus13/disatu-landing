import { describe, it, expect } from 'vitest'
import { fireEvent, screen, waitFor, within } from '@testing-library/react'
import { renderWithRouter } from './utils'
import { getContent } from '@/content'
import { LANGS } from '@/i18n/lang'

describe.each(LANGS)('about route %s', (lang) => {
  const c = getContent(lang)
  const f = c.about.founder

  async function page() {
    await renderWithRouter(`/${lang}/about`)
    await screen.findByRole('heading', { level: 1 })
    return screen.getByRole('main')
  }
  const button = (main: HTMLElement, name: string) => within(main).getByRole('button', { name })

  it('is about Disatu: heading, founding year, what it does, and its principle', async () => {
    const main = await page()
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(c.about.company.title)
    expect(within(main).getByText(c.about.company.tag)).toBeInTheDocument()
    expect(c.about.company.tag).toContain('2024')
    expect(within(main).getByText(c.about.company.intro)).toBeInTheDocument()
    expect(within(main).getByText(c.about.company.principle)).toBeInTheDocument()
    expect(within(main).getByText(c.about.company.principleTitle)).toBeInTheDocument()
    await waitFor(() => expect(document.title).toBe(c.meta.aboutTitle))
    expect(c.meta.aboutTitle).toMatch(/Disatu/)
  })

  it('carries the Disatu logo as a decorative silhouette, clipped by its own section so it cannot widen the page', async () => {
    const main = await page()
    const mark = main.querySelector('[data-brand-silhouette]') as HTMLElement
    expect(mark).not.toBeNull()
    expect(mark.getAttribute('aria-hidden')).toBe('true')
    const host = mark.parentElement as HTMLElement // it is absolutely positioned and bleeds off the edge
    expect(host.className).toMatch(/\brelative\b/)
    expect(host.className).toMatch(/overflow-hidden/)
  })

  it('introduces the founder with photo, name, role and a short summary only', async () => {
    const main = await page()
    expect(f.name).toBe('Putu Bagus Raditya')
    expect(within(main).getByRole('heading', { level: 2, name: f.name })).toBeInTheDocument()
    expect(within(main).getByText(f.role)).toBeInTheDocument()
    expect(within(main).getByText(f.summary)).toBeInTheDocument()
    expect(within(main).getByText(f.location)).toBeInTheDocument()
    const photo = within(main).getByRole('img', { name: f.name })
    expect(photo.getAttribute('src')).toBe('/assets/profile-picture.JPG')
    // skills, experience and education wait behind buttons
    for (const name of [c.ui.skillsTitle, c.ui.experienceTitle, c.ui.educationTitle]) {
      expect(button(main, name)).toHaveAttribute('aria-expanded', 'false')
    }
    expect(within(main).queryByText('React')).toBeNull()
    expect(within(main).queryByText('NoLimit Indonesia')).toBeNull()
    expect(within(main).queryByText(f.education[0].school)).toBeNull()
  })

  it('opens skills, experience and education on demand, one at a time, and closes again', async () => {
    const main = await page()
    const skills = button(main, c.ui.skillsTitle)
    fireEvent.click(skills)
    expect(skills).toHaveAttribute('aria-expanded', 'true')
    for (const g of f.skills) {
      expect(within(main).getByRole('heading', { level: 3, name: g.group })).toBeInTheDocument()
      for (const item of g.items) expect(within(main).getByText(item)).toBeInTheDocument()
    }
    expect(within(main).getByText('Smart Money Concept')).toBeInTheDocument()

    const exp = button(main, c.ui.experienceTitle)
    fireEvent.click(exp)
    expect(exp).toHaveAttribute('aria-expanded', 'true')
    expect(skills).toHaveAttribute('aria-expanded', 'false')
    expect(within(main).queryByText('React')).toBeNull()
    const items = Array.from(main.querySelectorAll('#founder-panel ol > li'))
    expect(items).toHaveLength(f.experiences.length)
    expect(items[0]).toHaveTextContent('NoLimit Indonesia')
    f.experiences.forEach((e, i) => {
      expect(items[i]).toHaveTextContent(e.role)
      expect(items[i]).toHaveTextContent(e.period)
    })

    const edu = button(main, c.ui.educationTitle)
    fireEvent.click(edu)
    expect(within(main).getByText(f.education[0].degree)).toBeInTheDocument()
    expect(within(main).getByText(f.education[0].school)).toBeInTheDocument()

    fireEvent.click(edu) // the same button closes it
    expect(edu).toHaveAttribute('aria-expanded', 'false')
    expect(within(main).queryByText(f.education[0].school)).toBeNull()
  })

  it('shows contact details as text, the call-to-action buttons once each, and no social links', async () => {
    const main = await page()
    expect(within(main).getByRole('link', { name: '+62 821-8467-7520' })).toHaveAttribute('href', 'https://wa.me/6282184677520')
    expect(within(main).getByRole('link', { name: 'ptbagusraditya@gmail.com' })).toHaveAttribute('href', 'mailto:ptbagusraditya@gmail.com')
    expect(within(main).getAllByRole('link', { name: c.ui.whatsapp })).toHaveLength(1)
    expect(within(main).getAllByRole('link', { name: c.ui.email })).toHaveLength(1)
    expect(c.about.socials).toEqual([])
    for (const name of ['X', 'LinkedIn', 'GitHub']) expect(within(main).queryByRole('link', { name })).toBeNull()
  })

  it('ends by sending people to ChartLab', async () => {
    const main = await page()
    const cta = within(main).getByRole('link', { name: c.ui.aboutCta })
    expect(cta).toHaveAttribute('href', `http://localhost:3000/${lang}`)
    expect(cta).not.toHaveAttribute('target')
  })
})
