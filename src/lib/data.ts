import { Event, Testimonial } from './types.enhanced';

export const mockEvents: Event[] = [
  {
    id: 'evt_001',
    title: 'Mindful Morning Coffee Chat',
    description: 'Start your day with intentional conversations over artisanal coffee. Connect with like-minded individuals in a relaxed, welcoming environment designed to foster meaningful relationships.',
    date: '2025-03-15',
    time: '09:00-11:00',
    location: 'Downtown Café, 123 Main St',
    category: 'Wellness',
    maxAttendees: 20,
    currentAttendees: 0,
    price: 0,
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    tags: ['mindfulness', 'networking', 'coffee'],
    organizer: {
      name: 'Sarah Chen',
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z'
  },
  {
    id: 'evt_002',
    title: 'Productivity Power Hour',
    description: 'Learn time management techniques and productivity hacks from successful entrepreneurs and professionals. Transform your workflow and achieve more with less stress.',
    date: '2025-03-20',
    time: '18:00-20:00',
    location: 'Innovation Hub, 456 Tech Ave',
    category: 'Productivity',
    maxAttendees: 15,
    currentAttendees: 0,
    price: 25,
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    tags: ['productivity', 'time-management', 'entrepreneurship'],
    organizer: {
      name: 'Marcus Johnson',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    createdAt: '2025-01-16T14:30:00Z',
    updatedAt: '2025-01-16T14:30:00Z'
  },
  {
    id: 'evt_003',
    title: 'Creative Expression Workshop',
    description: 'Unleash your creativity through guided art activities designed to promote self-discovery and stress relief. No experience necessary - just bring your curiosity.',
    date: '2025-03-25',
    time: '14:00-17:00',
    location: 'Art Studio Collective, 789 Creative Blvd',
    category: 'Creativity',
    maxAttendees: 25,
    currentAttendees: 0,
    price: 35,
    image: 'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false,
    tags: ['art', 'creativity', 'self-discovery'],
    organizer: {
      name: 'Elena Rodriguez',
      avatar: 'https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    createdAt: '2025-01-17T09:15:00Z',
    updatedAt: '2025-01-17T09:15:00Z'
  },
  {
    id: 'evt_004',
    title: 'Community Building Brunch',
    description: 'Join us for a delicious brunch while discussing community initiatives and ways to make a positive impact in our neighborhood.',
    date: '2025-03-30',
    time: '11:00-13:30',
    location: 'Garden Terrace Restaurant, 321 Community St',
    category: 'Community',
    maxAttendees: 30,
    currentAttendees: 0,
    price: 45,
    image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false,
    tags: ['community', 'brunch', 'social-impact'],
    organizer: {
      name: 'David Kim',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    createdAt: '2025-01-18T16:45:00Z',
    updatedAt: '2025-01-18T16:45:00Z'
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