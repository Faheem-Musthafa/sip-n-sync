import React from 'react';
import { Star, Quote } from 'lucide-react';
import { mockTestimonials } from '../../lib/data';

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-soft-cream/50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-energy-orange/10 border border-energy-orange/20 rounded-full text-energy-orange font-medium mb-6">
            <Star size={16} className="mr-2" />
            Community Success Stories
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-accent-gray mb-6 font-poppins">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-healing-green to-energy-orange">Community</span> Says
          </h2>
          <p className="text-xl text-accent-gray/70 max-w-3xl mx-auto">
            Real stories from real people who have transformed their lives through our community and events.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {mockTestimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id} 
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8">
                <div className="w-8 h-8 bg-gradient-to-r from-healing-green to-energy-orange rounded-full flex items-center justify-center">
                  <Quote size={16} className="text-white" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-6 mt-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} className="text-energy-orange fill-current" />
                ))}
              </div>
              
              {/* Content */}
              <blockquote className="text-accent-gray mb-8 leading-relaxed text-lg">
                "{testimonial.content}"
              </blockquote>
              
              {/* Author */}
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover mr-4 ring-2 ring-healing-green/20"
                />
                <div>
                  <h4 className="font-semibold text-accent-gray font-poppins text-lg">
                    {testimonial.name}
                  </h4>
                  <p className="text-accent-gray/60">
                    {testimonial.role}
                    {testimonial.company && (
                      <span className="text-healing-green"> • {testimonial.company}</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-healing-green via-healing-green/90 to-energy-orange rounded-3xl p-8 md:p-12 text-white text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-8 font-poppins">
            Join a Thriving Community
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-white/80">Happy Members</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">100+</div>
              <div className="text-white/80">Events Hosted</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">95%</div>
              <div className="text-white/80">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">4.9★</div>
              <div className="text-white/80">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}