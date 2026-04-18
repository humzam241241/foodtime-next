'use client';
import { useEffect } from 'react';

type Props = { selector?: string; max?: number; scale?: number };

export default function TiltBehavior({ selector = '.tilt-auto', max = 7, scale = 1.02 }: Props) {
  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cleanups: Array<() => void> = [];

    const attach = (el: HTMLElement) => {
      let frame = 0;
      let pending: { rx: number; ry: number } | null = null;
      const apply = () => {
        frame = 0;
        if (!pending) return;
        el.style.transform = `perspective(900px) rotateX(${pending.rx}deg) rotateY(${pending.ry}deg) scale(${scale})`;
      };
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        pending = { rx: -y * max, ry: x * max };
        el.style.setProperty('--mx', `${((x + 0.5) * 100).toFixed(1)}%`);
        el.style.setProperty('--my', `${((y + 0.5) * 100).toFixed(1)}%`);
        if (!frame) frame = requestAnimationFrame(apply);
      };
      const onLeave = () => {
        if (frame) { cancelAnimationFrame(frame); frame = 0; }
        el.style.transform = '';
      };
      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerleave', onLeave);
      cleanups.push(() => {
        el.removeEventListener('pointermove', onMove);
        el.removeEventListener('pointerleave', onLeave);
        if (frame) cancelAnimationFrame(frame);
      });
    };

    const bind = () => {
      document.querySelectorAll<HTMLElement>(selector).forEach(el => {
        if (el.dataset.tiltBound) return;
        el.dataset.tiltBound = '1';
        el.classList.add('tilt');
        attach(el);
      });
    };

    bind();
    const mo = new MutationObserver(bind);
    mo.observe(document.body, { childList: true, subtree: true });
    cleanups.push(() => mo.disconnect());

    return () => cleanups.forEach(fn => fn());
  }, [selector, max, scale]);

  return null;
}
