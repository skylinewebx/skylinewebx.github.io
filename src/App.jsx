import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ScrollProvider } from './lib/scroll'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Statement from './components/Statement'
import About from './components/About'
import Services from './components/Services'
import AISection from './components/AISection'
import Projects from './components/Projects'
import Process from './components/Process'
import Approach from './components/Approach'
import CTA from './components/CTA'
import Contact from './components/Contact'
import Footer from './components/Footer'

const LOADER_MS = 1150
const SEEN_KEY = 'swx-intro-seen'

/** Show the intro once per session, never with reduced motion or a deep link. */
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
    <ScrollProvider>
      <AnimatePresence>{loading && <Loader key="loader" />}</AnimatePresence>
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero ready={!loading} />
        <Marquee />
        <Statement />
        <About />
        <Services />
        <AISection />
        <Projects />
        <Process />
        <Approach />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </ScrollProvider>
  )
}
