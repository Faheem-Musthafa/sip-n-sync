import React from 'react';
import { Calendar, Clock, MapPin, Users, Star, DollarSign } from 'lucide-react';
import { Event } from '../../lib/types';
import { Button } from '../ui/Button';

interface EventCardProps {
  event: Event;
  onRegister: (event: Event) => void;
}

export function EventCard({ event, onRegister }: EventCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const attendancePercentage = (event.currentAttendees / event.maxAttendees) * 100;
  const spotsLeft = event.maxAttendees - event.currentAttendees;

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
          <span className="bg-white/90 backdrop-blur-sm text-accent-gray px-3 py-1 rounded-full text-sm font-medium">
            {event.category}
          </span>
        </div>
        
        {/* Price Badge */}
        <div className="absolute top-4 right-4">
          <div className="flex items-center text-sm text-white bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
            <DollarSign size={14} className="mr-1" />
            {event.price === 0 ? 'Free' : event.price}
          </div>
        </div>
        
        {/* Featured Badge */}
        {event.featured && (
          <div className="absolute bottom-4 left-4">
            <div className="flex items-center text-white bg-energy-orange/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
              <Star size={12} className="mr-1 fill-current" />
              Featured
            </div>
          </div>
        )}
        
        {/* Spots Left */}
        <div className="absolute bottom-4 right-4">
          <div className="text-white bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
            {spotsLeft} spots left
          </div>
        </div>
      </div>

      {/* Event Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-accent-gray mb-3 font-poppins group-hover:text-energy-orange transition-colors duration-200 line-clamp-2">
          {event.title}
        </h3>
        
        <p className="text-accent-gray/70 mb-6 line-clamp-3 text-sm leading-relaxed">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-sm text-accent-gray/60">
            <div className="w-8 h-8 bg-healing-green/10 rounded-lg flex items-center justify-center mr-3">
              <Calendar size={14} className="text-healing-green" />
            </div>
            <span className="font-medium">{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center text-sm text-accent-gray/60">
            <div className="w-8 h-8 bg-energy-orange/10 rounded-lg flex items-center justify-center mr-3">
              <Clock size={14} className="text-energy-orange" />
            </div>
            <span className="font-medium">{event.time}</span>
          </div>
          <div className="flex items-center text-sm text-accent-gray/60">
            <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center mr-3">
              <MapPin size={14} className="text-purple-500" />
            </div>
            <span className="font-medium">{event.location}</span>
          </div>
        </div>

        {/* Organizer */}
        <div className="flex items-center mb-6 p-3 bg-soft-cream rounded-xl">
          <img
            src={event.organizer.avatar}
            alt={event.organizer.name}
            className="w-8 h-8 rounded-full object-cover mr-3"
          />
          <div>
            <p className="text-sm font-medium text-accent-gray">Hosted by</p>
            <p className="text-sm text-accent-gray/70">{event.organizer.name}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-accent-gray/60 mb-2">
            <span>Attendance</span>
            <span>{event.currentAttendees}/{event.maxAttendees}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-healing-green to-energy-orange h-2 rounded-full transition-all duration-300"
              style={{ width: `${attendancePercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Register Button */}
        <Button
          onClick={() => onRegister(event)}
          className="w-full"
          disabled={spotsLeft === 0}
        >
          {spotsLeft === 0 ? 'Event Full' : 'Register Now'}
        </Button>
      </div>
    </div>
  );
}