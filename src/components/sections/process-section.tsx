import { useState } from 'react'
import { motion } from 'framer-motion'
import { useMotionEnabled } from '@/components/motion/use-motion-enabled'
import { useContent } from '@/i18n/use-content'
import { Reveal } from '@/components/motion/reveal'
import { Brackets, SectionShell, Tag } from '@/components/ui/frame'
import { contactLinks } from '@/lib/contact'
import { ProcessVisual } from './process-visuals'

/** How Disatu works, as five steps you can click through (or walk with "next"). The last one offers a consult. */
export function ProcessSection() {
  const { process: w, about } = useContent()
  const { whatsapp } = contactLinks(about.contact)
  const enabled = useMotionEnabled()
  const [active, setActive] = useState(0)
  const step = w.steps[active]
  const last = active === w.steps.length - 1
  const progress = (active / (w.steps.length - 1)) * 100

  return (
    <SectionShell id="process" bg="dots" edge="y">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Tag>{w.tag}</Tag>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{w.title}</h2>
          <p className="mt-4 text-lg text-muted">{w.subtitle}</p>
        </Reveal>

        <Reveal className="mt-12" delay={0.1}>
          <div>

            <ol className="relative grid grid-cols-5">
              <span aria-hidden="true" className="absolute left-[10%] right-[10%] top-5 h-px bg-border" />
              <span
                aria-hidden="true"
                className="absolute left-[10%] top-5 h-0.5 bg-grad transition-[width] duration-500 motion-reduce:transition-none"
                style={{ width: `${progress * 0.8}%` }}
              />
              {w.steps.map((s, i) => {
                const isActive = i === active
                const done = i < active
                return (
                  <li key={s.id} className="relative flex justify-center">
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-current={isActive ? 'step' : undefined}
                      aria-controls="process-panel"
                      className="group flex min-h-11 flex-col items-center gap-2 px-1 text-center"
                    >
                      <span
                        className={`flex h-10 w-10 items-center justify-center rounded-full border font-mono text-sm font-semibold transition-colors motion-reduce:transition-none ${
                          isActive
                            ? 'border-transparent bg-grad text-on-grad'
                            : done
                              ? 'border-accent bg-bg text-accent'
                              : 'border-border bg-bg text-muted group-hover:border-fg/40'
                        }`}
                      >
                        {done ? '✓' : i + 1}
                      </span>
                      <span className="sr-only md:not-sr-only">
                        <span className={`text-xs font-semibold sm:text-sm ${isActive ? 'text-fg' : 'text-muted'}`}>{s.label}</span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>

            <motion.div
              key={`${active}-${enabled}`}
              id="process-panel"
              aria-live="polite"
              className="relative mt-8 grid items-center gap-8 border border-border bg-surface p-5 sm:p-8 lg:grid-cols-2"
              initial={enabled ? { opacity: 0, y: 10 } : false}
              animate={enabled ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <Brackets tone="accent" />
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                  {w.stepWord} {active + 1} / {w.steps.length}
                </p>
                <h3 className="mt-2 text-2xl font-bold tracking-tight">{step.title}</h3>
                <p className="mt-3 text-muted">{step.description}</p>
                <ul className="mt-6 space-y-4">
                  {step.points.map((p) => (
                    <li key={p.label} className="flex gap-3">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-grad" />
                      <div>
                        <p className="font-semibold">{p.label}</p>
                        <p className="text-sm text-muted">{p.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  {last ? (
                    <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-accent underline-offset-4 hover:underline">
                      {w.cta} →
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActive(active + 1)}
                      className="min-h-11 rounded-full border border-border bg-bg px-5 text-sm font-semibold transition-colors hover:border-accent hover:text-accent motion-reduce:transition-none"
                    >
                      {w.next}
                    </button>
                  )}
                </div>
              </div>
              <div className="border border-border bg-bg p-4">
                <ProcessVisual step={step} enabled={enabled} />
              </div>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  )
}
