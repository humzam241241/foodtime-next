'use client';
import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';

type Props = {
  images: string[];
  height?: number;
  speed?: number;
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  rounded?: boolean;
  lightbox?: string;
  hrefFor?: (src: string) => string | undefined;
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
  hrefFor,
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
    >
      <div className="marquee-track">
        {items.map((src, i) => {
          const cap = caption?.(src, i % images.length);
          const href = hrefFor?.(src);
          const content = (
            <>
              <Image
                src={src}
                alt={cap || ''}
                width={360}
                height={height}
                className="marquee-img"
                sizes="(max-width: 768px) 220px, 360px"
              />
              {cap && <figcaption className="marquee-caption">{cap}</figcaption>}
            </>
          );
          if (href) {
            return (
              <Link href={href} className="marquee-item marquee-link" key={i} aria-label={cap || 'View on menu'}>
                {content}
              </Link>
            );
          }
          return (
            <figure
              className="marquee-item"
              key={i}
              {...(lightbox ? { 'data-lightbox': lightbox, 'data-alt': cap || '' } : {})}
            >
              {content}
            </figure>
          );
        })}
      </div>
    </div>
  );
}
