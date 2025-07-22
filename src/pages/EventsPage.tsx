import React, { useState, useCallback } from 'react';
import { ArrowLeft, Search, Filter, Calendar, MapPin } from 'lucide-react';
import { EventCard } from '../components/events/EventCard';
import { EventRegistrationModal } from '../components/events/EventRegistrationModal';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { Button } from '../components/ui/Button';
import { useEvents } from '../hooks/useEvents';
import { Event, EventCategory } from '../lib/types';
import { EVENT_CATEGORIES } from '../lib/constants';

export function EventsPage() {
  const { events, loading, error, filters, setFilters } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Handler for opening registration modal
  const handleEventRegister = useCallback((event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  }, []);

  // Handler for closing modal
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  }, []);

  // Handler for search input
  const handleSearchChange = useCallback((value: string) => {
    setFilters({ search: value });
  }, [setFilters]);

  // Handler for category change
  const handleCategoryChange = useCallback((category: EventCategory | 'All') => {
    setFilters({ category });
  }, [setFilters]);

  // Handler to clear all filters
  const clearFilters = useCallback(() => {
    setFilters({ search: '', category: 'All' });
  }, [setFilters]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-soft-cream pt-20">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Calendar size={32} className="text-red-500" aria-label="Error icon" />
          </div>
          <h2 className="text-2xl font-bold text-accent-gray mb-4">Something went wrong</h2>
          <p className="text-accent-gray/70 mb-6">{error}</p>
          <Button onClick={() => window.location.reload()} aria-label="Try Again">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-soft-cream via-healing-green/20 to-energy-orange/10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-healing-green/10 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-energy-orange/10 rounded-full animate-bounce-gentle"></div>
          <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-healing-green/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => window.location.href = '/'}
            className="mb-8 text-healing-green hover:text-energy-orange flex items-center font-medium transition-colors duration-200 group"
            aria-label="Back to Home"
          >
            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform duration-200" aria-label="Back arrow" />
            Back to Home
          </button>
          
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-healing-green/10 border border-healing-green/20 rounded-full text-healing-green font-medium mb-6">
              <Calendar size={16} className="mr-2" />
              {events.length} Amazing Events Available
            </div>
            
            <h1 className="text-4xl md:text-7xl font-bold text-accent-gray mb-6 font-poppins leading-tight">
              Discover Your Next{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-healing-green to-energy-orange">
                Adventure
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-accent-gray/80 max-w-4xl mx-auto mb-12 font-light">
              Immerse yourself in transformative experiences designed to elevate your well-being, 
              amplify your productivity, and forge meaningful connections.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-accent-gray/40" />
              <input
                type="text"
                placeholder="Search events..."
                value={filters.search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-healing-green focus:border-healing-green transition-all duration-200 text-accent-gray placeholder-accent-gray/50"
              />
            </div>
            
            {/* Filter Toggle (Mobile) */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
              aria-label="Toggle Filters"
            >
              <Filter size={16} className="mr-2" aria-label="Filter icon" />
              Filters
            </Button>
            
            {/* Category Filter (Desktop) */}
            <div className="hidden lg:flex flex-wrap gap-2">
              {EVENT_CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    filters.category === category
                      ? 'bg-healing-green text-white shadow-lg'
                      : 'bg-gray-100 text-accent-gray hover:bg-healing-green/10 hover:text-healing-green'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden mt-4 p-4 bg-gray-50 rounded-2xl animate-fade-in">
              <h3 className="font-semibold text-accent-gray mb-3">Filter by Category</h3>
              <div className="flex flex-wrap gap-2">
                {EVENT_CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      filters.category === category
                        ? 'bg-healing-green text-white'
                        : 'bg-white text-accent-gray hover:bg-healing-green/10'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-20 bg-gradient-to-b from-white to-soft-cream/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <LoadingSpinner size="lg" />
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={32} className="text-gray-400" aria-label="No events found" />
              </div>
              <h3 className="text-2xl font-semibold text-accent-gray mb-4">No events found</h3>
              <p className="text-accent-gray/60 mb-6">
                {filters.search || filters.category !== 'All' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Check back soon for new events!'
                }
              </p>
              {(filters.search || filters.category !== 'All') && (
                <Button onClick={clearFilters} aria-label="Clear Filters">
                  Clear Filters
                </Button>
              )}
            </div>
          ) : (
            <>
              {/* Results Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-accent-gray">
                    {filters.category !== 'All' ? `${filters.category} Events` : 'All Events'}
                  </h2>
                  <p className="text-accent-gray/60">
                    {events.length} event{events.length !== 1 ? 's' : ''} found
                    {filters.search && ` for "${filters.search}"`}
                  </p>
                </div>
                
                {(filters.search || filters.category !== 'All') && (
                  <Button variant="ghost" onClick={clearFilters} aria-label="Clear Filters">
                    Clear Filters
                  </Button>
                )}
              </div>
              
              {/* Events Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {events.map((event, index) => (
                  <div
                    key={event.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <EventCard
                      event={event}
                      onRegister={handleEventRegister}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-healing-green via-healing-green/90 to-energy-orange">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-poppins">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            We're always adding new events. Join our community to get notified about upcoming experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary"
              size="lg"
              onClick={() => window.location.href = '/#contact'}
              className="bg-white text-accent-gray hover:bg-soft-cream"
              aria-label="Join Community"
            >
              Join Community
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-accent-gray"
              aria-label="Suggest Event"
            >
              Suggest Event
            </Button>
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      {isModalOpen && selectedEvent && (
        <EventRegistrationModal
          event={selectedEvent}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </>
  );
}