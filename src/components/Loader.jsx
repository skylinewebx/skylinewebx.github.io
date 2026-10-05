import { motion } from 'framer-motion'
import { logoSrc } from './Logo'
import { brand } from '../data/site'
import { EASE } from './ui/Reveal'

/**
 * Short logo reveal (~1.2s total). App decides when to unmount it;
 * the exit lifts the panel away to uncover the hero.
 */
export default function Loader() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center bg-paper"
      initial={{ y: 0 }}
      exit={{ y: '-100%', transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-6">
        <motion.div
          className="overflow-hidden rounded-[22%]"
          initial={{ clipPath: 'inset(50% 50% 50% 50% round 22%)', scale: 0.92 }}
          animate={{ clipPath: 'inset(0% 0% 0% 0% round 22%)', scale: 1 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <img src={logoSrc} alt="" width={84} height={84} className="block h-[84px] w-[84px]" />
        </motion.div>

        <div className="overflow-hidden">
          <motion.p
            className="font-display text-[15px] font-medium tracking-[-0.01em] text-ink"
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.25 }}
          >
            {brand.name}
          </motion.p>
        </div>

        <div className="h-px w-28 overflow-hidden bg-line">
          <motion.div
            className="h-full origin-left bg-accent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          />
        </div>
      </div>
    </motion.div>
  )
}
