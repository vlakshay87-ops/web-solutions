import React, {useEffect, useState} from 'react';
import {ArrowRight, Menu, X} from 'lucide-react';
import {NAV_ITEMS} from '../data/studioData';
import {useActiveSection} from '../hooks/useScrollReveal';
import {MagneticButton} from './MagneticButton';

interface NavbarProps {
  onNavigateContact: () => void;
}

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

export function Navbar({onNavigateContact}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeId = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#07080C]/82 backdrop-blur-xl border-b border-white/[0.08] py-3.5'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line brand wordmark */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, '#home')}
          className="font-display text-[15px] sm:text-base font-bold tracking-[0.06em] text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F6BFF] rounded"
        >
          WEB SOLUTIONS
        </a>

        {/* Zone 2: Clean single-line navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#949BA8]"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                data-active={isActive}
                className={`ws-nav-link whitespace-nowrap shrink-0 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F6BFF] rounded ${
                  isActive ? 'text-white' : 'hover:text-white'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Single primary action + mobile menu trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <MagneticButton
            onClick={() => {
              setMobileOpen(false);
              onNavigateContact();
            }}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-[13px] font-semibold text-white bg-[#4F6BFF] hover:bg-[#5D77FF] active:scale-[0.98] rounded-lg shadow-[0_0_24px_-6px_rgba(79,107,255,0.65)] transition-all duration-200 whitespace-nowrap shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
          >
            <span>Let&apos;s Build</span>
            <ArrowRight
              className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </MagneticButton>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-white/[0.1] bg-[#0D1018]/90 text-white hover:border-white/25 transition-colors cursor-pointer"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="mx-5 mt-3 rounded-xl border border-white/[0.09] bg-[#0D1018]/95 backdrop-blur-2xl p-5 shadow-2xl">
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeId === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#4F6BFF]/15 text-white'
                      : 'text-[#949BA8] hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-60" aria-hidden="true" />
                </a>
              );
            })}
          </nav>

          <div className="mt-4 pt-4 border-t border-white/[0.08]">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onNavigateContact();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#4F6BFF] hover:bg-[#5D77FF] rounded-lg transition-colors cursor-pointer"
            >
              <span>Let&apos;s Build</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
