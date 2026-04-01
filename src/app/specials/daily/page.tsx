import { Metadata } from 'next';
import Image from 'next/image';
import PageHeader from '@/components/PageHeader';
import { dailySpecials } from '@/data/dailySpecials';

export const metadata: Metadata = { title: 'Takeout Daily Specials' };

export default function DailySpecialPage() {
  return (
    <>
      <PageHeader title="Takeout Daily Specials" subtitle="A different special every day" />
      <section className="section"><div className="container">
        <div style={{textAlign:'center',padding:'0 0 30px'}}>
          <Image src="/images/daily-special.webp" alt="Daily Specials" width={600} height={400} style={{maxWidth:600,borderRadius:12,boxShadow:'0 4px 20px rgba(0,0,0,0.12)'}} />
        </div>
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
