import React from 'react';
import {BUSINESS_INFO, NAV_ITEMS, getWhatsAppUrl} from '../data/studioData';

export function Footer() {
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  };

  return (
    <footer className="relative bg-[#06070B] border-t border-white/[0.08] overflow-hidden">
      {/* Subtle animated glow line along the top edge of footer */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px overflow-hidden pointer-events-none"
      >
        <div className="ws-footer-glow-sweep w-1/2 h-full bg-gradient-to-r from-transparent via-[#4F6BFF] to-transparent opacity-75" />
      </div>

      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          {/* Brand & Tagline */}
          <div className="md:col-span-5 space-y-3">
            <a
              href="#home"
              onClick={(e) => handleLinkClick(e, '#home')}
              className="inline-block font-display text-base font-bold tracking-[0.06em] text-white"
            >
              {BUSINESS_INFO.name}
            </a>
            <p className="text-sm text-[#949BA8] max-w-xs">
              {BUSINESS_INFO.tagline}
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-4">
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#646B78] mb-3.5">
              Navigation
            </div>
            <nav aria-label="Footer Navigation" className="flex flex-wrap gap-x-6 gap-y-2.5">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className="text-sm text-[#949BA8] hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Studio Location & WhatsApp */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#646B78]">
              Studio
            </div>
            <address className="not-italic text-sm leading-relaxed text-[#949BA8]">
              {BUSINESS_INFO.fullAddress}
            </address>
            <div>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[#CBD2DF] hover:text-white transition-colors"
              >
                WhatsApp: <span className="font-mono-code">{BUSINESS_INFO.whatsappDisplay}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#646B78]">
          <p>© 2026 Web Solutions. All rights reserved.</p>
          <p>New Delhi, India</p>
        </div>
      </div>
    </footer>
  );
}
