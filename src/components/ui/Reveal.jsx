import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

/** Fade + rise into view once. Renders static content when motion is reduced. */
export function Reveal({ as = 'div', delay = 0, y = 24, className, children, ...rest }) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  if (reduce) {
    const Static = as
    return (
      <Static className={className} {...rest}>
        {children}
      </Static>
    )
  }
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/**
 * Line-by-line masked reveal for large headings.
 * Each line slides up from behind its own mask; padding keeps descenders visible.
 */
export function RevealLines({ lines, className, lineClassName, delay = 0, stagger = 0.08, animate, renderLine }) {
  const reduce = useReducedMotion()
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          {reduce ? (
            <span className={`block ${lineClassName ?? ''}`}>{renderLine ? renderLine(line, i) : line}</span>
          ) : (
            <motion.span
              className={`block will-change-transform ${lineClassName ?? ''}`}
              initial={{ y: '105%' }}
              {...(animate === undefined
                ? { whileInView: { y: '0%' }, viewport: { once: true, margin: '0px 0px -10% 0px' } }
                : { animate: animate ? { y: '0%' } : { y: '105%' } })}
              transition={{ duration: 0.9, ease: EASE, delay: delay + i * stagger }}
            >
              {renderLine ? renderLine(line, i) : line}
            </motion.span>
          )}
        </span>
      ))}
    </span>
  )
}

export { EASE }
