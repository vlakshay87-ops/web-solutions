export const BUSINESS_INFO = {
  name: 'WEB SOLUTIONS',
  tagline: 'Modern websites for modern businesses.',
  locationShort: 'New Delhi, India',
  addressLine1: 'E3H, Jeevan Park',
  addressLine2: 'Uttam Nagar, New Delhi',
  fullAddress: 'E3H, Jeevan Park, Uttam Nagar, New Delhi',
  whatsappDisplay: '9319672630',
  whatsappNumberE164: '919319672630',
  defaultWhatsAppMessage:
    'Hi Web Solutions, I’m interested in getting a website for my business.',
} as const;

export function getWhatsAppUrl(customMessage?: string): string {
  const message = encodeURIComponent(
    customMessage || BUSINESS_INFO.defaultWhatsAppMessage
  );
  return `https://wa.me/${BUSINESS_INFO.whatsappNumberE164}?text=${message}`;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  {id: 'home', label: 'Home', href: '#home'},
  {id: 'services', label: 'Services', href: '#services'},
  {id: 'work', label: 'Work', href: '#work'},
  {id: 'process', label: 'Process', href: '#process'},
  {id: 'contact', label: 'Contact', href: '#contact'},
];

export interface ServiceItem {
  number: string;
  title: string;
  description: string;
  serviceOption: string;
  motif: 'business' | 'landing' | 'ecommerce' | 'custom';
}

export const SERVICES: ServiceItem[] = [
  {
    number: '01',
    title: 'Business Websites',
    description:
      'Modern websites for local businesses, professionals and growing brands.',
    serviceOption: 'Business Website',
    motif: 'business',
  },
  {
    number: '02',
    title: 'Landing Pages',
    description:
      'Focused landing pages designed to turn visitors into enquiries.',
    serviceOption: 'Landing Page',
    motif: 'landing',
  },
  {
    number: '03',
    title: 'E-Commerce Websites',
    description:
      'Clean online stores designed for products, sales and growth.',
    serviceOption: 'E-Commerce',
    motif: 'ecommerce',
  },
  {
    number: '04',
    title: 'Custom Web Solutions',
    description:
      'Unique web experiences built around your specific business requirements.',
    serviceOption: 'Custom Website',
    motif: 'custom',
  },
];

export interface ShowcaseProject {
  id: 'elite-motors' | 'pawfect' | 'nova';
  name: string;
  category: string;
  serviceOption: string;
  description: string;
  summary: string;
  highlights: string[];
  domainUrl: string;
}

export const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: 'elite-motors',
    name: 'ELITE MOTORS',
    category: 'Automotive dealership website',
    serviceOption: 'Business Website',
    description:
      'A sleek digital showroom engineered for high-intent buyers, test-drive bookings, and instant vehicle comparison.',
    summary:
      'Dark-studio automotive showcase pairing crisp editorial specifications with frictionless showroom test-drive scheduling.',
    highlights: [
      'Interactive specification strip and model selector',
      'Instant WhatsApp & showroom booking flow',
      'Fast mobile-first vehicle gallery layout',
    ],
    domainUrl: 'elitemotors.in',
  },
  {
    id: 'pawfect',
    name: 'PAWFECT',
    category: 'Pet grooming & care website',
    serviceOption: 'Business Website',
    description:
      'A warm, trustworthy booking experience crafted for local pet parents looking for hygienic, stress-free care.',
    summary:
      'Editorial warm-stone interface designed to build instant confidence with clear service tiers and one-tap appointment booking.',
    highlights: [
      'Structured grooming package comparison',
      'Clear location, hours, and booking flow',
      'Warm palette tailored for family trust',
    ],
    domainUrl: 'pawfectcare.in',
  },
  {
    id: 'nova',
    name: 'NOVA',
    category: 'Modern business landing page',
    serviceOption: 'Landing Page',
    description:
      'A sharp B2B product landing page built around clear value hierarchy, clean product previews, and conversion.',
    summary:
      'Swiss-inspired structural layout focused on communicating complex software offerings in seconds.',
    highlights: [
      'Clear above-the-fold headline and product frame',
      'Focused single-action enquiry funnel',
      'Sub-second perceived page transitions',
    ],
    domainUrl: 'novaworkspace.io',
  },
];

export interface WhyBlock {
  number: string;
  title: string;
  description: string;
}

export const WHY_BLOCKS: WhyBlock[] = [
  {
    number: '01',
    title: 'FIRST IMPRESSION',
    description:
      'Make your business look established from the first click.',
  },
  {
    number: '02',
    title: 'USER EXPERIENCE',
    description:
      'Simple navigation and clear information that visitors understand instantly.',
  },
  {
    number: '03',
    title: 'ACTION',
    description:
      'Strategic CTAs that make it easy for customers to call, message or enquire.',
  },
];

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'DISCOVER',
    description: 'We understand your business, audience and goals.',
  },
  {
    number: '02',
    title: 'DESIGN',
    description: 'We create the visual direction and user experience.',
  },
  {
    number: '03',
    title: 'BUILD',
    description: 'We turn the concept into a fast responsive website.',
  },
  {
    number: '04',
    title: 'LAUNCH',
    description: 'Your website goes live and is ready for customers.',
  },
];

export const NEED_OPTIONS = [
  'Business Website',
  'Landing Page',
  'E-Commerce',
  'Custom Website',
  'Other',
] as const;
