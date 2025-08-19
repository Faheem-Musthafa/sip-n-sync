export const APP_CONFIG = {
  name: 'Sip\'n\'Sync',
  tagline: 'Connect. Discover. Celebrate.',
  description: 'Join a mindful community where mental well-being meets meaningful connections.',
  version: '1.0.0',
  contact: {
    email: 'sipnsync@gmail.com',
    phone: '+91 98765 43210',
    address: 'Malabar College of Advanced Studies, Vangara, kerala, India',
  },
  social: {
    instagram: 'https://instagram.com/sipnsyncc',
    twitter: 'https://twitter.com/sipnsyncc',
    linkedin: 'https://linkedin.com/company/sipnsyncc',
  },
  urls: {
    calendly: 'https://calendly.com/sipnsync',
    googleMaps: 'https://maps.google.com/?q=Malabar+College+Vangara+Kerala',
  },
} as const;

export const NAVIGATION_ITEMS = [
  { name: 'Home', href: '/' },
   { name: 'About', href: '/about' },
  { name: 'Events', href: '/events' },
  { name: 'Contact', href: '/contact' },
] as const;

export const EVENT_CATEGORIES = [
  'All',
  'Wellness',
  'Productivity', 
  'Creativity',
  'Community',
  'Networking'
] as const;

// Contact form categories
export const CONTACT_CATEGORIES = [
  'General Inquiry',
  'Event Registration',
  'Partnership',
  'Technical Support',
  'Feedback',
  'Other'
] as const;

// Urgency levels
export const URGENCY_LEVELS = [
  { value: 'low', label: 'Low', responseTime: '3-5 business days' },
  { value: 'medium', label: 'Medium', responseTime: '1-2 business days' },
  { value: 'high', label: 'High', responseTime: 'Same day' },
] as const;

// Office hours
export const OFFICE_HOURS = [
  { day: 'Monday - Friday', hours: '8:00 AM - 8:00 PM' },
  { day: 'Saturday', hours: '9:00 AM - 6:00 PM' },
  { day: 'Sunday', hours: '10:00 AM - 4:00 PM' },
  { day: 'Holidays', hours: 'By appointment', special: true },
] as const;

// Community stats
export const COMMUNITY_STATS = [
  { label: 'Active Members', value: '2,500+', color: 'text-healing-green' },
  { label: 'Events Hosted', value: '150+', color: 'text-energy-orange' },
  { label: 'Satisfaction Rate', value: '98%', color: 'text-purple-500' },
  { label: 'Community Support', value: '24/7', color: 'text-blue-500' },
] as const;