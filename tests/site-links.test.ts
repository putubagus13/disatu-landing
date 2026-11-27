import { describe, it, expect } from 'vitest'
import { resolveSiteUrl, chartlabLandingHref } from '@/lib/site-links'

describe('resolveSiteUrl', () => {
  it('strips a trailing slash', () => {
    expect(resolveSiteUrl('https://disatu-landing.vercel.app/', 'http://localhost:3001', false)).toBe('https://disatu-landing.vercel.app')
  })
  it('trims surrounding spaces', () => {
    expect(resolveSiteUrl('  https://a.vercel.app  ', 'x', false)).toBe('https://a.vercel.app')
  })
  it('falls back to the dev default in development when unset or blank', () => {
    expect(resolveSiteUrl(undefined, 'http://localhost:3001', true)).toBe('http://localhost:3001')
    expect(resolveSiteUrl('', 'http://localhost:3001', true)).toBe('http://localhost:3001')
  })
  it('rejects a value without a scheme, or a non-http scheme', () => {
    expect(() => resolveSiteUrl('disatu.vercel.app', 'x', false)).toThrow(/absolute http/)
    expect(() => resolveSiteUrl('javascript:alert(1)', 'x', false)).toThrow(/absolute http/)
  })
  it('names the variable in its errors when given one', () => {
    expect(() => resolveSiteUrl('x.vercel.app', '', false, 'VITE_CHARTLAB_LANDING_URL')).toThrow(/VITE_CHARTLAB_LANDING_URL "x.vercel.app" must be an absolute http/)
    expect(() => resolveSiteUrl(undefined, '', false, 'VITE_CHARTLAB_LANDING_URL')).toThrow(/VITE_CHARTLAB_LANDING_URL is not set/)
  })
  it('refuses to guess outside development', () => {
    expect(() => resolveSiteUrl(undefined, 'x', false)).toThrow(/not set/)
  })
})

describe('chartlabLandingHref', () => {
  it('keeps the visitor language (dev default in tests: the ChartLab landing on port 3000)', () => {
    expect(chartlabLandingHref('en')).toBe('http://localhost:3000/en')
    expect(chartlabLandingHref('id')).toBe('http://localhost:3000/id')
  })
  it('can point at the ChartLab app page', () => {
    expect(chartlabLandingHref('id', '/chartlab')).toBe('http://localhost:3000/id/chartlab')
  })
})
