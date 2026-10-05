import { services } from '../data/site'

/** Slow service ticker between hero and statement. Decorative — the list lives in Services. */
export default function Marquee() {
  const items = services.map((s) => s.title)
  const row = (hidden) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <li key={t} className="flex items-center">
          <span className="whitespace-nowrap px-6 font-display text-[15px] font-medium tracking-[-0.01em] md:px-8 md:text-[17px]">
            {t}
          </span>
          <span className="font-mono text-[11px] text-accent" aria-hidden="true">
            ／
          </span>
        </li>
      ))}
    </ul>
  )
  return (
    <div className="marquee overflow-hidden border-y border-line bg-surface py-4" aria-label="Services overview">
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
