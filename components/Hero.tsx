
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { CONTENT } from '../constants';

const Hero: React.FC = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (headlineRef.current) {
      const text = headlineRef.current.innerText;
      const words = text.split(' ');
      
      // Highlight "modern" as a focal beat while maintaining GSAP stagger capability
      headlineRef.current.innerHTML = words
        .map(word => {
          const isModern = word.toLowerCase().includes('modern');
          const spanClass = isModern ? 'text-[#ff5c00]' : '';
          return `<span class="inline-block opacity-0 translate-y-3 ${spanClass}">${word}</span>`;
        })
        .join(' ');

      gsap.to(headlineRef.current.children, {
        opacity: 1,
        y: 0,
        stagger: 0.025,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.6
      });
    }
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-[0.07] grayscale pointer-events-none">
        <source src={CONTENT.assets.portfolioVideo} type="video/mp4" />
      </video>
      
      <div className="container-tight relative z-10">
        <div className="flex items-center gap-4 mb-12">
          <span className="font-technical text-zinc-500 opacity-60">{CONTENT.site.location}</span>
          <div className="w-8 h-[1px] bg-white/10"></div>
          <span className="font-technical text-zinc-500 opacity-60">{CONTENT.site.brandLine}</span>
        </div>

        {/* Constrained to ~58ch for premium editorial rhythm */}
        <h1 
          ref={headlineRef}
          className="text-[length:var(--t-hero)] font-display leading-[var(--lh-tight)] text-white max-w-[58ch] mb-20 md:mb-24"
        >
          {CONTENT.site.tagline}
        </h1>

        <div className="flex items-center gap-6 md:gap-10">
          {CONTENT.navigation.heroActions.map(action => {
            const isPrimary = action.variant === 'primary';
            return (
              <a 
                key={action.label}
                href={action.href}
                className={`
                  text-[10px] uppercase tracking-[0.3em] font-technical transition-all duration-400 transform
                  ${isPrimary 
                    ? 'px-8 py-4 border border-[#ff5c00] text-[#ff5c00] hover:bg-[#ff5c00] hover:text-black hover:-translate-y-px hover:shadow-[0_4px_20px_rgba(255,92,0,0.06)] active:scale-[0.98]' 
                    : 'text-zinc-600 hover:text-white hover:-translate-y-px active:scale-[0.98]'
                  }
                `}
              >
                {action.label}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;
