import { useEffect, useRef } from 'react'
import { useTheme } from '../../lib/theme'

/**
 * Canvas grid whose lines bend around the pointer ("move your mouse to warp
 * the grid"). Redraws only on pointer / resize / theme change — never idles.
 * `bulge` (0–1) adds a permanent fisheye at (fx, fy) (used by the contact disc).
 */
export default function WarpGrid({ cell = 64, alpha = 0.14, strength = 34, radius = 220, bulge = 0, fx = 0.5, fy = 0.5, className = '' }) {
  const canvasRef = useRef(null)
  const state = useRef({ mx: -9999, my: -9999, tx: -9999, ty: -9999, frame: 0, bulge })
  const { theme } = useTheme()

  useEffect(() => {
    state.current.bulge = bulge
    state.current.draw?.()
  }, [bulge])

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas.parentElement
    const ctx = canvas.getContext('2d')
    const s = state.current
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fine = window.matchMedia('(pointer: fine)').matches
    let w = 0
    let h = 0
    let dpr = 1
    const ink = getComputedStyle(document.documentElement).getPropertyValue('--foreground').trim().split(/\s+/).join(',')

    const displace = (x, y) => {
      let dx = 0
      let dy = 0
      if (s.mx > -9000) {
        const ex = x - s.mx
        const ey = y - s.my
        const d2 = ex * ex + ey * ey
        const f = Math.exp(-d2 / (2 * radius * radius)) * strength
        const d = Math.sqrt(d2) || 1
        dx += (ex / d) * f
        dy += (ey / d) * f
      }
      if (s.bulge > 0) {
        const cx = w * fx
        const cy = h * fy
        const ex = x - cx
        const ey = y - cy
        const r = Math.min(w, h) * 0.55
        const d = Math.sqrt(ex * ex + ey * ey) || 1
        const f = Math.exp(-(d * d) / (2 * r * r)) * r * 0.22 * s.bulge
        dx += (ex / d) * f
        dy += (ey / d) * f
      }
      return [x + dx, y + dy]
    }

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      ctx.strokeStyle = `rgba(${ink},${alpha})`
      ctx.lineWidth = 1
      const step = 14
      ctx.beginPath()
      for (let x = 0; x <= w + cell; x += cell) {
        for (let y = 0; y <= h; y += step) {
          const [px, py] = displace(x, y)
          if (y === 0) ctx.moveTo(px, py)
          else ctx.lineTo(px, py)
        }
      }
      for (let y = 0; y <= h + cell; y += cell) {
        for (let x = 0; x <= w; x += step) {
          const [px, py] = displace(x, y)
          if (x === 0) ctx.moveTo(px, py)
          else ctx.lineTo(px, py)
        }
      }
      ctx.stroke()
    }
    s.draw = draw

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = parent.clientWidth
      h = parent.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      draw()
    }

    const tick = () => {
      s.mx += (s.tx - s.mx) * 0.18
      s.my += (s.ty - s.my) * 0.18
      draw()
      s.frame = Math.abs(s.tx - s.mx) + Math.abs(s.ty - s.my) > 0.4 ? requestAnimationFrame(tick) : 0
    }
    const onMove = (e) => {
      const r = parent.getBoundingClientRect()
      s.tx = e.clientX - r.left
      s.ty = e.clientY - r.top
      if (s.mx < -9000) {
        s.mx = s.tx
        s.my = s.ty
      }
      if (!s.frame) s.frame = requestAnimationFrame(tick)
    }
    const onLeave = () => {
      s.tx = s.mx = -9999
      s.ty = s.my = -9999
      draw()
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(parent)
    if (fine && !reduce) {
      parent.addEventListener('pointermove', onMove)
      parent.addEventListener('pointerleave', onLeave)
    }
    return () => {
      cancelAnimationFrame(s.frame)
      ro.disconnect()
      parent.removeEventListener('pointermove', onMove)
      parent.removeEventListener('pointerleave', onLeave)
    }
  }, [cell, alpha, strength, radius, fx, fy, theme])

  return <canvas ref={canvasRef} className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true" />
}
