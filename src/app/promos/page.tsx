import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';

export const metadata: Metadata = { title: 'Promos' };

type Promo = {
  image: string;
  alt: string;
  title: string;
  subtitle: string;
  href?: string;
};

const promos: Promo[] = [
  {
    image: '/images/gallery/combos/bbq-platter-4.webp',
    alt: 'BBQ Platter for 4 — chicken tikka, seekh kabab, bihari kabab and biryani rice',
    title: 'BBQ Platter for 4 — 10% off',
    subtitle: 'Thursday Special · 11am – 10pm',
    href: '/combos#bbq-platter-for-4',
  },
  {
    image: '/images/gallery/combos/family-combo-4.webp',
    alt: 'Family Combo for 4 — curries, biryani, kababs and naan',
    title: 'Family Combo — 10% off',
    subtitle: 'Wednesday Special · 11am – 10pm',
    href: '/combos#family-combo-for-4',
  },
  {
    image: '/images/promo-10-off.png',
    alt: '10% off badge',
    title: '10% off Takeout Orders Over $100',
    subtitle: 'Before tax · when paying cash',
  },
];

export default function PromosPage() {
  return (
    <>
      <PageHeader title="Promos & Special Offers" subtitle="Check out our latest deals" />
      <section className="section"><div className="container">
        <div className="card-grid promos-grid">
          {promos.map((p, i) => {
            const inner = (
              <>
                <Image
                  src={p.image}
                  alt={p.alt}
                  width={640}
                  height={400}
                  className="card-img"
                  style={{ width: '100%', objectFit: 'contain', background: '#0a0a0a' }}
                />
                <div className="card-body">
                  <h3>{p.title}</h3>
                  <p style={{ marginTop: 6, color: 'var(--text-light)', fontSize: '0.95rem' }}>{p.subtitle}</p>
                  {p.href && (
                    <span className="promo-cta" aria-hidden="true">View combo &rarr;</span>
                  )}
                </div>
              </>
            );
            return p.href ? (
              <Link
                key={i}
                href={p.href}
                className="card promo-card-link"
                aria-label={`${p.title}. ${p.subtitle}. View on combos page.`}
              >
                {inner}
              </Link>
            ) : (
              <div key={i} className="card">{inner}</div>
            );
          })}
        </div>
      </div></section>
    </>
  );
}
