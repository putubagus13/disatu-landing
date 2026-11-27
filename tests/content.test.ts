import { describe, it, expect } from 'vitest'
import { LANGS } from '@/i18n/lang'
import { getContent } from '@/content'

function strings(v: unknown, out: string[] = []): string[] {
  if (typeof v === 'string') out.push(v)
  else if (Array.isArray(v)) v.forEach((x) => strings(x, out))
  else if (v && typeof v === 'object') Object.values(v).forEach((x) => strings(x, out))
  return out
}
function shape(v: unknown): unknown {
  if (Array.isArray(v)) return v.map(shape)
  if (v && typeof v === 'object')
    return Object.fromEntries(Object.entries(v).sort(([a], [b]) => a.localeCompare(b)).map(([k, x]) => [k, shape(x)]))
  return typeof v
}

const FIXED = {
  id: {
    title: 'Disatu — Jasa Pembuatan Website & Aplikasi',
    steps: ['Konsultasi kebutuhan', 'Rancangan & penawaran', 'Desain & pengembangan', 'Uji & rilis', 'Dukungan setelah rilis'],
    designServices: ['Desain Web', 'Desain Wireframe'],
    badge: 'Dibangun oleh Disatu',
    features: ['Backtesting gratis dengan Bar Replay', 'Statistik hasil backtest', 'Rekomendasi R:R terbaik'],
  },
  en: {
    title: 'Disatu — Website & App Development',
    steps: ['Discovery call', 'Scope & proposal', 'Design & build', 'Test & launch', 'Post-launch support'],
    designServices: ['Web Design', 'Wireframe Design'],
    badge: 'Built by Disatu',
    features: ['Free backtesting with Bar Replay', 'Backtest statistics', 'Best R:R recommendation'],
  },
} as const

describe.each(LANGS)('content %s', (lang) => {
  const c = getContent(lang)
  const f = FIXED[lang]
  it('brand', () => expect(c.brand.name).toBe('Disatu'))
  it('home title is about the services', () => expect(c.meta.homeTitle).toBe(f.title))
  it('nav: services, portfolio, process, products on home, then About', () => {
    expect(c.nav.map((n) => [n.page, n.hash])).toEqual([['home', 'services'], ['home', 'portfolio'], ['home', 'process'], ['home', 'products'], ['about', undefined]])
  })
  it('six services: the four builds, then web design and wireframe design', () => {
    expect(c.services.items).toHaveLength(6)
    expect(c.services.items.map((i) => i.icon)).toEqual(['web', 'mobile', 'backend', 'webapp', 'design', 'wireframe'])
    expect(c.services.items.slice(4).map((i) => i.title)).toEqual(f.designServices)
  })
  it('five process steps with the agreed labels, each with 2-3 points', () => {
    expect(c.process.steps.map((s) => s.id)).toEqual(['discovery', 'proposal', 'build', 'launch', 'support'])
    expect(c.process.steps.map((s) => s.label)).toEqual(f.steps)
    for (const s of c.process.steps) {
      expect(s.points.length).toBeGreaterThanOrEqual(2)
      expect(s.points.length).toBeLessThanOrEqual(3)
    }
  })
  it('one product, ChartLab, built by Disatu, with its three standout features', () => {
    expect(c.products.items).toHaveLength(1)
    const p = c.products.items[0]
    expect(p.id).toBe('chartlab')
    expect(p.name).toBe('ChartLab')
    expect(p.badge).toBe(f.badge)
    expect(p.features).toEqual(f.features)
  })
  it('about facts', () => {
    expect(c.about.company.tag).toContain('2024')
    expect(c.about.company.facts.map((x) => x.value)).toContain('2024')
    expect(c.about.company.intro).toContain('ChartLab')
    expect(c.about.contact).toEqual({ phone: '+6282184677520', email: 'ptbagusraditya@gmail.com' })
    expect(c.about.founder.name).toBe('Putu Bagus Raditya')
    expect(c.about.founder.role).toMatch(/Co-Founder/)
    expect(c.about.company.facts.find((x) => x.value === 'Putu Bagus Raditya')?.label).toBe('Co-Founder')
    expect(c.about.founder.photo).toBe('/assets/profile-picture.JPG')
    expect(c.about.founder.skills.flatMap((g) => g.items)).toHaveLength(22)
    expect(c.about.founder.experiences[0].company).toBe('NoLimit Indonesia')
    expect(c.about.founder.education).toHaveLength(1)
    expect(c.about.socials).toEqual([])
    for (const s of c.about.socials) expect(new URL(s.url).protocol).toBe('https:')
  })
  it('footer note', () => expect(c.footer.note).toBe('© Disatu'))
  it('no trading-site leftovers', () => {
    for (const k of ['ebook', 'chartlab', 'workflow', 'offer', 'chartlabPage']) expect(c).not.toHaveProperty(k)
  })
  it('no empty strings, no placeholder URLs', () => {
    for (const s of strings(c)) {
      expect(s.trim()).not.toBe('')
      expect(s).not.toMatch(/example\.com/)
    }
  })
})

describe('locale parity', () => {
  const id = getContent('id')
  const en = getContent('en')
  it('same shape', () => expect(shape(en)).toEqual(shape(id)))
  it('same non-text data', () => {
    expect(en.about.socials.map((s) => s.url)).toEqual(id.about.socials.map((s) => s.url))
    expect(en.about.contact).toEqual(id.about.contact)
    expect(en.about.founder.skills.map((g) => g.items)).toEqual(id.about.founder.skills.map((g) => g.items))
    expect(en.about.founder.photo).toBe(id.about.founder.photo)
    expect(en.about.company.facts.map((f) => f.value)).toEqual(id.about.company.facts.map((f) => f.value))
    expect(en.services.items.map((i) => i.icon)).toEqual(id.services.items.map((i) => i.icon))
    expect(en.nav.map((x) => [x.page, x.hash])).toEqual(id.nav.map((x) => [x.page, x.hash]))
    expect(en.process.steps.map((s) => [s.id, s.points.length])).toEqual(id.process.steps.map((s) => [s.id, s.points.length]))
    expect(en.portfolio.items.map((p) => [p.id, p.highlights.length, !!p.visit])).toEqual(id.portfolio.items.map((p) => [p.id, p.highlights.length, !!p.visit]))
    expect(en.products.items.map((p) => [p.id, p.name, p.features.length])).toEqual(id.products.items.map((p) => [p.id, p.name, p.features.length]))
  })
})
