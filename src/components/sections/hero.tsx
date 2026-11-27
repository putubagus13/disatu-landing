import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useContent, useLang } from "@/i18n/use-content";
import { useTheme } from "@/theme/theme-provider";
import { LinkButton } from "@/components/ui/button";
import { WaveMesh } from "@/components/ui/wave-mesh";
import { useMotionEnabled } from "@/components/motion/use-motion-enabled";
import { contactLinks } from "@/lib/contact";

/**
 * The hero is three layers that scroll at different speeds, which is what gives it depth: the brand glow drifts
 * down fastest, the wave mesh behind the text more slowly, and the text itself lags the page and fades as the hero
 * leaves. Each layer is oversized so it never shows an edge while it moves. With reduced motion nothing moves.
 */
export function Hero() {
  const lang = useLang();
  const { hero, ui, about } = useContent();
  const { whatsapp } = contactLinks(about.contact);
  const { resolved } = useTheme();
  const motionOn = useMotionEnabled();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const meshY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0px", "140px"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5, 0.9], [1, 0.85, 0]);

  return (
    <section ref={ref} id="hero" className="relative isolate overflow-hidden bg-bg">
      {/* brand glow: Disatu green and logo yellow */}
      <motion.div
        data-parallax="glow"
        aria-hidden="true"
        style={motionOn ? { y: glowY } : undefined}
        className="pointer-events-none absolute inset-x-0 -top-[35%] h-[150%]"
      >
        <div className="absolute left-[8%] top-[34%] h-[55vmin] w-[55vmin] rounded-full bg-[var(--grad-from)] opacity-25 blur-3xl dark:opacity-30" />
        <div className="absolute right-[6%] top-[44%] h-[48vmin] w-[48vmin] rounded-full bg-[var(--grad-to)] opacity-25 blur-3xl dark:opacity-20" />
      </motion.div>

      {/* wave mesh */}
      <motion.div
        data-parallax="bg"
        aria-hidden="true"
        style={motionOn ? { y: meshY } : undefined}
        className="pointer-events-none absolute inset-x-0 -top-[25%] h-[130%]"
      >
        <WaveMesh theme={resolved === "dark" ? "dark" : "light"} horizon={0.38} className="h-full w-full" />
      </motion.div>

      {/* keeps the text readable over the dots, and fades the hero into the next section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_45%_at_50%_48%,var(--bg),transparent_78%)] opacity-85"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-bg"
      />

      <motion.div
        data-parallax="content"
        style={motionOn ? { y: textY, opacity: textOpacity } : undefined}
        className="relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] max-w-4xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6"
      >
        <p
          style={{ "--i": 0 } as React.CSSProperties}
          className="hero-rise mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3 py-1 font-mono text-xs text-muted backdrop-blur"
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
          className="hero-rise mt-6 max-w-2xl text-lg text-muted"
        >
          {hero.subtitle}
        </p>
        <div
          style={{ "--i": 3 } as React.CSSProperties}
          className="hero-rise mt-8 flex flex-wrap justify-center gap-3"
        >
          <LinkButton external href={whatsapp}>
            {ui.consult}
          </LinkButton>
          <LinkButton href={`/${lang}#services`} variant="ghost">
            {ui.seeServices}
          </LinkButton>
        </div>
      </motion.div>
    </section>
  );
}
