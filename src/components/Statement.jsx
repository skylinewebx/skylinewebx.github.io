import { statement } from '../data/site'
import { RevealLines, Reveal } from './ui/Reveal'

export default function Statement() {
  return (
    <section className="section" aria-label={statement.label}>
      <div className="container-site">
        <Reveal>
          <p className="eyebrow mb-10 md:mb-14">
            <span className="text-accent">00</span>
            <span className="mx-2 text-line" aria-hidden="true">
              /
            </span>
            {statement.label}
          </p>
        </Reveal>
        <p className="display text-[clamp(2rem,5.8vw,5.25rem)] uppercase">
          <RevealLines
            lines={statement.lines}
            stagger={0.1}
            renderLine={(line) =>
              statement.muted.includes(line) ? <span className="text-muted/70">{line}</span> : line
            }
          />
        </p>
      </div>
    </section>
  )
}
