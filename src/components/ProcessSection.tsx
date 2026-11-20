import React, {useEffect, useRef, useState} from 'react';
import {PROCESS_STEPS} from '../data/studioData';
import {useScrollReveal} from '../hooks/useScrollReveal';

export function ProcessSection() {
  const {ref: revealRef, isVisible} = useScrollReveal<HTMLElement>(0.12);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReduced) {
      setProgress(1);
      return;
    }

    const updateProgress = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      // Progress moves smoothly from 0 as section enters lower viewport to 1 as it centers/exits
      const start = viewportHeight * 0.82;
      const end = viewportHeight * 0.25;
      const raw = (start - rect.top) / (start - end + rect.height * 0.35);
      const clamped = Math.max(0, Math.min(1, raw));
      setProgress(clamped);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, {passive: true});
    window.addEventListener('resize', updateProgress, {passive: true});
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  const setRefs = (node: HTMLElement | null) => {
    sectionRef.current = node;
    revealRef.current = node;
  };

  return (
    <section
      id="process"
      ref={setRefs}
      className="relative py-24 sm:py-32 border-b border-white/[0.06] bg-[#080A10]"
    >
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div
          className={`max-w-2xl ws-reveal ${isVisible ? 'is-visible' : ''}`}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7D93FF]">
            Process
          </p>
          <h2 className="mt-3 font-display text-[clamp(2rem,3.6vw,3.1rem)] font-bold leading-[1.08] tracking-[-0.025em] text-white">
            FROM IDEA TO LIVE WEBSITE.
          </h2>
        </div>

        {/* Connected 4-Step Process */}
        <div className="relative mt-14 sm:mt-16">
          {/* Desktop Horizontal Animated Connector Track */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-[21px] left-0 right-0 h-px bg-white/[0.08]"
          >
            <div
              className="h-full origin-left bg-gradient-to-r from-[#4F6BFF] via-[#7C5CFF] to-[#9EB0FF] shadow-[0_0_12px_rgba(79,107,255,0.65)] transition-transform duration-150 ease-out"
              style={{transform: `scaleX(${progress})`}}
            />
          </div>

          {/* Mobile/Tablet Vertical Animated Connector Track */}
          <div
            aria-hidden="true"
            className="lg:hidden absolute top-5 bottom-5 left-[21px] w-px bg-white/[0.08]"
          >
            <div
              className="w-full h-full origin-top bg-gradient-to-b from-[#4F6BFF] via-[#7C5CFF] to-[#9EB0FF] transition-transform duration-150 ease-out"
              style={{transform: `scaleY(${progress})`}}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-7">
            {PROCESS_STEPS.map((step, index) => {
              const stepThreshold = index / (PROCESS_STEPS.length - 1 || 1);
              const isLit = progress >= stepThreshold * 0.82;

              return (
                <div
                  key={step.number}
                  style={{transitionDelay: `${index * 70}ms`}}
                  className={`relative pl-14 lg:pl-0 ws-reveal ${
                    isVisible ? 'is-visible' : ''
                  }`}
                >
                  {/* Step Node */}
                  <div className="lg:mb-7 absolute left-0 top-0 lg:static flex items-center">
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center font-mono-code text-xs font-semibold tabular-nums border transition-all duration-300 ${
                        isLit
                          ? 'bg-[#12182B] border-[#4F6BFF] text-white shadow-[0_0_24px_-4px_rgba(79,107,255,0.75)]'
                          : 'bg-[#0D1018] border-white/[0.12] text-[#646B78]'
                      }`}
                    >
                      {step.number}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/[0.07] bg-[#0D1018]/80 p-6 h-full transition-colors duration-300 hover:border-white/[0.14]">
                    <h3 className="font-display text-lg font-bold tracking-[0.04em] text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2.5 text-sm sm:text-[15px] leading-relaxed text-[#949BA8]">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
