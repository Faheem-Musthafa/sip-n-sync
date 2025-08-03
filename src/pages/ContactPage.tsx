import React, { useState, useRef, useCallback, useMemo } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  MessageSquare, 
  User, 
  Calendar,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Copy,
  Smartphone,
  Heart,
  Navigation,
  Shield,
  Users,
  Zap,
  LucideIcon
} from 'lucide-react';

import { Button } from '../components/ui/Button';
import { 
  APP_CONFIG, 
  CONTACT_CATEGORIES, 
  URGENCY_LEVELS, 
  OFFICE_HOURS,
  COMMUNITY_STATS 
} from '../lib/constants';
import { 
  createMailtoUrl, 
  createTelUrl, 
  createGoogleMapsUrl,
  validateContactForm,
  storage,
  copyToClipboard as copyToClipboardUtil
} from '../lib/utils';
import { ContactFormData } from '../lib/types.enhanced';

interface ContactMethod {
  icon: LucideIcon;
  title: string;
  value: string;
  description: string;
  action: string;
  onClick?: () => void;
}

interface FormErrors {
  [key: string]: string;
}

// Constants
const INITIAL_FORM_DATA: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  category: 'General Inquiry',
  urgency: 'medium',
  preferredContact: 'email',
};

export function ContactPage() {
  // State management
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  
  const formRef = useRef<HTMLFormElement>(null);

  // Computed values
  const isFormValid = useMemo(() => {
    return formData.name.trim() && 
           formData.email.trim() && 
           formData.message.trim() &&
           Object.keys(formErrors).length === 0;
  }, [formData, formErrors]);

  const selectedUrgencyInfo = useMemo(() => {
    return URGENCY_LEVELS.find(level => level.value === formData.urgency);
  }, [formData.urgency]);

  // Contact methods configuration
  const contactMethods: ContactMethod[] = useMemo(() => [
    {
      icon: Phone,
      title: 'Phone',
      value: APP_CONFIG.contact.phone,
      description: 'Call us directly for immediate assistance',
      action: 'Call Now',
      onClick: () => window.open(createTelUrl(APP_CONFIG.contact.phone), '_self'),
    },
    {
      icon: Mail,
      title: 'Email', 
      value: APP_CONFIG.contact.email,
      description: 'Send us an email and we\'ll respond within 24 hours',
      action: 'Send Email',
      onClick: () => window.open(createMailtoUrl(APP_CONFIG.contact.email), '_self'),
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      value: 'Available 9 AM - 6 PM PST',
      description: 'Get instant help from our support team',
      action: 'Start Chat',
      onClick: () => alert('Live chat feature coming soon!'),
    },
    {
      icon: Calendar,
      title: 'Schedule Meeting',
      value: 'Book a time that works for you',
      description: 'Schedule a one-on-one consultation call',
      action: 'Book Meeting',
      onClick: () => window.open(APP_CONFIG.urls.calendly, '_blank'),
    },
  ], []);

  // Event handlers
  const handleInputChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [formErrors]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateContactForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setFormErrors({});
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const submission = {
        ...formData,
        timestamp: new Date().toISOString(),
        id: Date.now().toString(),
        responseTime: selectedUrgencyInfo?.responseTime,
      };
      
      // Store submission locally
      storage.set('lastContactSubmission', submission);
      
      // Reset form
      setFormData(INITIAL_FORM_DATA);
      setSubmitStatus('success');
      
      // Auto-hide success message
      setTimeout(() => setSubmitStatus('idle'), 5000);
      
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, selectedUrgencyInfo]);

  const handleCopyToClipboard = useCallback(async (text: string, item: string) => {
    const success = await copyToClipboardUtil(text);
    if (success) {
      setCopiedItem(item);
      setTimeout(() => setCopiedItem(null), 2000);
    }
  }, []);

  const handleGetDirections = useCallback(() => {
    window.open(createGoogleMapsUrl(APP_CONFIG.contact.address), '_blank');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-white via-white to-light-caramel/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-coffee-brown/90 via-warm-amber/80 to-medium-roast/90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center text-white">
            <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-8">
              <MessageSquare size={18} className="mr-2" />
              We're Here to Help
              <Heart size={16} className="ml-2" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 font-poppins">
              Contact <br />
              <span className="bg-gradient-to-r from-white to-cream-white bg-clip-text text-transparent">
                Our Team
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Have questions? Need support? Want to collaborate? 
              Choose the best way to reach us and we'll get back to you quickly.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
              <div className="flex items-center text-white/90">
                <Zap size={16} className="mr-2" />
                Average response time: <strong className="ml-1 text-white">2 hours</strong>
              </div>
              <div className="hidden sm:block w-px h-4 bg-white/30"></div>
              <div className="flex items-center text-white/90">
                <Shield size={16} className="mr-2" />
                <strong className="text-white">100%</strong> secure & confidential
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods Section */}
      <section className="py-16 -mt-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-coffee-brown to-warm-amber rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <method.icon size={20} className="text-white" />
                  </div>
                  <button
                    onClick={() => handleCopyToClipboard(method.value, method.title)}
                    className="p-2 text-gray-400 hover:text-coffee-brown transition-colors"
                    title={`Copy ${method.title}`}
                  >
                    {copiedItem === method.title ? (
                      <CheckCircle size={16} className="text-green-600" />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                </div>
                
                <h3 className="text-lg font-bold text-dark-roast mb-2 font-poppins">
                  {method.title}
                </h3>
                <p className="text-dark-roast font-medium mb-2">
                  {method.value}
                </p>
                <p className="text-dark-roast/70 text-sm mb-4">
                  {method.description}
                </p>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full group-hover:bg-coffee-brown group-hover:text-white group-hover:border-coffee-brown transition-all duration-300"
                  onClick={method.onClick}
                >
                  {method.action}
                  <ExternalLink size={14} className="ml-2" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-dark-roast mb-4 font-poppins">
                Send us a Message
              </h2>
              <p className="text-dark-roast/70 text-lg">
                Fill out the form below and we'll get back to you based on your urgency level.
              </p>
            </div>

            {submitStatus === 'success' && (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-6 flex items-start mb-8">
                <CheckCircle size={24} className="text-green-600 mr-4 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-green-800 mb-2">Message sent successfully!</h4>
                  <p className="text-green-700">
                    Thank you for contacting us. We've received your message and will respond within our commitment timeframe.
                  </p>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex items-start mb-8">
                <AlertCircle size={24} className="text-red-600 mr-4 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-red-800 mb-2">Failed to send message</h4>
                  <p className="text-red-700">
                    Please try again or contact us directly at {APP_CONFIG.contact.email}
                  </p>
                </div>
              </div>
            )}

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-dark-roast mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark-roast/50" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-warm-amber focus:border-warm-amber transition-all duration-200 text-dark-roast"
                      placeholder="Enter your full name"
                    />
                    {formErrors.name && (
                      <p className="text-red-600 text-sm mt-1">{formErrors.name}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-dark-roast mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark-roast/50" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-warm-amber focus:border-warm-amber transition-all duration-200 text-dark-roast"
                      placeholder="Enter your email"
                    />
                    {formErrors.email && (
                      <p className="text-red-600 text-sm mt-1">{formErrors.email}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-dark-roast mb-2">
                    Phone (Optional)
                  </label>
                  <div className="relative">
                    <Smartphone size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark-roast/50" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-warm-amber focus:border-warm-amber transition-all duration-200 text-dark-roast"
                      placeholder="Phone number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-dark-roast mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-warm-amber focus:border-warm-amber transition-all duration-200 text-dark-roast"
                  >
                    {CONTACT_CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-dark-roast mb-2">
                    Urgency
                  </label>
                  <select
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-warm-amber focus:border-warm-amber transition-all duration-200 text-dark-roast"
                  >
                    {URGENCY_LEVELS.map((level) => (
                      <option key={level.value} value={level.value}>
                        {level.label} ({level.responseTime})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-dark-roast mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-warm-amber focus:border-warm-amber transition-all duration-200 text-dark-roast"
                  placeholder="Brief description of your inquiry"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-dark-roast mb-2">
                  Message *
                </label>
                <div className="relative">
                  <MessageSquare size={18} className="absolute left-4 top-4 text-dark-roast/50" />
                  <textarea
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-warm-amber focus:border-warm-amber transition-all duration-200 resize-none text-dark-roast"
                    placeholder="Please provide details about your inquiry..."
                  />
                  {formErrors.message && (
                    <p className="text-red-600 text-sm mt-1">{formErrors.message}</p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                loading={isSubmitting}
                className="w-full py-4 text-lg"
              >
                {isSubmitting ? 'Sending Message...' : (
                  <>
                    Send Message
                    <Send size={20} className="ml-2" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Office Information Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-dark-roast mb-4 font-poppins flex items-center">
                <MapPin size={20} className="mr-2 text-coffee-brown" />
                Visit Our Office
              </h3>
              <p className="text-dark-roast/70 mb-4">
                {APP_CONFIG.contact.address}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleGetDirections}
              >
                <Navigation size={14} className="mr-2" />
                Get Directions
              </Button>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-dark-roast mb-4 font-poppins">
                Office Hours
              </h3>
              <div className="space-y-2 text-dark-roast/70">
                {OFFICE_HOURS.map((schedule, index) => (
                  <p key={index}>
                    {schedule.day}: {schedule.hours}
                  </p>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-coffee-brown to-warm-amber rounded-2xl p-6 text-white">
              <div className="text-center">
                <Users size={32} className="mx-auto mb-4 text-white" />
                <h3 className="text-xl font-bold mb-3 font-poppins">
                  Join Our Community
                </h3>
                <p className="text-white/90 mb-6 text-sm">
                  Over {COMMUNITY_STATS[0].value} members trust us for their networking needs.
                </p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold">{COMMUNITY_STATS[0].value}</div>
                    <div className="text-white/80 text-xs">Members</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold">{COMMUNITY_STATS[1].value}</div>
                    <div className="text-white/80 text-xs">Events</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold">{COMMUNITY_STATS[2].value}</div>
                    <div className="text-white/80 text-xs">Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}