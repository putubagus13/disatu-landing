import { describe, it, expect } from 'vitest'
import { waitFor, within } from '@testing-library/react'
import { renderWithRouter } from './utils'
import { getContent } from '@/content'
import { LANGS } from '@/i18n/lang'

describe.each(LANGS)('ChartLabSection %s', (lang) => {
  const c = getContent(lang)
  async function section() {
    return waitFor(() => {
      const el = document.getElementById('chartlab')
      if (!el) throw new Error('no chartlab section')
      return el
    })
  }

  it('shows heading, free badge, features and ordered steps', async () => {
    await renderWithRouter(`/${lang}`)
    const sec = await section()
    expect(within(sec).getByRole('heading', { level: 2, name: c.chartlab.title })).toBeInTheDocument()
    expect(within(sec).getByText(c.ui.freeBadge)).toBeInTheDocument()
    for (const f of c.chartlab.features) expect(within(sec).getByText(f.title)).toBeInTheDocument()
    expect(within(sec).getByRole('heading', { name: c.ui.howToGetAccess })).toBeInTheDocument()
    const ol = sec.querySelector('ol')!
    expect(within(ol as HTMLElement).getAllByRole('listitem')).toHaveLength(c.chartlab.steps.length)
    for (const s of c.chartlab.steps) expect(within(ol as HTMLElement).getByText(s.title)).toBeInTheDocument()
  })

  it('embeds the tutorial video as a silent looping clip with no control bar', async () => {
    await renderWithRouter(`/${lang}`)
    const sec = await section()
    const video = sec.querySelector('video') as HTMLVideoElement
    expect(video).not.toBeNull()
    expect(video.getAttribute('src')).toBe('/assets/tutorial_backtest_v2.mp4')
    expect(video.getAttribute('poster')).toBe('/assets/tutorial_backtest_poster.jpg')
    expect(video.hasAttribute('controls')).toBe(false)
    expect(video.muted).toBe(true)
    expect(video.loop).toBe(true)
    expect(video.hasAttribute('playsinline')).toBe(true)
    expect(video.getAttribute('preload')).toBe('none')
    expect(video.getAttribute('aria-label')).toBe(c.chartlab.videoLabel)
    expect(within(sec).getByText(c.chartlab.videoNote)).toBeInTheDocument()
  })

  it('opens the ChartLab landing', async () => {
    await renderWithRouter(`/${lang}`)
    const sec = await section()
    const open = within(sec).getByRole('link', { name: c.ui.tryFree })
    expect(open).toHaveAttribute('href', `http://localhost:3000/${lang}`)
    expect(open).not.toHaveAttribute('target')
  })
})
