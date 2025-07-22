import React from 'react';
import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Testimonials } from '../components/sections/Testimonials';

export function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Testimonials />
    </>
  );
}