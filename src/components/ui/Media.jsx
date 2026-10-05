import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ImageOff } from 'lucide-react'
import { EASE } from './Reveal'

/**
 * Screenshot with a clip-path reveal on scroll and a slow settle-in scale.
 * Falls back to a clean placeholder if the image is missing or fails to load,
 * so one unavailable project never breaks the layout.
 */
export default function Media({
  src,
  srcSet,
  sizes,
  alt,
  width,
  height,
  className = '',
  imgClassName = '',
  position = 'top',
  label,
  delay = 0,
}) {
  const reduce = useReducedMotion()
  const [failed, setFailed] = useState(false)

  const inner =
    !src || failed ? (
      <div className="hatch grid h-full w-full place-items-center bg-surface text-muted" role="img" aria-label={alt}>
        <span className="meta flex items-center gap-2">
          <ImageOff size={14} strokeWidth={1.5} aria-hidden="true" />
          {label || 'Preview coming soon'}
        </span>
      </div>
    ) : (
      <motion.img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className={`h-full w-full object-cover ${position === 'top' ? 'object-top' : 'object-center'} ${imgClassName}`}
        initial={reduce ? false : { scale: 1.12 }}
        whileInView={reduce ? undefined : { scale: 1 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 1.4, ease: EASE, delay }}
      />
    )

  // Hover zoom lives on a wrapper so it never fights the reveal transform.
  const zoom = <div className="h-full w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]">{inner}</div>
  if (reduce) return <div className={`relative overflow-hidden ${className}`}>{zoom}</div>
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay }}
    >
      {zoom}
    </motion.div>
  )
}
