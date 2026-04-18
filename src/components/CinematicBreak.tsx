import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

type Props = {
  image: string;
  alt: string;
  eyebrow?: string;
  title: string;
  body?: ReactNode;
  ctaHref?: string;
  ctaLabel?: string;
};

export default function CinematicBreak({ image, alt, eyebrow, title, body, ctaHref, ctaLabel }: Props) {
  return (
    <section className="cine-break">
      <div className="cine-break-img">
        <Image src={image} alt={alt} fill priority={false} sizes="100vw" />
      </div>
      <div className="cine-break-content">
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h2>{title}</h2>
        {body && <p>{body}</p>}
        {ctaHref && ctaLabel && <Link href={ctaHref} className="btn">{ctaLabel}</Link>}
      </div>
    </section>
  );
}
