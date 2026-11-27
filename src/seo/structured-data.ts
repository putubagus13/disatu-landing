// Schema.org data for the home page, built only from what the site itself says (its content files): the company, its
// founding year, its founder and the services it lists. Nothing is added that the page does not show: no ratings,
// reviews, prices, addresses or social profiles.
import type { Lang } from '@/i18n/lang'
import { LANGS } from '@/i18n/lang'
import { shared } from '@/content/shared'
import type { SiteContent } from '@/content/types'

export function organizationGraph(origin: string, lang: Lang, c: SiteContent): Record<string, unknown> {
  const orgId = `${origin}/#organization`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': orgId,
        name: 'Disatu',
        url: `${origin}/`,
        logo: `${origin}/favicon-512.png`,
        description: c.meta.homeDescription,
        foundingDate: shared.foundedYear,
        founder: { '@type': 'Person', name: c.about.founder.name, jobTitle: c.about.founder.role },
        inLanguage: lang,
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: c.services.title,
          itemListElement: c.services.items.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.title, description: s.description } })),
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${origin}/#website`,
        url: `${origin}/`,
        name: 'Disatu',
        inLanguage: [...LANGS],
        publisher: { '@id': orgId },
      },
    ],
  }
}
