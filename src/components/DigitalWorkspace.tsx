import React, {useRef, useState} from 'react';
import {Code2, Layers, Monitor, Smartphone} from 'lucide-react';

type WorkspaceTab = 'interface' | 'structure' | 'code';
type ViewportMode = 'desktop' | 'mobile';

/**
 * Interactive abstract digital studio workspace for the Hero section.
 * Features subtle mouse-driven 3D perspective, clickable inspector tabs,
 * responsive viewport switcher, and animated SVG signal trace.
 */
export function DigitalWorkspace() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({rotateX: 0, rotateY: 0});
  const [activeTab, setActiveTab] = useState<WorkspaceTab>('interface');
  const [viewport, setViewport] = useState<ViewportMode>('desktop');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rotateX: Number((-y * 6).toFixed(2)),
      rotateY: Number((x * 7).toFixed(2)),
    });
  };

  const handleMouseLeave = () => {
    setTilt({rotateX: 0, rotateY: 0});
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full select-none"
      style={{perspective: '1200px'}}
    >
      {/* Subtle studio ambient glow behind workspace */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 rounded-3xl bg-[radial-gradient(circle_at_60%_38%,rgba(79,107,255,0.18),transparent_62%)] blur-2xl pointer-events-none"
      />

      {/* Animated SVG architectural trace connecting floating layers */}
      <svg
        aria-hidden="true"
        viewBox="0 0 520 420"
        className="hidden sm:block absolute inset-0 w-full h-full pointer-events-none z-0 opacity-75"
      >
        <path
          d="M 38 72 L 180 72 L 210 102 L 470 102"
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
        />
        <path
          d="M 38 72 L 180 72 L 210 102 L 470 102"
          fill="none"
          stroke="#4F6BFF"
          strokeWidth="1.25"
          strokeLinecap="round"
          className="ws-trace-line"
        />
        <path
          d="M 60 355 L 250 355 L 285 320 L 490 320"
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
        />
        <circle cx="38" cy="72" r="2.5" fill="#4F6BFF" />
        <circle cx="470" cy="102" r="2.5" fill="#7C5CFF" />
      </svg>

      {/* Main 3D perspective stage */}
      <div
        className="relative z-10 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Primary Interactive Studio Frame */}
        <div className="rounded-2xl border border-white/[0.11] bg-[#0C0F18]/92 backdrop-blur-xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85)] overflow-hidden">
          {/* Browser / Studio Top Chrome */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-white/[0.07] bg-[#090B12]">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
            </div>

            {/* Interactive View Tabs */}
            <div
              role="tablist"
              aria-label="Workspace View"
              className="flex items-center gap-1 p-0.5 rounded-lg bg-white/[0.04] border border-white/[0.06]"
            >
              {(
                [
                  {id: 'interface', label: 'Interface', icon: Layers},
                  {id: 'structure', label: 'Layout', icon: Monitor},
                  {id: 'code', label: 'Code', icon: Code2},
                ] as const
              ).map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveTab(tab.id)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      active
                        ? 'bg-[#4F6BFF] text-white shadow-sm'
                        : 'text-[#949BA8] hover:text-white'
                    }`}
                  >
                    <Icon className="w-3 h-3" aria-hidden="true" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Breakpoint Switcher */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Desktop preview mode"
                onClick={() => setViewport('desktop')}
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                  viewport === 'desktop'
                    ? 'bg-white/[0.1] text-white'
                    : 'text-[#646B78] hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Mobile preview mode"
                onClick={() => setViewport('mobile')}
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                  viewport === 'mobile'
                    ? 'bg-white/[0.1] text-white'
                    : 'text-[#646B78] hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Canvas Interior */}
          <div className="relative p-5 sm:p-6 min-h-[290px] sm:min-h-[325px] bg-[radial-gradient(circle_at_80%_10%,rgba(79,107,255,0.08),transparent_55%)]">
            {activeTab === 'interface' && (
              <div
                className={`mx-auto transition-all duration-300 ${
                  viewport === 'mobile' ? 'max-w-[235px]' : 'w-full'
                }`}
              >
                {/* Simulated Modern Web Canvas */}
                <div className="rounded-xl border border-white/[0.08] bg-[#07090F] p-4 sm:p-5 space-y-4">
                  {/* Mini Site Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-[#4F6BFF]" />
                      <span className="text-[11px] font-semibold tracking-wider text-white/90">
                        STUDIO FRAME
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5 text-[10px] text-[#949BA8]">
                      <span>Work</span>
                      <span>About</span>
                      <span className="px-2 py-0.5 rounded bg-white/[0.08] text-white">
                        Contact
                      </span>
                    </div>
                  </div>

                  {/* Mini Hero Wireframe with Crisp Type */}
                  <div
                    className={`grid gap-4 ${
                      viewport === 'mobile'
                        ? 'grid-cols-1'
                        : 'grid-cols-12 items-center'
                    }`}
                  >
                    <div
                      className={
                        viewport === 'mobile' ? 'space-y-2.5' : 'col-span-7 space-y-2.5'
                      }
                    >
                      <div className="text-[10px] uppercase tracking-[0.14em] text-[#7D93FF] font-medium">
                        Conversion Architecture
                      </div>
                      <div className="font-display text-base sm:text-lg font-semibold leading-tight text-white">
                        Digital clarity that earns customer trust.
                      </div>
                      <div className="h-2 w-4/5 rounded-full bg-white/[0.08]" />
                      <div className="h-2 w-3/5 rounded-full bg-white/[0.05]" />
                      <div className="pt-1 flex items-center gap-2">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#4F6BFF] text-[10px] font-medium text-white">
                          Launch Site
                        </span>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md border border-white/[0.1] text-[10px] text-[#949BA8]">
                          Explore
                        </span>
                      </div>
                    </div>

                    {/* Visual Component Stack */}
                    <div
                      className={
                        viewport === 'mobile'
                          ? 'grid grid-cols-2 gap-2'
                          : 'col-span-5 space-y-2.5'
                      }
                    >
                      <div className="rounded-lg border border-white/[0.08] bg-[#0E121D] p-3">
                        <div className="text-[10px] text-[#949BA8]">Core Vitals</div>
                        <div className="mt-1 font-mono-code text-sm font-medium text-white tabular-nums">
                          99 / 100
                        </div>
                        <div className="mt-2 h-1 w-full rounded-full bg-white/[0.06] overflow-hidden">
                          <div className="h-full w-[94%] bg-gradient-to-r from-[#4F6BFF] to-[#8AA0FF]" />
                        </div>
                      </div>
                      <div className="rounded-lg border border-white/[0.08] bg-[#0E121D] p-3">
                        <div className="text-[10px] text-[#949BA8]">Responsive Grid</div>
                        <div className="mt-1.5 grid grid-cols-3 gap-1">
                          <span className="h-4 rounded bg-white/[0.08]" />
                          <span className="h-4 rounded bg-[#4F6BFF]/35" />
                          <span className="h-4 rounded bg-white/[0.08]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'structure' && (
              <div
                className={`mx-auto transition-all duration-300 ${
                  viewport === 'mobile' ? 'max-w-[235px]' : 'w-full'
                }`}
              >
                <div className="rounded-xl border border-dashed border-white/[0.14] bg-[#07090F] p-4 space-y-3">
                  <div className="flex items-center justify-between text-[10px] font-mono-code text-[#949BA8]">
                    <span>12-Column Fluid Grid</span>
                    <span>gap: 24px</span>
                  </div>
                  <div
                    className={`grid gap-2.5 ${
                      viewport === 'mobile' ? 'grid-cols-2' : 'grid-cols-4'
                    }`}
                  >
                    <div className="col-span-2 rounded-lg border border-[#4F6BFF]/40 bg-[#4F6BFF]/[0.08] p-3">
                      <div className="text-[10px] font-mono-code text-[#93A7FF]">
                        Hero Proposition
                      </div>
                      <div className="mt-2 h-2 w-3/4 rounded bg-white/20" />
                      <div className="mt-1.5 h-2 w-1/2 rounded bg-white/10" />
                    </div>
                    <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] p-3">
                      <div className="text-[10px] font-mono-code text-[#949BA8]">
                        Visual Layer
                      </div>
                      <div className="mt-2 h-6 rounded bg-white/[0.06]" />
                    </div>
                    <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] p-3">
                      <div className="text-[10px] font-mono-code text-[#949BA8]">
                        Primary CTA
                      </div>
                      <div className="mt-2 h-6 rounded bg-[#4F6BFF]/30" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2.5">
                    {['Trust Strip', 'Case Preview', 'Lead Form'].map((block) => (
                      <div
                        key={block}
                        className="rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-2.5 text-[10px] font-mono-code text-[#949BA8]"
                      >
                        {block}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'code' && (
              <div className="rounded-xl border border-white/[0.08] bg-[#07090F] p-4 font-mono-code text-[11px] leading-relaxed overflow-x-auto">
                <div className="text-[#646B78] mb-2">src/layout/StudioCanvas.tsx</div>
                <pre className="text-[#CBD2DF]">
                  <code>
                    <span className="text-[#7C5CFF]">export function</span>{' '}
                    <span className="text-[#93A7FF]">StudioHero</span>() {'{\n'}
                    {'  '}
                    <span className="text-[#7C5CFF]">return</span> ({'\n'}
                    {'    '}&lt;<span className="text-[#4F6BFF]">section</span>{' '}
                    className=&quot;grid-surface&quot;&gt;{'\n'}
                    {'      '}&lt;<span className="text-[#4F6BFF]">Headline</span>{' '}
                    emphasis=&quot;REMEMBER&quot; /&gt;{'\n'}
                    {'      '}&lt;<span className="text-[#4F6BFF]">ActionBar</span>{' '}
                    whatsapp=&quot;9319672630&quot; /&gt;{'\n'}
                    {'    '}&lt;/<span className="text-[#4F6BFF]">section</span>&gt;{'\n'}
                    {'  '});{'\n'}
                    {'}'}
                  </code>
                </pre>
              </div>
            )}

            {/* Subtle animated studio cursor pointer */}
            <div
              aria-hidden="true"
              className="hidden sm:flex items-center gap-1.5 absolute bottom-5 right-6 ws-float-slow pointer-events-none"
            >
              <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
                <path
                  d="M1 1L5.2 14L7.3 8.5L13 6.5L1 1Z"
                  fill="#4F6BFF"
                  stroke="#FFFFFF"
                  strokeWidth="1.1"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="px-2 py-0.5 rounded bg-[#141926] border border-white/[0.12] text-[10px] font-medium text-white/90 shadow-lg">
                Interactive UI
              </span>
            </div>
          </div>
        </div>

        {/* Floating Secondary Layer Card (Bottom-Left Overlap) */}
        <div
          className="hidden sm:block absolute -bottom-5 -left-5 rounded-xl border border-white/[0.11] bg-[#0D1018]/95 backdrop-blur-xl px-4 py-3 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8)] ws-float-delayed"
          style={{transform: 'translateZ(26px)'}}
        >
          <div className="text-[10px] uppercase tracking-[0.14em] text-[#949BA8]">
            Typography &amp; Tokens
          </div>
          <div className="mt-1 flex items-baseline gap-2.5">
            <span className="font-display text-sm font-semibold text-white">Aa</span>
            <span className="text-xs text-[#949BA8]">Fluid scale · 60fps transitions</span>
          </div>
        </div>

        {/* Floating Secondary Layer Card (Top-Right Overlap) */}
        <div
          className="hidden lg:block absolute -top-4 -right-4 rounded-xl border border-white/[0.11] bg-[#0D1018]/95 backdrop-blur-xl px-3.5 py-2.5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8)] ws-float-slow"
          style={{transform: 'translateZ(34px)'}}
        >
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-sm bg-[#4F6BFF]" aria-hidden="true" />
            <span className="text-xs font-medium text-white">Responsive Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
}
