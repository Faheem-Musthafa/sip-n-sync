import { Calendar, Clock, MapPin, Star, DollarSign, ArrowRight } from 'lucide-react';
import { Event } from '../../lib/types.enhanced';
import { Button } from '../ui/Button';

interface EventCardProps {
  event: Event;
  onRegister: (event: Event) => void;
  viewMode?: 'grid' | 'list';
}

export function EventCard({ event, onRegister, viewMode = 'grid' }: EventCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const attendancePercentage = (event.currentAttendees / event.maxAttendees) * 100;
  const spotsLeft = event.maxAttendees - event.currentAttendees;
  const isFullyBooked = spotsLeft === 0;

  if (viewMode === 'list') {
    return (
      <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
        <div className="flex flex-col md:flex-row">
          {/* Event Image */}
          <div className="relative h-48 md:h-auto md:w-80 overflow-hidden">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className="bg-white/90 backdrop-blur-sm text-dark-roast px-3 py-1 rounded-full text-sm font-medium">
                {event.category}
              </span>
            </div>
            
            {/* Price Badge */}
            <div className="absolute top-4 right-4">
              <div className="flex items-center text-sm text-white bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                <DollarSign size={14} className="mr-1" />
                {event.price === 0 ? 'Free' : `$${event.price}`}
              </div>
            </div>

            {/* Featured Badge */}
            {event.featured && (
              <div className="absolute bottom-4 left-4">
                <div className="flex items-center text-white bg-warm-amber/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
                  <Star size={12} className="mr-1 fill-current" />
                  Featured
                </div>
              </div>
            )}
          </div>

          {/* Event Content */}
          <div className="flex-1 p-8">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-dark-roast font-poppins group-hover:text-warm-amber transition-colors duration-200 line-clamp-2">
                {event.title}
              </h3>
              <div className="text-right text-sm text-dark-roast/60 ml-4">
                <div className="font-medium">{spotsLeft} spots left</div>
                <div>{event.currentAttendees}/{event.maxAttendees} registered</div>
              </div>
            </div>
            
            <p className="text-dark-roast/70 mb-6 line-clamp-2 text-lg leading-relaxed">
              {event.description}
            </p>

            {/* Event Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center text-sm text-dark-roast/60">
                <div className="w-8 h-8 bg-coffee-brown/10 rounded-lg flex items-center justify-center mr-3">
                  <Calendar size={14} className="text-coffee-brown" />
                </div>
                <span className="font-medium">{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center text-sm text-dark-roast/60">
                <div className="w-8 h-8 bg-warm-amber/10 rounded-lg flex items-center justify-center mr-3">
                  <Clock size={14} className="text-warm-amber" />
                </div>
                <span className="font-medium">{event.time}</span>
              </div>
              <div className="flex items-center text-sm text-dark-roast/60">
                <div className="w-8 h-8 bg-medium-roast/10 rounded-lg flex items-center justify-center mr-3">
                  <MapPin size={14} className="text-medium-roast" />
                </div>
                <span className="font-medium">{event.location}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-xs text-dark-roast/60 mb-2">
                <span>Attendance</span>
                <span>{Math.round(attendancePercentage)}% filled</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-coffee-brown to-warm-amber h-2 rounded-full transition-all duration-300"
                  style={{ width: `${attendancePercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Organizer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={event.organizer.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'}
                  alt={event.organizer.name}
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <div>
                  <p className="text-sm font-medium text-dark-roast">Hosted by</p>
                  <p className="text-sm text-dark-roast/70">{event.organizer.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => onRegister(event)}
                  disabled={isFullyBooked}
                  className="group flex items-center gap-2"
                >
                  {isFullyBooked ? 'Event Full' : 'Register Now'}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view (default)
  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
      {/* Event Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm text-dark-roast px-3 py-1 rounded-full text-sm font-medium">
            {event.category}
          </span>
        </div>
        
        {/* Price Badge */}
        <div className="absolute top-4 right-4">
          <div className="flex items-center text-sm text-white bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
            <DollarSign size={14} className="mr-1" />
            {event.price === 0 ? 'Free' : `$${event.price}`}
          </div>
        </div>
        
        {/* Featured Badge */}
        {event.featured && (
          <div className="absolute bottom-4 left-4">
            <div className="flex items-center text-white bg-warm-amber/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
              <Star size={12} className="mr-1 fill-current" />
              Featured
            </div>
          </div>
        )}
        
        {/* Spots Left */}
        <div className="absolute bottom-4 right-4">
          <div className={`text-white backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium ${
            isFullyBooked ? 'bg-red-500/80' : 'bg-black/30'
          }`}>
            {isFullyBooked ? 'Full' : `${spotsLeft} spots left`}
          </div>
        </div>
      </div>

      {/* Event Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-dark-roast mb-3 font-poppins group-hover:text-warm-amber transition-colors duration-200 line-clamp-2">
          {event.title}
        </h3>
        
        <p className="text-dark-roast/70 mb-6 line-clamp-3 text-sm leading-relaxed">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-sm text-dark-roast/60">
            <div className="w-8 h-8 bg-coffee-brown/10 rounded-lg flex items-center justify-center mr-3">
              <Calendar size={14} className="text-coffee-brown" />
            </div>
            <span className="font-medium">{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center text-sm text-dark-roast/60">
            <div className="w-8 h-8 bg-warm-amber/10 rounded-lg flex items-center justify-center mr-3">
              <Clock size={14} className="text-warm-amber" />
            </div>
            <span className="font-medium">{event.time}</span>
          </div>
          <div className="flex items-center text-sm text-dark-roast/60">
            <div className="w-8 h-8 bg-medium-roast/10 rounded-lg flex items-center justify-center mr-3">
              <MapPin size={14} className="text-medium-roast" />
            </div>
            <span className="font-medium">{event.location}</span>
          </div>
        </div>

        {/* Organizer */}
        <div className="flex items-center mb-6 p-3 bg-cream-white rounded-xl">
          <img
            src={event.organizer.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'}
            alt={event.organizer.name}
            className="w-8 h-8 rounded-full object-cover mr-3"
          />
          <div>
            <p className="text-sm font-medium text-dark-roast">Hosted by</p>
            <p className="text-sm text-dark-roast/70">{event.organizer.name}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-dark-roast/60 mb-2">
            <span>Attendance</span>
            <span>{event.currentAttendees}/{event.maxAttendees}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-coffee-brown to-warm-amber h-2 rounded-full transition-all duration-300"
              style={{ width: `${attendancePercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Register Button */}
        <Button
          onClick={() => onRegister(event)}
          className="w-full"
          disabled={isFullyBooked}
        >
          {isFullyBooked ? 'Event Full' : 'Register Now'}
        </Button>
      </div>
    </div>
  );
}

export default EventCard;
