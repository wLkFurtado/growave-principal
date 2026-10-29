import { useRef } from 'react';

export default function ShineButton({ children, className = '', onPointerMove, onPointerLeave, ...props }) {
  const frame = useRef(null);

  const handleMove = event => {
    onPointerMove?.(event);
    if (
      event.pointerType === 'touch' ||
      !window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches
    ) {
      return;
    }
    const btn = event.currentTarget;
    const rect = btn.getBoundingClientRect();
    const relX = (event.clientX - rect.left) / rect.width - 0.5;
    const relY = (event.clientY - rect.top) / rect.height - 0.5;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      btn.style.setProperty('--mag-x', `${(relX * 7).toFixed(2)}px`);
      btn.style.setProperty('--mag-y', `${(relY * 5).toFixed(2)}px`);
    });
  };

  const handleLeave = event => {
    onPointerLeave?.(event);
    cancelAnimationFrame(frame.current);
    event.currentTarget.style.setProperty('--mag-x', '0px');
    event.currentTarget.style.setProperty('--mag-y', '0px');
  };

  return (
    <button
      type="button"
      {...props}
      className={`shine-button ${className}`}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      <span className="shine-button-content">{children}</span>
    </button>
  );
}

