import { useState } from 'react'
import { useContent, useLang } from '@/i18n/use-content'
import { Reveal } from '@/components/motion/reveal'
import { LinkButton } from '@/components/ui/button'
import { Brackets, SectionShell } from '@/components/ui/frame'
import { contactLinks, formatPhone } from '@/lib/contact'
import { FounderPhoto } from './founder-photo'
import { ExperienceTimeline } from './experience-timeline'
import { chartlabLandingHref } from '@/lib/site-links'

type Panel = 'skills' | 'experience' | 'education'

/** The founder: photo, name and a short summary. Skills, experience and education open on demand. */
export function FounderSection() {
  const lang = useLang()
  const { about, ui } = useContent()
  const f = about.founder
  const links = contactLinks(about.contact)
  const [open, setOpen] = useState<Panel | null>(null)
  const toggle = (p: Panel) => setOpen((cur) => (cur === p ? null : p))

  const actions: { id: Panel; label: string }[] = [
    { id: 'skills', label: ui.skillsTitle },
    { id: 'experience', label: ui.experienceTitle },
    { id: 'education', label: ui.educationTitle },
  ]

  return (
    <SectionShell id="founder" bg="dots" edge="none">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16">
          <Reveal>
            <FounderPhoto src={f.photo} alt={f.name} />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">{f.role}</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{f.name}</h2>
            <p className="mt-1 text-sm text-muted">{f.location}</p>
            <p className="mt-5 max-w-xl text-lg text-muted">{f.summary}</p>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm font-medium">
              <li>
                <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-accent underline-offset-4 hover:underline">
                  {formatPhone(about.contact.phone)}
                </a>
              </li>
              <li>
                <a href={links.mailto} className="inline-flex min-h-11 items-center text-accent underline-offset-4 hover:underline">
                  {about.contact.email}
                </a>
              </li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              {actions.map((a) => {
                const on = open === a.id
                return (
                  <button
                    key={a.id}
                    type="button"
                    aria-expanded={on}
                    aria-controls={on ? 'founder-panel' : undefined}
                    onClick={() => toggle(a.id)}
                    className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-5 text-sm font-semibold transition-colors motion-reduce:transition-none ${
                      on ? 'border-accent bg-accent/10 text-accent' : 'border-border bg-bg hover:border-accent hover:text-accent'
                    }`}
                  >
                    {a.label}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`transition-transform motion-reduce:transition-none ${on ? 'rotate-180' : ''}`}>
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                )
              })}
            </div>
          </Reveal>
        </div>

        {open && (
          <div id="founder-panel" className="relative mt-10 border border-border bg-surface p-5 sm:p-8">
            <Brackets />
            {open === 'skills' && (
              <div className="grid gap-6 sm:grid-cols-2">
                {f.skills.map((g) => (
                  <div key={g.group}>
                    <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">{g.group}</h3>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {g.items.map((item) => (
                        <li key={item} className="rounded-full border border-border bg-bg px-3 py-1.5 text-sm">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
            {open === 'experience' && <ExperienceTimeline items={f.experiences} />}
            {open === 'education' && (
              <ul className="space-y-4">
                {f.education.map((e) => (
                  <li key={`${e.school}-${e.degree}`}>
                    <h3 className="font-semibold">{e.degree}</h3>
                    <p className="text-sm text-muted">{e.school}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <div className="mt-16 text-center">
          <LinkButton external newTab={false} href={chartlabLandingHref(lang)}>
            {ui.aboutCta}
          </LinkButton>
        </div>
      </div>
    </SectionShell>
  )
}
