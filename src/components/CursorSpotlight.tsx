'use client';
import { useEffect, useRef } from 'react';

type Props = { target?: string };

export default function CursorSpotlight({ target = '.hero' }: Props) {
  const frame = useRef<number>(0);
  const pending = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const host = document.querySelector<HTMLElement>(target);
    if (!host) return;
    if (window.matchMedia('(hover: none)').matches) return;

    const spot = document.createElement('div');
    spot.className = 'cursor-spotlight';
    host.appendChild(spot);

    const apply = () => {
      frame.current = 0;
      const p = pending.current;
      if (!p) return;
      spot.style.setProperty('--cx', `${p.x}px`);
      spot.style.setProperty('--cy', `${p.y}px`);
    };
    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      pending.current = { x: e.clientX - r.left, y: e.clientY - r.top };
      if (!frame.current) frame.current = requestAnimationFrame(apply);
    };
    const onEnter = () => spot.classList.add('active');
    const onLeave = () => spot.classList.remove('active');

    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerenter', onEnter);
    host.addEventListener('pointerleave', onLeave);

    return () => {
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerenter', onEnter);
      host.removeEventListener('pointerleave', onLeave);
      if (frame.current) cancelAnimationFrame(frame.current);
      spot.remove();
    };
  }, [target]);

  return null;
}
