import { useState } from 'react'
import { profile } from '../../data/profile'

/**
 * Renders the real portrait when /assets/portrait.jpg exists.
 * Until then it presents a deliberately designed monogram placeholder — never a stock face.
 */
export default function Portrait({ className = '', compact = false }) {
  const [failed, setFailed] = useState(false)
  const showImage = profile.portrait && !failed

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-line bg-elev ${className}`}>
      <div className="absolute inset-0 grid-plane opacity-60" aria-hidden="true" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 20% 0%, rgba(79,124,255,0.22), transparent 60%), radial-gradient(90% 80% at 90% 100%, rgba(167,139,250,0.20), transparent 65%)',
        }}
        aria-hidden="true"
      />

      {showImage ? (
        <img
          src={profile.portrait}
          alt={profile.portraitAlt}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="relative z-10 h-full w-full object-cover"
        />
      ) : (
        <div className="relative z-10 flex h-full min-h-[260px] w-full flex-col items-center justify-center gap-4 p-6">
          <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-lineStrong">
            <span className="absolute inset-0 animate-pulse-ring rounded-full border border-cyan/30" aria-hidden="true" />
            <span className="font-display text-3xl font-medium tracking-tight text-gradient">{profile.monogram}</span>
          </div>
          <div className="text-center">
            <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-faint">Portrait reserved</p>
            {!compact && (
              <p className="mt-2 max-w-[190px] text-xs leading-relaxed text-mute">
                Awaiting the official photograph. The monogram stands in until it arrives.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Holographic scan + frame details */}
      <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-16 animate-scan-line bg-gradient-to-b from-transparent via-cyan/[0.07] to-transparent" />
      </div>
      <div className="pointer-events-none absolute left-3 top-3 z-20 h-4 w-4 border-l border-t border-cyan/50" />
      <div className="pointer-events-none absolute bottom-3 right-3 z-20 h-4 w-4 border-b border-r border-violet/50" />
      <div className="pointer-events-none absolute bottom-3 left-3 z-20 font-mono text-[8px] uppercase tracking-[0.24em] text-faint">
        ID · {profile.initials} · VISAKHAPATNAM
      </div>
    </div>
  )
}
