import { Event, Testimonial } from './types.enhanced';

export const mockEvents: Event[] = [
  {
    id: 'evt_001',
    title: 'Tressed Up!',
    description: 'Get creative and elevate your style! Join our hands-on workshop, Tressed Up!, where you\'ll learn to craft your own unique hair accessories. From basics to intricate designs, our expert guidance will help you unleash your creativity and take your hair game to the next level!',
    date: '2025-08-26',
    time: '13:30-15:30',
    location: 'Seminar Hall (MCAS Vengara)',
    category: 'Creativity',
    maxAttendees: 35,
    currentAttendees: 0,
    price: 99,
    image: 'https://images.pexels.com/photos/3993212/pexels-photo-3993212.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    tags: ['hair-accessories', 'creativity', 'workshop', 'diy', 'style'],
    organizer: {
      name: 'Sip\'n\'Sync Team',
      avatar: 'https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    createdAt: '2025-08-19T10:00:00Z',
    updatedAt: '2025-08-19T10:00:00Z'
  }
];

export const mockTestimonials: Testimonial[] = [
  {
    id: 'test_001',
    name: 'Sarah Chen',
    role: 'UX Designer',
    company: 'TechFlow Inc.',
    content: 'Sip\'n\'Sync transformed my approach to work-life balance. The mindful coffee chats became the highlight of my week, and I\'ve built lasting friendships.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    featured: true,
    createdAt: '2025-01-10T12:00:00Z'
  },
  {
    id: 'test_002',
    name: 'Marcus Johnson',
    role: 'Marketing Student',
    company: 'State University',
    content: 'As a university student, I was struggling with isolation. The community I found here has been life-changing. I feel more motivated and connected than ever.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    featured: true,
    createdAt: '2025-01-12T15:30:00Z'
  },
  {
    id: 'test_003',
    name: 'Elena Rodriguez',
    role: 'Tech Entrepreneur',
    company: 'StartupLab',
    content: 'The productivity workshops gave me tools I use daily in my startup. More importantly, I found a support system of like-minded individuals who understand the journey.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    featured: true,
    createdAt: '2025-01-14T11:20:00Z'
  }
];