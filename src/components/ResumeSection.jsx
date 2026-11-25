import { Download, FileText, Mail, MapPin, Phone } from 'lucide-react'
import { profile } from '../data/profile'
import { experience } from '../data/experience'
import { projects } from '../data/projects'
import { certifications } from '../data/certifications'
import { skillGroups } from '../data/skills'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'

const summary =
  'Third-year Computer Science engineering student working across backend engineering and applied AI. Builds Spring Boot and Node services, retrieval-augmented LLM applications, and full-stack interfaces. Currently seeking software engineering, backend or AI/ML opportunities.'

export default function ResumeSection() {
  return (
    <section id="resume" className="section scroll-mt-24">
      <div className="shell">
        <SectionHeading
          index="07"
          label="Résumé / career profile"
          title="The concise version."
          lede="A recruiter-ready snapshot of the same work presented across this site. The PDF is a replaceable asset — drop a new file into the résumé folder and this button serves it."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
          <Reveal>
            <article className="panel overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-6 py-4">
                <div className="flex items-center gap-2.5">
                  <FileText size={14} className="text-cyan" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-faint">Career profile</span>
                </div>
                <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-faint">PDF · A4</span>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl font-medium tracking-tight text-ink">{profile.name}</h3>
                    <p className="mt-1 text-[13px] text-cyan">Software Engineer · AI/ML Engineer · Backend Developer</p>
                  </div>
                  <div className="space-y-1.5 text-right">
                    <p className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-faint">
                      <Mail size={10} /> {profile.email}
                    </p>
                    <p className="flex items-center justify-end gap-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-faint">
                      <MapPin size={10} /> Visakhapatnam, IN
                    </p>
                    <p className="flex items-center justify-end gap-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-faint">
                      <Phone size={10} /> On request
                    </p>
                  </div>
                </div>

                <div className="mt-6 border-t border-line pt-5">
                  <p className="eyebrow">Profile</p>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-mute">{summary}</p>
                </div>

                <div className="mt-6 grid gap-6 border-t border-line pt-5 sm:grid-cols-2">
                  <div>
                    <p className="eyebrow">Education</p>
                    <div className="mt-2.5 space-y-3">
                      <div>
                        <p className="text-[12.5px] font-medium text-ink">B.Tech, Computer Science & Engineering</p>
                        <p className="mt-0.5 text-[11.5px] text-mute">ANITS, Visakhapatnam · 3rd year</p>
                        <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-faint">CGPA 8.0 · Expected 2028</p>
                      </div>
                      <div>
                        <p className="text-[12.5px] font-medium text-ink">Diploma in Computer Engineering</p>
                        <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-faint">88%</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="eyebrow">Core skills</p>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {skillGroups
                        .flatMap((group) => group.skills.filter((skill) => skill.tier === 3).map((skill) => skill.name))
                        .slice(0, 12)
                        .map((skill) => (
                          <span key={skill} className="tag">
                            {skill}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid gap-3 border-t border-line pt-5 sm:grid-cols-3">
                  <Stat label="Experience" value={String(experience.filter((role) => role.type !== 'Placeholder').length).padStart(2, '0')} />
                  <Stat label="Projects" value={String(projects.length).padStart(2, '0')} />
                  <Stat label="Credentials" value={String(certifications.length).padStart(2, '0')} />
                </div>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="panel flex h-full flex-col justify-between p-6">
              <div>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-lineStrong bg-glass">
                  <Download size={18} className="text-cyan" />
                </span>
                <h3 className="mt-5 font-display text-xl font-medium tracking-tight text-ink">Download the resume</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-mute">
                  The complete PDF includes education, experience, projects, technical skills and contact details.
                </p>

                <div className="mt-5 space-y-2.5 rounded-lg border border-line bg-glass p-3.5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-faint">File</span>
                    <span className="truncate font-mono text-[10px] text-mute">Kodavati-Yehoshuva-Resume.pdf</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-faint">Location</span>
                    <span className="font-mono text-[9px] text-mute">/public/assets/resume/</span>
                  </div>
                </div>
              </div>

              <div className="mt-7">
                <a href={profile.resumeUrl} download className="btn-primary w-full">
                  <Download size={15} />
                  Download resume PDF
                </a>
                <p className="mt-3 text-center text-[10px] leading-relaxed text-faint">
                  Drop a replacement PDF at the path above to update this download instantly.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Stat({ label, value }) {
  return (
    <div className="rounded-lg border border-line bg-glass px-3 py-2.5">
      <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-faint">{label}</p>
      <p className="mt-1 font-display text-lg font-light text-ink">{value}</p>
    </div>
  )
}
