import { motion } from 'framer-motion'
import { THEMES, useTheme } from '../lib/theme'

function Swatch({ colors, size = 14 }) {
  return (
    <span
      className="block rounded-full ring-1 ring-foreground/15"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${colors[0]} 0 50%, ${colors[1]} 50% 100%)`,
      }}
      aria-hidden="true"
    />
  )
}

/** Full picker: a radiogroup of four swatches (desktop nav + mobile menu). */
export function ThemePicker({ showLabel = true, className = '' }) {
  const { theme, setTheme } = useTheme()
  const current = THEMES.find((t) => t.id === theme)
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {showLabel && (
        <span className="meta hidden text-muted xl:inline" aria-hidden="true">
          {current.label}
        </span>
      )}
      <div role="radiogroup" aria-label="Colour theme" className="flex items-center gap-1 rounded-full border border-border p-1">
        {THEMES.map((t) => {
          const active = t.id === theme
          return (
            <button
              key={t.id}
              type="button"
              role="radio"
              aria-checked={active}
              aria-label={`${t.label} theme`}
              title={t.label}
              onClick={() => setTheme(t.id)}
              className="relative grid h-7 w-7 place-items-center rounded-full"
            >
              {active && (
                <motion.span
                  layoutId="theme-active"
                  className="absolute inset-0 rounded-full border border-foreground/60"
                  transition={{ type: 'spring', stiffness: 500, damping: 36 }}
                />
              )}
              <Swatch colors={t.swatch} />
            </button>
          )
        })}
      </div>
    </div>
  )
}

/** Compact one-tap control for the mobile bar: cycles through themes. */
export function ThemeCycle() {
  const { theme, cycle } = useTheme()
  const current = THEMES.find((t) => t.id === theme)
  const next = THEMES[(THEMES.indexOf(current) + 1) % THEMES.length]
  return (
    <button
      type="button"
      onClick={cycle}
      className="grid h-11 w-11 place-items-center"
      aria-label={`Theme: ${current.label}. Switch to ${next.label}`}
      title={`Theme: ${current.label}`}
    >
      <span className="grid h-8 w-8 place-items-center rounded-full border border-border">
        <Swatch colors={current.swatch} size={16} />
      </span>
    </button>
  )
}
