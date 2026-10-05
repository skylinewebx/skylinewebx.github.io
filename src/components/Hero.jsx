import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import MagneticButton from './ui/MagneticButton'
import LocalTime from './ui/LocalTime'
import { RevealLines, EASE } from './ui/Reveal'
import { brand, hero } from '../data/site'
import { useAnchorClick } from '../lib/scroll'

/** Lens over the blueprint grid that follows the cursor (fine pointers only). */
function useGridLens(sectionRef, lensRef) {
  useEffect(() => {
    const section = sectionRef.current
    const lens = lensRef.current
    if (!section || !lens) return undefined
    if (!window.matchMedia('(pointer: fine)').matches) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    let frame = 0
    let tx = 0
    let ty = 0
    let cx = 0
    let cy = 0
    const tick = () => {
      cx += (tx - cx) * 0.14
      cy += (ty - cy) * 0.14
      lens.style.setProperty('--mx', `${cx}px`)
      lens.style.setProperty('--my', `${cy}px`)
      frame = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.5 ? requestAnimationFrame(tick) : 0
    }
    const onMove = (e) => {
      const r = section.getBoundingClientRect()
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
    section.addEventListener('pointermove', onMove)
    section.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      section.removeEventListener('pointermove', onMove)
      section.removeEventListener('pointerleave', onLeave)
    }
  }, [sectionRef, lensRef])
}

function renderTitleLine(line) {
  const at = line.indexOf(hero.accentPhrase)
  if (at === -1) return line
  return (
    <>
      {line.slice(0, at)}
      <span className="text-accent">{hero.accentPhrase}</span>
    </>
  )
}

export default function Hero({ ready }) {
  const reduce = useReducedMotion()
  const sectionRef = useRef(null)
  const lensRef = useRef(null)
  const onAnchor = useAnchorClick()
  useGridLens(sectionRef, lensRef)

  const fade = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
          transition: { duration: 0.8, ease: EASE, delay },
        }

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col overflow-hidden pt-[var(--nav-h)]"
      aria-labelledby="hero-title"
    >
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div ref={lensRef} className="hero-grid-lens pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="container-site relative flex flex-1 flex-col justify-between gap-12 pb-10 pt-10 md:pb-14 md:pt-16">
        {/* Top meta row */}
        <motion.div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3" {...fade(0.1)}>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 py-1.5 pl-3 pr-4 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-ink">
            <span className="pulse-dot relative inline-block h-1.5 w-1.5 rounded-full bg-accent text-accent" aria-hidden="true" />
            {hero.status}
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            {brand.location} <span className="mx-1.5 text-line" aria-hidden="true">/</span>
            <LocalTime />
          </p>
        </motion.div>

        {/* Headline */}
        <div>
          <p className="eyebrow mb-6 md:mb-8">
            <span className="sr-only">{brand.owner} — </span>
            {brand.name} — Web design &amp; development studio
          </p>
          <h1 id="hero-title" className="display" aria-label={hero.title.join(' ')}>
            {/* Two line-break sets: phone and tablet/desktop. */}
            <span aria-hidden="true" className="block text-[clamp(2.1rem,11vw,4.5rem)] md:hidden">
              <RevealLines
                lines={hero.titleMobile}
                animate={reduce ? undefined : ready}
                delay={0.05}
                stagger={0.08}
                renderLine={renderTitleLine}
              />
            </span>
            <span aria-hidden="true" className="hidden text-[clamp(3.5rem,8.6vw,9.75rem)] md:block">
              <RevealLines
                lines={hero.title}
                animate={reduce ? undefined : ready}
                delay={0.05}
                stagger={0.09}
                renderLine={renderTitleLine}
              />
            </span>
          </h1>
        </div>

        {/* Bottom row: copy + CTAs / pillars */}
        <div className="grid gap-10 border-t border-line pt-8 lg:grid-cols-12 lg:gap-8">
          <motion.div className="lg:col-span-6" {...fade(0.45)}>
            <p className="lede max-w-[34rem] text-pretty text-ink/80">{hero.copy}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <MagneticButton href="#contact" onClick={onAnchor} className="btn btn-accent">
                Start a Project
                <ArrowUpRight size={17} strokeWidth={1.75} aria-hidden="true" />
              </MagneticButton>
              <MagneticButton href="#work" onClick={onAnchor} className="btn btn-ghost">
                View Work
                <ArrowDownRight size={17} strokeWidth={1.75} aria-hidden="true" />
              </MagneticButton>
            </div>
          </motion.div>

          <motion.ol
            className="grid max-w-[520px] grid-cols-3 gap-4 self-end lg:col-span-4 lg:col-start-9 lg:max-w-none"
            aria-label="What Skyline Webx brings together"
            {...fade(0.55)}
          >
            {hero.pillars.map((p, i) => (
              <li key={p} className="border-l border-line pl-3 sm:pl-4">
                <span className="block font-mono text-[11px] text-accent">0{i + 1}</span>
                <span className="mt-2 block font-display text-[14px] font-medium leading-tight tracking-[-0.01em] sm:text-[15px]">
                  {p}
                </span>
              </li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  )
}
