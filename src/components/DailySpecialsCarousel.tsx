'use client';

import Image from 'next/image';
import { useEffect, useState, useCallback } from 'react';
import { dailySpecials } from '@/data/dailySpecials';

// Available hours per day (Monday is closed)
const dayAvailability: Record<string, string> = {
  Tuesday: 'Available Tue · 11:00 AM – 10:00 PM',
  Wednesday: 'Available Wed · 11:00 AM – 10:00 PM',
  Thursday: 'Available Thu · 11:00 AM – 10:00 PM',
  Friday: 'Available Fri · 11:00 AM – 10:00 PM',
  Saturday: 'Available Sat · 10:00 AM – 10:00 PM',
  Sunday: 'Available Sun · 10:00 AM – 9:00 PM',
};

// Rotate through available backdrop images
const backgrounds = [
  '/images/food1.jpg',
  '/images/food2.webp',
  '/images/food3.webp',
  '/images/food4.webp',
  '/images/food5.jpg',
  '/images/daily-special.webp',
];

export default function DailySpecialsCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex(i => (i + 1) % dailySpecials.length), []);
  const prev = useCallback(() => setIndex(i => (i - 1 + dailySpecials.length) % dailySpecials.length), []);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(next, 6000);
    return () => window.clearInterval(id);
  }, [next, paused]);

  const slide = dailySpecials[index];
  const bg = backgrounds[index % backgrounds.length];
  const available = dayAvailability[slide.day] ?? '';

  return (
    <div
      className="specials-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Daily specials"
    >
      <button type="button" className="carousel-arrow prev" onClick={prev} aria-label="Previous day">‹</button>
      <button type="button" className="carousel-arrow next" onClick={next} aria-label="Next day">›</button>

      <div className="specials-slide" key={slide.day}>
        <div className="specials-slide-img">
          <Image src={bg} alt={`${slide.day} special`} fill sizes="(max-width: 900px) 100vw, 960px" />
        </div>
        <div className="specials-slide-body">
          <div>
            <span className="day-tag">{slide.day} Special</span>
            <p className="avail-time">{available}</p>
          </div>

          <div className="specials-items">
            <ul>
              {slide.items.map(item => (
                <li key={item.name}>
                  <span>{item.name}</span>
                  <span className="price">{item.price}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="welcome-dots" role="tablist" style={{ background: 'transparent', padding: 0 }}>
            {dailySpecials.map((s, i) => (
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
      </div>
    </div>
  );
}
