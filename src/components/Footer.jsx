import { ArrowUp } from 'lucide-react'
import Logo from './Logo'
import { brand, nav, socials } from '../data/site'
import { useAnchorClick } from '../lib/scroll'

export default function Footer() {
  const onAnchor = useAnchorClick()
  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-site pt-16 md:pt-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <Logo size={40} />
            <p className="mt-5 max-w-[28ch] font-display text-[22px] font-medium leading-[1.2] tracking-[-0.02em]">
              {brand.tagline}
            </p>
            <a href={`mailto:${brand.email}`} className="link-rule mt-5 inline-block text-[15px] text-muted hover:text-ink">
              {brand.email}
            </a>
          </div>

          <nav className="md:col-span-2 md:col-start-8" aria-label="Footer">
            <p className="eyebrow mb-4">Navigate</p>
            <ul className="space-y-2.5">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} onClick={onAnchor} className="link-rule text-[15px] font-medium">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <p className="eyebrow mb-4">Social</p>
            <ul className="space-y-2.5">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-rule text-[15px] font-medium">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-1 md:justify-self-end">
            <a
              href="#top"
              onClick={onAnchor}
              className="grid h-12 w-12 place-items-center rounded-full border border-line transition-colors hover:border-ink hover:bg-ink hover:text-paper"
              aria-label="Back to top"
            >
              <ArrowUp size={18} strokeWidth={1.75} />
            </a>
          </div>
        </div>

        {/* Oversized wordmark */}
        <p
          className="mt-16 select-none whitespace-nowrap font-display text-[clamp(3rem,15vw,14rem)] font-medium leading-[0.8] tracking-[-0.055em] text-ink md:mt-24"
          aria-hidden="true"
        >
          Skyline Webx<span className="text-accent">.</span>
        </p>

        <div className="mt-8 flex flex-col gap-3 border-t border-line py-6 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {brand.year} Skyline Webx. All rights reserved.</p>
          <p>{brand.location}</p>
        </div>
      </div>
    </footer>
  )
}
