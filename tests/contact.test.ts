import { describe, it, expect } from 'vitest'
import { formatPhone, contactLinks } from '@/lib/contact'
describe('contact helpers', () => {
  it('formats Indonesian numbers and builds wa.me / mailto links', () => {
    expect(formatPhone('+6282184677520')).toBe('+62 821-8467-7520')
    expect(formatPhone('+15551234567')).toBe('+15551234567')
    expect(contactLinks({ phone: '+6282184677520', email: 'a@b.co' })).toEqual({ whatsapp: 'https://wa.me/6282184677520', mailto: 'mailto:a@b.co' })
  })
})
