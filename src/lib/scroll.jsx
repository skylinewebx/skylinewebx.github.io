import { createContext, useCallback, useContext, useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
// GPU transforms everywhere; don't re-measure when the mobile URL bar shows/hides.
gsap.config({ force3D: true })
ScrollTrigger.config({ ignoreMobileResize: true })

const ScrollContext = createContext({ scrollTo: () => {}, stop: () => {}, start: () => {} })

/** Height of the fixed nav, read from the --nav-h token. */
const navOffset = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 0

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Lenis smooth scrolling driven by GSAP's ticker, so ScrollTrigger pins and
 * scrubs stay perfectly in sync. Wheel only — touch keeps native momentum.
 * Disabled entirely for reduced motion.
 */
export function ScrollProvider({ children }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return undefined
    // lerp (not a fixed duration) keeps wheel scrolling fluid at any frame rate.
    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true, wheelMultiplier: 0.95, syncTouch: false })
    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    // While the wheel scrolls (desktop), content sliding under a still pointer would
    // flip :hover on large group subtrees every frame. Suspend pointer hit-testing
    // until scrolling settles; hover returns 150ms after the last scroll frame.
    const root = document.documentElement
    let idle = 0
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const onScroll = () => {
      if (!fine) return
      if (!idle) root.classList.add('is-scrolling')
      clearTimeout(idle)
      idle = setTimeout(() => {
        root.classList.remove('is-scrolling')
        idle = 0
      }, 150)
    }
    lenis.on('scroll', onScroll)

    return () => {
      clearTimeout(idle)
      root.classList.remove('is-scrolling')
      gsap.ticker.remove(tick)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // Infinite pulse dots keep the style engine ticking even off-screen: pause them there.
  useEffect(() => {
    const dots = document.querySelectorAll('.pulse-dot')
    if (!dots.length) return undefined
    const io = new IntersectionObserver((entries) =>
      entries.forEach((e) => (e.target.dataset.paused = e.isIntersecting ? 'false' : 'true')),
    )
    dots.forEach((d) => io.observe(d))
    return () => io.disconnect()
  }, [])

  const scrollTo = useCallback((target, options = {}) => {
    const el = typeof target === 'string' ? document.querySelector(target) : target
    if (target !== 0 && !el) return
    const offset = options.offset ?? 0
    if (lenisRef.current) {
      // Lenis already honours scroll-padding-top.
      lenisRef.current.scrollTo(target === 0 ? 0 : el, { offset, duration: 1.4, force: true })
    } else {
      const top = target === 0 ? 0 : el.getBoundingClientRect().top + window.scrollY + offset - navOffset()
      window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
    }
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
      // Section lives on the homepage (e.g. nav links from /chatbots/): go there.
      if (href !== '#top' && !document.querySelector(href)) {
        onNavigate?.()
        window.location.assign('/' + href)
        return
      }
      const go = () => (href === '#top' ? scrollTo(0) : scrollTo(href))
      if (onNavigate) {
        // Let menus close (and release the scroll lock) before scrolling.
        onNavigate()
        requestAnimationFrame(() => requestAnimationFrame(go))
      } else go()
      history.replaceState(null, '', href === '#top' ? ' ' : href)
    },
    [scrollTo, onNavigate],
  )
}

export { gsap, ScrollTrigger }
