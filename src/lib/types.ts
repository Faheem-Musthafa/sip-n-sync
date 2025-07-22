export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: EventCategory;
  maxAttendees: number;
  currentAttendees: number;
  price: number;
  image: string;
  featured: boolean;
  tags: string[];
  organizer: {
    name: string;
    avatar: string;
  };
  createdAt: string;
  updatedAt: string;
}

export type EventCategory = 'Wellness' | 'Productivity' | 'Creativity' | 'Community' | 'Networking';

export interface EventRegistration {
  id: string;
  eventId: string;
  attendee: {
    name: string;
    email: string;
    phone?: string;
  };
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  registeredAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  content: string;
  rating: number;
  avatar: string;
  featured: boolean;
  createdAt: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}