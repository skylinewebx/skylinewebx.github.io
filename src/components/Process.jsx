import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { process } from '../data/site'
import { Reveal } from './ui/Reveal'

/** Vertical timeline; the accent rule fills as the visitor scrolls through the steps. */
export default function Process() {
  const listRef = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 70%', 'end 60%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  return (
    <section className="section bg-surface" aria-labelledby="process-title">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+48px)]">
            <Reveal className="mb-8 border-t border-ink pt-4">
              <p className="eyebrow text-ink">
                <span className="text-accent">04</span>
                <span className="mx-2 text-line" aria-hidden="true">
                  /
                </span>
                Process
              </p>
            </Reveal>
            <Reveal as="h2" id="process-title" className="h-section uppercase">
              How it works
            </Reveal>
            <Reveal delay={0.08}>
              <p className="lede mt-6 max-w-[38ch] text-pretty">
                A clear, four-step process — so you always know what is happening and what comes next.
              </p>
            </Reveal>
          </div>
        </div>

        <ol ref={listRef} className="relative lg:col-span-6 lg:col-start-7">
          <span className="absolute bottom-0 left-[11px] top-0 w-px bg-line" aria-hidden="true" />
          <motion.span
            className="absolute bottom-0 left-[11px] top-0 w-px origin-top bg-accent"
            style={{ scaleY: reduce ? 1 : fill }}
            aria-hidden="true"
          />
          {process.map((step, i) => (
            <Reveal as="li" key={step.title} className="relative pb-14 pl-14 last:pb-0 md:pb-20">
              <span
                className="absolute left-0 top-1.5 grid h-[23px] w-[23px] place-items-center rounded-full border border-line bg-surface"
                aria-hidden="true"
              >
                <span className="h-[7px] w-[7px] rounded-full bg-accent" />
              </span>
              <p className="font-mono text-[12px] text-accent">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-2 font-display text-[clamp(2.25rem,5vw,4.25rem)] font-medium uppercase leading-[0.95] tracking-[-0.035em]">
                {step.title}
              </h3>
              <p className="mt-4 max-w-[36ch] text-[16px] leading-relaxed text-muted">{step.copy}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
