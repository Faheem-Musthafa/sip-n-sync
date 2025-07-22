import { useState, useEffect, useCallback } from 'react';
import { Event, EventCategory } from '../lib/types';
import { eventsService } from '../services/events';

interface EventFilters {
  category: EventCategory | 'All';
  search: string;
  featured?: boolean;
}

interface UseEventsReturn {
  events: Event[];
  loading: boolean;
  error: string | null;
  filters: EventFilters;
  setFilters: (filters: Partial<EventFilters>) => void;
  refetch: () => Promise<void>;
}

export function useEvents(initialFilters?: Partial<EventFilters>): UseEventsReturn {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFiltersState] = useState<EventFilters>({
    category: 'All',
    search: '',
    ...initialFilters,
  });

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const fetchedEvents = await eventsService.getEvents({
        category: filters.category,
        search: filters.search || undefined,
        featured: filters.featured,
      });
      
      setEvents(fetchedEvents);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load events');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const setFilters = useCallback((newFilters: Partial<EventFilters>) => {
    setFiltersState(prev => ({ ...prev, ...newFilters }));
  }, []);

  const refetch = useCallback(async () => {
    await fetchEvents();
  }, [fetchEvents]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return {
    events,
    loading,
    error,
    filters,
    setFilters,
    refetch,
  };
}