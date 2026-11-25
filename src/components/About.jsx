import { ArrowUpRight, GraduationCap, MapPin } from 'lucide-react'
import { about } from '../data/about'
import { profile } from '../data/profile'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import Portrait from './ui/Portrait'

export default function About() {
  return (
    <section id="about" className="section scroll-mt-24">
      <div className="shell">
        <SectionHeading index="01" label="Origin story" title={about.heading} lede={about.intro} />

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="relative">
                <Portrait className="aspect-[4/5] w-full" />
                <div className="absolute -bottom-5 -right-3 hidden rounded-xl border border-lineStrong bg-elev/90 px-4 py-3 backdrop-blur-xl sm:block">
                  <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-faint">Currently</p>
                  <p className="mt-1 text-sm text-ink">3rd year · CSE</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="mt-10 grid grid-cols-2 gap-3">
              {about.facts.map((fact) => (
                <div key={fact.label} className="rounded-xl border border-line bg-glass p-4">
                  <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-faint">{fact.label}</p>
                  <p className="mt-2 font-display text-2xl font-light tracking-tight text-ink">{fact.value}</p>
                  <p className="mt-1 text-[11px] leading-snug text-mute">{fact.note}</p>
                </div>
              ))}
            </Reveal>

            <Reveal delay={0.16} className="mt-4 rounded-xl border border-line bg-glass p-5">
              <div className="flex items-start gap-3">
                <GraduationCap size={16} className="mt-0.5 shrink-0 text-cyan" />
                <div>
                  <p className="text-sm text-ink">{profile.education.degree}</p>
                  <p className="mt-1 text-xs leading-relaxed text-mute">{profile.education.institution}</p>
                  <p className="mt-2 inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-faint">
                    <MapPin size={10} /> {profile.education.location}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="space-y-5">
              {about.paragraphs.map((paragraph, index) => (
                <Reveal key={index} delay={index * 0.05}>
                  <p className="text-[15px] leading-[1.85] text-mute sm:text-base">{paragraph}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1} className="mt-10">
              <p className="eyebrow">Current technical focus</p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {about.focus.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 rounded-lg border border-line glass-fade px-3.5 py-3 text-[13px] leading-snug text-mute">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.14} className="mt-8">
              <figure className="relative overflow-hidden rounded-2xl border border-line bg-glass p-6 sm:p-8">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/50 to-transparent" aria-hidden="true" />
                <p className="eyebrow">{about.philosophy.title}</p>
                <blockquote className="mt-4 font-display text-lg font-light leading-relaxed tracking-tight text-ink sm:text-xl">
                  “{about.philosophy.body}”
                </blockquote>
              </figure>
            </Reveal>

            <Reveal delay={0.18} className="mt-8">
              <div className="rounded-2xl border border-line bg-glass p-6">
                <p className="eyebrow">What drives me</p>
                <p className="mt-3 text-[14px] leading-relaxed text-mute">{about.motivation}</p>
              </div>
            </Reveal>

            <Reveal delay={0.22} className="mt-8">
              <div className="flex flex-wrap items-center gap-3">
                <a href="#journey" className="group inline-flex items-center gap-2 text-sm font-medium text-ink">
                  See the full journey
                  <ArrowUpRight size={15} className="text-cyan transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <span className="text-faint">·</span>
                <a href="#contact" className="text-sm text-mute transition-colors hover:text-ink">
                  Work with me
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
