'use client';

import Image from 'next/image';
import { useEffect, useState, useCallback } from 'react';

const images = [
  '/images/food1.jpg',
  '/images/food2.webp',
  '/images/food3.webp',
  '/images/food4.webp',
  '/images/food5.jpg',
];

export default function CombosCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex(i => (i + 1) % images.length), []);
  const prev = useCallback(() => setIndex(i => (i - 1 + images.length) % images.length), []);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(next, 4000);
    return () => window.clearInterval(id);
  }, [next, paused]);

  return (
    <div
      className="photo-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Food photos"
    >
      <button type="button" className="carousel-arrow prev" onClick={prev} aria-label="Previous photo">&#8249;</button>
      <button type="button" className="carousel-arrow next" onClick={next} aria-label="Next photo">&#8250;</button>

      <div className="photo-carousel-slide">
        <Image
          key={index}
          src={images[index]}
          alt="Food Time cuisine"
          fill
          sizes="(max-width: 900px) 100vw, 960px"
        />
      </div>

      <div className="welcome-dots" role="tablist" style={{ position: 'absolute', bottom: 16, left: 0, right: 0, background: 'transparent', padding: 0 }}>
        {images.map((_, i) => (
          <button
            type="button"
            key={i}
            className={i === index ? 'active' : ''}
            aria-label={`Show photo ${i + 1}`}
            aria-selected={i === index}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
