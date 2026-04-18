'use client';
import { useEffect, useRef, useState } from 'react';

type Props = {
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
};

export default function AnimatedCounter({ to, duration = 1500, suffix = '', prefix = '' }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const run = () => {
      if (started.current) return;
      started.current = true;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setValue(to);
        return;
      }
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(Math.round(eased * to));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.isIntersecting && run());
    }, { threshold: 0.4 });
    io.observe(node);
    return () => io.disconnect();
  }, [to, duration]);

  return <span ref={ref}>{prefix}{value}{suffix}</span>;
}
