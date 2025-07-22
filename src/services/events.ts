import { Event, EventRegistration, EventCategory } from '../lib/types';
import { mockEvents } from '../lib/data';
import { api } from '../lib/api';

export class EventsService {
  // Static categories for easy extension
  static CATEGORIES: (EventCategory | 'All')[] = [
    'All', 'Wellness', 'Productivity', 'Creativity', 'Community', 'Networking'
  ];

  /**
   * Get events with optional filters
   */
  async getEvents(filters?: {
    category?: EventCategory | 'All';
    search?: string;
    featured?: boolean;
    limit?: number;
  }): Promise<Event[]> {
    try {
      // In production, this would be an API call
      // const response = await api.get<Event[]>('/events');
      // return response.data || [];

      // For MVP, use mock data with filtering
      let filteredEvents = this._filterEvents([...mockEvents], filters);
      return filteredEvents;
    } catch (error) {
      console.error('Failed to fetch events:', error);
      throw new Error('Unable to load events. Please try again later.');
    }
  }

  /**
   * Get a single event by ID
   */
  async getEvent(id: string): Promise<Event | null> {
    try {
      // const response = await api.get<Event>(`/events/${id}`);
      // return response.data || null;
      return mockEvents.find(event => event.id === id) || null;
    } catch (error) {
      console.error('Failed to fetch event:', error);
      return null;
    }
  }

  /**
   * Register for an event
   */
  async registerForEvent(eventId: string, registration: Omit<EventRegistration, 'id' | 'eventId' | 'status' | 'registeredAt'>): Promise<boolean> {
    try {
      // const response = await api.post(`/events/${eventId}/register`, registration);
      // return response.success;
      // For MVP, log registration data
      console.log('Registration:', { eventId, ...registration });
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Submit to Google Sheets if enabled
      try {
        // Use dynamic import to avoid circular dependencies
        const googleSheetsModule = await import('./googleSheets');
        // Pass the event title directly to avoid another lookup
        const event = await this.getEvent(eventId);
        await googleSheetsModule.submitToGoogleSheets(eventId, registration, event?.title);
      } catch (sheetsError) {
        // Log but don't fail the registration if Google Sheets fails
        console.warn('Google Sheets submission failed:', sheetsError);
        // Continue with registration process
      }
      return true;
    } catch (error) {
      console.error('Failed to register for event:', error);
      throw new Error('Registration failed. Please try again.');
    }
  }

  /**
   * Get featured events (limit 3)
   */
  async getFeaturedEvents(): Promise<Event[]> {
    return this.getEvents({ featured: true, limit: 3 });
  }

  /**
   * Get all categories
   */
  getCategories(): (EventCategory | 'All')[] {
    return EventsService.CATEGORIES;
  }

  /**
   * Private helper for filtering events
   */
  private _filterEvents(events: Event[], filters?: {
    category?: EventCategory | 'All';
    search?: string;
    featured?: boolean;
    limit?: number;
  }): Event[] {
    let filtered = events;
    if (filters?.category && filters.category !== 'All') {
      filtered = filtered.filter(event => event.category === filters.category);
    }
    if (filters?.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm) ||
        event.description.toLowerCase().includes(searchTerm) ||
        event.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }
    if (filters?.featured) {
      filtered = filtered.filter(event => event.featured);
    }
    if (filters?.limit) {
      filtered = filtered.slice(0, filters.limit);
    }
    return filtered;
  }
}

export const eventsService = new EventsService();