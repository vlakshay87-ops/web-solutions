import React from 'react';
import {ArrowRight, MessageCircle} from 'lucide-react';
import {getWhatsAppUrl} from '../data/studioData';
import {useScrollReveal} from '../hooks/useScrollReveal';
import {MagneticButton} from './MagneticButton';

interface CtaBannerProps {
  onStartProject: () => void;
}

export function CtaBanner({onStartProject}: CtaBannerProps) {
  const {ref, isVisible} = useScrollReveal<HTMLElement>(0.15);

  return (
    <section
      ref={ref}
      className="relative py-24 sm:py-32 border-b border-white/[0.06] overflow-hidden"
    >
      {/* Focused subtle radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_50%_50%,rgba(79,107,255,0.11),transparent_72%)]"
      />

      <div
        className={`relative z-10 mx-auto max-w-[920px] px-5 sm:px-8 text-center ws-reveal ${
          isVisible ? 'is-visible' : ''
        }`}
      >
        <h2 className="font-display text-[clamp(2.1rem,4.4vw,3.6rem)] font-bold leading-[1.06] tracking-[-0.03em] text-white">
          HAVE A BUSINESS.
          <br />
          NEED A WEBSITE?
        </h2>

        <p className="mt-5 mx-auto max-w-xl text-base sm:text-lg leading-relaxed text-[#949BA8]">
          Tell us what you&apos;re building. We&apos;ll help turn the idea into a
          modern website your customers can trust.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton
            onClick={onStartProject}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-semibold text-white bg-[#4F6BFF] hover:bg-[#5E78FF] active:scale-[0.98] rounded-xl shadow-[0_0_32px_-8px_rgba(79,107,255,0.75)] transition-all duration-200 group cursor-pointer whitespace-nowrap"
          >
            <span>Start Your Project</span>
            <ArrowRight
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </MagneticButton>

          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-medium text-[#E4E8F0] hover:text-white border border-white/[0.12] hover:border-white/25 bg-white/[0.02] hover:bg-white/[0.05] rounded-xl transition-all duration-200 whitespace-nowrap"
          >
            <MessageCircle
              className="w-4 h-4 text-[#4F6BFF]"
              aria-hidden="true"
            />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        <p className="mt-6 text-xs sm:text-[13px] text-[#646B78]">
          No complicated process. Just a conversation about your website.
        </p>
      </div>
    </section>
  );
}
