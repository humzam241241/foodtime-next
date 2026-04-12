'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import type { HeroSlide } from '@/data/defaultHeroImages';

export default function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;

  const next = useCallback(() => setIndex(i => (i + 1) % count), [count]);
  const prev = useCallback(() => setIndex(i => (i - 1 + count) % count), [count]);

  useEffect(() => {
    if (paused || count < 2) return;
    const id = window.setInterval(next, 6000);
    return () => window.clearInterval(id);
  }, [next, paused, count]);

  if (count === 0) return null;

  return (
    <section
      className="hero hero-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Food Time hero banner"
    >
      {slides.map((s, i) => (
        <div
          key={s.src + i}
          className={`hero-slide${i === index ? ' active' : ''}`}
          aria-hidden={i !== index}
        >
          <div className="hero-slide-img">
            <Image
              src={s.src}
              alt={s.title}
              fill
              priority={i === 0}
              sizes="100vw"
            />
            <div className="hero-overlay" />
          </div>
          <div className="hero-content">
            <h1>{s.title}</h1>
            <p>{s.subtitle}</p>
            {s.cta && (
              <Link href={s.cta.href} className="btn">
                {s.cta.label}
              </Link>
            )}
          </div>
        </div>
      ))}

      {count > 1 && (
        <>
          <button
            type="button"
            className="carousel-arrow prev hero-arrow"
            onClick={prev}
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            type="button"
            className="carousel-arrow next hero-arrow"
            onClick={next}
            aria-label="Next slide"
          >
            ›
          </button>

          <div className="hero-dots" role="tablist">
            {slides.map((s, i) => (
              <button
                type="button"
                key={s.src + i}
                className={i === index ? 'active' : ''}
                aria-label={`Show slide ${i + 1}`}
                aria-selected={i === index}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
