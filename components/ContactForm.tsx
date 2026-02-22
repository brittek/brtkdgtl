
import React, { useState, useEffect } from 'react';
import { CONTENT } from '../constants';
import { analyzeProjectEnquiry } from '../lib/ai';
import { saveSubmission, updateSubmissionStatus } from '../lib/storage';
import { validateContact } from '../lib/validation';
import { emit, on } from '../lib/events';
import { sendSystemEmail } from '../lib/email';

// Initialize background handlers once
on('contact.received', async (payload) => {
  // Async Hook 1: AI Triage
  const triage = await analyzeProjectEnquiry(payload.name, payload.subject, payload.message);
  updateSubmissionStatus(payload.id, 'NOTIFIED', triage);
  
  // Async Hook 2: Email Notification
  await sendSystemEmail('CONTACT', {
    email: payload.email,
    subject: `Enquiry Receipt: ${payload.subject}`,
    name: payload.name
  });
});

const ContactForm: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    consent: false,
    company: '' // Honeypot
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    const validation = validateContact(formData);
    if (!validation.success) {
      setErrors(validation.errors);
      return;
    }

    setStatus('loading');

    // 1. Primary Action: Store data (The Source of Truth)
    const submission = saveSubmission({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    });

    // 2. Secondary Actions: Emit event for async hooks
    emit('contact.received', { ...formData, id: submission.id });

    // UX: Small delay to simulate system work
    setTimeout(() => setStatus('success'), 800);
  };

  const inputClasses = (name: string) => `bg-transparent border-b ${errors[name] ? 'border-red-500/50' : 'border-white/10'} py-3 input-premium outline-none transition-all duration-300 text-sm placeholder:text-zinc-800 text-white w-full`;

  return (
    <section id="contact" className="section-padding border-t border-white/5">
      <div className="container-tight grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
        <div className="lg:col-span-5">
          <span className="font-technical text-[#ff5c00] mb-8 block">Enquire</span>
          <h2 className="text-[length:var(--t-h2)] font-display text-white leading-[var(--lh-head)] mb-8">Let’s build <br /> together.</h2>
          <p className="text-zinc-400 text-[length:var(--t-body)] leading-relaxed mb-12 max-w-[40ch]">
            Tell us what you’re building and what “done” looks like. We’ll reply with next steps.
          </p>
          
          <div className="space-y-8">
            <div className="flex flex-col gap-2">
              <span className="font-technical text-zinc-800 opacity-65">Email</span>
              <a href={`mailto:${CONTENT.site.contacts.email}`} className="text-xl text-zinc-400 hover:text-[#ff5c00] transition-colors duration-300">{CONTENT.site.contacts.email}</a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-technical text-zinc-800 opacity-65">Phone</span>
              <a href={`tel:${CONTENT.site.contacts.phone.replace(/\s/g, '')}`} className="text-xl text-zinc-400 hover:text-[#ff5c00] transition-colors duration-300">{CONTENT.site.contacts.phone}</a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="bg-white/[0.01] border border-white/5 p-8 md:p-14 rounded-sm min-h-[500px] flex flex-col">
            {status === 'success' ? (
              <div className="flex-1 flex flex-col justify-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="mb-8">
                  <span className="font-technical text-[#ff5c00] text-[8px] mb-2 block">System Receipt</span>
                  <p className="text-white text-2xl font-display mb-4">Inquiry received.</p>
                  <p className="text-zinc-500 text-sm">Our engineering leads have been notified and will review your mission requirements shortly.</p>
                </div>
                
                <button 
                  onClick={() => {
                    setStatus('idle');
                    setFormData({ name: '', email: '', subject: '', message: '', consent: false, company: '' });
                  }} 
                  className="font-technical text-[#ff5c00] hover:text-white transition-colors self-start"
                >
                  New Submission
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                {/* Honeypot field - hidden from users */}
                <input 
                  type="text" 
                  className="hidden" 
                  value={formData.company} 
                  onChange={(e) => setFormData({...formData, company: e.target.value})} 
                  tabIndex={-1} 
                  autoComplete="off" 
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="flex flex-col gap-3">
                    <label className="font-technical text-zinc-700 opacity-65">Name</label>
                    <input 
                      required 
                      className={inputClasses('name')} 
                      placeholder="Your Name" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="font-technical text-zinc-700 opacity-65">Email</label>
                    <input 
                      required 
                      type="email" 
                      className={inputClasses('email')} 
                      placeholder="Your Email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <label className="font-technical text-zinc-700 opacity-65">Subject</label>
                  <input 
                    required 
                    className={inputClasses('subject')} 
                    placeholder="Nature of project" 
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="font-technical text-zinc-700 opacity-65">Message</label>
                  <textarea 
                    required 
                    rows={4} 
                    className={inputClasses('message') + " resize-none"} 
                    placeholder="Describe the mission" 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>
                <div className="flex items-start gap-4">
                  <input 
                    required 
                    type="checkbox" 
                    className="mt-1 accent-[#ff5c00] w-3 h-3 cursor-pointer" 
                    id="consent" 
                    checked={formData.consent}
                    onChange={(e) => setFormData({...formData, consent: e.target.checked})}
                  />
                  <label htmlFor="consent" className="text-[10px] text-zinc-600 leading-relaxed cursor-pointer select-none opacity-80">
                    I agree to the privacy policy and consent to being contacted about my enquiry.
                  </label>
                </div>
                <button 
                  disabled={status === 'loading'}
                  className="font-technical text-[#ff5c00] hover:text-white transition-all duration-300 flex items-center gap-4 group"
                >
                  {status === 'loading' ? 'Encrypting & Sending...' : 'Send Enquiry'} 
                  <span className="translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
