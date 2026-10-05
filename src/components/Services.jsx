import { ArrowUpRight } from 'lucide-react'
import { services } from '../data/site'
import SectionHead from './SectionHead'
import { Reveal, RevealLines } from './ui/Reveal'

/** Sticky heading + editorial numbered list. Hover sweeps a panel in behind the row. */
export default function Services() {
  return (
    <section id="services" className="border-t border-border" aria-labelledby="services-title">
      <div className="frame">
        <SectionHead index="04" label="Services" aside={`(${String(services.length).padStart(2, '0')}) services`} />
        <div className="grid lg:grid-cols-12">
          <div className="pad border-b border-border py-10 lg:col-span-4 lg:border-b-0 lg:py-14">
            <div className="lg:sticky lg:top-[calc(var(--nav-h)+40px)]">
              <h2 id="services-title" className="display text-[clamp(3.5rem,9vw,7.5rem)]">
                <RevealLines lines={['What', 'I build']} stagger={0.08} />
              </h2>
              <Reveal delay={0.1}>
                <p className="lede mt-6 max-w-[32ch] text-pretty">
                  Design, development and AI assistants for businesses that want their website to feel as considered as their work.
                </p>
              </Reveal>
            </div>
          </div>

          <ol className="lg:col-span-8 lg:border-l lg:border-border">
            {services.map((s, i) => (
              <Reveal as="li" key={s.title} y={12} delay={Math.min(i * 0.03, 0.15)} className="border-b border-border last:border-b-0">
                <div className="group relative isolate overflow-hidden">
                  <span
                    className="absolute inset-0 -z-10 origin-left scale-x-0 bg-surface transition-transform duration-500 ease-out [@media(hover:hover)]:group-hover:scale-x-100"
                    aria-hidden="true"
                  />
                  <span
                    className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 bg-accent transition-transform duration-500 ease-out [@media(hover:hover)]:group-hover:scale-y-100"
                    aria-hidden="true"
                  />
                  <div className="pad grid grid-cols-[2.25rem_1fr] gap-x-4 gap-y-2 py-6 md:grid-cols-[3rem_1.1fr_1fr_auto] md:items-center md:gap-x-8 md:py-7">
                    <span className="meta pt-1 text-muted transition-colors duration-300 group-hover:text-accent md:pt-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="display text-[clamp(1.75rem,3vw,2.6rem)] transition-transform duration-500 ease-out [@media(hover:hover)]:group-hover:translate-x-2">
                      {s.title}
                    </h3>
                    <p className="col-start-2 max-w-[44ch] text-[14.5px] leading-relaxed text-muted md:col-start-auto">{s.description}</p>
                    <ArrowUpRight
                      size={18}
                      strokeWidth={1.5}
                      className="hidden text-muted transition-all duration-500 group-hover:rotate-45 group-hover:text-accent md:block"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
