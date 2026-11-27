import { describe, it, expect } from 'vitest'
import { buildLlmsTxt } from '@/seo/llms'
import { INDEXABLE_PAGES } from '@/seo/pages'
import { getContent } from '@/content'
import { shared } from '@/content/shared'
import { LANGS } from '@/i18n/lang'

const ORIGIN = 'https://www.example.com'
const CHARTLAB = 'https://chartlab.example.com'
const CHARTLAB_ORIGIN = new URL(CHARTLAB).origin
const content = { id: getContent('id'), en: getContent('en') }
const txt = buildLlmsTxt(ORIGIN, content, CHARTLAB)
const lines = txt.split('\n')
const links = [...txt.matchAll(/^- \[([^\]]+)\]\(([^)]+)\)(?:: (.+))?$/gm)].map((m) => ({ text: m[1]!, url: m[2]!, desc: m[3] }))

describe('llms.txt', () => {
  it('opens with the site name, a quoted summary in both languages, and a note on scope', () => {
    expect(lines[0]).toBe('# Disatu')
    expect(lines[2]).toBe(`> ${content.id.meta.homeDescription}`)
    expect(lines[3]).toBe(`> ${content.en.meta.homeDescription}`)
    expect(txt).toContain(`founded in ${shared.foundedYear}`)
    expect(txt.endsWith('\n')).toBe(true)
  })

  it('has its file lists under H2 headings, with the optional links last', () => {
    const h2 = lines.filter((l) => l.startsWith('## '))
    expect(h2.length).toBeGreaterThanOrEqual(3)
    expect(h2[h2.length - 1]).toBe('## Optional')
  })

  it('links only to absolute pages that exist: this site, its sitemap, and the ChartLab landing', () => {
    const allowedPaths = new Set(['/sitemap.xml', ...LANGS.flatMap((l) => INDEXABLE_PAGES.map((p) => `/${l}${p}`))])
    const sections = new Set(['services', 'portfolio', 'process', 'products', 'about', 'contact'])
    expect(links.length).toBeGreaterThanOrEqual(8)
    for (const { url } of links) {
      const u = new URL(url) // throws on a relative URL
      if (u.origin === CHARTLAB_ORIGIN) continue
      expect(u.origin, url).toBe(ORIGIN)
      expect(allowedPaths.has(u.pathname), url).toBe(true)
      if (u.hash) expect(sections.has(u.hash.slice(1)), url).toBe(true)
    }
  })

  it.each(LANGS)('names every %s service, with the words the site uses, behind one link to the services section', (lang) => {
    const hit = links.find((l) => l.url === `${ORIGIN}/${lang}#services`)
    expect(hit, lang).toBeDefined()
    const titles = content[lang].services.items.map((s) => s.title)
    expect(hit!.desc).toBe(`${titles.join(', ')}.`)
  })

  it('never links the same address twice (each link is one resource)', () => {
    const urls = links.map((l) => l.url)
    expect(new Set(urls).size).toBe(urls.length)
  })

  it('points at the product the site presents, on the ChartLab landing', () => {
    const chartlab = content.en.products.items[0]!
    expect(links.find((l) => l.text === chartlab.name)).toMatchObject({ url: `${CHARTLAB}/en`, desc: chartlab.description })
  })

  it('keeps private and unfinished things out: contact details, local addresses, placeholders', () => {
    for (const bad of [shared.contact.phone, shared.contact.email, 'localhost', 'undefined', '[object']) expect(txt).not.toContain(bad)
  })
})

