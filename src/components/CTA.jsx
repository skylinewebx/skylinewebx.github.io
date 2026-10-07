import { useEffect, useRef } from 'react'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { gsap, prefersReducedMotion, useAnchorClick } from '../lib/scroll'
import { logoSrc } from './Logo'
import BinaryStrip from './ui/BinaryStrip'

/** Rays from the emblem to the edges of the frame. */
function Sunburst() {
  const rays = Array.from({ length: 36 }, (_, i) => (i / 36) * Math.PI * 2)
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <g stroke="rgb(var(--foreground))" strokeWidth="1" strokeOpacity="0.75">
        {rays.map((a, i) => (
          <line key={i} x1="50" y1="26" x2={50 + Math.cos(a) * 160} y2={26 + Math.sin(a) * 160} vectorEffect="non-scaling-stroke" />
        ))}
      </g>
    </svg>
  )
}

/**
 * "LET'S BUILD SOMETHING WORTH CHOOSING." set in perspective — the words lean
 * back toward the emblem, then rise and flatten as you scroll (pinned).
 */
export default function CTA() {
  const ref = useRef(null)
  const type = useRef(null)
  const emblem = useRef(null)
  const onAnchor = useAnchorClick()

  useEffect(() => {
    if (prefersReducedMotion()) return undefined
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top top', end: '+=110%', pin: true, anticipatePin: 1, scrub: 0.9 } })
      tl.fromTo(type.current, { rotateX: 42, scale: 0.62, yPercent: 12 }, { rotateX: 0, scale: 1.08, yPercent: -18, ease: 'none' }, 0)
      tl.fromTo(emblem.current, { rotate: -40, scale: 0.85 }, { rotate: 25, scale: 1.1, ease: 'none' }, 0)
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section aria-labelledby="cta-title">
      <div ref={ref} className="relative h-[100svh] min-h-[620px] overflow-hidden bg-background">
        <div className="frame relative h-full overflow-hidden">
          <Sunburst />
          <div ref={emblem} className="absolute left-1/2 top-[26%] grid h-[clamp(84px,11vw,130px)] w-[clamp(84px,11vw,130px)] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-border bg-background">
            <img src={logoSrc} alt="" width={64} height={64} className="h-1/2 w-1/2 rounded-[22%]" />
          </div>
          <div className="absolute inset-x-0 top-[40%] [perspective:700px]">
            <h2 id="cta-title" ref={type} className="display origin-top text-center leading-[0.84] [transform-style:preserve-3d]">
              <span className="block text-[clamp(2.4rem,7vw,5.5rem)]">Let’s build</span>
              <span className="block origin-center scale-x-[1.25] text-[clamp(3rem,11vw,9rem)]">Something</span>
              <span className="block text-[clamp(3.4rem,13vw,11rem)]">Worth</span>
              <span className="block text-[clamp(3.4rem,15vw,13rem)] text-accent">choosing.</span>
            </h2>
          </div>
        </div>
      </div>

      <div className="frame grid border-y border-border sm:grid-cols-2">
        <a href="#contact" onClick={onAnchor} className="bar bar-solid min-h-[76px] px-[var(--gutter)] text-[12px]">
          Start a project
          <ArrowRight size={18} strokeWidth={1.75} className="arr" aria-hidden="true" />
        </a>
        <a href="#work" onClick={onAnchor} className="bar min-h-[76px] border-t border-border px-[var(--gutter)] text-[12px] hover:bg-foreground hover:text-background sm:border-l sm:border-t-0">
          View work
          <ArrowDown size={18} strokeWidth={1.75} className="arr" aria-hidden="true" />
        </a>
      </div>
      <div className="frame">
        <BinaryStrip className="border-t-0" />
      </div>
    </section>
  )
}
