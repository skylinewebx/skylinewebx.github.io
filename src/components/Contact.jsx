import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Check } from 'lucide-react'
import { brand, contact, socials } from '../data/site'
import SectionHead from './SectionHead'
import { Reveal, RevealLines, EASE } from './ui/Reveal'
import MagneticButton from './ui/MagneticButton'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const FIELDS = [
  { name: 'name', label: 'Name', type: 'text', autoComplete: 'name', required: true },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', required: true },
  { name: 'business', label: 'Business', type: 'text', autoComplete: 'organization', required: false },
  { name: 'details', label: 'Project details', type: 'textarea', required: true },
]

function validate(v) {
  const e = {}
  if (!v.name.trim()) e.name = 'Please add your name.'
  if (!v.email.trim()) e.email = 'Please add your email.'
  else if (!EMAIL_RE.test(v.email.trim())) e.email = 'That email doesn’t look quite right.'
  if (v.details.trim().length < 10) e.details = 'A sentence or two about the project helps.'
  return e
}

/**
 * No backend: Send Inquiry composes the message in the visitor's email app,
 * addressed to the studio. Replace `send` with an API call when one exists.
 */
function send(v) {
  const subject = `Project inquiry — ${v.business.trim() || v.name.trim()}`
  const body = [`Name: ${v.name.trim()}`, `Email: ${v.email.trim()}`, `Business: ${v.business.trim() || '—'}`, '', v.details.trim()].join('\n')
  window.location.href = `mailto:${brand.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export default function Contact() {
  const uid = useId()
  const [values, setValues] = useState({ name: '', email: '', business: '', details: '' })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [sent, setSent] = useState(false)

  const update = (e) => {
    const next = { ...values, [e.target.name]: e.target.value }
    setValues(next)
    if (touched[e.target.name]) setErrors(validate(next))
  }
  const blur = (e) => {
    setTouched((t) => ({ ...t, [e.target.name]: true }))
    setErrors(validate(values))
  }
  const submit = (e) => {
    e.preventDefault()
    const errs = validate(values)
    setErrors(errs)
    setTouched({ name: true, email: true, business: true, details: true })
    if (Object.keys(errs).length) {
      const first = FIELDS.find((f) => errs[f.name])
      document.getElementById(`${uid}-${first.name}`)?.focus()
      return
    }
    send(values)
    setSent(true)
  }

  return (
    <section id="contact" className="border-t border-border" aria-labelledby="contact-title">
      <div className="frame">
        <SectionHead index="06" label="Contact" aside="Available for select projects" />

        <div className="grid lg:grid-cols-12">
          <div className="pad flex flex-col justify-between gap-10 py-10 md:py-14 lg:col-span-5">
            <div>
              <h2 id="contact-title" className="display text-[clamp(3.25rem,8vw,7rem)]">
                <RevealLines lines={['Start a', 'project']} stagger={0.08} />
              </h2>
              <Reveal delay={0.08}>
                <p className="lede mt-6 max-w-[36ch]">{contact.copy}</p>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <dl className="border-t border-border">
                <div className="border-b border-border py-4">
                  <dt className="meta mb-1 text-muted">Email</dt>
                  <dd>
                    <a href={`mailto:${brand.email}`} className="link-rule break-all font-display text-[clamp(1.4rem,2.4vw,2rem)] font-medium tracking-[-0.02em]">
                      {brand.email}
                    </a>
                  </dd>
                </div>
                <div className="border-b border-border py-4">
                  <dt className="meta mb-1 text-muted">Location</dt>
                  <dd className="font-display text-[18px] font-medium">{brand.location}</dd>
                </div>
                <div className="py-4">
                  <dt className="meta mb-3 text-muted">Social</dt>
                  <dd>
                    <ul className="flex flex-wrap gap-2">
                      {socials.map((s) => (
                        <li key={s.label}>
                          <a
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="meta inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-border px-4 transition-colors hover:border-foreground"
                          >
                            {s.label}
                            <ArrowUpRight size={13} strokeWidth={1.75} aria-hidden="true" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>

          <div className="border-t border-border bg-surface lg:col-span-7 lg:border-l lg:border-t-0">
            <div className="pad py-10 md:py-14">
              <AnimatePresence mode="wait" initial={false}>
                {sent ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    role="status"
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-accent text-accent-foreground">
                      <Check size={20} strokeWidth={2} aria-hidden="true" />
                    </span>
                    <h3 className="display mt-6 text-[clamp(2.2rem,4vw,3.25rem)]">Your inquiry is ready to send.</h3>
                    <p className="mt-3 max-w-[44ch] text-[15px] leading-relaxed text-muted">
                      Your email app should have opened with the details filled in — just press send. If it didn’t, email{' '}
                      <a href={`mailto:${brand.email}`} className="text-foreground underline underline-offset-4">
                        {brand.email}
                      </a>{' '}
                      directly.
                    </p>
                    <button type="button" onClick={() => setSent(false)} className="meta mt-8 underline underline-offset-4">
                      Edit inquiry
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    noValidate
                    onSubmit={submit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid gap-8 sm:grid-cols-2"
                    aria-label="Project inquiry"
                  >
                    {FIELDS.map((f) => {
                      const id = `${uid}-${f.name}`
                      const err = touched[f.name] && errors[f.name]
                      const common = {
                        id,
                        name: f.name,
                        value: values[f.name],
                        onChange: update,
                        onBlur: blur,
                        required: f.required,
                        'aria-invalid': err ? 'true' : 'false',
                        'aria-describedby': err ? `${id}-error` : undefined,
                        className: 'field',
                      }
                      return (
                        <div key={f.name} className={f.type === 'textarea' || f.name === 'business' ? 'sm:col-span-2' : ''}>
                          <label htmlFor={id} className="meta flex justify-between">
                            <span>{f.label}</span>
                            {!f.required && <span className="text-muted">Optional</span>}
                          </label>
                          {f.type === 'textarea' ? (
                            <textarea {...common} rows={4} className="field resize-none" placeholder="A new website, a redesign, an AI assistant…" />
                          ) : (
                            <input {...common} type={f.type} autoComplete={f.autoComplete} />
                          )}
                          {err && (
                            <p id={`${id}-error`} className="mt-2 text-[13px] text-[#d0452f]">
                              {err}
                            </p>
                          )}
                        </div>
                      )
                    })}

                    <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                      <MagneticButton type="submit" className="btn btn-accent w-full sm:w-auto">
                        Send Inquiry
                        <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" className="btn-arrow" />
                      </MagneticButton>
                      <p className="text-[12.5px] leading-snug text-muted sm:max-w-[24ch] sm:text-right">
                        Opens your email app with the details filled in.
                      </p>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
