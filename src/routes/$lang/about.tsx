import { createFileRoute } from '@tanstack/react-router'
import { alternateLinks } from '@/i18n/alternates'
import { getContent } from '@/content'
import { isLang } from '@/i18n/lang'
import { CompanyIntro } from '@/components/about/company-intro'
import { FounderSection } from '@/components/about/founder-section'

export const Route = createFileRoute('/$lang/about')({
  head: ({ params }) => {
    const lang = isLang(params.lang) ? params.lang : 'id'
    const { meta } = getContent(lang)
    return {
      meta: [
        { title: meta.aboutTitle },
        { name: 'description', content: meta.aboutDescription },
        { property: 'og:title', content: meta.aboutTitle },
        { property: 'og:description', content: meta.aboutDescription },
        { property: 'og:locale', content: lang === 'id' ? 'id_ID' : 'en_US' },
      ],
      links: alternateLinks('/about'),
    }
  },
  component: About,
})

function About() {
  return (
    <>
      <CompanyIntro />
      <FounderSection />
    </>
  )
}
