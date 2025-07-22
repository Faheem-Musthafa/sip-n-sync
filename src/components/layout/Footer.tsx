import React from 'react';
import { Heart, Mail, MapPin, Phone, Instagram, Twitter, Linkedin, Coffee } from 'lucide-react';
import { APP_CONFIG } from '../../lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-accent-gray text-white pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-healing-green to-energy-orange rounded-full flex items-center justify-center mr-4">
                <Coffee className="text-white" size={24} />
              </div>
              <span className="text-3xl font-bold font-poppins">{APP_CONFIG.name}</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed max-w-md">
              {APP_CONFIG.description}
            </p>
            <div className="flex space-x-4">
              <a 
                href={APP_CONFIG.social.instagram}
                className="p-2 bg-gray-700 hover:bg-healing-green rounded-lg transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={20} />
              </a>
              <a 
                href={APP_CONFIG.social.twitter}
                className="p-2 bg-gray-700 hover:bg-healing-green rounded-lg transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter size={20} />
              </a>
              <a 
                href={APP_CONFIG.social.linkedin}
                className="p-2 bg-gray-700 hover:bg-healing-green rounded-lg transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 font-poppins">Quick Links</h3>
            <ul className="space-y-4">
              <li><a href="/" className="text-gray-400 hover:text-white transition-colors duration-200">Home</a></li>
              <li><a href="/events" className="text-gray-400 hover:text-white transition-colors duration-200">Events</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors duration-200">About</a></li>
              <li><a href="#testimonials" className="text-gray-400 hover:text-white transition-colors duration-200">Community</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-6 font-poppins">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Mail size={16} className="mr-3 text-healing-green" />
                <a 
                  href={`mailto:${APP_CONFIG.contact.email}`} 
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {APP_CONFIG.contact.email}
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-3 text-healing-green" />
                <a 
                  href={`tel:${APP_CONFIG.contact.phone}`} 
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {APP_CONFIG.contact.phone}
                </a>
              </li>
              <li className="flex items-start">
                <MapPin size={16} className="mr-3 text-healing-green mt-1" />
                <span className="text-gray-400">
                  {APP_CONFIG.contact.address}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <span className="text-gray-400">© {currentYear} {APP_CONFIG.name}. Made with</span>
            <Heart size={16} className="mx-2 text-healing-green" />
            <span className="text-gray-400">for mental wellness.</span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}