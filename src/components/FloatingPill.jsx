import { motion } from 'framer-motion'
import { logoSrc } from './Logo'
import { useAnchorClick } from '../lib/scroll'

/** Small always-there launcher (bottom right) that jumps to the AI assistants. */
export default function FloatingPill({ ready }) {
  const onAnchor = useAnchorClick()
  return (
    <motion.a
      href="#assistants"
      onClick={onAnchor}
      className="meta fixed bottom-4 right-4 z-40 flex h-10 items-center gap-2.5 rounded-[10px] bg-foreground pl-1.5 pr-3.5 text-[10px] text-background shadow-[0_8px_30px_-6px_rgb(var(--accent)/0.6)] transition-transform duration-300 hover:-translate-y-0.5 md:bottom-6 md:right-6"
      initial={{ opacity: 0, y: 20 }}
      animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.9 }}
      aria-label="AI assistants"
    >
      <img src={logoSrc} alt="" width={28} height={28} className="h-7 w-7 rounded-[7px]" />
      SWX · AI
    </motion.a>
  )
}
