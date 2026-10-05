import { about, brand, process } from '../data/site'
import SectionHead from './SectionHead'
import { Reveal, RevealLines } from './ui/Reveal'
import LocalTime from './ui/LocalTime'
import Logo from './Logo'

/** About (short) beside a compact four-step process. */
export default function About() {
  return (
    <section id="about" className="border-t border-border" aria-labelledby="about-title">
      <div className="frame">
        <SectionHead index="03" label="About & process" aside={brand.location} />

        <div className="grid lg:grid-cols-12">
          {/* About */}
          <div className="pad py-10 md:py-14 lg:col-span-7">
            <h2 id="about-title" className="display text-[clamp(3.25rem,8vw,7rem)]">
              <RevealLines lines={['About', 'Skyline Webx']} stagger={0.08} />
            </h2>
            <Reveal delay={0.08}>
              <p className="mt-8 max-w-[34ch] font-display text-[clamp(1.35rem,2.2vw,1.9rem)] font-medium leading-[1.25] tracking-[-0.015em] text-pretty">
                {about.copy}
              </p>
            </Reveal>
          </div>

          {/* Identity panel */}
          <Reveal delay={0.1} className="border-t border-border lg:col-span-5 lg:border-l lg:border-t-0">
            <div className="flex h-12 items-center justify-between border-b border-border px-[var(--gutter)]">
              <span className="meta">Studio profile</span>
              <span className="meta inline-flex items-center gap-2 text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                <LocalTime />
              </span>
            </div>
            <dl>
              {about.identity.map((row, i) => (
                <div
                  key={row.key}
                  className="grid grid-cols-[7.5rem_1fr] items-baseline gap-4 border-b border-border px-[var(--gutter)] py-4 sm:grid-cols-[9rem_1fr]"
                >
                  <dt className="meta text-muted">
                    0{i + 1} — {row.key}
                  </dt>
                  <dd className="font-display text-[17px] font-medium tracking-[-0.01em]">{row.value}</dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-wrap items-center justify-between gap-3 px-[var(--gutter)] py-4">
              <Logo size={26} nameClassName="whitespace-nowrap text-[15px]" />
              <a href={`mailto:${brand.email}`} className="meta link-rule text-muted hover:text-foreground">
                {brand.email}
              </a>
            </div>
          </Reveal>
        </div>

        {/* Process */}
        <ol className="grid border-t border-border sm:grid-cols-2 lg:grid-cols-4" aria-label="How it works">
          {process.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              y={16}
              delay={i * 0.06}
              className={`group relative px-[var(--gutter)] py-7 md:py-9 ${i > 0 ? 'border-t border-border sm:border-t-0' : ''} ${
                i % 2 === 1 ? 'sm:border-l' : ''
              } ${i >= 2 ? 'sm:border-t lg:border-t-0' : ''} ${i > 0 ? 'lg:border-l' : ''} border-border`}
            >
              <span
                className="absolute left-0 top-0 h-[2px] w-0 bg-accent transition-[width] duration-700 ease-out group-hover:w-full"
                aria-hidden="true"
              />
              <div className="flex items-baseline justify-between">
                <span className="meta text-accent">{String(i + 1).padStart(2, '0')}</span>
                <span className="meta text-muted">Step</span>
              </div>
              <h3 className="display mt-8 text-[clamp(2.5rem,4.4vw,4rem)]">{step.title}</h3>
              <p className="mt-3 max-w-[28ch] text-[14.5px] leading-relaxed text-muted">{step.copy}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
