import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import { useAnchorClick, useSmoothScroll } from '../lib/scroll'
import { EASE } from './ui/Reveal'

/** Accessible project detail panel (Esc / backdrop to close, focus trapped and restored). */
export default function ProjectDialog({ project, index, onClose }) {
  const panel = useRef(null)
  const closeBtn = useRef(null)
  const { stop, start } = useSmoothScroll()
  const onAnchor = useAnchorClick(onClose)

  useEffect(() => {
    const previouslyFocused = document.activeElement
    stop()
    document.documentElement.style.overflow = 'hidden'
    closeBtn.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab') {
        const f = panel.current.querySelectorAll('a[href], button')
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
      start()
      previouslyFocused?.focus?.({ preventScroll: true })
    }
  }, [onClose, stop, start])

  const num = String(index + 1).padStart(2, '0')

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-end justify-center md:items-center md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
    >
      <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <motion.div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        data-lenis-prevent
        className="relative max-h-[92dvh] w-full max-w-[1100px] overflow-y-auto overscroll-contain rounded-t-[24px] bg-paper md:rounded-[24px]"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0, transition: { duration: 0.3 } }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-paper/90 px-5 py-3.5 backdrop-blur md:px-8">
          <p className="eyebrow">
            <span className="text-accent">{num}</span> / Selected work
          </p>
          <button
            ref={closeBtn}
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-full border border-line transition-colors hover:border-ink"
            aria-label="Close project details"
          >
            <X size={18} strokeWidth={1.75} />
          </button>
        </div>

        <div className="p-5 md:p-8">
          <div className="overflow-hidden rounded-[14px] border border-line bg-surface">
            <img
              src={project.image.src}
              alt={project.image.alt}
              width={1440}
              height={900}
              className="aspect-[16/10] w-full object-cover object-top"
            />
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: project.accent }} aria-hidden="true" />
                {project.category}
              </p>
              <h3
                id="project-dialog-title"
                className="mt-3 font-display text-[clamp(2rem,4.4vw,3.5rem)] font-medium leading-[0.98] tracking-[-0.035em]"
              >
                {project.name}
              </h3>
              <p className="mt-5 max-w-[52ch] text-[16px] leading-relaxed text-muted">{project.description}</p>
            </div>
            <dl className="space-y-5 md:col-span-5">
              <div>
                <dt className="eyebrow mb-2">Services</dt>
                <dd className="font-display text-[16px] font-medium">{project.services.join(', ')}</dd>
              </div>
              <div>
                <dt className="eyebrow mb-2">Built with</dt>
                <dd className="font-display text-[16px] font-medium">{project.technologies.join(', ')}</dd>
              </div>
            </dl>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center">
            {project.liveUrl ? (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Visit live site
                <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
              </a>
            ) : (
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Live link coming soon</p>
            )}
            {project.caseStudyUrl && (
              <a href={project.caseStudyUrl} className="btn btn-ghost">
                Read case study
              </a>
            )}
            <a href="#contact" onClick={onAnchor} className="btn btn-ghost sm:ml-auto">
              Start a similar project
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
