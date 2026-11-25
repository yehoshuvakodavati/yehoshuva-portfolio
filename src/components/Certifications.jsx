import { Award, BadgeCheck, ExternalLink, FileText, ShieldQuestion } from 'lucide-react'
import { certificationNote, certifications } from '../data/certifications'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'

export default function Certifications() {
  return (
    <section id="certifications" className="section scroll-mt-24">
      <div className="shell">
        <SectionHeading
          index="05"
          label="Certifications & achievements"
          title="Credentials, kept honest."
          lede="A gallery of verified badges and certificates. Anything still being confirmed is labelled as pending rather than presented as an achievement."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {certifications.map((cert, index) => (
            <Reveal key={cert.id} delay={index * 0.06}>
              <article className={`panel panel-hover h-full ${cert.verified ? '' : 'border-dashed'}`}>
                <div
                  className="relative flex h-40 items-center justify-center overflow-hidden border-b border-line"
                  style={{
                    background: `radial-gradient(100% 130% at 30% 0%, ${cert.accent}26, transparent 62%), radial-gradient(90% 100% at 90% 100%, ${cert.accent}14, transparent 70%)`,
                  }}
                >
                  <div className="absolute inset-0 grid-plane opacity-40" aria-hidden="true" />
                  {cert.image ? (
                    <img src={cert.image} alt={`${cert.title} certificate`} className="relative h-full w-full object-contain p-4" loading="lazy" />
                  ) : (
                    <div className="relative flex flex-col items-center gap-3">
                      <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-lineStrong bg-elev/60 backdrop-blur-md">
                        <Award size={26} style={{ color: cert.accent }} strokeWidth={1.4} />
                        <span className="absolute -inset-2 rounded-full border border-dashed border-line" aria-hidden="true" />
                      </div>
                      {cert.score && <span className="font-display text-lg font-light tracking-tight text-ink">{cert.score}</span>}
                    </div>
                  )}
                  <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-line bg-elev/70 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.14em] text-faint backdrop-blur-md">
                    {cert.verified ? <BadgeCheck size={11} className="text-cyan" /> : <ShieldQuestion size={11} className="text-violet" />}
                    {cert.verified ? 'Verified' : 'Pending verification'}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="font-display text-lg font-medium leading-snug tracking-tight text-ink">{cert.title}</h3>
                  <p className="mt-1 text-[13px] text-cyan">{cert.issuer}</p>
                  <p className="mt-3 text-[13px] leading-relaxed text-mute">{cert.summary}</p>

                  <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-line pt-4">
                    <div>
                      <dt className="font-mono text-[8px] uppercase tracking-[0.16em] text-faint">Issued</dt>
                      <dd className="mt-1 text-[12px] text-ink">{cert.date}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[8px] uppercase tracking-[0.16em] text-faint">Credential ID</dt>
                      <dd className="mt-1 font-mono text-[11px] text-mute">{cert.credentialId ?? 'Not provided'}</dd>
                    </div>
                  </dl>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    {cert.verificationUrl ? (
                      <a
                        href={cert.verificationUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1.5 text-[12px] font-medium text-ink"
                      >
                        Verify credential
                        <ExternalLink size={12} className="text-cyan" />
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-[12px] text-faint">
                        <ExternalLink size={12} />
                        Verification link pending
                      </span>
                    )}
                    {cert.image ? (
                      <span className="inline-flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-faint">
                        <FileText size={11} /> Certificate attached
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-4 text-[10.5px] leading-relaxed text-faint">{cert.note}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-8">
          <p className="rounded-xl border border-line bg-glass px-4 py-3 text-[11.5px] leading-relaxed text-faint">{certificationNote}</p>
        </Reveal>
      </div>
    </section>
  )
}
