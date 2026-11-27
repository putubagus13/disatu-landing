import { describe, it, expect } from 'vitest'
import { fireEvent, waitFor, within } from '@testing-library/react'
import { renderWithRouter } from './utils'
import { getContent } from '@/content'
import { LANGS } from '@/i18n/lang'

describe.each(LANGS)('ProcessSection %s', (lang) => {
  const c = getContent(lang)
  const p = c.process

  async function section() {
    await renderWithRouter(`/${lang}`)
    return waitFor(() => {
      const el = document.getElementById('process')
      if (!el) throw new Error('no process section')
      return el
    })
  }
  const stepButtons = (sec: HTMLElement) => within(sec.querySelector('ol') as HTMLElement).getAllByRole('button')
  const panel = (sec: HTMLElement) => sec.querySelector('#process-panel') as HTMLElement

  it('shows the five steps with their labels, the first one active', async () => {
    const sec = await section()
    expect(within(sec).getByRole('heading', { level: 2, name: p.title })).toBeInTheDocument()
    const buttons = stepButtons(sec)
    expect(buttons).toHaveLength(5)
    expect(buttons.map((b) => b.textContent)).toEqual(p.steps.map((s, i) => `${i + 1}${s.label}`))
    expect(buttons[0]).toHaveAttribute('aria-current', 'step')
    expect(panel(sec)).toHaveAttribute('aria-live', 'polite')
    expect(within(panel(sec)).getByRole('heading', { level: 3, name: p.steps[0].title })).toBeInTheDocument()
  })

  it('walks forward with "next" to the last step, which offers a consult on WhatsApp', async () => {
    const sec = await section()
    for (let i = 0; i < 4; i++) fireEvent.click(within(panel(sec)).getByRole('button', { name: p.next }))
    expect(within(panel(sec)).getByRole('heading', { level: 3, name: p.steps[4].title })).toBeInTheDocument()
    expect(stepButtons(sec)[4]).toHaveAttribute('aria-current', 'step')
    const cta = within(panel(sec)).getByRole('link', { name: new RegExp(p.cta) })
    expect(cta).toHaveAttribute('href', 'https://wa.me/6282184677520')
    expect(within(panel(sec)).queryByRole('button', { name: p.next })).toBeNull()
  })

  it('jumps straight to a step', async () => {
    const sec = await section()
    fireEvent.click(stepButtons(sec)[2])
    expect(within(panel(sec)).getByRole('heading', { level: 3, name: p.steps[2].title })).toBeInTheDocument()
    for (const pt of p.steps[2].points) expect(within(panel(sec)).getByText(pt.text)).toBeInTheDocument()
  })

  it('every step has its own illustration, labelled with the step title', async () => {
    const sec = await section()
    for (let i = 0; i < 5; i++) {
      fireEvent.click(stepButtons(sec)[i])
      const img = panel(sec).querySelector('[role="img"]') as Element
      expect(img).not.toBeNull()
      expect(img.getAttribute('aria-label')).toBe(p.steps[i].title)
      expect(img.getAttribute('data-step')).toBe(p.steps[i].id)
    }
  })
})
