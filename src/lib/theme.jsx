import { createContext, useCallback, useContext, useEffect, useState } from 'react'

/** Keep ids in sync with the inline script in index.html and the CSS in src/index.css. */
export const THEMES = [
  { id: 'skyline', label: 'Skyline Blue', swatch: ['#FAFAF7', '#3264C9'], meta: '#FAFAF7' },
  { id: 'mono', label: 'Monochrome', swatch: ['#FFFFFF', '#0A0A0A'], meta: '#FFFFFF' },
  { id: 'warm', label: 'Warm', swatch: ['#F4EEE4', '#B84E28'], meta: '#F4EEE4' },
  { id: 'dark', label: 'Dark', swatch: ['#0B0C0F', '#7098EE'], meta: '#0B0C0F' },
]
const KEY = 'swx-theme'
const ThemeContext = createContext({ theme: 'skyline', setTheme: () => {}, cycle: () => {} })

function readInitial() {
  const attr = document.documentElement.getAttribute('data-theme')
  return THEMES.some((t) => t.id === attr) ? attr : 'skyline'
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(readInitial)

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', theme)
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', THEMES.find((t) => t.id === theme).meta)
    try {
      localStorage.setItem(KEY, theme)
    } catch {
      /* storage unavailable — theme still applies for this visit */
    }
  }, [theme])

  const setTheme = useCallback((id) => {
    const root = document.documentElement
    root.classList.add('theme-anim')
    window.clearTimeout(setTheme.t)
    setTheme.t = window.setTimeout(() => root.classList.remove('theme-anim'), 650)
    setThemeState(id)
  }, [])

  const cycle = useCallback(() => {
    const i = THEMES.findIndex((t) => t.id === theme)
    setTheme(THEMES[(i + 1) % THEMES.length].id)
  }, [theme, setTheme])

  return <ThemeContext.Provider value={{ theme, setTheme, cycle }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
