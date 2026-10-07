import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/scroll'
import { logoSrc } from './Logo'
import { brand } from '../data/site'

/** Organic blob as a clip-path polygon: radius R, centre (cx, cy) in px, wobble over time t. */
function blob(cx, cy, R, t, wobble) {
  const pts = []
  const N = 56
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2
    const r = R * (1 + wobble * (0.12 * Math.sin(3 * a + t) + 0.07 * Math.sin(5 * a - t * 1.3) + 0.05 * Math.sin(2 * a + t * 0.7)))
    pts.push(`${(cx + Math.cos(a) * r).toFixed(1)}px ${(cy + Math.sin(a) * r).toFixed(1)}px`)
  }
  return `polygon(${pts.join(',')})`
}

const Row = ({ label, children, align = 'left', sub }) => (
  <div className={align === 'right' ? 'text-right' : ''}>
    {label && <p className="meta mb-2 text-muted">{label}</p>}
    <p className="serif text-[clamp(2.1rem,7vw,5.6rem)] uppercase leading-[0.95] tracking-[-0.01em]">{children}</p>
    {sub && <p className="meta mt-3 text-muted">{sub}</p>}
  </div>
)

export default function Identity() {
  const section = useRef(null)
  const panel = useRef(null)
  const token = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return undefined
    const el = section.current
    const p = panel.current
    let progress = 0
    let shown = 0 // eased copy of progress, so the blob glides rather than steps
    let raf = 0
    let visible = false
    const start = performance.now()

    const render = () => {
      const w = el.clientWidth
      const h = el.clientHeight
      const diag = Math.hypot(w, h)
      shown += (progress - shown) * 0.16
      if (Math.abs(progress - shown) < 0.0005) shown = progress
      const e = gsap.parseEase('power2.inOut')(Math.min(1, shown / 0.85))
      const cx = w * (0.78 - 0.28 * e)
      const cy = h * (0.62 - 0.12 * e)
      const R = e * diag * 0.95
      p.style.clipPath = e >= 0.999 ? 'none' : blob(cx, cy, Math.max(R, 0.1), (performance.now() - start) / 900, 1 - e * 0.6)
    }
    const loop = () => {
      render()
      raf = visible || Math.abs(progress - shown) > 0.0005 ? requestAnimationFrame(loop) : 0
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: '+=160%',
        pin: true,
        anticipatePin: 1,
        scrub: true,
        onUpdate: (self) => {
          progress = self.progress
        },
        onToggle: (self) => {
          visible = self.isActive
          if (!raf) raf = requestAnimationFrame(loop)
        },
      })
      gsap.fromTo(token.current, { y: () => window.innerHeight * 0.55, rotate: -28 }, { y: () => -window.innerHeight * 0.6, rotate: 34, ease: 'none', scrollTrigger: { trigger: el, start: 'top top', end: '+=160%', scrub: 0.9 } })
    }, el)
    render()
    return () => {
      cancelAnimationFrame(raf)
      ctx.revert()
    }
  }, [])

  return (
    <section ref={section} className="inverse relative h-[100svh] min-h-[560px] overflow-hidden bg-foreground" aria-labelledby="identity-title">
      <h2 id="identity-title" className="sr-only">
        Identity
      </h2>
      <div ref={panel} className="absolute inset-0 bg-background text-foreground" style={{ clipPath: prefersReducedMotion() ? 'none' : 'circle(0px at 80% 60%)' }}>
        <div className="frame flex h-full flex-col justify-center gap-[clamp(1.2rem,4vh,3rem)] px-[var(--gutter)] pb-8 pt-[calc(var(--nav-h)+44px)]">
          <Row label="01 // Identity">{brand.owner}</Row>
          <Row align="right" sub="// Agency owner · Skyline Webx">
            Web designer
            <br />
            &amp; developer
          </Row>
          <Row label="02 // Location">Houston, United States</Row>
          <Row align="right" sub="// Design · Code · AI">
            Skyline Webx @ {brand.year}
          </Row>
        </div>
      </div>
      <img
        ref={token}
        src={logoSrc}
        alt=""
        width={64}
        height={64}
        className="pointer-events-none absolute left-[62%] top-[50%] z-10 motion-reduce:hidden h-12 w-12 rounded-[22%] shadow-[0_18px_40px_-10px_rgb(0_0_0/0.6)] md:h-16 md:w-16"
        aria-hidden="true"
      />
    </section>
  )
}
