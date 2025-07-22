import React, { useState } from 'react';
import { Menu, X, Coffee } from 'lucide-react';
import { APP_CONFIG, NAVIGATION_ITEMS } from '../../lib/constants';
import { Button } from '../ui/Button';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = href;
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full bg-soft-cream/95 backdrop-blur-sm z-50 border-b border-healing-green/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => handleNavClick('/')}>
            <div className="w-10 h-10 bg-gradient-to-r from-healing-green to-energy-orange rounded-full flex items-center justify-center mr-3">
              <Coffee className="text-white" size={20} />
            </div>
            <span className="text-2xl font-bold text-accent-gray font-poppins">
              {APP_CONFIG.name}
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {NAVIGATION_ITEMS.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="text-accent-gray hover:text-energy-orange transition-colors duration-200 font-medium"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <Button 
            className="hidden md:block" 
            size="sm" 
            onClick={() => handleNavClick('/events')}
          >
            Join Events
          </Button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-accent-gray p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-healing-green/20 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              {NAVIGATION_ITEMS.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="text-accent-gray hover:text-energy-orange transition-colors duration-200 font-medium text-left"
                >
                  {item.name}
                </button>
              ))}
              <Button 
                size="sm" 
                className="w-fit mt-4"
                onClick={() => handleNavClick('/events')}
              >
                Join Events
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}