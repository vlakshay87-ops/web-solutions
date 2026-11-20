import React, {useRef, useState} from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  target?: string;
  rel?: string;
  ariaLabel?: string;
  strength?: number;
}

/**
 * Subtle magnetic button interaction that nudges toward the pointer on desktop
 * while respecting prefers-reduced-motion and providing crisp press feedback.
 */
export function MagneticButton({
  children,
  className = '',
  href,
  onClick,
  type = 'button',
  disabled = false,
  target,
  rel,
  ariaLabel,
  strength = 0.18,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [offset, setOffset] = useState({x: 0, y: 0});

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    setOffset({x: relX * strength, y: relY * strength});
  };

  const handleMouseLeave = () => {
    setOffset({x: 0, y: 0});
  };

  const style: React.CSSProperties = {
    transform: `translate3d(${offset.x.toFixed(2)}px, ${offset.y.toFixed(2)}px, 0)`,
    transition:
      offset.x === 0 && offset.y === 0
        ? 'transform 280ms cubic-bezier(0.16, 1, 0.3, 1)'
        : 'transform 80ms linear',
  };

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={style}
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={className}
    >
      {children}
    </button>
  );
}
