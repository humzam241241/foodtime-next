import { Metadata } from 'next';
import Image from 'next/image';
import PageHeader from '@/components/PageHeader';
import CombosCarousel from '@/components/CombosCarousel';
import { dailySpecials } from '@/data/dailySpecials';

export const metadata: Metadata = { title: 'Daily Specials' };

export default function DailySpecialPage() {
  return (
    <>
      <PageHeader title="Daily Specials" subtitle="A different special every day — plus weekend breakfast" />

      {/* Combos Carousel */}
      <section className="section" style={{paddingBottom:0}}>
        <div className="container">
          <CombosCarousel />
        </div>
      </section>

      {/* Weekend Breakfast Special Banner */}
      <section className="section" style={{paddingBottom:0}}>
        <div className="container">
          <div className="weekend-banner">
            <div className="weekend-banner-img">
              <Image src="/images/daily-special.webp" alt="Weekend Breakfast Special" fill style={{objectFit:'cover'}} />
              <div className="weekend-banner-overlay" />
            </div>
            <div className="weekend-banner-content">
              <h2>Weekend Breakfast Special</h2>
              <p className="time">Saturday &amp; Sunday: 10 AM &ndash; 1 PM</p>
              <p style={{fontSize:'1.1rem',marginBottom:16}}>Puris, Halwa, Channa and Aloo Sabzi</p>
              <div style={{display:'flex',gap:20,justifyContent:'center',flexWrap:'wrap'}}>
                <span className="price">Dine-In: $10.99</span>
                <span className="price">Take Out: $8.99</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Specials Grid */}
      <section className="section"><div className="container">
        <h2 style={{textAlign:'center',color:'#fff',marginBottom:8,fontSize:'1.8rem'}}>Weekday &amp; Weekend <span className="accent">Specials</span></h2>
        <p style={{textAlign:'center',color:'var(--text-light)',marginBottom:32}}>Takeout specials available every day we&apos;re open</p>
        <div className="daily-grid">
          {dailySpecials.map(day => (
            <div key={day.day} className="daily-card">
              <h3>{day.day}</h3>
              {day.items.map((item, i) => (
                <div key={i} className="menu-item">
                  <div className="menu-item-info"><div className="menu-item-name">{item.name}</div></div>
                  <div className="menu-item-price">{item.price}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div></section>
    </>
  );
}
