import { useState } from 'react';
import { 
  X, 
  Calendar, 
  MapPin, 
  Users, 
  Mail, 
  User, 
  Phone, 
  MessageSquare, 
  Send,
  Shield,
  Star,
  ArrowRight,
  CheckCircle,
  DollarSign,
  Heart,
  Sparkles
} from 'lucide-react';
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

const steps = [
  { id: 1, title: 'Event Details', icon: Calendar },
  { id: 2, title: 'Your Information', icon: User },
  { id: 3, title: 'Confirmation', icon: CheckCircle },
];

export function ModernEventRegistrationModal({ event, isOpen, onClose }: EventRegistrationModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  
  const { register, loading, error, reset } = useEventRegistration();
  const [showToast, setShowToast] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsAnimating(false);
      }, 150);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsAnimating(false);
      }, 150);
    }
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
        setCurrentStep(1);
      }, 2000);
    }
  };

  const handleClose = () => {
    onClose();
    reset();
    setCurrentStep(1);
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
  const attendancePercentage = (event.currentAttendees / event.maxAttendees) * 100;

  const canProceed = () => {
    if (currentStep === 2) {
      return formData.name.trim() && formData.email.trim();
    }
    return true;
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} size="xl">
        {/* Modern Header with Glass Effect */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-coffee-brown via-warm-amber to-medium-roast"></div>
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          
          <div className="relative p-8 text-white">
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 p-2 hover:bg-white/20 rounded-full transition-all duration-200 group"
            >
              <X size={24} className="text-white group-hover:rotate-90 transition-transform duration-200" />
            </button>

            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-8">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                    currentStep >= step.id 
                      ? 'bg-white text-coffee-brown border-white' 
                      : 'bg-white/20 text-white border-white/30'
                  }`}>
                    <step.icon size={20} />
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 transition-all duration-300 ${
                      currentStep > step.id ? 'bg-white' : 'bg-white/30'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-4">
                <Star size={16} className="mr-2" />
                {event.category}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-3 font-poppins">
                {event.title}
              </h3>
              <div className="flex items-center justify-center text-white/90 text-lg">
                <Users size={20} className="mr-2" />
                <span>{event.currentAttendees}/{event.maxAttendees} registered</span>
                <span className="mx-3">•</span>
                <span className="font-semibold">{spotsLeft} spots left</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Content Area */}
        <div className={`p-8 transition-all duration-300 ${isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
          {/* Step 1: Event Overview */}
          {currentStep === 1 && (
            <div className="space-y-8 animate-slide-up">
              <div className="text-center mb-8">
                <h4 className="text-2xl font-bold text-dark-roast mb-2 font-poppins">Event Overview</h4>
                <p className="text-dark-roast/70">Get familiar with this amazing experience</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Event Visual */}
                <div className="space-y-6">
                  <div className="relative h-64 rounded-3xl overflow-hidden group">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {event.price > 0 ? (
                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-dark-roast font-bold text-lg flex items-center">
                        <DollarSign size={18} className="mr-1" />
                        {event.price}
                      </div>
                    ) : (
                      <div className="absolute top-4 right-4 bg-coffee-brown text-white px-4 py-2 rounded-full font-bold">
                        FREE
                      </div>
                    )}

                    {event.featured && (
                      <div className="absolute top-4 left-4 bg-warm-amber text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                        <Sparkles size={14} className="mr-1" />
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-coffee-brown/10 to-coffee-brown/5 rounded-2xl p-4 border border-coffee-brown/20">
                      <div className="text-2xl font-bold text-coffee-brown mb-1">{event.currentAttendees}</div>
                      <div className="text-sm text-dark-roast/70">People Joined</div>
                    </div>
                    <div className="bg-gradient-to-br from-warm-amber/10 to-warm-amber/5 rounded-2xl p-4 border border-warm-amber/20">
                      <div className="text-2xl font-bold text-warm-amber mb-1">{spotsLeft}</div>
                      <div className="text-sm text-dark-roast/70">Spots Available</div>
                    </div>
                  </div>
                </div>

                {/* Event Details */}
                <div className="space-y-6">
                  <div>
                    <h5 className="text-lg font-semibold text-dark-roast mb-4 font-poppins">About This Event</h5>
                    <p className="text-dark-roast/80 leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  {/* Event Info Cards */}
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-cream-white/50 to-light-caramel/50 rounded-2xl p-4 border border-warm-amber/20">
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 bg-warm-amber/20 rounded-xl flex items-center justify-center mr-4">
                          <Calendar size={20} className="text-warm-amber" />
                        </div>
                        <div>
                          <p className="font-semibold text-dark-roast">Date & Time</p>
                          <p className="text-dark-roast/70">{formatDate(event.date)} • {event.time}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-cream-white/50 to-light-caramel/50 rounded-2xl p-4 border border-coffee-brown/20">
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 bg-coffee-brown/20 rounded-xl flex items-center justify-center mr-4">
                          <MapPin size={20} className="text-coffee-brown" />
                        </div>
                        <div>
                          <p className="font-semibold text-dark-roast">Location</p>
                          <p className="text-dark-roast/70">{event.location}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-cream-white/50 to-light-caramel/50 rounded-2xl p-4 border border-medium-roast/20">
                      <div className="flex items-center mb-2">
                        <img
                          src={event.organizer.avatar}
                          alt={event.organizer.name}
                          className="w-10 h-10 rounded-xl object-cover mr-4"
                        />
                        <div>
                          <p className="font-semibold text-dark-roast">Hosted by</p>
                          <p className="text-dark-roast/70">{event.organizer.name}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Availability Progress */}
                  <div className="bg-gradient-to-r from-cream-white/50 to-light-caramel/50 rounded-2xl p-4 border border-warm-amber/20">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-semibold text-dark-roast">Event Capacity</span>
                      <span className="text-sm text-dark-roast/70">{Math.round(attendancePercentage)}% filled</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                      <div 
                        className="bg-gradient-to-r from-coffee-brown to-warm-amber h-3 rounded-full transition-all duration-500"
                        style={{ width: `${attendancePercentage}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-dark-roast/60 text-center">
                      {spotsLeft > 0 ? `${spotsLeft} spots remaining` : 'Event is full'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <Button 
                  onClick={handleNext} 
                  size="lg" 
                  className="px-8 group"
                  disabled={spotsLeft === 0}
                >
                  {spotsLeft === 0 ? 'Event Full' : 'Continue to Registration'}
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Registration Form */}
          {currentStep === 2 && (
            <div className="space-y-8 animate-slide-up">
              <div className="text-center mb-8">
                <h4 className="text-2xl font-bold text-dark-roast mb-2 font-poppins">Your Information</h4>
                <p className="text-dark-roast/70">Just a few details to secure your spot</p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                    <X size={16} className="text-red-600" />
                  </div>
                  <p className="text-red-700 font-medium">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-dark-roast">
                      <User size={16} className="mr-2 text-coffee-brown" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-warm-amber focus:border-warm-amber transition-all duration-200 text-dark-roast placeholder-dark-roast/50"
                      placeholder="Enter your full name"
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-dark-roast">
                      <Mail size={16} className="mr-2 text-warm-amber" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-warm-amber focus:border-warm-amber transition-all duration-200 text-dark-roast placeholder-dark-roast/50"
                      placeholder="Enter your email address"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-dark-roast">
                    <Phone size={16} className="mr-2 text-medium-roast" />
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-warm-amber focus:border-warm-amber transition-all duration-200 text-dark-roast placeholder-dark-roast/50"
                    placeholder="Enter your phone number"
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-dark-roast">
                    <MessageSquare size={16} className="mr-2 text-medium-roast" />
                    Special Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-warm-amber focus:border-warm-amber transition-all duration-200 resize-none text-dark-roast placeholder-dark-roast/50"
                    placeholder="Any questions, dietary restrictions, or special requirements?"
                    disabled={loading}
                  />
                </div>

                {/* Privacy Notice */}
                <div className="bg-cream-white/50 border border-warm-amber/20 rounded-2xl p-4 flex items-start">
                  <div className="w-8 h-8 bg-warm-amber/20 rounded-lg flex items-center justify-center mr-3 mt-0.5">
                    <Shield size={16} className="text-warm-amber" />
                  </div>
                  <div>
                    <p className="text-sm text-dark-roast font-medium mb-1">Privacy Protected</p>
                    <p className="text-xs text-dark-roast/70">
                      Your information is securely encrypted and will only be used for event coordination. 
                      We'll send you event details and updates via email.
                    </p>
                  </div>
                </div>
              </form>

              <div className="flex justify-between pt-6">
                <Button variant="outline" onClick={handlePrevious} size="lg" className="px-8">
                  Back to Event Details
                </Button>
                <Button 
                  onClick={handleNext} 
                  size="lg" 
                  className="px-8 group"
                  disabled={!canProceed()}
                >
                  Review & Confirm
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {currentStep === 3 && (
            <div className="space-y-8 animate-slide-up">
              <div className="text-center mb-8">
                <h4 className="text-2xl font-bold text-dark-roast mb-2 font-poppins">Confirm Registration</h4>
                <p className="text-dark-roast/70">Review your details before completing registration</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Event Summary */}
                <div className="bg-gradient-to-br from-cream-white to-white rounded-3xl p-6 border border-warm-amber/20">
                  <h5 className="text-lg font-semibold text-dark-roast mb-4 flex items-center">
                    <Calendar size={20} className="mr-2 text-coffee-brown" />
                    Event Summary
                  </h5>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-dark-roast/70">Event</p>
                      <p className="font-semibold text-dark-roast">{event.title}</p>
                    </div>
                    <div>
                      <p className="text-sm text-dark-roast/70">Date & Time</p>
                      <p className="font-semibold text-dark-roast">{formatDate(event.date)} • {event.time}</p>
                    </div>
                    <div>
                      <p className="text-sm text-dark-roast/70">Location</p>
                      <p className="font-semibold text-dark-roast">{event.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-dark-roast/70">Price</p>
                      <p className="font-semibold text-dark-roast">
                        {event.price === 0 ? 'FREE' : `$${event.price}`}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Your Information */}
                <div className="bg-gradient-to-br from-cream-white to-white rounded-3xl p-6 border border-warm-amber/20">
                  <h5 className="text-lg font-semibold text-dark-roast mb-4 flex items-center">
                    <User size={20} className="mr-2 text-warm-amber" />
                    Your Information
                  </h5>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-dark-roast/70">Name</p>
                      <p className="font-semibold text-dark-roast">{formData.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-dark-roast/70">Email</p>
                      <p className="font-semibold text-dark-roast">{formData.email}</p>
                    </div>
                    {formData.phone && (
                      <div>
                        <p className="text-sm text-dark-roast/70">Phone</p>
                        <p className="font-semibold text-dark-roast">{formData.phone}</p>
                      </div>
                    )}
                    {formData.message && (
                      <div>
                        <p className="text-sm text-dark-roast/70">Message</p>
                        <p className="font-semibold text-dark-roast">{formData.message}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Final CTA */}
              <div className="bg-gradient-to-r from-coffee-brown to-warm-amber rounded-3xl p-8 text-white text-center">
                <div className="max-w-md mx-auto">
                  <Heart size={48} className="mx-auto mb-4 text-white" />
                  <h5 className="text-2xl font-bold mb-3 font-poppins">You're Almost There!</h5>
                  <p className="text-white/90 mb-6">
                    Click confirm to secure your spot. We'll send you a confirmation email with all the details.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      variant="outline" 
                      onClick={handlePrevious} 
                      className="border-white text-white hover:bg-white hover:text-coffee-brown"
                    >
                      Edit Information
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      loading={loading}
                      disabled={loading}
                      className="bg-white text-coffee-brown hover:bg-white/90 font-bold"
                    >
                      {loading ? 'Confirming...' : (
                        <>
                          Confirm Registration
                          <Send size={18} className="ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>

      {showToast && (
        <Toast
          message="🎉 Registration successful! Check your email for event details."
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
}
