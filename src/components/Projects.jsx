import { useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { ArrowUpRight, Github, ScanLine } from 'lucide-react'
import { projects, projectCTA } from '../data/projects'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import ProjectThumb from './ui/ProjectThumb'
import ProjectModal from './ProjectModal'

function StatusBadge({ status, accent }) {
  const isPlaceholder = status === 'Internship build' || status === 'Academic project'
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.16em]"
      style={{
        borderColor: `${accent}44`,
        background: `${accent}12`,
        color: isPlaceholder ? 'var(--mute)' : 'var(--ink)',
      }}
    >
      <span className="h-1 w-1 rounded-full" style={{ background: accent }} />
      {status}
    </span>
  )
}

function ProjectCard({ project, featured = false, onOpen }) {
  const reduced = useReducedMotion()
  const rotateX = useSpring(0, { stiffness: 140, damping: 18 })
  const rotateY = useSpring(0, { stiffness: 140, damping: 18 })
  const glareX = useMotionValue(50)
  const glareY = useMotionValue(50)

  const handleMove = (event) => {
    if (reduced) return
    const rect = event.currentTarget.getBoundingClientRect()
    const percentX = (event.clientX - rect.left) / rect.width
    const percentY = (event.clientY - rect.top) / rect.height
    rotateY.set((percentX - 0.5) * 7)
    rotateX.set(-(percentY - 0.5) * 7)
    glareX.set(percentX * 100)
    glareY.set(percentY * 100)
  }

  const reset = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(project)}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      aria-label={`Open case study: ${project.title}`}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className={`group relative block w-full overflow-hidden rounded-2xl border border-line bg-glass text-left transition-colors duration-500 hover:border-lineStrong ${
        featured ? 'lg:col-span-2' : ''
      }`}
    >
      <div className={`grid ${featured ? 'lg:grid-cols-2' : ''}`}>
        <div className={`relative overflow-hidden ${featured ? 'aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[380px]' : 'aspect-[16/10]'}`}>
          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt={`${project.title} interface preview`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-[1.2s] ease-cinematic group-hover:scale-[1.04]"
            />
          ) : (
            <div className="h-full w-full transition-transform duration-[1.2s] ease-cinematic group-hover:scale-[1.04]">
              <ProjectThumb project={project} />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-base/70 via-transparent to-transparent opacity-80" />
          <div className="absolute left-4 top-4 flex items-center gap-2">
            <StatusBadge status={project.status} accent={project.accent} />
          </div>
          <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-lineStrong bg-base/50 text-mute backdrop-blur-md transition-colors duration-300 group-hover:text-ink">
            <ScanLine size={13} />
          </div>
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `radial-gradient(320px circle at var(--glare-x) var(--glare-y), ${project.accent}22, transparent 65%)`,
              '--glare-x': glareX,
              '--glare-y': glareY,
            }}
          />
        </div>

        <div className={`flex flex-col p-6 sm:p-7 ${featured ? 'lg:p-9' : ''}`}>
          <div className="flex items-baseline justify-between gap-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-cyan">{project.index}</span>
            <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-faint">{project.category}</span>
          </div>

          <h3 className={`mt-4 font-display font-medium leading-tight tracking-tight text-ink ${featured ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>
            {project.title}
          </h3>
          <p className="mt-1 text-[13px] text-faint">{project.subtitle}</p>

          <p className={`mt-4 text-[13.5px] leading-relaxed text-mute ${featured ? 'lg:max-w-lg' : ''}`}>
            {project.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 5).map((tech) => (
              <span key={tech} className="tag">
                {tech}
              </span>
            ))}
            {project.stack.length > 5 && <span className="tag">+{project.stack.length - 5}</span>}
          </div>

          <div className="mt-auto flex items-center justify-between gap-4 pt-6">
            <span className="inline-flex items-center gap-2 text-[12px] font-medium text-ink">
              Inspect case study
              <ArrowUpRight size={14} className="text-cyan transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
            {project.links.github ? (
              <span className="inline-flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.16em] text-faint">
                <Github size={11} /> Repository
              </span>
            ) : (
              <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-faint">Repository pending</span>
            )}
          </div>
        </div>
      </div>
    </motion.button>
  )
}

export default function Projects() {
  const [openProject, setOpenProject] = useState(null)
  const [featured, ...rest] = projects

  return (
    <section id="work" className="section scroll-mt-24">
      <div className="shell">
        <SectionHeading
          index="03"
          label="Project galaxy"
          title="Systems built to answer real questions."
          lede="Each project began as a constraint I could not solve on paper — noisy market data, a model that invents places, inventory that must not oversell. Open any card for the full architecture and honest status."
        />

        <div className="mt-14 grid gap-4 sm:gap-5 lg:grid-cols-2">
          <Reveal className="lg:col-span-2">
            <ProjectCard project={featured} featured onOpen={setOpenProject} />
          </Reveal>

          {rest.map((project, index) => (
            <Reveal key={project.id} delay={0.04 * index}>
              <ProjectCard project={project} onOpen={setOpenProject} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.05} className="mt-10">
          <div className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-line bg-glass p-6 sm:flex-row sm:items-center sm:p-7">
            <div>
              <p className="font-display text-lg font-light tracking-tight text-ink">{projectCTA.title}</p>
              <p className="mt-1.5 max-w-xl text-[13px] leading-relaxed text-mute">{projectCTA.body}</p>
            </div>
            <a
              href={projectCTA.href}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-ghost shrink-0 text-sm"
            >
              <Github size={15} className="text-cyan" />
              github.com/yehoshuvakodavati
            </a>
          </div>
        </Reveal>
      </div>

      <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
    </section>
  )
}
