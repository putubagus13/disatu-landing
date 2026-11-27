import { useContent } from '@/i18n/use-content'
import type { ServiceItem } from '@/content/types'
import { LinkButton } from '@/components/ui/button'
import { Reveal } from '@/components/motion/reveal'
import { SectionShell } from '@/components/ui/frame'
import { contactLinks } from '@/lib/contact'

const ICONS: Record<ServiceItem['icon'], React.ReactNode> = {
  web: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M7 6.5h.01M10 6.5h.01" />
    </>
  ),
  mobile: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2" />
      <path d="M11 18.5h2" />
    </>
  ),
  backend: (
    <>
      <rect x="3" y="3.5" width="18" height="7" rx="2" />
      <rect x="3" y="13.5" width="18" height="7" rx="2" />
      <path d="M7 7h.01M7 17h.01M11 7h6M11 17h6" />
    </>
  ),
  webapp: (
    <>
      <path d="M3 4h2l2.4 10.2a1.5 1.5 0 0 0 1.5 1.2h7.7a1.5 1.5 0 0 0 1.5-1.1L20 8H6.2" />
      <circle cx="9.5" cy="19.5" r="1.2" />
      <circle cx="16.5" cy="19.5" r="1.2" />
    </>
  ),
  // a pen drawing a line: web design
  design: (
    <>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </>
  ),
  // a page split into header, side column and content blocks: the skeleton of a page
  wireframe: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </>
  ),
}

export function ServicesSection() {
  const { services, about, ui } = useContent()
  const links = contactLinks(about.contact)
  return (
    <SectionShell id="services" bg="hatch">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{services.title}</h2>
          <p className="mt-4 text-lg text-muted">{services.subtitle}</p>
        </Reveal>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {services.items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 0.08} className="border border-border bg-bg p-6 sm:p-8">
              <span aria-hidden="true" className="block h-0.5 w-12 bg-grad" />
              <span className="mt-6 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {ICONS[item.icon]}
                </svg>
              </span>
              <h3 className="mt-5 text-xl font-bold">{item.title}</h3>
              <p className="mt-2 text-muted">{item.description}</p>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-10 flex flex-col items-center gap-4 text-center" delay={0.1}>
          <p className="font-semibold">{services.contactLead}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <LinkButton href={links.whatsapp} external>
              {ui.whatsapp}
            </LinkButton>
            <LinkButton href={links.mailto} external variant="ghost">
              {ui.email}
            </LinkButton>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  )
}
