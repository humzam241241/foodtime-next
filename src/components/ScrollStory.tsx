'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export type Step = {
  num: string;
  title: string;
  body: string;
  image: string;
  alt: string;
};

export default function ScrollStory({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        let bestIdx = active;
        let bestRatio = 0;
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > bestRatio) {
            const idx = Number((e.target as HTMLElement).dataset.idx);
            if (!Number.isNaN(idx)) {
              bestRatio = e.intersectionRatio;
              bestIdx = idx;
            }
          }
        });
        if (bestRatio > 0) setActive(bestIdx);
      },
      { threshold: [0.35, 0.55, 0.75], rootMargin: '-20% 0px -40% 0px' }
    );
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="scroll-story">
      <div className="scroll-story-sticky">
        {steps.map((s, i) => (
          <Image
            key={s.image}
            src={s.image}
            alt={s.alt}
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            className={i === active ? 'active' : ''}
            priority={i === 0}
          />
        ))}
      </div>
      <div className="scroll-story-steps">
        {steps.map((s, i) => (
          <div
            key={s.num}
            ref={(el) => { refs.current[i] = el; }}
            data-idx={i}
            className={`scroll-story-step${i === active ? ' in-view' : ''}`}
          >
            <span className="step-num">Step {s.num}</span>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
