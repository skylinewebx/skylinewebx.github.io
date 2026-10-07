/**
 * A project's real brand mark (captured from its own site) on a plate of its
 * own ground colour, so every logo reads crisply on any theme.
 * size: 'xs' (captions), 'sm' (cards), 'md' (index).
 */
const H = { xs: 'h-[18px] px-1.5', sm: 'h-[22px] px-2', md: 'h-9 px-3' }

export default function BrandMark({ project, size = 'sm', className = '' }) {
  if (!project.logo) return null
  return (
    <span
      className={`inline-flex shrink-0 items-center overflow-hidden rounded-[3px] py-[3px] shadow-[0_0_0_1px_rgb(var(--foreground)/0.18),0_6px_14px_-8px_rgb(0_0_0/0.55)] transition-transform duration-500 ease-out [transform:translateZ(0)] ${H[size]} ${className}`}
      style={{ backgroundColor: project.logo.ground }}
    >
      <img
        src={project.logo.src}
        alt={`${project.title} logo`}
        height={120}
        loading="lazy"
        decoding="async"
        draggable="false"
        className="block h-full w-auto max-w-none select-none [image-rendering:-webkit-optimize-contrast]"
      />
    </span>
  )
}
