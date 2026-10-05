import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ScrollProvider } from './lib/scroll'
import { ThemeProvider } from './lib/theme'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Cursor from './components/Cursor'
import Hero from './components/Hero'
import Reel from './components/Reel'
import ProjectShowcase from './components/ProjectShowcase'
import AIShowcase from './components/AIShowcase'
import Ticker from './components/Ticker'
import About from './components/About'
import Services from './components/Services'
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

  return (
    <ThemeProvider>
      <ScrollProvider>
        <AnimatePresence>{loading && <Loader key="loader" duration={LOADER_MS - 150} />}</AnimatePresence>
        <Navbar ready={!loading} />
        <Cursor />
        <main id="main" tabIndex={-1} className="outline-none">
          <Hero ready={!loading} />
          <div className="frame">
            <Reel />
          </div>
          <ProjectShowcase />
          <AIShowcase />
          <About />
          <Ticker />
          <Services />
          <CTA />
          <Contact />
        </main>
        <Footer />
      </ScrollProvider>
    </ThemeProvider>
  )
}
