import Reveal from './Reveal'

export default function SectionHeading({ index, label, title, lede, align = 'left', action = null }) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <Reveal>
        <div className={`flex items-center gap-4 ${align === 'center' ? 'justify-center' : ''}`}>
          <span className="font-mono text-[10px] tracking-[0.3em] text-cyan">{index}</span>
          <span className="h-px w-10 bg-lineStrong" aria-hidden="true" />
          <span className="eyebrow">{label}</span>
        </div>
      </Reveal>

      <Reveal delay={0.06}>
        <h2 className="mt-6 text-balance text-[clamp(2rem,4.4vw,3.6rem)] font-medium leading-[1.02] tracking-tightest text-ink">
          {title}
        </h2>
      </Reveal>

      {lede ? (
        <Reveal delay={0.12}>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-mute sm:text-base">{lede}</p>
        </Reveal>
      ) : null}

      {action ? (
        <Reveal delay={0.16} className="mt-8">
          {action}
        </Reveal>
      ) : null}
    </div>
  )
}
