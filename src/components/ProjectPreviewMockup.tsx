import React from 'react';
import {ShowcaseProject} from '../data/studioData';

interface ProjectPreviewMockupProps {
  projectId: ShowcaseProject['id'];
  domainUrl: string;
  compact?: boolean;
}

/**
 * Renders distinct miniature website UIs inside a clean browser frame
 * for each fictional showcase concept.
 */
export function ProjectPreviewMockup({
  projectId,
  domainUrl,
  compact = true,
}: ProjectPreviewMockupProps) {
  return (
    <div className="rounded-xl border border-white/[0.1] bg-[#07090F] overflow-hidden shadow-inner">
      {/* Miniature Browser Top Bar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.07] bg-[#0A0D15]">
        <div className="flex items-center gap-1" aria-hidden="true">
          <span className="w-2 h-2 rounded-full bg-white/15" />
          <span className="w-2 h-2 rounded-full bg-white/15" />
          <span className="w-2 h-2 rounded-full bg-white/15" />
        </div>
        <div className="px-2.5 py-0.5 rounded bg-white/[0.04] text-[10px] font-mono-code text-[#949BA8] truncate max-w-[160px]">
          {domainUrl}
        </div>
        <div className="w-6" aria-hidden="true" />
      </div>

      {/* Distinct Project Visual Identity */}
      {projectId === 'elite-motors' && (
        <div
          className={`relative bg-gradient-to-br from-[#0B0D12] via-[#121622] to-[#08090D] p-4 sm:p-5 text-white overflow-hidden ${
            compact ? 'h-[215px]' : 'h-[310px]'
          } flex flex-col justify-between`}
        >
          {/* Ambient Silver/Cobalt Headlamp Glow */}
          <div
            aria-hidden="true"
            className="absolute -right-8 top-6 w-48 h-28 rounded-full bg-[radial-gradient(circle,rgba(148,176,255,0.22),transparent_70%)] blur-xl"
          />

          {/* Mini Header */}
          <div className="relative z-10 flex items-center justify-between text-[9px] tracking-[0.18em] uppercase text-white/75">
            <span className="font-semibold text-white">ELITE MOTORS</span>
            <div className="flex items-center gap-3 text-white/55">
              <span>Fleet</span>
              <span>Showroom</span>
              <span className="px-2 py-0.5 rounded border border-white/25 text-white">
                Reserve
              </span>
            </div>
          </div>

          {/* Centerpiece Automotive Silhouette + Copy */}
          <div className="relative z-10 grid grid-cols-12 items-end gap-2 my-auto py-2">
            <div className="col-span-7 space-y-1.5">
              <div className="text-[9px] uppercase tracking-[0.2em] text-[#9EB0FF]">
                2026 Grand Tourer
              </div>
              <div
                className={`font-display font-semibold leading-[1.08] tracking-tight text-white ${
                  compact ? 'text-base' : 'text-2xl'
                }`}
              >
                Precision built for every mile.
              </div>
              <div className="pt-1 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-white text-[#07090F] text-[9px] font-semibold">
                  Book Test Drive
                </span>
                <span className="text-[9px] text-white/60">Explore Specs</span>
              </div>
            </div>

            {/* Sleek Geometric Vehicle Silhouette SVG */}
            <div className="col-span-5 flex items-end justify-end">
              <svg
                viewBox="0 0 180 76"
                className="w-full h-auto opacity-95 transition-transform duration-500 group-hover:scale-105"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="carBody" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#DCE3F2" />
                    <stop offset="55%" stopColor="#7C889E" />
                    <stop offset="100%" stopColor="#262C3A" />
                  </linearGradient>
                </defs>
                <path
                  d="M12 52 C24 39, 48 25, 84 23 C112 22, 134 29, 156 38 C166 41, 172 47, 172 54 L14 54 Z"
                  fill="url(#carBody)"
                  fillOpacity="0.22"
                  stroke="url(#carBody)"
                  strokeWidth="1.5"
                />
                <path
                  d="M46 37 C62 28, 88 26, 118 32"
                  fill="none"
                  stroke="#9EB0FF"
                  strokeWidth="1.2"
                />
                <line
                  x1="145"
                  y1="44"
                  x2="165"
                  y2="45"
                  stroke="#9EB0FF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="44" cy="55" r="10" fill="#0B0D12" stroke="#9AA3B5" strokeWidth="1.8" />
                <circle cx="136" cy="55" r="10" fill="#0B0D12" stroke="#9AA3B5" strokeWidth="1.8" />
              </svg>
            </div>
          </div>

          {/* Bottom Spec Strip */}
          <div className="relative z-10 pt-2.5 border-t border-white/[0.1] grid grid-cols-3 gap-2 text-[9px]">
            <div>
              <div className="text-white/45">Acceleration</div>
              <div className="font-mono-code font-medium text-white tabular-nums">
                3.2s 0-100
              </div>
            </div>
            <div>
              <div className="text-white/45">Powertrain</div>
              <div className="font-mono-code font-medium text-white">AWD Hybrid</div>
            </div>
            <div>
              <div className="text-white/45">Delivery</div>
              <div className="font-mono-code font-medium text-[#9EB0FF]">
                New Delhi
              </div>
            </div>
          </div>
        </div>
      )}

      {projectId === 'pawfect' && (
        <div
          className={`relative bg-[#F7F3EC] text-[#1D2420] p-4 sm:p-5 overflow-hidden ${
            compact ? 'h-[215px]' : 'h-[310px]'
          } flex flex-col justify-between`}
        >
          {/* Mini Header */}
          <div className="flex items-center justify-between text-[9px]">
            <span className="font-display font-bold text-xs tracking-tight text-[#1E3F35]">
              PAWFECT
            </span>
            <div className="flex items-center gap-2.5 text-[#4E5A54] font-medium">
              <span>Grooming</span>
              <span>Care</span>
              <span className="px-2 py-0.5 rounded-full bg-[#244B3E] text-white">
                Book Visit
              </span>
            </div>
          </div>

          {/* Warm Boutique Pet Care Layout */}
          <div className="grid grid-cols-12 gap-3 items-center my-auto py-1">
            <div className="col-span-7 space-y-1.5">
              <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#B85D3B]">
                Gentle Pet Studio
              </div>
              <div
                className={`font-display font-bold leading-[1.08] tracking-tight text-[#1D2420] ${
                  compact ? 'text-base' : 'text-2xl'
                }`}
              >
                Calm grooming your pet looks forward to.
              </div>
              <div className="pt-1 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-[#244B3E] text-white text-[9px] font-semibold">
                  Schedule Session
                </span>
                <span className="text-[9px] font-medium text-[#4E5A54]">
                  View Packages
                </span>
              </div>
            </div>

            {/* Clean Booking Card inside the miniature site */}
            <div className="col-span-5 rounded-xl bg-white border border-[#E5DDD0] p-2.5 shadow-sm space-y-2 transition-transform duration-500 group-hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-semibold text-[#1D2420]">
                  Spa Menu
                </span>
                <span className="w-2 h-2 rounded-full bg-[#B85D3B]" />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between rounded bg-[#F7F3EC] px-2 py-1 text-[8px]">
                  <span className="font-medium text-[#1D2420]">Bath &amp; Brush</span>
                  <span className="font-mono-code text-[#244B3E] tabular-nums">₹899</span>
                </div>
                <div className="flex items-center justify-between rounded bg-[#F7F3EC] px-2 py-1 text-[8px]">
                  <span className="font-medium text-[#1D2420]">Full Groom</span>
                  <span className="font-mono-code text-[#244B3E] tabular-nums">₹1,499</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Trust Line */}
          <div className="pt-2 border-t border-[#E4DDD1] flex items-center justify-between text-[9px] text-[#55615B]">
            <span>Sanitized Stations · Vet-Approved Products</span>
            <span className="font-semibold text-[#244B3E]">Open Daily</span>
          </div>
        </div>
      )}

      {projectId === 'nova' && (
        <div
          className={`relative bg-[#0B0E17] text-white p-4 sm:p-5 overflow-hidden ${
            compact ? 'h-[215px]' : 'h-[310px]'
          } flex flex-col justify-between`}
        >
          {/* Subtle Swiss Grid */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />

          {/* Mini Header */}
          <div className="relative z-10 flex items-center justify-between text-[9px]">
            <div className="flex items-center gap-1.5 font-display font-bold tracking-wider">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#5B74FF]" />
              <span>NOVA</span>
            </div>
            <div className="flex items-center gap-2.5 text-[#9AA3B5]">
              <span>Platform</span>
              <span>Pricing</span>
              <span className="px-2 py-0.5 rounded bg-[#5B74FF] text-white font-medium">
                Get Started
              </span>
            </div>
          </div>

          {/* Swiss Landing Split */}
          <div className="relative z-10 grid grid-cols-12 gap-3 items-center my-auto py-1">
            <div className="col-span-6 space-y-1.5">
              <div className="text-[9px] font-medium text-[#8B9EFF]">
                Operations Suite
              </div>
              <div
                className={`font-display font-bold leading-[1.06] tracking-tight text-white ${
                  compact ? 'text-base' : 'text-2xl'
                }`}
              >
                Run team workflows in half the time.
              </div>
              <div className="pt-1 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-white text-[#0B0E17] text-[9px] font-semibold">
                  Request Demo
                </span>
              </div>
            </div>

            {/* Clean Miniature Product Card */}
            <div className="col-span-6 rounded-lg border border-white/[0.12] bg-[#121728]/95 p-2.5 space-y-2 transition-transform duration-500 group-hover:translate-x-0.5">
              <div className="flex items-center justify-between text-[8px] text-[#9AA3B5]">
                <span>Monthly Velocity</span>
                <span className="text-[#8B9EFF] font-mono-code">+38%</span>
              </div>
              <div className="flex items-end gap-1.5 h-10 pt-1">
                {[38, 52, 46, 68, 82, 95].map((h, i) => (
                  <div
                    key={i}
                    style={{height: `${h}%`}}
                    className={`flex-1 rounded-t ${
                      i >= 4 ? 'bg-[#5B74FF]' : 'bg-white/[0.14]'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Logos Row */}
          <div className="relative z-10 pt-2 border-t border-white/[0.08] flex items-center justify-between text-[8px] uppercase tracking-[0.16em] text-[#646B78]">
            <span>Trusted by 120+ growing teams</span>
            <span className="text-[#9AA3B5]">99.98% Reliability</span>
          </div>
        </div>
      )}
    </div>
  );
}
