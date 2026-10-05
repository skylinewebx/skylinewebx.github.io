import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Minimal desktop cursor label. Any element with data-cursor="VIEW" (or "OPEN", "DEMO"…)
 * shows a small disc with that word while hovered. Fine pointers only; off for reduced motion.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [label, setLabel] = useState('')
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 })

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setEnabled(fine.matches && !reduce.matches)
    update()
    fine.addEventListener('change', update)
    reduce.addEventListener('change', update)
    return () => {
      fine.removeEventListener('change', update)
      reduce.removeEventListener('change', update)
    }
  }, [])

  useEffect(() => {
    if (!enabled) return undefined
    document.documentElement.classList.add('has-cursor')
    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const el = e.target.closest?.('[data-cursor]')
      setLabel(el ? el.getAttribute('data-cursor') : '')
    }
    const onLeave = () => setLabel('')
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [enabled, x, y])

  if (!enabled) return null
  return (
    <motion.div data-cursor-disc className="pointer-events-none fixed left-0 top-0 z-[90]" style={{ x: sx, y: sy }} aria-hidden="true">
      <AnimatePresence>
        {label && (
          <motion.div
            key="disc"
            className="meta -ml-11 -mt-11 grid h-[88px] w-[88px] place-items-center rounded-full bg-accent text-accent-foreground"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
