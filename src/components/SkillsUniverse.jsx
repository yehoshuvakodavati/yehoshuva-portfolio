import { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { BrainCircuit, Code2, Database, LayoutDashboard, Server, Wrench } from 'lucide-react'
import { skillGroups, skillNote, tiers } from '../data/skills'
import { useTheme } from '../hooks/useTheme'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'

const SkillsOrbit = lazy(() => import('../three/SkillsOrbit'))

const ICONS = { Code2, Server, LayoutDashboard, BrainCircuit, Database, Wrench }

function TierMeter({ tier, accent }) {
  return (
    <span className="flex items-center gap-1" aria-label={`${tiers[tier]} level`}>
      {[1, 2, 3].map((step) => (
        <span
          key={step}
          className="h-1 w-4 rounded-full transition-colors"
          style={{ background: step <= tier ? accent : 'var(--line)' }}
        />
      ))}
    </span>
  )
}

export default function SkillsUniverse() {
  const reduced = useReducedMotion()
  const { theme } = useTheme()
  const [activeId, setActiveId] = useState('programming')
  const [mounted, setMounted] = useState(false)
  const orbitRef = useRef(null)

  useEffect(() => {
    const node = orbitRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const active = useMemo(() => skillGroups.find((group) => group.id === activeId) ?? skillGroups[0], [activeId])
  const ActiveIcon = ICONS[active.icon] ?? Code2

  return (
    <section id="universe" className="section scroll-mt-24">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="02"
            label="Technology universe"
            title="Six clusters. One engineering practice."
            lede="Tools are only useful in context. This is the stack I reach for, mapped by how I actually use it — from service boundaries to retrieval pipelines."
          />
          <Reveal delay={0.1} className="shrink-0">
            <div className="flex items-center gap-4 rounded-full border border-line bg-glass px-4 py-2.5">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-faint">Clusters</span>
              <span className="font-display text-lg font-light text-ink">06</span>
              <span className="h-3 w-px bg-lineStrong" aria-hidden="true" />
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-faint">Skills</span>
              <span className="font-display text-lg font-light text-ink">
                {skillGroups.reduce((total, group) => total + group.skills.length, 0)}
              </span>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="panel relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-line px-5 py-3">
                <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-faint">Orbital map</span>
                <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-faint">Drag to rotate</span>
              </div>

              <div ref={orbitRef} className="relative h-[330px] w-full sm:h-[400px]">
                <div className="pointer-events-none absolute inset-0 grid-plane opacity-40" aria-hidden="true" />
                {mounted ? (
                  <Suspense fallback={<div className="orb-fallback absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40" />}>
                    <SkillsOrbit activeId={activeId} onSelect={setActiveId} theme={theme} reduced={Boolean(reduced)} />
                  </Suspense>
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <div className="orb-fallback h-40 w-40 rounded-full opacity-40" />
                  </div>
                )}
                <div className="pointer-events-none absolute bottom-3 left-4 font-mono text-[8px] uppercase tracking-[0.22em] text-faint">
                  Node → cluster
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 border-t border-line p-4 sm:grid-cols-3">
                {skillGroups.map((group) => {
                  const Icon = ICONS[group.icon] ?? Code2
                  const isActive = activeId === group.id
                  return (
                    <button
                      key={group.id}
                      type="button"
                      onClick={() => setActiveId(group.id)}
                      aria-pressed={isActive}
                      className={`flex items-center gap-2 rounded-lg border px-2.5 py-2 text-left transition-colors duration-300 ${
                        isActive ? 'border-cyan/40 bg-glass-strong text-ink' : 'border-line bg-transparent text-mute hover:text-ink'
                      }`}
                    >
                      <Icon size={13} style={{ color: group.accent }} />
                      <span className="truncate text-[11px]">{group.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-7">
            <div className="panel h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="p-6 sm:p-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <span
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border"
                        style={{ borderColor: `${active.accent}44`, background: `${active.accent}14` }}
                      >
                        <ActiveIcon size={19} style={{ color: active.accent }} />
                      </span>
                      <div>
                        <h3 className="font-display text-xl font-medium tracking-tight text-ink">{active.label}</h3>
                        <p className="mt-1 max-w-md text-[13px] leading-relaxed text-mute">{active.blurb}</p>
                      </div>
                    </div>
                    <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.18em] text-faint">
                      {String(active.skills.length).padStart(2, '0')} skills
                    </span>
                  </div>

                  <ul className="mt-7 grid gap-x-6 gap-y-5 sm:grid-cols-2">
                    {active.skills.map((skill, index) => (
                      <motion.li
                        key={skill.name}
                        initial={reduced ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.04 + index * 0.035, duration: 0.4 }}
                        className="group"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-sm font-medium text-ink">{skill.name}</span>
                          <TierMeter tier={skill.tier} accent={active.accent} />
                        </div>
                        <p className="mt-1.5 text-[11px] leading-snug text-faint">{skill.note}</p>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>

              <div className="mt-auto flex flex-wrap items-center gap-4 border-t border-line px-6 py-4">
                {[3, 2, 1].map((tier) => (
                  <span key={tier} className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.16em] text-faint">
                    <TierMeter tier={tier} accent="var(--mute)" />
                    {tiers[tier]}
                  </span>
                ))}
                <span className="ml-auto max-w-[240px] text-[10px] leading-snug text-faint">{skillNote}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
