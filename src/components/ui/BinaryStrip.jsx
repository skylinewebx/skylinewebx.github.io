import { useEffect, useRef } from 'react'

const bits = (n) => Array.from({ length: n }, () => (Math.random() > 0.5 ? '1' : '0')).join('')

/**
 * ▸ 0101…  //////  0110…  ◂ — a ruled data strip whose digits keep flickering.
 * Updates text nodes directly (no React re-render) and pauses off-screen.
 */
export default function BinaryStrip({ className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    const nodes = el.querySelectorAll('[data-bits]')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    // Mutate each existing text node's data in place: unlike textContent this
    // inserts no new nodes, so a tick costs a tiny contained repaint instead of
    // a style recalc (the nav strip is on screen the whole time).
    const texts = [...nodes].map((n) => {
      if (!n.firstChild) n.textContent = bits(Number(n.dataset.bits))
      return [n.firstChild, Number(n.dataset.bits)]
    })
    let id = 0
    let onScreen = false
    const run = () => texts.forEach(([t, len]) => (t.data = bits(len)))
    const sync = () => {
      clearInterval(id)
      id = onScreen && !document.hidden ? setInterval(run, 140) : 0
    }
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting
      sync()
    })
    io.observe(el)
    document.addEventListener('visibilitychange', sync)
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', sync)
      clearInterval(id)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`flex h-7 items-center gap-3 overflow-hidden whitespace-nowrap [contain:layout_paint] border-y border-border px-3 font-mono text-[9px] leading-none tracking-[0.06em] ${className}`}
      aria-hidden="true"
    >
      <span>▸</span>
      <span data-bits="16">{bits(16)}</span>
      <span className="min-w-0 flex-1 overflow-hidden">{'/'.repeat(160)}</span>
      <span data-bits="16" className="hidden sm:inline">
        {bits(16)}
      </span>
      <span className="hidden min-w-0 flex-1 overflow-hidden lg:inline">{'/'.repeat(160)}</span>
      <span data-bits="18">{bits(18)}</span>
      <span>◂</span>
    </div>
  )
}
