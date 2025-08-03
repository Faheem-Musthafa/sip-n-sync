import { Star, Quote } from 'lucide-react';
import { mockTestimonials } from '../../lib/data';

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-cream-white/50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-warm-amber/10 border border-warm-amber/20 rounded-full text-warm-amber font-medium mb-6">
            <Star size={16} className="mr-2" />
            Community Success Stories
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-dark-roast mb-6 font-poppins">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-coffee-brown to-warm-amber">Community</span> Says
          </h2>
          <p className="text-xl text-dark-roast/70 max-w-3xl mx-auto">
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
                <div className="w-8 h-8 bg-gradient-to-r from-coffee-brown to-warm-amber rounded-full flex items-center justify-center">
                  <Quote size={16} className="text-white" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-6 mt-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} className="text-warm-amber fill-current" />
                ))}
              </div>
              
              {/* Content */}
              <blockquote className="text-dark-roast mb-8 leading-relaxed text-lg">
                "{testimonial.content}"
              </blockquote>
              
              {/* Author */}
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover mr-4 ring-2 ring-warm-amber/20"
                />
                <div>
                  <h4 className="font-semibold text-dark-roast font-poppins text-lg">
                    {testimonial.name}
                  </h4>
                  <p className="text-dark-roast/60">
                    {testimonial.role}
                    {testimonial.company && (
                      <span className="text-coffee-brown"> • {testimonial.company}</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Simple CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-coffee-brown to-warm-amber rounded-3xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 font-poppins">
              Ready to Join Our Community?
            </h3>
            <p className="text-white/90 mb-6 text-lg">
              Be part of a community that celebrates growth, networking, and meaningful connections.
            </p>
            <button
              onClick={() => window.location.href = '/events'}
              className="bg-white text-coffee-brown px-8 py-3 rounded-xl font-semibold hover:bg-white/90 transition-colors duration-200"
            >
              Explore Events
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}