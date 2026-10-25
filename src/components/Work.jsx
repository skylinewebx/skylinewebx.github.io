import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion, useAnchorClick } from '../lib/scroll'
import { projects } from '../data/projects'
import BinaryStrip from './ui/BinaryStrip'
import ProjectIndex from './ProjectIndex'
import BrandMark from './ui/BrandMark'

const WORD = 'PROJECTS'
const code = (i, n) => `#SWX-${String(i + 1).padStart(2, '0')}/${String(n).padStart(2, '0')}`

/* ------------------------------------------------------------------
   1 · Paper grid with a pill-shaped window; the word scrolls inside it
------------------------------------------------------------------- */
function Pill() {
  const ref = useRef(null)
  const word = useRef(null)
  useEffect(() => {
    if (prefersReducedMotion()) return undefined
    const ctx = gsap.context(() => {
      gsap.fromTo(word.current, { yPercent: 18 }, { yPercent: -62, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 0.8 } })
    }, ref)
    return () => ctx.revert()
  }, [])
  return (
    <div ref={ref} className="paper relative h-[92vh] min-h-[560px] overflow-hidden border-t border-border bg-background">
      <div className="absolute left-1/2 top-1/2 h-[78%] w-[clamp(120px,15vw,190px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-border p-[6px]">
        <div className="inverse dots relative h-full w-full overflow-hidden rounded-full bg-foreground">
          <div ref={word} className="display extrude absolute inset-x-0 top-0 flex flex-col items-center text-[clamp(5rem,9.5vw,8rem)] leading-[0.92]" aria-hidden="true">
            {(WORD + WORD).split('').map((l, i) => (
              <span key={i}>{l}</span>
            ))}
          </div>
        </div>
      </div>
      <p className="meta absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-background px-3 py-1">Selected work · {String(projects.length).padStart(2, '0')} websites</p>
    </div>
  )
}

/* ------------------------------------------------------------------
   2 · Pinned letter wall; captioned project cards fly across in two lanes
------------------------------------------------------------------- */
function Wall() {
  const ref = useRef(null)
  const grid = useRef(null)
  const onAnchor = useAnchorClick()
  const colsFor = () => (window.innerWidth >= 1280 ? 10 : window.innerWidth >= 768 ? 7 : 4)
  const [cols, setCols] = useState(colsFor)
  const reduce = prefersReducedMotion()

  useEffect(() => {
    const set = () => setCols(colsFor())
    window.addEventListener('resize', set)
    return () => window.removeEventListener('resize', set)
  }, [])

  useEffect(() => {
    if (reduce) return undefined
    const el = ref.current
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('[data-card]')
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: el, start: 'top top', end: () => `+=${cards.length * 55}%`, pin: true, anticipatePin: 1, scrub: 1, invalidateOnRefresh: true },
      })
      // Letters drift up through the word and columns sway.
      tl.fromTo(grid.current, { yPercent: 0 }, { yPercent: -30, duration: cards.length }, 0)
      gsap.utils.toArray('[data-wall-col]').forEach((c, i) => {
        tl.fromTo(c, { y: i % 2 ? -18 : 18 }, { y: i % 2 ? 26 : -26, duration: cards.length }, 0)
      })
      // Cards cross the screen, alternating direction and lane.
      cards.forEach((card, i) => {
        const fromRight = i % 2 === 0
        const w = () => card.offsetWidth
        // Park waiting/finished cards fully off-screen. On wide (laptop) cards the rotateY perspective pulls
        // the near edge ~14px back into view, so they get a little extra clearance there; phones keep 40px.
        const edge = () => 40 + (window.innerWidth >= 1024 ? Math.round(w() * 0.1) : 0)
        tl.fromTo(
          card,
          { x: () => (fromRight ? window.innerWidth + edge() : -w() - edge()), rotateY: fromRight ? -16 : 16, rotateZ: fromRight ? 2 : -2 },
          { x: () => (fromRight ? -w() - edge() : window.innerWidth + edge()), rotateY: fromRight ? 10 : -10, rotateZ: fromRight ? -1 : 1, duration: 2.2 },
          i * 0.95,
        )
      })
      // Exit: the columns squeeze together.
      tl.to(grid.current, { scaleX: 0.55, duration: 0.8, ease: 'power2.in' }, cards.length - 0.6)
    }, el)
    // Rebuilt after other pins exist (e.g. on resize): restore page order so later pins account for this one.
    ScrollTrigger.sort()
    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [reduce, cols])

  return (
    <div ref={ref} className="inverse dots relative h-[100svh] min-h-[600px] overflow-hidden bg-foreground" aria-label="Project wall">
      {/* Letter wall: the wrapper and each column are their own GPU layers, so the scroll-scrubbed
          drift / sway / squeeze never re-rasterises the heavy extruded glyphs. */}
      <div ref={grid} className="absolute inset-x-0 top-0 flex origin-center justify-between will-change-transform" aria-hidden="true">
        {Array.from({ length: cols }).map((_, c) => (
          <div key={c} data-wall-col className="display extrude flex flex-col items-center will-change-transform text-[clamp(6.5rem,20vh,13rem)] leading-[0.95] lg:text-[clamp(8rem,27vh,17rem)]">
            {(WORD + WORD.slice(0, 4)).split('').map((l, r) => (
              <span key={r}>{l}</span>
            ))}
          </div>
        ))}
      </div>

      {/* Flying cards (static grid when motion is reduced) */}
      <div className={reduce ? 'frame relative grid grid-cols-1 gap-6 px-[var(--gutter)] py-16 sm:grid-cols-2 lg:grid-cols-3' : 'absolute inset-0 [perspective:1400px]'}>
        {projects.map((p, i) => (
          <a
            key={p.slug}
            data-card
            href={`#project-${p.slug}`}
            onClick={onAnchor}
            data-cursor="View"
            className={`group block ${reduce ? '' : `absolute left-0 w-[min(78vw,470px)] will-change-transform lg:w-[min(44vw,58vh,680px)] ${i % 2 === 0 ? 'top-[14%] lg:top-[15%]' : 'top-[52%] lg:top-[54%]'}`}`}
          >
            <div className="overflow-hidden border border-background/20 bg-background shadow-[0_40px_80px_-30px_rgb(0_0_0/0.7)]">
              <img src={p.image?.desktopSm} alt={p.image?.alt ?? p.title} width={720} height={450} loading="eager" fetchpriority="low" decoding="async" className="aspect-[16/10] w-full object-cover object-top" />
            </div>
            <span className="meta mt-2.5 flex items-center justify-between gap-3 text-[9.5px] text-background">
              <span className="flex min-w-0 items-center gap-2.5">
                <BrandMark project={p} size="sm" className="group-hover:-translate-y-0.5" />
                <span className="truncate">{p.category.split(' / ')[0]}</span>
              </span>
              <span className="opacity-70">{code(i, projects.length)}</span>
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}

export default function Work() {
  return (
    <section id="work" aria-labelledby="work-heading">
      <h2 id="work-heading" className="sr-only">
        Work
      </h2>
      <div className="frame">
        <BinaryStrip />
      </div>
      <Pill />
      <Wall />
      <ProjectIndex />
    </section>
  )
}
