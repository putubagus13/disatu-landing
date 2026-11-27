// Normalises a site URL from an env var. Dependency-free: the Vite build guard (vite-env-guard.ts) runs it at build
// time on the same value, so a value that would break the site at runtime stops the build instead.

/**
 * Trimmed, no trailing slash, absolute http(s) only. Unset or blank: the dev default in development, an error anywhere
 * else. `name` (the env var) goes into the error messages.
 */
export function resolveSiteUrl(value: string | undefined, devDefault: string, isDev: boolean, name = 'Site URL'): string {
  const raw = (value ?? '').trim()
  if (!raw) {
    if (isDev) return devDefault
    throw new Error(`${name} is not set (see README: environment variables)`)
  }
  const bad = () => new Error(`${name} "${raw}" must be an absolute http(s) URL, e.g. https://example.vercel.app`)
  let url: URL
  try {
    url = new URL(raw)
  } catch {
    throw bad()
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') throw bad()
  return (url.origin + url.pathname).replace(/\/+$/, '')
}
