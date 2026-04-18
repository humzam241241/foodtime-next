'use client';
import Image from 'next/image';
import type { CSSProperties } from 'react';

type Props = {
  images: string[];
  height?: number;
  speed?: number;
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  rounded?: boolean;
  lightbox?: string;
  caption?: (src: string, i: number) => string | null;
};

export default function MarqueeRow({
  images,
  height = 260,
  speed = 55,
  direction = 'left',
  pauseOnHover = true,
  rounded = true,
  lightbox,
  caption,
}: Props) {
  if (!images.length) return null;
  const items = [...images, ...images];
  const style: CSSProperties & Record<string, string | number> = {
    '--marquee-speed': `${speed}s`,
    '--marquee-height': `${height}px`,
    '--marquee-dir': direction === 'left' ? 'normal' : 'reverse',
  };
  return (
    <div
      className={`marquee ${pauseOnHover ? 'marquee-pause' : ''} ${rounded ? 'marquee-rounded' : ''}`}
      style={style}
      aria-hidden="true"
    >
      <div className="marquee-track">
        {items.map((src, i) => {
          const cap = caption?.(src, i % images.length);
          const isDuplicate = i >= images.length;
          return (
            <figure
              className="marquee-item"
              key={i}
              {...(lightbox && !isDuplicate ? { 'data-lightbox': lightbox, 'data-alt': cap || '' } : {})}
            >
              <Image
                src={src}
                alt={cap || ''}
                width={360}
                height={height}
                className="marquee-img"
                sizes="(max-width: 768px) 220px, 360px"
              />
              {cap && <figcaption className="marquee-caption">{cap}</figcaption>}
            </figure>
          );
        })}
      </div>
    </div>
  );
}
