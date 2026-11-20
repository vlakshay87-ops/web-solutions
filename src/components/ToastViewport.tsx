import React, {useEffect} from 'react';
import {AlertCircle, CheckCircle2, X} from 'lucide-react';

export type ToastVariant = 'success' | 'error';

export interface ToastMessage {
  id: number;
  variant: ToastVariant;
  title: string;
  description: string;
}

interface ToastViewportProps {
  toasts: ToastMessage[];
  onDismiss: (id: number) => void;
}

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: ToastMessage;
  onDismiss: (id: number) => void;
}) {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      onDismiss(toast.id);
    }, 5200);
    return () => window.clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const isSuccess = toast.variant === 'success';

  return (
    <div
      role={isSuccess ? 'status' : 'alert'}
      aria-live={isSuccess ? 'polite' : 'assertive'}
      className={`pointer-events-auto w-full sm:w-[360px] rounded-xl border bg-[#0D1018]/95 backdrop-blur-xl p-4 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.85)] transition-all duration-200 ${
        isSuccess
          ? 'border-[#4F6BFF]/45 shadow-[0_20px_50px_-15px_rgba(79,107,255,0.28)]'
          : 'border-rose-500/45 shadow-[0_20px_50px_-15px_rgba(244,63,94,0.25)]'
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${
            isSuccess
              ? 'border-[#4F6BFF]/35 bg-[#4F6BFF]/15 text-[#8CA2FF]'
              : 'border-rose-500/35 bg-rose-500/15 text-rose-400'
          }`}
        >
          {isSuccess ? (
            <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
          ) : (
            <AlertCircle className="w-4 h-4" aria-hidden="true" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="font-display text-sm font-semibold text-white">
              {toast.title}
            </p>
            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              aria-label="Dismiss notification"
              className="rounded-md p-1 text-[#646B78] hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
          <p className="mt-1 text-xs sm:text-[13px] leading-relaxed text-[#949BA8]">
            {toast.description}
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Viewport-anchored toast container positioned below the sticky navbar
 * so it never collides with the bottom-right floating WhatsApp CTA.
 */
export function ToastViewport({toasts, onDismiss}: ToastViewportProps) {
  if (toasts.length === 0) return null;

  return (
    <div
      aria-label="Notifications"
      className="fixed top-20 right-4 left-4 sm:left-auto sm:right-6 z-50 flex flex-col gap-3 pointer-events-none"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}
