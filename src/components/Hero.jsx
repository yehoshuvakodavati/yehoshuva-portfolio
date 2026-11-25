import { Suspense, lazy, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Download, Github, Linkedin, Mail, MapPin } from 'lucide-react'
import { profile } from '../data/profile'
import { useTheme } from '../hooks/useTheme'
import Portrait from './ui/Portrait'

const HeroScene = lazy(() => import('../three/HeroScene'))

const nameLines = [profile.firstName.toUpperCase(), profile.lastName.toUpperCase()]

const ticker = [
  'Backend engineering',
  'Applied AI',
  'Retrieval-augmented generation',
  'System design',
  'Microservices',
  'Product thinking',
]

function AnimatedName({ reduced }) {
  if (reduced) {
    return (
      <h1 className="font-display text-[clamp(2.85rem,7.4vw,6.6rem)] font-semibold uppercase leading-[0.86] tracking-tightest text-ink">
        <span className="block">{nameLines[0]}</span>
        <span className="block text-gradient">{nameLines[1]}</span>
      </h1>
    )
  }

  return (
    <h1 className="font-display text-[clamp(2.85rem,7.4vw,6.6rem)] font-semibold uppercase leading-[0.86] tracking-tightest text-ink">
      <span className="sr-only">{profile.name}</span>
      {nameLines.map((line, lineIndex) => (
        <span key={line} className="block overflow-hidden pb-[0.06em]" aria-hidden="true">
          <motion.span
            className={`flex ${lineIndex === 1 ? 'text-gradient' : ''}`}
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.032, delayChildren: 0.18 + lineIndex * 0.16 } } }}
          >
            {line.split('').map((char, index) => (
              <motion.span
                key={`${char}-${index}`}
                className="inline-block"
                variants={{
                  hidden: { y: '110%', opacity: 0 },
                  show: { y: '0%', opacity: 1, transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] } },
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        </span>
      ))}
    </h1>
  )
}

function RoleRotator() {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduced) return
    const timer = setInterval(() => setIndex((value) => (value + 1) % profile.rotatingRoles.length), 3400)
    return () => clearInterval(timer)
  }, [reduced])

  return (
    <span className="relative inline-flex h-[1.5em] min-w-[13rem] overflow-hidden align-bottom">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={profile.rotatingRoles[index]}
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -16, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex items-center font-mono text-[11px] uppercase tracking-[0.24em] text-cyan"
        >
          {profile.rotatingRoles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export default function Hero() {
  const reduced = useReducedMotion()
  const { theme } = useTheme()
  const [active, setActive] = useState(true)
  const [sectionEl, setSectionEl] = useState(null)

  useEffect(() => {
    if (!sectionEl) return
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { threshold: 0.02 })
    observer.observe(sectionEl)
    return () => observer.disconnect()
  }, [sectionEl])

  return (
    <section
      id="home"
      ref={setSectionEl}
      className="relative flex min-h-[100svh] flex-col overflow-hidden pt-28 sm:pt-32"
    >
      <div className="pointer-events-none absolute inset-0 z-0 lg:left-[22%]" aria-hidden="true">
        <div className="absolute inset-0 opacity-60 lg:opacity-100">
          <Suspense fallback={<div className="orb-fallback absolute left-1/2 top-1/2 h-[46vw] w-[46vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 lg:h-[34vw] lg:w-[34vw]" />}>
            <HeroScene theme={theme} reduced={Boolean(reduced)} active={active} />
          </Suspense>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[1] lg:hidden"
        style={{ background: 'linear-gradient(to bottom, var(--bg) 8%, color-mix(in srgb, var(--bg) 72%, transparent) 45%, var(--bg) 96%)' }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-0 z-[1] hidden lg:block"
        style={{ background: 'linear-gradient(90deg, var(--bg) 6%, color-mix(in srgb, var(--bg) 88%, transparent) 38%, transparent 62%)' }}
        aria-hidden="true"
      />

      <div className="shell relative z-10 flex flex-1 flex-col justify-center pb-14">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-3 rounded-full border border-line bg-glass px-3.5 py-1.5 backdrop-blur-md"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan" />
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-mute">{profile.availability}</span>
            </motion.div>

            <div className="mt-8">
              <AnimatedName reduced={Boolean(reduced)} />
            </div>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-3"
            >
              <RoleRotator />
              <span className="hidden h-3 w-px bg-lineStrong sm:block" aria-hidden="true" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">Visakhapatnam · IN</span>
            </motion.div>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-2xl font-display text-[clamp(1.05rem,2.05vw,1.65rem)] font-light uppercase leading-[1.32] tracking-[0.035em] text-ink/90"
            >
              Engineering the next generation of{' '}
              <span className="font-serif italic lowercase tracking-normal text-gradient">intelligence</span>.
            </motion.p>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 max-w-lg text-[15px] leading-relaxed text-mute"
            >
              {profile.heroSupport}
            </motion.p>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <a href="#universe" className="btn-primary group">
                Explore my universe
                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a href={profile.resumeUrl} download className="btn-ghost group">
                <Download size={15} className="text-cyan" />
                Download resume
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative lg:col-span-5 lg:pl-6"
          >
            <div className="relative mx-auto max-w-sm lg:ml-auto lg:mr-0">
              <div className="panel holo p-4 shadow-[var(--shadow)]">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[8px] uppercase tracking-[0.24em] text-faint">Identity / 001</span>
                  <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.18em] text-cyan">
                    <span className="h-1 w-1 rounded-full bg-cyan" />
                    Online
                  </span>
                </div>

                <Portrait className="mt-4 aspect-[4/5] w-full" />

                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <p className="font-display text-sm font-medium tracking-tight text-ink">{profile.name}</p>
                    <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.18em] text-faint">
                      B.Tech CSE · ANITS · 3rd year
                    </p>
                  </div>
                  <span className="font-display text-lg font-light text-gradient">{profile.education.cgpa}</span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line">
                  <div className="bg-elev/70 p-2.5">
                    <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-faint">Graduating</p>
                    <p className="mt-1 text-sm text-ink">{profile.education.graduation}</p>
                  </div>
                  <div className="bg-elev/70 p-2.5">
                    <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-faint">Focus</p>
                    <p className="mt-1 text-sm text-ink">AI · Backend</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.16em] text-faint">
                    <MapPin size={10} /> Visakhapatnam
                  </span>
                  <div className="flex items-center gap-1">
                    <a href="https://github.com/yehoshuvakodavati" target="_blank" rel="noreferrer noopener" aria-label="GitHub" className="flex h-7 w-7 items-center justify-center rounded-full text-mute transition-colors hover:bg-glass hover:text-ink">
                      <Github size={13} />
                    </a>
                    <a href="https://www.linkedin.com/in/kodavati-yehoshuva-9613073b6/" target="_blank" rel="noreferrer noopener" aria-label="LinkedIn" className="flex h-7 w-7 items-center justify-center rounded-full text-mute transition-colors hover:bg-glass hover:text-ink">
                      <Linkedin size={13} />
                    </a>
                    <a href={`mailto:${profile.email}`} aria-label="Email" className="flex h-7 w-7 items-center justify-center rounded-full text-mute transition-colors hover:bg-glass hover:text-ink">
                      <Mail size={13} />
                    </a>
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute -left-10 top-20 hidden animate-drift rounded-full border border-line bg-glass px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-mute backdrop-blur-md md:block">
                RAG pipelines
              </div>
              <div
                className="pointer-events-none absolute -right-6 top-1/2 hidden animate-drift rounded-full border border-line bg-glass px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-mute backdrop-blur-md md:block"
                style={{ animationDelay: '1.4s' }}
              >
                Spring Boot
              </div>
              <div
                className="pointer-events-none absolute -left-6 bottom-16 hidden animate-drift rounded-full border border-line bg-glass px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-mute backdrop-blur-md md:block"
                style={{ animationDelay: '2.6s' }}
              >
                Local LLMs
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-14 flex items-center gap-3">
          <a href="#about" className="group inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.24em] text-faint transition-colors hover:text-ink">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-line transition-colors group-hover:border-cyan/40">
              <ArrowDown size={11} className="transition-transform duration-500 group-hover:translate-y-0.5" />
            </span>
            Scroll to explore
          </a>
          <span className="h-px flex-1 bg-gradient-to-r from-line to-transparent" aria-hidden="true" />
        </div>
      </div>

      <div className="relative z-10 border-y border-line bg-glass py-3 backdrop-blur-sm">
        <div className="mask-fade-x flex overflow-hidden">
          <div className="flex shrink-0 animate-marquee items-center gap-8 whitespace-nowrap pr-8">
            {[...ticker, ...ticker].map((item, index) => (
              <span key={`${item}-${index}`} className="flex items-center gap-8 font-mono text-[9px] uppercase tracking-[0.28em] text-faint">
                {item}
                <span className="h-1 w-1 rotate-45 bg-cyan/50" aria-hidden="true" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
