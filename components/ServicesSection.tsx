
import React from 'react';
import { EXPERTISE } from '../data';

const ServicesSection: React.FC = () => {
  return (
    <section id="expertise" className="section-padding border-t border-white/5">
      <div className="container-tight">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-5">
            <span className="font-technical text-[#ff5c00] mb-6 block">Expertise</span>
            <h2 className="text-[length:var(--t-h2)] font-display text-white leading-[var(--lh-head)] mb-8">Digital infrastructure.</h2>
            <p className="text-zinc-500 text-[length:var(--t-body)] leading-relaxed max-w-md">
              We remove friction from the digital lifecycle through thoughtful design and well-engineered builds — from concept to launch and beyond.
            </p>
          </div>
          
          <div className="lg:col-span-7 grid grid-cols-1 gap-12">
            {EXPERTISE.map((item) => (
              <div key={item.title} className="group border-b border-white/5 pb-12 last:border-0">
                {/* Visual Category Label Polish */}
                <span className="font-technical text-white/65 text-[8px] mb-2 block">Service Line</span>
                <h3 className="text-2xl font-display text-white mb-4 group-hover:text-[#ff5c00] transition-colors duration-400">
                  {item.title}
                </h3>
                <p className="text-zinc-500 leading-relaxed max-w-xl opacity-80 group-hover:opacity-100 transition-opacity">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
