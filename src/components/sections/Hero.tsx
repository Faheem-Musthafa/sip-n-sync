import React from 'react';
import { ArrowRight, Play, Users, Calendar, Star } from 'lucide-react';
import { Button } from '../ui/Button';

export function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-soft-cream via-healing-green/20 to-energy-orange/10 flex items-center justify-center pt-20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-healing-green/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-energy-orange/10 rounded-full animate-bounce-gentle"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-healing-green/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 right-10 w-16 h-16 bg-energy-orange/10 rounded-full animate-bounce-gentle" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 bg-healing-green/10 border border-healing-green/20 rounded-full text-healing-green font-medium mb-8 animate-fade-in">
          <Star size={16} className="mr-2" />
          Join 500+ Members in Our Wellness Community
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-accent-gray mb-6 font-poppins leading-tight animate-slide-up">
          Relax. Reflect.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-healing-green to-energy-orange">
            Connect.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-accent-gray/80 mb-12 max-w-4xl mx-auto font-light animate-slide-up" style={{ animationDelay: '0.2s' }}>
          Join a mindful community where mental well-being meets meaningful connections. 
          Discover transformative events designed to nurture your growth and expand your circle.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <Button 
            size="lg"
            onClick={() => window.location.href = '/events'}
            className="group"
          >
            Explore Events
            <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
            className="group"
          >
            <Play size={20} className="mr-2 group-hover:scale-110 transition-transform duration-200" />
            Watch Story
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-healing-green mb-2 font-poppins">500+</div>
            <div className="text-accent-gray/70 text-sm md:text-base">Active Members</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-energy-orange mb-2 font-poppins">100+</div>
            <div className="text-accent-gray/70 text-sm md:text-base">Events Hosted</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-purple-500 mb-2 font-poppins">95%</div>
            <div className="text-accent-gray/70 text-sm md:text-base">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-blue-500 mb-2 font-poppins">24/7</div>
            <div className="text-accent-gray/70 text-sm md:text-base">Community Support</div>
          </div>
        </div>
      </div>
    </section>
  );
}