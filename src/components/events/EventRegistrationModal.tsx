import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Users, Mail, User, Phone, MessageSquare, Send } from 'lucide-react';
import { Event } from '../../lib/types';
import { useEventRegistration } from '../../hooks/useEventRegistration';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Toast } from '../ui/Toast';

interface EventRegistrationModalProps {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export function EventRegistrationModal({ event, isOpen, onClose }: EventRegistrationModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  
  const { register, loading, error, success, reset } = useEventRegistration();
  const [showToast, setShowToast] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await register(event.id, formData);
    
    if (success) {
      setShowToast(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
      
      setTimeout(() => {
        onClose();
        reset();
      }, 2000);
    }
  };

  const handleClose = () => {
    onClose();
    reset();
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const spotsLeft = event.maxAttendees - event.currentAttendees;

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} size="xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-healing-green to-energy-orange p-6 rounded-t-3xl text-white">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-3">
                {event.category}
              </span>
              <h3 className="text-3xl font-bold text-white font-poppins mb-2">
                {event.title}
              </h3>
              <div className="flex items-center text-white/80 text-sm">
                <Users size={16} className="mr-2" />
                <span>{event.currentAttendees}/{event.maxAttendees} registered • {spotsLeft} spots left</span>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200 flex-shrink-0"
            >
              <X size={24} className="text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          {/* Left Column - Event Details */}
          <div>
            {/* Event Image */}
            <div className="relative h-64 rounded-2xl overflow-hidden mb-6">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              {event.price > 0 && (
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-accent-gray font-semibold">
                  ${event.price}
                </div>
              )}
            </div>
            
            {/* Description */}
            <div className="mb-6">
              <h4 className="text-xl font-semibold text-accent-gray mb-3 font-poppins">About This Event</h4>
              <p className="text-accent-gray/70 leading-relaxed">
                {event.description}
              </p>
            </div>
            
            {/* Event Details Cards */}
            <div className="grid grid-cols-1 gap-4 mb-6">
              <div className="bg-healing-green/5 rounded-xl p-4 border border-healing-green/10">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-healing-green/20 rounded-lg flex items-center justify-center mr-3">
                    <Calendar size={16} className="text-healing-green" />
                  </div>
                  <span className="font-medium text-accent-gray">Date & Time</span>
                </div>
                <div className="ml-11">
                  <p className="text-accent-gray/70">{formatDate(event.date)}</p>
                  <p className="text-accent-gray/70">{event.time}</p>
                </div>
              </div>
              
              <div className="bg-purple-500/5 rounded-xl p-4 border border-purple-500/10">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center mr-3">
                    <MapPin size={16} className="text-purple-500" />
                  </div>
                  <span className="font-medium text-accent-gray">Location</span>
                </div>
                <p className="text-accent-gray/70 ml-11">{event.location}</p>
              </div>
            </div>
            
            {/* Organizer */}
            <div className="bg-soft-cream rounded-xl p-4 mb-6">
              <div className="flex items-center">
                <img
                  src={event.organizer.avatar}
                  alt={event.organizer.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <p className="font-medium text-accent-gray">Hosted by</p>
                  <p className="text-accent-gray/70">{event.organizer.name}</p>
                </div>
              </div>
            </div>
            
            {/* Availability */}
            <div className="bg-gradient-to-r from-healing-green/10 to-energy-orange/10 rounded-xl p-4 border border-healing-green/20">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-accent-gray">Availability</span>
                <span className="text-sm text-accent-gray/60">
                  {spotsLeft} spots left
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-healing-green to-energy-orange h-3 rounded-full transition-all duration-300"
                  style={{ width: `${(event.currentAttendees / event.maxAttendees) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Right Column - Registration Form */}
          <div>
            <div className="bg-gradient-to-br from-soft-cream to-white rounded-2xl p-6 border border-gray-100">
              <div className="text-center mb-6">
                <h4 className="text-2xl font-bold text-accent-gray font-poppins mb-2">
                  Secure Your Spot
                </h4>
                <p className="text-accent-gray/60">
                  Join this amazing experience and connect with like-minded individuals
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="flex items-center text-sm font-semibold text-accent-gray mb-3">
                    <User size={16} className="mr-2 text-healing-green" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-healing-green focus:border-healing-green transition-all duration-200 text-accent-gray placeholder-accent-gray/50"
                    placeholder="Enter your full name"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="flex items-center text-sm font-semibold text-accent-gray mb-3">
                    <Mail size={16} className="mr-2 text-energy-orange" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-healing-green focus:border-healing-green transition-all duration-200 text-accent-gray placeholder-accent-gray/50"
                    placeholder="Enter your email address"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="flex items-center text-sm font-semibold text-accent-gray mb-3">
                    <Phone size={16} className="mr-2 text-blue-500" />
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-healing-green focus:border-healing-green transition-all duration-200 text-accent-gray placeholder-accent-gray/50"
                    placeholder="Enter your phone number"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="flex items-center text-sm font-semibold text-accent-gray mb-3">
                    <MessageSquare size={16} className="mr-2 text-purple-500" />
                    Message (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-healing-green focus:border-healing-green transition-all duration-200 resize-none text-accent-gray placeholder-accent-gray/50"
                    placeholder="Any questions or special requirements?"
                    disabled={loading}
                  />
                </div>

                <Button
                  type="submit"
                  loading={loading}
                  disabled={loading || spotsLeft === 0}
                  className="w-full py-4"
                  size="lg"
                >
                  {spotsLeft === 0 ? 'Event Full' : loading ? 'Submitting...' : (
                    <>
                      Complete Registration
                      <Send size={18} className="ml-2" />
                    </>
                  )}
                </Button>
                
                <p className="text-xs text-accent-gray/50 text-center">
                  By registering, you agree to our terms and conditions. We'll send you event details via email.
                </p>
              </form>
            </div>
          </div>
        </div>
      </Modal>

      {showToast && (
        <Toast
          message="Registration successful! We'll send you event details via email."
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
}