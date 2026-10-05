import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { projects } from '../data/projects'
import { useAnchorClick } from '../lib/scroll'

/**
 * A strip of real project screenshots that slides sideways as you scroll
 * (tied to scroll, never auto-playing). Each tile jumps to its case study.
 */
export default function Reel() {
  const ref = useRef(null)
  const track = useRef(null)
  const [dist, setDist] = useState(0)
  const reduce = useReducedMotion()
  const onAnchor = useAnchorClick()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // Travel exactly far enough to bring the last tile into view.
  useEffect(() => {
    const measure = () => setDist(Math.max(0, (track.current?.scrollWidth ?? 0) - window.innerWidth))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(track.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])
  const x = useTransform(scrollYProgress, [0.15, 0.85], reduce ? [0, 0] : [0, -dist])

  return (
    <div ref={ref} className={`border-b border-border py-6 md:py-8 ${reduce ? "overflow-x-auto" : "overflow-hidden"}`} aria-label="Recent work">
      <motion.ul ref={track} className="flex w-max gap-3 px-[var(--gutter)] md:gap-4" style={{ x }}>
        {projects.map((p, i) => (
          <li key={p.slug} className="w-[min(72vw,420px)] shrink-0">
            <a href={`#project-${p.slug}`} onClick={onAnchor} data-cursor="Open" className="group block">
              <div className="aspect-[16/10] overflow-hidden rounded-[6px] border border-border bg-surface">
                {p.image ? (
                  <img
                    src={p.image.desktopSm}
                    alt={p.image.alt}
                    width={720}
                    height={450}
                    loading={i < 3 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                ) : (
                  <div className="hatch h-full w-full" />
                )}
              </div>
              <p className="meta mt-2.5 flex items-center justify-between text-muted">
                <span>
                  <span className="text-accent">{String(i + 1).padStart(2, '0')}</span>
                  <span className="ml-2 text-foreground">{p.title}</span>
                </span>
                <span className="hidden sm:inline">{p.category.split(' / ')[0]}</span>
              </p>
            </a>
          </li>
        ))}
      </motion.ul>
    </div>
  )
}
