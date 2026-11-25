import { useState } from 'react'
import { ArrowUpRight, Check, ChevronDown, Copy, Github, Linkedin, Mail, MapPin, Send } from 'lucide-react'
import { profile, socials } from '../data/profile'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'

const INQUIRY_TYPES = ['Freelance project', 'Job or internship', 'Collaboration', 'Something else']
const SOCIAL_ICONS = { github: Github, linkedin: Linkedin, leetcode: ArrowUpRight, email: Mail }

const initialForm = { name: '', email: '', type: INQUIRY_TYPES[0], message: '' }

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle')
  const [copied, setCopied] = useState(false)

  const update = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }))

  const handleSubmit = (event) => {
    event.preventDefault()
    const subject = `${form.type} — ${form.name || 'Portfolio inquiry'}`
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Inquiry: ${form.type}`,
      '',
      form.message,
      '',
      '— Sent from yehoshuvaportfolio.netlify.app',
    ].join('\n')

    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setStatus('sent')
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section id="contact" className="section scroll-mt-24">
      <div className="shell">
        <SectionHeading
          index="09"
          label="Let's build something"
          title="An open channel, for work worth doing."
          lede="Hiring for a backend or AI/ML role, planning a product, or looking for an engineer who can own a system end to end — this is the shortest path to a real conversation."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-4">
            <Reveal>
              <div className="panel p-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-faint">Direct channel</span>
                  <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.16em] text-cyan">
                    <span className="h-1 w-1 animate-pulse rounded-full bg-cyan" />
                    Available
                  </span>
                </div>

                <p className="mt-4 break-all font-display text-lg font-light tracking-tight text-ink sm:text-xl">{profile.email}</p>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <a href={`mailto:${profile.email}`} className="btn-primary px-4 py-2 text-[12.5px]">
                    <Mail size={13} />
                    Write an email
                  </a>
                  <button type="button" onClick={copyEmail} className="btn-ghost px-4 py-2 text-[12.5px]" aria-live="polite">
                    {copied ? <Check size={13} className="text-cyan" /> : <Copy size={13} />}
                    {copied ? 'Copied' : 'Copy address'}
                  </button>
                </div>

                <div className="mt-5 space-y-2 border-t border-line pt-4">
                  <p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-faint">
                    <MapPin size={11} /> {profile.location} · {profile.timezone}
                  </p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-faint">
                    Responds within 1–2 business days
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
                {socials
                  .filter((social) => social.id !== 'email')
                  .map((social) => {
                    const Icon = SOCIAL_ICONS[social.id] ?? ArrowUpRight
                    return (
                      <a
                        key={social.id}
                        href={social.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="group flex items-center gap-3 bg-base/70 px-4 py-4 transition-colors duration-300 hover:bg-glass"
                      >
                        <Icon size={15} className="text-mute transition-colors group-hover:text-cyan" />
                        <div className="min-w-0">
                          <p className="text-[12.5px] font-medium text-ink">{social.label}</p>
                          <p className="truncate font-mono text-[8.5px] text-faint">{social.handle}</p>
                        </div>
                        <ArrowUpRight size={13} className="ml-auto shrink-0 text-faint transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    )
                  })}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-line bg-glass p-5">
                <p className="eyebrow">Good fit</p>
                <ul className="mt-3 space-y-2">
                  {['Backend services and API design', 'AI/ML features grounded in real data', 'Full-stack delivery with React', 'Automation of repetitive engineering work'].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[12px] leading-relaxed text-mute">
                      <Check size={12} className="mt-0.5 shrink-0 text-cyan" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.08}>
            <form onSubmit={handleSubmit} className="panel p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-medium tracking-tight text-ink">Send a message</h3>
                <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-faint">Opens your mail app</span>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Field label="Your name" htmlFor="contact-name">
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={update('name')}
                    placeholder="Ada Lovelace"
                    className="w-full rounded-lg border border-line bg-base/60 px-3.5 py-2.5 text-[13px] text-ink placeholder:text-faint/60 transition-colors focus:border-cyan/50 focus:outline-none"
                  />
                </Field>

                <Field label="Email" htmlFor="contact-email">
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={update('email')}
                    placeholder="you@company.com"
                    className="w-full rounded-lg border border-line bg-base/60 px-3.5 py-2.5 text-[13px] text-ink placeholder:text-faint/60 transition-colors focus:border-cyan/50 focus:outline-none"
                  />
                </Field>
              </div>

              <div className="mt-4">
                <Field label="Inquiry type" htmlFor="contact-type">
                  <div className="relative">
                    <select
                      id="contact-type"
                      name="type"
                      value={form.type}
                      onChange={update('type')}
                      className="w-full appearance-none rounded-lg border border-line bg-base/60 px-3.5 py-2.5 pr-9 text-[13px] text-ink transition-colors focus:border-cyan/50 focus:outline-none"
                    >
                      {INQUIRY_TYPES.map((type) => (
                        <option key={type} value={type} className="bg-elev text-ink">
                          {type}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-faint" />
                  </div>
                </Field>
              </div>

              <div className="mt-4">
                <Field label="The brief" htmlFor="contact-message">
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={update('message')}
                    placeholder="What are you building, what is the constraint, and what does success look like?"
                    className="w-full resize-y rounded-lg border border-line bg-base/60 px-3.5 py-2.5 text-[13px] leading-relaxed text-ink placeholder:text-faint/60 transition-colors focus:border-cyan/50 focus:outline-none"
                  />
                </Field>
              </div>

              <button type="submit" className="btn-primary mt-5 w-full">
                <Send size={14} />
                Send message
              </button>

              <p aria-live="polite" className="mt-3 min-h-[1rem] text-center text-[10.5px] leading-relaxed text-faint">
                {status === 'sent'
                  ? 'Your email app should have opened with the message ready to send.'
                  : 'This form composes an email in your own mail client — no data is stored on this site.'}
              </p>
            </form>
          </Reveal>
        </div>

        <Reveal delay={0.06} className="mt-16">
          <div className="relative overflow-hidden rounded-2xl border border-line px-5 py-14 text-center sm:py-16">
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: 'radial-gradient(60% 120% at 50% 50%, var(--glow-a), transparent 70%)' }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 grid-plane opacity-30" aria-hidden="true" />
            <p className="relative font-mono text-[9px] uppercase tracking-[0.34em] text-faint">Final transmission</p>
            <p className="relative mx-auto mt-6 max-w-4xl font-display text-[clamp(1.5rem,4.4vw,3.4rem)] font-light uppercase leading-[1.05] tracking-tightest text-ink">
              The future is built by those who{' '}
              <span className="font-serif italic lowercase tracking-normal text-gradient">create it.</span>
            </p>
            <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href={`mailto:${profile.email}`} className="btn-primary text-sm">
                Start the conversation
                <ArrowUpRight size={15} />
              </a>
              <a href={profile.resumeUrl} download className="btn-ghost text-sm">
                Resume PDF
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Field({ label, htmlFor, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block font-mono text-[8.5px] uppercase tracking-[0.18em] text-faint">
        {label}
      </label>
      {children}
    </div>
  )
}
