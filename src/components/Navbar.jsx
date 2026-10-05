import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Logo from './Logo'
import MagneticButton from './ui/MagneticButton'
import { brand, nav, socials } from '../data/site'
import { useAnchorClick, useSmoothScroll } from '../lib/scroll'
import { EASE } from './ui/Reveal'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const menuButton = useRef(null)
  const panel = useRef(null)
  const { stop, start } = useSmoothScroll()
  const close = () => setOpen(false)
  const onAnchor = useAnchorClick(close)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight the section currently in view.
  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1))
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  // Mobile menu: lock scroll, Esc to close, return focus.
  useEffect(() => {
    if (!open) return undefined
    stop()
    document.documentElement.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
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
    requestAnimationFrame(() => panel.current?.querySelector('a')?.focus())
    const btn = menuButton.current
    return () => {
      window.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
      start()
      btn?.focus({ preventScroll: true })
    }
  }, [open, stop, start])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ease-out ${
        scrolled || open
          ? 'border-b border-line/80 bg-paper/80 backdrop-blur-md backdrop-saturate-150'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <nav className="container-site flex h-[var(--nav-h)] items-center justify-between" aria-label="Primary">
        <a href="#top" onClick={onAnchor} className="rounded-lg" aria-label={`${brand.name} — back to top`}>
          <Logo size={34} />
        </a>

        <div className="hidden items-center gap-10 md:flex">
          <ul className="flex items-center gap-8">
            {nav.map((item) => {
              const isActive = active === item.href.slice(1)
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={onAnchor}
                    aria-current={isActive ? 'true' : undefined}
                    className={`group relative py-2 font-display text-[15px] font-medium tracking-[-0.01em] transition-colors duration-300 ${
                      isActive ? 'text-ink' : 'text-muted hover:text-ink'
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-current transition-transform duration-500 ease-out ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </a>
                </li>
              )
            })}
          </ul>
          <MagneticButton href="#contact" onClick={onAnchor} className="btn btn-primary min-h-[42px] px-5 text-[14px]">
            Start a Project
            <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
          </MagneticButton>
        </div>

        <button
          ref={menuButton}
          type="button"
          className="relative -mr-2 grid h-11 w-11 place-items-center rounded-full md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="relative block h-3 w-6">
            <span
              className={`absolute left-0 top-0 h-[1.5px] w-full bg-ink transition-transform duration-500 ease-out ${
                open ? 'translate-y-[5px] rotate-45' : ''
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 h-[1.5px] bg-ink transition-[transform,width] duration-500 ease-out ${
                open ? 'w-full -translate-y-[5.5px] -rotate-45' : 'w-4'
              }`}
            />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            key="scrim"
            className="absolute inset-x-0 top-full h-[calc(100dvh-var(--nav-h))] bg-ink/35 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={close}
            aria-hidden="true"
          />
        )}
        {open && (
          <motion.div
            key="panel"
            id="mobile-menu"
            ref={panel}
            className="absolute inset-x-0 top-full max-h-[calc(100dvh-var(--nav-h))] overflow-y-auto rounded-b-[24px] border-t border-line bg-paper shadow-[0_30px_60px_-30px_rgba(14,15,18,0.35)] md:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0 round 0 0 24px 24px)' }}
            animate={{ clipPath: 'inset(0 0 0% 0 round 0 0 24px 24px)' }}
            exit={{ clipPath: 'inset(0 0 100% 0 round 0 0 24px 24px)' }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="container-site pb-8 pt-4">
              <ul>
                {nav.map((item, i) => (
                  <li key={item.href} className="overflow-hidden border-b border-line">
                    <motion.a
                      href={item.href}
                      onClick={onAnchor}
                      className="flex items-baseline justify-between py-5"
                      initial={{ y: '100%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.6, ease: EASE, delay: 0.12 + i * 0.05 }}
                    >
                      <span className="font-display text-[clamp(2.25rem,10vw,3rem)] font-medium leading-none tracking-[-0.035em]">
                        {item.label}
                      </span>
                      <span className="font-mono text-[11px] text-muted">0{i + 1}</span>
                    </motion.a>
                  </li>
                ))}
              </ul>

              <motion.div
                className="mt-8 space-y-6"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.35 }}
              >
                <a href="#contact" onClick={onAnchor} className="btn btn-accent w-full">
                  Start a Project
                  <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
                </a>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <a href={`mailto:${brand.email}`} className="font-display text-[15px] font-medium">
                    {brand.email}
                  </a>
                  <ul className="flex gap-5">
                    {socials.map((s) => (
                      <li key={s.label}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted hover:text-ink"
                        >
                          {s.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
