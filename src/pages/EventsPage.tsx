import { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Grid, 
  List,
  Users,
  Star,
  X,
  Sparkles,
  Coffee,
  ArrowUp
} from 'lucide-react';
import { Event } from '../lib/types.enhanced';
import { useEvents } from '../hooks/useEvents';
import { EventCard } from '../components/events/EventCard';
import { EventRegistrationModal } from '../components/events/EventRegistrationModal';
import { Button } from '../components/ui/Button';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

type ViewMode = 'grid' | 'list';
type SortOption = 'date' | 'title' | 'price' | 'popularity';

interface FilterState {
  search: string;
  category: string;
  location: string;
  priceRange: [number, number];
  showOnlyAvailable: boolean;
  showOnlyFeatured: boolean;
}

const categories = ['All', 'Wellness', 'Productivity', 'Creativity', 'Community', 'Networking'];
const locations = ['All', 'Downtown Coffee House', 'Tech Hub Café', 'Roastery Event Space', 'Community Center', 'Online'];
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
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: 'All',
    location: 'All',
    priceRange: [0, 500],
    showOnlyAvailable: false,
    showOnlyFeatured: false,
  });

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Search shortcut (Ctrl/Cmd + K)
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
        searchInput?.focus();
      }
      
      // Filter shortcut (F)
      if (e.key === 'f' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const activeElement = document.activeElement;
        if (activeElement?.tagName !== 'INPUT' && activeElement?.tagName !== 'TEXTAREA') {
          e.preventDefault();
          setShowMobileFilters(true);
        }
      }
      
      // Close modals (Escape)
      if (e.key === 'Escape') {
        setSelectedEvent(null);
        setShowMobileFilters(false);
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

  // Filter and sort events
  const filteredAndSortedEvents = useMemo(() => {
    const filtered = events.filter((event: Event) => {
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const matchesSearch = 
          event.title.toLowerCase().includes(searchTerm) ||
          event.description.toLowerCase().includes(searchTerm) ||
          event.category.toLowerCase().includes(searchTerm) ||
          event.location.toLowerCase().includes(searchTerm) ||
          event.organizer.name.toLowerCase().includes(searchTerm);
        
        if (!matchesSearch) return false;
      }

      // Category filter
      if (filters.category !== 'All' && event.category !== filters.category) {
        return false;
      }

      // Location filter
      if (filters.location !== 'All' && event.location !== filters.location) {
        return false;
      }

      // Price range filter
      if (event.price < filters.priceRange[0] || event.price > filters.priceRange[1]) {
        return false;
      }

      // Available spots filter
      if (filters.showOnlyAvailable && event.currentAttendees >= event.maxAttendees) {
        return false;
      }

      // Featured events filter
      if (filters.showOnlyFeatured && !event.featured) {
        return false;
      }

      return true;
    });

    // Sort events
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
  }, [events, filters, sortBy]);

  const handleFilterChange = (key: keyof FilterState, value: string | boolean | [number, number]) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      search: '',
      category: 'All',
      location: 'All',
      priceRange: [0, 500],
      showOnlyAvailable: false,
      showOnlyFeatured: false,
    });
  };

  const activeFiltersCount = Object.entries(filters).filter(([key, value]) => {
    if (key === 'search') return value !== '';
    if (key === 'category') return value !== 'All';
    if (key === 'location') return value !== 'All';
    if (key === 'priceRange') return value[0] !== 0 || value[1] !== 500;
    if (key === 'showOnlyAvailable' || key === 'showOnlyFeatured') return value;
    return false;
  }).length;

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

      {/* Search and Filter Section */}
      <section className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Main Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4 items-center mb-6">
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark-roast/50" />
              <input
                type="text"
                placeholder="Search events, organizers, or topics... (Ctrl+K)"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-warm-amber focus:border-warm-amber transition-all duration-200 text-dark-roast placeholder-dark-roast/50 text-lg"
              />
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setShowMobileFilters(true)}
                className="relative"
              >
                <Filter size={18} className="mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-warm-amber text-white text-xs rounded-full flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>

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

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-dark-roast/70">Quick filters:</span>
              
              <button
                onClick={() => handleFilterChange('showOnlyFeatured', !filters.showOnlyFeatured)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  filters.showOnlyFeatured
                    ? 'bg-warm-amber text-white'
                    : 'bg-gray-100 text-dark-roast/70 hover:bg-gray-200'
                }`}
              >
                <Star size={14} className="mr-1" />
                Featured
              </button>
              
              <button
                onClick={() => handleFilterChange('showOnlyAvailable', !filters.showOnlyAvailable)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  filters.showOnlyAvailable
                    ? 'bg-coffee-brown text-white'
                    : 'bg-gray-100 text-dark-roast/70 hover:bg-gray-200'
                }`}
              >
                <Users size={14} className="mr-1" />
                Available
              </button>

              {/* Category Quick Filter */}
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="px-4 py-2 bg-gray-100 border-0 rounded-full text-sm font-medium text-dark-roast/70 focus:ring-2 focus:ring-warm-amber transition-all duration-200"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <div className="ml-auto flex items-center gap-3">
              <span className="text-sm font-medium text-dark-roast/70">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-4 py-2 bg-gray-100 border-0 rounded-full text-sm font-medium text-dark-roast/70 focus:ring-2 focus:ring-warm-amber transition-all duration-200"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            {activeFiltersCount > 0 && (
              <Button
                variant="outline"
                onClick={clearAllFilters}
                size="sm"
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <X size={14} className="mr-1" />
                Clear ({activeFiltersCount})
              </Button>
            )}
          </div>
        </div>

        {/* Active Filters Display */}
        {activeFiltersCount > 0 && (
          <div className="bg-gray-50 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs font-medium text-dark-roast/60">Active filters:</span>
                
                {filters.search && (
                  <span className="inline-flex items-center px-3 py-1 bg-warm-amber/10 text-warm-amber text-xs font-medium rounded-full">
                    Search: "{filters.search}"
                    <button
                      onClick={() => handleFilterChange('search', '')}
                      className="ml-2 hover:text-warm-amber/80"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}
                
                {filters.category !== 'All' && (
                  <span className="inline-flex items-center px-3 py-1 bg-coffee-brown/10 text-coffee-brown text-xs font-medium rounded-full">
                    Category: {filters.category}
                    <button
                      onClick={() => handleFilterChange('category', 'All')}
                      className="ml-2 hover:text-coffee-brown/80"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}
                
                {filters.showOnlyFeatured && (
                  <span className="inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                    Featured only
                    <button
                      onClick={() => handleFilterChange('showOnlyFeatured', false)}
                      className="ml-2 hover:text-yellow-600"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
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
            Press <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">F</kbd> for filters, 
            <kbd className="px-2 py-1 bg-gray-100 rounded text-xs ml-1">V</kbd> to change view
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
            <Button onClick={clearAllFilters} variant="outline">
              Clear All Filters
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
                onRegister={() => setSelectedEvent(event)}
              />
            ))}
          </div>
        )}

        {/* Load More Suggestion */}
        {filteredAndSortedEvents.length > 0 && filteredAndSortedEvents.length < events.length && (
          <div className="text-center py-12">
            <p className="text-dark-roast/70 mb-4">
              Showing {filteredAndSortedEvents.length} of {events.length} events
            </p>
            <Button onClick={clearAllFilters} variant="outline">
              View All Events
            </Button>
          </div>
        )}
      </section>

      {/* Mobile Filter Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center p-4">
          <div className="bg-white rounded-t-3xl w-full max-w-lg max-h-[80vh] overflow-hidden">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-dark-roast font-poppins">Filter Events</h3>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} className="text-dark-roast/70" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-semibold text-dark-roast mb-3">Category</label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => handleFilterChange('category', category)}
                      className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        filters.category === category
                          ? 'bg-coffee-brown text-white'
                          : 'bg-gray-100 text-dark-roast/70 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-sm font-semibold text-dark-roast mb-3">Location</label>
                <select
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="w-full p-3 bg-gray-100 border-0 rounded-xl text-dark-roast focus:ring-2 focus:ring-warm-amber"
                >
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-semibold text-dark-roast mb-3">
                  Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
                </label>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={filters.priceRange[1]}
                    onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-dark-roast/60">
                    <span>Free</span>
                    <span>$500+</span>
                  </div>
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-4">
                <label className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-dark-roast">Featured Events Only</span>
                  <input
                    type="checkbox"
                    checked={filters.showOnlyFeatured}
                    onChange={(e) => handleFilterChange('showOnlyFeatured', e.target.checked)}
                    className="w-5 h-5 text-warm-amber focus:ring-warm-amber rounded"
                  />
                </label>
                
                <label className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-dark-roast">Available Spots Only</span>
                  <input
                    type="checkbox"
                    checked={filters.showOnlyAvailable}
                    onChange={(e) => handleFilterChange('showOnlyAvailable', e.target.checked)}
                    className="w-5 h-5 text-coffee-brown focus:ring-coffee-brown rounded"
                  />
                </label>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={clearAllFilters}
                  className="flex-1"
                >
                  Clear All
                </Button>
                <Button 
                  onClick={() => setShowMobileFilters(false)}
                  className="flex-1"
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
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

      {/* Registration Modal */}
      {selectedEvent && (
        <EventRegistrationModal
          event={selectedEvent}
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
}

export default EventsPage;
