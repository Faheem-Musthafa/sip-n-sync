import { useState } from 'react';
import { 
  Target, 
  Heart, 
  Lightbulb, 
  Users, 
  Globe, 
  Calendar, 
  Star,
  MapPin,
  Mail,
  Phone
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { APP_CONFIG } from '../lib/constants';

const stats = [
  { label: 'Community Members', value: '2,500+', icon: Users },
  { label: 'Events Hosted', value: '150+', icon: Calendar },
  { label: 'Success Stories', value: '500+', icon: Star },
  { label: 'Cities Reached', value: '12+', icon: Globe },
];

const values = [
  {
    icon: Heart,
    title: 'Mental Wellness First',
    description: 'We believe mental health is the foundation of all success. Every event prioritizes psychological well-being.',
    gradient: 'from-coffee-brown to-coffee-brown/70',
  },
  {
    icon: Users,
    title: 'Authentic Community',
    description: 'Building genuine connections where vulnerability is strength and support is unconditional.',
    gradient: 'from-warm-amber to-warm-amber/70',
  },
  {
    icon: Lightbulb,
    title: 'Continuous Growth',
    description: 'Fostering an environment where learning never stops and personal development is celebrated.',
    gradient: 'from-medium-roast to-medium-roast/70',
  },
  {
    icon: Target,
    title: 'Purpose-Driven Action',
    description: 'Every interaction, event, and connection serves a meaningful purpose in someone\'s journey.',
    gradient: 'from-dark-roast to-dark-roast/70',
  },
];

const team = [
  {
    name: 'Sarah Chen',
    role: 'Founder & Community Director',
    bio: 'Former wellness coach with 8+ years in community building. Passionate about creating safe spaces for growth.',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    specialties: ['Community Building', 'Wellness Coaching', 'Event Planning'],
  },
  {
    name: 'Marcus Johnson',
    role: 'Head of Programming',
    bio: 'Productivity expert and mindfulness practitioner. Designs transformative workshop experiences.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    specialties: ['Workshop Design', 'Mindfulness', 'Productivity Systems'],
  },
  {
    name: 'Emma Rodriguez',
    role: 'Creative Director',
    bio: 'Artist and creative therapist helping others discover their unique creative voice and expression.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    specialties: ['Art Therapy', 'Creative Workshops', 'Design Thinking'],
  },
];

const milestones = [
  {
    year: '2022',
    title: 'The Beginning',
    description: 'Started as a small weekly meetup in a local café with 12 passionate individuals.',
  },
  {
    year: '2023',
    title: 'Growing Community',
    description: 'Expanded to monthly workshops and reached 500 community members across 3 cities.',
  },
  {
    year: '2024',
    title: 'Digital Platform',
    description: 'Launched our digital platform enabling virtual events and global community connections.',
  },
  {
    year: '2025',
    title: 'Nationwide Impact',
    description: 'Now serving 2,500+ members across 12 cities with hybrid events and partnerships.',
  },
];

export function AboutPage() {
  const [activeTeamMember, setActiveTeamMember] = useState(0);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-cream-white via-white to-warm-amber/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-6 py-3 bg-warm-amber/10 border border-warm-amber/20 rounded-full text-warm-amber font-semibold mb-8 animate-slide-up">
              <Heart size={20} className="mr-3" />
              About Sip'n'Sync
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-dark-roast mb-8 font-poppins leading-tight animate-slide-up">
              Where{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-coffee-brown to-warm-amber">
                Connection
              </span>{' '}
              Meets{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-warm-amber to-medium-roast">
                Growth
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-dark-roast/80 mb-12 leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
              We're more than a community—we're a movement dedicated to fostering meaningful networking, 
              professional connections, and personal growth through shared experiences and authentic relationships.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <Button size="lg" className="px-8 py-4">
                Join Our Community
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-4">
                View Upcoming Events
              </Button>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-warm-amber/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-coffee-brown/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-medium-roast/10 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-coffee-brown to-warm-amber">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center text-white">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <stat.icon size={32} className="text-white" />
                  </div>
                </div>
                <div className="text-4xl font-bold mb-2 font-poppins">{stat.value}</div>
                <div className="text-white/90 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-dark-roast mb-8 font-poppins">
                Our Story
              </h2>
              <div className="space-y-6 text-lg text-dark-roast/80 leading-relaxed">
                <p>
                  Sip'n'Sync began with a simple observation: in our hyper-connected world, 
                  genuine human connection and mental wellness were becoming increasingly rare. 
                  We saw people struggling with isolation, burnout, and the pressure to constantly perform.
                </p>
                <p>
                  What started as informal coffee meetups between friends who shared a passion for 
                  wellness and personal growth has evolved into a thriving community of over 2,500 
                  individuals across 12 cities.
                </p>
                <p>
                  Today, we create spaces where vulnerability is celebrated, growth is supported, 
                  and authentic connections flourish. Every event, workshop, and gathering is designed 
                  with intention—to help people not just meet others, but to truly connect with 
                  themselves and their community.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative bg-gradient-to-br from-warm-amber/10 to-coffee-brown/10 rounded-3xl p-8">
                <img
                  src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&h=400&fit=crop"
                  alt="Community gathering"
                  className="w-full h-80 object-cover rounded-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-healing-green mb-1">2.5K+</div>
                    <div className="text-sm text-accent-gray/70">Happy Members</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-soft-cream to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-accent-gray mb-6 font-poppins">
              Our Core Values
            </h2>
            <p className="text-xl text-accent-gray/70 max-w-3xl mx-auto">
              These principles guide every decision we make and every experience we create
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${value.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-accent-gray mb-4 font-poppins">
                  {value.title}
                </h3>
                <p className="text-accent-gray/70 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-accent-gray mb-6 font-poppins">
              Our Journey
            </h2>
            <p className="text-xl text-accent-gray/70">
              From humble beginnings to a thriving community
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-healing-green to-energy-orange"></div>
            
            {milestones.map((milestone) => (
              <div key={milestone.year} className="relative flex items-start mb-12">
                <div className="absolute left-6 w-4 h-4 bg-healing-green rounded-full border-4 border-white shadow-lg"></div>
                <div className="ml-16 bg-gradient-to-br from-soft-cream to-white rounded-2xl p-6 shadow-lg">
                  <div className="text-2xl font-bold text-healing-green mb-2 font-poppins">
                    {milestone.year}
                  </div>
                  <h3 className="text-xl font-semibold text-accent-gray mb-3">
                    {milestone.title}
                  </h3>
                  <p className="text-accent-gray/70">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-soft-cream to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-accent-gray mb-6 font-poppins">
              Meet Our Team
            </h2>
            <p className="text-xl text-accent-gray/70 max-w-3xl mx-auto">
              Passionate individuals dedicated to creating meaningful experiences and fostering community growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={member.name}
                className={`group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer ${
                  activeTeamMember === index ? 'ring-4 ring-healing-green/30' : ''
                }`}
                onClick={() => setActiveTeamMember(index)}
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-accent-gray mb-2 font-poppins">
                    {member.name}
                  </h3>
                  <div className="text-healing-green font-semibold mb-4">
                    {member.role}
                  </div>
                  <p className="text-accent-gray/70 text-sm mb-4 leading-relaxed">
                    {member.bio}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {member.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="px-3 py-1 bg-healing-green/10 text-healing-green text-xs rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-healing-green to-energy-orange">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 font-poppins">
            Ready to Join Our Community?
          </h2>
          <p className="text-xl text-white/90 mb-12 leading-relaxed">
            Take the first step towards meaningful connections and personal growth. 
            We're here to support your journey every step of the way.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-healing-green hover:bg-white/90 px-8 py-4"
            >
              Browse Events
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-healing-green px-8 py-4"
            >
              Get in Touch
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
            <div className="flex items-center justify-center">
              <Mail size={20} className="mr-3" />
              <span>{APP_CONFIG.contact.email}</span>
            </div>
            <div className="flex items-center justify-center">
              <Phone size={20} className="mr-3" />
              <span>{APP_CONFIG.contact.phone}</span>
            </div>
            <div className="flex items-center justify-center">
              <MapPin size={20} className="mr-3" />
              <span>Kerala, India</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
