import { motion } from 'framer-motion'
import { logoSrc } from './Logo'

const EASE = [0.22, 1, 0.36, 1]
const CURTAIN = [0.76, 0, 0.24, 1]

/**
 * The opening: just the Skyline Webx mark, centred on the page colour.
 * It settles in (fade + slight scale + rise), holds, then the panel lifts
 * away and the page builds itself underneath.
 */
export default function Loader() {
  return (
    <motion.div
      data-loader
      className="fixed inset-0 z-[100] grid place-items-center bg-background"
      style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      exit={{ clipPath: 'inset(0% 0% 100% 0%)', transition: { duration: 0.8, ease: CURTAIN } }}
      aria-hidden="true"
    >
      <motion.img
        src={logoSrc}
        alt=""
        width={84}
        height={84}
        className="h-[72px] w-[72px] rounded-[22%] md:h-[84px] md:w-[84px]"
        initial={{ opacity: 0, scale: 0.86, y: 14, filter: 'blur(6px)' }}
        animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -24, transition: { duration: 0.45, ease: EASE } }}
        transition={{ duration: 0.75, ease: EASE }}
      />
    </motion.div>
  )
}
