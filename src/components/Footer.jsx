import { ArrowUp } from 'lucide-react'
import { profile, socials } from '../data/profile'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="shell pb-10 pt-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="eyebrow">End of transmission</p>
            <p className="mt-5 max-w-md font-display text-2xl font-light leading-snug tracking-tight text-ink sm:text-3xl">
              The future is built by those who <span className="font-serif italic text-gradient">create it.</span>
            </p>
            <a href={`mailto:${profile.email}`} className="link-underline mt-6 inline-block font-mono text-xs tracking-[0.06em] text-mute hover:text-ink">
              {profile.email}
            </a>
          </div>

          <nav aria-label="Footer">
            <p className="eyebrow">Navigate</p>
            <ul className="mt-4 space-y-2.5">
              {[
                ['Work', '#work'],
                ['Universe', '#universe'],
                ['Experience', '#experience'],
                ['Résumé', '#resume'],
                ['Services', '#services'],
                ['Contact', '#contact'],
              ].map(([label, href]) => (
                <li key={href}>
                  <a href={href} className="text-sm text-mute transition-colors hover:text-ink">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow">Elsewhere</p>
            <ul className="mt-4 space-y-2.5">
              {socials.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.url}
                    target={social.url.startsWith('http') ? '_blank' : undefined}
                    rel={social.url.startsWith('http') ? 'noreferrer noopener' : undefined}
                    className="group inline-flex items-center gap-1.5 text-sm text-mute transition-colors hover:text-ink"
                  >
                    {social.label}
                    <span className="font-mono text-[9px] text-faint transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
            © {year} {profile.name} · Built from scratch
          </p>
          <div className="flex items-center gap-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">{profile.location}</p>
            <a
              href="#home"
              aria-label="Back to top"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-glass text-mute transition-colors hover:border-lineStrong hover:text-ink"
            >
              <ArrowUp size={15} />
            </a>
          </div>
        </div>
      </div>

      <div className="pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <p className="-mb-4 whitespace-nowrap text-center font-display text-[clamp(3rem,12vw,11rem)] font-semibold leading-none tracking-tightest text-outline opacity-30">
          YEHOSHUVA
        </p>
      </div>
    </footer>
  )
}
