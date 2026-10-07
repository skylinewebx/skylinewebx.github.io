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
    let id = 0
    const run = () => {
      nodes.forEach((n) => (n.textContent = bits(Number(n.dataset.bits))))
    }
    const io = new IntersectionObserver(([e]) => {
      clearInterval(id)
      if (e.isIntersecting) id = setInterval(run, 140)
    })
    io.observe(el)
    return () => {
      io.disconnect()
      clearInterval(id)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`flex h-7 items-center gap-3 overflow-hidden whitespace-nowrap border-y border-border px-3 font-mono text-[9px] leading-none tracking-[0.06em] ${className}`}
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
