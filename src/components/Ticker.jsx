import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ticker } from '../data/site'

/** Large outlined wordline that drifts with scroll — a rhythm break between sections. */
export default function Ticker({ items = ticker, reverse = false }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : reverse ? ['-30%', '0%'] : ['0%', '-30%'])
  const row = [...items, ...items, ...items]

  return (
    <div ref={ref} className="overflow-hidden border-y border-border bg-surface py-4 md:py-5" aria-hidden="true">
      <motion.p className="display flex w-max items-center gap-6 whitespace-nowrap text-[clamp(2rem,5vw,4.25rem)] md:gap-10" style={{ x }}>
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-6 md:gap-10">
            <span className={i % 2 ? 'text-transparent [-webkit-text-stroke:1px_rgb(var(--foreground))]' : ''}>{t}</span>
            <span className="text-accent">✦</span>
          </span>
        ))}
      </motion.p>
    </div>
  )
}
