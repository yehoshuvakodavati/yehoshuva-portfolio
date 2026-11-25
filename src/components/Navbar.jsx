import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { navigation, profile, socials } from '../data/profile'
import ThemeToggle from './ThemeToggle'

const DESKTOP_IDS = ['about', 'universe', 'work', 'experience', 'journey', 'contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = navigation.map((item) => document.getElementById(item.id)).filter(Boolean)
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-42% 0px -52% 0px', threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const desktopLinks = navigation.filter((item) => DESKTOP_IDS.includes(item.id))

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[100]">
        <div className={`shell transition-all duration-700 ease-cinematic ${scrolled ? 'pt-3' : 'pt-5 sm:pt-7'}`}>
          <nav
            aria-label="Primary"
            className={`flex items-center justify-between gap-4 rounded-full px-3 py-2 transition-all duration-700 ease-cinematic sm:px-4 ${
              scrolled ? 'glass-strong shadow-[0_20px_60px_-40px_rgba(0,0,0,0.9)]' : 'border border-transparent'
            }`}
          >
            <a href="#home" className="group flex items-center gap-3 rounded-full py-1 pl-1 pr-3" aria-label={`${profile.name} — home`}>
              <span className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-lineStrong bg-glass">
                <span className="font-display text-[11px] font-semibold tracking-tight text-gradient">{profile.monogram}</span>
                <span className="absolute -inset-px rounded-xl border border-cyan/10" aria-hidden="true" />
              </span>
              <span className="hidden flex-col leading-none sm:flex">
                <span className="font-display text-[13px] font-medium tracking-tight text-ink">{profile.name}</span>
                <span className="mt-1 font-mono text-[8px] uppercase tracking-[0.22em] text-faint">Software · AI · Backend</span>
              </span>
            </a>

            <div className="hidden items-center gap-1 lg:flex">
              {desktopLinks.map((item) => {
                const isActive = active === item.id
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative rounded-full px-3.5 py-2 text-[13px] transition-colors duration-300 ${
                      isActive ? 'text-ink' : 'text-mute hover:text-ink'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-2.5 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-cyan to-transparent"
                        transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                      />
                    )}
                  </a>
                )
              })}
            </div>

            <div className="flex items-center gap-2">
              <ThemeToggle className="hidden sm:flex" />
              <a
                href="#contact"
                className="group hidden items-center gap-1.5 rounded-full border border-lineStrong bg-glass px-4 py-2 text-[13px] font-medium text-ink transition-colors duration-300 hover:border-cyan/40 sm:inline-flex"
              >
                Let&apos;s talk
                <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                aria-expanded={open}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-glass text-ink lg:hidden"
              >
                <Menu size={16} />
              </button>
            </div>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[110] overflow-y-auto bg-base/95 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            <div className="absolute inset-0 grid-plane opacity-40" aria-hidden="true" />
            <div className="relative shell flex min-h-full flex-col py-6">
              <div className="flex items-center justify-between">
                <span className="font-display text-sm tracking-tight text-ink">{profile.name}</span>
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close menu"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-glass text-ink"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              <nav className="mt-12 flex flex-col" aria-label="Mobile">
                {navigation.map((item, i) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.035, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="group flex items-baseline justify-between border-b border-line py-4"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-mono text-[9px] tracking-[0.2em] text-cyan">{item.index}</span>
                      <span className="font-display text-2xl font-light tracking-tight text-ink transition-colors group-hover:text-cyan">
                        {item.label}
                      </span>
                    </span>
                    <ArrowUpRight size={16} className="text-faint transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink" />
                  </motion.a>
                ))}
              </nav>

              <div className="mt-auto pt-10">
                <a href={profile.resumeUrl} download className="btn-primary w-full">
                  Download Resume
                </a>
                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
                  {socials
                    .filter((social) => social.id !== 'email')
                    .map((social) => (
                      <a
                        key={social.id}
                        href={social.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute hover:text-ink"
                      >
                        {social.label}
                      </a>
                    ))}
                </div>
                <a href={`mailto:${profile.email}`} className="mt-4 block font-mono text-[10px] tracking-[0.08em] text-faint hover:text-ink">
                  {profile.email}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
