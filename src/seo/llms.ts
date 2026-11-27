// /llms.txt: a short map of the site's public pages for tools that choose to read it. Built from the same content files
// as the pages, so it cannot drift from them, and it lists only pages that exist (see pages.ts). It is a guide, not an
// access rule: what crawlers may fetch stays in robots.txt. No contact details, no private or local addresses.
import type { Lang } from '@/i18n/lang'
import { shared } from '@/content/shared'
import type { SiteContent } from '@/content/types'
import { INDEXABLE_PAGES } from './pages'

const SERVICES_LABEL: Record<Lang, string> = { id: 'Layanan Disatu', en: 'Disatu Services' }

export function buildLlmsTxt(origin: string, content: Record<Lang, SiteContent>, chartlabUrl: string): string {
  const { id, en } = content
  const page = (lang: Lang, sub: string, anchor = ''): string => `${origin}/${lang}${sub}${anchor}`
  const link = (text: string, url: string, desc?: string): string => `- [${text}](${url})${desc ? `: ${desc}` : ''}`

  const pages = (['id', 'en'] as const).flatMap((lang) => {
    const m = content[lang].meta
    return INDEXABLE_PAGES.map((sub) => (sub === '' ? link(m.homeTitle, page(lang, ''), m.homeDescription) : link(m.aboutTitle, page(lang, sub), m.aboutDescription)))
  })
  // one link per language, the services named in its description: a guide file lists each address once
  const services = (['id', 'en'] as const).map((lang) => link(SERVICES_LABEL[lang], page(lang, '', '#services'), `${content[lang].services.items.map((s) => s.title).join(', ')}.`))
  const product = en.products.items[0]!

  return (
    [
      '# Disatu',
      '',
      `> ${id.meta.homeDescription}`,
      `> ${en.meta.homeDescription}`,
      '',
      `Disatu was founded in ${shared.foundedYear} by ${en.about.founder.name} (${en.about.founder.role}). Every page is available in Indonesian (the default) and English.`,
      '',
      '## Pages',
      '',
      ...pages,
      '',
      '## Services',
      '',
      ...services,
      '',
      '## Optional',
      '',
      link(en.portfolio.title, page('en', '', '#portfolio'), en.portfolio.subtitle),
      link(product.name, `${chartlabUrl}/en`, product.description),
      link('Sitemap', `${origin}/sitemap.xml`, 'Every page in both languages, with language alternates.'),
    ].join('\n') + '\n'
  )
}
