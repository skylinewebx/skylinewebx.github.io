import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { cta } from '../data/site'
import { RevealLines, Reveal } from './ui/Reveal'
import MagneticButton from './ui/MagneticButton'
import { useAnchorClick } from '../lib/scroll'

export default function CTA() {
  const onAnchor = useAnchorClick()
  return (
    <section className="relative overflow-hidden bg-ink text-paper" aria-labelledby="cta-title">
      {/* Fine grid + accent horizon */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-1/2 left-1/2 h-[80%] w-[120%] -translate-x-1/2 rounded-[100%] bg-accent/25 blur-[120px]"
        aria-hidden="true"
      />

      <div className="container-site section relative">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper/60">
            <span className="text-accent">06</span>
            <span className="mx-2 text-paper/30" aria-hidden="true">
              /
            </span>
            Next step
          </p>
        </Reveal>
        <h2
          id="cta-title"
          className="display mt-10 text-[clamp(2.4rem,6.4vw,7.25rem)] uppercase md:mt-14"
        >
          <RevealLines
            lines={cta.title}
            stagger={0.1}
            renderLine={(line, i) => (i === 1 ? <span className="text-paper/45">{line}</span> : line)}
          />
        </h2>
        <div className="mt-12 flex flex-col gap-10 border-t border-white/15 pt-8 md:mt-16 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="max-w-[36ch] text-[17px] leading-relaxed text-paper/70">{cta.copy}</p>
          </Reveal>
          <Reveal delay={0.08} className="flex flex-col gap-3 sm:flex-row">
            <MagneticButton href="#contact" onClick={onAnchor} className="btn btn-accent hover:!bg-paper hover:!text-ink">
              Start a Project
              <ArrowUpRight size={17} strokeWidth={1.75} aria-hidden="true" />
            </MagneticButton>
            <MagneticButton href="#work" onClick={onAnchor} className="btn btn-on-dark">
              View Work
              <ArrowDownRight size={17} strokeWidth={1.75} aria-hidden="true" />
            </MagneticButton>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
