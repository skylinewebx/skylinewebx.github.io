import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import WarpGrid from './ui/WarpGrid'
import BinaryStrip from './ui/BinaryStrip'
import GithubIcon from './ui/GithubIcon'
import { assistants } from '../data/assistants'
import { chatIntro } from '../data/site'
import { gsap, prefersReducedMotion, useAnchorClick } from '../lib/scroll'

const EASE = [0.22, 1, 0.36, 1]
const POP = [0.34, 1.56, 0.64, 1]
const num = (i) => String(i + 1).padStart(2, '0')
const host = (u) => new URL(u).hostname

function Sparkle({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 0c.6 6.6 5.4 11.4 12 12-6.6.6-11.4 5.4-12 12-.6-6.6-5.4-11.4-12-12C6.6 11.4 11.4 6.6 12 0z" fill="currentColor" />
    </svg>
  )
}

function Reveal({ children, className = '', delay = 0, y = 26, as = 'div' }) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </Tag>
  )
}

/** Screenshot that wipes up into view, then settles from a slight zoom. */
function Shot({ src, alt, className = '', imgClassName = '', width, height, delay = 0 }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={reduce ? false : { clipPath: 'inset(100% 0% 0% 0%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1], delay }}
    >
      <motion.img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className={`h-full w-full object-cover object-top ${imgClassName}`}
        initial={reduce ? false : { scale: 1.1 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: EASE, delay }}
      />
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */

function Intro({ ready }) {
  const reduce = useReducedMotion()
  const onAnchor = useAnchorClick()
  const show = (delay) =>
    reduce ? {} : { initial: { opacity: 0, y: 16 }, animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }, transition: { duration: 0.7, ease: EASE, delay } }
  const chips = ['Rule-based engine', 'No API key', 'Shadow DOM widget', 'One-line embed']
  const lines = ['Chatbot', 'portfolio.']

  return (
    <section id="top" className="relative pt-[calc(var(--nav-h)+28px)]" aria-labelledby="chatbots-title">
      <div className="frame relative grid border-b border-border lg:grid-cols-12">
        <div className="relative overflow-hidden lg:col-span-7 lg:border-r lg:border-border">
          <WarpGrid alpha={0.13} cell={56} />
          <div className="pad relative pb-10 pt-9 md:pb-14 md:pt-14">
            <motion.p className="meta text-muted" {...show(0.2)}>
              <a href="/#work" className="link-rule">
                Work
              </a>{' '}
              <span className="mx-2">/</span> Chatbots
            </motion.p>
            <h1 id="chatbots-title" className="display mt-5 text-[clamp(3rem,15vw,5.2rem)] md:text-[clamp(4.4rem,10vw,8rem)]" aria-label="Chatbot portfolio">
              {lines.map((line, i) => (
                <span key={line} className="block overflow-hidden pb-[0.04em]" aria-hidden="true">
                  <motion.span
                    className="flex items-center gap-[0.18em]"
                    initial={reduce ? false : { y: '105%' }}
                    animate={reduce ? undefined : ready ? { y: '0%' } : { y: '105%' }}
                    transition={{ duration: 0.95, ease: EASE, delay: 0.25 + i * 0.09 }}
                  >
                    {i === 1 ? <span className="text-accent">{line}</span> : line}
                    {i === 0 && (
                      <motion.span
                        className="inline-block w-[0.4em] shrink-0"
                        initial={reduce ? false : { rotate: -180, scale: 0 }}
                        animate={reduce ? undefined : ready ? { rotate: 0, scale: 1 } : { rotate: -180, scale: 0 }}
                        transition={{ duration: 1, ease: EASE, delay: 0.7 }}
                      >
                        <Sparkle className="h-full w-full" />
                      </motion.span>
                    )}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p className="serif mt-6 max-w-[34rem] text-[clamp(1.15rem,1.55vw,1.35rem)] leading-[1.35]" {...show(0.5)}>
              {chatIntro.copy}
            </motion.p>
            <ul className="mt-8 grid max-w-[30rem] grid-cols-2 gap-x-3 gap-y-4 sm:max-w-[34rem]" aria-label="Shared engine">
              {chips.map((c, k) => (
                <motion.li
                  key={c}
                  className={['', 'sm:translate-x-6 translate-y-1', '-translate-y-1 translate-x-3 sm:translate-x-10', 'sm:translate-x-3'][k]}
                  initial={reduce ? false : { opacity: 0, scale: 0.6 }}
                  animate={reduce ? undefined : ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.55, ease: POP, delay: 0.7 + k * 0.12 }}
                >
                  <span className="chip bg-background">
                    <span aria-hidden="true">+</span>
                    {c}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Directory of all repositories */}
        <div className="pad flex flex-col justify-between gap-10 border-t border-border py-9 md:py-12 lg:col-span-5 lg:border-t-0 lg:py-14">
          <motion.div className="hard" {...show(0.5)}>
            <div className="flex h-9 items-center justify-between bg-foreground px-4 text-background">
              <span className="meta text-[9.5px]">Chatbot directory</span>
              <span className="meta text-[9.5px]">{String(assistants.length).padStart(2, '0')} repos</span>
            </div>
            <ul className="divide-y divide-border">
              {assistants.map((b, i) => (
                <li key={b.slug}>
                  <a href={`#bot-${b.slug}`} onClick={onAnchor} className="group grid grid-cols-[2rem_1fr_auto] items-center gap-3 px-4 py-3 transition-colors duration-300 hover:bg-foreground hover:text-background">
                    <span className="meta opacity-60">{num(i)}</span>
                    <span className="min-w-0">
                      <span className="block truncate font-mono text-[11px] uppercase tracking-[0.08em]">{b.title}</span>
                      <span className="block truncate font-mono text-[9.5px] uppercase tracking-[0.08em] opacity-55">github/{b.slug}</span>
                    </span>
                    <span className="meta flex items-center gap-1.5 text-[9px]">
                      <span className="pulse-dot relative h-1.5 w-1.5 rounded-full bg-accent text-accent group-hover:bg-background group-hover:text-background" aria-hidden="true" />
                      Live
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div className="space-y-3" {...show(0.75)}>
            <a href={`#bot-${assistants[0].slug}`} onClick={onAnchor} className="bar bar-solid">
              Browse chatbots
              <ArrowRight size={16} strokeWidth={1.75} className="arr" aria-hidden="true" />
            </a>
            <a href="/#contact" className="bar bar-line">
              Start a project
              <ArrowRight size={16} strokeWidth={1.75} className="arr" aria-hidden="true" />
            </a>
          </motion.div>
        </div>
      </div>
      <div className="frame">
        <BinaryStrip className="border-t-0" />
      </div>
    </section>
  )
}

/** Paper grid with the pill window; the word scrolls inside it (as on the Work section). */
function Pill() {
  const ref = useRef(null)
  const word = useRef(null)
  const WORD = 'CHATBOTS'
  useEffect(() => {
    if (prefersReducedMotion()) return undefined
    const ctx = gsap.context(() => {
      gsap.fromTo(word.current, { yPercent: 16 }, { yPercent: -60, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 0.8 } })
    }, ref)
    return () => ctx.revert()
  }, [])
  return (
    <div ref={ref} className="paper relative h-[78vh] min-h-[520px] overflow-hidden bg-background">
      <div className="absolute left-1/2 top-1/2 h-[78%] w-[clamp(120px,15vw,190px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-border p-[6px]">
        <div className="inverse dots relative h-full w-full overflow-hidden rounded-full bg-foreground">
          <div ref={word} className="display extrude absolute inset-x-0 top-0 flex flex-col items-center text-[clamp(5rem,9.5vw,8rem)] leading-[0.92] will-change-transform" aria-hidden="true">
            {(WORD + WORD).split('').map((l, i) => (
              <span key={i}>{l}</span>
            ))}
          </div>
        </div>
      </div>
      <p className="meta absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-background px-3 py-1">
        {String(assistants.length).padStart(2, '0')} chatbot repositories · scroll
      </p>
    </div>
  )
}

/** One repository as a case study on the dark dotted stage. */
function Case({ bot, index }) {
  const mirror = index % 2 === 1
  const desk = bot.image.chat ?? bot.image.desktop
  return (
    <article id={`bot-${bot.slug}`} className="inverse dots bg-foreground text-background" aria-labelledby={`c-${bot.slug}`}>
      <div className="frame border-background/25">
        <p className="meta flex h-8 items-center justify-between bg-background px-[var(--gutter)] text-[10px] tracking-[0.2em] text-foreground">
          <span>
            {num(index)} — {bot.title}
          </span>
          <span className="hidden sm:inline">github.com/skylinewebx/{bot.slug}</span>
        </p>

        <div className="grid lg:grid-cols-12">
          {/* Visual: desktop conversation + phone */}
          <div className={`group relative px-[var(--gutter)] pb-14 pt-8 md:pt-10 lg:col-span-7 ${mirror ? 'lg:order-2 lg:border-l' : 'lg:border-r'} lg:border-background/20`}>
            <div className="pointer-events-none absolute inset-0 opacity-35" style={{ background: `radial-gradient(55% 45% at 50% 55%, ${bot.accent}66, transparent 70%)` }} aria-hidden="true" />
            <a href={bot.liveUrl} target="_blank" rel="noopener noreferrer" data-cursor="Demo" tabIndex={-1} aria-hidden="true" className="relative block">
              <Shot src={desk} alt="" width={1440} height={900} className="hidden aspect-[16/10] border border-background/25 shadow-[6px_6px_0_rgb(var(--background))] md:block" imgClassName="transition-transform duration-700 group-hover:scale-[1.02]" />
              <div
                className={`relative mx-auto w-[min(72%,280px)] md:absolute md:-bottom-8 md:w-[22%] md:min-w-[150px] ${mirror ? 'md:left-6' : 'md:right-6'} transition-transform duration-700 group-hover:-translate-y-2`}
              >
                <div className="overflow-hidden rounded-[20px] border border-background/30 bg-foreground p-1 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.7)]">
                  <Shot src={bot.image.mobile} alt="" width={630} height={1290} className="aspect-[420/800] rounded-[16px]" delay={0.2} />
                </div>
              </div>
            </a>
          </div>

          {/* Details */}
          <div className={`flex flex-col border-t border-background/20 lg:col-span-5 lg:border-t-0 ${mirror ? 'lg:order-1' : ''}`}>
            <div className="border-b border-background/20 px-[var(--gutter)] py-6">
              <Reveal>
                <p className="meta flex items-center gap-2 text-background/55">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: bot.accent }} aria-hidden="true" />
                  {bot.type}
                </p>
                <h2 id={`c-${bot.slug}`} className="display mt-3 text-[clamp(2.6rem,5vw,4.4rem)]">
                  {bot.title}
                </h2>
                <p className="serif mt-4 text-[18px] leading-snug text-background/85">{bot.summary}</p>
              </Reveal>
            </div>
            <Reveal className="space-y-5 px-[var(--gutter)] py-6" delay={0.06}>
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
                    <li key={f} className="flex gap-2.5 text-[14px] leading-snug text-background/85">
                      <Check size={14} strokeWidth={2} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <dl className="grid grid-cols-3 border-y border-background/20">
              {bot.stats.map((s, i) => (
                <div key={s.label} className={`px-[var(--gutter)] py-4 ${i ? 'border-l border-background/20' : ''}`}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="display block text-[clamp(2rem,3.4vw,3rem)]">{s.value}</span>
                    <span className="meta mt-1 block text-[9px] text-background/55">{s.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-auto space-y-3 px-[var(--gutter)] py-6">
              <p className="meta text-[9.5px] text-background/50">{bot.technologies.join(' · ')}</p>
              <a href={bot.liveUrl} target="_blank" rel="noopener noreferrer" className="bar bg-background text-foreground hover:bg-accent hover:text-accent-foreground">
                Open chatbot
                <span className="flex items-center gap-3">
                  <span className="hidden normal-case tracking-normal opacity-60 sm:inline">{host(bot.liveUrl)}</span>
                  <ArrowUpRight size={15} strokeWidth={1.75} className="arr" aria-hidden="true" />
                </span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a href={bot.githubUrl} target="_blank" rel="noopener noreferrer" className="bar border border-background/40 text-background hover:bg-background hover:text-foreground">
                <span className="flex items-center gap-2">
                  <GithubIcon size={13} /> View on GitHub
                </span>
                <ArrowUpRight size={15} strokeWidth={1.75} className="arr" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {bot.configs && <Configs bot={bot} />}
        {bot.bots && <IndustryBots bot={bot} />}
      </div>
    </article>
  )
}

/** Every business configuration shipped in the repo, each a real direct link. */
function Configs({ bot }) {
  const reduce = useReducedMotion()
  return (
    <div className="border-t border-background/20 px-[var(--gutter)] py-7">
      <p className="meta mb-4 flex justify-between text-background/55">
        <span>Configurations in this repo</span>
        <span>{String(bot.configs.length).padStart(2, '0')} direct links</span>
      </p>
      <ul className="flex flex-wrap gap-2.5">
        {bot.configs.map((c, i) => (
          <motion.li
            key={c.href}
            initial={reduce ? false : { opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: POP, delay: Math.min(i * 0.035, 0.5) }}
          >
            <a
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="meta inline-flex min-h-[38px] items-center gap-2 border border-background bg-foreground px-3 text-[10px] shadow-[3px_3px_0_rgb(var(--background))] transition-[transform,box-shadow,background-color,color] duration-300 hover:-translate-y-0.5 hover:bg-background hover:text-foreground hover:shadow-[5px_5px_0_rgb(var(--accent))]"
            >
              {c.label}
              <ArrowUpRight size={12} strokeWidth={2} aria-hidden="true" />
              <span className="sr-only"> — {bot.title} (opens in a new tab)</span>
            </a>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

/** The individual industry bots, as a scroll-linked row of real phone conversations. */
function IndustryBots({ bot }) {
  const ref = useRef(null)
  const track = useRef(null)
  const reduce = prefersReducedMotion()

  useEffect(() => {
    if (reduce) return undefined
    const ctx = gsap.context(() => {
      gsap.fromTo(
        track.current,
        { x: () => Math.min(0, window.innerWidth * 0.08) },
        {
          x: () => Math.min(0, ref.current.clientWidth - track.current.scrollWidth),
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top 90%', end: 'bottom 55%', scrub: 0.9, invalidateOnRefresh: true },
        },
      )
    }, ref)
    return () => ctx.revert()
  }, [reduce])

  return (
    <div ref={ref} className={`border-t border-background/20 py-8 ${reduce ? 'overflow-x-auto' : 'overflow-hidden'}`}>
      <p className="meta mb-5 flex justify-between px-[var(--gutter)] text-background/55">
        <span>Industry bots in this repo</span>
        <span>{String(bot.bots.length).padStart(2, '0')} assistants</span>
      </p>
      <ul ref={track} className="flex w-max gap-4 px-[var(--gutter)] will-change-transform">
        {bot.bots.map((b, i) => (
          <li key={b.href} className="w-[min(64vw,250px)] shrink-0">
            <a href={b.href} target="_blank" rel="noopener noreferrer" data-cursor="Demo" className="group block">
              <div className="overflow-hidden rounded-[20px] border border-background/30 p-1 transition-transform duration-700 group-hover:-translate-y-2">
                <img src={b.image} alt={`${b.name} assistant conversation`} width={630} height={1290} loading="lazy" decoding="async" className="aspect-[420/800] w-full rounded-[16px] object-cover object-top" />
              </div>
              <span className="meta mt-3 flex items-center justify-between gap-2 text-[9.5px]">
                <span className="truncate">
                  <span className="text-accent">{num(i)}</span> {b.name}
                </span>
                <ArrowUpRight size={12} strokeWidth={2} className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
              <span className="meta mt-1 block text-[9px] text-background/55">{b.industry}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Outro() {
  return (
    <section aria-label="Next step">
      <div className="frame border-t border-border">
        <BinaryStrip className="border-t-0" />
      </div>
      <div className="frame grid border-b border-border sm:grid-cols-2">
        <a href="/#contact" className="bar bar-solid min-h-[76px] px-[var(--gutter)] text-[12px]">
          Start a project
          <ArrowRight size={18} strokeWidth={1.75} className="arr" aria-hidden="true" />
        </a>
        <a href="/#work" className="bar min-h-[76px] border-t border-border px-[var(--gutter)] text-[12px] hover:bg-foreground hover:text-background sm:border-l sm:border-t-0">
          Back to website work
          <ArrowRight size={18} strokeWidth={1.75} className="arr" aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}

export default function ChatbotsPage({ ready }) {
  return (
    <>
      <Intro ready={ready} />
      <Pill />
      {assistants.map((b, i) => (
        <Case key={b.slug} bot={b} index={i} />
      ))}
      <Outro />
    </>
  )
}
