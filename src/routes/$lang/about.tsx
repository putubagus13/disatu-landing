import { createFileRoute } from '@tanstack/react-router'
import { seoHead } from '@/seo/head'
import { SITE_URL } from '@/seo/site-url'
import { getContent } from '@/content'
import { isLang } from '@/i18n/lang'
import { CompanyIntro } from '@/components/about/company-intro'
import { FounderSection } from '@/components/about/founder-section'

export const Route = createFileRoute('/$lang/about')({
  head: ({ params }) => {
    const lang = isLang(params.lang) ? params.lang : 'id'
    const { meta } = getContent(lang)
    return seoHead({ origin: SITE_URL, lang, sub: '/about', title: meta.aboutTitle, description: meta.aboutDescription })
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
