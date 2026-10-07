import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ScrollProvider, ScrollTrigger } from './lib/scroll'
import { ThemeProvider } from './lib/theme'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Cursor from './components/Cursor'
import FloatingPill from './components/FloatingPill'
import Hero from './components/Hero'
import Studio from './components/Studio'
import Identity from './components/Identity'
import Work from './components/Work'
import AIShowcase from './components/AIShowcase'
import CTA from './components/CTA'
import Contact from './components/Contact'
import Footer from './components/Footer'

const LOADER_MS = 1250
const SEEN_KEY = 'swx-intro-seen'

/** Intro plays once per session; skipped for reduced motion or a deep link. */
function shouldShowLoader() {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    if (window.location.hash) return false
    return !sessionStorage.getItem(SEEN_KEY)
  } catch {
    return true
  }
}

export default function App() {
  const [loading, setLoading] = useState(shouldShowLoader)

  useEffect(() => {
    if (!loading) return undefined
    const id = setTimeout(() => {
      setLoading(false)
      try {
        sessionStorage.setItem(SEEN_KEY, '1')
      } catch {
        /* storage unavailable — intro simply plays again */
      }
    }, LOADER_MS)
    return () => clearTimeout(id)
  }, [loading])

  // Re-measure pinned sections whenever the page height settles to a new value
  // (fonts swapping in, lazy images decoding), so pins never start in the wrong place.
  useEffect(() => {
    let last = 0
    let t = 0
    const refresh = () => {
      clearTimeout(t)
      t = setTimeout(() => {
        const h = document.body.scrollHeight
        if (Math.abs(h - last) > 2) {
          ScrollTrigger.refresh()
          last = document.body.scrollHeight
        }
      }, 250)
    }
    const ro = new ResizeObserver(refresh)
    ro.observe(document.body)
    document.fonts?.ready.then(() => {
      ScrollTrigger.refresh()
      // Arriving with a section hash (e.g. /#work from /chatbots/): land on it once pins are measured.
      const target = window.location.hash.length > 1 && document.querySelector(window.location.hash)
      if (target) {
        const align = () => requestAnimationFrame(() => target.scrollIntoView())
        align()
        // Pins above may re-measure as content settles: keep the target aligned for a moment.
        ScrollTrigger.addEventListener('refresh', align)
        setTimeout(() => ScrollTrigger.removeEventListener('refresh', align), 3000)
      }
    })
    window.addEventListener('load', refresh)
    return () => {
      ro.disconnect()
      clearTimeout(t)
      window.removeEventListener('load', refresh)
    }
  }, [])

  return (
    <ThemeProvider>
      <ScrollProvider>
        <AnimatePresence>{loading && <Loader key="loader" />}</AnimatePresence>
        <Navbar ready={!loading} />
        <Cursor />
        <main id="main" tabIndex={-1} className="outline-none">
          <Hero ready={!loading} />
          <Studio />
          <Identity />
          <Work />
          <AIShowcase />
          <CTA />
          <Contact />
        </main>
        <Footer />
        <FloatingPill ready={!loading} />
      </ScrollProvider>
    </ThemeProvider>
  )
}
