import { loadEnv, type Plugin } from 'vite'
import { resolveSiteUrl } from './src/lib/resolve-site-url.ts'

/**
 * Stops a production build when a required env var is missing, blank, or not an absolute http(s) URL (a bare Vercel
 * domain such as "x.vercel.app" is the likely slip), so a site whose links to the other landing would be broken, or
 * that would fail on every request, can never ship. The dev server is never blocked (it falls back to local defaults).
 */
export function requireEnv(names: string[]): Plugin {
  return {
    name: 'require-env',
    config(_, { command, mode }) {
      if (command !== 'build') return
      const env = { ...loadEnv(mode, process.cwd(), 'VITE_'), ...process.env }
      for (const name of names) {
        if (!env[name]?.trim()) {
          throw new Error(`${name} is not set. Set it in the Vercel project's environment variables (see README).`)
        }
        resolveSiteUrl(env[name], '', false, name)
      }
    },
  }
}
