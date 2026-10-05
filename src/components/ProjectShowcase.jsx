import { useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowDownRight } from 'lucide-react'
import { projects } from '../data/projects'
import SectionHead from './SectionHead'
import { Reveal, RevealLines } from './ui/Reveal'
import { FeatureProject, PairProjects, SplitProject } from './Project'
import { useAnchorClick } from '../lib/scroll'

/**
 * Layout rhythm, repeated down the list:
 * feature → split → split (reversed) → pair → split → feature → pair …
 */
const PATTERN = ['feature', 'split', 'split-rev', 'pair', 'split', 'feature', 'pair']

function buildBlocks(list) {
  const blocks = []
  let i = 0
  let step = 0
  while (i < list.length) {
    let kind = PATTERN[step % PATTERN.length]
    if (kind === 'pair' && i === list.length - 1) kind = 'feature'
    if (kind === 'pair') {
      blocks.push({ kind, items: [{ project: list[i], index: i }, { project: list[i + 1], index: i + 1 }] })
      i += 2
    } else {
      blocks.push({ kind, project: list[i], index: i })
      i += 1
    }
    step += 1
  }
  return blocks
}

/** Compact index of every project; hovering a row floats its screenshot beside the cursor. */
function WorkIndex() {
  const onAnchor = useAnchorClick()
  const [hover, setHover] = useState(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 300, damping: 30, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 300, damping: 30, mass: 0.5 })

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - r.left)
    y.set(e.clientY - r.top)
  }

  return (
    <div className="relative" onPointerMove={onMove} onPointerLeave={() => setHover(null)}>
      <ol className="border-t border-border">
        {projects.map((p, i) => (
          <li key={p.slug} className="border-b border-border">
            <a
              href={`#project-${p.slug}`}
              onClick={onAnchor}
              onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(p)}
              className="group pad grid grid-cols-[2.25rem_1fr_auto] items-center gap-x-4 py-3.5 transition-colors duration-300 hover:bg-surface md:grid-cols-[3rem_1.3fr_1fr_1fr_auto] md:py-4"
            >
              <span className="meta text-muted">{String(i + 1).padStart(2, '0')}</span>
              <span className="display text-[clamp(1.6rem,3vw,2.6rem)] transition-transform duration-500 ease-out group-hover:translate-x-2">
                {p.title}
              </span>
              <span className="meta hidden text-muted md:block">{p.category}</span>
              <span className="meta hidden text-muted md:block">{p.technologies.slice(0, 2).join(' · ')}</span>
              <ArrowDownRight
                size={18}
                strokeWidth={1.5}
                aria-hidden="true"
                className="text-muted transition-all duration-500 group-hover:-rotate-45 group-hover:text-accent"
              />
            </a>
          </li>
        ))}
      </ol>

      {/* Floating preview (mouse only) */}
      <motion.div className="pointer-events-none absolute left-0 top-0 z-10 hidden lg:block" style={{ x: sx, y: sy }} aria-hidden="true">
        <AnimatePresence>
          {hover?.image && (
            <motion.div
              key={hover.slug}
              className="-mt-[94px] ml-8 w-[300px] overflow-hidden rounded-[6px] border border-border bg-surface shadow-[0_30px_60px_-30px_rgb(0_0_0/0.5)]"
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <img src={hover.image.desktopSm} alt="" className="aspect-[16/10] w-full object-cover object-top" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default function ProjectShowcase() {
  const blocks = buildBlocks(projects)
  return (
    <section id="work" className="border-t border-border" aria-labelledby="work-title">
      <div className="frame">
        <SectionHead index="01" label="Selected work" aside={`(${String(projects.length).padStart(2, '0')}) websites`} />

        <div className="pad grid gap-6 py-10 md:py-14 lg:grid-cols-12 lg:items-end">
          <h2 id="work-title" className="display text-[clamp(3.5rem,11vw,10rem)] lg:col-span-8">
            <RevealLines lines={['Selected', 'work']} stagger={0.08} />
          </h2>
          <Reveal delay={0.1} className="lg:col-span-4">
            <p className="lede max-w-[34ch] text-pretty">
              Web experiences designed to make businesses look as good online as they do in the real world.
            </p>
          </Reveal>
        </div>

        <WorkIndex />

        {blocks.map((b) => {
          if (b.kind === 'feature') return <FeatureProject key={b.project.slug} project={b.project} index={b.index} />
          if (b.kind === 'pair') return <PairProjects key={b.items[0].project.slug} items={b.items} />
          return (
            <SplitProject key={b.project.slug} project={b.project} index={b.index} reverse={b.kind === 'split-rev'} />
          )
        })}
      </div>
    </section>
  )
}
