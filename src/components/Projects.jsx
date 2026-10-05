import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { projects } from '../data/projects'
import SectionHeading from './SectionHeading'
import ProjectCard from './ProjectCard'
import ProjectDialog from './ProjectDialog'

/** Small "View" disc that trails the cursor over project images (mouse only). */
function CursorLabel({ visible }) {
  const reduce = useReducedMotion()
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 420, damping: 36, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 420, damping: 36, mass: 0.5 })

  useEffect(() => {
    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [x, y])

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden md:block"
      style={{ x: reduce ? x : sx, y: reduce ? y : sy }}
      aria-hidden="true"
    >
      <motion.div
        className="-ml-12 -mt-12 grid h-24 w-24 place-items-center rounded-full bg-ink font-display text-[14px] font-medium text-paper"
        initial={false}
        animate={{ scale: visible ? 1 : 0, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        View
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const [active, setActive] = useState(null)
  const [hovering, setHovering] = useState(false)
  const close = useCallback(() => setActive(null), [])
  const open = useCallback((p) => {
    setHovering(false)
    setActive(p)
  }, [])

  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="container-site">
        <SectionHeading
          id="work-title"
          index="03"
          label="Work"
          title={<span className="uppercase">Selected work</span>}
          intro="Web experiences designed to make businesses look as good online as they do in the real world."
          aside={`(${String(projects.length).padStart(2, '0')}) projects`}
        />

        <div className="mt-16 space-y-24 md:mt-24 md:space-y-36 lg:space-y-44">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} onOpen={open} onHover={setHovering} />
          ))}
        </div>
      </div>

      <CursorLabel visible={hovering && !active} />

      <AnimatePresence>
        {active && (
          <ProjectDialog
            key={active.slug}
            project={active}
            index={projects.indexOf(active)}
            onClose={close}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
