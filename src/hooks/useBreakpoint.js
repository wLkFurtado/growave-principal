import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function useIsMobile(bp = 768) {
  const [mobile, setMobile] = useState(window.innerWidth < bp);
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < bp);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, [bp]);
  return mobile;
}

export function useIsTablet(bp = 1024) {
  const [tablet, setTablet] = useState(window.innerWidth < bp);
  useEffect(() => {
    const fn = () => setTablet(window.innerWidth < bp);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, [bp]);
  return tablet;
}

export function useCounter(target, duration) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: (duration || 1600) / 1000,
      ease: 'power2.out',
      scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
      onUpdate: () => setValue(Math.round(obj.val)),
    });
  }, [target, duration]);
  return [value, ref];
}
