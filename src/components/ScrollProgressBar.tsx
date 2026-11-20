import React, {useEffect, useState} from 'react';

/**
 * Slim fixed top-of-viewport scroll progress indicator.
 * Uses GPU-composited scaleX transform for smooth 60fps updates.
 */
export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;

    const updateProgress = () => {
      rafId = 0;
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const maxScroll = doc.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) {
        setProgress(0);
        return;
      }
      const next = Math.max(0, Math.min(1, scrollTop / maxScroll));
      setProgress(next);
    };

    const onScrollOrResize = () => {
      if (rafId !== 0) return;
      rafId = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener('scroll', onScrollOrResize, {passive: true});
    window.addEventListener('resize', onScrollOrResize, {passive: true});

    return () => {
      if (rafId !== 0) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-white/[0.04] pointer-events-none"
    >
      <div
        className="h-full w-full origin-left bg-gradient-to-r from-[#4F6BFF] via-[#7C5CFF] to-[#9EB0FF] shadow-[0_0_10px_rgba(79,107,255,0.65)] will-change-transform"
        style={{transform: `scaleX(${progress})`}}
      />
    </div>
  );
}
