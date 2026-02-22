
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Hero from './components/Hero';
import WorkSection from './components/WorkSection';
import ServicesSection from './components/ServicesSection';
import RepositorySection from './components/RepositorySection';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import Preloader from './components/Preloader';
// Consolidated: Added AboutSection import
import AboutSection from './components/AboutSection';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: 'power2.out'
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050505] selection:bg-[#ff5c00] selection:text-white">
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      
      <div 
        ref={cursorRef} 
        className="custom-cursor hidden md:block -translate-x-1/2 -translate-y-1/2 pointer-events-none" 
      />

      <Navigation />

      <main className="space-y-0">
        <Hero />
        {/* Consolidated: Integrated AboutSection into the flow */}
        <AboutSection />
        <ServicesSection />
        <WorkSection />
        <RepositorySection />
        <ContactForm />
      </main>

      <Footer />
    </div>
  );
};

export default App;
