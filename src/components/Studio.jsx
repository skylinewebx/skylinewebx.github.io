import { motion, useReducedMotion } from 'framer-motion'
import { about, brand, hero, process, services } from '../data/site'
import BinaryStrip from './ui/BinaryStrip'

const EASE = [0.22, 1, 0.36, 1]

function Sparkle({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 0c.6 6.6 5.4 11.4 12 12-6.6.6-11.4 5.4-12 12-.6-6.6-5.4-11.4-12-12C6.6 11.4 11.4 6.6 12 0z" fill="currentColor" />
    </svg>
  )
}

function Globe({ className = '' }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.2" className={className} aria-hidden="true">
      <ellipse cx="32" cy="32" rx="26" ry="22" transform="rotate(-24 32 32)" />
      <ellipse cx="32" cy="32" rx="12" ry="22" transform="rotate(-24 32 32)" />
      <ellipse cx="32" cy="32" rx="2" ry="22" transform="rotate(-24 32 32)" />
      <ellipse cx="32" cy="32" rx="26" ry="8" transform="rotate(-24 32 32)" />
      <ellipse cx="32" cy="32" rx="26" ry="16" transform="rotate(-24 32 32)" />
    </svg>
  )
}

/** Converging perspective lines drawn in the margins beside the centre column. */
function Corridor() {
  const ys = [4, 14, 26, 40, 56, 70, 82, 94]
  return (
    <svg className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <g stroke="rgb(var(--foreground))" strokeOpacity="0.55" vectorEffect="non-scaling-stroke" strokeWidth="1">
        {ys.map((y) => (
          <g key={y}>
            <line x1="0" y1={y} x2="28" y2={50 + (y - 50) * 0.55} vectorEffect="non-scaling-stroke" />
            <line x1="100" y1={y} x2="72" y2={50 + (y - 50) * 0.55} vectorEffect="non-scaling-stroke" />
          </g>
        ))}
        {[6, 12, 17, 21.5, 25].map((x) => (
          <g key={x}>
            <line x1={x} y1="0" x2={x} y2="100" vectorEffect="non-scaling-stroke" />
            <line x1={100 - x} y1="0" x2={100 - x} y2="100" vectorEffect="non-scaling-stroke" />
          </g>
        ))}
      </g>
    </svg>
  )
}

/** A mosaic cell hidden under an ink cover that flips away when it scrolls in. */
function Cell({ k, className = '', children, decor = false }) {
  const reduce = useReducedMotion()
  return (
    <div
      className={`group relative overflow-hidden border-b border-r border-border transition-colors duration-300 ${
        decor ? '' : 'hover:bg-foreground hover:text-background'
      } ${className}`}
    >
      {children}
      {!reduce && (
        <motion.div
          className="absolute inset-0 grid origin-top place-items-center bg-foreground text-background"
          initial={{ scaleY: 1 }}
          whileInView={{ scaleY: 0 }}
          viewport={{ once: true, margin: '0px 0px -12% 0px' }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1], delay: 0.08 + (k % 6) * 0.08 }}
          aria-hidden="true"
        >
          <Sparkle className="h-4 w-4" />
        </motion.div>
      )}
    </div>
  )
}

function ServiceCell({ s, n, k, className = '' }) {
  return (
    <Cell k={k} className={`flex min-h-[128px] flex-col justify-center px-4 py-6 text-center md:min-h-[150px] ${className}`}>
      <span className="meta absolute left-3 top-3 text-[9.5px] opacity-60">{String(n).padStart(2, '0')}</span>
      <h3 className="serif text-[clamp(1.35rem,2.1vw,1.7rem)] leading-[1.05]">{s.title}</h3>
      <p className="mx-auto mt-2 max-w-[30ch] text-[12.5px] leading-snug opacity-70">{s.description}</p>
    </Cell>
  )
}

function WordCell({ word, items, k, className = '' }) {
  return (
    <Cell k={k} className={`flex min-h-[150px] flex-col justify-end p-4 md:min-h-[190px] ${className}`}>
      <span className="display text-[clamp(3.2rem,8vw,4.6rem)] leading-[0.85]">{word}</span>
      <span className="serif mt-2 text-[15px] leading-[1.25] opacity-80">
        {items.map((t) => (
          <span key={t} className="block">
            ({t})
          </span>
        ))}
      </span>
    </Cell>
  )
}

const Hatch = ({ k, className = '' }) => (
  <Cell k={k} decor className={`hatch min-h-[110px] ${className}`}>
    <span className="sr-only" />
  </Cell>
)

export default function Studio() {
  const reduce = useReducedMotion()
  const by = (title) => services.find((s) => s.title === title)
  const order = [
    'Website Design',
    'UI/UX Design',
    'Website Redesign',
    'Website Development',
    'Business Websites',
    'Landing Pages',
    'Responsive & Performance Optimization',
    'Chatbot / Website Assistant Integration',
  ]
  const n = (title) => order.indexOf(title) + 1
  let k = 0

  return (
    <section id="about" className="relative" aria-labelledby="about-title">
      <div className="frame relative">
        <Corridor />
        <div className="relative mx-auto max-w-[680px] border-x border-border bg-background lg:my-0">
          {/* About */}
          <h2 id="about-title" className="label-bar">
            About
          </h2>
          <div className="pad border-b border-border py-6">
            <div className="flex flex-col items-center gap-3 text-center">
              <p className="meta">• {about.identity[1].value.split(' / ')[0]} · Houston, US •</p>
              <p className="meta border border-border px-3 py-1.5 text-[9.5px]">• {hero.status}</p>
            </div>
            <motion.div
              className="serif mt-7 border-l-[6px] border-foreground pl-4 text-[19px] leading-[1.35] md:text-[21px]"
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              I’m <strong className="font-normal italic">Ayla</strong> — web designer, web developer and owner of{' '}
              <strong className="font-normal italic">Skyline Webx</strong>, based in {brand.location}. {about.copy}
            </motion.div>
            <motion.blockquote
              className="serif mt-7 border-l border-foreground pl-5 text-[20px] italic leading-[1.3] md:text-[23px]"
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            >
              “Websites that make businesses look worth choosing.”
            </motion.blockquote>
            <dl className="mt-7 grid grid-cols-2 border-l border-t border-border font-mono text-[10.5px] uppercase tracking-[0.08em]">
              {about.identity.map((row) => (
                <div key={row.key} className="border-b border-r border-border px-3 py-3">
                  <dt className="text-muted">{row.key}</dt>
                  <dd className="mt-1 normal-case tracking-normal [font-family:'Instrument_Sans',sans-serif] text-[13.5px]">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Services mosaic */}
          <h2 id="services" className="label-bar">
            Services
          </h2>
          <div className="grid grid-cols-2 border-l-0">
            <WordCell k={k++} word="Design" items={['Website design', 'UI/UX', 'Redesign']} className="row-span-2" />
            <ServiceCell k={k++} s={by('Website Design')} n={n('Website Design')} className="border-r-0" />
            <ServiceCell k={k++} s={by('UI/UX Design')} n={n('UI/UX Design')} className="border-r-0" />
            <ServiceCell k={k++} s={by('Website Redesign')} n={n('Website Redesign')} />
            <Hatch k={k++} className="border-r-0" />
            <ServiceCell k={k++} s={by('Website Development')} n={n('Website Development')} className="col-span-2 border-r-0" />
            <Hatch k={k++} />
            <WordCell k={k++} word="Build" items={['Business websites', 'Landing pages', 'Performance']} className="row-span-2 border-r-0" />
            <ServiceCell k={k++} s={by('Business Websites')} n={n('Business Websites')} />
            <ServiceCell k={k++} s={by('Landing Pages')} n={n('Landing Pages')} />
            <Cell k={k++} decor className="flex min-h-[128px] items-center justify-center border-r-0">
              <Sparkle className="absolute left-3 top-3 h-3 w-3" />
              <Sparkle className="absolute right-3 top-3 h-3 w-3" />
              <Sparkle className="absolute bottom-3 left-3 h-3 w-3" />
              <Sparkle className="absolute bottom-3 right-3 h-3 w-3" />
              <Globe className="h-16 w-16" />
            </Cell>
            <ServiceCell k={k++} s={by('Responsive & Performance Optimization')} n={n('Responsive & Performance Optimization')} className="col-span-2 border-r-0" />
            <WordCell k={k++} word="Bots" items={['Chatbots', 'Assistants', 'Lead capture']} />
            <ServiceCell k={k++} s={by('Chatbot / Website Assistant Integration')} n={n('Chatbot / Website Assistant Integration')} className="border-r-0" />
          </div>

          {/* Process */}
          <h2 id="process" className="label-bar">
            Process
          </h2>
          <ol>
            {process.map((step, i) => (
              <li key={step.title} className="group grid grid-cols-[2.6rem_1fr] items-center gap-x-3 border-b border-border px-4 py-5 transition-colors duration-300 hover:bg-foreground hover:text-background md:grid-cols-[3rem_auto_1fr] md:gap-x-6">
                <span className="meta text-accent group-hover:text-background">{String(i + 1).padStart(2, '0')}</span>
                <span className="block overflow-hidden">
                  <motion.span
                    className="display block text-[clamp(2.8rem,9vw,4.2rem)]"
                    initial={reduce ? false : { y: '100%' }}
                    whileInView={{ y: '0%' }}
                    viewport={{ once: true, margin: '0px 0px -8% 0px' }}
                    transition={{ duration: 0.8, ease: EASE, delay: i * 0.06 }}
                  >
                    {step.title}
                  </motion.span>
                </span>
                <p className="serif col-start-2 text-[17px] leading-snug opacity-80 md:col-start-auto md:text-right">{step.copy}</p>
              </li>
            ))}
          </ol>
          <div className="h-10" />
        </div>
        <BinaryStrip />
        <BinaryStrip className="border-t-0" />
      </div>
    </section>
  )
}
