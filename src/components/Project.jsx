import { ArrowUpRight } from 'lucide-react'
import GithubIcon from './ui/GithubIcon'
import Media from './ui/Media'
import { Reveal } from './ui/Reveal'
import { primaryLink } from '../data/projects'

const num = (i) => String(i + 1).padStart(2, '0')

/* ---------- pieces ---------- */

function ProjectNumber({ index, accent, className = '' }) {
  return (
    <span
      className={`display block text-transparent ${className}`}
      style={{ WebkitTextStroke: `1.25px ${accent}` }}
      aria-hidden="true"
    >
      {num(index)}
    </span>
  )
}

function Title({ project, size = 'lg' }) {
  return (
    <div>
      <h3
        className={`display transition-transform duration-500 ease-out group-hover:translate-x-1 ${
          size === 'lg' ? 'text-[clamp(2.6rem,6vw,5.5rem)]' : 'text-[clamp(2.2rem,4.2vw,3.75rem)]'
        }`}
      >
        {project.title}
      </h3>
      <p className="meta mt-3 flex items-center gap-2 text-muted">
        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: project.accent }} aria-hidden="true" />
        {project.category}
      </p>
    </div>
  )
}

function Tech({ items }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
      {items.map((t) => (
        <li key={t} className="chip">
          {t}
        </li>
      ))}
    </ul>
  )
}

function Links({ project }) {
  const primary = primaryLink(project)
  const showGithub = project.githubUrl && primary?.kind === 'live'
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      {primary ? (
        <a href={primary.href} target="_blank" rel="noopener noreferrer" className="btn btn-solid min-h-[44px] px-5">
          {primary.label}
          {primary.kind === 'github' ? (
            <GithubIcon size={15} />
          ) : (
            <ArrowUpRight size={15} strokeWidth={1.75} aria-hidden="true" className="btn-arrow" />
          )}
          <span className="sr-only">: {project.title} (opens in a new tab)</span>
        </a>
      ) : (
        <span className="meta text-muted">Link coming soon</span>
      )}
      {showGithub && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="meta inline-flex min-h-[44px] items-center gap-2 text-muted hover:text-foreground"
        >
          <GithubIcon size={14} />
          <span className="link-rule">GitHub</span>
          <span className="sr-only">: {project.title} source code</span>
        </a>
      )}
    </div>
  )
}

/** Desktop screenshot (md+) or the real phone screenshot (small screens), linked to the project. */
function Visual({ project, aspect = 'aspect-[16/10]', phone = 'right', sizes = '100vw' }) {
  const primary = primaryLink(project)
  const img = project.image
  const Wrap = primary ? 'a' : 'div'
  const wrapProps = primary
    ? {
        href: primary.href,
        target: '_blank',
        rel: 'noopener noreferrer',
        'data-cursor': primary.kind === 'live' ? 'View' : 'Code',
        'aria-label': `${primary.label}: ${project.title} (opens in a new tab)`,
        tabIndex: -1,
      }
    : {}

  return (
    <Wrap {...wrapProps} className="relative block">
      {/* Phone-first: the site's own mobile layout */}
      <Media
        src={img?.mobile}
        alt={img ? `${img.alt} — mobile` : `${project.title} preview`}
        width={585}
        height={1266}
        className="aspect-[4/5] rounded-[6px] border border-border bg-surface md:hidden"
      />
      {/* Tablet & desktop */}
      <div className="relative hidden md:block">
        <Media
          src={img?.desktop}
          srcSet={img ? `${img.desktopSm} 720w, ${img.desktop} 1440w` : undefined}
          sizes={sizes}
          alt={img?.alt ?? `${project.title} preview`}
          width={1440}
          height={900}
          className={`${aspect} rounded-[6px] border border-border bg-surface`}
        />
        {img?.mobile && phone !== 'none' && (
          <div
            className={`absolute -bottom-6 w-[16%] min-w-[96px] max-w-[190px] overflow-hidden rounded-[14px] border border-border bg-surface shadow-[0_30px_60px_-25px_rgb(0_0_0/0.45)] transition-transform duration-700 ease-out group-hover:-translate-y-2 ${
              phone === 'left' ? 'left-6 lg:left-10' : 'right-6 lg:right-10'
            }`}
          >
            <Media src={img.mobile} alt="" width={585} height={1266} className="aspect-[390/700]" delay={0.25} />
          </div>
        )}
      </div>
    </Wrap>
  )
}

/* ---------- layouts ---------- */

/** Full-width visual with a ruled info band beneath. */
export function FeatureProject({ project, index }) {
  return (
    <article id={`project-${project.slug}`} className="group border-b border-border" aria-labelledby={`t-${project.slug}`}>
      <div className="pad grid items-end gap-6 border-b border-border py-6 md:grid-cols-[auto_1fr_auto] md:gap-10 md:py-8">
        <ProjectNumber index={index} accent={project.accent} className="text-[clamp(4rem,9vw,8.5rem)]" />
        <Reveal id={`t-${project.slug}`}>
          <Title project={project} />
        </Reveal>
        <Reveal delay={0.1} className="md:pb-2">
          <Links project={project} />
        </Reveal>
      </div>
      <div className="pad pb-12 pt-6 md:pb-14 md:pt-8">
        <Visual project={project} aspect="aspect-[16/10] lg:aspect-[16/8.4]" sizes="(min-width: 1440px) 1340px, 100vw" />
      </div>
      <div className="grid border-t border-border md:grid-cols-12">
        <Reveal className="pad py-6 md:col-span-7 md:py-8">
          <p className="max-w-[52ch] text-[16px] leading-relaxed text-muted text-pretty">{project.description}</p>
        </Reveal>
        <Reveal delay={0.08} className="pad border-t border-border py-6 md:col-span-5 md:border-l md:border-t-0 md:py-8">
          <p className="meta mb-3 text-muted">Built with</p>
          <Tech items={project.technologies} />
        </Reveal>
      </div>
    </article>
  )
}

/** Large visual beside a ruled info column; `reverse` puts the visual on the right. */
export function SplitProject({ project, index, reverse = false }) {
  return (
    <article
      id={`project-${project.slug}`}
      className="group grid border-b border-border lg:grid-cols-12"
      aria-labelledby={`t-${project.slug}`}
    >
      <div className={`pad py-8 md:pb-16 md:pt-12 lg:col-span-8 ${reverse ? 'lg:order-2 lg:border-l lg:border-border' : ''}`}>
        <Visual project={project} phone={reverse ? 'left' : 'right'} sizes="(min-width: 1024px) 64vw, 100vw" />
      </div>
      <div
        className={`pad flex flex-col justify-between gap-8 border-t border-border py-8 md:py-12 lg:col-span-4 lg:border-t-0 ${
          reverse ? 'lg:order-1' : 'lg:border-l'
        }`}
      >
        <div>
          <ProjectNumber index={index} accent={project.accent} className="text-[clamp(3.5rem,6vw,6rem)]" />
          <Reveal id={`t-${project.slug}`} className="mt-4">
            <Title project={project} size="md" />
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 text-[15.5px] leading-relaxed text-muted text-pretty">{project.description}</p>
          </Reveal>
        </div>
        <Reveal delay={0.12} className="space-y-6">
          <Tech items={project.technologies} />
          <Links project={project} />
        </Reveal>
      </div>
    </article>
  )
}

/** Two projects side by side, compact. */
export function PairProjects({ items }) {
  return (
    <div className="grid border-b border-border md:grid-cols-2">
      {items.map(({ project, index }, k) => (
        <article
          key={project.slug}
          id={`project-${project.slug}`}
          className={`group flex flex-col ${k === 1 ? 'border-t border-border md:border-l md:border-t-0' : ''}`}
          aria-labelledby={`t-${project.slug}`}
        >
          <div className="pad flex items-start justify-between gap-4 border-b border-border py-5">
            <Reveal id={`t-${project.slug}`}>
              <Title project={project} size="md" />
            </Reveal>
            <ProjectNumber index={index} accent={project.accent} className="text-[clamp(2.75rem,4.5vw,4.5rem)]" />
          </div>
          <div className="pad py-6 md:py-8">
            <Visual project={project} phone="none" sizes="(min-width: 768px) 50vw, 100vw" />
          </div>
          <div className="pad mt-auto space-y-5 border-t border-border py-6">
            <p className="text-[15px] leading-relaxed text-muted text-pretty">{project.description}</p>
            <Tech items={project.technologies} />
            <Links project={project} />
          </div>
        </article>
      ))}
    </div>
  )
}

