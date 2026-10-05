/**
 * AI assistants — every chatbot project in github.com/skylinewebx.
 * Details come from each repository's README; screenshots are real
 * conversations captured from the live demos (src/assets/shots/bot-*.webp).
 *
 * { slug, title, type, summary, helps[], features[], stats[{value,label}],
 *   technologies[], liveUrl, githubUrl, image { desktop, mobile, alt }, accent }
 */

import clinic from '../assets/shots/bot-clinic.webp'
import clinicM from '../assets/shots/bot-clinic-m.webp'
import restaurant from '../assets/shots/bot-restaurant.webp'
import restaurantM from '../assets/shots/bot-restaurant-m.webp'
import pet from '../assets/shots/bot-pet.webp'
import petM from '../assets/shots/bot-pet-m.webp'
import demoHome from '../assets/shots/bot-demo-home.webp'
import demoM from '../assets/shots/bot-demo-m.webp'

const ENGINE = ['Vanilla JavaScript', 'Shadow DOM widget', 'Rule-based intent engine', 'No API key']

export const assistants = [
  {
    slug: 'clinic-chatbot',
    title: 'Clinic AI Assistant',
    type: 'Healthcare / Medical clinics',
    summary:
      'A safety-first assistant for clinics. One chatbot covers 15 departments, works out which one a patient needs from each message, and books appointments.',
    helps: ['Answers patient questions', 'Shares prices & insurance details', 'Books appointments'],
    features: [
      'Routes each message to the right department',
      'Never diagnoses; emergencies are pointed to 911, crisis mentions to 988',
      'Validates dates, times and contact details',
      'Owner view lists bookings as they arrive',
    ],
    stats: [
      { value: '15', label: 'Medical departments' },
      { value: '60+', label: 'Q&As per niche' },
      { value: '0', label: 'API keys needed' },
    ],
    technologies: ENGINE,
    liveUrl: 'https://clinic-chatbot.skylinewebx.com/',
    githubUrl: 'https://github.com/skylinewebx/clinic-chatbot',
    image: { desktop: clinic, mobile: clinicM, alt: 'Clinic assistant answering a question about teeth cleaning prices and insurance' },
    accent: '#2DD4BF',
  },
  {
    slug: 'restaurant-chatbot',
    title: 'Restaurant Assistant',
    type: 'Restaurants / Hospitality',
    summary:
      'One chat for every kind of restaurant. Guests ask about the menu, prices and hours, book a table, order for pickup or delivery, or request a catering quote.',
    helps: ['Table reservations', 'Pickup & delivery orders', 'Catering enquiries'],
    features: [
      'Menu, prices, hours and policies',
      'Seating preference and party size in the booking',
      'Single-restaurant pages with name, city and phone overrides',
      'Optional webhook posts confirmed bookings and orders',
    ],
    stats: [
      { value: '17', label: 'Cuisine sections' },
      { value: '15', label: 'Restaurant configs' },
      { value: '52', label: 'Scripted test conversations' },
    ],
    technologies: ENGINE,
    liveUrl: 'https://resturant-chatbot.skylinewebx.com/',
    githubUrl: 'https://github.com/skylinewebx/restaurant-chatbot',
    image: { desktop: restaurant, mobile: restaurantM, alt: 'Restaurant assistant confirming a table for four on Saturday' },
    accent: '#F59E0B',
  },
  {
    slug: 'pet-chatbot',
    title: 'PawCare Pet Assistant',
    type: 'Pet clinic / Grooming',
    summary:
      'A friendly assistant for a pet clinic and grooming business. It answers questions in short, clear replies and books grooming and vet visits step by step.',
    helps: ['Grooming & vet bookings', 'Services and prices', 'Home pickup requests'],
    features: [
      'Always-visible quick replies for common questions',
      'Time-slot chips with taken slots crossed out',
      'Summary card with Edit / Confirm, then Add to Calendar (.ics)',
      'One-line embed on any website',
    ],
    stats: [
      { value: '110', label: 'Business Q&As' },
      { value: '282', label: 'Automated checks' },
      { value: '7', label: 'Quick-reply actions' },
    ],
    technologies: ENGINE,
    liveUrl: 'https://petchatbot.skylinewebx.com/',
    githubUrl: 'https://github.com/skylinewebx/pet-chatbot',
    image: { desktop: pet, mobile: petM, alt: 'PawCare assistant quoting the price of a basic dog bath' },
    accent: '#E0A060',
  },
  {
    slug: 'demo-chatbot',
    title: 'Multi-Industry Assistant',
    type: 'Dental · Restaurant · Real estate · Salon · Gym',
    summary:
      'One engine with a separate config per business. Each bot answers only about its own business and takes bookings — appointments, tables, property viewings or trial classes.',
    helps: ['Business-specific answers', 'Bookings for any industry', 'Polite off-topic handling'],
    features: [
      'New client in three steps: copy a config, edit, embed',
      'Several bookings in one chat, with one combined summary',
      'Waits for the visitor to finish typing, then answers everything at once',
      'Declines off-topic and prompt-injection attempts politely',
    ],
    stats: [
      { value: '5', label: 'Industries' },
      { value: '25+', label: 'Q&As per business' },
      { value: '1', label: 'Script tag to embed' },
    ],
    technologies: ENGINE,
    liveUrl: 'https://demo-chatbot.skylinewebx.com/',
    githubUrl: 'https://github.com/skylinewebx/demo-chatbot',
    image: { desktop: demoHome, mobile: demoM, alt: 'AI chatbot demos for five industries, and the dental assistant answering about opening hours' },
    accent: '#F97316',
  },
]
