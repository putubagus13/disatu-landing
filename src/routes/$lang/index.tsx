import { createFileRoute } from '@tanstack/react-router'
import { alternateLinks } from '@/i18n/alternates'
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
    const { meta } = getContent(lang)
    return {
      meta: [
        { title: meta.homeTitle },
        { name: 'description', content: meta.homeDescription },
        { property: 'og:title', content: meta.homeTitle },
        { property: 'og:description', content: meta.homeDescription },
        { property: 'og:locale', content: lang === 'id' ? 'id_ID' : 'en_US' },
      ],
      links: alternateLinks(''),
    }
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
