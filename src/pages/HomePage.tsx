import React from 'react';
import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Testimonials } from '../components/sections/Testimonials';

// HomePage component for the landing page
export const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <About />
      <Testimonials />
    </>
  );
}