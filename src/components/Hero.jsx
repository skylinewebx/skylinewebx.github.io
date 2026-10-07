import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import WarpGrid from './ui/WarpGrid'
import BinaryStrip from './ui/BinaryStrip'
import { brand, hero } from '../data/site'
import { useAnchorClick } from '../lib/scroll'

const EASE = [0.22, 1, 0.36, 1]
const POP = [0.34, 1.56, 0.64, 1]

function Sparkle({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 0c.6 6.6 5.4 11.4 12 12-6.6.6-11.4 5.4-12 12-.6-6.6-5.4-11.4-12-12C6.6 11.4 11.4 6.6 12 0z" fill="currentColor" />
    </svg>
  )
}

/** Live Houston time with seconds, like a system clock. */
function useClock() {
  const fmt = () =>
    new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: brand.timezone }).format(new Date())
  const [t, setT] = useState(fmt)
  useEffect(() => {
    const id = setInterval(() => setT(fmt()), 1000)
    return () => clearInterval(id)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return t
}

/** Measured frame rate, sampled twice a second while the panel is on screen. */
function useFps(ref) {
  const [fps, setFps] = useState('60.0')
  useEffect(() => {
    let raf = 0
    let frames = 0
    let last = performance.now()
    const loop = (now) => {
      frames++
      if (now - last >= 500) {
        setFps(Math.min(120, (frames * 1000) / (now - last)).toFixed(1))
        frames = 0
        last = now
      }
      raf = requestAnimationFrame(loop)
    }
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf)
      if (e.isIntersecting) {
        frames = 0
        last = performance.now()
        raf = requestAnimationFrame(loop)
      }
    })
    io.observe(ref.current)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [ref])
  return fps
}

function Monitor({ ready }) {
  const ref = useRef(null)
  const time = useClock()
  const fps = useFps(ref)
  const rows = [
    ['Loc', `Houston, US [${time}]`],
    ['Status', hero.status, true],
    ['Core', 'React, GSAP, Tailwind'],
    ['Focus', 'Websites + chatbots'],
  ]
  return (
    <motion.div
      ref={ref}
      className="hard"
      initial={{ opacity: 0, y: 16 }}
      animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.55 }}
    >
      <div className="flex h-9 items-center justify-between bg-foreground px-4 text-background">
        <span className="meta text-[9.5px]">Studio monitor</span>
        <span className="pulse-dot relative h-1.5 w-1.5 rounded-full bg-background text-background" aria-hidden="true" />
      </div>
      <dl className="space-y-2.5 px-4 py-4 font-mono text-[10.5px] uppercase tracking-[0.08em]">
        {rows.map(([k, v, strong]) => (
          <div key={k} className="grid grid-cols-[5.5rem_1fr] gap-3">
            <dt className="text-muted">{k}:</dt>
            <dd className={strong ? 'font-semibold' : ''}>{v}</dd>
          </div>
        ))}
        <div className="pt-1 text-muted tabular-nums" aria-hidden="true">
          {fps} FPS
        </div>
      </dl>
    </motion.div>
  )
}

export default function Hero({ ready }) {
  const reduce = useReducedMotion()
  const onAnchor = useAnchorClick()
  const show = (delay, from = { opacity: 0, y: 16 }) =>
    reduce
      ? {}
      : { initial: from, animate: ready ? { opacity: 1, y: 0, scale: 1 } : from, transition: { duration: 0.7, ease: EASE, delay } }

  const chipPos = ['translate-x-0', 'sm:translate-x-6 translate-y-1', '-translate-y-1 translate-x-4 sm:translate-x-10', 'sm:translate-x-3']

  return (
    <section id="top" className="relative pt-[calc(var(--nav-h)+28px)]" aria-labelledby="hero-title">
      <div className="frame relative grid border-b border-border lg:grid-cols-12">
        {/* Left: identity + headline */}
        <div className="relative overflow-hidden lg:col-span-7 lg:border-r lg:border-border">
          <WarpGrid alpha={0.13} cell={56} />
          <div className="pad relative pb-10 pt-9 md:pb-14 md:pt-14">
            <motion.p className="meta text-muted" {...show(0.25)}>
              Portfolio ’26 <span className="mx-2">/</span> Design &amp; code
            </motion.p>

            <h1 id="hero-title" className="display mt-5 text-[clamp(1.95rem,10.2vw,4.4rem)] md:text-[8.4vw] lg:text-[clamp(3.4rem,5.9vw,5.3rem)]" aria-label={hero.title.join(' ')}>
              {hero.title.map((line, i) => (
                <span key={line} className="block overflow-hidden pb-[0.04em]" aria-hidden="true">
                  <motion.span
                    className="flex items-center gap-[0.18em]"
                    initial={reduce ? false : { y: '105%' }}
                    animate={reduce ? undefined : ready ? { y: '0%' } : { y: '105%' }}
                    transition={{ duration: 0.95, ease: EASE, delay: 0.3 + i * 0.09 }}
                  >
                    {line.includes(hero.accentWord) ? (
                      <>
                        {line.replace(hero.accentWord, '')}
                        <span className="text-accent">{hero.accentWord}</span>
                      </>
                    ) : (
                      line
                    )}
                    {i === 0 && (
                      <motion.span
                        className="inline-block w-[0.42em] shrink-0"
                        initial={reduce ? false : { rotate: -180, scale: 0 }}
                        animate={reduce ? undefined : ready ? { rotate: 0, scale: 1 } : { rotate: -180, scale: 0 }}
                        transition={{ duration: 1, ease: EASE, delay: 0.75 }}
                      >
                        <Sparkle className="h-full w-full" />
                      </motion.span>
                    )}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p className="serif mt-6 max-w-[34rem] text-[clamp(1.15rem,1.55vw,1.35rem)] leading-[1.35]" {...show(0.55)}>
              {hero.copy} Move your cursor to bend the grid.
            </motion.p>

            <ul className="mt-8 grid max-w-[30rem] grid-cols-2 gap-x-3 gap-y-4 sm:max-w-[34rem]" aria-label="What the studio does">
              {hero.chips.map((c, k) => (
                <motion.li
                  key={c}
                  className={chipPos[k]}
                  initial={reduce ? false : { opacity: 0, scale: 0.6 }}
                  animate={reduce ? undefined : ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.55, ease: POP, delay: 0.75 + k * 0.12 }}
                >
                  <span className="chip bg-background">
                    <span aria-hidden="true">+</span>
                    {c}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: monitor + actions */}
        <div className="pad flex flex-col justify-between gap-10 border-t border-border py-9 md:py-12 lg:col-span-5 lg:border-t-0 lg:py-14">
          <Monitor ready={ready || reduce} />
          <motion.div className="space-y-3" {...show(0.8)}>
            <a href="#work" onClick={onAnchor} className="bar bar-solid">
              View work
              <ArrowRight size={16} strokeWidth={1.75} className="arr" aria-hidden="true" />
            </a>
            <a href="#contact" onClick={onAnchor} className="bar bar-line">
              Start a project
              <ArrowRight size={16} strokeWidth={1.75} className="arr" aria-hidden="true" />
            </a>
            <p className="meta flex items-center justify-between pt-2 text-muted">
              <span>{brand.location}</span>
              <span className="hidden sm:inline">{hero.status}</span>
            </p>
          </motion.div>
        </div>
      </div>
      <div className="frame">
        <BinaryStrip className="border-t-0" />
      </div>
    </section>
  )
}
