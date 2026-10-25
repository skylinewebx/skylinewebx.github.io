/**
 * Selected work — order here is the order on the page.
 *
 * {
 *   slug, title, category, description, technologies[],
 *   liveUrl    string | null   — live website (primary "View project" link)
 *   githubUrl  string | null   — source code (secondary link, or primary when there is no live site)
 *   image      { desktop, desktopSm, mobile, alt } — real screenshots in src/assets/shots
 *   logo       { src, ground } — the brand mark from the project's own site + its background colour
 *   accent     project colour, used only for small details
 * }
 *
 * Layouts are assigned automatically in ProjectShowcase.jsx.
 * Missing image? Set image to null — a clean placeholder is rendered instead.
 */

import lumina from '../assets/shots/lumina.webp'
import luminaSm from '../assets/shots/lumina-sm.webp'
import luminaM from '../assets/shots/lumina-m.webp'
import noir from '../assets/shots/noir.webp'
import noirSm from '../assets/shots/noir-sm.webp'
import noirM from '../assets/shots/noir-m.webp'
import ember from '../assets/shots/ember.webp'
import emberSm from '../assets/shots/ember-sm.webp'
import emberM from '../assets/shots/ember-m.webp'
import slice from '../assets/shots/slice.webp'
import sliceSm from '../assets/shots/slice-sm.webp'
import sliceM from '../assets/shots/slice-m.webp'
import mimo from '../assets/shots/mimo.webp'
import mimoSm from '../assets/shots/mimo-sm.webp'
import mimoM from '../assets/shots/mimo-m.webp'
import cafe from '../assets/shots/cafe.webp'
import cafeSm from '../assets/shots/cafe-sm.webp'
import cafeM from '../assets/shots/cafe-m.webp'
import soda from '../assets/shots/sksqueeze.webp'
import sodaSm from '../assets/shots/sksqueeze-sm.webp'
import sodaM from '../assets/shots/sksqueeze-m.webp'
import strata from '../assets/shots/strata.webp'
import strataSm from '../assets/shots/strata-sm.webp'
import strataM from '../assets/shots/strata-m.webp'
import vyro from '../assets/shots/vyro.webp'
import vyroSm from '../assets/shots/vyro-sm.webp'
import vyroM from '../assets/shots/vyro-m.webp'
import elzori from '../assets/shots/elzori.webp'
import elzoriSm from '../assets/shots/elzori-sm.webp'
import elzoriM from '../assets/shots/elzori-m.webp'
import dripyard from '../assets/shots/dripyard.webp'
import dripyardSm from '../assets/shots/dripyard-sm.webp'
import dripyardM from '../assets/shots/dripyard-m.webp'
import nordvale from '../assets/shots/nordvale.webp'
import nordvaleSm from '../assets/shots/nordvale-sm.webp'
import nordvaleM from '../assets/shots/nordvale-m.webp'
import houstonWatch from '../assets/shots/houstonwatch.webp'
import houstonWatchSm from '../assets/shots/houstonwatch-sm.webp'
import houstonWatchM from '../assets/shots/houstonwatch-m.webp'

// Brand marks captured from each live site header (src/assets/logos).
import luminaLogo from '../assets/logos/lumina-dental.webp'
import noirLogo from '../assets/logos/noir-crumb.webp'
import emberLogo from '../assets/logos/maison-ember.webp'
import sliceLogo from '../assets/logos/slice-and-stack.webp'
import mimoLogo from '../assets/logos/mimo-pet-care.webp'
import cafeLogo from '../assets/logos/maison-cafe.webp'
import sodaLogo from '../assets/logos/sk-squeeze-soda.webp'
import strataLogo from '../assets/logos/strata-renovation.webp'
import vyroLogo from '../assets/logos/vyro.webp'
import elzoriLogo from '../assets/logos/elzori.webp'
import dripyardLogo from '../assets/logos/dripyard.webp'
import nordvaleLogo from '../assets/logos/nordvale-store.webp'
import houstonWatchLogo from '../assets/logos/houston-watch-store.webp'

const shot = (desktop, desktopSm, mobile, alt) => ({ desktop, desktopSm, mobile, alt })

export const projects = [
  {
    slug: 'lumina-dental',
    logo: { src: luminaLogo, ground: '#070c14' },
    title: 'Lumina Dental',
    category: 'Dental / Healthcare',
    description:
      'A dark, luminous dental clinic site built around a glowing 3D tooth — calm motion, clear services and pricing, and an easy path to booking.',
    technologies: ['Vite', 'Three.js', 'GSAP', 'Lenis'],
    // Note: the provided URL (lumina_dental) does not resolve; the hyphenated domain serves the site.
    liveUrl: 'https://lumina-dental.skylinewebx.com/',
    githubUrl: null,
    image: shot(lumina, luminaSm, luminaM, 'Lumina Dental homepage with a glowing 3D tooth'),
    accent: '#3FD3C0',
  },
  {
    slug: 'noir-crumb',
    logo: { src: noirLogo, ground: '#0a0806' },
    title: 'Noir Crumb',
    category: 'Bakery / E-commerce',
    description:
      'A cinematic cookie brand: a hero cookie rendered in 3D, warm gold-on-black art direction and a shop that feels like a dessert counter.',
    technologies: ['React', 'React Three Fiber', 'GSAP', 'Lenis', 'Tailwind CSS'],
    liveUrl: 'https://noir-crumb.skylinewebx.com/',
    githubUrl: null,
    image: shot(noir, noirSm, noirM, 'Noir & Crumb homepage with a chocolate chip cookie'),
    accent: '#D9A55B',
  },
  {
    slug: 'maison-ember',
    logo: { src: emberLogo, ground: '#0e0d0c' },
    title: 'Maison Ember',
    category: 'Hospitality / Fine dining',
    description:
      'A dark European fine-dining site for Houston — atmospheric imagery, considered pacing and a reservation path that stays in reach.',
    technologies: ['Next.js', 'Tailwind CSS', 'GSAP', 'Lenis'],
    liveUrl: 'https://maison-ember.skylinewebx.com/',
    githubUrl: null,
    image: shot(ember, emberSm, emberM, 'Maison Ember restaurant homepage'),
    accent: '#C7652E',
  },
  {
    slug: 'slice-and-stack',
    logo: { src: sliceLogo, ground: '#0c0b0c' },
    title: 'Slice & Stack',
    category: 'Restaurant / Ordering',
    description:
      'Wood-fired pizza and flame-grilled burgers with a build-your-own ordering flow, cart and offers — bold, appetising and fast on mobile.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    liveUrl: 'https://slice-and-stack.skylinewebx.com/',
    githubUrl: null,
    image: shot(slice, sliceSm, sliceM, 'Slice & Stack pizza and burger homepage'),
    accent: '#FF7A1A',
  },
  {
    slug: 'mimo-pet-care',
    logo: { src: mimoLogo, ground: '#f8c9b7' },
    title: 'Mimo Pet Care',
    category: 'Pet care / Grooming',
    description:
      'A warm, friendly grooming studio site with services, pricing, gallery and booking — plus a simple owner edit mode for swapping photos.',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Lenis'],
    liveUrl: 'https://mimopetcare.skylinewebx.com/',
    githubUrl: 'https://github.com/skylinewebx/mimo-pet-care',
    image: shot(mimo, mimoSm, mimoM, 'Mimo Pet Care & Grooming homepage'),
    accent: '#91352B',
  },
  {
    slug: 'maison-cafe',
    logo: { src: cafeLogo, ground: '#e4e0d9' },
    title: 'Maison Cafe',
    category: 'Cafe / Coffee house',
    description:
      'A slow-crafted coffee house site with cinematic looping video, menu, story and visit pages — built to feel like the first sip.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Looping video'],
    liveUrl: 'https://maisoncafe.skylinewebx.com/',
    githubUrl: 'https://github.com/skylinewebx/maison-cafe-website',
    image: shot(cafe, cafeSm, cafeM, 'Maison Cafe coffee house homepage'),
    accent: '#B9773F',
  },
  {
    slug: 'sk-squeeze-soda',
    logo: { src: sodaLogo, ground: '#0b0a0f' },
    title: 'SK Squeeze Soda',
    category: 'Beverage / Storefront',
    description:
      'A premium sparkling soda storefront with original vector cans, scroll-driven can entrances, ten flavours and a full demo checkout.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'GSAP ScrollTrigger'],
    liveUrl: null,
    githubUrl: 'https://github.com/skylinewebx/sk-squeeze-soda',
    image: shot(soda, sodaSm, sodaM, 'SK Squeeze soda homepage with a citrus can'),
    accent: '#F29A1F',
  },
  {
    slug: 'strata-renovation',
    logo: { src: strataLogo, ground: '#0c0c0e' },
    title: 'Strata Renovation',
    category: 'Home renovation / Design studio',
    description:
      'A dark, architectural renovation studio site with a video hero, project work, services and a save-to-list feature for ideas.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Video hero'],
    liveUrl: 'https://strata-renovation.skylinewebx.com/',
    githubUrl: null,
    image: shot(strata, strataSm, strataM, 'Strata renovation studio homepage with a walnut kitchen'),
    accent: '#C08457',
  },
  {
    slug: 'vyro',
    logo: { src: vyroLogo, ground: '#fbc50d' },
    title: 'VYRO',
    category: 'Headphones / E-commerce',
    description:
      'A bold premium-audio storefront for headphones and wireless earbuds — vivid colour, confident type and a shop built to feel every frequency.',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'GSAP', 'Framer Motion', 'Lenis', 'Three.js'],
    liveUrl: 'https://vyro.skylinewebx.com/',
    githubUrl: 'https://github.com/skylinewebx/vyro',
    image: shot(vyro, vyroSm, vyroM, 'VYRO headphones homepage — Feel Every Frequency'),
    accent: '#FBC50D',
  },
  {
    slug: 'elzori',
    logo: { src: elzoriLogo, ground: '#2a1608' },
    title: 'ELZORI',
    category: 'Café / Restaurant',
    description:
      'A luxury coffee house site — rich espresso tones, elegant serif type and splashing coffee cups that set the mood before the first sip.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'GSAP', 'Lenis'],
    liveUrl: 'https://elzori.skylinewebx.com/',
    githubUrl: 'https://github.com/skylinewebx/elzori',
    image: shot(elzori, elzoriSm, elzoriM, 'ELZORI café homepage with splashing coffee cups'),
    accent: '#C97B3C',
  },
  {
    slug: 'dripyard',
    logo: { src: dripyardLogo, ground: '#0a0303' },
    title: 'DRIPYARD',
    category: 'Sneakers / E-commerce',
    description:
      'A bold sneaker store for Nike drops — Air Jordan 1, Air Force 1 and SB Dunk — with a cinematic video hero, flash-drop deals and a full cart and checkout.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Lenis'],
    liveUrl: 'https://dripyard.skylinewebx.com/',
    githubUrl: 'https://github.com/skylinewebx/dripyard',
    image: shot(dripyard, dripyardSm, dripyardM, 'DRIPYARD sneaker store homepage with a red smoke hero'),
    accent: '#E11D2E',
  },
  {
    slug: 'nordvale-store',
    logo: { src: nordvaleLogo, ground: '#f5f2eb' },
    title: 'NORDVALE',
    category: 'Apparel / E-commerce',
    description:
      'A calm, cream-toned clothing store for hoodies, jackets, trousers and t-shirts — drag-to-turn product views, category showcases and a US checkout.',
    technologies: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Framer Motion', 'Lenis'],
    liveUrl: 'https://nordvale-store.skylinewebx.com/',
    githubUrl: 'https://github.com/skylinewebx/nordvale-store',
    image: shot(nordvale, nordvaleSm, nordvaleM, 'NORDVALE clothing store homepage with a black hoodie'),
    accent: '#6E4B5A',
  },
  {
    slug: 'houston-watch-store',
    logo: { src: houstonWatchLogo, ground: '#070f21' },
    title: 'Houston Watch Store',
    category: 'Luxury watches / E-commerce',
    description:
      'A luxury watch boutique for Houston — hand-picked pieces shown with studio lighting, a live watch configurator and a smooth shop-to-checkout flow.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'WebGL'],
    liveUrl: 'https://houstonwatchstore.skylinewebx.com/',
    githubUrl: 'https://github.com/skylinewebx/houston-watch-store',
    image: shot(houstonWatch, houstonWatchSm, houstonWatchM, 'Meridian luxury watch store homepage with a blue diver watch'),
    accent: '#C9A86A',
  },
]

/** Primary link for a project: live site first, then GitHub. */
export const primaryLink = (p) =>
  p.liveUrl ? { href: p.liveUrl, label: 'View project', kind: 'live' } : p.githubUrl ? { href: p.githubUrl, label: 'View on GitHub', kind: 'github' } : null

export const hostOf = (url) => {
  try {
    const u = new URL(url)
    return u.hostname === 'github.com' ? `github.com${u.pathname}` : u.hostname
  } catch {
    return url
  }
}
