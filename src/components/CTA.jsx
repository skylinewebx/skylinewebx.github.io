import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { brand, cta } from '../data/site'
import { RevealLines, Reveal } from './ui/Reveal'
import { useAnchorClick } from '../lib/scroll'

/** Accent band: giant type over a ruled row of actions (no floating button in empty space). */
export default function CTA() {
  const onAnchor = useAnchorClick()
  return (
    <section className="relative overflow-hidden border-t border-border bg-accent text-accent-foreground" aria-labelledby="cta-title">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />
      <div className="frame relative border-accent-foreground/20">
        <div className="pad py-12 md:py-16">
          <Reveal>
            <p className="meta opacity-70">05 / Next step</p>
          </Reveal>
          <h2 id="cta-title" className="display mt-8 text-[clamp(2.9rem,8.6vw,8.75rem)]">
            <RevealLines lines={cta.title} stagger={0.09} />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-[40ch] text-[17px] leading-relaxed opacity-80">{cta.copy}</p>
          </Reveal>
        </div>

        <div className="grid border-t border-accent-foreground/20 md:grid-cols-3">
          <a
            href="#contact"
            onClick={onAnchor}
            className="group flex min-h-[88px] items-center justify-between gap-4 bg-accent-foreground px-[var(--gutter)] py-6 text-accent transition-colors duration-300 hover:bg-foreground hover:text-background"
          >
            <span className="display text-[clamp(1.75rem,2.6vw,2.4rem)]">Start a Project</span>
            <ArrowUpRight size={26} strokeWidth={1.5} aria-hidden="true" className="transition-transform duration-500 group-hover:rotate-45" />
          </a>
          <a
            href="#work"
            onClick={onAnchor}
            className="group flex min-h-[88px] items-center justify-between gap-4 border-t border-accent-foreground/20 px-[var(--gutter)] py-6 transition-colors duration-300 hover:bg-accent-foreground/10 md:border-l md:border-t-0"
          >
            <span className="display text-[clamp(1.75rem,2.6vw,2.4rem)]">View Work</span>
            <ArrowDownRight size={26} strokeWidth={1.5} aria-hidden="true" className="transition-transform duration-500 group-hover:translate-y-1" />
          </a>
          <a
            href={`mailto:${brand.email}`}
            className="group flex min-h-[88px] items-center justify-between gap-4 border-t border-accent-foreground/20 px-[var(--gutter)] py-6 transition-colors duration-300 hover:bg-accent-foreground/10 md:border-l md:border-t-0"
          >
            <span>
              <span className="meta block opacity-70">Email</span>
              <span className="mt-1 block text-[16px] font-medium">{brand.email}</span>
            </span>
            <ArrowUpRight size={20} strokeWidth={1.5} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
