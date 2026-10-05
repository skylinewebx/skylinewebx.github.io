/**
 * Site-wide content. Edit copy, links and lists here —
 * components read everything from this file.
 */

export const brand = {
  name: 'Skyline Webx',
  owner: 'Ayla',
  role: 'Web Designer / Developer / Agency Owner',
  location: 'Houston, United States',
  timezone: 'America/Chicago',
  email: 'info@skylinewebx.com',
  website: 'https://skylinewebx.com',
  tagline: 'Premium websites for modern businesses.',
  year: 2026,
}

export const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/skylinewebx' },
  { label: 'Facebook', href: 'https://www.facebook.com/share/1MhWtDCXHZ/?mibextid=wwXIfr' },
  { label: 'GitHub', href: 'https://github.com/skylinewebx' },
]

export const nav = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
]

export const hero = {
  status: 'Open for new projects',
  title: ['Premium websites', 'for businesses ready', 'to look the part.'],
  // Line breaks used below 768px.
  titleMobile: ['Premium websites', 'for businesses', 'ready to look', 'the part.'],
  // Phrase rendered in the brand accent.
  accentPhrase: 'the part.',
  copy: 'Skyline Webx designs and develops modern, high-converting websites for businesses that want a stronger digital presence.',
  pillars: ['Design', 'Development', 'Business results'],
}

export const statement = {
  label: 'The studio',
  lines: [
    'We don’t just build websites.',
    'We build digital experiences',
    'that make businesses look',
    'worth choosing.',
  ],
  // Words rendered in muted ink to create rhythm.
  muted: ['We don’t just build websites.'],
}

export const about = {
  heading: 'About Skyline Webx',
  lead: 'Ayla is a web designer, developer and agency owner focused on creating premium websites for modern businesses.',
  body: 'Skyline Webx combines visual design, responsive development and thoughtful user experience to create websites that look professional and help businesses turn visitors into customers.',
  identity: [
    { key: 'Name', value: 'Ayla' },
    { key: 'Role', value: 'Web Designer / Developer / Agency Owner' },
    { key: 'Base', value: 'Houston, United States' },
    { key: 'Studio', value: 'Skyline Webx' },
  ],
}

export const services = [
  {
    title: 'Website Design',
    description: 'Visual direction, layout and typography shaped around your brand — so the site feels considered from the first scroll.',
    tags: ['Art direction', 'Layout systems', 'Typography'],
  },
  {
    title: 'Website Development',
    description: 'Clean, responsive front-end builds that match the design closely and hold up on every screen size.',
    tags: ['React', 'Vite / Next.js', 'Responsive builds'],
  },
  {
    title: 'Business Websites',
    description: 'Multi-section sites for service businesses — clinics, restaurants, studios — built to explain what you do and make it easy to get in touch.',
    tags: ['Service pages', 'Booking paths', 'Local presence'],
  },
  {
    title: 'Landing Pages',
    description: 'Focused single pages for a launch, an offer or a campaign, with one clear action and nothing in the way of it.',
    tags: ['Campaigns', 'Product launches', 'Single CTA'],
  },
  {
    title: 'UI/UX Design',
    description: 'User journeys, wireframes and interface details that make a site easy to understand and pleasant to use.',
    tags: ['User flows', 'Wireframes', 'Interface design'],
  },
  {
    title: 'Website Redesign',
    description: 'A fresh visual and structural pass on an existing site that no longer reflects the quality of the business behind it.',
    tags: ['Audit', 'Restructure', 'Modernise'],
  },
  {
    title: 'AI Chatbot / AI Assistant Integration',
    description: 'An on-site assistant that answers common questions and guides visitors, set up around your own business information.',
    tags: ['FAQ assistant', 'Lead capture', 'Website embed'],
  },
  {
    title: 'Responsive & Performance Optimization',
    description: 'Tightening layouts across devices and trimming what slows a site down — images, scripts, fonts and animation load.',
    tags: ['Mobile polish', 'Image optimisation', 'Load speed'],
  },
]

export const aiAssistant = {
  label: 'AI website assistants',
  heading: 'Websites that can do more.',
  copy: 'An optional add-on for businesses that get the same questions every day. The assistant lives on your site, is set up with your own information, and helps visitors find answers — any time of day.',
  uses: [
    'Answering frequently asked questions',
    'Explaining services and what’s included',
    'General visitor guidance around the site',
    'Appointment-related questions',
    'Capturing leads for follow-up',
  ],
  note: 'Illustrative interface. What an assistant can do depends on how it is configured for each business.',
  // Demo conversation shown in the mockup.
  conversation: [
    { from: 'user', text: 'Do you offer weekend appointments?' },
    { from: 'bot', text: 'Yes — Saturday mornings are available. Would you like me to note your details so the team can confirm a time?' },
    { from: 'user', text: 'Sure, that works.' },
  ],
}

export const process = [
  { title: 'Discover', copy: 'Understand the business, audience and goals.' },
  { title: 'Design', copy: 'Create the visual direction and user experience.' },
  { title: 'Build', copy: 'Develop the website with responsive, clean code.' },
  { title: 'Launch', copy: 'Test, refine and prepare the website for launch.' },
]

export const approach = {
  label: 'Why Skyline Webx',
  heading: 'An approach built around the business, not the template.',
  points: [
    { title: 'Designed around the business', copy: 'Every layout decision starts from what you sell and who you sell it to.' },
    { title: 'Mobile-first thinking', copy: 'Most visitors arrive on a phone, so that is where the design starts.' },
    { title: 'Premium visual presentation', copy: 'Typography, spacing and imagery that make a business look established.' },
    { title: 'Responsive development', copy: 'Built to hold its shape on every screen, from small phones to wide desktops.' },
    { title: 'Performance-conscious builds', copy: 'Optimised images, restrained scripts and motion that never blocks the page.' },
    { title: 'Clear user journeys', copy: 'Visitors always know where they are and what to do next.' },
    { title: 'Modern interactions', copy: 'Subtle motion that adds polish without getting in the way.' },
    { title: 'Scalable foundation', copy: 'Clean, organised code that is easy to extend as the business grows.' },
  ],
}

export const cta = {
  title: ['Let’s build something', 'worth remembering.'],
  copy: 'Have a business that deserves a better digital presence? Let’s create it.',
}

export const contact = {
  heading: 'Start a project',
  copy: 'Tell me a little about your business and what you need. I’ll reply by email.',
  needs: ['New website', 'Website redesign', 'Landing page', 'AI assistant', 'Something else'],
}
