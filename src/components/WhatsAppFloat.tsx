import React from 'react';
import {MessageCircle} from 'lucide-react';
import {getWhatsAppUrl} from '../data/studioData';

export function WhatsAppFloat() {
  return (
    <div className="fixed bottom-5 right-5 z-40 group">
      {/* Desktop Hover Tooltip */}
      <span
        role="tooltip"
        className="hidden sm:block pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg border border-white/[0.12] bg-[#0D1018]/95 backdrop-blur-md text-xs font-medium text-white whitespace-nowrap opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shadow-xl"
      >
        Chat on WhatsApp
      </span>

      <a
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Web Solutions"
        className="ws-float-slow flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#15803D] hover:bg-[#16A34A] text-white border border-white/20 shadow-[0_12px_30px_-6px_rgba(22,163,74,0.6)] hover:scale-105 active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <MessageCircle className="w-6 h-6" aria-hidden="true" />
      </a>
    </div>
  );
}
