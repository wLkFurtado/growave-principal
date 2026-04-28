import { useEffect, useRef } from 'react';
import { useIsMobile } from '../hooks/useBreakpoint';

export default function CustomCursor() {
  const isMobile = useIsMobile();
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => {
    if (isMobile) return;
    const dot = dotRef.current;
    const ringEl = ringRef.current;

    const onMove = e => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', onMove);

    const loop = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (dot) dot.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      if (ringEl) ringEl.style.transform = `translate(${ring.current.x - 20}px, ${ring.current.y - 20}px)`;
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    const onEnter = () => {
      if (ringEl) { ringEl.style.opacity = '0.4'; ringEl.style.borderColor = '#4AFF5A'; ringEl.style.width = '60px'; ringEl.style.height = '60px'; }
    };
    const onLeave = () => {
      if (ringEl) { ringEl.style.opacity = '0.6'; ringEl.style.borderColor = '#4AFF5A'; ringEl.style.width = '40px'; ringEl.style.height = '40px'; }
    };
    const btns = document.querySelectorAll('button, a, .ibtn');
    btns.forEach(b => { b.addEventListener('mouseenter', onEnter); b.addEventListener('mouseleave', onLeave); });

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div ref={dotRef} style={{
        position: 'fixed', top: 0, left: 0, width: 8, height: 8,
        background: '#4AFF5A', borderRadius: '50%', pointerEvents: 'none',
        zIndex: 99999, boxShadow: '0 0 8px rgba(74,255,90,0.8)',
      }} />
      <div ref={ringRef} style={{
        position: 'fixed', top: 0, left: 0, width: 40, height: 40,
        border: '1px solid #4AFF5A', borderRadius: '50%', pointerEvents: 'none',
        zIndex: 99998, opacity: 0.6,
        transition: 'opacity 300ms, border-color 300ms, width 200ms, height 200ms',
      }} />
    </>
  );
}
