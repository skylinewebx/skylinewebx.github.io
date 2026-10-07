import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import GithubIcon from './ui/GithubIcon'
import { chatIntro } from '../data/site'
import { assistants } from '../data/assistants'

const EASE = [0.22, 1, 0.36, 1]
const num = (i) => String(i + 1).padStart(2, '0')

function Reveal({ children, className = '', delay = 0, y = 28 }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

/** One assistant, presented as a system window with a hard offset shadow. */
function Window({ bot, index }) {
  const mirror = index % 2 === 1
  return (
    <Reveal>
      <article
        id={`assistant-${bot.slug}`}
        className="group border border-background bg-foreground shadow-[6px_6px_0_rgb(var(--background))]"
        aria-labelledby={`a-${bot.slug}`}
      >
        <div className="flex h-9 items-center justify-between bg-background px-4 text-foreground">
          <span className="meta text-[9.5px]">
            {num(index)} — {bot.type}
          </span>
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: bot.accent }} aria-hidden="true" />
        </div>

        <div className="grid lg:grid-cols-12">
          {/* Real conversation screenshot */}
          <div className={`relative overflow-hidden border-b border-background/20 p-6 lg:col-span-5 lg:border-b-0 ${mirror ? 'lg:order-2 lg:border-l' : 'lg:border-r'} lg:border-background/20`}>
            <div className="pointer-events-none absolute inset-0 opacity-40" style={{ background: `radial-gradient(55% 45% at 50% 55%, ${bot.accent}66, transparent 70%)` }} aria-hidden="true" />
            <a
              href={bot.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Demo"
              tabIndex={-1}
              aria-hidden="true"
              className="relative mx-auto block w-[min(100%,300px)] overflow-hidden rounded-[22px] border border-background/25 p-1.5 transition-transform duration-700 ease-out group-hover:-translate-y-2"
            >
              <img src={bot.image.mobile} alt="" width={630} height={1290} loading="lazy" decoding="async" className="aspect-[420/800] w-full rounded-[16px] object-cover object-top" />
            </a>
          </div>

          {/* Details */}
          <div className={`flex flex-col lg:col-span-7 ${mirror ? 'lg:order-1' : ''}`}>
            <div className="border-b border-background/20 px-5 py-5 md:px-7">
              <h3 id={`a-${bot.slug}`} className="display text-[clamp(2.4rem,5vw,4.4rem)] transition-transform duration-500 group-hover:translate-x-1">
                {bot.title}
              </h3>
              <p className="serif mt-3 max-w-[48ch] text-[17px] leading-snug text-background/80">{bot.summary}</p>
            </div>

            <div className="grid gap-6 px-5 py-5 md:grid-cols-2 md:px-7">
              <div>
                <p className="meta mb-3 text-background/55">Helps businesses with</p>
                <ul className="flex flex-wrap gap-2">
                  {bot.helps.map((h) => (
                    <li key={h} className="meta border border-background/40 px-2.5 py-1.5 text-[9.5px]">
                      + {h}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="meta mb-3 text-background/55">Features</p>
                <ul className="space-y-2">
                  {bot.features.map((f) => (
                    <li key={f} className="flex gap-2.5 text-[13.5px] leading-snug text-background/85">
                      <Check size={14} strokeWidth={2} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <dl className="grid grid-cols-3 border-y border-background/20">
              {bot.stats.map((s, i) => (
                <div key={s.label} className={`px-5 py-4 md:px-7 ${i ? 'border-l border-background/20' : ''}`}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="display block text-[clamp(2rem,3.6vw,3.2rem)]">{s.value}</span>
                    <span className="meta mt-1 block text-[9px] text-background/55">{s.label}</span>
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-auto space-y-3 px-5 py-5 md:px-7">
              <p className="meta text-[9.5px] text-background/50">{bot.technologies.join(' · ')}</p>
              <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
                <a href={bot.liveUrl} target="_blank" rel="noopener noreferrer" className="bar bg-background text-foreground hover:bg-accent hover:text-accent-foreground">
                  Try the live demo
                  <ArrowRight size={15} strokeWidth={1.75} className="arr" aria-hidden="true" />
                  <span className="sr-only">: {bot.title} (opens in a new tab)</span>
                </a>
                <a href={bot.githubUrl} target="_blank" rel="noopener noreferrer" className="bar border border-background/40 text-background hover:bg-background hover:text-foreground sm:w-auto">
                  <span className="flex items-center gap-2">
                    <GithubIcon size={13} /> GitHub
                  </span>
                  <span className="sr-only">: {bot.title} source code</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  )
}

export default function AssistantsShowcase() {
  const reduce = useReducedMotion()
  const hub = assistants.find((b) => b.slug === 'demo-chatbot')
  return (
    <section id="assistants" className="inverse dots bg-foreground text-background" aria-labelledby="assistants-title">
      <div className="frame border-background/25">
        <p className="meta flex h-8 items-center justify-center bg-background text-[10px] tracking-[0.3em] text-foreground">{chatIntro.label}</p>

        <div className="grid gap-8 px-[var(--gutter)] pb-10 pt-12 md:pb-14 md:pt-16 lg:grid-cols-12 lg:items-end">
          <h2 id="assistants-title" className="display text-[clamp(3.2rem,10.5vw,9.5rem)] lg:col-span-8">
            {chatIntro.heading.map((l, i) => (
              <span key={l} className="block overflow-hidden">
                <motion.span
                  className={`block ${i === 1 ? 'text-accent' : ''}`}
                  initial={reduce ? false : { y: '100%' }}
                  whileInView={{ y: '0%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: EASE, delay: i * 0.09 }}
                >
                  {l}
                </motion.span>
              </span>
            ))}
          </h2>
          <Reveal className="lg:col-span-4" delay={0.1}>
            <p className="serif text-[19px] leading-snug text-background/85">{chatIntro.copy}</p>
            <p className="mt-4 text-[14px] leading-relaxed text-background/60">
              Website chatbots can help businesses answer common questions, explain services, guide visitors and capture leads.
            </p>
          </Reveal>
        </div>

        <ul className="flex flex-wrap gap-3 px-[var(--gutter)] pb-12" aria-label="Capabilities">
          {chatIntro.capabilities.map((c, i) => (
            <motion.li
              key={c}
              className="meta border border-background bg-foreground px-3 py-2 text-[10px] shadow-[3px_3px_0_rgb(var(--background))]"
              initial={reduce ? false : { opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay: i * 0.08 }}
            >
              + {c}
            </motion.li>
          ))}
        </ul>

        <div className="space-y-10 px-[var(--gutter)] pb-14 md:space-y-14 md:pb-20">
          {assistants.map((bot, i) => (
            <Window key={bot.slug} bot={bot} index={i} />
          ))}

          {hub && (
            <Reveal>
              <a href={hub.liveUrl} target="_blank" rel="noopener noreferrer" data-cursor="Demo" className="group block border border-background shadow-[6px_6px_0_rgb(var(--background))]">
                <span className="meta flex h-9 items-center justify-between bg-background px-4 text-[9.5px] text-foreground">
                  <span>Live demo hub — five industry assistants, one engine</span>
                  <span className="hidden sm:inline">{new URL(hub.liveUrl).hostname} ↗</span>
                </span>
                <img src={hub.image.desktop} alt={hub.image.alt} width={1440} height={900} loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.01] md:aspect-[16/8]" />
              </a>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}
