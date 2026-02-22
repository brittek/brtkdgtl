
import React from 'react';
// Fixed: Using CONTENT instead of non-existent BRAND
import { CONTENT } from '../constants';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="bg-black border-b border-zinc-900">
      <div className="flex flex-col lg:flex-row min-h-[70vh]">
        <div className="flex-1 p-12 md:p-24 flex flex-col justify-center border-r border-zinc-900">
          {/* Consolidated: Using font-technical for brand consistency */}
          <span className="font-technical text-[#ff5c00] text-[10px] uppercase tracking-[0.2em] mb-8 block">Studio</span>
          <p className="text-4xl md:text-6xl font-display text-white leading-tight tracking-tighter mb-10">
            Engineering <br /> for Impact.
          </p>
          <div className="space-y-6 text-zinc-400 text-base max-w-sm leading-relaxed">
            <p>
              We specialize in digital systems that combine technical precision with clean aesthetic logic. Our goal is performance without compromise.
            </p>
            <p>
              Based in Sydney, we operate globally to help businesses transition from fragmented setups to cohesive digital identities.
            </p>
          </div>
        </div>

        <div className="flex-1 relative grayscale brightness-50 min-h-[400px]">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
            {/* Fixed: Updated BRAND to CONTENT */}
            <source src={CONTENT.assets.heroVideo} type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
