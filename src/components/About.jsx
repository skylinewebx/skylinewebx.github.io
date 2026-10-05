import { about, brand } from '../data/site'
import { Reveal } from './ui/Reveal'
import LocalTime from './ui/LocalTime'
import Logo from './Logo'

export default function About() {
  return (
    <section id="about" className="section pt-0" aria-labelledby="about-title">
      <div className="container-site">
        <Reveal className="mb-10 flex items-center justify-between border-t border-ink pt-4 md:mb-16">
          <p className="eyebrow text-ink">
            <span className="text-accent">01</span>
            <span className="mx-2 text-line" aria-hidden="true">
              /
            </span>
            About
          </p>
        </Reveal>

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <Reveal as="h2" id="about-title" className="h-section uppercase">
              {about.heading}
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-10 max-w-[30ch] font-display text-[clamp(1.5rem,2.6vw,2.25rem)] font-medium leading-[1.15] tracking-[-0.025em] text-balance">
                {about.lead}
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="lede mt-6 max-w-[52ch] text-pretty">{about.body}</p>
            </Reveal>
          </div>

          {/* Identity panel */}
          <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8 lg:self-end">
            <div className="overflow-hidden rounded-2xl border border-line bg-surface">
              <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
                <span className="eyebrow text-ink">Studio profile</span>
                <span className="eyebrow inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                  <LocalTime />
                </span>
              </div>
              <dl>
                {about.identity.map((row, i) => (
                  <div
                    key={row.key}
                    className="grid grid-cols-[auto_1fr] items-baseline gap-x-6 border-b border-line px-5 py-5 last:border-b-0 sm:grid-cols-[150px_1fr]"
                  >
                    <dt className="eyebrow">
                      0{i + 1} — {row.key}
                    </dt>
                    <dd className="text-right font-display text-[17px] font-medium tracking-[-0.015em] sm:text-left sm:text-[19px]">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 bg-paper px-5 py-4">
                <Logo size={28} nameClassName="whitespace-nowrap text-[15px]" />
                <a href={`mailto:${brand.email}`} className="link-rule font-mono text-[11px] uppercase tracking-[0.12em] text-muted hover:text-ink">
                  {brand.email}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
