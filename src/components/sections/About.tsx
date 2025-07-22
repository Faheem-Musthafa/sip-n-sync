import React from 'react';
import { Target, Heart, Lightbulb, Users, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

const features = [
  {
    icon: Target,
    title: 'Productivity Excellence',
    description: 'Master time management, goal setting, and focus techniques through interactive workshops led by successful entrepreneurs.',
    gradient: 'from-healing-green to-healing-green/70',
    stats: '85% improvement in productivity',
  },
  {
    icon: Heart,
    title: 'Mental Wellness',
    description: 'Prioritize self-care through mindfulness practices, stress management, and emotional intelligence development.',
    gradient: 'from-energy-orange to-energy-orange/70',
    stats: '90% report better mental health',
  },
  {
    icon: Lightbulb,
    title: 'Creative Discovery',
    description: 'Unlock your creative potential through art therapy, design thinking, and innovative problem-solving sessions.',
    gradient: 'from-purple-500 to-purple-400',
    stats: '75% discover new talents',
  },
  {
    icon: Users,
    title: 'Community Building',
    description: 'Build lasting relationships with like-minded individuals who share your values and aspirations for growth.',
    gradient: 'from-blue-500 to-blue-400',
    stats: '95% make lasting friendships',
  },
];

export function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-healing-green/10 border border-healing-green/20 rounded-full text-healing-green font-medium mb-6">
            <Heart size={16} className="mr-2" />
            Our Mission & Vision
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-accent-gray mb-6 font-poppins">
            Transforming Lives Through{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-healing-green to-energy-orange">
              Connection
            </span>
          </h2>
          <p className="text-xl text-accent-gray/70 max-w-4xl mx-auto leading-relaxed">
            We believe that personal growth flourishes in community. Our carefully curated events 
            combine wellness practices, productivity techniques, and creative expression to help 
            you become the best version of yourself.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-3xl p-8 h-80 cursor-pointer transform hover:-translate-y-2 transition-all duration-500"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-90`}></div>
              
              <div className="relative h-full flex flex-col justify-between text-white">
                <div>
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 font-poppins">
                    {feature.title}
                  </h3>
                  <p className="text-white/90 leading-relaxed mb-4">
                    {feature.description}
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                    {feature.stats}
                  </span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-soft-cream to-healing-green/10 rounded-3xl p-8 md:p-12 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-accent-gray mb-6 font-poppins">
            Ready to Start Your Journey?
          </h3>
          <p className="text-xl text-accent-gray/70 mb-8 max-w-2xl mx-auto">
            Join our community of growth-minded individuals and discover what's possible 
            when wellness meets productivity in a supportive environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => window.location.href = '/events'}
            >
              Browse Events
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => document.querySelector('#testimonials')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Read Success Stories
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}