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
      avatar: '/shifa'
    },
    createdAt: '2025-08-19T10:00:00Z',
    updatedAt: '2025-08-19T10:00:00Z'
  }
];

