import { describe, it, expect } from 'vitest'
import { LANGS } from '@/i18n/lang'
import { getContent } from '@/content'

// The Disatu site states only facts the owner gave (founded 2024, the founder, the four services, the principle,
// ChartLab as a product Disatu built). No invented clients, testimonials or counts, and no trading copy outside
// the product card and About (the company intro names ChartLab; the founder is a trader).
function strings(v: unknown, out: string[] = []): string[] {
  if (typeof v === 'string') out.push(v)
  else if (Array.isArray(v)) v.forEach((x) => strings(x, out))
  else if (v && typeof v === 'object') Object.values(v).forEach((x) => strings(x, out))
  return out
}
const TRADING = /trading|trader|backtest|R:R|saran keuangan|financial advice/i
const INVENTED = /testimoni|testimonial|klien kami|our clients|\d+\+ (klien|clients|proyek|projects)/i

describe.each(LANGS)('Disatu copy %s', (lang) => {
  const c = getContent(lang)
  it('has no trading copy outside the product card and About', () => {
    const rest = Object.entries(c).filter(([k]) => k !== 'products' && k !== 'about').map(([, v]) => v)
    for (const s of strings(rest)) expect(s).not.toMatch(TRADING)
  })
  it('invents no clients, testimonials or counts', () => {
    for (const s of strings(c)) expect(s).not.toMatch(INVENTED)
  })
})
