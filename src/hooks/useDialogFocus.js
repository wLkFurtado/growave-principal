import { useEffect, useRef } from 'react';
export function useDialogFocus(open) {
  const ref = useRef(null);
  useEffect(() => {
    if (!open || !ref.current) return;
    const previous = document.activeElement;
    const dialog = ref.current;
    dialog.focus();
    const trap = event => {
      if (event.key !== 'Tab') return;
      const items = [...dialog.querySelectorAll('button:not(:disabled), a[href], video[controls], [tabindex="0"]')];
      const first = items[0], last = items.at(-1);
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    dialog.addEventListener('keydown', trap);
    return () => { dialog.removeEventListener('keydown', trap); previous?.focus(); };
  }, [open]);
  return ref;
}
