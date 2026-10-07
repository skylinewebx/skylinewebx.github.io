import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

/** Keep ids in sync with the inline script in index.html and the CSS tokens in src/index.css. */
export const THEMES = [
  { id: 'skyline', label: 'Skyline Blue', short: 'Skyline', swatch: ['#F6F7FA', '#3264C9'], meta: '#F6F7FA' },
  { id: 'mono', label: 'Monochrome', short: 'Mono', swatch: ['#FAFAFA', '#0C0C0C'], meta: '#FAFAFA' },
  { id: 'warm', label: 'Warm', short: 'Warm', swatch: ['#FCEDEA', '#D62D20'], meta: '#FCEDEA' },
  { id: 'dark', label: 'Dark', short: 'Dark', swatch: ['#0C0C0E', '#7098EE'], meta: '#0C0C0E' },
]
const KEY = 'swx-theme'
const ThemeContext = createContext({ theme: 'skyline', setTheme: () => {}, cycle: () => {} })

function readInitial() {
  const attr = document.documentElement.getAttribute('data-theme')
  return THEMES.some((t) => t.id === attr) ? attr : 'skyline'
}

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Theme switch with a full-screen wipe: a panel in the OLD background colour
 * covers the page, the new theme applies underneath, then the panel slides
 * away to the left — the same curtain transition as the reference.
 */
export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(readInitial)
  const busy = useRef(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', THEMES.find((t) => t.id === theme).meta)
    try {
      localStorage.setItem(KEY, theme)
    } catch {
      /* storage unavailable — theme still applies for this visit */
    }
  }, [theme])

  const setTheme = useCallback(
    (id) => {
      if (id === theme || busy.current) return
      if (reduced()) {
        setThemeState(id)
        return
      }
      busy.current = true
      const old = getComputedStyle(document.body).backgroundColor
      const curtain = document.createElement('div')
      curtain.setAttribute('aria-hidden', 'true')
      Object.assign(curtain.style, {
        position: 'fixed',
        inset: '0',
        zIndex: '200',
        background: old,
        pointerEvents: 'none',
        clipPath: 'inset(0 0 0 0)',
        transition: 'clip-path 0.75s cubic-bezier(0.76, 0, 0.24, 1)',
      })
      document.body.appendChild(curtain)
      requestAnimationFrame(() => {
        setThemeState(id)
        requestAnimationFrame(() => {
          curtain.style.clipPath = 'inset(0 100% 0 0)'
          const done = () => {
            curtain.remove()
            busy.current = false
          }
          curtain.addEventListener('transitionend', done, { once: true })
          setTimeout(done, 1100)
        })
      })
    },
    [theme],
  )

  const cycle = useCallback(() => {
    const i = THEMES.findIndex((t) => t.id === theme)
    setTheme(THEMES[(i + 1) % THEMES.length].id)
  }, [theme, setTheme])

  return <ThemeContext.Provider value={{ theme, setTheme, cycle }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
