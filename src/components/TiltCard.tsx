'use client';
import { useRef, type ReactNode, type PointerEvent as RPE } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  max?: number;
  scale?: number;
};

export default function TiltCard({ children, className = '', max = 8, scale = 1.02 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<number>(0);
  const pending = useRef<{ rx: number; ry: number } | null>(null);

  const apply = () => {
    frame.current = 0;
    const el = ref.current;
    const p = pending.current;
    if (!el || !p) return;
    el.style.transform = `perspective(900px) rotateX(${p.rx}deg) rotateY(${p.ry}deg) scale(${scale})`;
  };

  const onMove = (e: RPE<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(hover: none)').matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    pending.current = { rx: -y * max, ry: x * max };
    el.style.setProperty('--mx', `${((x + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty('--my', `${((y + 0.5) * 100).toFixed(1)}%`);
    if (!frame.current) frame.current = requestAnimationFrame(apply);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    if (frame.current) { cancelAnimationFrame(frame.current); frame.current = 0; }
    el.style.transform = '';
  };

  return (
    <div
      ref={ref}
      className={`tilt ${className}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <div className="tilt-inner">{children}</div>
    </div>
  );
}
