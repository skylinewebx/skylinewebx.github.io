/**
 * Selected work. Add, remove or reorder projects here.
 *
 * Fields
 *  name, category, description, services[], technologies[]
 *  image        { src, srcSmall, alt }  — 1440×900 + 720×450 WebP screenshots
 *  liveUrl      string | null           — leave null until the live link is ready
 *  caseStudyUrl string | null           — leave null until a case study exists
 *  accent       project-specific accent (used only for small details)
 *  layout       'left' | 'right' | 'full' — image position in the showcase
 *
 * Planned subdomains (add as liveUrl once DNS is live):
 *  avadermatology / audira / meridian / goatburgerco .skylinewebx.com
 */

import ava from '../assets/images/projects/ava-dermatology.webp'
import avaSm from '../assets/images/projects/ava-dermatology-sm.webp'
import audira from '../assets/images/projects/audira.webp'
import audiraSm from '../assets/images/projects/audira-sm.webp'
import meridian from '../assets/images/projects/meridian.webp'
import meridianSm from '../assets/images/projects/meridian-sm.webp'
import goat from '../assets/images/projects/goat-burger.webp'
import goatSm from '../assets/images/projects/goat-burger-sm.webp'
import mimo from '../assets/images/projects/mimo.webp'
import mimoSm from '../assets/images/projects/mimo-sm.webp'
import pearl from '../assets/images/projects/pearlcare.webp'
import pearlSm from '../assets/images/projects/pearlcare-sm.webp'
import maison from '../assets/images/projects/maison-ember.webp'
import maisonSm from '../assets/images/projects/maison-ember-sm.webp'

export const projects = [
  {
    slug: 'ava-dermatology',
    name: 'Ava Dermatology',
    category: 'Dermatology / Medical',
    description:
      'A calm, clinical-grade website for a modern dermatology practice — treatments, team and booking presented with the restraint patients expect from a medical brand.',
    services: ['Website Design', 'Website Development', 'Responsive Build'],
    technologies: ['HTML', 'CSS', 'JavaScript', 'WebGL hero'],
    image: { src: ava, srcSmall: avaSm, alt: 'Ava Dermatology website homepage' },
    liveUrl: null,
    caseStudyUrl: null,
    accent: '#B08A73',
    layout: 'left',
  },
  {
    slug: 'audira',
    name: 'Audira Headphones',
    category: 'Consumer / Audio',
    description:
      'A dark, bronze-lit storefront concept for a premium headphone brand, with product detail, cart, wishlist and a demo checkout flow.',
    services: ['E-commerce Design', 'Front-end Development', 'UI/UX'],
    technologies: ['HTML', 'CSS', 'JavaScript', 'Light / dark theme'],
    image: { src: audira, srcSmall: audiraSm, alt: 'Audira headphones store homepage' },
    liveUrl: null,
    caseStudyUrl: null,
    accent: '#C08A55',
    layout: 'right',
  },
  {
    slug: 'meridian',
    name: 'Meridian Watches',
    category: 'Luxury / E-commerce',
    description:
      'A cinematic luxury-watch e-commerce concept built around an interactive 3D timepiece, scroll-driven storytelling and a complete shop flow.',
    services: ['Creative Direction', 'Website Development', 'E-commerce UX'],
    technologies: ['Next.js', 'React Three Fiber', 'GSAP', 'Lenis', 'Tailwind CSS'],
    image: { src: meridian, srcSmall: meridianSm, alt: 'Meridian Watches homepage with 3D watch' },
    liveUrl: null,
    caseStudyUrl: null,
    accent: '#A88B4A',
    layout: 'full',
  },
  {
    slug: 'goat-burger',
    name: 'GOAT Burger Co.',
    category: 'Restaurant',
    description:
      'A scroll-controlled product film: the signature burger deconstructs layer by layer, then packs into a branded box before the menu appears.',
    services: ['Concept & Motion', 'Website Development', 'Asset Preparation'],
    technologies: ['GSAP ScrollTrigger', 'Lenis', 'HTML', 'CSS'],
    image: { src: goat, srcSmall: goatSm, alt: 'GOAT Burger Co. homepage with a double cheeseburger' },
    liveUrl: null,
    caseStudyUrl: null,
    accent: '#D4AF37',
    layout: 'left',
  },
  {
    slug: 'mimo-pet-care',
    name: 'Mimo Pet Care & Grooming',
    category: 'Pet Care',
    description:
      'A warm, friendly grooming studio site with services, pricing, gallery and booking — plus a simple owner edit mode for swapping photos.',
    services: ['Website Design', 'Website Development', 'Content Structure'],
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Lenis'],
    image: { src: mimo, srcSmall: mimoSm, alt: 'Mimo Pet Care & Grooming homepage' },
    liveUrl: 'https://mimopetcare.skylinewebx.com',
    caseStudyUrl: null,
    accent: '#91352B',
    layout: 'right',
  },
  {
    slug: 'pearlcare-dental',
    name: 'PearlCare Dental',
    category: 'Dental / Healthcare',
    description:
      'An editorial dental practice website with serif typography, full-bleed imagery, a treatments slider and clear pricing.',
    services: ['Website Design', 'Website Development', 'Motion'],
    technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'Lenis'],
    image: { src: pearl, srcSmall: pearlSm, alt: 'PearlCare Dental homepage' },
    liveUrl: null,
    caseStudyUrl: null,
    accent: '#3E7C7B',
    layout: 'full',
  },
  {
    slug: 'maison-ember',
    name: 'Maison Ember',
    category: 'Hospitality / Lifestyle',
    description:
      'An atmospheric hospitality website for a restaurant brand — moody imagery, considered pacing and a menu that reads like the room feels.',
    services: ['Website Design', 'Website Development', 'Motion'],
    technologies: ['Next.js', 'Tailwind CSS', 'GSAP', 'Lenis'],
    image: { src: maison, srcSmall: maisonSm, alt: 'Maison Ember restaurant homepage' },
    liveUrl: null,
    caseStudyUrl: null,
    accent: '#B4532A',
    layout: 'left',
  },
]
