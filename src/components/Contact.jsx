import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import WarpGrid from './ui/WarpGrid'
import { brand, contact, socials } from '../data/site'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const FIELDS = [
  { name: 'name', label: 'Name', type: 'text', autoComplete: 'name', required: true },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', required: true },
  { name: 'business', label: 'Business', type: 'text', autoComplete: 'organization', required: false },
  { name: 'details', label: 'Project details', type: 'textarea', required: true },
]

function validate(v) {
  const e = {}
  if (!v.name.trim()) e.name = 'Add your name'
  if (!v.email.trim()) e.email = 'Add your email'
  else if (!EMAIL_RE.test(v.email.trim())) e.email = 'Check your email'
  if (v.details.trim().length < 10) e.details = 'A sentence or two helps'
  return e
}

/** No backend: Submit composes the inquiry in the visitor's email app. Swap for an API later. */
function send(v) {
  const subject = `Project inquiry — ${v.business.trim() || v.name.trim()}`
  const body = [`Name: ${v.name.trim()}`, `Email: ${v.email.trim()}`, `Business: ${v.business.trim() || '—'}`, '', v.details.trim()].join('\n')
  window.location.href = `mailto:${brand.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

function Sparkle({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 0c.6 6.6 5.4 11.4 12 12-6.6.6-11.4 5.4-12 12-.6-6.6-5.4-11.4-12-12C6.6 11.4 11.4 6.6 12 0z" fill="currentColor" />
    </svg>
  )
}

const SPRING = { type: 'spring', stiffness: 140, damping: 22, mass: 0.9 }

/** The GO disc expands into a circular inquiry form; the grid bulges around it. */
export default function Contact() {
  const uid = useId()
  const [open, setOpen] = useState(false)
  const [values, setValues] = useState({ name: '', email: '', business: '', details: '' })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [sent, setSent] = useState(false)
  const goRef = useRef(null)
  const firstField = useRef(null)

  useEffect(() => {
    if (open) setTimeout(() => firstField.current?.focus({ preventScroll: true }), 450)
  }, [open])

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
      document.getElementById(`${uid}-${FIELDS.find((f) => errs[f.name]).name}`)?.focus()
      return
    }
    send(values)
    setSent(true)
  }
  const close = () => {
    setOpen(false)
    setTimeout(() => goRef.current?.focus(), 400)
  }

  return (
    <section id="contact" aria-labelledby="contact-title">
      <div className="frame relative grid min-h-[100svh] place-items-center overflow-hidden border-b border-border py-24" onKeyDown={(e) => e.key === 'Escape' && open && close()}>
        <WarpGrid alpha={0.6} cell={64} strength={40} radius={200} bulge={open ? 1 : 0} />

        <h2 id="contact-title" className="meta absolute left-1/2 top-8 -translate-x-1/2 whitespace-nowrap bg-background px-3 py-1">
          {contact.heading}
        </h2>

        <AnimatePresence mode="popLayout" initial={false}>
          {!open ? (
            <motion.div key="go" className="relative flex flex-col items-center gap-5" exit={{ opacity: 0 }}>
              <motion.button
                ref={goRef}
                layoutId="disc"
                type="button"
                onClick={() => setOpen(true)}
                className="display grid h-[clamp(84px,9vw,112px)] w-[clamp(84px,9vw,112px)] place-items-center rounded-full bg-foreground text-[clamp(2rem,3.2vw,2.8rem)] text-background transition-transform duration-300 hover:scale-110"
                aria-label="Start a project — open the inquiry form"
                transition={SPRING}
                style={{ borderRadius: 9999 }}
              >
                <motion.span layout="position">Go</motion.span>
              </motion.button>
              <p className="meta bg-background px-2 py-1 text-muted">Press go to start a project</p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              layoutId="disc"
              transition={SPRING}
              style={{ borderRadius: '50%' }}
              className="inverse dots relative flex w-[min(94vw,620px)] min-h-[min(94vw,620px)] items-center justify-center bg-foreground px-[13%] py-[15%] text-background ring-1 ring-foreground ring-offset-[6px] ring-offset-background"
              role="dialog"
              aria-label="Project inquiry"
            >
              <Sparkle className="absolute left-[16%] top-[14%] h-4 w-4" />
              <Sparkle className="absolute right-[14%] top-[30%] h-3 w-3" />
              <Sparkle className="absolute bottom-[22%] left-[12%] h-3.5 w-3.5" />
              <Sparkle className="absolute bottom-[14%] right-[22%] h-3 w-3" />
              <motion.div className="relative w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.4 }}>
                <button type="button" onClick={close} className="absolute -top-2 right-0 grid h-10 w-10 place-items-center rounded-full border border-background/40 hover:bg-background hover:text-foreground" aria-label="Close inquiry form">
                  <X size={16} strokeWidth={1.75} />
                </button>
                {sent ? (
                  <div className="py-6 text-center" role="status">
                    <p className="display text-[clamp(2rem,6vw,3rem)]">Ready to send.</p>
                    <p className="serif mx-auto mt-3 max-w-[28ch] text-[16px] leading-snug text-background/80">
                      Your email app should have opened with everything filled in. If not, write to{' '}
                      <a className="underline underline-offset-4" href={`mailto:${brand.email}`}>
                        {brand.email}
                      </a>
                      .
                    </p>
                    <button type="button" onClick={() => setSent(false)} className="meta mt-6 underline underline-offset-4">
                      Edit inquiry
                    </button>
                  </div>
                ) : (
                  <form noValidate onSubmit={submit} className="space-y-4 pt-8 text-center">
                    {FIELDS.map((f, i) => {
                      const id = `${uid}-${f.name}`
                      const err = touched[f.name] && errors[f.name]
                      const common = {
                        id,
                        name: f.name,
                        value: values[f.name],
                        onChange: update,
                        onBlur: blur,
                        required: f.required,
                        placeholder: f.label + (f.required ? '' : ' (optional)'),
                        'aria-invalid': err ? 'true' : 'false',
                        'aria-describedby': err ? `${id}-e` : undefined,
                        className: 'disc-field',
                        ref: i === 0 ? firstField : undefined,
                      }
                      return (
                        <div key={f.name}>
                          <label htmlFor={id} className="sr-only">
                            {f.label}
                          </label>
                          {f.type === 'textarea' ? <textarea {...common} rows={2} className="disc-field resize-none" /> : <input {...common} type={f.type} autoComplete={f.autoComplete} />}
                          {err && (
                            <p id={`${id}-e`} className="meta mt-1 text-[9px] text-[#ff8a7a]">
                              {err}
                            </p>
                          )}
                        </div>
                      )
                    })}
                    <button type="submit" className="meta mx-auto mt-2 flex min-h-[44px] items-center gap-2 rounded-full bg-background px-6 text-foreground transition-transform hover:scale-105">
                      Submit <ArrowUpRight size={13} strokeWidth={2} aria-hidden="true" />
                    </button>
                    <p className="text-[11px] text-background/50">Opens your email app with the details filled in.</p>
                  </form>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Direct contact details */}
      <div className="frame grid border-b border-border md:grid-cols-3">
        <a href={`mailto:${brand.email}`} className="group block px-[var(--gutter)] py-6 transition-colors hover:bg-foreground hover:text-background">
          <span className="meta block opacity-60">Email</span>
          <span className="serif mt-1 block text-[clamp(1.4rem,2.2vw,1.9rem)]">{brand.email}</span>
        </a>
        <div className="border-t border-border px-[var(--gutter)] py-6 md:border-l md:border-t-0">
          <span className="meta block opacity-60">Location</span>
          <span className="serif mt-1 block text-[clamp(1.4rem,2.2vw,1.9rem)]">{brand.location}</span>
        </div>
        <div className="border-t border-border px-[var(--gutter)] py-6 md:border-l md:border-t-0">
          <span className="meta block opacity-60">Social</span>
          <ul className="mt-2 flex flex-wrap gap-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="chip">
                  {s.label} <ArrowUpRight size={12} strokeWidth={2} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
