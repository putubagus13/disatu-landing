import { useContent } from '@/i18n/use-content'
import { LinkButton } from '@/components/ui/button'
import { Reveal } from '@/components/motion/reveal'
import { Brackets, SectionShell } from '@/components/ui/frame'
import { contactLinks } from '@/lib/contact'

/** The closing call to action: tell us about your project, on WhatsApp or by email. */
export function ContactCta() {
  const { contactCta, about, ui } = useContent()
  const links = contactLinks(about.contact)
  return (
    <SectionShell id="contact" bg="center" edge="none">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Reveal className="card-grad relative p-8 text-center sm:p-14">
          <Brackets tone="accent" />
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{contactCta.title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted">{contactCta.subtitle}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <LinkButton external href={links.whatsapp}>
              {ui.whatsapp}
            </LinkButton>
            <LinkButton external href={links.mailto} variant="ghost">
              {ui.email}
            </LinkButton>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  )
}
