'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import { signatureImages } from '@/data/foodImages';

type Slide = {
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  href: string;
  cta: string;
};

const slides: Slide[] = [
  {
    eyebrow: 'Fan Favourite',
    title: 'Chicken Biryani',
    description: 'Aromatic basmati rice layered with marinated chicken, saffron, and traditional spices — served with raita.',
    image: signatureImages.chickenBiryani,
    href: '/menu/dine-in',
    cta: 'See on Menu',
  },
  {
    eyebrow: 'Signature Dish',
    title: 'Karahi & Curry',
    description: 'Rich, slow-simmered tomato-based curries finished with green chilli, fresh coriander and sliced ginger.',
    image: signatureImages.karahi,
    href: '/menu/dine-in',
    cta: 'Explore Curries',
  },
  {
    eyebrow: 'From the Tandoor',
    title: 'Sizzling BBQ & Tandoori',
    description: 'Chicken tikka, seekh kabab, bihari kabab and lamb chops — marinated and cooked in our traditional clay oven.',
    image: signatureImages.bbq,
    href: '/menu/dine-in',
    cta: 'See BBQ Menu',
  },
  {
    eyebrow: 'Customer Favourite',
    title: 'Butter Chicken',
    description: 'Tender tandoori chicken in a silky tomato-cream sauce — one of our most-ordered dishes.',
    image: signatureImages.butterChicken,
    href: '/menu/dine-in',
    cta: 'Order Now',
  },
  {
    eyebrow: 'Weekend Special',
    title: 'Nihari & Haleem',
    description: 'Slow-cooked traditional stews served every weekend. Available while supplies last.',
    image: signatureImages.nihariHaleem,
    href: '/specials/weekend',
    cta: 'Weekend Menu',
  },
];

export default function WelcomeCarousel() {
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
      className="welcome-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Popular items at Food Time"
    >
      <button type="button" className="carousel-arrow prev" onClick={prev} aria-label="Previous slide">‹</button>
      <button type="button" className="carousel-arrow next" onClick={next} aria-label="Next slide">›</button>

      <div className="welcome-slide" key={index}>
        <div className="welcome-slide-img">
          <Image src={slide.image} alt={slide.title} fill sizes="(max-width: 900px) 100vw, 55vw" priority={index === 0} />
        </div>
        <div className="welcome-slide-body">
          <span className="eyebrow">{slide.eyebrow}</span>
          <h3>{slide.title}</h3>
          <p>{slide.description}</p>
          <Link href={slide.href} className="btn" style={{ alignSelf: 'flex-start' }}>
            {slide.cta}
          </Link>
        </div>
      </div>

      <div className="welcome-dots" role="tablist">
        {slides.map((s, i) => (
          <button
            type="button"
            key={s.title}
            className={i === index ? 'active' : ''}
            aria-label={`Show ${s.title}`}
            aria-selected={i === index}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
