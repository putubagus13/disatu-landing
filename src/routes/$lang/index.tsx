import { createFileRoute } from '@tanstack/react-router'
import { seoHead } from '@/seo/head'
import { organizationGraph } from '@/seo/structured-data'
import { SITE_URL } from '@/seo/site-url'
import { getContent } from '@/content'
import { isLang } from '@/i18n/lang'
import { Hero } from '@/components/sections/hero'
import { ServicesSection } from '@/components/sections/services-section'
import { PortfolioSection } from '@/components/sections/portfolio-section'
import { ProcessSection } from '@/components/sections/process-section'
import { ProductsSection } from '@/components/sections/products-section'
import { AboutTeaser } from '@/components/sections/about-teaser'
import { ContactCta } from '@/components/sections/contact-cta'

export const Route = createFileRoute('/$lang/')({
  head: ({ params }) => {
    const lang = isLang(params.lang) ? params.lang : 'id'
    const c = getContent(lang)
    return seoHead({ origin: SITE_URL, lang, sub: '', title: c.meta.homeTitle, description: c.meta.homeDescription, jsonLd: organizationGraph(SITE_URL, lang, c) })
  },
  component: Home,
})

function Home() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <PortfolioSection />
      <ProcessSection />
      <ProductsSection />
      <AboutTeaser />
      <ContactCta />
    </>
  )
}
