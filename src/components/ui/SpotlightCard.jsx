import { useEffect, useRef } from 'react';

// Pointer light is decorative. Content and focus order remain native.
export default function SpotlightCard({ children, className = '', ...props }) {
  const frame = useRef(null);
  const motionAllowed = useRef(false);
  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    const update = () => { motionAllowed.current = media.matches; };
    update();
    media.addEventListener('change', update);
    return () => { media.removeEventListener('change', update); cancelAnimationFrame(frame.current); };
  }, []);

  const move = event => {
    if (!motionAllowed.current || event.pointerType === 'touch') return;
    const card = event.currentTarget;
    const { left, top } = card.getBoundingClientRect();
    const x = event.clientX - left;
    const y = event.clientY - top;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      card.style.setProperty('--spot-x', `${x}px`);
      card.style.setProperty('--spot-y', `${y}px`);
      card.dataset.spotlight = 'active';
    });
  };
  const reset = event => {
    cancelAnimationFrame(frame.current);
    delete event.currentTarget.dataset.spotlight;
  };

  return (
    <article {...props} className={`spotlight-card ${className}`} onPointerMove={move} onPointerLeave={reset} onPointerCancel={reset}>
      <span className="spotlight-surface" aria-hidden="true" />
      {children}
    </article>
  );
}
