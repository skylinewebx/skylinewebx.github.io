import { Reveal } from './ui/Reveal'

/**
 * Consistent section opener: mono index + label row, then the heading.
 * `index` like "02", `label` like "Services".
 */
export default function SectionHeading({ id, index, label, title, intro, className = '', aside }) {
  return (
    <header className={className}>
      <Reveal className="mb-8 flex items-center justify-between gap-6 border-t border-ink pt-4 md:mb-12">
        <p className="eyebrow text-ink">
          <span className="text-accent">{index}</span>
          <span className="mx-2 text-line" aria-hidden="true">
            /
          </span>
          {label}
        </p>
        {aside && <div className="eyebrow">{aside}</div>}
      </Reveal>
      <div className="grid gap-6 md:grid-cols-12 md:gap-8">
        <Reveal as="h2" id={id} className="h-section text-balance md:col-span-8">
          {title}
        </Reveal>
        {intro && (
          <Reveal delay={0.1} className="self-end md:col-span-4">
            <p className="lede text-pretty">{intro}</p>
          </Reveal>
        )}
      </div>
    </header>
  )
}
