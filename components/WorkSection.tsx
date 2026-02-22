import React, { useState } from 'react';
import { ARTIFACTS } from '../data';
import { Artifact, MediaAsset } from '../types';
import ProjectQuickview from './ProjectQuickview';
import { useInViewOnce } from '../hooks/useInViewOnce';
import { useIsTouch, usePrefersReducedMotion } from '../hooks/useDeviceHints';

const ArtifactMedia: React.FC<{ media: MediaAsset; isIncog?: boolean }> = ({ media, isIncog }) => {
  const isSvg = media.type === 'svg';
  const isVideo = media.type === 'video';

  return (
    <div className="absolute inset-0 flex items-center justify-center p-12 transition-all duration-700 ease-out will-change-transform group-hover:scale-[1.02] group-hover:brightness-[1.1] motion-reduce:transition-none">
      {isVideo ? (
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          poster={media.poster}
          className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 motion-reduce:transition-none"
        >
          <source src={media.src} type="video/mp4" />
        </video>
      ) : (
        <img 
          src={media.src} 
          alt={media.alt} 
          loading="lazy"
          decoding="async"
          className={`max-w-full max-h-full object-contain transition-all duration-700 ease-out motion-reduce:transition-none ${
            isSvg 
            ? 'opacity-85 group-hover:opacity-100' 
            : isIncog 
              ? 'grayscale opacity-65 group-hover:opacity-100 group-hover:grayscale-0'
              : 'grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0'
          }`} 
        />
      )}
    </div>
  );
};

const WorkCard: React.FC<{ item: Artifact; onOpen: (item: Artifact) => void }> = ({ item, onOpen }) => {
  const isTouch = useIsTouch();
  const prefersReducedMotion = usePrefersReducedMotion();
  const { ref, seen } = useInViewOnce<HTMLElement>("-12% 0% -12% 0%");

  // Overlay logic:
  // - On mobile: scroll reveal once seen (fades to opacity-0)
  // - On desktop: hover reveal (always wins)
  const mobileOverlayClass = isTouch
    ? seen
      ? "opacity-0"
      : "opacity-40"
    : "opacity-40";

  const transitionClass = prefersReducedMotion ? "transition-none" : "transition-opacity duration-700";

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpen(item);
    }
  };

  return (
    <article 
      ref={ref}
      className="group cursor-pointer flex flex-col focus:outline-none"
      onClick={() => onOpen(item)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View ${item.title} gallery`}
    >
      {/* Media Wrapper */}
      <div 
        className="aspect-[4/3] bg-[#080808] border border-white/5 mb-6 overflow-hidden rounded-sm relative transition-all duration-500 ease-out group-hover:border-white/10 group-active:scale-[0.99] will-change-transform focus-within:ring-2 focus-within:ring-[#ff5c00]/20 motion-reduce:transition-none"
      >
        <ArtifactMedia media={item.media} isIncog={item.id === 'incog'} />
        
        {/* Interaction Overlay */}
        <div
          className={[
            "pointer-events-none absolute inset-0 bg-black/40",
            transitionClass,
            mobileOverlayClass,
            "group-hover:opacity-0", // Desktop hover wins
          ].join(" ")}
        />

        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5 group-hover:ring-white/10 transition-colors duration-500 motion-reduce:transition-none" />
      </div>
      
      {/* Meta */}
      <div className="transition-transform duration-500 ease-out will-change-transform group-hover:translate-x-1 motion-reduce:transition-none">
        <div className="flex justify-between items-baseline mb-2">
          <h3 className="text-lg font-display text-white transition-colors duration-300 group-hover:text-[#ff5c00] motion-reduce:transition-none">
            {item.title}
          </h3>
          <span className="font-technical text-white/65 text-[8px] tracking-[0.2em] whitespace-nowrap ml-4">
            {item.subtitle}
          </span>
        </div>
        <p className="text-zinc-500 text-sm leading-relaxed max-w-[32ch] sm:max-w-full opacity-80 group-hover:opacity-100 transition-opacity motion-reduce:transition-none">
          {item.body}
        </p>
      </div>
    </article>
  );
};

const WorkSection: React.FC = () => {
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);

  return (
    <section id="artifacts" className="section-padding border-t border-white/5">
      <div className="container-tight">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 sm:mb-20 gap-8">
          <div className="max-w-xl">
            <span className="font-technical text-[#ff5c00] mb-4 block">Artifacts</span>
            <h2 className="text-[length:var(--t-h2)] font-display text-white leading-tight">Selected Systems.</h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-1">
            <span className="font-technical text-zinc-700">Studio Delivery: 0{ARTIFACTS.length}</span>
            <div className="w-12 h-[1px] bg-white/5 md:hidden"></div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20 sm:gap-y-24">
          {ARTIFACTS.map((item) => (
            <WorkCard 
              key={item.id} 
              item={item} 
              onOpen={(artifact) => setSelectedArtifact(artifact)} 
            />
          ))}
        </div>
      </div>

      <ProjectQuickview 
        open={!!selectedArtifact}
        artifact={selectedArtifact}
        onClose={() => setSelectedArtifact(null)}
      />
    </section>
  );
};

export default WorkSection;