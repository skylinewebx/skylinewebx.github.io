import logo from '../assets/logo/skylinewebx-logo.png'
import { brand } from '../data/site'

/**
 * The Skyline Webx mark (supplied asset, used unmodified) with the studio name.
 * `size` sets the mark's rendered size in px.
 */
export default function Logo({ size = 36, showName = true, className = '', nameClassName = '' }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <img
        src={logo}
        alt={showName ? '' : brand.name}
        width={size}
        height={size}
        className="shrink-0 rounded-[22%]"
        style={{ width: size, height: size }}
        decoding="async"
      />
      {showName && (
        <span className={`font-display text-[17px] font-semibold tracking-[-0.02em] ${nameClassName}`}>{brand.name}</span>
      )}
    </span>
  )
}

export { logo as logoSrc }
