import { ArrowUpRight, BrainCircuit, Database, Layers, PlugZap, Server, Workflow } from 'lucide-react'
import { services, servicesIntro } from '../data/services'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'

const ICONS = { Server, Layers, BrainCircuit, PlugZap, Database, Workflow }

export default function Services() {
  return (
    <section id="services" className="section scroll-mt-24">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="08"
            label="Freelance services"
            title="Engineering support, without the theatre."
            lede={servicesIntro}
          />
          <Reveal delay={0.08} className="shrink-0">
            <a href="#contact" className="btn-ghost text-sm">
              Start a project inquiry
              <ArrowUpRight size={15} className="text-cyan" />
            </a>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = ICONS[service.icon] ?? Server
            return (
              <Reveal key={service.id} delay={index * 0.04}>
                <article className="panel panel-hover group h-full p-6">
                  <div className="flex items-start justify-between">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-lg border"
                      style={{ borderColor: `${service.accent}3d`, background: `${service.accent}12` }}
                    >
                      <Icon size={17} style={{ color: service.accent }} />
                    </span>
                    <span className="font-mono text-[9px] tracking-[0.18em] text-faint">{String(index + 1).padStart(2, '0')}</span>
                  </div>

                  <h3 className="mt-5 font-display text-base font-medium tracking-tight text-ink">{service.title}</h3>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-mute">{service.body}</p>

                  <ul className="mt-4 space-y-1.5 border-t border-line pt-4">
                    {service.deliverables.map((item) => (
                      <li key={item} className="flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.1em] text-faint">
                        <span className="h-1 w-1 rounded-full" style={{ background: service.accent }} aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={0.06} className="mt-5">
          <div className="relative overflow-hidden rounded-2xl border border-line bg-glass p-6 sm:p-8">
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: 'radial-gradient(80% 120% at 85% 0%, var(--glow-a), transparent 65%)' }}
              aria-hidden="true"
            />
            <div className="relative flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
              <div>
                <p className="font-display text-lg font-light tracking-tight text-ink">Have a system that needs to exist?</p>
                <p className="mt-1.5 max-w-xl text-[13px] leading-relaxed text-mute">
                  Send the problem, the constraints and the timeline. You will get an honest answer about scope — including if I am not the right fit.
                </p>
              </div>
              <a href="#contact" className="btn-primary shrink-0 text-sm">
                Discuss a project
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
