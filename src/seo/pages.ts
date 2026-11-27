// The pages search engines should index, below the language segment ('' is the home page). Every entry is listed in
// sitemap.xml in every language. `/{lang}/chartlab` is not here on purpose: it redirects to the ChartLab landing, and a
// redirect never belongs in a sitemap.
export const INDEXABLE_PAGES = ['', '/about'] as const
