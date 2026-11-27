import { useContent } from '@/i18n/use-content'
import type { PortfolioItem } from '@/content/types'
import { LinkButton } from '@/components/ui/button'
import { Reveal } from '@/components/motion/reveal'
import { Brackets, SectionShell, Tag } from '@/components/ui/frame'

// Live URLs live here, keyed by project id, so the content files stay free of URLs. The dashboard has none:
// it is a login-only app, so its card shows the screenshot and no link.
const SITES: Partial<Record<PortfolioItem['id'], string>> = {
  captivad: 'https://www.captivad.co',
  geoarthasemesta: 'https://www.geoarthasemesta.com',
}

/** Screenshots are 1600x1070 webp (see public/portfolio). The size attributes reserve the space so the page does not jump. */
const SHOT = { width: 1600, height: 1070 }

/** Projects Disatu has built for others. Cards alternate the screenshot side on wide screens. */
export function PortfolioSection() {
  const { portfolio } = useContent()
  return (
    <SectionShell id="portfolio" bg="center">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Tag>{portfolio.tag}</Tag>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{portfolio.title}</h2>
          <p className="mt-4 text-lg text-muted">{portfolio.subtitle}</p>
        </Reveal>

        <ul className="mt-14 grid gap-12 sm:gap-16">
          {portfolio.items.map((p, i) => {
            const href = SITES[p.id]
            return (
              <Reveal as="li" key={p.id} className="relative border border-border bg-bg p-4 sm:p-8">
                <Brackets tone="accent" />
                <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
                  <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                    {/* a quiet browser frame, so a full-page screenshot reads as a screen and not as a loose picture */}
                    <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
                      <div aria-hidden="true" className="flex items-center gap-1.5 border-b border-border px-3 py-2">
                        <span className="h-2 w-2 rounded-full bg-border" />
                        <span className="h-2 w-2 rounded-full bg-border" />
                        <span className="h-2 w-2 rounded-full bg-border" />
                      </div>
                      <img src={`/portfolio/${p.id}.webp`} alt={p.imageAlt} {...SHOT} loading="lazy" decoding="async" className="block h-auto w-full" />
                    </div>
                  </div>
                  <div>
                    <p className="inline-flex rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted">{p.kind}</p>
                    <h3 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">{p.name}</h3>
                    <p className="mt-4 text-muted">{p.description}</p>
                    <ul className="mt-6 space-y-3">
                      {p.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-3">
                          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-grad" />
                          <span className="font-medium">{h}</span>
                        </li>
                      ))}
                    </ul>
                    {href && p.visit ? (
                      <div className="mt-8">
                        <LinkButton external variant="ghost" href={href}>
                          {p.visit}
                        </LinkButton>
                      </div>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </SectionShell>
  )
}
