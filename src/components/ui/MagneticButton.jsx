import { forwardRef, useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

const SPRING = { stiffness: 260, damping: 20, mass: 0.6 }

/**
 * A link or button that leans gently toward the cursor (fine pointers only).
 * Pass `href` for a link, otherwise renders a <button>.
 */
const MagneticButton = forwardRef(function MagneticButton(
  { href, strength = 0.28, className = '', children, ...rest },
  forwardedRef,
) {
  const reduce = useReducedMotion()
  const localRef = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, SPRING)
  const sy = useSpring(y, SPRING)

  const setRefs = (node) => {
    localRef.current = node
    if (typeof forwardedRef === 'function') forwardedRef(node)
    else if (forwardedRef) forwardedRef.current = node
  }

  const onMove = (e) => {
    if (reduce || e.pointerType !== 'mouse') return
    const r = localRef.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  const Tag = href ? motion.a : motion.button
  return (
    <Tag
      ref={setRefs}
      href={href}
      className={className}
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      {...(href ? {} : { type: rest.type ?? 'button' })}
      {...rest}
    >
      {children}
    </Tag>
  )
})

export default MagneticButton
