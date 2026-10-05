import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import MagneticButton from './ui/MagneticButton'
import LocalTime from './ui/LocalTime'
import { RevealLines, EASE } from './ui/Reveal'
import { brand, hero } from '../data/site'
import { projects } from '../data/projects'
import { assistants } from '../data/assistants'
import { useAnchorClick } from '../lib/scroll'

/** Accent lens over the blueprint grid that follows the cursor (fine pointers only). */
function useGridLens(areaRef, lensRef) {
  useEffect(() => {
    const area = areaRef.current
    const lens = lensRef.current
    if (!area || !lens) return undefined
    if (!window.matchMedia('(pointer: fine)').matches) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    let frame = 0
    let tx = 0
    let ty = 0
    let cx = 0
    let cy = 0
    const tick = () => {
      cx += (tx - cx) * 0.16
      cy += (ty - cy) * 0.16
      lens.style.setProperty('--mx', `${cx}px`)
      lens.style.setProperty('--my', `${cy}px`)
      frame = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.5 ? requestAnimationFrame(tick) : 0
    }
    const onMove = (e) => {
      const r = area.getBoundingClientRect()
      tx = e.clientX - r.left
      ty = e.clientY - r.top
      if (!lens.classList.contains('is-active')) {
        cx = tx
        cy = ty
        lens.classList.add('is-active')
      }
      if (!frame) frame = requestAnimationFrame(tick)
    }
    const onLeave = () => lens.classList.remove('is-active')
    area.addEventListener('pointermove', onMove)
    area.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      area.removeEventListener('pointermove', onMove)
      area.removeEventListener('pointerleave', onLeave)
    }
  }, [areaRef, lensRef])
}

function renderLine(line) {
  const at = line.indexOf(hero.accentWord)
  if (at === -1) return line
  return (
    <>
      {line.slice(0, at)}
      <span className="text-accent">{hero.accentWord}</span>
    </>
  )
}

export default function Hero({ ready }) {
  const reduce = useReducedMotion()
  const areaRef = useRef(null)
  const lensRef = useRef(null)
  const onAnchor = useAnchorClick()
  useGridLens(areaRef, lensRef)

  const fade = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
          transition: { duration: 0.8, ease: EASE, delay },
        }

  const meta = [
    {
      key: 'status',
      node: (
        <span className="inline-flex items-center gap-2.5">
          <span className="pulse-dot relative inline-block h-1.5 w-1.5 rounded-full bg-accent text-accent" aria-hidden="true" />
          {hero.status}
        </span>
      ),
    },
    { key: 'loc', node: brand.location, className: 'lg:border-l' },
    { key: 'coords', node: brand.coordinates, className: 'hidden lg:flex lg:border-l' },
    {
      key: 'time',
      node: (
        <span>
          Local <LocalTime />
        </span>
      ),
      className: 'border-l',
    },
  ]

  return (
    <section id="top" className="relative pt-[var(--nav-h)]" aria-labelledby="hero-title">
      <div className="frame relative">
        {/* Meta bar */}
        <motion.ul
          className="grid grid-cols-[1fr_auto] border-b border-border lg:grid-cols-[1.4fr_1fr_1fr_1fr]"
          aria-label="Studio status"
          {...fade(0.1)}
        >
          {meta.map((m, i) => (
            <li
              key={m.key}
              className={`meta flex min-h-[44px] items-center border-border px-[var(--gutter)] py-2 ${m.className ?? ''} ${
                i === 0 ? 'col-span-2 border-b lg:col-span-1 lg:border-b-0' : ''
              }`}
            >
              {m.node}
            </li>
          ))}
        </motion.ul>

        {/* Headline over the blueprint grid */}
        <div ref={areaRef} className="relative overflow-hidden border-b border-border">
          <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden="true" />
          <div ref={lensRef} className="grid-lens pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="pad relative pb-8 pt-10 md:pb-12 md:pt-16">
            <h1 id="hero-title" className="display" aria-label={hero.title.join(' ')}>
              <span aria-hidden="true" className="block text-[clamp(3rem,19vw,7rem)] md:hidden">
                <RevealLines lines={hero.titleMobile} animate={reduce ? undefined : ready} delay={0.1} stagger={0.07} renderLine={renderLine} />
              </span>
              <span aria-hidden="true" className="hidden text-[clamp(4.5rem,11.4vw,11.5rem)] md:block">
                <RevealLines lines={hero.title} animate={reduce ? undefined : ready} delay={0.1} stagger={0.09} renderLine={renderLine} />
              </span>
            </h1>
          </div>
        </div>

        {/* Copy + CTAs | what we do */}
        <div className="grid border-b border-border lg:grid-cols-12">
          <motion.div className="pad py-8 md:py-10 lg:col-span-5" {...fade(0.5)}>
            <p className="max-w-[30rem] font-display text-[clamp(1.25rem,1.9vw,1.6rem)] font-medium leading-[1.25] tracking-[-0.015em] text-pretty">
              {hero.copy}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <MagneticButton href="#work" onClick={onAnchor} className="btn btn-solid">
                View Work
                <ArrowDownRight size={16} strokeWidth={1.75} aria-hidden="true" className="btn-arrow" />
              </MagneticButton>
              <MagneticButton href="#contact" onClick={onAnchor} className="btn btn-line">
                Start a Project
                <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" className="btn-arrow" />
              </MagneticButton>
            </div>
          </motion.div>

          <motion.ol className="grid grid-cols-1 border-t border-border sm:grid-cols-3 lg:col-span-7 lg:border-l lg:border-t-0" {...fade(0.6)}>
            {hero.pillars.map((p, i) => (
              <li
                key={p.title}
                className={`group flex items-end justify-between gap-4 px-[var(--gutter)] py-5 sm:flex-col sm:items-start sm:justify-between sm:py-8 ${
                  i > 0 ? 'border-t border-border sm:border-l sm:border-t-0' : ''
                }`}
              >
                <span className="meta text-accent">0{i + 1}</span>
                <span className="text-right sm:text-left">
                  <span className="display block text-[clamp(1.5rem,1.95vw,1.75rem)] transition-transform duration-500 group-hover:-translate-y-1">
                    {p.title}
                  </span>
                  <span className="mt-1 block text-[13.5px] text-muted">{p.copy}</span>
                </span>
              </li>
            ))}
          </motion.ol>
        </div>

        {/* Counts strip */}
        <motion.div className="pad flex flex-wrap items-center justify-between gap-x-8 gap-y-2 py-3" {...fade(0.7)}>
          <p className="meta text-muted">
            <span className="text-foreground">{String(projects.length).padStart(2, '0')}</span> websites
            <span className="mx-3 text-border" aria-hidden="true">
              /
            </span>
            <span className="text-foreground">{String(assistants.length).padStart(2, '0')}</span> AI assistants
          </p>
          <p className="meta hidden text-muted sm:block">Scroll to explore ↓</p>
        </motion.div>
      </div>
    </section>
  )
}
