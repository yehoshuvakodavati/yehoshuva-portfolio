import { BookOpen, Compass, Hammer, Puzzle, Shuffle, Telescope } from 'lucide-react'
import { strengths } from '../data/strengths'
import Reveal from './ui/Reveal'

const ICONS = { Puzzle, BookOpen, Compass, Hammer, Shuffle, Telescope }

export default function Strengths() {
  return (
    <section className="relative overflow-hidden border-y border-line py-20 sm:py-24">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(70% 100% at 15% 0%, var(--glow-b), transparent 60%)' }}
        aria-hidden="true"
      />

      <div className="shell relative">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-lineStrong" aria-hidden="true" />
                <span className="eyebrow">Operating principles</span>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-display text-[clamp(1.9rem,3.6vw,3rem)] font-medium leading-[1.05] tracking-tightest text-ink">
                How I actually work.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-mute">
                No trait lists copied from a template. These are the habits that show up in the repositories — including the parts that are still being learned.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-8 max-w-sm border-l border-cyan/40 pl-4 font-serif text-lg italic leading-snug text-ink">
                “Confident output is not the same thing as correct output.”
              </p>
            </Reveal>
          </div>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
            {strengths.map((item, index) => {
              const Icon = ICONS[item.icon] ?? Puzzle
              return (
                <Reveal key={item.id} delay={index * 0.035}>
                  <article className="group h-full bg-base/70 p-6 transition-colors duration-500 hover:bg-glass">
                    <div className="flex items-center justify-between">
                      <Icon size={17} style={{ color: item.accent }} strokeWidth={1.6} />
                      <span className="font-mono text-[9px] tracking-[0.16em] text-faint">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-[15px] font-medium tracking-tight text-ink">{item.title}</h3>
                    <p className="mt-2 text-[12.5px] leading-relaxed text-mute">{item.body}</p>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
