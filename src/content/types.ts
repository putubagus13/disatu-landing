export type Section = 'hero' | 'services' | 'portfolio' | 'process' | 'products' | 'about' | 'contact'
export type NavItem = { label: string; page: 'home' | 'about'; hash?: 'services' | 'portfolio' | 'process' | 'products' }
export type ServiceItem = { title: string; description: string; icon: 'web' | 'mobile' | 'backend' | 'webapp' }
export type ProcessStepId = 'discovery' | 'proposal' | 'build' | 'launch' | 'support'
export type ProcessStep = {
  id: ProcessStepId
  label: string
  title: string
  description: string
  points: { label: string; text: string }[]
}
export type PortfolioItem = {
  /** Also the screenshot's file name: /portfolio/<id>.webp. Live URLs sit in the component, keyed by id. */
  id: 'captivad' | 'geoarthasemesta' | 'organization-dashboard'
  name: string
  kind: string
  description: string
  highlights: string[]
  imageAlt: string
  /** Label of the link to the live site. Absent for a project that has no public page. */
  visit?: string
}
export type Product = {
  id: 'chartlab'
  name: string
  badge: string
  description: string
  features: string[]
  cta: string
}
export type Education = { degree: string; school: string }
export type SkillGroup = { group: string; items: string[] }
export type Experience = {
  role: string
  company: string
  period: string
  description: string
  highlights: string[]
}
export type SiteContent = {
  meta: { homeTitle: string; homeDescription: string; aboutTitle: string; aboutDescription: string }
  ui: {
    menuOpen: string
    menuClose: string
    skipToContent: string
    themeLight: string
    themeDark: string
    themeSystem: string
    switchLanguage: string
    visualLabel: string
    experienceTitle: string
    skillsTitle: string
    educationTitle: string
    whatsapp: string
    email: string
    consult: string
    seeServices: string
    aboutCta: string
  }
  brand: { name: 'Disatu'; tagline: string }
  nav: NavItem[]
  hero: { eyebrow: string; title: string; subtitle: string }
  services: { title: string; subtitle: string; contactLead: string; items: ServiceItem[] }
  portfolio: { tag: string; title: string; subtitle: string; items: PortfolioItem[] }
  process: {
    tag: string
    title: string
    subtitle: string
    stepWord: string
    next: string
    cta: string
    steps: ProcessStep[]
  }
  products: { tag: string; title: string; subtitle: string; items: Product[] }
  aboutTeaser: { tag: string; title: string; text: string; cta: string }
  contactCta: { title: string; subtitle: string }
  about: {
    company: {
      title: string
      tag: string
      intro: string
      principleTitle: string
      principle: string
      facts: { label: string; value: string }[]
    }
    founder: {
      name: string
      role: string
      summary: string
      location: string
      photo: string
      education: Education[]
      skills: SkillGroup[]
      experiences: Experience[]
    }
    /** Company contact: phone (E.164) and email. */
    contact: { phone: string; email: string }
    socials: { label: string; url: string }[]
  }
  footer: { note: string }
}
