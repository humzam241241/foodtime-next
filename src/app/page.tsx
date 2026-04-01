import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <section className="hero">
        <Image src="/images/hero.jpg" alt="Food Time Restaurant Interior" fill style={{objectFit:'cover'}} priority />
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>Welcome to Food Time</h1>
          <p>Authentic Halal Pakistani &amp; Indian Cuisine in Pickering &amp; Whitby</p>
          <Link href="/menu/dine-in" className="btn">View Our Menu</Link>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Our Specialties</h2>
          <p className="subtitle">Authentic flavors crafted with love and tradition</p>
          <div className="card-grid">
            {[
              { img: '/images/food1.jpg', title: 'Biryani & Rice Dishes', desc: 'Aromatic basmati rice cooked with premium spices, served with raita. Available in chicken, veal, lamb, goat, shrimp and vegetable.' },
              { img: '/images/food2.webp', title: 'Karahi & Curry', desc: 'Rich, thick sauces made from tomatoes and spices, garnished with green chilli, coriander and sliced ginger.' },
              { img: '/images/food3.webp', title: 'Sizzling BBQ & Tandoori', desc: 'Marinated meats cooked in our traditional clay oven. Chicken tikka, seekh kabab, bihari kabab, lamb chops and more.' },
            ].map(c => (
              <div key={c.title} className="card">
                <Image src={c.img} alt={c.title} width={640} height={220} style={{width:'100%',height:220,objectFit:'cover'}} />
                <div className="card-body"><h3>{c.title}</h3><p>{c.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container" style={{textAlign:'center'}}>
          <h2>Daily Specials</h2>
          <p className="subtitle">Different specials every day of the week at unbeatable prices</p>
          <Image src="/images/daily-special.webp" alt="Daily Special" width={700} height={400} style={{maxWidth:700,margin:'0 auto',borderRadius:12,boxShadow:'0 4px 20px rgba(0,0,0,0.15)'}} />
          <br /><br />
          <Link href="/specials/daily" className="btn">See Today&apos;s Special</Link>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Our Community</h2>
          <p className="subtitle">Bringing families together over authentic flavors</p>
          <div className="gallery-grid">
            {['community1.jpg','community2.jpg','community3.jpg'].map(f => (
              <Image key={f} src={'/images/'+f} alt="Food Time Community" width={400} height={250} style={{width:'100%',height:250,objectFit:'cover',borderRadius:8}} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:40,alignItems:'center'}}>
          <div>
            <h2 style={{textAlign:'left'}}>Catering Services</h2>
            <p style={{margin:'16px 0',fontSize:'1.05rem',color:'var(--text-light)'}}>Planning a party, wedding or corporate event? Our catering menu features generous portions of authentic Pakistani &amp; Indian meals.</p>
            <p style={{marginBottom:24,fontSize:'1.05rem',color:'var(--text-light)'}}><strong>Catering Line:</strong> <a href="tel:4168826637">416-882-6637</a></p>
            <Link href="/catering/party-trays" className="btn">View Party Trays</Link>
          </div>
          <Image src="/images/trays.webp" alt="Party Trays" width={600} height={400} style={{borderRadius:12,boxShadow:'0 4px 20px rgba(0,0,0,0.12)'}} />
        </div>
      </section>
    </>
  );
}
