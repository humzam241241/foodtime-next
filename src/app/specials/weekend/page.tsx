import { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';

export const metadata: Metadata = { title: 'Weekend Special' };

export default function WeekendSpecialPage() {
  return (
    <>
      <PageHeader title="Weekend Breakfast Special" />
      <section className="section"><div className="container">
        <div className="weekend-highlight">
          <h2>Weekend Breakfast Special</h2>
          <p className="time">Saturday &amp; Sunday: 10 AM &ndash; 1 PM</p>
          <p style={{fontSize:'1.2rem',marginBottom:20}}>Puris, Halwa, Channa and Aloo Sabzi</p>
          <p><span className="price">Dine-In: $10.99</span> &nbsp; <span className="price">Take Out: $8.99</span></p>
        </div>
      </div></section>
    </>
  );
}
