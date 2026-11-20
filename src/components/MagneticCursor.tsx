import React, {useEffect, useRef} from 'react';

const INTERACTIVE_SELECTOR =
  'a, button, [role="tab"], [role="button"], summary';
const INPUT_SELECTOR = 'input, textarea, select';

/**
 * Subtle custom magnetic cursor ring for fine-pointer desktop devices.
 * Uses direct DOM transforms in a requestAnimationFrame loop (zero React re-renders)
 * and automatically disables itself on touch devices or prefers-reduced-motion.
 */
export function MagneticCursor() {
  const ringRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!finePointer.matches || reducedMotion.matches) {
      return;
    }

    const ringEl = ringRef.current;
    const dotEl = dotRef.current;
    if (!ringEl || !dotEl) return;

    let visible = false;
    let pressed = false;
    let overInput = false;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let dotX = -100;
    let dotY = -100;

    let currentScale = 1;
    let targetScale = 1;
    let activeTarget: HTMLElement | null = null;
    let rafId = 0;

    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const findNearestInteractive = (
      x: number,
      y: number,
      hoveredEl: Element | null
    ): HTMLElement | null => {
      if (!hoveredEl) return null;

      if (hoveredEl.closest(INPUT_SELECTOR)) {
        overInput = true;
        return null;
      }
      overInput = false;

      const directMatch = hoveredEl.closest(INTERACTIVE_SELECTOR) as HTMLElement | null;
      if (directMatch) return directMatch;

      // Check subtle proximity pull (within 18px) for nearby buttons/links
      const candidates = document.querySelectorAll<HTMLElement>(INTERACTIVE_SELECTOR);
      let closest: HTMLElement | null = null;
      let closestDist = 18;

      for (let i = 0; i < candidates.length; i++) {
        const el = candidates[i];
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) continue;

        const dx = Math.max(rect.left - x, 0, x - rect.right);
        const dy = Math.max(rect.top - y, 0, y - rect.bottom);
        const dist = Math.hypot(dx, dy);

        if (dist < closestDist) {
          closestDist = dist;
          closest = el;
        }
      }

      return closest;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!visible) {
        visible = true;
        ringX = mouseX;
        ringY = mouseY;
        dotX = mouseX;
        dotY = mouseY;
      }

      const hovered = document.elementFromPoint(mouseX, mouseY);
      activeTarget = findNearestInteractive(mouseX, mouseY, hovered);
    };

    const onPointerDown = () => {
      pressed = true;
    };

    const onPointerUp = () => {
      pressed = false;
    };

    const onDocumentLeave = () => {
      visible = false;
      activeTarget = null;
    };

    const tick = () => {
      let targetRingX = mouseX;
      let targetRingY = mouseY;

      if (activeTarget && !overInput) {
        const rect = activeTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Gentle magnetic pull toward the interactive element's center
        const pullStrength = rect.width < 180 ? 0.34 : 0.16;
        targetRingX = lerp(mouseX, centerX, pullStrength);
        targetRingY = lerp(mouseY, centerY, pullStrength);
        targetScale = pressed ? 1.15 : 1.42;
      } else {
        targetScale = pressed ? 0.82 : 1;
      }

      ringX = lerp(ringX, targetRingX, 0.16);
      ringY = lerp(ringY, targetRingY, 0.16);
      dotX = lerp(dotX, mouseX, 0.45);
      dotY = lerp(dotY, mouseY, 0.45);
      currentScale = lerp(currentScale, targetScale, 0.2);

      const opacity = !visible || overInput ? 0 : 1;

      ringEl.style.opacity = String(opacity);
      ringEl.style.transform = `translate3d(${ringX.toFixed(2)}px, ${ringY.toFixed(
        2
      )}px, 0) translate(-50%, -50%) scale(${currentScale.toFixed(3)})`;

      if (activeTarget && !overInput) {
        ringEl.style.borderColor = 'rgba(125, 147, 255, 0.72)';
        ringEl.style.backgroundColor = 'rgba(79, 107, 255, 0.08)';
      } else {
        ringEl.style.borderColor = 'rgba(255, 255, 255, 0.28)';
        ringEl.style.backgroundColor = 'transparent';
      }

      dotEl.style.opacity = String(opacity * (activeTarget ? 0.95 : 0.65));
      dotEl.style.transform = `translate3d(${dotX.toFixed(2)}px, ${dotY.toFixed(
        2
      )}px, 0) translate(-50%, -50%) scale(${pressed ? 0.75 : 1})`;

      rafId = window.requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onPointerMove, {passive: true});
    window.addEventListener('pointerdown', onPointerDown, {passive: true});
    window.addEventListener('pointerup', onPointerUp, {passive: true});
    document.addEventListener('mouseleave', onDocumentLeave);
    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      document.removeEventListener('mouseleave', onDocumentLeave);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-50 h-8 w-8 rounded-full border border-white/30 opacity-0 transition-[border-color,background-color,opacity] duration-150 ease-out will-change-transform"
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-50 h-1.5 w-1.5 rounded-full bg-[#8CA2FF] opacity-0 transition-opacity duration-150 will-change-transform"
      />
    </>
  );
}
