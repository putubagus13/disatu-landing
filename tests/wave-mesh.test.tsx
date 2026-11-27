import { describe, it, expect, vi, afterEach } from 'vitest'
import { render } from '@testing-library/react'
import { WaveMesh } from '@/components/ui/wave-mesh'

// A recording 2D context: the mesh is a canvas, so the test reads what it was told to paint.
function recorder() {
  const styles = new Set<string>()
  const alphas: number[] = []
  let fills = 0
  const ctx = {
    clearRect() {},
    setTransform() {},
    fillRect() {
      fills++
    },
    set fillStyle(v: string) {
      styles.add(v)
    },
    get fillStyle() {
      return ''
    },
    set globalAlpha(v: number) {
      alphas.push(v)
    },
    get globalAlpha() {
      return 1
    },
  }
  return { ctx, styles, alphas, fills: () => fills }
}
const rgb = (s: string) => (s.match(/\d+/g) ?? []).map(Number) as [number, number, number]

const realGetContext = HTMLCanvasElement.prototype.getContext
const realMatchMedia = window.matchMedia
const size = { w: 0, h: 0 }
function mockLayout(w = 900, h = 700) {
  size.w = w
  size.h = h
  Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, get: () => size.w })
  Object.defineProperty(HTMLElement.prototype, 'clientHeight', { configurable: true, get: () => size.h })
}
function paintWith(rec: ReturnType<typeof recorder>) {
  HTMLCanvasElement.prototype.getContext = (() => rec.ctx) as never
}
function reducedMotion(on: boolean) {
  window.matchMedia = ((q: string) => ({ matches: on && q.includes('prefers-reduced-motion'), media: q, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {}, dispatchEvent: () => false })) as never
}

afterEach(() => {
  HTMLCanvasElement.prototype.getContext = realGetContext
  window.matchMedia = realMatchMedia
  delete (HTMLElement.prototype as { clientWidth?: unknown }).clientWidth
  delete (HTMLElement.prototype as { clientHeight?: unknown }).clientHeight
  vi.restoreAllMocks()
})

describe('WaveMesh', () => {
  it('puts one decorative canvas in its host and takes it out again on unmount', () => {
    mockLayout()
    paintWith(recorder())
    const { container, unmount } = render(<WaveMesh theme="dark" />)
    const host = container.querySelector('[data-wave-mesh]') as HTMLElement
    expect(host).not.toBeNull()
    const canvases = host.querySelectorAll('canvas')
    expect(canvases).toHaveLength(1)
    expect(canvases[0].getAttribute('aria-hidden')).toBe('true')
    unmount()
    expect(document.querySelectorAll('canvas')).toHaveLength(0)
  })

  it('paints dots in the Disatu gradient, green into yellow, and nothing outside it (dark theme)', () => {
    mockLayout()
    const rec = recorder()
    paintWith(rec)
    render(<WaveMesh theme="dark" />)
    expect(rec.fills()).toBeGreaterThan(500)
    const colours = [...rec.styles].map(rgb)
    for (const [r, g, b] of colours) {
      expect(r).toBeGreaterThanOrEqual(63) // between #3fa37f ...
      expect(r).toBeLessThanOrEqual(255)
      expect(g).toBeGreaterThanOrEqual(163)
      expect(g).toBeLessThanOrEqual(211)
      expect(b).toBeGreaterThanOrEqual(63) // ... and #ffd33f
      expect(b).toBeLessThanOrEqual(127)
    }
    expect(colours.some(([r]) => r < 110)).toBe(true) // the green end is used
    expect(colours.some(([r]) => r > 200)).toBe(true) // so is the yellow end
  })

  it('uses a deeper green and yellow on the light theme so the dots still read on white', () => {
    mockLayout()
    const rec = recorder()
    paintWith(rec)
    render(<WaveMesh theme="light" />)
    const colours = [...rec.styles].map(rgb)
    for (const [r, g, b] of colours) {
      expect(r).toBeGreaterThanOrEqual(18)
      expect(r).toBeLessThanOrEqual(230)
      expect(g).toBeGreaterThanOrEqual(66)
      expect(g).toBeLessThanOrEqual(176)
      expect(b).toBeGreaterThanOrEqual(0)
      expect(b).toBeLessThanOrEqual(50)
    }
    expect(colours.some(([r]) => r < 70)).toBe(true)
    expect(colours.some(([r]) => r > 180)).toBe(true)
  })

  it('fades dots with distance: faint near the horizon, strong up close', () => {
    mockLayout()
    const rec = recorder()
    paintWith(rec)
    render(<WaveMesh theme="dark" />)
    expect(Math.min(...rec.alphas)).toBeLessThan(0.3)
    expect(Math.max(...rec.alphas)).toBeGreaterThan(0.8)
  })

  it('paints one still frame and never starts the animation loop for visitors who ask for reduced motion', () => {
    mockLayout()
    reducedMotion(true)
    const raf = vi.spyOn(window, 'requestAnimationFrame')
    const rec = recorder()
    paintWith(rec)
    render(<WaveMesh theme="dark" />)
    expect(rec.fills()).toBeGreaterThan(500)
    expect(raf).not.toHaveBeenCalled()
  })

  it('draws nothing, and does not throw, where canvas is unavailable', () => {
    mockLayout()
    HTMLCanvasElement.prototype.getContext = (() => null) as never
    expect(() => render(<WaveMesh theme="light" />)).not.toThrow()
  })
})
