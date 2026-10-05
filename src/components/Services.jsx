import { ArrowUpRight } from 'lucide-react'
import { services } from '../data/site'
import SectionHeading from './SectionHeading'
import { Reveal } from './ui/Reveal'

/**
 * Editorial numbered rows. On hover (fine pointers) an ink panel sweeps up
 * behind the row and the type inverts; on touch the rows are simply static.
 */
export default function Services() {
  return (
    <section id="services" className="section" aria-labelledby="services-title">
      <div className="container-site">
        <SectionHeading
          id="services-title"
          index="02"
          label="Services"
          title={<span className="uppercase">What I build</span>}
          intro="Design and development for businesses that want their website to feel as considered as the work they do."
          aside={`${String(services.length).padStart(2, '0')} services`}
        />

        <ol className="mt-14 border-t border-line md:mt-20">
          {services.map((s, i) => (
            <Reveal as="li" key={s.title} y={16} delay={Math.min(i * 0.03, 0.15)} className="border-b border-line">
              <div className="group relative isolate -mx-[var(--gutter)] overflow-hidden px-[var(--gutter)]">
                <span
                  className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-ink transition-transform duration-500 ease-out [@media(hover:hover)]:group-hover:scale-y-100"
                  aria-hidden="true"
                />
                <div className="grid grid-cols-[2.5rem_1fr] gap-x-4 gap-y-3 py-7 transition-colors duration-300 md:grid-cols-12 md:items-center md:gap-8 md:py-9 [@media(hover:hover)]:group-hover:text-paper">
                  <span className="pt-1 font-mono text-[12px] text-accent md:col-span-1 md:pt-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-[clamp(1.5rem,3.3vw,2.75rem)] font-medium leading-[1.02] tracking-[-0.03em] transition-transform duration-500 ease-out md:col-span-5 [@media(hover:hover)]:group-hover:translate-x-3">
                    {s.title}
                  </h3>
                  <div className="col-start-2 md:col-span-5 md:col-start-auto">
                    <p className="max-w-[46ch] text-[15px] leading-relaxed text-muted transition-colors duration-300 [@media(hover:hover)]:group-hover:text-paper/70">
                      {s.description}
                    </p>
                    <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-muted/80 transition-colors duration-300 [@media(hover:hover)]:group-hover:text-paper/50">
                      {s.tags.join(' · ')}
                    </p>
                  </div>
                  <span
                    className="hidden justify-self-end md:col-span-1 md:block"
                    aria-hidden="true"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-full border border-line transition-all duration-500 ease-out [@media(hover:hover)]:group-hover:rotate-45 [@media(hover:hover)]:group-hover:border-accent [@media(hover:hover)]:group-hover:bg-accent">
                      <ArrowUpRight size={18} strokeWidth={1.5} />
                    </span>
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
