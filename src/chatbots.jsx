import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ScrollProvider, ScrollTrigger } from './lib/scroll'
import { ThemeProvider } from './lib/theme'
import Navbar from './components/Navbar'
import Cursor from './components/Cursor'
import FloatingPill from './components/FloatingPill'
import ChatbotsPage from './components/ChatbotsPage'
import Footer from './components/Footer'
import './index.css'

/** /chatbots/ — the chatbot portfolio, built from the same shell as the homepage. */
function ChatbotsApp() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true))
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
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
    return () => {
      cancelAnimationFrame(id)
      ro.disconnect()
      clearTimeout(t)
    }
  }, [])

  return (
    <ThemeProvider>
      <ScrollProvider>
        <Navbar ready={ready} />
        <Cursor />
        <main id="main" tabIndex={-1} className="outline-none">
          <ChatbotsPage ready={ready} />
        </main>
        <Footer />
        <FloatingPill ready={ready} />
      </ScrollProvider>
    </ThemeProvider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChatbotsApp />
  </StrictMode>,
)
