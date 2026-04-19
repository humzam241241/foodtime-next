'use client';

import Image from 'next/image';
import { useEffect, useState, useCallback } from 'react';
import { dailyImages } from '@/data/foodImages';

const days = ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;
const slides = days.map(day => ({ day, src: dailyImages[day] }));

export default function DailyPromoCarousel() {
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
      className="photo-carousel daily-promo-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Daily special promos"
    >
      <button type="button" className="carousel-arrow prev" onClick={prev} aria-label="Previous day">&#8249;</button>
      <button type="button" className="carousel-arrow next" onClick={next} aria-label="Next day">&#8250;</button>

      <div className="photo-carousel-slide">
        <Image
          key={index}
          src={slides[index].src}
          alt={`${slides[index].day} special`}
          fill
          sizes="(max-width: 900px) 100vw, 960px"
          priority={index === 0}
        />
      </div>

      <div className="welcome-dots" role="tablist" style={{ position: 'absolute', bottom: 16, left: 0, right: 0, background: 'transparent', padding: 0 }}>
        {slides.map((s, i) => (
          <button
            type="button"
            key={s.day}
            className={i === index ? 'active' : ''}
            aria-label={`Show ${s.day} special`}
            aria-selected={i === index}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
