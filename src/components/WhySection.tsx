import React from 'react';
import {WHY_BLOCKS} from '../data/studioData';
import {useScrollReveal} from '../hooks/useScrollReveal';

export function WhySection() {
  const {ref, isVisible} = useScrollReveal<HTMLElement>(0.12);

  return (
    <section
      ref={ref}
      className="relative py-24 sm:py-32 border-b border-white/[0.06]"
    >
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start ws-reveal ${
            isVisible ? 'is-visible' : ''
          }`}
        >
          <div className="lg:col-span-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7D93FF]">
              Why Web Solutions
            </p>
            <h2 className="mt-3 font-display text-[clamp(2rem,3.6vw,3.15rem)] font-bold leading-[1.08] tracking-[-0.025em] text-white">
              A WEBSITE SHOULD DO MORE THAN LOOK GOOD.
            </h2>
          </div>

          <div className="lg:col-span-6 lg:pt-8">
            <p className="text-base sm:text-[17px] leading-[1.7] text-[#949BA8]">
              Your website is often the first interaction a customer has with your
              business. We combine clean design, modern technology and clear user
              journeys to create websites that build trust and encourage action.
            </p>
          </div>
        </div>

        {/* 3 Large Feature Blocks separated by crisp hairlines */}
        <div className="mt-14 sm:mt-16 border-t border-white/[0.08] divide-y divide-white/[0.08]">
          {WHY_BLOCKS.map((block, index) => (
            <div
              key={block.number}
              style={{transitionDelay: `${index * 70}ms`}}
              className={`group py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline transition-colors duration-200 hover:bg-white/[0.015] px-2 -mx-2 rounded-lg ws-reveal ${
                isVisible ? 'is-visible' : ''
              }`}
            >
              <div className="md:col-span-5 flex items-baseline gap-4">
                <span className="font-mono-code text-sm sm:text-base font-medium text-[#4F6BFF] tabular-nums">
                  {block.number}
                </span>
                <span aria-hidden="true" className="text-white/25">
                  —
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold tracking-[-0.015em] text-white group-hover:text-[#9EB0FF] transition-colors">
                  {block.title}
                </h3>
              </div>
              <div className="md:col-span-7">
                <p className="text-base sm:text-lg leading-relaxed text-[#949BA8] group-hover:text-[#CBD2DF] transition-colors">
                  {block.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
