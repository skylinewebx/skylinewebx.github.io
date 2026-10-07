import { logoSrc } from './Logo'
import { brand, nav, socials } from '../data/site'
import { useAnchorClick } from '../lib/scroll'

export default function Footer() {
  const onAnchor = useAnchorClick()
  return (
    <footer className="bg-background">
      <div className="frame px-[var(--gutter)] pb-24 pt-8 text-center">
        <p className="mx-auto max-w-[62ch] text-[11px] uppercase leading-relaxed tracking-[0.06em]">
          Designed &amp; developed by <strong className="font-semibold">Skyline Webx</strong> — Ayla, web designer, web developer &amp; agency owner in{' '}
          {brand.location}.
        </p>
        <img src={logoSrc} alt="Skyline Webx" width={36} height={36} className="mx-auto mt-5 h-9 w-9 rounded-[22%]" />
        <nav className="mt-6" aria-label="Footer">
          <ul className="meta flex flex-wrap justify-center gap-x-5 gap-y-2">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} onClick={onAnchor} className="link-rule">
                  {n.label}
                </a>
              </li>
            ))}
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-rule text-muted">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="mt-6 text-[12px] text-muted">
          © {brand.year} Skyline Webx. All rights reserved. ·{' '}
          <a href={`mailto:${brand.email}`} className="link-rule">
            {brand.email}
          </a>
        </p>
      </div>
    </footer>
  )
}
