import { useContent, useLang } from '@/i18n/use-content'
import type { Lang } from '@/i18n/lang'
import type { Product } from '@/content/types'
import { LinkButton } from '@/components/ui/button'
import { Reveal } from '@/components/motion/reveal'
import { Brackets, SectionShell, Tag } from '@/components/ui/frame'
import { chartlabLandingHref } from '@/lib/site-links'

// Logos and links live here, keyed by product id, so the content files stay free of URLs.
const LOGOS: Record<Product['id'], { light: string; dark: string }> = {
  chartlab: { light: '/brand/chartlab-horizontal-color.svg', dark: '/brand/chartlab-horizontal-reverse-transparent.svg' },
}
const HREFS: Record<Product['id'], (lang: Lang) => string> = {
  chartlab: (lang) => chartlabLandingHref(lang),
}

/** Disatu's own products. On Disatu's own site the product logo carries no "a product of disatu" endorsement. */
export function ProductsSection() {
  const lang = useLang()
  const { products } = useContent()
  return (
    <SectionShell id="products" bg="warm">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Tag>{products.tag}</Tag>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{products.title}</h2>
          <p className="mt-4 text-lg text-muted">{products.subtitle}</p>
        </Reveal>

        <ul className="mt-12 grid gap-6">
          {products.items.map((p) => (
            <Reveal as="li" key={p.id} className="relative border border-border bg-bg p-6 sm:p-10">
              <Brackets tone="accent" />
              <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
                <div>
                  <img src={LOGOS[p.id].light} alt={p.name} className="h-auto w-36 dark:hidden" />
                  <img src={LOGOS[p.id].dark} alt={p.name} className="hidden h-auto w-36 dark:block" />
                  <p className="mt-4 inline-flex rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted">{p.badge}</p>
                  <p className="mt-4 max-w-xl text-lg text-muted">{p.description}</p>
                  <ul className="mt-6 space-y-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-3">
                        <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-grad" />
                        <span className="font-medium">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <LinkButton external newTab={false} href={HREFS[p.id](lang)}>
                    {p.cta}
                  </LinkButton>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </SectionShell>
  )
}
