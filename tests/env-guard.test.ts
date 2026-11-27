import { describe, it, expect, afterEach } from 'vitest'
import { requireEnv } from '../vite-env-guard.ts'

type Hook = (cfg: object, env: { command: 'build' | 'serve'; mode: string }) => unknown
const run = (env: { command: 'build' | 'serve'; mode: string }) => {
  const plugin = requireEnv(['VITE_CHARTLAB_LANDING_URL'])
  return (plugin.config as unknown as Hook)({}, env)
}

describe('requireEnv (production build guard)', () => {
  const saved = process.env.VITE_CHARTLAB_LANDING_URL
  afterEach(() => {
    if (saved === undefined) delete process.env.VITE_CHARTLAB_LANDING_URL
    else process.env.VITE_CHARTLAB_LANDING_URL = saved
  })

  it('stops a production build when the variable is missing, naming it', () => {
    delete process.env.VITE_CHARTLAB_LANDING_URL
    expect(() => run({ command: 'build', mode: 'production' })).toThrow(/VITE_CHARTLAB_LANDING_URL/)
  })
  it('stops a production build when the variable is blank', () => {
    process.env.VITE_CHARTLAB_LANDING_URL = '   '
    expect(() => run({ command: 'build', mode: 'production' })).toThrow(/VITE_CHARTLAB_LANDING_URL/)
  })
  it('lets the build through once it is set', () => {
    process.env.VITE_CHARTLAB_LANDING_URL = 'https://x.vercel.app'
    expect(() => run({ command: 'build', mode: 'production' })).not.toThrow()
  })
  it('never blocks the dev server', () => {
    delete process.env.VITE_CHARTLAB_LANDING_URL
    expect(() => run({ command: 'serve', mode: 'development' })).not.toThrow()
  })
})
