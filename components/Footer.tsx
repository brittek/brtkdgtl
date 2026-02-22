
import React, { useState } from 'react';
import { CONTENT } from '../constants';
import { saveSubscriber } from '../lib/storage';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subbed, setSubbed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      saveSubscriber(email);
      setSubbed(true);
      setEmail('');
      setTimeout(() => setSubbed(false), 3000);
    }
  };

  return (
    <footer className="py-16 sm:py-24 border-t border-white/5 bg-black">
      <div className="container-tight">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-24">
          <div className="max-w-md">
            <h4 className="text-3xl font-display text-white tracking-tighter mb-8">{CONTENT.site.footer.statement}</h4>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="font-technical text-zinc-800">Briefing</span>
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="system@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-transparent border-b border-white/10 py-2 text-xs focus:border-[#ff5c00] outline-none transition-all flex-1 text-zinc-300"
                  />
                  <button type="submit" className="font-technical text-[#ff5c00] text-[8px] hover:text-white transition-colors">
                    {subbed ? 'Logged' : 'Subscribe'}
                  </button>
                </form>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-technical text-zinc-800">Social</span>
                <div className="flex gap-6">
                  {CONTENT.site.footer.social.map(link => (
                    <a key={link.label} href={link.href} className="text-sm text-zinc-500 hover:text-white transition-colors">{link.label}</a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-start md:items-end text-left md:text-right gap-6">
             <div className="flex flex-col gap-2">
               <span className="font-technical text-zinc-800">Enquiries</span>
               <a href={`mailto:${CONTENT.site.contacts.email}`} className="text-2xl text-zinc-400 hover:text-[#ff5c00] transition-colors font-display tracking-tight">{CONTENT.site.contacts.email}</a>
             </div>
             <div className="flex flex-col gap-2">
               <span className="font-technical text-zinc-800">HQ</span>
               <p className="text-zinc-500 text-sm">{CONTENT.site.location}</p>
             </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="font-technical text-zinc-800">{CONTENT.site.footer.copyright}</span>
          <div className="flex gap-10 font-technical text-zinc-900">
            <span>Engineering Excellence</span>
            <span>V3.1.0-Release</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
