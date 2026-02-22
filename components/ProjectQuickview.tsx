import React, { useEffect, useRef, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Artifact, MediaAsset } from '../types';

interface ProjectQuickviewProps {
  open: boolean;
  onClose: () => void;
  artifact: Artifact | null;
}

const ProjectQuickview: React.FC<ProjectQuickviewProps> = ({ open, onClose, artifact }) => {
  const [index, setIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchRef = useRef({ startX: 0, startTime: 0 });
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  // Reset index when artifact changes or when modal opens
  useEffect(() => {
    if (open) {
      previousFocus.current = document.activeElement as HTMLElement;
      setIndex(0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      if (previousFocus.current) {
        previousFocus.current.focus();
      }
    }
  }, [open, artifact?.id]);

  const handleNext = useCallback(() => {
    if (!artifact || !artifact.gallery.length) return;
    setIndex((prev) => (prev + 1) % artifact.gallery.length);
  }, [artifact]);

  const handlePrev = useCallback(() => {
    if (!artifact || !artifact.gallery.length) return;
    setIndex((prev) => (prev - 1 + artifact.gallery.length) % artifact.gallery.length);
  }, [artifact]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose, handleNext, handlePrev]);

  if (!open || !artifact) return null;

  // Use a safe index calculation to prevent out-of-bounds access during state updates
  const safeIndex = artifact.gallery.length > 0 ? index % artifact.gallery.length : 0;
  const activeMedia = artifact.gallery[safeIndex];

  // If even with safeIndex we have no media, avoid rendering properties
  if (!activeMedia) return null;

  const onPointerDown = (e: React.PointerEvent) => {
    touchRef.current = { startX: e.clientX, startTime: Date.now() };
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const deltaX = e.clientX - touchRef.current.startX;
    const deltaTime = Date.now() - touchRef.current.startTime;
    if (Math.abs(deltaX) > 60 && deltaTime < 300) {
      if (deltaX > 0) handlePrev();
      else handleNext();
    }
  };

  return ReactDOM.createPortal(
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${artifact.title} project gallery`}
    >
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity duration-300 ${reducedMotion ? 'duration-0' : ''}`}
        onClick={onClose}
      />

      {/* Panel */}
      <div 
        ref={dialogRef}
        className={`relative w-full max-w-6xl bg-[#080808] border border-white/5 rounded-sm overflow-hidden flex flex-col transition-all duration-500 transform ${open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${reducedMotion ? '!transition-none !translate-y-0' : ''}`}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        {/* Media Container: Locked Aspect Ratio */}
        <div className="relative aspect-[16/10] md:aspect-[16/9] w-full bg-black flex items-center justify-center overflow-hidden select-none">
          <div className="absolute inset-0 z-10 pointer-events-none border-b border-white/5" />
          
          <div key={`${artifact.id}-${safeIndex}`} className={`w-full h-full flex items-center justify-center animate-in fade-in zoom-in-95 duration-500 ${reducedMotion ? '!animate-none' : ''}`}>
            {activeMedia.type === 'video' ? (
              <video 
                autoPlay 
                muted 
                playsInline 
                loop 
                controls
                className="max-w-full max-h-full object-contain"
                preload="metadata"
              >
                <source src={activeMedia.src} type="video/mp4" />
              </video>
            ) : activeMedia.type === 'svg' ? (
              <img src={activeMedia.src} alt={activeMedia.alt} className="w-[40%] h-auto opacity-90 brightness-110" />
            ) : (
              <img src={activeMedia.src} alt={activeMedia.alt} className="max-w-full max-h-full object-contain" />
            )}
          </div>

          {/* Nav Controls (Desktop) */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-4 flex justify-between pointer-events-none z-20 hidden md:flex">
            <button 
              onClick={handlePrev}
              className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/5 text-white/40 hover:text-white hover:bg-white/10 pointer-events-auto transition-all rounded-full"
            >
              ←
            </button>
            <button 
              onClick={handleNext}
              className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/5 text-white/40 hover:text-white hover:bg-white/10 pointer-events-auto transition-all rounded-full"
            >
              →
            </button>
          </div>
          
          {/* Counter */}
          <div className="absolute bottom-6 right-6 z-20 font-technical text-[9px] text-white/40 bg-black/40 px-3 py-1.5 backdrop-blur-md border border-white/5 rounded-full">
            {safeIndex + 1} / {artifact.gallery.length}
          </div>
        </div>

        {/* Info */}
        <div className="p-8 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-4 mb-3">
              <span className="font-technical text-[#ff5c00] text-[8px]">{artifact.subtitle}</span>
              <div className="w-4 h-[1px] bg-white/10" />
              <span className="font-technical text-white/30 text-[8px] uppercase">{artifact.id} system</span>
            </div>
            <h3 className="text-2xl font-display text-white mb-4">{artifact.title}</h3>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-lg">{artifact.body}</p>
          </div>

          <div className="flex items-center gap-6">
            {artifact.caseStudyHref && (
              <a href={artifact.caseStudyHref} className="font-technical text-[9px] text-white hover:text-[#ff5c00] transition-colors border-b border-white/10 pb-1">
                View Case Study
              </a>
            )}
            <button 
              onClick={onClose}
              className="font-technical text-[9px] text-[#ff5c00] hover:text-white transition-colors"
            >
              Close Artifact
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ProjectQuickview;