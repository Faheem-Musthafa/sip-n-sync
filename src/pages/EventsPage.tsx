import { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Grid, 
  List,
  X,
  Sparkles,
  Coffee,
  ArrowUp
} from 'lucide-react';
import { Event } from '../lib/types.enhanced';
import { useEvents } from '../hooks/useEvents';
import { EventCard } from '../components/events/EventCard';
import EventRegistrationModal from '../components/events/EventRegistrationModal';
import { Button } from '../components/ui/Button';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { Toast } from '../components/ui/Toast';

type ViewMode = 'grid' | 'list';
type SortOption = 'date' | 'title' | 'price' | 'popularity';
const sortOptions = [
  { value: 'date', label: 'By Date' },
  { value: 'title', label: 'By Title' },
  { value: 'price', label: 'By Price' },
  { value: 'popularity', label: 'By Popularity' }
];

export function EventsPage() {
  const { events, loading, error } = useEvents();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('date');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('All');
  const [availableOnly, setAvailableOnly] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showRegister, setShowRegister] = useState(false);
  const [toast, setToast] = useState<{ message: string; type?: 'success' | 'error' | 'warning' | 'info' } | null>(null);

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(events.map((e: Event) => e.category)))],
    [events]
  );

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Search shortcut (Ctrl/Cmd + K)
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
        searchInput?.focus();
      }
      
      // Close modals (Escape)
      if (e.key === 'Escape') {
        // No modals to close
      }
      
      // View mode toggle (V)
      if (e.key === 'v' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const activeElement = document.activeElement;
        if (activeElement?.tagName !== 'INPUT' && activeElement?.tagName !== 'TEXTAREA') {
          e.preventDefault();
          setViewMode(prev => prev === 'grid' ? 'list' : 'grid');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Scroll to top functionality
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEventRegistration = (event: Event) => {
    setSelectedEvent(event);
    setShowRegister(true);
  };

  // Filter and sort events
  const filteredAndSortedEvents = useMemo(() => {
    const filtered = events.filter((event: Event) => {
      // Search
      if (search) {
        const term = search.toLowerCase();
        const matches =
          event.title.toLowerCase().includes(term) ||
          event.description.toLowerCase().includes(term) ||
          event.category.toLowerCase().includes(term) ||
          event.location.toLowerCase().includes(term) ||
          event.organizer.name.toLowerCase().includes(term);
        if (!matches) return false;
      }

      // Category
      if (category !== 'All' && event.category !== category) return false;

      // Availability
      if (availableOnly && event.currentAttendees >= event.maxAttendees) return false;

      return true;
    });

    filtered.sort((a: Event, b: Event) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        case 'price':
          return a.price - b.price;
        case 'popularity':
          return b.currentAttendees - a.currentAttendees;
        default:
          return 0;
      }
    });

    return filtered;
  }, [events, search, category, availableOnly, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-white via-white to-light-caramel/30 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mb-4" />
          <p className="text-dark-roast/70 text-lg">Loading amazing events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-white via-white to-light-caramel/30 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X size={32} className="text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-dark-roast mb-2">Something went wrong</h2>
          <p className="text-dark-roast/70 mb-6">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-white via-white to-light-caramel/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-coffee-brown/90 via-warm-amber/80 to-medium-roast/90"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full bg-white/5 bg-[radial-gradient(circle_at_center,theme(colors.white/10)_1px,transparent_1px)] bg-[length:60px_60px]"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center text-white">
            <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-8">
              <Coffee size={18} className="mr-2" />
              Discover Amazing Events
              <Sparkles size={16} className="ml-2" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 font-poppins">
              Sip, Connect & <br />
              <span className="bg-gradient-to-r from-white to-cream-white bg-clip-text text-transparent">
                Experience
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join our vibrant community for coffee tastings, workshops, networking events, 
              and unforgettable experiences that bring people together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="text-white/80 text-lg">
                <strong className="text-white">{events.length}</strong> events available
              </div>
              <div className="hidden sm:block w-px h-6 bg-white/30"></div>
              <div className="text-white/80 text-lg">
                <strong className="text-white">{events.filter((e: Event) => e.featured).length}</strong> featured this month
              </div>
            </div>
          </div>
        </div>
      </section>

  {/* Search and Sort Section (non-sticky) */}
  <section className="bg-white/95 backdrop-blur-sm border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Main Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4 items-center mb-6">
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark-roast/50" />
              <input
                type="text"
                placeholder="Search events, organizers, or topics... (Ctrl+K)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-warm-amber focus:border-warm-amber transition-all duration-200 text-dark-roast placeholder-dark-roast/50 text-lg"
              />
            </div>

            {/* View toggle */}
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-white text-coffee-brown shadow-sm' 
                      : 'text-dark-roast/60 hover:text-dark-roast'
                  }`}
                  title="Grid view (V)"
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-white text-coffee-brown shadow-sm' 
                      : 'text-dark-roast/60 hover:text-dark-roast'
                  }`}
                  title="List view (V)"
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>
          {/* Basic Filters + Sort */}
          <div className="rounded-2xl bg-gradient-to-r from-cream-white to-white border border-coffee-brown/10 p-4 md:p-5 shadow-sm">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-dark-roast/70" htmlFor="category-select">Category:</label>
                <select
                  id="category-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-dark-roast/80 focus:outline-none focus:ring-2 focus:ring-warm-amber focus:border-warm-amber transition-all duration-200 hover:bg-cream-white/80 shadow-sm"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>

                <label
                  htmlFor="available-only"
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 cursor-pointer shadow-sm ${
                    availableOnly
                      ? 'bg-coffee-brown text-white border-coffee-brown'
                      : 'bg-gray-100 text-dark-roast/70 border-gray-200 hover:bg-gray-200'
                  }`}
                >
                  <input
                    id="available-only"
                    type="checkbox"
                    checked={availableOnly}
                    onChange={(e) => setAvailableOnly(e.target.checked)}
                    className="sr-only"
                  />
                  <span className={`w-2 h-2 rounded-full ${availableOnly ? 'bg-white' : 'bg-dark-roast/40'}`}></span>
                  Available only
                </label>
              </div>

              <div className="ml-auto flex items-center gap-3">
                <span className="text-sm font-medium text-dark-roast/70">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-dark-roast/80 focus:outline-none focus:ring-2 focus:ring-warm-amber focus:border-warm-amber transition-all duration-200 hover:bg-cream-white/80 shadow-sm"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* Results Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Results Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-dark-roast font-poppins">
              {filteredAndSortedEvents.length === events.length 
                ? 'All Events' 
                : `${filteredAndSortedEvents.length} ${filteredAndSortedEvents.length === 1 ? 'Event' : 'Events'} Found`
              }
            </h2>
            <p className="text-dark-roast/70 mt-1">
              {filteredAndSortedEvents.length === 0 
                ? 'No events match your current filters'
                : `Discover amazing experiences waiting for you`
              }
            </p>
          </div>

          <div className="text-sm text-dark-roast/60">
            Press <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">V</kbd> to change view
          </div>
        </div>

        {/* Events Grid/List */}
        {filteredAndSortedEvents.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-dark-roast mb-2">No events found</h3>
            <p className="text-dark-roast/70 mb-8 max-w-md mx-auto">
              Try adjusting your search terms or filters to find the perfect event for you.
            </p>
            <Button onClick={() => setSearch('')} variant="outline">
              Clear Search
            </Button>
          </div>
        ) : (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8' 
              : 'space-y-6'
          }>
            {filteredAndSortedEvents.map((event: Event) => (
              <EventCard
                key={event.id}
                event={event}
                viewMode={viewMode}
                onRegister={() => handleEventRegistration(event)}
              />
            ))}
          </div>
        )}

        {/* View all suggestion when search is active */}
        {search && filteredAndSortedEvents.length > 0 && filteredAndSortedEvents.length < events.length && (
          <div className="text-center py-12">
            <p className="text-dark-roast/70 mb-4">
              Showing {filteredAndSortedEvents.length} of {events.length} events
            </p>
            <Button onClick={() => setSearch('')} variant="outline">
              View All Events
            </Button>
          </div>
        )}
      </section>

      {/* Registration Modal */}
      <EventRegistrationModal
        isOpen={showRegister}
        event={selectedEvent}
        onClose={() => setShowRegister(false)}
        onSuccess={() => {
          setToast({ message: 'Registration submitted! We\'ll be in touch soon.', type: 'success' });
        }}
      />

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-coffee-brown text-white rounded-full shadow-lg hover:bg-coffee-brown/90 transition-all duration-200 z-40 flex items-center justify-center group"
          title="Scroll to top"
        >
          <ArrowUp size={20} className="group-hover:-translate-y-0.5 transition-transform duration-200" />
        </button>
      )}
    </div>
  );
}

export default EventsPage;
