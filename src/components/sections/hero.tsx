import { useContent, useLang } from "@/i18n/use-content";
import { useTheme } from "@/theme/theme-provider";
import { LinkButton } from "@/components/ui/button";
import { HelixField } from "@/components/ui/helix-field";
import { contactLinks } from '@/lib/contact'

export function Hero() {
  const lang = useLang();
  const { hero, ui, about } = useContent();
  const { whatsapp } = contactLinks(about.contact);
  const { resolved } = useTheme();
  return (
    <section id="hero" className="relative isolate overflow-hidden bg-bg">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-green/10 blur-3xl dark:bg-brand-green/25 lg:left-[72%]"
      />
      <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <p
            style={{ "--i": 0 } as React.CSSProperties}
            className="hero-rise mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {hero.eyebrow}
          </p>
          <h1
            style={{ "--i": 1 } as React.CSSProperties}
            className="hero-rise text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          >
            {hero.title}
          </h1>
          <p
            style={{ "--i": 2 } as React.CSSProperties}
            className="hero-rise mt-6 max-w-xl text-lg text-muted"
          >
            {hero.subtitle}
          </p>
          <div
            style={{ "--i": 3 } as React.CSSProperties}
            className="hero-rise mt-8 flex flex-wrap gap-3"
          >
            <LinkButton external href={whatsapp}>
              {ui.consult}
            </LinkButton>
            <LinkButton href={`/${lang}#services`} variant="ghost">
              {ui.seeServices}
            </LinkButton>
          </div>
        </div>

        <div className="order-1 flex justify-center lg:order-2">
          <HelixField dark={resolved === "dark"} label={ui.visualLabel} />
        </div>
      </div>
    </section>
  );
}
