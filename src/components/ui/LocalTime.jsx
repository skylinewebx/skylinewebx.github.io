import { useEffect, useState } from 'react'
import { brand } from '../../data/site'

const format = () =>
  new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: brand.timezone,
    timeZoneName: 'short',
  }).format(new Date())

/** Live studio time in Houston. Updates every 30s. */
export default function LocalTime({ className }) {
  const [time, setTime] = useState(format)
  useEffect(() => {
    const id = setInterval(() => setTime(format()), 30_000)
    return () => clearInterval(id)
  }, [])
  return (
    <time className={className} suppressHydrationWarning>
      {time}
    </time>
  )
}
