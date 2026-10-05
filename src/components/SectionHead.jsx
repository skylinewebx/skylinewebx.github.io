import { Reveal } from './ui/Reveal'

/**
 * Ruled section label bar: [index / label] ·········· [aside]
 * Sits flush under the section's top border, inside the frame.
 */
export default function SectionHead({ index, label, aside, tone = 'default' }) {
  const muted = tone === 'inverse' ? 'text-background/55' : 'text-muted'
  const line = tone === 'inverse' ? 'border-background/15' : 'border-border'
  return (
    <Reveal y={8} className={`pad flex h-12 items-center justify-between gap-4 border-b ${line}`}>
      <p className="meta">
        <span className="text-accent">{index}</span>
        <span className={`mx-2 ${muted}`} aria-hidden="true">
          /
        </span>
        {label}
      </p>
      {aside && <p className={`meta ${muted}`}>{aside}</p>}
    </Reveal>
  )
}
