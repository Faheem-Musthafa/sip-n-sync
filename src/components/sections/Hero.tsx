import { ArrowRight, Play, Coffee } from 'lucide-react';
import { Button } from '../ui/Button';

export function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-cream-white via-warm-amber/20 to-coffee-brown/10 flex items-center justify-center pt-20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-warm-amber/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-coffee-brown/10 rounded-full animate-bounce-gentle"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-warm-amber/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 right-10 w-16 h-16 bg-coffee-brown/10 rounded-full animate-bounce-gentle" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 bg-warm-amber/10 border border-warm-amber/20 rounded-full text-warm-amber font-medium mb-8 animate-fade-in">
          <Coffee size={16} className="mr-2" />
          Sip & Sync • Meaningful Connections
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-dark-roast mb-6 font-poppins leading-tight animate-slide-up">
          Connect. Discover.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-coffee-brown to-warm-amber">
            Celebrate.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-dark-roast/80 mb-12 max-w-4xl mx-auto font-light animate-slide-up" style={{ animationDelay: '0.2s' }}>
          Transform your networking through authentic connections and purposeful events. 
          Your journey to meaningful relationships starts here.
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
            onClick={() => window.location.href = '/about'}
            className="group"
          >
            <Play size={20} className="mr-2 group-hover:scale-110 transition-transform duration-200" />
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}