import Link from 'next/link';

type Package = {
  name: string;
  items: string;
  price: string;
};

const packages: Package[] = [
  { name: 'Basic', items: '5 items', price: '$10.49' },
  { name: 'Vegetarian', items: '6 items', price: '$10.49' },
  { name: 'Silver', items: '7 items', price: '$12.49' },
  { name: 'Gold', items: '8 items', price: '$14.49' },
  { name: 'Platinum', items: '9 items', price: '$16.49' },
];

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
          {packages.map(p => (
            <Link key={p.name} href="/catering" className="pkg-card" style={{textDecoration:'none'}}>
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
