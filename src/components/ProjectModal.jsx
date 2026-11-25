import { useEffect, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Check, Github, TriangleAlert, X } from 'lucide-react'
import ProjectThumb from './ui/ProjectThumb'

export default function ProjectModal({ project, onClose }) {
  const reduced = useReducedMotion()
  const panelRef = useRef(null)
  const closeRef = useRef(null)
  const previouslyFocused = useRef(null)

  useEffect(() => {
    if (!project) return
    previouslyFocused.current = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const timer = window.setTimeout(() => closeRef.current?.focus(), 80)

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab' || !panelRef.current) return

      const focusable = panelRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])',
      )
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      window.clearTimeout(timer)
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      if (previouslyFocused.current instanceof HTMLElement) previouslyFocused.current.focus()
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[130] flex items-start justify-center overflow-y-auto bg-base/80 p-3 backdrop-blur-xl sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose()
          }}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 26, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.99 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative my-4 w-full max-w-4xl overflow-hidden rounded-2xl border border-lineStrong bg-elev shadow-[0_60px_120px_-60px_rgba(0,0,0,0.9)] sm:my-8"
          >
            <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-line bg-elev/90 px-5 py-3 backdrop-blur-xl sm:px-7">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-cyan">{project.index}</span>
                <span className="h-3 w-px bg-lineStrong" aria-hidden="true" />
                <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-faint">{project.category}</span>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close case study"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-glass text-mute transition-colors hover:text-ink"
              >
                <X size={15} />
              </button>
            </div>

            <div className="relative aspect-[16/8] w-full overflow-hidden border-b border-line sm:aspect-[16/6.5]">
              {project.thumbnail ? (
                <img src={project.thumbnail} alt={`${project.title} preview`} className="h-full w-full object-cover" />
              ) : (
                <ProjectThumb project={project} />
              )}
            </div>

            <div className="px-5 py-8 sm:px-9 sm:py-10">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.16em] text-ink"
                  style={{ borderColor: `${project.accent}44`, background: `${project.accent}12` }}
                >
                  <span className="h-1 w-1 rounded-full" style={{ background: project.accent }} />
                  {project.status}
                </span>
                <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-faint">{project.year}</span>
              </div>

              <h2 id="project-modal-title" className="mt-5 font-display text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl">
                {project.title}
              </h2>
              <p className="mt-2 text-sm text-faint">{project.subtitle}</p>
              <p className="mt-5 max-w-2xl text-[14.5px] leading-[1.8] text-mute">{project.description}</p>

              <div className="mt-8 flex flex-wrap gap-2">
                {project.links.github ? (
                  <a href={project.links.github} target="_blank" rel="noreferrer noopener" className="btn-primary text-sm">
                    <Github size={15} />
                    View repository
                    <ArrowUpRight size={14} />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-[13px] text-faint">
                    <Github size={14} />
                    Repository not public
                  </span>
                )}
                {project.links.live ? (
                  <a href={project.links.live} target="_blank" rel="noreferrer noopener" className="btn-ghost text-sm">
                    Live demo
                    <ArrowUpRight size={14} />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-[13px] text-faint">
                    Live demo not published
                  </span>
                )}
              </div>

              <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
                <div>
                  <Section label="The problem">
                    <p className="text-[14px] leading-[1.8] text-mute">{project.problem}</p>
                  </Section>

                  <Section label="Architecture">
                    <ol className="relative space-y-3 pl-5">
                      <span className="absolute bottom-2 left-[5px] top-2 w-px bg-lineStrong" aria-hidden="true" />
                      {project.architecture.map((layer, index) => (
                        <li key={layer.label} className="relative">
                          <span
                            className="absolute -left-5 top-1.5 h-2 w-2 rounded-full border"
                            style={{ borderColor: project.accent, background: 'var(--elev)' }}
                            aria-hidden="true"
                          />
                          <div className="flex flex-wrap items-baseline gap-2">
                            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-cyan">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            <span className="text-[13px] font-medium text-ink">{layer.label}</span>
                          </div>
                          <p className="mt-1 text-[12px] leading-relaxed text-mute">{layer.detail}</p>
                        </li>
                      ))}
                    </ol>
                  </Section>

                  <Section label="Main features">
                    <ul className="space-y-2.5">
                      {project.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-mute">
                          <Check size={13} className="mt-1 shrink-0 text-cyan" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </Section>

                  {project.challenges.length > 0 && (
                    <Section label="Challenges & solutions">
                      <div className="space-y-3">
                        {project.challenges.map((item) => (
                          <div key={item.challenge} className="rounded-xl border border-line bg-glass p-4">
                            <p className="text-[12.5px] font-medium text-ink">{item.challenge}</p>
                            <p className="mt-1.5 text-[12px] leading-relaxed text-mute">
                              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-cyan">Fix · </span>
                              {item.solution}
                            </p>
                          </div>
                        ))}
                      </div>
                    </Section>
                  )}
                </div>

                <aside className="space-y-8">
                  <div>
                    <p className="eyebrow">Stack</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => (
                        <span key={tech} className="tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="eyebrow">My contribution</p>
                    <ul className="mt-3 space-y-2.5">
                      {project.contributions.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-[12.5px] leading-relaxed text-mute">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ background: project.accent }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="eyebrow">Screenshots</p>
                    {project.media.length > 0 ? (
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        {project.media.map((src) => (
                          <img key={src} src={src} alt={`${project.title} screenshot`} className="rounded-lg border border-line" loading="lazy" />
                        ))}
                      </div>
                    ) : (
                      <p className="mt-3 rounded-lg border border-dashed border-line p-3 text-[11.5px] leading-relaxed text-faint">
                        Screenshots and demo recordings will be added here once the interface is ready to publish.
                      </p>
                    )}
                  </div>

                  {project.note && (
                    <div className="flex items-start gap-2.5 rounded-lg border border-line bg-glass p-3">
                      <TriangleAlert size={13} className="mt-0.5 shrink-0 text-violet" />
                      <p className="text-[11px] leading-relaxed text-faint">{project.note}</p>
                    </div>
                  )}
                </aside>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Section({ label, children }) {
  return (
    <div className="mt-9 first:mt-0">
      <p className="eyebrow">{label}</p>
      <div className="mt-3.5">{children}</div>
    </div>
  )
}
