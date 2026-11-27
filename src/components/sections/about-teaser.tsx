import { useContent, useLang } from '@/i18n/use-content'
import { AppLink } from '@/components/ui/app-link'
import { Reveal } from '@/components/motion/reveal'
import { Brackets, SectionShell, Tag } from '@/components/ui/frame'

/** A short "who we are" on the homepage: the facts on one side, the principle and a link to About on the other. */
export function AboutTeaser() {
  const lang = useLang()
  const { aboutTeaser: t, about } = useContent()
  const c = about.company
  return (
    <SectionShell id="about" bg="hatch">
      <div className="mx-auto grid max-w-5xl gap-10 px-4 sm:px-6 md:grid-cols-2 md:items-center">
        <Reveal>
          <Tag>{t.tag}</Tag>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.title}</h2>
          <p className="mt-4 text-lg text-muted">{t.text}</p>
          <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
            {c.facts.map((f) => (
              <div key={f.label}>
                <dt className="font-mono text-xs uppercase tracking-wider text-muted">{f.label}</dt>
                <dd className="mt-1 font-display text-xl font-bold">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative border border-border bg-bg p-6 sm:p-8">
            <Brackets tone="accent" />
            <h3 className="text-xl font-bold">{c.principleTitle}</h3>
            <p className="mt-2 text-muted">{c.principle}</p>
            <AppLink href={`/${lang}/about`} className="mt-6 inline-block text-sm font-semibold text-accent underline-offset-4 hover:underline">
              {t.cta}
            </AppLink>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  )
}
