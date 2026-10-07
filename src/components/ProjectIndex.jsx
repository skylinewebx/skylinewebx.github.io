import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import GithubIcon from './ui/GithubIcon'
import { projects, primaryLink } from '../data/projects'
import BrandMark from './ui/BrandMark'

const EASE = [0.22, 1, 0.36, 1]

/** Ruled spec sheet: every project with its real preview, details and links. */
export default function ProjectIndex() {
  const reduce = useReducedMotion()
  return (
    <div className="frame border-t border-border">
      <h3 className="label-bar">Project index</h3>
      <ol>
        {projects.map((p, i) => {
          const primary = primaryLink(p)
          return (
            <motion.li
              key={p.slug}
              id={`project-${p.slug}`}
              className="group grid grid-cols-[88px_1fr] border-b border-border transition-colors duration-300 hover:bg-foreground hover:text-background md:grid-cols-[3.5rem_220px_1.1fr_1.3fr_auto] lg:grid-cols-[3.5rem_260px_1fr_1.4fr_14rem]"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -8% 0px' }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <span className="meta hidden items-start p-4 opacity-60 md:flex">{String(i + 1).padStart(2, '0')}</span>

              {/* Preview: phone shot on mobile, desktop shot on md+ */}
              <a
                href={primary?.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor={primary?.kind === 'live' ? 'View' : 'Code'}
                tabIndex={-1}
                aria-hidden="true"
                className="block overflow-hidden border-r border-border md:border-x"
              >
                <img src={p.image?.mobile} alt="" width={585} height={1266} loading="lazy" decoding="async" className="h-full max-h-[200px] w-full object-cover object-top md:hidden" />
                <img
                  src={p.image?.desktopSm}
                  alt=""
                  width={720}
                  height={450}
                  loading="lazy"
                  decoding="async"
                  className="hidden aspect-[16/10] h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 md:block"
                />
              </a>

              <div className="p-4 md:py-5">
                <p className="meta opacity-60 md:hidden">{String(i + 1).padStart(2, '0')}</p>
                <h4 className="display mt-1 text-[clamp(1.9rem,3.2vw,2.9rem)] transition-transform duration-500 group-hover:translate-x-1 md:mt-0">{p.title}</h4>
                <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-2">
                  <BrandMark project={p} size="md" className="group-hover:-translate-y-0.5 group-hover:shadow-[0_0_0_1px_rgb(var(--background)/0.35),0_10px_20px_-10px_rgb(0_0_0/0.6)]" />
                  <p className="meta opacity-60">{p.category}</p>
                </div>
                <p className="serif mt-3 text-[15.5px] leading-snug opacity-85 md:hidden">{p.description}</p>
              </div>

              <div className="hidden p-4 md:block md:py-5">
                <p className="serif text-[16px] leading-snug opacity-85">{p.description}</p>
                <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Technologies">
                  {p.technologies.map((t) => (
                    <li key={t} className="tag group-hover:border-background/50">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-span-2 flex flex-wrap items-center gap-3 border-t border-border p-4 md:col-span-1 md:flex-col md:items-stretch md:justify-center md:border-l md:border-t-0 md:group-hover:border-background/30">
                {primary && (
                  <a
                    href={primary.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="meta flex min-h-[44px] flex-1 items-center justify-between gap-3 bg-foreground px-4 text-background transition-colors group-hover:bg-background group-hover:text-foreground md:flex-none"
                  >
                    {primary.kind === 'live' ? 'View project' : 'View on GitHub'}
                    {primary.kind === 'live' ? <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden="true" /> : <GithubIcon size={13} />}
                    <span className="sr-only">: {p.title} (opens in a new tab)</span>
                  </a>
                )}
                {p.githubUrl && primary?.kind === 'live' && (
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="meta flex min-h-[44px] items-center justify-between gap-3 border border-current px-4 opacity-80 hover:opacity-100"
                  >
                    GitHub
                    <GithubIcon size={13} />
                    <span className="sr-only">: {p.title} source code</span>
                  </a>
                )}
              </div>
            </motion.li>
          )
        })}
      </ol>
    </div>
  )
}
