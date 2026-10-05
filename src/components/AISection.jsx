import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowUp, Check } from 'lucide-react'
import { aiAssistant } from '../data/site'
import { Reveal, EASE } from './ui/Reveal'
import { logoSrc } from './Logo'

/** Plays the sample conversation once when the mockup scrolls into view. */
function useConversation(inView, reduce) {
  const total = aiAssistant.conversation.length
  const [shown, setShown] = useState(reduce ? total : 0)
  const [typing, setTyping] = useState(false)
  useEffect(() => {
    if (reduce || !inView || shown >= total) return undefined
    const next = aiAssistant.conversation[shown]
    const isBot = next.from === 'bot'
    if (isBot) setTyping(true)
    const id = setTimeout(
      () => {
        setTyping(false)
        setShown((n) => n + 1)
      },
      shown === 0 ? 350 : isBot ? 1300 : 900,
    )
    return () => clearTimeout(id)
  }, [inView, shown, total, reduce])
  return { shown, typing }
}

function ChatMockup() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' })
  const { shown, typing } = useConversation(inView, reduce)

  return (
    <figure ref={ref} className="relative">
      <div className="overflow-hidden rounded-[20px] border border-line bg-surface shadow-[0_30px_80px_-40px_rgba(14,15,18,0.35)]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <div className="flex items-center gap-3">
            <img src={logoSrc} alt="" width={32} height={32} className="h-8 w-8 rounded-[22%]" />
            <div>
              <p className="font-display text-[15px] font-medium leading-tight tracking-[-0.01em]">Website Assistant</p>
              <p className="flex items-center gap-1.5 text-[12px] text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                Online
              </p>
            </div>
          </div>
          <span className="eyebrow rounded-full border border-line px-2.5 py-1 text-[10px]">Demo</span>
        </div>

        {/* Messages */}
        <div className="flex min-h-[300px] flex-col gap-3 bg-paper/60 px-5 py-6" aria-live="off">
          <p className="max-w-[85%] self-start rounded-2xl rounded-bl-md border border-line bg-surface px-4 py-3 text-[14px] leading-relaxed">
            Hi! Ask me about services, opening hours or appointments.
          </p>
          <AnimatePresence initial={false}>
            {aiAssistant.conversation.slice(0, shown).map((m, i) => (
              <motion.p
                key={i}
                initial={reduce ? false : { opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.45, ease: EASE }}
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-[14px] leading-relaxed ${
                  m.from === 'user'
                    ? 'self-end rounded-br-md bg-accent text-accent-ink'
                    : 'self-start rounded-bl-md border border-line bg-surface'
                }`}
              >
                {m.text}
              </motion.p>
            ))}
            {typing && (
              <motion.span
                key="typing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="typing flex w-fit gap-1 self-start rounded-2xl rounded-bl-md border border-line bg-surface px-4 py-3.5"
                aria-hidden="true"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-muted" />
                <span className="h-1.5 w-1.5 rounded-full bg-muted" />
                <span className="h-1.5 w-1.5 rounded-full bg-muted" />
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Composer (static) */}
        <div className="flex items-center gap-3 border-t border-line px-4 py-3" aria-hidden="true">
          <span className="flex-1 truncate text-[14px] text-muted/70">Type a question…</span>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-paper">
            <ArrowUp size={16} strokeWidth={1.75} />
          </span>
        </div>
      </div>
      <figcaption className="mt-4 text-[12px] leading-relaxed text-muted">{aiAssistant.note}</figcaption>
    </figure>
  )
}

export default function AISection() {
  return (
    <section className="section bg-surface" aria-labelledby="ai-title">
      <div className="container-site grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-3 py-1.5 text-accent">
              {aiAssistant.label}
            </p>
          </Reveal>
          <Reveal as="h2" id="ai-title" delay={0.05} className="mt-6 font-display text-[clamp(2.25rem,4.6vw,4rem)] font-medium uppercase leading-[0.98] tracking-[-0.035em] text-balance">
            {aiAssistant.heading}
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lede mt-6 max-w-[46ch] text-pretty">{aiAssistant.copy}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="eyebrow mt-10 text-ink">Assistants can help with</p>
            <ul className="mt-4 border-t border-line">
              {aiAssistant.uses.map((u) => (
                <li key={u} className="flex items-center gap-3 border-b border-line py-3.5 text-[15px]">
                  <Check size={16} strokeWidth={2} className="shrink-0 text-accent" aria-hidden="true" />
                  {u}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
          <ChatMockup />
        </Reveal>
      </div>
    </section>
  )
}
