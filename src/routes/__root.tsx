import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import appCss from '../styles.css?url'
import { ThemeProvider } from '@/theme/theme-provider'
import { themeInitScript } from '@/theme/theme'
import { splashInitScript } from '@/lib/splash'
import { Splash } from '@/components/ui/splash'
import { useLang } from '@/i18n/use-content'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#ffffff', media: '(prefers-color-scheme: light)' },
      { name: 'theme-color', content: '#0a0a0a', media: '(prefers-color-scheme: dark)' },
      { property: 'og:site_name', content: 'Disatu' },
    ],
    links: [
      { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
      { rel: 'apple-touch-icon', href: '/favicon-180.png' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap',
      },
      { rel: 'stylesheet', href: appCss },
    ],
    scripts: [{ children: themeInitScript }, { children: splashInitScript }],
  }),
  shellComponent: RootDocument,
  component: () => (
    <ThemeProvider>
      <Splash />
      <Outlet />
    </ThemeProvider>
  ),
  notFoundComponent: () => (
    <div className="p-8">
      <h1 className="text-2xl font-bold">404 — Not found</h1>
    </div>
  ),
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const lang = useLang()
  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
