import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import type { TubesApp } from 'threejs-components/build/cursors/tubes1.min.js'

// Glowing 3D tubes that trail the pointer, from threejs-components (tubes1). Recoloured to the brand:
// Disatu green into the logo yellow. Decorative only, so it is skipped wherever it would cost more than it gives.

// One vivid palette serves both themes: the blend mode on the layer (below) darkens it for the light theme.
const TUBES = ['#3fa37f', '#ffd33f', '#7ee0b8']
const LIGHTS = ['#3fa37f', '#ffd33f', '#ffe58a', '#7ee0b8']

const LOAD_DELAY_MS = 1200

export function CursorTubes() {
  const reduced = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const appRef = useRef<TubesApp | null>(null)

  // Only for a real mouse (touch has no cursor), no reduced motion, no data saver. Decided after mount.
  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
    setEnabled(finePointer && !reduced && !saveData)
  }, [reduced])

  // The library is ~775 KB, so it loads on its own chunk after the page has settled, never on the critical path.
  useEffect(() => {
    if (!enabled) return
    let cancelled = false
    const timer = window.setTimeout(async () => {
      const canvas = canvasRef.current
      if (!canvas) return
      try {
        const { default: TubesCursor } = await import('threejs-components/build/cursors/tubes1.min.js')
        if (cancelled) return
        appRef.current = TubesCursor(canvas, { tubes: { colors: TUBES, lights: { intensity: 200, colors: LIGHTS } } })
      } catch {
        // no WebGL or the chunk failed to load: the page is complete without it
      }
    }, LOAD_DELAY_MS)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
      appRef.current?.dispose()
      appRef.current = null
    }
  }, [enabled])

  if (!enabled) return null
  return (
    // The library paints an opaque black canvas. Blending (not covering) is what lets it sit on top of the page:
    // dark theme: `screen` drops the black and keeps only the glow.
    // light theme: invert + hue-rotate turns the black to white and the glow to deep tones, then `multiply` drops the white.
    <div
      aria-hidden="true"
      className="cursor-tubes pointer-events-none fixed inset-0 z-[60] opacity-75 mix-blend-multiply [filter:invert(1)_hue-rotate(180deg)] dark:opacity-100 dark:mix-blend-screen dark:[filter:none]"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  )
}
