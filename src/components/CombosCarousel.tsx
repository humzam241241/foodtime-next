'use client';

import { useEffect, useState, useCallback } from 'react';
import { takeoutCombos, singleCombos, Combo, ComboSingle } from '@/data/combos';
import Link from 'next/link';

type Slide = { name: string; price: string; items: string[] };

const slides: Slide[] = [
  ...takeoutCombos.map(c => ({ name: c.name, price: c.price, items: c.items })),
  ...singleCombos.map(c => ({ name: c.name, price: c.price, items: c.description ? [c.description] : [] })),
];

export default function CombosCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex(i => (i + 1) % slides.length), []);
  const prev = useCallback(() => setIndex(i => (i - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(next, 5000);
    return () => window.clearInterval(id);
  }, [next, paused]);

  const slide = slides[index];

  return (
    <div
      className="combos-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Combo deals"
    >
      <button type="button" className="carousel-arrow prev" onClick={prev} aria-label="Previous combo">&#8249;</button>
      <button type="button" className="carousel-arrow next" onClick={next} aria-label="Next combo">&#8250;</button>

      <div className="combos-slide" key={index}>
        <div className="combos-slide-body">
          <span className="combos-tag">Combo Deal</span>
          <h3 className="combos-name">{slide.name}</h3>
          <div className="combos-price">{slide.price}</div>
          {slide.items.length > 0 && (
            <ul className="combos-items-list">
              {slide.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}
          <Link href="/combos/takeout" className="btn" style={{ marginTop: 16, fontSize: '0.85rem', padding: '10px 24px' }}>
            View All Combos
          </Link>
        </div>
      </div>

      <div className="welcome-dots" role="tablist" style={{ background: 'transparent', padding: '12px 0' }}>
        {slides.map((_, i) => (
          <button
            type="button"
            key={i}
            className={i === index ? 'active' : ''}
            aria-label={`Show combo ${i + 1}`}
            aria-selected={i === index}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
