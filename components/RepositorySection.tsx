
import React from 'react';
import { REPOSITORY } from '../data';

const RepositorySection: React.FC = () => {
  return (
    <section id="repository" className="section-padding border-t border-white/5">
      <div className="container-tight">
        <div className="mb-20">
          <span className="font-technical text-[#ff5c00] mb-4 block">Repository</span>
          <h2 className="text-[length:var(--t-h2)] font-display text-white">Resources.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REPOSITORY.map((item) => (
            <div key={item.title} className="group p-10 border border-white/5 bg-white/[0.01] hover:border-[#ff5c00]/20 transition-all duration-500 rounded-sm flex flex-col justify-between h-full">
              <div>
                <span className="font-technical text-white/65 text-[8px] mb-4 block">
                  {item.status || 'Asset'}
                </span>
                <h3 className="text-xl font-display text-white mb-4 group-hover:text-[#ff5c00] transition-colors">{item.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed mb-10 opacity-80">{item.body}</p>
              </div>
              
              {item.status !== 'Coming Soon' ? (
                <a href="#" className="font-technical text-[8px] text-zinc-800 opacity-40 group-hover:opacity-100 group-hover:text-white transition-all duration-400 flex items-center gap-2 mt-auto">
                  Access Repository <span className="translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                </a>
              ) : (
                <span className="font-technical text-[8px] text-zinc-800 opacity-30 mt-auto">Locked</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RepositorySection;
