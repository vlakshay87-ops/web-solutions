import {useEffect, useRef, useState} from 'react';

/**
 * Attaches an IntersectionObserver to reveal elements cleanly on scroll.
 * Respects prefers-reduced-motion automatically via CSS and immediate fallback.
 */
export function useScrollReveal<T extends HTMLElement>(threshold = 0.14) {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      {threshold, rootMargin: '0px 0px -40px 0px'}
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return {ref, isVisible};
}

/**
 * Tracks the currently active section ID for navbar link highlighting.
 */
export function useActiveSection(sectionIds: string[]): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? 'home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 140;
      let current = sectionIds[0] ?? 'home';

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) {
          current = id;
        }
      }
      setActiveId(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds]);

  return activeId;
}
