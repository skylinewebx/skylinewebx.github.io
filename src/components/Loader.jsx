import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { logoSrc } from './Logo'
import { brand } from '../data/site'
import { EASE } from './ui/Reveal'

const CURTAIN = [0.76, 0, 0.24, 1]

/**
 * ~1.3s logo reveal: the mark unmasks from its centre and settles, the name
 * rises, a counter runs to 100, then the panel lifts away to uncover the hero.
 */
export default function Loader({ duration = 1100 }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const start = performance.now()
    let frame
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration)
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100))
      if (p < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [duration])

  return (
    <motion.div
      data-loader
      className="fixed inset-0 z-[100] flex flex-col bg-background text-foreground"
      exit={{ clipPath: 'inset(0% 0% 100% 0%)', transition: { duration: 0.75, ease: CURTAIN } }}
      style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      aria-hidden="true"
    >
      <div className="grid-bg absolute inset-0 opacity-60" />

      <div className="relative grid flex-1 place-items-center">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ clipPath: 'circle(0% at 50% 50%)', scale: 0.86, y: 10 }}
            animate={{ clipPath: 'circle(75% at 50% 50%)', scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <img src={logoSrc} alt="" width={96} height={96} className="block h-24 w-24 rounded-[22%]" />
          </motion.div>
          <div className="mt-6 overflow-hidden">
            <motion.p
              className="display text-[34px]"
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
            >
              {brand.name}
            </motion.p>
          </div>
        </div>
      </div>

      <div className="frame pad relative flex h-14 items-center justify-between border-t border-border">
        <span className="meta text-muted">{brand.location}</span>
        <span className="meta tabular-nums">{String(count).padStart(3, '0')}</span>
      </div>
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-accent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: duration / 1000, ease: [0.33, 1, 0.68, 1] }}
      />
    </motion.div>
  )
}
