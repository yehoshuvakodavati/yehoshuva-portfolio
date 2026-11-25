import { ArrowUpRight, Building2, Clock3 } from 'lucide-react'
import { experience } from '../data/experience'
import { profile } from '../data/profile'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'

export default function Experience() {
  return (
    <section id="experience" className="section scroll-mt-24">
      <div className="shell">
        <SectionHeading
          index="04"
          label="Engineering experience"
          title="Where theory met a real codebase."
          lede="Team environments change how you write software — review cycles, shared conventions, code someone else will maintain. These are the rooms I have worked in."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <div className="panel p-6">
                <p className="eyebrow">Operating context</p>
                <div className="mt-4 space-y-4">
                  <div className="flex items-start gap-3">
                    <Building2 size={15} className="mt-0.5 shrink-0 text-cyan" />
                    <div>
                      <p className="text-sm text-ink">Product-focused teams</p>
                      <p className="mt-1 text-[12px] leading-relaxed text-mute">
                        Full-stack delivery in an internship team, embedded IoT prototyping in a training environment.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock3 size={15} className="mt-0.5 shrink-0 text-violet" />
                    <div>
                      <p className="text-sm text-ink">Currently</p>
                      <p className="mt-1 text-[12px] leading-relaxed text-mute">
                        3rd-year B.Tech CSE at ANITS, building AI and backend systems alongside coursework.
                      </p>
                    </div>
                  </div>
                </div>
                <a
                  href={profile.resumeUrl}
                  download
                  className="mt-6 inline-flex items-center gap-2 text-[13px] font-medium text-ink"
                >
                  Full career profile
                  <ArrowUpRight size={14} className="text-cyan" />
                </a>
              </div>
            </Reveal>
          </div>

          <ol className="relative space-y-4 border-l border-line pl-5 sm:pl-7">
            {experience.map((role, index) => {
              const isPlaceholder = role.type === 'Placeholder'
              return (
                <li key={role.id} className="relative">
                  <span
                    className="absolute -left-[26px] top-7 h-2 w-2 rounded-full border sm:-left-[34px]"
                    style={{
                      borderColor: isPlaceholder ? 'var(--line-strong)' : 'var(--cyan)',
                      background: 'var(--bg)',
                      boxShadow: isPlaceholder ? 'none' : '0 0 12px rgba(34,211,238,0.6)',
                    }}
                    aria-hidden="true"
                  />
                  <Reveal delay={index * 0.05}>
                    <article
                      className={`panel p-5 transition-colors sm:p-7 ${isPlaceholder ? 'border-dashed' : 'panel-hover'}`}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="font-display text-lg font-medium tracking-tight text-ink">{role.organization}</h3>
                          <p className="mt-1 text-[13px] text-cyan">{role.role}</p>
                        </div>
                        <div className="flex flex-col items-start gap-2 sm:items-end">
                          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-faint">{role.period}</span>
                          <span className="tag">{role.type}</span>
                        </div>
                      </div>

                      <p className="mt-4 text-[13.5px] leading-relaxed text-mute">{role.summary}</p>

                      {role.responsibilities.length > 0 && (
                        <ul className="mt-4 space-y-2">
                          {role.responsibilities.map((item) => (
                            <li key={item} className="flex items-start gap-2.5 text-[12.5px] leading-relaxed text-mute">
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan/70" aria-hidden="true" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}

                      {role.technologies.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {role.technologies.map((tech) => (
                            <span key={tech} className="tag">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      {!role.datesVerified && !isPlaceholder && (
                        <p className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.16em] text-faint">
                          Dates pending verification
                        </p>
                      )}
                    </article>
                  </Reveal>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
