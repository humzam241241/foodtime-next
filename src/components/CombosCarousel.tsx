'use client';

import Image from 'next/image';
import { useEffect, useState, useCallback } from 'react';

const slides = [
  { src: '/images/gallery/combos/bbq-platter-2.webp', label: 'BBQ Platter for 2' },
  { src: '/images/gallery/combos/meat-combo-2.webp', label: 'Meat Combo for 2' },
  { src: '/images/gallery/combos/family-combo-4.webp', label: 'Family Combo for 4' },
  { src: '/images/gallery/combos/bbq-platter-4.webp', label: 'BBQ Platter for 4' },
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

  return (
    <div
      className="photo-carousel combos-promo-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Combo deals"
    >
      <button type="button" className="carousel-arrow prev" onClick={prev} aria-label="Previous combo">&#8249;</button>
      <button type="button" className="carousel-arrow next" onClick={next} aria-label="Next combo">&#8250;</button>

      <div className="photo-carousel-slide">
        <Image
          key={index}
          src={slides[index].src}
          alt={slides[index].label}
          fill
          sizes="(max-width: 900px) 100vw, 960px"
          priority={index === 0}
        />
      </div>

      <div className="welcome-dots" role="tablist" style={{ position: 'absolute', bottom: 16, left: 0, right: 0, background: 'transparent', padding: 0 }}>
        {slides.map((s, i) => (
          <button
            type="button"
            key={s.label}
            className={i === index ? 'active' : ''}
            aria-label={`Show ${s.label}`}
            aria-selected={i === index}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
