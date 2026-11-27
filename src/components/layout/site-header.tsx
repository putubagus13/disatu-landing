import { useEffect, useRef, useState } from 'react'
import { useRouterState } from '@tanstack/react-router'
import { AnimatePresence, motion } from 'framer-motion'
import { useContent, useLang } from '@/i18n/use-content'
import type { NavItem } from '@/content/types'
import { Logo } from '@/components/ui/logo'
import { AppLink } from '@/components/ui/app-link'
import { LinkButton } from '@/components/ui/button'
import { LangSwitch } from '@/components/ui/lang-switch'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { contactLinks } from '@/lib/contact'

export function navHref(lang: string, item: NavItem) {
  return item.page === 'about' ? `/${lang}/about` : `/${lang}${item.hash ? `#${item.hash}` : ''}`
}

export function SiteHeader() {
  const lang = useLang()
  const { nav, ui, about } = useContent()
  const { whatsapp } = contactLinks(about.contact)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)
  const href = useRouterState({ select: (st) => st.location.href })

  // any navigation (logo, language switch, back/forward) closes the menu
  useEffect(() => setOpen(false), [href])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        btnRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${scrolled ? 'border-border bg-bg/80 backdrop-blur' : 'border-transparent bg-bg'}`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <AppLink href={`/${lang}`} aria-label="Disatu" className="shrink-0">
          <Logo />
        </AppLink>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {nav.map((item) => (
            <AppLink key={item.label} href={navHref(lang, item)} className="text-muted transition-colors hover:text-fg">
              {item.label}
            </AppLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LangSwitch />
          <ThemeToggle />
          <LinkButton external href={whatsapp}>
            {ui.consult}
          </LinkButton>
        </div>

        <button
          ref={btnRef}
          type="button"
          className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-border md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? ui.menuClose : ui.menuOpen}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-border bg-bg md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {nav.map((item) => (
                <AppLink
                  key={item.label}
                  href={navHref(lang, item)}
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center rounded-lg px-3 text-base font-medium hover:bg-surface"
                >
                  {item.label}
                </AppLink>
              ))}
              <div className="mt-3 flex items-center justify-between gap-2">
                <LangSwitch />
                <ThemeToggle />
              </div>
              <div className="mt-3" onClick={() => setOpen(false)}>
                <LinkButton external href={whatsapp} className="w-full">
                  {ui.consult}
                </LinkButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
