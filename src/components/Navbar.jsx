import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Logo from './Logo'
import { ThemeCycle, ThemePicker } from './ThemeSwitcher'
import { brand, nav, socials } from '../data/site'
import { useAnchorClick, useSmoothScroll } from '../lib/scroll'
import { EASE } from './ui/Reveal'

/**
 * Ruled navigation bar: [logo | links | theme | CTA] separated by hairlines.
 * Mobile: [logo | theme cycle | menu] with a content-height drop panel.
 */
export default function Navbar({ ready = true }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const menuButton = useRef(null)
  const panel = useRef(null)
  const { stop, start } = useSmoothScroll()
  const close = () => setOpen(false)
  const onAnchor = useAnchorClick(close)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const els = nav.map((n) => document.getElementById(n.href.slice(1))).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

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
    <motion.header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-500 ${
        scrolled || open ? 'border-border bg-background/85 backdrop-blur-md' : 'border-transparent bg-background/0'
      }`}
      initial={{ y: -20, opacity: 0 }}
      animate={ready ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
      >
        Skip to content
      </a>
      <nav className="frame flex h-[var(--nav-h)] items-stretch" aria-label="Primary">
        <a
          href="#top"
          onClick={onAnchor}
          className="pad flex items-center"
          aria-label={`${brand.name} — back to top`}
        >
          <Logo size={30} nameClassName="hidden min-[360px]:inline" />
        </a>

        <ul className="ml-auto hidden items-stretch border-l border-border lg:flex">
          {nav.map((item) => {
            const isActive = active === item.href.slice(1)
            return (
              <li key={item.href} className="flex">
                <a
                  href={item.href}
                  onClick={onAnchor}
                  aria-current={isActive ? 'true' : undefined}
                  className={`meta group relative flex items-center px-4 transition-colors duration-300 lg:px-6 ${
                    isActive ? 'text-foreground' : 'text-muted hover:text-foreground'
                  }`}
                >
                  <span className={`mr-2 h-1 w-1 rounded-full bg-accent transition-transform duration-300 ${isActive ? 'scale-100' : 'scale-0'}`} />
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="hidden items-center border-l border-border px-4 lg:flex lg:px-5">
          <ThemePicker />
        </div>

        <a
          href="#contact"
          onClick={onAnchor}
          className="meta group hidden items-center gap-2 border-l border-border bg-foreground px-5 text-background transition-colors duration-300 hover:bg-accent hover:text-accent-foreground lg:flex lg:px-7"
        >
          Start a Project
          <ArrowUpRight size={15} strokeWidth={1.75} aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>

        <div className="ml-auto flex items-center border-l border-border lg:hidden">
          <ThemeCycle />
        </div>
        <button
          ref={menuButton}
          type="button"
          className="grid w-[var(--nav-h)] place-items-center border-l border-border lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="relative block h-3 w-6">
            <span className={`absolute left-0 top-0 h-[1.5px] w-full bg-foreground transition-transform duration-500 ${open ? 'translate-y-[5px] rotate-45' : ''}`} />
            <span className={`absolute bottom-0 right-0 h-[1.5px] bg-foreground transition-[transform,width] duration-500 ${open ? 'w-full -translate-y-[5.5px] -rotate-45' : 'w-4'}`} />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            key="scrim"
            className="absolute inset-x-0 top-full h-[calc(100dvh-var(--nav-h))] bg-foreground/40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            aria-hidden="true"
          />
        )}
        {open && (
          <motion.div
            key="panel"
            id="mobile-menu"
            ref={panel}
            className="absolute inset-x-0 top-full max-h-[calc(100dvh-var(--nav-h))] overflow-y-auto border-b border-border bg-background lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul>
              {nav.map((item, i) => (
                <li key={item.href} className="overflow-hidden border-b border-border">
                  <motion.a
                    href={item.href}
                    onClick={onAnchor}
                    className="pad flex items-center justify-between py-4"
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.1 + i * 0.05 }}
                  >
                    <span className="display text-[clamp(2.6rem,13vw,3.5rem)]">{item.label}</span>
                    <span className="meta text-muted">0{i + 1}</span>
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.div
              className="pad space-y-6 py-6"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
            >
              <div className="flex items-center justify-between">
                <span className="meta text-muted">Theme</span>
                <ThemePicker showLabel={false} />
              </div>
              <a href="#contact" onClick={onAnchor} className="btn btn-accent w-full">
                Start a Project
                <ArrowUpRight size={15} strokeWidth={1.75} aria-hidden="true" className="btn-arrow" />
              </a>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <a href={`mailto:${brand.email}`} className="text-[15px] font-medium">
                  {brand.email}
                </a>
                <ul className="flex gap-4">
                  {socials.map((s) => (
                    <li key={s.label}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="meta text-muted hover:text-foreground">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
