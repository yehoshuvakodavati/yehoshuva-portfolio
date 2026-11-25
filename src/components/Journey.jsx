import { Flag, GraduationCap, Target } from 'lucide-react'
import { education, goals, journey } from '../data/journey'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'

export default function Journey() {
  return (
    <section id="journey" className="section scroll-mt-24">
      <div className="shell">
        <SectionHeading
          index="06"
          label="Journey & future goals"
          title="The path so far, and the trajectory."
          lede="Education, internships and self-directed builds — plus where this is heading. The timeline stays honest about what is complete and what is still ahead."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {education.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.06}>
              <article className="panel panel-hover h-full p-6">
                <div className="flex items-start justify-between gap-4">
                  <GraduationCap size={18} className="text-cyan" />
                  <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-faint">{item.period}</span>
                </div>
                <h3 className="mt-4 font-display text-lg font-medium leading-snug tracking-tight text-ink">{item.qualification}</h3>
                <p className="mt-1.5 text-[13px] text-mute">{item.institution}</p>
                <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.16em] text-faint">{item.location}</p>

                <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                  <span className="font-display text-xl font-light text-gradient">{item.detail}</span>
                  <span className="tag">{item.status}</span>
                </div>

                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {item.highlights.map((highlight) => (
                    <li key={highlight} className="rounded-full border border-line px-2.5 py-1 text-[10.5px] text-mute">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-16">
          <Reveal>
            <div className="flex items-center gap-3">
              <Flag size={14} className="text-violet" />
              <p className="eyebrow">Timeline</p>
            </div>
          </Reveal>

          <ol className="relative mt-6 space-y-3 border-l border-line pl-5 sm:pl-8">
            {journey.map((item, index) => (
              <li key={item.id} className="relative">
                <span
                  className="absolute -left-[26px] top-6 flex h-2.5 w-2.5 items-center justify-center rounded-full border sm:-left-[38px]"
                  style={{ borderColor: item.accent, background: 'var(--bg)' }}
                  aria-hidden="true"
                >
                  <span className="h-1 w-1 rounded-full" style={{ background: item.accent }} />
                </span>
                <Reveal delay={index * 0.04}>
                  <div className="group grid gap-3 rounded-xl border border-line bg-glass p-5 transition-colors duration-500 hover:border-lineStrong sm:grid-cols-[110px_1fr] sm:gap-6 sm:p-6">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.16em]" style={{ color: item.accent }}>
                        {item.year}
                      </p>
                      <span className="mt-2 inline-block rounded-full border border-line px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.14em] text-faint">
                        {item.tag}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-display text-base font-medium tracking-tight text-ink">{item.title}</h3>
                      <p className="mt-2 text-[13px] leading-relaxed text-mute">{item.body}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <Reveal delay={0.05} className="mt-16">
          <div className="panel p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <Target size={15} className="text-cyan" />
              <p className="eyebrow">Where this is going</p>
            </div>
            <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {goals.map((goal, index) => (
                <li key={goal} className="flex items-start gap-3">
                  <span className="mt-0.5 font-mono text-[9px] tracking-[0.12em] text-faint">{String(index + 1).padStart(2, '0')}</span>
                  <span className="text-[13.5px] leading-relaxed text-mute">{goal}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
