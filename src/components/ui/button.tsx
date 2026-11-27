import { motion } from 'framer-motion'
import { AppLink } from './app-link'

type Props = {
  href: string
  variant?: 'primary' | 'secondary' | 'ghost'
  external?: boolean
  /** External http(s) links open in a new tab unless this is false (links to our own sites stay in the same tab). */
  newTab?: boolean
  children: React.ReactNode
  className?: string
}

const base = 'inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-colors duration-200'
// primary: the shiny pill (styles in styles.css). Its label sits in a <span> the glow effect hangs on.
const variants = {
  primary: 'shiny-cta',
  secondary: `${base} bg-fg text-bg hover:opacity-90`,
  ghost: `${base} border border-border text-fg hover:bg-surface`,
}

export function LinkButton({ href, variant = 'primary', external, newTab = true, children, className = '' }: Props) {
  const cls = `${variants[variant]} ${className}`
  const label = variant === 'primary' ? <span>{children}</span> : children
  return (
    <motion.span className="inline-block" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
      {external ? (
        <a href={href} {...(newTab && /^https?:/.test(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className={cls}>
          {label}
        </a>
      ) : (
        <AppLink href={href} className={cls}>
          {label}
        </AppLink>
      )}
    </motion.span>
  )
}
