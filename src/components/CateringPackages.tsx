import Link from 'next/link';
import { cateringPackages } from '@/data/cateringPackages';

export default function CateringPackages() {
  return (
    <section className="section section-alt">
      <div className="container" style={{ textAlign: 'center' }}>
        <h2>Halal Catering <span className="accent">Packages</span></h2>
        <p className="subtitle">
          Pick a package — we handle the rest. Generous portions of authentic Pakistani &amp; Indian meals for
          parties, weddings, and corporate events.
        </p>

        <div className="packages-strip">
          {cateringPackages.map(p => (
            <Link key={p.id} href={`/catering#${p.id}`} className="pkg-card tilt-auto" style={{textDecoration:'none'}}>
              <h4>{p.name}</h4>
              <div className="pkg-items-count">{p.items}</div>
              <div className="pkg-price">{p.price}</div>
              <span className="pkg-per">per person</span>
            </Link>
          ))}
        </div>

        <p style={{ color: 'var(--text-light)', marginTop: 24, fontSize: '0.95rem' }}>
          <strong style={{ color: '#fff' }}>Catering Line:</strong>{' '}
          <a href="tel:4168826637">416-882-6637</a>
        </p>

        <div style={{ marginTop: 20, display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/catering" className="btn">Catering Menu</Link>
          <Link href="/catering/party-trays" className="btn" style={{ background: 'transparent', border: '2px solid var(--red)' }}>
            View Party Trays
          </Link>
        </div>
      </div>
    </section>
  );
}
