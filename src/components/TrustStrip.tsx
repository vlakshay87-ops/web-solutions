import React from 'react';
import {Gauge, Layers, MapPin, MonitorSmartphone} from 'lucide-react';
import {useScrollReveal} from '../hooks/useScrollReveal';

const TRUST_ITEMS = [
  {
    icon: Layers,
    title: 'MODERN DESIGN',
    description: "Beautiful interfaces built for today's web.",
  },
  {
    icon: MonitorSmartphone,
    title: 'RESPONSIVE',
    description: 'Looks sharp on every screen.',
  },
  {
    icon: Gauge,
    title: 'FAST',
    description: 'Performance-focused development.',
  },
  {
    icon: MapPin,
    title: 'NEW DELHI',
    description: 'Serving businesses from New Delhi.',
  },
];

export function TrustStrip() {
  const {ref, isVisible} = useScrollReveal<HTMLElement>(0.15);

  return (
    <section
      ref={ref}
      aria-label="Core Standards"
      className="border-y border-white/[0.07] bg-[#0A0C13]/70"
    >
      <div
        className={`mx-auto max-w-[1240px] px-5 sm:px-8 ws-reveal ${
          isVisible ? 'is-visible' : ''
        }`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.07]">
          {TRUST_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="py-6 sm:py-7 sm:px-6 first:sm:pl-0 last:sm:pr-0 flex items-start gap-3.5"
              >
                <div className="mt-0.5 p-2 rounded-lg border border-white/[0.08] bg-white/[0.02] text-[#7D93FF] shrink-0">
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-display text-xs font-semibold tracking-[0.12em] text-white">
                    {item.title}
                  </h2>
                  <p className="mt-1 text-[13px] leading-relaxed text-[#949BA8]">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
