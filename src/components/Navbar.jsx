import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Contrast, Menu, X } from 'lucide-react'
import GithubIcon, { InstagramIcon } from './ui/GithubIcon'
import BinaryStrip from './ui/BinaryStrip'
import { logoSrc } from './Logo'
import { THEMES, useTheme } from '../lib/theme'
import { brand, nav, socials } from '../data/site'
import { useAnchorClick, useSmoothScroll } from '../lib/scroll'

const EASE = [0.22, 1, 0.36, 1]

/** One ruled cell of the nav bar; cells cascade in on page entrance. */
function Cell({ i, ready, className = '', children }) {
  return (
    <motion.div
      className={`flex items-stretch border-l border-border first:border-l-0 ${className}`}
      initial={{ opacity: 0, y: -8 }}
      animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
      transition={{ duration: 0.5, ease: EASE, delay: 0.1 + i * 0.06 }}
    >
      {children}
    </motion.div>
  )
}

const iconCell = 'grid w-11 place-items-center transition-colors duration-300 hover:bg-foreground hover:text-background lg:w-12'

function Drawer({ open, onClose }) {
  const panel = useRef(null)
  const { theme, setTheme } = useTheme()
  const onAnchor = useAnchorClick(onClose)
  const items = [...nav.slice(0, 3), { label: 'Assistants', href: '#assistants' }, nav[3]]

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab' && panel.current) {
        const f = panel.current.querySelectorAll('a, button')
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    requestAnimationFrame(() => panel.current?.querySelector('button')?.focus())
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[60] bg-background/30"
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(7px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.45, ease: EASE }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            key="panel"
            ref={panel}
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            data-lenis-prevent
            className="fixed bottom-0 right-0 top-0 z-[61] flex w-[min(82vw,440px)] flex-col border-l border-border bg-background"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex h-[var(--nav-h)] items-center justify-between border-b border-border pl-6">
              <span className="meta">Navigation</span>
              <button type="button" onClick={onClose} className="grid h-full w-[var(--nav-h)] place-items-center border-l border-border" aria-label="Close menu">
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center px-6" aria-label="Menu">
              <ul className="space-y-1">
                {items.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.55, ease: EASE, delay: 0.18 + i * 0.07 }}
                  >
                    <a
                      href={item.href}
                      onClick={onAnchor}
                      className="group flex items-center justify-between py-3 font-mono text-[20px] uppercase tracking-[0.2em] sm:text-[22px]"
                    >
                      <span className="transition-transform duration-500 group-hover:translate-x-2">{item.label}</span>
                      <span className="meta text-muted">0{i + 1}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div
              className="space-y-5 border-t border-border px-6 py-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div>
                <p className="meta mb-3 text-muted">Theme</p>
                <div role="radiogroup" aria-label="Colour theme" className="grid grid-cols-2 gap-2">
                  {THEMES.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      role="radio"
                      aria-checked={theme === t.id}
                      onClick={() => setTheme(t.id)}
                      className={`meta flex min-h-[40px] items-center gap-2.5 border border-border px-3 text-left transition-colors ${
                        theme === t.id ? 'bg-foreground text-background' : 'hover:bg-foreground/5'
                      }`}
                    >
                      <span
                        className="h-3.5 w-3.5 shrink-0 rounded-full ring-1 ring-current"
                        style={{ background: `linear-gradient(135deg, ${t.swatch[0]} 0 50%, ${t.swatch[1]} 50%)` }}
                        aria-hidden="true"
                      />
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
              <ul className="meta flex flex-wrap gap-x-3 gap-y-1">
                {socials.map((s, i) => (
                  <li key={s.label}>
                    {i > 0 && <span className="mr-3 text-muted">/</span>}
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-rule">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="meta text-muted">Designing &amp; building from {brand.location}</p>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default function Navbar({ ready = true }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const menuBtn = useRef(null)
  const { stop, start } = useSmoothScroll()
  const { theme, cycle } = useTheme()
  const onAnchor = useAnchorClick()
  const current = THEMES.find((t) => t.id === theme)
  const next = THEMES[(THEMES.indexOf(current) + 1) % THEMES.length]
  const ig = socials.find((s) => s.label === 'Instagram')
  const gh = socials.find((s) => s.label === 'GitHub')

  useEffect(() => {
    const els = nav.map((n) => document.getElementById(n.href.slice(1))).filter(Boolean)
    const io = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)), {
      rootMargin: '-45% 0px -50% 0px',
    })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return undefined
    stop()
    document.documentElement.style.overflow = 'hidden'
    const btn = menuBtn.current
    return () => {
      document.documentElement.style.overflow = ''
      start()
      btn?.focus({ preventScroll: true })
    }
  }, [open, stop, start])

  let i = 0
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
      >
        Skip to content
      </a>
      <nav className="frame flex h-[var(--nav-h)] border-b" aria-label="Primary">
        <Cell i={i++} ready={ready} className="shrink-0">
          <a href="#top" onClick={onAnchor} className="flex items-center gap-3 px-3 lg:px-4" aria-label={`${brand.name} — back to top`}>
            <img src={logoSrc} alt="" width={30} height={30} className="h-[28px] w-[28px] rounded-[22%] lg:h-[30px] lg:w-[30px]" />
            <span className="hidden font-mono text-[8.5px] uppercase leading-[1.35] tracking-[0.12em] text-muted xl:block">
              Design.
              <br />
              Develop.
              <br />
              Launch.
            </span>
          </a>
        </Cell>

        {nav.map((item) => {
          const on = active === item.href.slice(1)
          return (
            <Cell key={item.href} i={i++} ready={ready} className="hidden flex-1 lg:flex">
              <a
                href={item.href}
                onClick={onAnchor}
                aria-current={on ? 'true' : undefined}
                className={`meta relative flex w-full items-center justify-center transition-colors duration-300 hover:bg-foreground hover:text-background ${
                  on ? 'bg-foreground text-background' : ''
                }`}
              >
                {item.label}
              </a>
            </Cell>
          )
        })}

        <Cell i={i++} ready={ready} className="ml-auto lg:ml-0">
          <a href={gh.href} target="_blank" rel="noopener noreferrer" className={iconCell} aria-label="GitHub">
            <GithubIcon size={15} />
          </a>
          <a href={ig.href} target="_blank" rel="noopener noreferrer" className={`${iconCell} border-l border-border`} aria-label="Instagram">
            <InstagramIcon size={15} />
          </a>
        </Cell>

        <Cell i={i++} ready={ready}>
          <button
            type="button"
            onClick={cycle}
            className="group flex items-center gap-2 px-3 transition-colors duration-300 hover:bg-foreground hover:text-background lg:px-4"
            aria-label={`Colour theme: ${current.label}. Switch to ${next.label}`}
            title={`Theme: ${current.label}`}
          >
            <Contrast size={17} strokeWidth={1.75} className="transition-transform duration-500 group-hover:rotate-180" />
            <span className="meta hidden w-[52px] text-left xl:inline">{current.short}</span>
          </button>
        </Cell>

        <Cell i={i++} ready={ready}>
          <button
            ref={menuBtn}
            type="button"
            onClick={() => setOpen(true)}
            className={iconCell}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label="Open menu"
          >
            <Menu size={19} strokeWidth={1.5} />
          </button>
        </Cell>

        <Cell i={i++} ready={ready} className="hidden sm:flex">
          <a
            href="#contact"
            onClick={onAnchor}
            className="meta group flex items-center gap-2 bg-foreground px-4 text-background transition-colors duration-300 hover:bg-accent hover:text-accent-foreground lg:px-6"
          >
            Start a project
            <ArrowRight size={14} strokeWidth={1.75} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </Cell>
      </nav>
      <motion.div
        className="frame"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <BinaryStrip className="border-t-0" />
      </motion.div>

      <Drawer open={open} onClose={() => setOpen(false)} />
    </header>
  )
}
