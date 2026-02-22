
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
// Fixed: Using CONTENT instead of non-existent BRAND
import { CONTENT } from '../constants';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => onComplete()
    });

    tl.to(contentRef.current, {
      opacity: 1,
      duration: 0.5
    })
    .to(contentRef.current, {
      opacity: 0,
      duration: 0.3,
      delay: 0.6
    })
    .to(containerRef.current, {
      yPercent: -100,
      duration: 0.7,
      ease: 'expo.inOut'
    });
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
    >
      <div 
        ref={contentRef}
        className="opacity-0 text-center"
      >
        {/* Fixed: Updated BRAND to CONTENT */}
        <img src={CONTENT.assets.logo} alt="Brittek" className="w-12 h-12 mx-auto mb-6 opacity-80" />
        <div className="w-16 h-[1px] bg-zinc-800 mx-auto overflow-hidden">
          <div className="h-full w-full bg-[#ff5c00] animate-[load_1s_ease-in-out_infinite]" />
        </div>
      </div>
      <style>{`
        @keyframes load {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default Preloader;
