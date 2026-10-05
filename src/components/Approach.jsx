import { approach } from '../data/site'
import SectionHeading from './SectionHeading'
import { Reveal } from './ui/Reveal'

/** "Why Skyline Webx" — a ruled editorial grid, no icons, no claims. */
export default function Approach() {
  return (
    <section className="section" aria-labelledby="approach-title">
      <div className="container-site">
        <SectionHeading id="approach-title" index="05" label={approach.label} title={approach.heading} />

        <ul className="mt-14 grid border-l border-t border-line sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
          {approach.points.map((p, i) => (
            <Reveal
              as="li"
              key={p.title}
              y={16}
              delay={(i % 4) * 0.05}
              className="group relative border-b border-r border-line p-6 transition-colors duration-500 hover:bg-surface md:p-8"
            >
              <span className="absolute left-0 top-0 h-px w-0 bg-accent transition-[width] duration-500 ease-out group-hover:w-full" aria-hidden="true" />
              <p className="font-mono text-[11px] text-muted">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-10 font-display text-[21px] font-medium leading-[1.15] tracking-[-0.02em] md:mt-14">{p.title}</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{p.copy}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
