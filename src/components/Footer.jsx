import { ArrowUp } from 'lucide-react'
import Logo from './Logo'
import { brand, nav, socials } from '../data/site'
import { useAnchorClick } from '../lib/scroll'

export default function Footer() {
  const onAnchor = useAnchorClick()
  return (
    <footer className="border-t border-border">
      <div className="frame">
        <div className="grid md:grid-cols-12">
          <div className="pad py-10 md:col-span-5">
            <Logo size={36} />
            <p className="mt-5 max-w-[24ch] font-display text-[22px] font-medium leading-[1.2] tracking-[-0.02em]">{brand.tagline}</p>
            <a href={`mailto:${brand.email}`} className="link-rule mt-4 inline-block text-[15px] text-muted hover:text-foreground">
              {brand.email}
            </a>
          </div>
          <nav className="pad border-t border-border py-10 md:col-span-3 md:border-l md:border-t-0" aria-label="Footer">
            <p className="meta mb-4 text-muted">Navigate</p>
            <ul className="space-y-2">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} onClick={onAnchor} className="link-rule text-[15px] font-medium">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="pad border-t border-border py-10 md:col-span-3 md:border-l md:border-t-0">
            <p className="meta mb-4 text-muted">Social</p>
            <ul className="space-y-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-rule text-[15px] font-medium">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-start border-t border-border p-[var(--gutter)] md:col-span-1 md:justify-center md:border-l md:border-t-0 md:py-10">
            <a
              href="#top"
              onClick={onAnchor}
              className="grid h-12 w-12 place-items-center rounded-full border border-border transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
              aria-label="Back to top"
            >
              <ArrowUp size={18} strokeWidth={1.75} />
            </a>
          </div>
        </div>

        <div className="overflow-hidden border-t border-border">
          <p
            className="display select-none whitespace-nowrap px-[var(--gutter)] pt-6 text-[clamp(3.5rem,17.5vw,16rem)] leading-[0.8]"
            aria-hidden="true"
          >
            Skyline Webx<span className="text-accent">.</span>
          </p>
        </div>

        <div className="pad flex flex-col gap-2 border-t border-border py-5 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {brand.year} Skyline Webx. All rights reserved.</p>
          <p>{brand.location}</p>
        </div>
      </div>
    </footer>
  )
}
