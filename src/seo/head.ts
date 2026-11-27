// The <head> of a page for search engines and link previews, in one place so every route says the same things the same
// way: a self-referencing canonical, absolute hreflang alternates, Open Graph and Twitter cards, optional JSON-LD.
import { DEFAULT_LANG, LANGS, type Lang } from '@/i18n/lang'

/** The share image, 1200x630, in public/. */
export const OG_IMAGE = { path: '/og-image.png', width: 1200, height: 630 }

const LOCALE: Record<Lang, string> = { id: 'id_ID', en: 'en_US' }

type Meta = Record<string, string>
type Link = { rel: string; href: string; hrefLang?: string }
type Script = { type: string; children: string }

/** A JSON-LD script. `<` is escaped so text inside the data can never close the tag early. */
export function jsonLdScript(data: unknown): Script {
  return { type: 'application/ld+json', children: JSON.stringify(data).replace(/</g, '\\u003c') }
}

export interface SeoHeadInput {
  origin: string
  lang: Lang
  /** The page below the language segment: '' for the home page. */
  sub: string
  title: string
  description: string
  /** Alt text for the share image. Defaults to the title. */
  imageAlt?: string
  jsonLd?: unknown
}

export function seoHead({ origin, lang, sub, title, description, imageAlt, jsonLd }: SeoHeadInput): { meta: Meta[]; links: Link[]; scripts?: Script[] } {
  const url = (l: Lang): string => `${origin}/${l}${sub}`
  const image = `${origin}${OG_IMAGE.path}`
  const other = LANGS.filter((l) => l !== lang)
  return {
    meta: [
      { title },
      { name: 'description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: url(lang) },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:locale', content: LOCALE[lang] },
      ...other.map((l) => ({ property: 'og:locale:alternate', content: LOCALE[l] })),
      { property: 'og:image', content: image },
      { property: 'og:image:width', content: String(OG_IMAGE.width) },
      { property: 'og:image:height', content: String(OG_IMAGE.height) },
      { property: 'og:image:alt', content: imageAlt ?? title },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
    ],
    links: [
      { rel: 'canonical', href: url(lang) },
      ...LANGS.map((l) => ({ rel: 'alternate', hrefLang: l, href: url(l) })),
      { rel: 'alternate', hrefLang: 'x-default', href: url(DEFAULT_LANG) },
    ],
    ...(jsonLd ? { scripts: [jsonLdScript(jsonLd)] } : {}),
  }
}
