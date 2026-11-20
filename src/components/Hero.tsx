import React, {useRef, useState} from 'react';
import {ArrowRight, MapPin, MessageCircle} from 'lucide-react';
import {BUSINESS_INFO, getWhatsAppUrl} from '../data/studioData';
import {DigitalWorkspace} from './DigitalWorkspace';
import {MagneticButton} from './MagneticButton';

interface HeroProps {
  onStartProject: () => void;
  onViewWork: () => void;
}

export function Hero({onStartProject, onViewWork}: HeroProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [pointer, setPointer] = useState({x: 50, y: 35});

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPointer({x, y});
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[88vh] flex items-center pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden"
    >
      {/* Subtle architectural grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 ws-grid-bg [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]"
      />

      {/* Mouse-following subtle studio spotlight */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(650px circle at ${pointer.x}% ${pointer.y}%, rgba(79, 107, 255, 0.095), transparent 60%)`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1240px] w-full px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Core Proposition */}
          <div className="lg:col-span-6 space-y-7">
            {/* Clean unboxed location indicator (zero-pill discipline) */}
            <div className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-medium tracking-wide text-[#A4ACBA]">
              <MapPin className="w-3.5 h-3.5 text-[#4F6BFF]" aria-hidden="true" />
              <span>Based in {BUSINESS_INFO.locationShort}</span>
            </div>

            <h1 className="font-display text-[clamp(2.5rem,5vw,4.35rem)] font-bold leading-[1.03] tracking-[-0.03em] text-white">
              WE BUILD WEBSITES
              <br />
              PEOPLE{' '}
              <span className="relative inline-block bg-gradient-to-r from-[#6F88FF] via-[#9EB0FF] to-[#E6ECFF] bg-clip-text text-transparent">
                REMEMBER
                <span
                  aria-hidden="true"
                  className="absolute left-0 right-0 -bottom-1 h-[2px] bg-gradient-to-r from-[#4F6BFF] via-[#7C5CFF] to-transparent opacity-80"
                />
              </span>
              .
            </h1>

            <p className="max-w-xl text-base sm:text-[17px] leading-[1.65] text-[#949BA8]">
              Modern, fast and conversion-focused websites for businesses that want to
              look as good online as they do in the real world.
            </p>

            {/* Primary CTA + Secondary Actions */}
            <div className="pt-1 flex flex-wrap items-center gap-4">
              <MagneticButton
                onClick={onStartProject}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-[#4F6BFF] hover:bg-[#5E78FF] active:scale-[0.98] rounded-xl shadow-[0_0_32px_-8px_rgba(79,107,255,0.75)] transition-all duration-200 group cursor-pointer whitespace-nowrap"
              >
                <span>Start a Project</span>
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </MagneticButton>

              <button
                type="button"
                onClick={onViewWork}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-medium text-[#E4E8F0] hover:text-white border border-white/[0.12] hover:border-white/25 bg-white/[0.02] hover:bg-white/[0.05] rounded-xl transition-all duration-200 cursor-pointer whitespace-nowrap"
              >
                View Our Work
              </button>
            </div>

            {/* Quiet direct WhatsApp link */}
            <div className="pt-2 flex items-center gap-3 text-xs sm:text-[13px] text-[#949BA8]">
              <span>Prefer a quick chat?</span>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-white/90 hover:text-white font-medium underline underline-offset-4 decoration-white/25 hover:decoration-[#4F6BFF] transition-colors"
              >
                <MessageCircle
                  className="w-3.5 h-3.5 text-[#4F6BFF]"
                  aria-hidden="true"
                />
                <span>WhatsApp {BUSINESS_INFO.whatsappDisplay}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Digital Workspace Visual */}
          <div className="lg:col-span-6">
            <DigitalWorkspace />
          </div>
        </div>
      </div>
    </section>
  );
}
