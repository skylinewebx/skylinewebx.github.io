import { ArrowUpRight, Check } from 'lucide-react'
import GithubIcon from './ui/GithubIcon'
import { aiIntro } from '../data/site'
import { assistants } from '../data/assistants'
import SectionHead from './SectionHead'
import Media from './ui/Media'
import { Reveal, RevealLines } from './ui/Reveal'

const num = (i) => String(i + 1).padStart(2, '0')

/** Real chat screenshot in a phone-shaped frame. */
function Phone({ bot, className = '' }) {
  return (
    <a
      href={bot.liveUrl ?? undefined}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="Demo"
      tabIndex={-1}
      aria-label={`Open the ${bot.title} demo (new tab)`}
      className={`block overflow-hidden rounded-[26px] border border-background/20 bg-background/5 p-1.5 shadow-[0_40px_80px_-40px_rgb(0_0_0/0.6)] transition-transform duration-700 ease-out group-hover:-translate-y-2 ${className}`}
    >
      <Media
        src={bot.image.mobile}
        alt={bot.image.alt}
        width={630}
        height={1290}
        className="aspect-[420/800] rounded-[20px]"
        label="Chat preview coming soon"
      />
    </a>
  )
}

function Stats({ stats }) {
  return (
    <dl className="grid grid-cols-3 border-y border-background/15">
      {stats.map((s, i) => (
        <div key={s.label} className={`px-[var(--gutter)] py-5 ${i > 0 ? 'border-l border-background/15' : ''}`}>
          <dt className="sr-only">{s.label}</dt>
          <dd>
            <span className="display block text-[clamp(2.2rem,4vw,3.5rem)]">{s.value}</span>
            <span className="meta mt-1 block text-[10px] text-background/55 sm:text-[11px]">{s.label}</span>
          </dd>
        </div>
      ))}
    </dl>
  )
}

function BotLinks({ bot }) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      {bot.liveUrl ? (
        <a href={bot.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-accent min-h-[44px] px-5">
          Try the live demo
          <ArrowUpRight size={15} strokeWidth={1.75} aria-hidden="true" className="btn-arrow" />
          <span className="sr-only">: {bot.title} (opens in a new tab)</span>
        </a>
      ) : (
        <span className="meta text-background/55">Demo link coming soon</span>
      )}
      {bot.githubUrl && (
        <a
          href={bot.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="meta inline-flex min-h-[44px] items-center gap-2 text-background/60 hover:text-background"
        >
          <GithubIcon size={14} />
          <span className="link-rule">GitHub</span>
          <span className="sr-only">: {bot.title} source code</span>
        </a>
      )}
    </div>
  )
}

function Assistant({ bot, index }) {
  const mirror = index % 2 === 1
  return (
    <article
      id={`assistant-${bot.slug}`}
      className="group grid border-t border-background/15 lg:grid-cols-12"
      aria-labelledby={`a-${bot.slug}`}
    >
      {/* Visual column */}
      <div
        className={`relative overflow-hidden px-[var(--gutter)] py-10 md:py-14 lg:col-span-5 ${
          mirror ? 'lg:order-2 lg:border-l lg:border-background/15' : ''
        }`}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{ background: `radial-gradient(60% 50% at 50% 55%, ${bot.accent}55, transparent 70%)` }}
          aria-hidden="true"
        />
        <Reveal y={40} className="relative mx-auto w-[min(100%,330px)]">
          <Phone bot={bot} />
        </Reveal>
      </div>

      {/* Info column */}
      <div className={`flex flex-col lg:col-span-7 ${mirror ? 'lg:order-1' : 'lg:border-l lg:border-background/15'}`}>
        <div className="flex items-start justify-between gap-6 border-b border-background/15 px-[var(--gutter)] py-6 md:py-8">
          <Reveal id={`a-${bot.slug}`}>
            <p className="meta flex items-center gap-2 text-background/55">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: bot.accent }} aria-hidden="true" />
              {bot.type}
            </p>
            <h3 className="display mt-3 text-[clamp(2.4rem,5vw,4.75rem)] transition-transform duration-500 group-hover:translate-x-1">
              {bot.title}
            </h3>
          </Reveal>
          <span
            className="display shrink-0 text-[clamp(3rem,6vw,5.5rem)] text-transparent"
            style={{ WebkitTextStroke: `1.25px ${bot.accent}` }}
            aria-hidden="true"
          >
            {num(index)}
          </span>
        </div>

        <div className="grid gap-8 px-[var(--gutter)] py-7 md:grid-cols-2 md:py-9">
          <Reveal>
            <p className="text-[16px] leading-relaxed text-background/75 text-pretty">{bot.summary}</p>
            <p className="meta mb-3 mt-6 text-background/55">Helps businesses with</p>
            <ul className="flex flex-wrap gap-1.5">
              {bot.helps.map((h) => (
                <li key={h} className="rounded-full bg-background/10 px-3 py-1.5 text-[13px]">
                  {h}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="meta mb-3 text-background/55">Features</p>
            <ul className="space-y-2.5">
              {bot.features.map((f) => (
                <li key={f} className="flex gap-3 text-[14.5px] leading-snug text-background/85">
                  <Check size={15} strokeWidth={2} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Stats stats={bot.stats} />

        <div className="mt-auto flex flex-col gap-5 px-[var(--gutter)] py-6 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
            {bot.technologies.map((t) => (
              <li
                key={t}
                className="rounded-full border border-background/20 px-2.5 py-1 font-mono text-[10.5px] uppercase leading-none tracking-[0.08em] text-background/60"
              >
                {t}
              </li>
            ))}
          </ul>
          <BotLinks bot={bot} />
        </div>
      </div>
    </article>
  )
}

/** The full multi-industry demo page — shown wide, as proof the engine spans businesses. */
function Wide({ bot }) {
  return (
    <Reveal y={30} className="border-t border-background/15 px-[var(--gutter)] py-8 md:py-10">
      <a
        href={bot.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="Demo"
        className="group block"
        aria-label={`Open the ${bot.title} demo page (new tab)`}
      >
        <Media
          src={bot.image.desktop}
          alt={bot.image.alt}
          width={1440}
          height={900}
          className="aspect-[16/9] rounded-[6px] border border-background/15 md:aspect-[16/8]"
        />
        <p className="meta mt-3 flex justify-between text-background/55">
          <span>Live demo hub — five industry assistants on one engine</span>
          <span className="hidden sm:inline">{new URL(bot.liveUrl).hostname}</span>
        </p>
      </a>
    </Reveal>
  )
}

export default function AIShowcase() {
  const hub = assistants.find((b) => b.slug === 'demo-chatbot')
  return (
    <section id="assistants" className="inverse bg-foreground text-background" aria-labelledby="ai-title">
      <div className="frame border-background/15">
        <SectionHead
          index="02"
          label={aiIntro.label}
          aside={`(${String(assistants.length).padStart(2, '0')}) assistants`}
          tone="inverse"
        />

        <div className="grid gap-8 px-[var(--gutter)] py-10 md:py-14 lg:grid-cols-12 lg:items-end">
          <h2 id="ai-title" className="display text-[clamp(3.25rem,10vw,9.5rem)] lg:col-span-8">
            <RevealLines
              lines={aiIntro.heading}
              stagger={0.08}
              renderLine={(l, i) => (i === 1 ? <span className="text-accent">{l}</span> : l)}
            />
          </h2>
          <Reveal delay={0.1} className="lg:col-span-4">
            <p className="text-[17px] leading-relaxed text-background/75 text-pretty">{aiIntro.copy}</p>
          </Reveal>
        </div>

        <Reveal className="flex flex-wrap gap-2 border-t border-background/15 px-[var(--gutter)] py-5">
          {aiIntro.capabilities.map((c, i) => (
            <span key={c} className="meta inline-flex items-center gap-2 rounded-full border border-background/20 px-3.5 py-2">
              <span className="text-accent">{String(i + 1).padStart(2, '0')}</span>
              {c}
            </span>
          ))}
        </Reveal>

        {assistants.map((bot, i) => (
          <Assistant key={bot.slug} bot={bot} index={i} />
        ))}

        {hub && <Wide bot={hub} />}
      </div>
    </section>
  )
}
