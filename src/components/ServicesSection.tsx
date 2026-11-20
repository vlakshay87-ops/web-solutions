import React from 'react';
import {ArrowUpRight, Building2, Code2, ShoppingBag, Target} from 'lucide-react';
import {SERVICES, ServiceItem} from '../data/studioData';
import {useScrollReveal} from '../hooks/useScrollReveal';

interface ServicesSectionProps {
  onSelectService: (serviceOption: string) => void;
}

function ServiceIcon({motif}: {motif: ServiceItem['motif']}) {
  switch (motif) {
    case 'business':
      return <Building2 className="w-5 h-5" aria-hidden="true" />;
    case 'landing':
      return <Target className="w-5 h-5" aria-hidden="true" />;
    case 'ecommerce':
      return <ShoppingBag className="w-5 h-5" aria-hidden="true" />;
    case 'custom':
      return <Code2 className="w-5 h-5" aria-hidden="true" />;
  }
}

function ServiceMiniVisual({motif}: {motif: ServiceItem['motif']}) {
  if (motif === 'business') {
    return (
      <div
        aria-hidden="true"
        className="mt-6 rounded-xl border border-white/[0.06] bg-[#07090F] p-3.5 transition-colors duration-300 group-hover:border-white/[0.12]"
      >
        <div className="flex items-center justify-between mb-2.5">
          <div className="h-1.5 w-16 rounded-full bg-white/20" />
          <div className="flex gap-1.5">
            <span className="h-1.5 w-5 rounded-full bg-white/10" />
            <span className="h-1.5 w-5 rounded-full bg-white/10" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-2 h-9 rounded-md bg-white/[0.04] border border-white/[0.05] p-2 flex flex-col justify-between">
            <span className="h-1.5 w-3/4 rounded-full bg-white/25" />
            <span className="h-1 w-1/2 rounded-full bg-white/10" />
          </div>
          <div className="h-9 rounded-md bg-[#4F6BFF]/15 border border-[#4F6BFF]/25" />
        </div>
      </div>
    );
  }

  if (motif === 'landing') {
    return (
      <div
        aria-hidden="true"
        className="mt-6 rounded-xl border border-white/[0.06] bg-[#07090F] p-3.5 transition-colors duration-300 group-hover:border-white/[0.12]"
      >
        <div className="flex flex-col items-center justify-center py-1 space-y-2">
          <div className="h-1.5 w-24 rounded-full bg-white/25" />
          <div className="h-1.5 w-16 rounded-full bg-white/10" />
          <div className="mt-1 flex items-center gap-2">
            <span className="h-5 w-16 rounded-md bg-[#4F6BFF]/80 transition-transform duration-300 group-hover:scale-105" />
            <span className="h-5 w-10 rounded-md border border-white/[0.12]" />
          </div>
        </div>
      </div>
    );
  }

  if (motif === 'ecommerce') {
    return (
      <div
        aria-hidden="true"
        className="mt-6 rounded-xl border border-white/[0.06] bg-[#07090F] p-3.5 transition-colors duration-300 group-hover:border-white/[0.12]"
      >
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((idx) => (
            <div
              key={idx}
              className="rounded-md border border-white/[0.06] bg-white/[0.025] p-1.5 space-y-1.5"
            >
              <div
                className={`h-6 rounded ${
                  idx === 1 ? 'bg-[#4F6BFF]/20' : 'bg-white/[0.06]'
                }`}
              />
              <div className="h-1 w-4/5 rounded-full bg-white/20" />
              <div className="h-1 w-1/2 rounded-full bg-[#7D93FF]/60" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="mt-6 rounded-xl border border-white/[0.06] bg-[#07090F] p-3.5 transition-colors duration-300 group-hover:border-white/[0.12]"
    >
      <div className="flex items-center justify-between gap-2 py-1">
        <div className="h-9 flex-1 rounded-md border border-white/[0.08] bg-white/[0.03] flex items-center justify-center">
          <span className="w-2 h-2 rounded-sm bg-[#4F6BFF]" />
        </div>
        <div className="h-px w-5 bg-gradient-to-r from-[#4F6BFF] to-[#7C5CFF]" />
        <div className="h-9 flex-1 rounded-md border border-[#4F6BFF]/30 bg-[#4F6BFF]/[0.08] flex items-center justify-center">
          <span className="w-3 h-1.5 rounded-full bg-white/70" />
        </div>
        <div className="h-px w-5 bg-white/20" />
        <div className="h-9 flex-1 rounded-md border border-white/[0.08] bg-white/[0.03] flex items-center justify-center">
          <span className="w-2 h-2 rounded-full bg-white/40" />
        </div>
      </div>
    </div>
  );
}

export function ServicesSection({onSelectService}: ServicesSectionProps) {
  const {ref, isVisible} = useScrollReveal<HTMLElement>(0.1);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <section
      id="services"
      ref={ref}
      className="relative py-24 sm:py-32 border-b border-white/[0.06]"
    >
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div
          className={`max-w-2xl ws-reveal ${isVisible ? 'is-visible' : ''}`}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7D93FF]">
            Services
          </p>
          <h2 className="mt-3 font-display text-[clamp(2rem,3.6vw,3.1rem)] font-bold leading-[1.08] tracking-[-0.025em] text-white">
            WHAT WE BUILD
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#949BA8]">
            Websites designed to make your business look credible, modern and
            impossible to ignore.
          </p>
        </div>

        <div className="mt-12 sm:mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((service, index) => (
            <div
              key={service.number}
              onMouseMove={handleCardMouseMove}
              style={{transitionDelay: `${index * 60}ms`}}
              className={`group ws-interactive-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between ws-reveal ${
                isVisible ? 'is-visible' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-4">
                  <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl border border-white/[0.1] bg-[#090B12] text-[#7D93FF] transition-transform duration-200 group-hover:scale-105 group-hover:border-[#4F6BFF]/40 group-hover:text-white">
                    <ServiceIcon motif={service.motif} />
                  </div>
                  <span className="font-mono-code text-xs font-medium tracking-wider text-[#646B78] tabular-nums group-hover:text-[#949BA8] transition-colors">
                    {service.number}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-xl sm:text-2xl font-semibold tracking-[-0.015em] text-white">
                  {service.title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-[#949BA8]">
                  {service.description}
                </p>
              </div>

              <div>
                <ServiceMiniVisual motif={service.motif} />
                <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => onSelectService(service.serviceOption)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-[#CBD2DF] hover:text-white transition-colors cursor-pointer"
                  >
                    <span>Discuss {service.title}</span>
                    <ArrowUpRight
                      className="w-3.5 h-3.5 text-[#7D93FF] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
