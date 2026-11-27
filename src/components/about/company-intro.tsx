import { useContent, useLang } from '@/i18n/use-content'
import { chartlabLandingHref } from '@/lib/site-links'
import { Reveal } from '@/components/motion/reveal'
import { BrandSilhouette } from '@/components/brand/brand-silhouette'
import { Brackets, SectionShell, Tag } from '@/components/ui/frame'

/** The top of the About page: who Disatu is, since when, and what it stands for. */
export function CompanyIntro() {
  const lang = useLang()
  const { about } = useContent()
  const c = about.company
  return (
    <SectionShell id="company" bg="warm" className="relative overflow-hidden">
      {/* the logo as a faint gradient silhouette, bleeding off the right edge */}
      <BrandSilhouette className="-right-24 top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 opacity-[0.13] sm:-right-10 lg:right-[4%] lg:h-[40rem] lg:w-[40rem]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <Tag>{c.tag}</Tag>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{c.title}</h1>
          <p data-company-intro className="mt-6 text-lg text-muted">
            {c.intro.split('ChartLab').map((part, i) => (
              <span key={i}>
                {i > 0 && (
                  <a href={chartlabLandingHref(lang)} className="font-semibold text-fg underline-offset-4 hover:underline">
                    ChartLab
                  </a>
                )}
                {part}
              </span>
            ))}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 max-w-2xl">
          <div className="relative border border-border bg-bg/80 p-6 backdrop-blur-sm sm:p-8">
            <Brackets tone="accent" />
            <h2 className="text-xl font-bold">{c.principleTitle}</h2>
            <p className="mt-2 text-muted">{c.principle}</p>
          </div>
          <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
            {c.facts.map((f) => (
              <div key={f.label}>
                <dt className="font-mono text-xs uppercase tracking-wider text-muted">{f.label}</dt>
                <dd className="mt-1 font-display text-xl font-bold">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </SectionShell>
  )
}
