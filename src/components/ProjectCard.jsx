import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from './ui/Reveal'

/** Website preview inside a minimal browser frame, with a soft parallax drift. */
function ProjectMedia({ project, index, onOpen, onHover, tall = false }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-4%', '4%'])

  return (
    <button
      ref={ref}
      type="button"
      onClick={onOpen}
      onPointerEnter={(e) => e.pointerType === 'mouse' && onHover(true)}
      onPointerLeave={() => onHover(false)}
      className="group/media block w-full cursor-pointer text-left md:cursor-none"
      aria-label={`View ${project.name} project details`}
    >
      <div className="overflow-hidden rounded-[18px] border border-line bg-surface p-1.5 transition-shadow duration-500 ease-out group-hover/media:shadow-[0_40px_90px_-50px_rgba(14,15,18,0.45)] sm:p-2">
        {/* Browser chrome */}
        <div className="flex items-center gap-1.5 px-2.5 pb-2 pt-1 sm:pb-2.5 sm:pt-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="ml-3 hidden truncate font-mono text-[10px] uppercase tracking-[0.12em] text-muted sm:block">
            {String(index + 1).padStart(2, '0')} — {project.name}
          </span>
        </div>
        <div className={`relative overflow-hidden rounded-[12px] bg-paper ${tall ? 'aspect-[16/10] lg:aspect-[16/8]' : 'aspect-[16/10]'}`}>
          <motion.div className="absolute inset-[-5%_0]" style={{ y }}>
            <img
              src={project.image.src}
              srcSet={`${project.image.srcSmall} 720w, ${project.image.src} 1440w`}
              sizes={tall ? '(min-width: 1440px) 1340px, 100vw' : '(min-width: 1024px) 58vw, 100vw'}
              alt={project.image.alt}
              width={1440}
              height={900}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-top transition-transform duration-[900ms] ease-out group-hover/media:scale-[1.035]"
            />
          </motion.div>
        </div>
      </div>
    </button>
  )
}

function Meta({ title, items }) {
  return (
    <div>
      <p className="eyebrow mb-2.5">{title}</p>
      <ul className="flex flex-wrap gap-1.5">
        {items.map((t) => (
          <li key={t} className="rounded-full border border-line px-2.5 py-1 text-[12.5px] leading-none text-ink/80">
            {t}
          </li>
        ))}
      </ul>
    </div>
  )
}

function ViewButton({ project, onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group/cta inline-flex min-h-[44px] items-center gap-3 font-display text-[15px] font-medium tracking-[-0.01em]"
    >
      <span className="link-rule">View Project</span>
      <span
        className="grid h-9 w-9 place-items-center rounded-full border border-line transition-all duration-500 ease-out group-hover/cta:rotate-45 group-hover:border-ink group-hover:bg-ink group-hover:text-paper"
        aria-hidden="true"
      >
        <ArrowUpRight size={16} strokeWidth={1.75} />
      </span>
      <span className="sr-only">: {project.name}</span>
    </button>
  )
}

/**
 * One case-study showcase. `layout` from the data decides the arrangement:
 *  left  — large image left, details right
 *  right — details left, large image right
 *  full  — full-width image, details in a row beneath
 */
export default function ProjectCard({ project, index, onOpen, onHover }) {
  const num = String(index + 1).padStart(2, '0')
  const open = () => onOpen(project)

  const heading = (
    <div className="flex items-start gap-4">
      <span className="mt-2 font-mono text-[12px] text-muted">{num}</span>
      <div>
        <h3 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[0.98] tracking-[-0.035em] transition-transform duration-500 ease-out group-hover:translate-x-1.5">
          {project.name}
        </h3>
        <p className="mt-3 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: project.accent }} aria-hidden="true" />
          {project.category}
        </p>
      </div>
    </div>
  )

  if (project.layout === 'full') {
    return (
      <article className="group" aria-labelledby={`project-${project.slug}`}>
        <Reveal y={40}>
          <ProjectMedia project={project} index={index} onOpen={open} onHover={onHover} tall />
        </Reveal>
        <Reveal className="mt-8 grid gap-8 md:mt-10 md:grid-cols-12" delay={0.05}>
          <div className="md:col-span-5" id={`project-${project.slug}`}>
            {heading}
          </div>
          <div className="md:col-span-4">
            <p className="text-[15.5px] leading-relaxed text-muted text-pretty">{project.description}</p>
            <div className="mt-6">
              <ViewButton project={project} onOpen={open} />
            </div>
          </div>
          <div className="space-y-5 md:col-span-3">
            <Meta title="Services" items={project.services} />
            <Meta title="Built with" items={project.technologies} />
          </div>
        </Reveal>
      </article>
    )
  }

  const imageRight = project.layout === 'right'
  return (
    <article className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-12" aria-labelledby={`project-${project.slug}`}>
      <Reveal y={40} className={`lg:col-span-7 ${imageRight ? 'lg:order-2' : ''}`}>
        <ProjectMedia project={project} index={index} onOpen={open} onHover={onHover} />
      </Reveal>
      <Reveal delay={0.08} className={`lg:col-span-5 ${imageRight ? 'lg:order-1' : ''}`}>
        <div id={`project-${project.slug}`}>{heading}</div>
        <p className="mt-6 max-w-[44ch] text-[15.5px] leading-relaxed text-muted text-pretty">{project.description}</p>
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <Meta title="Services" items={project.services} />
          <Meta title="Built with" items={project.technologies} />
        </div>
        <div className="mt-8">
          <ViewButton project={project} onOpen={open} />
        </div>
      </Reveal>
    </article>
  )
}

