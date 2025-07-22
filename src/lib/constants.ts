export const APP_CONFIG = {
  name: 'Sip\'n\'Sync',
  tagline: 'Relax. Reflect. Connect.',
  description: 'Join a mindful community where mental well-being meets meaningful connections.',
  version: '1.0.0',
  contact: {
    email: 'hello@sipnsync.com',
    phone: '+1 (234) 567-890',
    address: '123 Wellness Street, Mindful City, MC 12345',
  },
  social: {
    instagram: 'https://instagram.com/sipnsync',
    twitter: 'https://twitter.com/sipnsync',
    linkedin: 'https://linkedin.com/company/sipnsync',
  },
} as const;

export const NAVIGATION_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'Events', href: '/events' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
] as const;

export const EVENT_CATEGORIES = [
  'All',
  'Wellness',
  'Productivity', 
  'Creativity',
  'Community',
  'Networking'
] as const;