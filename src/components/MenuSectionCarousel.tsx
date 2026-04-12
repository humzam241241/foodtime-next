'use client';

import Image from 'next/image';
import { useEffect, useState, useCallback } from 'react';

export default function MenuSectionCarousel({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex(i => (i + 1) % images.length), [images.length]);
  const prev = useCallback(() => setIndex(i => (i - 1 + images.length) % images.length), [images.length]);

  useEffect(() => {
    if (paused || images.length <= 1) return;
    const id = window.setInterval(next, 4000);
    return () => window.clearInterval(id);
  }, [next, paused, images.length]);

  return (
    <div
      className="menu-section-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.length > 1 && (
        <>
          <button type="button" className="carousel-arrow prev" onClick={prev} aria-label="Previous photo">&#8249;</button>
          <button type="button" className="carousel-arrow next" onClick={next} aria-label="Next photo">&#8250;</button>
        </>
      )}
      <div className="menu-section-carousel-slide">
        <Image
          key={index}
          src={images[index]}
          alt="Menu category"
          fill
          sizes="(max-width: 900px) 100vw, 800px"
        />
      </div>
      {images.length > 1 && (
        <div className="welcome-dots" role="tablist" style={{ position: 'absolute', bottom: 10, left: 0, right: 0, background: 'transparent', padding: 0 }}>
          {images.map((_, i) => (
            <button
              type="button"
              key={i}
              className={i === index ? 'active' : ''}
              aria-label={`Photo ${i + 1}`}
              aria-selected={i === index}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
