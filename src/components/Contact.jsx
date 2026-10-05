import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Check } from 'lucide-react'
import { brand, contact, socials } from '../data/site'
import { Reveal, EASE } from './ui/Reveal'
import MagneticButton from './ui/MagneticButton'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const FIELDS = [
  { name: 'name', label: 'Name', type: 'text', autoComplete: 'name', required: true },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', required: true },
  { name: 'company', label: 'Business / Company', type: 'text', autoComplete: 'organization', required: false },
  { name: 'message', label: 'What do you need?', type: 'textarea', required: true },
]

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please add your name.'
  if (!values.email.trim()) errors.email = 'Please add your email.'
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = 'That email doesn’t look quite right.'
  if (values.message.trim().length < 10) errors.message = 'A sentence or two about the project helps.'
  return errors
}

/**
 * No backend: on submit the inquiry is composed into the visitor's
 * email app, addressed to the studio. Swap `send` for an API call later.
 */
function send(values) {
  const subject = `Project inquiry — ${values.company.trim() || values.name.trim()}`
  const body = [
    `Name: ${values.name.trim()}`,
    `Email: ${values.email.trim()}`,
    `Business / Company: ${values.company.trim() || '—'}`,
    '',
    values.message.trim(),
  ].join('\n')
  window.location.href = `mailto:${brand.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export default function Contact() {
  const uid = useId()
  const [values, setValues] = useState({ name: '', email: '', company: '', message: '' })
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
    setTouched({ name: true, email: true, company: true, message: true })
    if (Object.keys(errs).length) {
      const first = FIELDS.find((f) => errs[f.name])
      document.getElementById(`${uid}-${first.name}`)?.focus()
      return
    }
    send(values)
    setSent(true)
  }

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container-site">
        <Reveal className="mb-10 flex items-center justify-between border-t border-ink pt-4 md:mb-16">
          <p className="eyebrow text-ink">
            <span className="text-accent">07</span>
            <span className="mx-2 text-line" aria-hidden="true">
              /
            </span>
            Contact
          </p>
          <p className="eyebrow inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            Open for new projects
          </p>
        </Reveal>

        <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
          {/* Details */}
          <div className="lg:col-span-5">
            <Reveal as="h2" id="contact-title" className="h-section uppercase">
              {contact.heading}
            </Reveal>
            <Reveal delay={0.06}>
              <p className="lede mt-6 max-w-[40ch]">{contact.copy}</p>
            </Reveal>

            <Reveal delay={0.1} className="mt-12 space-y-8">
              <div>
                <p className="eyebrow mb-2">Email</p>
                <a
                  href={`mailto:${brand.email}`}
                  className="link-rule break-all font-display text-[clamp(1.5rem,2.8vw,2.25rem)] font-medium tracking-[-0.025em]"
                >
                  {brand.email}
                </a>
              </div>
              <div>
                <p className="eyebrow mb-2">Location</p>
                <p className="font-display text-[19px] font-medium tracking-[-0.015em]">{brand.location}</p>
              </div>
              <div>
                <p className="eyebrow mb-3">Social</p>
                <ul className="flex flex-wrap gap-2">
                  {socials.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-line px-4 text-[14px] font-medium transition-colors hover:border-ink"
                      >
                        {s.label}
                        <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.08} className="lg:col-span-6 lg:col-start-7">
            <div className="rounded-[24px] border border-line bg-surface p-6 sm:p-10">
              <AnimatePresence mode="wait" initial={false}>
                {sent ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="py-6"
                    role="status"
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-accent text-accent-ink">
                      <Check size={20} strokeWidth={2} aria-hidden="true" />
                    </span>
                    <h3 className="mt-6 font-display text-[28px] font-medium tracking-[-0.025em]">Your inquiry is ready to send.</h3>
                    <p className="mt-3 max-w-[44ch] text-[15px] leading-relaxed text-muted">
                      Your email app should have opened with the details filled in — just press send. If it didn’t, email{' '}
                      <a href={`mailto:${brand.email}`} className="text-ink underline underline-offset-4">
                        {brand.email}
                      </a>{' '}
                      directly.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSent(false)}
                      className="mt-8 font-display text-[15px] font-medium underline underline-offset-4"
                    >
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
                    className="space-y-8"
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
                        <div key={f.name}>
                          <label htmlFor={id} className="eyebrow flex justify-between">
                            <span className="text-ink">{f.label}</span>
                            {!f.required && <span>Optional</span>}
                          </label>
                          {f.type === 'textarea' ? (
                            <textarea {...common} rows={4} className="field resize-none" placeholder="A new website, a redesign, a landing page…" />
                          ) : (
                            <input {...common} type={f.type} autoComplete={f.autoComplete} />
                          )}
                          {err && (
                            <p id={`${id}-error`} className="mt-2 text-[13px] text-[#c2412d]">
                              {err}
                            </p>
                          )}
                        </div>
                      )
                    })}

                    <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                      <MagneticButton type="submit" className="btn btn-accent w-full sm:w-auto">
                        Send Inquiry
                        <ArrowUpRight size={17} strokeWidth={1.75} aria-hidden="true" />
                      </MagneticButton>
                      <p className="text-[12.5px] leading-snug text-muted sm:max-w-[22ch] sm:text-right">
                        Opens your email app with the details filled in.
                      </p>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
