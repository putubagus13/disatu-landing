import { motion } from 'framer-motion'
import type { ProcessStep } from '@/content/types'

// Small line illustrations for the five steps of Disatu's process, in the style the old trading-workflow visuals
// used: theme ink and muted strokes, the accent for what matters, lines that draw themselves when motion is on.

const INK = 'var(--fg)'
const LINE = 'var(--border)'
const MUTED = 'var(--muted)'
const SURFACE = 'var(--surface)'

function DrawLine({ d, enabled, stroke = 'currentColor', width = 2.5, delay = 0 }: { d: string; enabled: boolean; stroke?: string; width?: number; delay?: number }) {
  return (
    <motion.path
      key={enabled ? 'motion' : 'static'}
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={enabled ? { pathLength: 0 } : false}
      animate={enabled ? { pathLength: 1 } : undefined}
      transition={{ duration: 1.2, ease: 'easeInOut', delay }}
    />
  )
}

function Frame({ step, children }: { step: ProcessStep; children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 320 190" className="w-full text-accent" role="img" aria-label={step.title} data-step={step.id}>
      {children}
    </svg>
  )
}

type V = { step: ProcessStep; enabled: boolean }

/** 1. Discovery: a conversation that turns into a checklist. */
function Discovery({ step, enabled }: V) {
  return (
    <Frame step={step}>
      <rect x="16" y="22" width="150" height="50" rx="14" fill={SURFACE} stroke={LINE} />
      <path d="M40 72 l-8 16 l22 -16" fill={SURFACE} stroke={LINE} />
      <rect x="34" y="38" width="96" height="6" rx="3" fill={MUTED} opacity="0.5" />
      <rect x="34" y="52" width="66" height="6" rx="3" fill={MUTED} opacity="0.35" />
      <rect x="120" y="96" width="150" height="50" rx="14" fill="currentColor" opacity="0.12" />
      <rect x="120" y="96" width="150" height="50" rx="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <rect x="138" y="112" width="100" height="6" rx="3" fill="currentColor" opacity="0.55" />
      <rect x="138" y="126" width="70" height="6" rx="3" fill="currentColor" opacity="0.35" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="248" y={20 + i * 22} width="14" height="14" rx="3" fill="none" stroke={MUTED} />
          <DrawLine d={`M251 ${27 + i * 22} l3 3 l6 -7`} enabled={enabled} width={2} delay={0.3 + i * 0.25} />
          <rect x="268" y={24 + i * 22} width="38" height="5" rx="2.5" fill={MUTED} opacity="0.4" />
        </g>
      ))}
    </Frame>
  )
}

/** 2. Scope & proposal: a document and a timeline of stages. */
function Proposal({ step, enabled }: V) {
  const xs = [40, 120, 200, 280]
  return (
    <Frame step={step}>
      <path d="M110 12 h80 l20 20 v96 h-100 z" fill={SURFACE} stroke={LINE} />
      <path d="M190 12 v20 h20" fill="none" stroke={LINE} />
      {[40, 56, 72, 88, 104].map((y, i) => (
        <rect key={y} x="124" y={y} width={i === 0 ? 50 : 72 - (i % 2) * 18} height="5" rx="2.5" fill={i === 0 ? INK : MUTED} opacity={i === 0 ? 0.8 : 0.4} />
      ))}
      <line x1="40" y1="160" x2="280" y2="160" stroke={LINE} strokeWidth="2" />
      <DrawLine d="M40 160 H280" enabled={enabled} width={2.5} />
      {xs.map((x, i) => (
        <g key={x}>
          <circle cx={x} cy="160" r="7" fill={i === 0 ? 'currentColor' : SURFACE} stroke="currentColor" strokeWidth="2" />
          <rect x={x - 16} y="174" width="32" height="5" rx="2.5" fill={MUTED} opacity="0.45" />
        </g>
      ))}
    </Frame>
  )
}

/** 3. Design & build: a browser window, the design above, code below. */
function Build({ step, enabled }: V) {
  return (
    <Frame step={step}>
      <rect x="30" y="14" width="260" height="162" rx="10" fill={SURFACE} stroke={LINE} />
      <line x1="30" y1="36" x2="290" y2="36" stroke={LINE} />
      {[46, 58, 70].map((x) => (
        <circle key={x} cx={x} cy="25" r="3.5" fill={MUTED} opacity="0.5" />
      ))}
      <rect x="48" y="50" width="104" height="54" rx="6" fill="currentColor" opacity="0.14" />
      <rect x="164" y="52" width="106" height="8" rx="4" fill={INK} opacity="0.75" />
      <rect x="164" y="68" width="88" height="5" rx="2.5" fill={MUTED} opacity="0.45" />
      <rect x="164" y="80" width="70" height="5" rx="2.5" fill={MUTED} opacity="0.45" />
      <DrawLine d="M120 132 l-16 14 l16 14" enabled={enabled} width={3} />
      <DrawLine d="M200 132 l16 14 l-16 14" enabled={enabled} width={3} delay={0.2} />
      <DrawLine d="M170 126 l-20 40" enabled={enabled} stroke={MUTED} width={2.5} delay={0.4} />
    </Frame>
  )
}

/** 4. Test & launch: checks pass, then the line takes off. */
function Launch({ step, enabled }: V) {
  return (
    <Frame step={step}>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <circle cx="40" cy={50 + i * 40} r="11" fill="currentColor" opacity="0.14" />
          <DrawLine d={`M34 ${50 + i * 40} l4 4 l8 -9`} enabled={enabled} width={2.2} delay={i * 0.2} />
          <rect x="60" y={47 + i * 40} width="60" height="6" rx="3" fill={MUTED} opacity="0.45" />
        </g>
      ))}
      <line x1="150" y1="170" x2="300" y2="170" stroke={LINE} />
      <DrawLine d="M150 162 C200 160 230 140 250 100 S280 40 296 24" enabled={enabled} width={3} delay={0.6} />
      <path d="M284 22 l14 0 l-2 14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  )
}

/** 5. Post-launch support: an ongoing loop with a steady pulse. */
function Support({ step, enabled }: V) {
  return (
    <Frame step={step}>
      <circle cx="160" cy="95" r="62" fill="none" stroke={LINE} strokeWidth="2" />
      <DrawLine d="M160 33 A62 62 0 1 1 98 95" enabled={enabled} width={3} />
      <path d="M92 86 l6 10 l9 -8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <DrawLine d="M112 98 H138 l8 -20 l12 36 l10 -26 l6 10 H208" enabled={enabled} stroke={INK} width={2.4} delay={0.5} />
    </Frame>
  )
}

export function ProcessVisual({ step, enabled }: { step: ProcessStep; enabled: boolean }) {
  switch (step.id) {
    case 'discovery':
      return <Discovery step={step} enabled={enabled} />
    case 'proposal':
      return <Proposal step={step} enabled={enabled} />
    case 'build':
      return <Build step={step} enabled={enabled} />
    case 'launch':
      return <Launch step={step} enabled={enabled} />
    case 'support':
      return <Support step={step} enabled={enabled} />
  }
}
