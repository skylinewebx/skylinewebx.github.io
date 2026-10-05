import { createContext, useCallback, useContext, useEffect, useRef } from 'react'
import Lenis from 'lenis'

const ScrollContext = createContext({ scrollTo: () => {}, stop: () => {}, start: () => {} })

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Lenis smooth scrolling for wheel input only — touch devices keep
 * native momentum scrolling (syncTouch stays off). Disabled entirely
 * when the visitor prefers reduced motion.
 */
export function ScrollProvider({ children }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return undefined

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenisRef.current = lenis

    let frame
    const raf = (time) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  const scrollTo = useCallback((target, options = {}) => {
    const el = typeof target === 'string' ? document.querySelector(target) : target
    if (target !== 0 && !el) return
    const offset = options.offset ?? 0
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target === 0 ? 0 : el, { offset, duration: 1.2 })
    } else if (target === 0) {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
    } else {
      const top = el.getBoundingClientRect().top + window.scrollY + offset
      window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
    }
    // Move focus for keyboard + screen-reader users without a second jump.
    if (el && options.focus !== false) {
      if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
      el.focus({ preventScroll: true })
    }
  }, [])

  const stop = useCallback(() => lenisRef.current?.stop(), [])
  const start = useCallback(() => lenisRef.current?.start(), [])

  return <ScrollContext.Provider value={{ scrollTo, stop, start }}>{children}</ScrollContext.Provider>
}

export const useSmoothScroll = () => useContext(ScrollContext)

/** onClick handler for in-page anchor links (#id). Keeps the real href for no-JS / new-tab. */
export function useAnchorClick(onNavigate) {
  const { scrollTo } = useSmoothScroll()
  return useCallback(
    (event) => {
      const href = event.currentTarget.getAttribute('href')
      if (!href || !href.startsWith('#')) return
      event.preventDefault()
      onNavigate?.()
      if (href === '#top') scrollTo(0)
      else scrollTo(href)
      history.replaceState(null, '', href === '#top' ? ' ' : href)
    },
    [scrollTo, onNavigate],
  )
}
