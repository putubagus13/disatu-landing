// robots.txt: everything is public, so every crawler is let in, and the sitemap is announced on the site's own origin.
// No per-bot rules: nothing here needs to be kept from a particular crawler.
export function buildRobots(origin: string): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`
}
